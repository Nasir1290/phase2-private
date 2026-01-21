/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable @next/next/no-img-element */
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



// import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
// import { VehicleFormData } from "@/types/vehiclStep";

// interface AuthenticationProps {
//   formData: VehicleFormData;
// }

// const EditAuthentication = ({ formData }: AuthenticationProps) => {
//   // Helper function to get display URL for different image formats
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const getImageUrl = (file: any): string | null => {
//     if (!file) return null;
//     if (typeof file === "string") return file; // URL string
//     if (file instanceof File) return URL.createObjectURL(file); // New file upload
//     if (file.url) return file.url; // Existing file object
//     return null;
//   };

//   const authFileUrl = getImageUrl(formData.authenticationFile);

//   return (
//     <div>
//       <VehicleInsertionHeader
//         title="Authentication"
//         subtitle="Vehicle authentication document"
//       />

//       <div className="mt-4">
//         <div className="relative w-full max-w-md aspect-[4/3] border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
//           {authFileUrl ? (
//             <img
//               src={authFileUrl}
//               alt="Authentication document"
//               className="object-contain"
//               onLoad={() => {
//                 if (formData.authenticationFile instanceof File) {
//                   URL.revokeObjectURL(authFileUrl);
//                 }
//               }}
//             />
//           ) : (
//             <p className="text-gray-500 text-center p-4">
//               No authentication document uploaded
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditAuthentication;



import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import upload from "@/assets/vehicleInsertion/carica.svg";
import { VehicleFormData } from "@/types/vehiclStep";

interface AuthenticationProps {
  formData: VehicleFormData;
  setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
}

const EditAuthentication = ({ formData, setFormData }: AuthenticationProps) => {
  // Local preview — can be either a server URL (string) or a local object URL (string)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Initialize preview from existing data when component mounts / formData changes
  useEffect(() => {
    if (formData.authenticationFile) {
      // Case 1: It's already a File → create local preview URL
      if (formData.authenticationFile instanceof File) {
        const objectUrl = URL.createObjectURL(formData.authenticationFile);
        setPreviewUrl(objectUrl);

        // Cleanup when component unmounts or file changes
        return () => {
          URL.revokeObjectURL(objectUrl);
        };
      }
      // Case 2: It's a string (URL from server)
      else if (typeof formData.authenticationFile === "string") {
        setPreviewUrl(formData.authenticationFile);
      }
    } else {
      setPreviewUrl(null);
    }
  }, [formData.authenticationFile]);

  const handleAuthenticationImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke previous preview if it was a local object URL
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const newPreview = URL.createObjectURL(file);
    setPreviewUrl(newPreview);

    // Store the actual File in formData
    setFormData((prev) => ({
      ...prev,
      authenticationFile: file,
    }));
  };

  const removeAuthenticationImage = () => {
    // Clean up local blob URL if it exists
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);

    // Clear the file from form data
    setFormData((prev) => ({
      ...prev,
      authenticationFile: null,
    }));
  };

  return (
    <div>
      <VehicleInsertionHeader
        title="Autentificazione"
        subtitle="Carica l'immagine della carta grigia del tuo veicolo"
      />

      <div className="relative w-2/5 aspect-video rounded-lg overflow-hidden border shadow-lg flex items-center justify-center bg-gray-50">
        {previewUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={previewUrl}
              alt="Authentication document preview"
              fill
              className="object-cover"
              unoptimized={previewUrl.startsWith("blob:")} // ← important for local blob URLs
            />
            <button
              onClick={removeAuthenticationImage}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition"
              type="button"
              aria-label="Remove image"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="authentication-upload"
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleAuthenticationImageUpload}
              className="hidden"
              id="authentication-upload"
            />
            <Image src={upload} alt="Upload icon" width={32} height={32} className="mb-3 opacity-70" />
            <span className="text-sm text-gray-600 font-medium">
              Clicca o trascina l'immagine
            </span>
            <span className="text-xs text-gray-400 mt-1">PNG, JPG, max 10MB</span>
          </label>
        )}
      </div>
    </div>
  );
};

export default EditAuthentication;