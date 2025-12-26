/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import flag from "@/assets/vehicleDetails/flag.svg";
import { Car } from "@/types/cars";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Separator } from "../ui/separator";
import ContactModal from "../veicoli/contactModal/ContactModal";

const AdvertiserPage = ({ car }: { car: Car }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const toggleModal = () => setIsContactModalOpen((prev) => !prev);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {[0].map((index) => (
          <div key={index}>
            <div className="w-[340px]  bg-white border border-black/5 rounded-2xl px-5 py-6 shadow-lg shadow-black/10">
              <div className="flex items-start justify-end">
                <div className="flex items-center">
                  <Image src={flag} alt="phone" width={20} height={20} className="w-3 h-3" />
                  <Link href="/contatti" className="text-xs ml-2 underline text-text_dark_gray">
                    Segnala
                  </Link>
                </div>
              </div>
              <div className="space-y-3">
                  <p className="text-text_light_gray text-sm">Inserzionista</p>
                  <h2 className="text-lg font-semibold text-text_dark_gray">{car?.advertiserName}</h2>
                </div>
              <Separator className="my-5" />
              <div className="shadow-lg shadow-black/25 rounded-lg">
                <button
                  onClick={toggleModal}
                  className="w-full bg-primary hover:bg-primary/80 text-white z-30 px-6 md:px-10 py-2 rounded-md font-medium text-sm"
                >
                  CONTATTA
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <ReservationModal isOpen={isModalOpen} onClose={handleCloseModal} vehicleName="Maserati Ghibli Gransport" /> */}
      <ContactModal
        isOpen={isContactModalOpen}
        toggleModal={toggleModal}
        id={car?.id}
        whatsappNumber={car?.whatsapp}
        phoneNumber={car?.phoneNumber}
      />
    </div>
  );
};

export default AdvertiserPage;
