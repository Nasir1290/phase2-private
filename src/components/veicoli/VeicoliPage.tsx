"use client";

import search from "@/assets/home/search.svg";
import LocationBanner from "./LocationBanner";
import VehicleList from "./VehicleList";
import RecommendedRentalVehicle from "./recommendedRentalVehicle/RecommendedRentalVehicle";
import VehicleFaq from "./vehicleFaq/VehicleFaq";
import BenefitsOfRenting from "./benefitsOfRenting/BenefitsOfRenting";
import swiss from "@/assets/swiss.svg";
import SearchField from "../shared/searchField/SearchField";
import { useRouter } from "next/navigation";
const VeicoliPage = () => {
  const router = useRouter();

  const handleSearchResult = (
    result: string,
    longitude: number,
    latitude: number
  ) => {
    // Create the URL with the search parameters
    const newUrl = `/veicoli?latitude=${latitude}&longitude=${longitude}`;

    // Update the URL without reloading the page
    router.push(newUrl);
  };

  return (
    <div className="space-y-20">
      {/* Search Part  */}
      <div className="bg-[#FAFAFA] h-48 md:h-40 flex items-center justify-center">
        {/* Search Bar */}
        <div className="container mx-auto px-4 pt-6 flex flex-col  md:flex-row gap-2 mb-4 w-[800px]">
          <SearchField
            onResult={handleSearchResult}
            countryList={["Svizzera", "Italy"]}
            searchIcon={search}
            flagIcon={swiss}
          />
        </div>
      </div>
      <div className="space-y-20 xl:space-y-40">
        <div>
          <LocationBanner />
          <VehicleList />
        </div>
        <RecommendedRentalVehicle />
        <BenefitsOfRenting />
        <VehicleFaq />
      </div>
    </div>
  );
};

export default VeicoliPage;
