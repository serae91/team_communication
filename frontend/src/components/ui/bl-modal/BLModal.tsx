import { motion, AnimatePresence } from "framer-motion";
import type React  from "react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: ()=>void;
  children?: ReactNode;
}

const BLModal: React.FC<ModalProps> = ({ isOpen, onClose, children }: ModalProps)=> {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {children}
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Schließen
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BLModal;
