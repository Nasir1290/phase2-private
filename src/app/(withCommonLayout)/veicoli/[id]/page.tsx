"use client";

import { Separator } from "@/components/ui/separator";
import Accessori from "@/components/vehicleDetailsPage/Accessori";
import AdvertiserPage from "@/components/vehicleDetailsPage/AdvertiserPage";
import Booking from "@/components/vehicleDetailsPage/Booking";
import HeroDetails from "@/components/vehicleDetailsPage/HeroDetails";
import Rental from "@/components/vehicleDetailsPage/Rental";
import RentalDescription from "@/components/vehicleDetailsPage/RentalDescription";
import RentalPrices from "@/components/vehicleDetailsPage/RentalPrices";
import Specifications from "@/components/vehicleDetailsPage/Specifications";
import { Car } from "@/types/cars";
import { useGetCarByIDQuery } from "@/redux/api/carApi";
import { usePathname } from "next/navigation";
import SmDeviceContact from "@/components/vehicleDetailsPage/SmDeviceContact";

const VehicleDetails = () => {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();
  const { data: singleCarDetails } = useGetCarByIDQuery(id);
  const carDetails = singleCarDetails?.data;

  return (
    <div className="mt-36 ">
      <div className="space-y-24">
        <div className="container mx-auto">
          <HeroDetails car={carDetails as Car} />
        </div>
        <div className="container mx-auto flex flex-col xl:flex-row items-start justify-between gap-36">
          <div className="space-y-24 ">
            <RentalPrices car={carDetails as Car} />
            <Specifications car={carDetails as Car} />
            {carDetails?.accessories && <Accessori car={carDetails as Car} />}
            <Booking car={carDetails as Car} />
            <RentalDescription car={carDetails as Car} />
          </div>
          <div className="hidden md:flex">
            {" "}
            <Rental car={carDetails as Car} />
          </div>
        </div>
        <div className="container mx-auto hidden md:flex">
          <Separator />
        </div>
        <div className="hidden md:flex">
          <AdvertiserPage car={carDetails as Car} />
        </div>
      </div>

      <div className="md:hidden">
        <SmDeviceContact car={carDetails as Car} />
      </div>
    </div>
  );
};

export default VehicleDetails;
