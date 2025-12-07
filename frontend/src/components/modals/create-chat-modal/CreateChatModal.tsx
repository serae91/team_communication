import BLModal from '../../ui/bl-modal/BLModal.tsx';
import BLLeftMarkedCard from '../../ui/bl-left-marked-card/BLLeftMarkedCard.tsx';

interface CreateChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateChatModal = ({ isOpen, onClose }: CreateChatModalProps) => {
  return(
    <BLModal isOpen={isOpen}>
      <BLLeftMarkedCard>

      </BLLeftMarkedCard>
    </BLModal>)
}