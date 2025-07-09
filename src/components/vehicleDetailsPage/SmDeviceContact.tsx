import { useState, useEffect } from "react";
import Rental from "./Rental"; // Assuming Rental is a component imported
import { Car } from "@/types/cars"; // Assuming Car type is imported
import ContactModal from "../veicoli/contactModal/ContactModal"; // Assuming ContactModal is imported

interface SmDeviceContactProps {
  car: Car;
}

const SmDeviceContact = ({ car }: SmDeviceContactProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"reserve" | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showBar, setShowBar] = useState(false); // State to control visibility of the fixed bar

  // Function to open modal and set the type (reserve)
  const openModal = (type: "reserve") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  // Function to toggle the ContactModal
  const toggleContactModal = () => {
    setIsContactModalOpen((prev) => !prev);
  };

  // Detect scroll to show/hide the fixed bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowBar(true); // Show bar when scrolling starts
      } else {
        setShowBar(false); // Hide bar when at the top of the page
      }
    };

    // Add event listener on component mount
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* Fixed bar at the bottom with smooth animation */}
      {showBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white z-50 shadow-md px-2 py-3 transition-all duration-1000 transform translate-y-0 border flex justify-between">
          <div className="flex flex-col justify-between items-start">
            <p className="text-sm text-text_light_gray">Inserzionista</p>
            <p className="text-base font-medium">{car?.advertiserName}</p>
          </div>
          <div className="flex gap-1 text-sm font-semibold">
            <button
              onClick={toggleContactModal}
              className="bg-green text-white h-9  px-8 rounded-lg w-full"
            >
              Contatta
            </button>
            <button
              onClick={() => openModal("reserve")}
              className="bg-red text-white h-9  px-8 rounded-lg w-full"
            >
              Riserva
            </button>
          </div>
        </div>
      )}

      {/* Main Modal */}
      {isModalOpen && modalType === "reserve" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl max-h-[100vh] overflow-y-auto w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Reserve Now</h3>
              <button onClick={closeModal} className="text-xl font-bold">
                ×
              </button>
            </div>
            <div className="mb-4">
              <Rental car={car} />
            </div>
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Contact Modal - Opens outside of the main modal */}
      {isContactModalOpen && (
        <ContactModal
          isOpen={isContactModalOpen}
          toggleModal={toggleContactModal}
          id={car?.id}
          whatsappNumber={car?.whatsapp}
          phoneNumber={car?.phoneNumber}
        />
      )}
    </div>
  );
};

export default SmDeviceContact;
