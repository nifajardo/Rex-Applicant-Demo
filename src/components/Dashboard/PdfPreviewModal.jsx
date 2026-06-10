export const PdfPreviewModal = ({ isOpen, onClose, src }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-[90vw] h-[90vh] bg-background rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10"
        >
          ✕
        </button>

        <object
          data={src}
          type="application/pdf"
          className="w-full h-full rounded-lg"
        >
          <p className="text-center text-sm">
            PDF preview not supported.
            <a href={src} target="_blank" rel="noopener noreferrer">
              Open PDF
            </a>
          </p>
        </object>
      </div>
    </div>
  );
};
