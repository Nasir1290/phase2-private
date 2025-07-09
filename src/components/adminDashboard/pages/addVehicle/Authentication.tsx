import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import upload from "@/assets/vehicleInsertion/carica.svg";
import { VehicleFormData } from "@/types/vehiclStep";

// interface AuthenticationProps {
//   formData: VehicleFormData;
//   onFormChange: (
//     event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => void;
// }

interface AuthenticationProps {
  formData: VehicleFormData;
  setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
}

const Authentication = ({ formData, setFormData }: AuthenticationProps) => {
  const [authenticationImage, setAuthenticationImage] = useState<string | null>(
    null
  );
  const handleAuthenticationImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAuthenticationImage(URL.createObjectURL(file));

      // Update formData with the uploaded file
      // onFormChange({
      //   target: {
      //     id: "authenticationFile",
      //     value: file,
      //   },
      // });
      setFormData({
        ...formData,
        authenticationFile: file, // Store the file in formData if necessary
      });
    }
  };

  // Remove Authentication Image
  const removeAuthenticationImage = () => {
    if (authenticationImage) URL.revokeObjectURL(authenticationImage);
    setAuthenticationImage(null);

    // Remove the file from formData
    // onFormChange({
    //   target: {
    //     id: "authenticationFile",
    //     value: null,
    //   },
    // });
    setFormData({
      ...formData,
      authenticationFile: null,
    });
  };

  return (
    <div>
      <VehicleInsertionHeader
        title="Autentificazione"
        subtitle="Carica l'immagine della carta grigia del tuo veicolo"
      />
      <div className="relative w-2/5 aspect-video rounded-lg overflow-hidden border shadow-lg flex items-center justify-center">
        {authenticationImage ? (
          <div className="relative w-full h-full">
            <Image
              src={authenticationImage}
              alt="Authentication Image"
              layout="fill"
              className="object-cover"
            />
            <button
              onClick={removeAuthenticationImage}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="authenticationImage"
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              // value={formData.authenticationFile}
              onChange={handleAuthenticationImageUpload}
              className="hidden"
              id="authenticationImage"
            />
            <Image src={upload} alt="upload" className="w-5 h-5" />
            <span className="text-sm text-gray-500 mt-4">
              Clicca o trascina l&apos;immagine
            </span>
          </label>
        )}
      </div>
    </div>
  );
};

export default Authentication;
