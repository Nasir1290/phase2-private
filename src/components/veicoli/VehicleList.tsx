/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import order from "@/assets/vehicle/frecce-filtro.svg";
import { carBrands } from "@/lib/brands";
import { useGetAllAcceptedCarQuery } from "@/redux/api/carApi";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import VehicleCard from "../allCards/VehicleCard";
import Loading from "../shared/loading/Loading";
import Pagination from "../shared/pagination/Pagination";
import VehicleFilterModal from "./CarFilterModal";

// Dynamically import MapModal with no SSR
const MapModal = dynamic(() => import("./MapModal"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const VehicleList = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Raccomandato");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState<string>("");
  const searchParams = useSearchParams();
  const brandParam = searchParams.get("brand");
  const categoryParam = searchParams.get("category");
  const latitude = parseFloat(searchParams.get("latitude") || "0");
  const longitude = parseFloat(searchParams.get("longitude") || "0");

  const vehiclesPerPage = 10;

  // Fetch data based on page and other params (pagination)
  const { data: getAllCars, isLoading } = useGetAllAcceptedCarQuery([
    {
      name: "page",
      value: currentPage,
    },
    {
      name: "limit",
      value: vehiclesPerPage,
    },
    {
      name: "sort",
      value: sortValue,
    },
    { name: "brand", value: brandParam || undefined },
    { name: "category", value: categoryParam || undefined },
    { name: "latitude", value: latitude || undefined },
    { name: "longitude", value: longitude || undefined },
  ]);

  const brandLogos: { [key: string]: string } = carBrands.reduce((acc, brand) => {
    acc[brand?.name?.trim()?.toLowerCase()] = brand.logo;
    return acc;
  }, {} as { [key: string]: string });

  const vehicles = getAllCars?.data || [];
  const totalPage = getAllCars?.meta?.totalPage || 0;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    if (option === "Raccomandato") {
      setSelectedOption(option);
      setSortValue("");
    } else if (option === "Dal più caro") {
      setSelectedOption(option);
      setSortValue("-price");
    } else if (option === "Dal meno caro") {
      setSelectedOption(option);
      setSortValue("price");
    }
    setIsOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Updated part: Reset scroll position when page changes (pagination)
  useEffect(() => {
    window.scrollTo({ top: 40, behavior: "smooth" });
  }, [currentPage]);

  // Reset page when brand changes
  useEffect(() => {
    setCurrentPage(1);
  }, [brandParam]);

  const handleApplyFilters = (filters: any) => {
    console.log("Applied filters:", filters);
  };
  return (
    <div className="container mx-auto">
      {isLoading && (
        <div className="flex items-center justify-center h-40">
          <Loading />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex items-center justify-between my-10">
            <p className="text-text_light_gray font-medium text-sm">{getAllCars?.meta?.total} Risultati</p>
            <div className="flex items-center gap-4">
              <MapModal />

              <VehicleFilterModal open={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} onApply={handleApplyFilters} />
              <div onClick={toggleDropdown} className="flex items-center gap-2 cursor-pointer">
                <Image src={order} alt="order" width={20} height={20} className="h-4 w-4" />
                <p className="text-text_dark_gray text-sm cursor-pointer">Ordina per</p>
                <div ref={dropdownRef} className="relative dropdown-container">
                  <button>
                    <SlArrowDown className="h-3 w-3 font-bold text-primary" />
                  </button>

                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-md border border-gray-200 z-30">
                      <ul className="py-2 px-2">
                        <li
                          onClick={() => handleSelect("Raccomandato")}
                          className={`px-4 py-2 cursor-pointer hover:bg-primary/5 text-sm ${
                            selectedOption === "Raccomandato" ? "bg- text-gray-500 cursor-not-allowed" : ""
                          }`}
                        >
                          Raccomandato
                        </li>
                        <li
                          onClick={() => handleSelect("Dal più caro")}
                          className={`px-4 py-2 cursor-pointer hover:bg-primary/5 text-sm ${
                            selectedOption === "Dal più caro" ? "bg- text-gray-500 cursor-not-allowed" : ""
                          }`}
                        >
                          Dal più caro
                        </li>
                        <li
                          onClick={() => handleSelect("Dal meno caro")}
                          className={`px-4 py-2 cursor-pointer hover:bg-primary/5 text-sm ${
                            selectedOption === "Dal meno caro" ? "bg- text-gray-500 cursor-not-allowed" : ""
                          }`}
                        >
                          Dal meno caro
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 grid grid-cols-1 gap-4">
            {vehicles.map((vehicle: any) => {
              const selectedPrice = vehicle.price.find((p: any) => p.rentalTime === 24)?.price || 0;
              const selectedKm = vehicle.price.find((p: any) => p.rentalTime === 24)?.kilometerPerHour || 0;
              const isAvailable = vehicle.carStatus === "ACTIVE";
              if (!isAvailable) return null;
              const brandLogo = brandLogos[vehicle?.brand?.trim()?.toLowerCase()];
              return (
                <VehicleCard
                  key={vehicle?.id}
                  id={vehicle?.id}
                  imageUrl={vehicle?.mainImage}
                  logo={brandLogo}
                  brand={vehicle?.brand}
                  model={vehicle?.model}
                  transmission={vehicle?.transmission}
                  seats={vehicle?.seats}
                  deposit={vehicle?.deposite}
                  available={isAvailable}
                  price={selectedPrice}
                  maxSpeed={selectedKm}
                  whatsappNumber={vehicle?.whatsapp}
                  phoneNumber={vehicle?.phoneNumber}
                  location={vehicle?.location}
                />
              );
            })}
          </div>

          <div className="flex justify-center mt-6">
            <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>
        </>
      )}
    </div>
  );
};

export default VehicleList;
