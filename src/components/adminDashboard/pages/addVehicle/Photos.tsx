import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { VehicleFormData } from "@/types/vehiclStep";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
const MAX_IMAGES = 6;

interface PhotosProps {
  formData: VehicleFormData;
  setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
}

const Photos = ({ formData, setFormData }: PhotosProps) => {
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [otherImages, setOtherImages] = useState<string[]>([]);

  // Handle Main Image Upload
  const onDropMainImage = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        setMainImage(imageUrl);
        setFormData({
          ...formData,
          mainImage: file, // Store the file in formData if necessary
        });
      }
    },
    [setFormData, formData]
  );

  // Handle Additional Images Upload (Max 5 additional images)
  const onDropOtherImages = useCallback(
    (acceptedFiles: File[]) => {
      // Safely check length of otherImages, ensuring it's never null or undefined
      if ((otherImages?.length || 0) + acceptedFiles.length > 5) {
        alert(`You can only upload up to ${MAX_IMAGES - 1} additional images.`);
        return;
      }
      const newImageUrls = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setOtherImages((prev) => [...prev, ...newImageUrls]); // Update local state
      setFormData({
        ...formData,
        otherImages: [
          ...(formData.otherImages || []), // Safely handle undefined or null
          ...acceptedFiles,
        ], // Store the files in formData
      });
    },
    [otherImages.length, setFormData, formData] // Ensure otherImages is updated
  );

  // Remove Main Image
  const removeMainImage = () => {
    if (mainImage) URL.revokeObjectURL(mainImage);
    setMainImage(null);
  };

  // Remove Additional Images
  const removeOtherImage = (index: number) => {
    const updatedOtherImages = [...otherImages];
    URL.revokeObjectURL(updatedOtherImages[index]);
    updatedOtherImages.splice(index, 1);
    setOtherImages(updatedOtherImages);
  };

  // Dropzone Hooks
  const { getRootProps: getMainRootProps, getInputProps: getMainInputProps } =
    useDropzone({
      onDrop: onDropMainImage,
      accept: { "image/*": [".jpeg", ".jpg", ".png"] },
      multiple: false,
    });

  const { getRootProps: getOtherRootProps, getInputProps: getOtherInputProps } =
    useDropzone({
      onDrop: onDropOtherImages,
      accept: { "image/*": [".jpeg", ".jpg", ".png"] },
      multiple: true,
    });

  return (
    <div>
      {/* Section Header */}
      <VehicleInsertionHeader
        title="Foto"
        subtitle="Aggiungi, modifica o rimuovi immagini del tuo annuncio"
      />

      {/* Main Image Upload */}
      <div className="space-y-4">
        <p className="text-[17px] font-medium">Immagine Principale</p>
        <div className="relative w-[500px] aspect-video rounded-lg overflow-hidden border shadow-lg flex items-center justify-center">
          {mainImage ? (
            <div className="relative w-full h-full">
              <Image
                src={mainImage}
                alt="Main Image"
                layout="fill"
                className="object-cover"
              />
              <button
                onClick={removeMainImage}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              {...getMainRootProps()}
              className="w-full h-full flex flex-col items-center justify-center rounded-lg cursor-pointer transition-colors"
            >
              <input {...getMainInputProps()} />
              <Upload className="w-6 h-6 text-black" />
              <span className="text-sm text-gray-500 mt-4">
                Clicca o trascina l&apos;immagine
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Additional Images Upload */}
      <div className="pt-6">
        <p className="text-[17px] font-medium pb-4">Altre Immagini</p>
        <div className="flex flex-wrap gap-4">
          {/* Display Uploaded Images */}
          {otherImages.map((preview, index) => (
            <div
              key={preview}
              className="relative w-[280px] h-[180px] border rounded-lg shadow-sm"
            >
              <Image
                src={preview}
                alt={`Image ${index + 1}`}
                layout="fill"
                className="object-cover"
              />
              <button
                onClick={() => removeOtherImage(index)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Upload Box (If not reached max images) */}
          {otherImages.length < 5 && (
            <div
              {...getOtherRootProps()}
              className="w-[280px] h-[180px] border rounded-lg flex items-center justify-center cursor-pointer transition-colors shadow-lg"
            >
              <input {...getOtherInputProps()} />
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-5 h-5 text-black" />
                <span className="text-sm text-gray-500">Aggiungi immagine</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Photos;
