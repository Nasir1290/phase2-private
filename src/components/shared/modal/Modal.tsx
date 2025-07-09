import { CgClose } from "react-icons/cg";

type ModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  children?: React.ReactNode;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  toggleModal,
  className,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-section_bg/70 flex justify-center items-center z-50`}
      onClick={toggleModal}
    >
      <div
        className={`bg-white px-4 py-6 sm:px-7 sm:py-6 rounded-lg shadow-black/40 shadow-2xl max-w-[360px] sm:max-w-sm md:max-w-md mx-auto relative  sm:min-w-[500px] ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={toggleModal}
          className="absolute top-3 right-3 text-lg text-text_light_gray hover:text-red"
        >
          <CgClose size={16} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
