/* eslint-disable @next/next/no-img-element */
// import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
// import { X } from "lucide-react";
// import Image from "next/image";
// import React, { useState } from "react";
// import upload from "@/assets/vehicleInsertion/carica.svg";
// import { VehicleFormData } from "@/types/vehiclStep";

// interface AuthenticationProps {
//   formData: VehicleFormData;
//   setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
// }

// const EditAuthentication = ({ formData, setFormData }: AuthenticationProps) => {
//   const [authenticationImage, setAuthenticationImage] = useState<string | null>(
//     null
//   );
//   const handleAuthenticationImageUpload = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = event.target.files[0];
//       setAuthenticationImage(URL.createObjectURL(file));

//       // Update formData with the uploaded file
//       // onFormChange({
//       //   target: {
//       //     id: "authenticationFile",
//       //     value: file,
//       //   },
//       // });
//       setFormData({
//         ...formData,
//         authenticationFile: file, // Store the file in formData if necessary
//       });
//     }
//   };

//   // Remove Authentication Image
//   const removeAuthenticationImage = () => {
//     if (authenticationImage) URL.revokeObjectURL(authenticationImage);
//     setAuthenticationImage(null);

//     // Remove the file from formData
//     // onFormChange({
//     //   target: {
//     //     id: "authenticationFile",
//     //     value: null,
//     //   },
//     // });
//     setFormData({
//       ...formData,
//       authenticationFile: null,
//     });
//   };

//   return (
//     <div>
//       <VehicleInsertionHeader
//         title="Autentificazione"
//         subtitle="Carica l'immagine della carta grigia del tuo veicolo"
//       />
//       <div className="relative w-2/5 aspect-video rounded-lg overflow-hidden border shadow-lg flex items-center justify-center">
//         {authenticationImage ? (
//           <div className="relative w-full h-full">
//             <Image
//               src={authenticationImage}
//               alt="Authentication Image"
//               layout="fill"
//               className="object-cover"
//             />
//             <button
//               onClick={removeAuthenticationImage}
//               className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         ) : (
//           <label
//             htmlFor="authenticationImage"
//             className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
//           >
//             <input
//               type="file"
//               accept="image/*"
//               // value={formData.authenticationFile}
//               onChange={handleAuthenticationImageUpload}
//               className="hidden"
//               id="authenticationImage"
//             />
//             <Image src={upload} alt="upload" className="w-5 h-5" />
//             <span className="text-sm text-gray-500 mt-4">
//               Clicca o trascina l&apos;immagine
//             </span>
//           </label>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EditAuthentication;

import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { VehicleFormData } from "@/types/vehiclStep";

interface AuthenticationProps {
  formData: VehicleFormData;
}

const EditAuthentication = ({ formData }: AuthenticationProps) => {
  // Helper function to get display URL for different image formats
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getImageUrl = (file: any): string | null => {
    if (!file) return null;
    if (typeof file === "string") return file; // URL string
    if (file instanceof File) return URL.createObjectURL(file); // New file upload
    if (file.url) return file.url; // Existing file object
    return null;
  };

  const authFileUrl = getImageUrl(formData.authenticationFile);

  return (
    <div>
      <VehicleInsertionHeader
        title="Authentication"
        subtitle="Vehicle authentication document"
      />

      <div className="mt-4">
        <div className="relative w-full max-w-md aspect-[4/3] border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
          {authFileUrl ? (
            <img
              src={authFileUrl}
              alt="Authentication document"
              className="object-contain"
              onLoad={() => {
                if (formData.authenticationFile instanceof File) {
                  URL.revokeObjectURL(authFileUrl);
                }
              }}
            />
          ) : (
            <p className="text-gray-500 text-center p-4">
              No authentication document uploaded
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditAuthentication;
