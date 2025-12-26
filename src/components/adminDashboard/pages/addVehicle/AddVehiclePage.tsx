/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "react-phone-input-2/lib/style.css";
import { Separator } from "@/components/ui/separator";
import Registration from "./Registration";
import Details from "./Details";
import Fuel from "./Fuel";
import Photos from "./Photos";
import Description from "./Description";
import Price from "./Price";
import Accessori from "./Accessori";
import Contact from "./Contact";
import Authentication from "./Authentication";
import { useState } from "react";
import { VehicleFormData } from "@/types/vehiclStep";
import { useCreateCarMutation } from "@/redux/api/carApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddVehiclePage = () => {
  const [createCar, { isLoading }] = useCreateCarMutation();
  const router = useRouter();
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

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { id: string; value: any } } // Add this type
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    const bodyData = new FormData();

    const data = {
      ownerId: formData.ownerId,
      category: formData?.category,
      brand: formData?.brand,
      model: formData?.model,
      year: formData?.year,
      transmission: formData?.transmission,
      color: formData?.color,
      kmh: formData?.kmh,
      engine: formData?.engine,
      maxSpeed: formData?.maxSpeed,
      horsePower: formData?.horsePower,
      seats: formData?.seats,
      fuelType: formData?.fuelType,
      description: formData?.description,
      deposite: formData?.deposite,
      depositePolicy: formData?.depositePolicy,
      fuelPolicy: formData?.fuelPolicy,
      mileagePolicy: formData?.mileagePolicy,
      damagePolicy: formData?.damagePolicy,
      accessories: formData?.accessories,
      price: formData?.price,
      advertiserName: formData?.advertiserName,
      phoneNumber: formData?.phoneNumber,
      email: formData?.email,
      whatsapp: formData?.whatsapp,
      location: formData?.location,
      latitude: formData?.latitude,
      longitude: formData?.longitude,
    };

    bodyData.append("bodyData", JSON.stringify(data));

    if (formData?.otherImages) {
      formData?.otherImages.forEach((image) => {
        bodyData.append("otherImages", image);
      });
    }

    if (formData?.video) {
      bodyData.append("video", formData?.video);
    }

    if (formData?.mainImage) {
      bodyData.append("mainImage", formData?.mainImage);
    }

    if (formData?.authenticationFile) {
      bodyData.append("authenticationFile", formData?.authenticationFile);
    }

    try {
      const res = await createCar(bodyData).unwrap();
      const carId = res?.data?.id;

      if (res.success == true) {
        toast.success(res.message);
        router.push(`/inserted-vehicle/${carId}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleAccessoriesChange = (name: string, value: any[]) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="px-4 py-8">
      <form onSubmit={handleSubmit}>
        <div className="mt-10 md:mt-0 mb-12 md:mb-16 space-y-5">
          {/* Page Header Section */}
          <div className="flex flex-col items-start gap-5">
            <h2 className="text-primary font-extrabold text-3xl md:text-[30px] uppercase">Add New Vehicle</h2>
            <p className="text-black text-base font-medium max-w-[1100px]">View all the requested cars and their current status</p>
          </div>
          <Separator className="mt-10 mb-20 w-2/3" />
        </div>

        {/* Input Fields */}
        <div className="space-y-20">
          <Registration formData={formData} onFormChange={handleFormChange} setFormData={setFormData} />
          <Details formData={formData} onFormChange={handleFormChange} setFormData={setFormData} />
          <Fuel formData={formData} onFormChange={handleFormChange} />
          <Photos formData={formData} setFormData={setFormData} />
          <Description formData={formData} onFormChange={handleFormChange} setFormData={setFormData} />
          <Price formData={formData} setFormData={setFormData} />
          <Accessori formData={formData} onFormChange={handleAccessoriesChange} />
          <Contact formData={formData} onFormChange={handleFormChange} />
          <Authentication formData={formData} setFormData={setFormData} />

          {/* Separator */}
          <Separator className="my-20" />

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-primary hover:bg-primary text-white py-2 px-8 w-48 rounded-lg shadow-lg text-lg font-semibold flex items-center justify-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Salva"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddVehiclePage;
