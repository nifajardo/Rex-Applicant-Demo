import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { PlayCircle, X, ChevronLeft, ChevronRight, CheckCircle, Eye } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const images = [
  {
    src: "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/09bb1f69a4d9a82579d9e7dba0f362f9.jpg",
    alt: "REX Education Scholarship Program - A Journey of Educational Empowerment"
  },
  {
    src: "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/727986cca63b39201d9f9947b6c0bdf5.jpg",
    alt: "Origins and Early Support of the scholarship"
  },
  {
    src: "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/26d9d3e54868e42f8a2d3d1921ff8693.jpg",
    alt: "Overview of the REX Education Scholarship Program"
  },
  {
    src: "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/37a4709192a12f7ebc9c3f899945e6b2.jpg",
    alt: "Inclusivity and Target Beneficiaries"
  },
  {
    src: "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/ef53820a592a3b7677bc1bb371ca253b.jpg",
    alt: "Expansion of Scholarship Categories"
  },
  {
    src: "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/38c2469bc493e4f6289ce6b66add34b8.jpg",
    alt: "Program Consolidation and Aid Increase"
  },
  {
    src: "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/b098f0d2170318c3c78c7ee1e63e38c2.jpg",
    alt: "Impact and Legacy of the REX Education Scholarship Program"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const ImagePresentation = ({ onPresentationFinish }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [viewedImages, setViewedImages] = useState(new Set());
  const { toast } = useToast();

  const allImagesViewed = viewedImages.size === images.length;

  useEffect(() => {
    if (selectedImageIndex !== null) {
      setViewedImages(prev => new Set(prev).add(selectedImageIndex));
    }
  }, [selectedImageIndex]);

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const handleStartQuizClick = () => {
    if (!allImagesViewed) {
      toast({
        title: "Review Required",
        description: `Please view all ${images.length} images before starting the quiz. You've viewed ${viewedImages.size} so far.`,
        variant: "destructive",
      });
    } else {
      onPresentationFinish();
    }
  };
  
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            The REX Education Scholarship Story
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
            Before you begin, please review all key moments from the REX Education Scholarship Program's history. Click each image to expand and learn more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              onClick={() => setSelectedImageIndex(i)}
              className="cursor-pointer"
            >
              <Card className="relative overflow-hidden rounded-xl shadow-2xl bg-white/5 border border-white/10 group transform hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="aspect-w-16 aspect-h-9 h-full">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  {viewedImages.has(i) && (
                     <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <CheckCircle className="h-12 w-12 text-white" />
                     </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
          <motion.div
            custom={images.length}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="sm:col-span-2 lg:col-span-1 xl:col-span-1"
          >
            <Card className={`h-full rounded-xl shadow-2xl flex flex-col items-center justify-center p-8 text-center transition-colors duration-500 ${allImagesViewed ? 'bg-red-800/30 border-red-700/50' : 'bg-rose-600/20 border-rose-500/30'}`}>
              <h2 className="text-2xl font-bold text-white">{allImagesViewed ? "You're All Set!" : "Review Required"}</h2>
              <p className="text-slate-200 mt-2 mb-6">
                 {allImagesViewed 
                    ? "You've reviewed all materials. You may now proceed to the quiz." 
                    : `Please view all ${images.length} images to unlock the quiz.`
                 }
              </p>
              <div className="w-full mb-4">
                <div className="flex justify-between text-white text-sm mb-1">
                    <span>Progress</span>
                    <span>{viewedImages.size} / {images.length}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <motion.div 
                        className="bg-red-700 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(viewedImages.size / images.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
              </div>
              <Button onClick={handleStartQuizClick} size="lg" className="rounded-full px-8 py-6 text-lg font-bold w-full" disabled={!allImagesViewed}>
                <PlayCircle className="mr-2 h-6 w-6" />
                Start Quiz
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              key={selectedImageIndex}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <AnimatePresence mode="wait">
                  <motion.img
                      key={selectedImageIndex}
                      src={images[selectedImageIndex].src}
                      alt={images[selectedImageIndex].alt}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-lg shadow-2xl w-full h-auto max-h-[80vh] object-contain"
                  />
              </AnimatePresence>
              <button onClick={() => setSelectedImageIndex(null)} className="absolute -top-3 -right-3 bg-white rounded-full p-2 text-slate-800 hover:bg-slate-200 transition-colors z-10"><X size={24} /></button>
              <button onClick={handlePrev} className="absolute left-0 sm:-left-16 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-colors"><ChevronLeft size={28} /></button>
              <button onClick={handleNext} className="absolute right-0 sm:-right-16 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-colors"><ChevronRight size={28} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImagePresentation;
