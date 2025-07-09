import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { VehicleFormData } from "@/types/vehiclStep";
import Image from "next/image";

interface PhotosProps {
  formData: VehicleFormData;
  setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
}

const EditPhotos = ({ formData }: PhotosProps) => {
  // Helper to get display URL regardless of image format
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getDisplayUrl = (image: any): string | null => {
    if (!image) return null;
    if (typeof image === "string") return image;
    if (image instanceof File) return URL.createObjectURL(image);
    if (image.path) return image.path;
    if (image.url) return image.url;
    return null;
  };

  // Get URLs for display only (no state updates)
  const mainImageUrl = getDisplayUrl(formData.mainImage);
  const otherImageUrls =
    formData.otherImages?.map(getDisplayUrl).filter(Boolean) || [];

  return (
    <div>
      <VehicleInsertionHeader title="Foto" subtitle="Immagini del veicolo" />

      {/* Main Image Display */}
      <div className="space-y-4">
        <p className="text-[17px] font-medium">Immagine Principale</p>
        <div className="relative w-full max-w-[500px] aspect-video rounded-lg overflow-hidden border shadow-lg flex items-center justify-center">
          {mainImageUrl ? (
            <Image
              src={mainImageUrl}
              alt="Main Image"
              fill
              className="object-cover"
              unoptimized={mainImageUrl.startsWith("blob:")}
            />
          ) : (
            <div className="text-sm text-gray-500">
              Nessuna immagine principale
            </div>
          )}
        </div>
      </div>

      {/* Other Images Display */}
      <div className="pt-6">
        <p className="text-[17px] font-medium pb-4">Altre Immagini</p>
        <div className="flex flex-wrap gap-4">
          {otherImageUrls.length > 0 ? (
            otherImageUrls.map((url, index) => (
              <div
                key={index}
                className="relative w-full max-w-[280px] h-[180px] border rounded-lg shadow-sm"
              >
                <Image
                  src={url || ""}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={url?.startsWith("blob:")}
                />
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">
              Nessun&apos;altra immagine disponibile
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPhotos;
