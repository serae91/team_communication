import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { useModal } from '../../../providers/modal/ModalProvider.tsx';

interface ModalProps {
  children?: ReactNode;
  onClick?: () => void;
}

const BLModal = ({children, onClick}: ModalProps) => {
  const {globalModalState, closeGlobalModal, closeLocalModal} = useModal();
  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 bg-black/20 flex justify-center items-center z-50"
        onClick={ () => {
          if (globalModalState.type !== 'NONE')
            closeGlobalModal();
          else
            closeLocalModal();
          onClick?.();
        }
        }
        initial={ {opacity: 0} }
        animate={ {opacity: 1} }
        exit={ {opacity: 0} }
      >
        <motion.div
          className="shadow-lg w-[80%] h-[80vh] flex flex-col overflow-hidden"
          onClick={ (e) => e.stopPropagation() }
          initial={ {scale: 0.8, opacity: 0} }
          animate={ {scale: 1, opacity: 1} }
          exit={ {scale: 0.8, opacity: 0} }
        >
          <div className={ 'flex-1  h-[80vh]' }>
            { children }
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BLModal;
