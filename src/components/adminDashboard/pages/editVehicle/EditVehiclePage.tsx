/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { VehicleFormData } from "@/types/vehiclStep";
import { useRouter } from "next/navigation";
import {
  useGetCarByIDQuery,
  useUpdateCarDetailsMutation,
} from "@/redux/api/carApi";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import EditRegistration from "./EditRegistration";
import EditDetails from "./EditDetails";
import EditFuel from "./EditFuel";
import EditPhotos from "./EditPhotos";
import EditDescription from "./EditDescription";
import EditPrice from "./EditPrice";
import EditAccessori from "./EditAccessori";
import EditContact from "./EditContact";
import EditAuthentication from "./EditAuthentication";

const EditVehicle = () => {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();
  const { data: singleCarDetails } = useGetCarByIDQuery(id);
  const carDetails = singleCarDetails?.data;
  const [updateCar] = useUpdateCarDetailsMutation();
  const router = useRouter();

  // Initialize empty form state
  const [formData, setFormData] = useState<VehicleFormData>({
    category: "",
    brand: "",
    model: "",
    year: 2025,
    transmission: "",
    color: "",
    kmh: 0,
    engine: "",
    maxSpeed: 0,
    horsePower: 0,
    seats: 0,
    fuelType: "",
    otherImages: [],
    mainImage: null,
    video: undefined,
    description: "",
    deposite: "",
    depositePolicy: "",
    fuelPolicy: "",
    mileagePolicy: "",
    damagePolicy: "",
    price: [],
    accessories: [],
    advertiserName: "",
    phoneNumber: "",
    email: "",
    whatsapp: "",
    authenticationFile: null,
    ownerId: "",
    location: "",
    latitude: 0,
    longitude: 0,
  });

  // Initialize form data when carDetails loads
  useEffect(() => {
    if (carDetails) {
      setFormData({
        category: carDetails.category || "",
        brand: carDetails.brand || "",
        model: carDetails.model || "",
        year: carDetails.year || 2025,
        transmission: carDetails.transmission || "",
        color: carDetails.color || "",
        kmh: carDetails.kmh || 0,
        engine: carDetails.engine || "",
        maxSpeed: carDetails.maxSpeed || 0,
        horsePower: carDetails.horsePower || 0,
        seats: carDetails.seats || 0,
        fuelType: carDetails.fuelType || "",
        otherImages: carDetails.otherImages || [],
        mainImage: carDetails.mainImage || null,
        video: carDetails.video || undefined,
        description: carDetails.description || "",
        deposite: carDetails.deposite || 0,
        depositePolicy: carDetails.depositePolicy || "",
        fuelPolicy: carDetails.fuelPolicy || "",
        mileagePolicy: carDetails.mileagePolicy || "",
        damagePolicy: carDetails.damagePolicy || "",
        price: carDetails.price || [],
        accessories: carDetails.accessories || [],
        advertiserName: carDetails.advertiserName || "",
        phoneNumber: carDetails.phoneNumber || "",
        email: carDetails.email || "",
        whatsapp: carDetails.whatsapp || "",
        authenticationFile: carDetails.authenticationFile || null,
        ownerId: carDetails.ownerId || "",
        location: carDetails.location || "",
        latitude: carDetails.latitude || 0,
        longitude: carDetails.longitude || 0,
      });
    }
  }, [carDetails]);
  // console.log(formData)

  // Handle form field changes
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle accessories changes
  const handleAccessoriesChange = (name: string, value: any[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        ownerId: formData.ownerId,
        category: formData.category,
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
        transmission: formData.transmission,
        color: formData.color,
        kmh: formData.kmh,
        engine: formData.engine,
        maxSpeed: formData.maxSpeed,
        horsePower: formData.horsePower,
        seats: formData.seats,
        fuelType: formData.fuelType,
        description: formData.description,
        deposite: formData.deposite,
        depositePolicy: formData.depositePolicy,
        fuelPolicy: formData.fuelPolicy,
        mileagePolicy: formData.mileagePolicy,
        damagePolicy: formData.damagePolicy,
        accessories: formData.accessories,
        price: formData.price,
        advertiserName: formData.advertiserName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        whatsapp: formData.whatsapp,
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
      };

      // If you don't need files, send it as plain JSON
      const result = await updateCar({
        id,
        data,
      }).unwrap();

      if (result.success) {
        toast.success("Vehicle updated successfully!");
        router.push(`/dashboard`);
        router.refresh();
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.message || "Error updating vehicle");
    }
  };

  return (
    <div className="px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <EditRegistration
          formData={formData}
          onFormChange={handleFormChange}
          setFormData={setFormData}
        />
        <EditDetails
          formData={formData}
          onFormChange={handleFormChange}
          setFormData={setFormData}
        />
        <EditFuel formData={formData} onFormChange={handleFormChange} />
        <EditPhotos
          formData={formData}
          setFormData={setFormData}
          carId={id as string}
        />
        <EditDescription
          formData={formData}
          onFormChange={handleFormChange}
          setFormData={setFormData}
        />
        <EditPrice formData={formData} setFormData={setFormData} />
        <EditAccessori
          formData={formData}
          onFormChange={handleAccessoriesChange}
        />
        <EditContact formData={formData} onFormChange={handleFormChange} />
        <EditAuthentication formData={formData} setFormData={setFormData} />

        <div>
          <Separator className="my-20" />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary hover:bg-primary text-white py-2 px-8 w-48 rounded-lg shadow-lg text-lg font-semibold"
          >
            Salva
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVehicle;
