import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode } from "react";
import { useModal } from '../../../providers/modal/ModalProvider.tsx';
import type { LocalModalTypeEnum } from '../../../enums/LocalModalTypeEnum.ts';

interface ModalProps {
  modalType: LocalModalTypeEnum;
  children?: ReactNode;
}

const BLModal = ({modalType, children}: ModalProps) => {
  const {globalModalState, closeGlobalModal, localModalState, closeLocalModal} = useModal();
  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 bg-black/20 flex justify-center items-center z-50"
        onClick={ () => {
          if (globalModalState.type !== 'NONE')
            closeGlobalModal();
          else
            closeLocalModal();
        }
        }
        initial={ {opacity: 0} }
        animate={ {opacity: 1} }
        exit={ {opacity: 0} }
      >
        <motion.div
          className="shadow-lg w-[80%] max-h-[80vh] flex flex-col"
          onClick={ (e) => e.stopPropagation() }
          initial={ {scale: 0.8, opacity: 0} }
          animate={ {scale: 1, opacity: 1} }
          exit={ {scale: 0.8, opacity: 0} }
        >
          <div className={ 'flex-1' }>
            { children }
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default BLModal;
