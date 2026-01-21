/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
// import { VehicleFormData } from "@/types/vehiclStep";
// import Image from "next/image";

// interface PhotosProps {
//   formData: VehicleFormData;
//   setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
// }

// const EditPhotos = ({ formData }: PhotosProps) => {
//   // Helper to get display URL regardless of image format
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const getDisplayUrl = (image: any): string | null => {
//     if (!image) return null;
//     if (typeof image === "string") return image;
//     if (image instanceof File) return URL.createObjectURL(image);
//     if (image.path) return image.path;
//     if (image.url) return image.url;
//     return null;
//   };

//   // Get URLs for display only (no state updates)
//   const mainImageUrl = getDisplayUrl(formData.mainImage);
//   const otherImageUrls =
//     formData.otherImages?.map(getDisplayUrl).filter(Boolean) || [];

//   return (
//     <div>
//       <VehicleInsertionHeader title="Foto" subtitle="Immagini del veicolo" />

//       {/* Main Image Display */}
//       <div className="space-y-4">
//         <p className="text-[17px] font-medium">Immagine Principale</p>
//         <div className="relative w-full max-w-[500px] aspect-video rounded-lg overflow-hidden border shadow-lg flex items-center justify-center">
//           {mainImageUrl ? (
//             <Image
//               src={mainImageUrl}
//               alt="Main Image"
//               fill
//               className="object-cover"
//               unoptimized={mainImageUrl.startsWith("blob:")}
//             />
//           ) : (
//             <div className="text-sm text-gray-500">
//               Nessuna immagine principale
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Other Images Display */}
//       <div className="pt-6">
//         <p className="text-[17px] font-medium pb-4">Altre Immagini</p>
//         <div className="flex flex-wrap gap-4">
//           {otherImageUrls.length > 0 ? (
//             otherImageUrls.map((url, index) => (
//               <div
//                 key={index}
//                 className="relative w-full max-w-[280px] h-[180px] border rounded-lg shadow-sm"
//               >
//                 <Image
//                   src={url || ""}
//                   alt={`Image ${index + 1}`}
//                   fill
//                   className="object-cover"
//                   unoptimized={url?.startsWith("blob:")}
//                 />
//               </div>
//             ))
//           ) : (
//             <div className="text-sm text-gray-500">
//               Nessun&apos;altra immagine disponibile
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditPhotos;

// "use client";

// import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
// import { VehicleFormData } from "@/types/vehiclStep";
// import Image from "next/image";
// import { useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { X, Upload, ImagePlus, Loader2 } from "lucide-react";
// import { useRemoveOtherImageMutation } from "@/redux/api/carApi";
// import { toast } from "sonner";

// interface PhotosProps {
//   formData: VehicleFormData;
//   setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
//   carId: string; // ← Required – pass carDetails?.id from parent
// }

// const MAX_OTHER_IMAGES = 6;

// const EditPhotos = ({ formData, setFormData, carId }: PhotosProps) => {
//   const mainInputRef = useRef<HTMLInputElement>(null);
//   const othersInputRef = useRef<HTMLInputElement>(null);

//   const [removeOtherImage, { isLoading: isAnyRemovalInProgress }] = useRemoveOtherImageMutation();

//   // Track which specific images (by index) are currently being removed
//   const [removingIndices, setRemovingIndices] = useState<Set<number>>(new Set());

//   // Helper to get display URL
//   const getDisplayUrl = (image: any): string | null => {
//     if (!image) return null;
//     if (typeof image === "string") return image;
//     if (image instanceof File) return URL.createObjectURL(image);
//     if (image.url) return image.url;
//     if (image.path) return image.path;
//     return null;
//   };

//   const mainImageUrl = getDisplayUrl(formData.mainImage);
//   const currentOtherImages = formData.otherImages || [];

//   // Fill up to 6 slots (existing + placeholders)
// const displaySlots: (string | File | null)[] = [...(formData.otherImages || [])];
// const placeholderCount = MAX_OTHER_IMAGES - displaySlots.length;
// for (let i = 0; i < placeholderCount; i++) {
//   displaySlots.push(null);
// }
//   // ─── Main Image Change ───
//   const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 10 * 1024 * 1024) {
//       alert("L'immagine è troppo grande (max 10MB)");
//       return;
//     }
//     if (!file.type.startsWith("image/")) {
//       alert("Solo immagini sono permesse");
//       return;
//     }

//     setFormData((prev) => ({ ...prev, mainImage: file }));
//     if (mainInputRef.current) mainInputRef.current.value = "";
//   };

//   // ─── Add Other Images ───
//   const handleOtherImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length === 0) return;

//     const currentCount = currentOtherImages.length;
//     const canAdd = MAX_OTHER_IMAGES - currentCount;

//     if (files.length > canAdd) {
//       alert(`Puoi aggiungere massimo ${canAdd} immagine/i`);
//       return;
//     }

//     const validFiles = files.filter(
//       (f) => f.size <= 10 * 1024 * 1024 && f.type.startsWith("image/")
//     );

//     if (validFiles.length === 0) return;

//     setFormData((prev) => ({
//       ...prev,
//       otherImages: [...(prev.otherImages || []), ...validFiles],
//     }));

//     if (othersInputRef.current) othersInputRef.current.value = "";
//   };

//   // ─── Remove Image ───
//   const handleRemoveImage = async (index: number, image: any) => {
//     // 1. Local / newly uploaded file → remove instantly
//     if (image instanceof File) {
//       setFormData((prev) => ({
//         ...prev,
//         otherImages: (prev.otherImages || []).filter((_, i) => i !== index),
//       }));
//       return;
//     }

//     // 2. Existing server image (URL string) → call API
//     if (typeof image === "string") {
//       // Mark this specific image as removing
//       setRemovingIndices((prev) => new Set([...prev, index]));

//       try {
//         await removeOtherImage({
//           imageUrl: image,
//           carId,
//         }).unwrap();

//         toast.success("Immagine rimossa con successo");

//         // Remove from form state after success
//         setFormData((prev) => ({
//           ...prev,
//           otherImages: (prev.otherImages || []).filter((_, i) => i !== index),
//         }));
//       } catch (err: any) {
//         console.error("Errore rimozione:", err);
//         toast.error(err?.data?.message || "Impossibile rimuovere l'immagine");
//       } finally {
//         // Always clean up loading state
//         setRemovingIndices((prev) => {
//           const next = new Set(prev);
//           next.delete(index);
//           return next;
//         });
//       }
//     }
//   };

//   const triggerMainUpload = () => mainInputRef.current?.click();
//   const triggerOthersUpload = () => othersInputRef.current?.click();

//   const anyRemovalInProgress = removingIndices.size > 0 || isAnyRemovalInProgress;

//   return (
//     <div className="space-y-10">
//       <VehicleInsertionHeader
//         title="Foto"
//         subtitle="Immagini del veicolo (principale + fino a 6 aggiuntive)"
//       />

//       {/* ─── Main Image ─── */}
//       <div className="space-y-4">
//         <div className="flex items-center">
//           <p className="text-[17px] font-medium">
//             Immagine Principale <span className="text-red-600">*</span>
//           </p>
//           <Button
//           className="ml-12 bg-emerald-100 border-2 border-emerald-200"
//             type="button"
//             variant="outline"
//             size="sm"
//             onClick={triggerMainUpload}
//             disabled={anyRemovalInProgress}
//           >
//             <Upload className="w-4 h-4 mr-2" />
//             Cambia immagine
//           </Button>
//         </div>

//         <input
//           ref={mainInputRef}
//           type="file"
//           accept="image/jpeg,image/png,image/webp"
//           onChange={handleMainImageChange}
//           className="hidden"
//         />

//         <div className="relative w-full max-w-[520px] aspect-video rounded-xl overflow-hidden border-2 border-dashed border-gray-300 shadow-md flex items-center justify-center bg-gray-50">
//           {mainImageUrl ? (
//             <Image
//               src={mainImageUrl}
//               alt="Immagine principale"
//               fill
//               className="object-cover"
//               unoptimized={mainImageUrl.startsWith("blob:")}
//             />
//           ) : (
//             <div className="text-center text-gray-500">
//               <ImagePlus className="w-12 h-12 mx-auto mb-3 opacity-60" />
//               <p>Nessuna immagine principale caricata</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ─── Other Images Section ─── */}
//       <div className="space-y-5">
//         <div className="flex items-center justify-between">
//           <p className="text-[17px] font-medium">Altre Immagini (max 6)</p>

//           {currentOtherImages.length < MAX_OTHER_IMAGES && (
//             <Button
//               type="button"
//               variant="outline"
//               size="sm"
//               onClick={triggerOthersUpload}
//               disabled={currentOtherImages.length >= MAX_OTHER_IMAGES || anyRemovalInProgress}
//             >
//               <ImagePlus className="w-4 h-4 mr-2" />
//               Aggiungi immagini
//             </Button>
//           )}
//         </div>

//         <input
//           ref={othersInputRef}
//           type="file"
//           accept="image/jpeg,image/png,image/webp"
//           multiple
//           onChange={handleOtherImagesChange}
//           className="hidden"
//         />

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {displaySlots.map((image, index) => {
//             const url = image ? getDisplayUrl(image) : null;
//             const isPlaceholder = !image;

//             const isThisRemoving = removingIndices.has(index);
//             const isDisabled = anyRemovalInProgress && !isThisRemoving;

//             return (
//               <div
//                 key={index}
//                 className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
//                   isPlaceholder
//                     ? "border-dashed border-gray-300 bg-gray-50"
//                     : "border-gray-200 shadow-sm"
//                 }`}
//               >
//                 {url ? (
//                   <>
//                     <Image
//                       src={url}
//                       alt={`Foto ${index + 1}`}
//                       fill
//                       className="object-cover"
//                       unoptimized={url.startsWith("blob:")}
//                     />

//                     <button
//                       type="button"
//                       onClick={() => handleRemoveImage(index, image)}
//                       disabled={isThisRemoving || anyRemovalInProgress}
//                       className={`
//                         absolute top-2 right-2 rounded-full p-1.5 shadow-md transition-all duration-200
//                         ${
//                           isThisRemoving
//                             ? "bg-gray-100 cursor-wait"
//                             : isDisabled
//                             ? "bg-white/60 opacity-50 cursor-not-allowed"
//                             : "bg-white/90 hover:bg-white text-red-600 hover:shadow-lg"
//                         }
//                       `}
//                     >
//                       {isThisRemoving ? (
//                         <Loader2 className="h-4 w-4 animate-spin text-gray-700" />
//                       ) : (
//                         <X size={16} />
//                       )}
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={triggerOthersUpload}
//                     disabled={currentOtherImages.length >= MAX_OTHER_IMAGES || anyRemovalInProgress}
//                     className={`
//                       absolute inset-0 flex flex-col items-center justify-center text-gray-400 transition
//                       ${anyRemovalInProgress ? "opacity-40 cursor-not-allowed" : "hover:text-gray-600"}
//                     `}
//                   >
//                     <ImagePlus size={28} className="mb-2" />
//                     <span className="text-xs">Slot libero</span>
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditPhotos;

"use client";

import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { VehicleFormData } from "@/types/vehiclStep";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload, ImagePlus, Loader2 } from "lucide-react";
import { useRemoveOtherImageMutation } from "@/redux/api/carApi";
import { toast } from "sonner";

interface PhotosProps {
  formData: VehicleFormData;
  setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
  carId: string;
}

const MAX_OTHER_IMAGES = 6;

const EditPhotos = ({ formData, setFormData, carId }: PhotosProps) => {
  const mainInputRef = useRef<HTMLInputElement>(null);
  const othersInputRef = useRef<HTMLInputElement>(null);

  const [removeOtherImage, { isLoading: isAnyRemovalInProgress }] =
    useRemoveOtherImageMutation();

  // Track which specific images (by index) are currently being removed
  const [removingIndices, setRemovingIndices] = useState<Set<number>>(
    new Set(),
  );

  // Helper to get display URL
  const getDisplayUrl = (image: any): string | null => {
    if (!image) return null;
    if (typeof image === "string") return image;
    if (image instanceof File) return URL.createObjectURL(image);
    if (image.url) return image.url;
    if (image.path) return image.path;
    return null;
  };

  const mainImageUrl = getDisplayUrl(formData.mainImage);
  const currentOtherImages = formData.otherImages || [];

  // Fill up to 6 slots (existing + placeholders)
  const displaySlots: (string | File | null)[] = [
    ...(formData.otherImages || []),
  ];
  const placeholderCount = MAX_OTHER_IMAGES - displaySlots.length;
  for (let i = 0; i < placeholderCount; i++) {
    displaySlots.push(null);
  }

  // ─── Main Image Change ───
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("L'immagine è troppo grande (max 10MB)");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Solo immagini sono permesse");
      return;
    }

    setFormData((prev) => ({ ...prev, mainImage: file }));
    if (mainInputRef.current) mainInputRef.current.value = "";
  };

  // ─── Remove Main Image ───
  const handleRemoveMainImage = () => {
    setFormData((prev) => ({
      ...prev,
      mainImage: null,
    }));
    // Optional: clear input value if needed
    if (mainInputRef.current) mainInputRef.current.value = "";
  };

  // ─── Add Other Images ───
  const handleOtherImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentCount = currentOtherImages.length;
    const canAdd = MAX_OTHER_IMAGES - currentCount;

    if (files.length > canAdd) {
      alert(`Puoi aggiungere massimo ${canAdd} immagine/i`);
      return;
    }

    const validFiles = files.filter(
      (f) => f.size <= 10 * 1024 * 1024 && f.type.startsWith("image/"),
    );

    if (validFiles.length === 0) return;

    setFormData((prev) => ({
      ...prev,
      otherImages: [...(prev.otherImages || []), ...validFiles],
    }));

    if (othersInputRef.current) othersInputRef.current.value = "";
  };

  // ─── Remove Other Image ───
  const handleRemoveImage = async (index: number, image: any) => {
    // 1. Local / newly uploaded file → remove instantly
    if (image instanceof File) {
      setFormData((prev) => ({
        ...prev,
        otherImages: (prev.otherImages || []).filter((_, i) => i !== index),
      }));
      return;
    }

    // 2. Existing server image (URL string) → call API
    if (typeof image === "string") {
      setRemovingIndices((prev) => new Set([...prev, index]));

      try {
        await removeOtherImage({
          imageUrl: image,
          carId,
        }).unwrap();

        toast.success("Immagine rimossa con successo");

        setFormData((prev) => ({
          ...prev,
          otherImages: (prev.otherImages || []).filter((_, i) => i !== index),
        }));
      } catch (err: any) {
        console.error("Errore rimozione:", err);
        toast.error(err?.data?.message || "Impossibile rimuovere l'immagine");
      } finally {
        setRemovingIndices((prev) => {
          const next = new Set(prev);
          next.delete(index);
          return next;
        });
      }
    }
  };

  const triggerMainUpload = () => mainInputRef.current?.click();
  const triggerOthersUpload = () => othersInputRef.current?.click();

  const anyRemovalInProgress =
    removingIndices.size > 0 || isAnyRemovalInProgress;

  return (
    <div className="space-y-10">
      <VehicleInsertionHeader
        title="Foto"
        subtitle="Immagini del veicolo (principale + fino a 6 aggiuntive)"
      />

      {/* ─── Main Image ─── */}
      <div className="space-y-4">
        <div className="flex items-center">
          <p className="text-[17px] font-medium">
            Immagine Principale <span className="text-red-600">*</span>
          </p>
          <Button
            className="ml-12 bg-emerald-100 border-2 border-emerald-200"
            type="button"
            variant="outline"
            size="sm"
            onClick={triggerMainUpload}
            disabled={anyRemovalInProgress}
          >
            <Upload className="w-4 h-4 mr-2" />
            Cambia immagine
          </Button>
        </div>

        <input
          ref={mainInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleMainImageChange}
          className="hidden"
        />

        <div className="relative w-full max-w-[520px] aspect-video rounded-xl overflow-hidden border-2 border-dashed border-gray-300 shadow-md flex items-center justify-center bg-gray-50">
          {mainImageUrl ? (
            <>
              <Image
                src={mainImageUrl}
                alt="Immagine principale"
                fill
                className="object-cover"
                unoptimized={mainImageUrl.startsWith("blob:")}
              />
              {/* ─── NEW: Remove button for main image ─── */}
              <button
                type="button"
                onClick={handleRemoveMainImage}
                disabled={anyRemovalInProgress}
                className={`
                  absolute top-2 right-2 rounded-full p-1.5 shadow-md transition-all duration-200
                  ${
                    anyRemovalInProgress
                      ? "bg-white/60 opacity-50 cursor-not-allowed"
                      : "bg-white/90 hover:bg-white text-red-600 hover:shadow-lg"
                  }
                `}
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <div className="text-center text-gray-500">
              <ImagePlus className="w-12 h-12 mx-auto mb-3 opacity-60" />
              <p>Nessuna immagine principale caricata</p>
            </div>
          )}
        </div>
      </div>

      {/* ─── Other Images Section ─── */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-[17px] font-medium">Altre Immagini (max 6)</p>

          {currentOtherImages.length < MAX_OTHER_IMAGES && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={triggerOthersUpload}
              disabled={
                currentOtherImages.length >= MAX_OTHER_IMAGES ||
                anyRemovalInProgress
              }
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Aggiungi immagini
            </Button>
          )}
        </div>

        <input
          ref={othersInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleOtherImagesChange}
          className="hidden"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displaySlots.map((image, index) => {
            const url = image ? getDisplayUrl(image) : null;
            const isPlaceholder = !image;

            const isThisRemoving = removingIndices.has(index);
            const isDisabled = anyRemovalInProgress && !isThisRemoving;

            return (
              <div
                key={index}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                  isPlaceholder
                    ? "border-dashed border-gray-300 bg-gray-50"
                    : "border-gray-200 shadow-sm"
                }`}
              >
                {url ? (
                  <>
                    <Image
                      src={url}
                      alt={`Foto ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized={url.startsWith("blob:")}
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, image)}
                      disabled={isThisRemoving || anyRemovalInProgress}
                      className={`
                        absolute top-2 right-2 rounded-full p-1.5 shadow-md transition-all duration-200
                        ${
                          isThisRemoving
                            ? "bg-gray-100 cursor-wait"
                            : isDisabled
                              ? "bg-white/60 opacity-50 cursor-not-allowed"
                              : "bg-white/90 hover:bg-white text-red-600 hover:shadow-lg"
                        }
                      `}
                    >
                      {isThisRemoving ? (
                        <Loader2 className="h-4 w-4 animate-spin text-gray-700" />
                      ) : (
                        <X size={16} />
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={triggerOthersUpload}
                    disabled={
                      currentOtherImages.length >= MAX_OTHER_IMAGES ||
                      anyRemovalInProgress
                    }
                    className={`
                      absolute inset-0 flex flex-col items-center justify-center text-gray-400 transition
                      ${anyRemovalInProgress ? "opacity-40 cursor-not-allowed" : "hover:text-gray-600"}
                    `}
                  >
                    <ImagePlus size={28} className="mb-2" />
                    <span className="text-xs">Slot libero</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditPhotos;
