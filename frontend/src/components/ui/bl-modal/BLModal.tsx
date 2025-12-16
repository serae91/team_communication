import { motion, AnimatePresence } from "framer-motion";
import type React  from "react";
import type { ReactNode } from "react";
import { type ModalType, useModal } from '../../../providers/modal/ModalProvider.tsx';

interface ModalProps {
  modalType: ModalType;
  onClose?: ()=>void;
  children?: ReactNode;
}

const BLModal = ({ modalType, onClose, children }: ModalProps)=> {
  if(modalType === null) throw new Error('BLModal modalType must not be null');
  const {currentModal, closeModal} = useModal();
  return (
    <AnimatePresence>
      {currentModal === modalType && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={()=>{
            closeModal();
            if(onClose)onClose();
          }
        }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg max-w-md w-full max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className={'flex-1'}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BLModal;
