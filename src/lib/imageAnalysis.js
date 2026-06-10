const loadImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = event.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

const analyzeBlur = (cv, src) => {
  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

  const laplacian = new cv.Mat();
  cv.Laplacian(gray, laplacian, cv.CV_64F);

  const mean = new cv.Mat();
  const stddev = new cv.Mat();
  cv.meanStdDev(laplacian, mean, stddev);

  const variance = stddev.data64F[0] ** 2;

  gray.delete();
  laplacian.delete();
  mean.delete();
  stddev.delete();

  return variance;
};

const analyzeGlare = (cv, src) => {
  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

  const mask = new cv.Mat();
  cv.threshold(gray, mask, 245, 255, cv.THRESH_BINARY);

  const whitePixels = cv.countNonZero(mask);
  const totalPixels = src.rows * src.cols;
  const glarePercentage = (whitePixels / totalPixels) * 100;

  gray.delete();
  mask.delete();

  return glarePercentage;
};

export const analyzeImageQuality = async (file) => {
  return new Promise((resolve, reject) => {
    if (typeof window.cv === 'undefined' || typeof window.cv.imread !== 'function') {
      setTimeout(() => {
        if (typeof window.cv === 'undefined') {
          return reject(new Error("OpenCV.js failed to load. Please check your internet connection and refresh."));
        }
        resolve(analyzeImageQuality(file));
      }, 500);
      return;
    }

    loadImage(file)
      .then(img => {
        const cv = window.cv;
        const src = cv.imread(img);

        const blurThreshold = 100; 
        const blurVariance = analyzeBlur(cv, src);
        if (blurVariance < blurThreshold) {
          src.delete();
          return resolve({ isClear: false, message: `Image appears to be blurry (variance: ${blurVariance.toFixed(2)}). Please upload a clearer photo.` });
        }

        const glareThreshold = 1.0;
        const glarePercentage = analyzeGlare(cv, src);
        if (glarePercentage > glareThreshold) {
          src.delete();
          return resolve({ isClear: false, message: `Image may have significant glare (glare: ${glarePercentage.toFixed(2)}%). Please avoid reflections.` });
        }

        src.delete();
        resolve({ isClear: true, message: "Image quality is acceptable." });
      })
      .catch(err => {
        console.error("Image analysis failed:", err);
        reject(new Error("Failed to load and analyze the image."));
      });
  });
};