import React from "react";

interface BLSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BLSectionModal: React.FC<BLSectionModalProps> = ({isOpen, onClose, children}) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/50"
      onClick={ onClose }
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl"
        onClick={ (e) => e.stopPropagation() }
      >
        { children }
        <button
          onClick={ onClose }
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

export default BLSectionModal;
