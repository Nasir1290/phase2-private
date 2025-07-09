"use client";

import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "@/redux/slice/vehicleInsertSlice";
import { X } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useCallback, useRef, useState, useEffect } from "react";
import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { Separator } from "@/components/ui/separator";
import lock from "@/assets/vehicleInsertion/non-disponibile.svg";
import upload from "@/assets/vehicleInsertion/carica.svg";

interface MediaStepProps {
  errors: string[];
}
interface OtherImageSlotProps {
  index: number;
  image: string | null;
  onUpload: (index: number, file: File, imageUrl: string) => void;
  onRemove: (index: number) => void;
}

// A component for each additional image slot
function OtherImageSlot({
  index,
  image,
  onUpload,
  onRemove,
}: OtherImageSlotProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        onUpload(index, file, imageUrl);
      }
    },
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: false,
  });

  if (image) {
    return (
      <div className="w-[270px] h-[170px] relative border border-gray-50 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={`Vehicle photo ${index + 1}`}
          layout="fill"
          className="object-cover"
        />
        <button
          onClick={() => onRemove(index)}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className="w-[270px] h-[170px] relative border border-gray-50 rounded-lg flex items-center justify-center cursor-pointer transition-colors shadow-lg"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <Image src={upload} alt="upload" className="w-5 h-5" />
        <span className="text-sm text-gray-500">
          Clicca o trascina l’immagine
        </span>
      </div>
    </div>
  );
}

export function MediaStep({ errors }: MediaStepProps) {
  const dispatch = useDispatch();
  const hasError = (fieldName: string) => errors.includes(fieldName);

  const { formData } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: { form: { formData: any } }) => state.form
  );

  const [mainImage, setMainImage] = useState<string | null>(null);
  const [otherImages, setOtherImages] = useState<(string | null)[]>(
    Array(5).fill(null)
  );
  const otherImageFilesRef = useRef<(File | null)[]>(Array(5).fill(null));
  // Initialize state with Redux formData
  useEffect(() => {
    if (formData?.mainImage) {
      const url =
        formData.mainImage instanceof File
          ? URL.createObjectURL(formData.mainImage)
          : null;
      setMainImage(url);
    }

    if (formData?.otherImages) {
      const imageUrls = Array(5).fill(null);
      const imageFiles = Array(5).fill(null);

      formData.otherImages.forEach((image: File, index: number) => {
        if (image instanceof File) {
          imageUrls[index] = URL.createObjectURL(image);
          imageFiles[index] = image;
        }
      });

      setOtherImages(imageUrls);
      otherImageFilesRef.current = imageFiles;
    }
  }, [formData]);

  // Handle main image upload
  const onDropMainImage = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        setMainImage(imageUrl);
        dispatch(updateFormData({ mainImage: file }));
      }
    },
    [dispatch]
  );

  const { getRootProps: getMainRootProps, getInputProps: getMainInputProps } =
    useDropzone({
      onDrop: onDropMainImage,
      accept: { "image/*": [".jpeg", ".jpg", ".png"] },
      multiple: false,
    });

  // Update a specific slot when an image is dropped
  const handleUploadOtherImage = (
    index: number,
    file: File,
    imageUrl: string
  ) => {
    const newOtherImages = [...otherImages];
    newOtherImages[index] = imageUrl;
    setOtherImages(newOtherImages);

    const newOtherFiles = [...otherImageFilesRef.current];
    newOtherFiles[index] = file;
    otherImageFilesRef.current = newOtherFiles;

    dispatch(
      updateFormData({
        otherImages: newOtherFiles.filter(Boolean) as File[],
      })
    );
  };

  // Remove an image from a specific slot
  const handleRemoveOtherImage = (index: number) => {
    if (otherImages[index]) {
      URL.revokeObjectURL(otherImages[index]!);
    }

    const newOtherImages = [...otherImages];
    newOtherImages[index] = null;
    setOtherImages(newOtherImages);

    const newOtherFiles = [...otherImageFilesRef.current];
    newOtherFiles[index] = null;
    otherImageFilesRef.current = newOtherFiles;

    dispatch(
      updateFormData({
        otherImages: newOtherFiles.filter(Boolean) as File[],
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <VehicleInsertionHeader
        title="Foto"
        subtitle="Aggiungi, modifica o rimuovi immagini del tuo annuncio"
      />
      {/* Main Image Section */}
      <div className="pt-10">
        <p className="text-[17px] font-normal pb-6">Immagine principale</p>
        <div
          className={`relative xl:w-2/5 aspect-video rounded-lg overflow-hidden border shadow-lg flex items-center justify-center ${
            hasError("mainImage") && !formData.mainImage
              ? "border-red"
              : "border-gray-100"
          }`}
        >
          {mainImage ? (
            <div className="relative w-full h-full">
              <Image
                src={mainImage}
                alt="Main Image"
                layout="fill"
                className="object-cover"
              />
              <button
                onClick={() => {
                  if (mainImage) URL.revokeObjectURL(mainImage);
                  setMainImage(null);
                  dispatch(updateFormData({ mainImage: null }));
                }}
                className={`absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              {...getMainRootProps()}
              className={`w-full h-full flex flex-col items-center justify-center rounded-lg cursor-pointer transition-colors`}
            >
              <input {...getMainInputProps()} />
              <Image
                src={upload}
                alt="uploadIcon"
                className="w-6 h-6 text-gray-400"
              />
              <span className="text-sm text-gray-500 mt-4">
                Clicca o trascina l’immagine
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Additional Images Section */}
      <div className="pt-20">
        <p className="text-[17px] font-normal pb-6">Altre immagini</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {Array.from({ length: 5 }).map((_, index) => (
            <OtherImageSlot
              key={index}
              index={index}
              image={otherImages[index]}
              onUpload={handleUploadOtherImage}
              onRemove={handleRemoveOtherImage}
            />
          ))}
        </div>
      </div>
      <div>
        <Separator className="my-20" />
      </div>
      <div className="mt-10">
        <VehicleInsertionHeader
          title="Video"
          subtitle="Carica, modifica o rimuovi i video del tuo annuncio"
        />
        <p className="text-[17px] font-normal pb-6">Video principale</p>
        <div className="w-[300px] h-[180px] aspect-square rounded-lg flex flex-col gap-2 items-center justify-center cursor-pointer transition-colors shadow-lg border border-gray-50 bg-gray-100 p-4">
          <Image src={lock} alt="lock" className="w-[18px] h-[18px]" />
          <span className="underline text-text_dark_gray text-[15px]">
            Disponibile prossimamente
          </span>
        </div>
      </div>
      <div>
        <Separator className="my-20" />
      </div>
    </div>
  );
}
