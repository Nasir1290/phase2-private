"use client";

import Modal from "@/components/shared/modal/Modal";
import SuccessModal from "@/components/shared/modal/SuccessModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

interface CompanyRegistrationProps {
  toggleModal: () => void; // ✅ Explicitly define the toggle function type
}

const CompanyRegistration: React.FC<CompanyRegistrationProps> = ({ toggleModal }) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Extract form data
    const formData = new FormData(e.target as HTMLFormElement);
    const formObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    // ✅ Close registration modal
    toggleModal();

    // ✅ Open success modal
    setIsSuccessModalOpen(true);
  };

  // ✅ Toggle success modal
  const toggleSuccessModal = () => {
    setIsSuccessModalOpen((prev) => !prev);
  };

  return (
    <div>
      {/* ✅ Main Registration Modal */}
      <Modal isOpen={true} toggleModal={toggleModal}>
        <div className="space-y-4 max-h-[650px] overflow-y-auto">
          <h2 className="text-2xl font-bold">
            Registrati come <span className="text-primary">azienda</span>
          </h2>
          <p className="text-text_light_gray text-sm">
            Entra a far parte del nostro marketplace e raggiungi nuovi clienti. Offri i tuoi veicoli a noleggio con facilità e in totale sicurezza.
          </p>

          {/* ✅ Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Nome e cognome */}
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="name" className="font-medium">
                Nome e cognome <span className="text-xs text-text_light_gray">(facoltativo)</span>
              </Label>
              <Input type="text" id="name" name="name" className="shadow-md rounded-lg w-full border" />
            </div>

            {/* Numero di telefono */}
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="phone" className="font-medium">
                Numero di telefono
              </Label>
              <Input type="number" id="phone" name="phone" className="shadow-md rounded-lg w-full border" required />
            </div>

            {/* Email */}
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="email" className="font-medium">
                Email
              </Label>
              <Input type="email" id="email" name="email" className="shadow-md rounded-lg w-full border" required />
            </div>

            {/* Nome dell'azienda */}
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="companyName" className="font-medium">
                Nome dell&apos;azienda
              </Label>
              <Input type="text" id="companyName" name="companyName" className="shadow-md rounded-lg w-full border" />
            </div>

            {/* Sito web aziendale */}
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="companyWebsite" className="font-medium">
                Sito web aziendale <span className="text-xs text-text_light_gray">(facoltativo)</span>
              </Label>
              <Input type="text" id="companyWebsite" name="companyWebsite" className="shadow-md rounded-lg w-full border" />
            </div>

            {/* Messaggio */}
            <div className="grid w-full gap-3">
              <Label htmlFor="message" className="font-medium">
                Messaggio <span className="text-xs text-text_light_gray">(facoltativo)</span>
              </Label>
              <Textarea id="message" name="message" className="shadow-md rounded-lg w-full" />
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-primary text-white w-full px-6 py-3 rounded-lg font-medium">
              INVIA RICHIESTA
            </button>
          </form>
        </div>
      </Modal>

      {/* ✅ Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        toggleModal={toggleSuccessModal}
        messages={{
          title: "Messaggio inoltrato correttamente",
          description:
            "Il tuo messaggio è stato inoltrato con successo. Il nostro team ti contatterà al più presto per fornirti tutte le informazioni di cui hai bisogno.",
        }}
      />
    </div>
  );
};

export default CompanyRegistration;
