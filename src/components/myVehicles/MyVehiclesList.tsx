/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import Pagination from "../shared/pagination/Pagination";
import { Input } from "../ui/input";
import { MdOutlineSearch } from "react-icons/md";
import MyVehicleCard from "./MyVehicleCard";
import { useGetCarOwnerByIDQuery } from "@/redux/api/carApi";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import Loading from "../shared/loading/Loading";

const MyVehiclesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 10;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  const { data: getProfile } = useGetMyProfileQuery({});
  const userId = getProfile?.data?.id;
console.log({getProfile})
  // Build query parameters
  const queryParams = [
    { name: "userId", value: userId },
    { name: "page", value: currentPage },
    { name: "limit", value: vehiclesPerPage },
  ];

  if (debouncedSearchTerm) {
    queryParams.push({ name: "searchTerm", value: debouncedSearchTerm });
  }

  const { data: ownerDetails, isLoading: carsLoading } =
    useGetCarOwnerByIDQuery(queryParams);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  // Debounce search term
  const debouncedSearch = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm, debouncedSearch]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 40, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="container mx-auto space-y-10">
      <div className="flex items-center md:items-end gap-3  justify-between">
        <div className="flex items-center gap-6 w-full">
          <div className="w-full xl:w-[450px] shadow-lg rounded-lg border border-gray-100/90">
            <Input
              type="text"
              placeholder="Search for a vehicle (Brand or Model)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-text_dark_gray font-normal h-10 rounded-lg"
              aria-label="Search for a vehicle"
            />
          </div>
          <div className="bg-primary text-white px-2.5 py-2 rounded-md shadow-lg hidden lg:block">
            <MdOutlineSearch size={26} />
          </div>
        </div>
        <div className="flex items-center gap-1 text-text_light_gray font-medium text-sm md:text-base">
          <p className="w-1/3">{ownerDetails?.data?.meta?.total || 0}</p>
          Annunci
        </div>
      </div>

      {/* Loading state */}
      {carsLoading && <Loading />}

      {/* Vehicle list */}
      <div className="space-y-4 grid grid-cols-1 gap-4">
        {ownerDetails?.data?.cars?.length ? (
          ownerDetails.data.cars.map((vehicle: any) => (
            <MyVehicleCard key={vehicle.id} {...vehicle} />
          ))
        ) : (
          <p className="text-center font-semibold text-gray-500">
            {searchTerm
              ? "No matching vehicles found"
              : "No vehicles available"}
          </p>
        )}
      </div>

      {/* Pagination */}
      {ownerDetails?.data?.meta?.totalPage > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            totalPages={ownerDetails.data.meta.totalPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default MyVehiclesList;
