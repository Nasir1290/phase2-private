import Image from "next/image";
import SuccessIcon from "@/assets/contact/reserve-icon.svg";
import { CgClose } from "react-icons/cg";

type SuccessModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  messages: {
    title: string;
    description: string;
  };
};

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  toggleModal,
  messages,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-section_bg/70 flex justify-center items-center z-50"
      onClick={toggleModal}
    >
      <div
        className="bg-white px-7 py-6 rounded-lg shadow-black/40 shadow-2xl max-w-sm md:max-w-md mx-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={toggleModal}
          className="absolute top-3 right-5 text-lg text-text_light_gray hover:text-red"
        >
          <CgClose />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            src={SuccessIcon}
            alt="Success"
            width={100}
            height={100}
            className="mr-3"
          />
          <h2 className="text-xl font-semibold">{messages?.title}</h2>
          <p className="text-sm text-text_light_gray mb-6 text-center">
            <span className="text-sm text-green-500">
              {messages?.description}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
