import chat from "@/assets/Chat.svg";
import icon1 from "@/assets/vehicle/phone.svg";
import reserve from "@/assets/vehicle/reserve-online.svg";
import Image from "next/image";
import Link from "next/link";

type ContactModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  id: string;
  phoneNumber: number | string;
  whatsappNumber: number | string;
};

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, toggleModal, id, phoneNumber }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-footer_bg bg-opacity-50 flex justify-center items-center z-50" onClick={toggleModal}>
      <div className="bg-white p-8 rounded-lg w-[450px] mx-auto relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={toggleModal} className="absolute top-3 right-5 text-2xl  text-text_light_gray hover:text-primary">
          &times;
        </button>

        <div className="flex flex-col items-center gap-3">
          <h2 className="text-[22px] font-semibold text-center">Scegli un canale di contatto</h2>
          <p className="text-text_light_gray text-[13px] font-medium">seleziona un metodo per noleggiare il veicolo</p>

          <Link
            href={`/veicoli/${id}/#rentalVehicle`}
            onClick={toggleModal}
            className="bg-green hover:bg-green/80 w-full text-[15px] font-medium text-white py-[14px] px-4 rounded-md flex items-center space-x-2 mt-4"
          >
            <span className="text-white text-2xl mr-24">
              <Image src={reserve} alt="reserve" width={24} height={24} className="w-5 h-5" />
            </span>
            <span>RISERVA ONLINE</span>
          </Link>
        </div>

        <div className="mt-4 flex justify-between gap-3">
          <a href={`tel:${phoneNumber}`} className="bg-white py-2 border shadow-lg text-sm px-4 w-full rounded-md flex items-center space-x-2">
            <Image src={icon1} alt="Phone Icon" width={24} height={24} className="w-5 h-5 mr-4" />
            <span>{phoneNumber}</span>
          </a>{" "}
          <a
            // href={`https://wa.me/${whatsappNumber}`}
            className="bg-white py-2 border shadow-lg text-sm px-4 w-full rounded-md flex items-center space-x-2"
          >
            <Image src={chat} alt="Chat Icon" width={24} height={24} className="w-5 h-5 mr-4" />
            <span>Chat</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
