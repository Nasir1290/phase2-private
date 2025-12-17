import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CgClose } from "react-icons/cg";
import infoIcon from "@/assets/vehicleInsertion/punto-info.svg";
import email from "@/assets/vehicleInsertion/email.svg";
import whatsapp from "@/assets/vehicleInsertion/whatsapp.svg";
import { VehicleFormData } from "@/types/vehiclStep";
import MapComponent from "@/components/vehicleInsert/mapComponent/MapComponent";

interface ContactProps {
  formData: VehicleFormData;
  onFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const EditContact = ({ formData, onFormChange }: ContactProps) => {
  const [countryCode, setCountryCode] = useState("ch");
  const [phoneNumber, setPhoneNumber] = useState(formData?.phoneNumber || "");
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal(!openModal);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResult = (result: any) => {
    // Update formData with the selected location
    onFormChange({
      target: { id: "location", value: result },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    if (formData?.phoneNumber) {
      setPhoneNumber(formData.phoneNumber);
    }
  }, [formData?.phoneNumber]);

  return (
    <div>
      {/* Contact Information */}
      <VehicleInsertionHeader title="Contatto" subtitle="Gestisci le tue opzioni di contatto in modo rapido e semplice" />
      {/* Contact Info  */}
      <div className="space-y-10">
        {/* Name of the inserter */}
        <div className="space-y-4">
          <Label htmlFor="contactName" className="font-normal">
            Nome dell’inserzionista
          </Label>

          <Input
            id="advertiserName"
            value={formData.advertiserName}
            onChange={onFormChange}
            placeholder="Bittengo SAGL"
            className="border border-black/5 shadow-lg shadow-black/10 p-5 max-w-[280px] rounded-lg"
          />
        </div>

        <div className="flex flex-wrap items-end gap-10">
          {/* Phone number */}
          <div className="space-y-4">
            <Label htmlFor="phone" className="font-normal">
              Numero di telefono
            </Label>
            <div className="flex gap-0 items-center border rounded-lg shadow-lg">
              <PhoneInput
                country={countryCode}
                value={phoneNumber} // Bind phoneNumber to value
                onChange={(phone, data) => {
                  if ("dialCode" in data) {
                    setCountryCode(data.countryCode); // Update country code
                    setPhoneNumber(phone); // Update phone number without the dial code

                    onFormChange({
                      target: { id: "phoneNumber", value: phone },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }
                }}
                // onChange={(phone) =>
                //   onFormChange({
                //     target: { id: "phoneNumber", value: countryCode + phone },
                //   } as React.ChangeEvent<HTMLInputElement>)
                // }

                inputStyle={{
                  width: "100%",
                  border: "none",
                  padding: "1.5rem 4.2rem",
                  borderRadius: "1.5rem 1.5rem 1.5rem 1.5rem",
                }}
                buttonStyle={{
                  border: "none",
                  borderRadius: "0.375rem 0 0 0.375rem",
                  padding: "0.5rem",
                  backgroundColor: "transparent",
                }}
                containerClass="w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-4">
            <Label htmlFor="email" className="font-normal">
              E-mail
            </Label>
            <div className="relative">
              <Image src={email} alt="email" className="z-10 absolute top-3.5 left-4 rounded-lg w-6 h-6" />
              <Input
                id="email"
                value={formData.email}
                onChange={onFormChange}
                className="relative border shadow-md w-72 rounded-lg px-12 py-6"
                placeholder="email@hotmail.com"
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div className="space-y-5 ">
            <div className="flex gap-4 items-center justify-between">
              <Label htmlFor="whatsapp" className="font-normal">
                Whatsapp
              </Label>
              <Image onClick={toggleModal} width={200} height={200} src={infoIcon} alt="info" className="w-4 h-4 opacity-80 mr-1" />
            </div>

            <div className="relative">
              <Image src={whatsapp} alt="whatsapp" className="z-10 absolute top-[13px] left-4 rounded-lg w-6 h-6" />
              <p className="z-10 absolute top-[13px] left-12">wa.me/</p>
              <Input
                id="whatsapp"
                value={formData.whatsapp}
                onChange={onFormChange}
                className="relative border shadow-md w-72 rounded-lg pl-[108px] pr-5 py-6"
                placeholder="41792682812"
              />
            </div>
          </div>
        </div>
        <div className="relative space-y-4 w-1/2">
          <MapComponent initialLocation={formData?.location} onResult={handleResult} />
        </div>
      </div>

      {/* WhatsApp Info Modal */}
      {openModal && (
        <div className="flex justify-center items-center z-50" onClick={toggleModal}>
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-[300px] mx-auto relative min-w-[400px]" onClick={(e) => e.stopPropagation()}>
            <button onClick={toggleModal} className="absolute top-3 right-3 text-lg text-gray-500 hover:text-primary">
              <CgClose size={15} />
            </button>
            <h2 className="text-xl font-medium">Whatsapp</h2>
            <p className="text-sm text-gray-600 mt-4">Inserisci il tuo numero con il prefisso internazionale senza spazi.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditContact;
