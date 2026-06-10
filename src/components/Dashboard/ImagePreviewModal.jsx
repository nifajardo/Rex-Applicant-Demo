import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const ImagePreviewModal = ({ isOpen, onClose, src }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-[90vw] max-h-[90vh] bg-background rounded-lg shadow-lg p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>

          <img
            src={src}
            alt="Preview"
            className="max-h-[80vh] max-w-[85vw] rounded"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
