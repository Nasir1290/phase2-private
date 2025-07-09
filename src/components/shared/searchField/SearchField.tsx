"use client";

import { useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LocationWithoutMap from "@/components/vehicleInsert/mapComponent/LocationWithoutMap";

type SearchFieldProps = {
  onResult: (result: string, longitude: number, latitude: number) => void;
  countryList: string[];
  searchIcon: string;
  flagIcon: string;
};

const SearchField = ({
  onResult,
  // countryList,
  searchIcon,
  flagIcon,
}: SearchFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleResult = (
    result: string,
    longitude: number,
    latitude: number
  ) => {
    // setSearchQuery(result);
    onResult(result, longitude, latitude);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4 w-full">
      <div className="relative flex-1 rounded-lg">
        <Image
          src={searchIcon}
          alt="Search Icon"
          className="w-5 h-5 md:w-5 md:h-5 absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 opacity-75"
        />
        <div>
          <LocationWithoutMap onResult={handleResult} />
        </div>
        <div
          ref={dropdownRef}
          className="flex items-center gap-2 absolute right-0 top-1/2 transform -translate-y-1/2 bg-white w-28 rounded-lg"
        >
          <Image src={flagIcon} alt="Flag Icon" className="w-[18px] h-[18px]" />
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1"
          >
            <p className="text-sm font-medium text-text_dark_gray">Svizzera</p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        // onClick={handleSearchClick}
        className="hidden md:flex items-center justify-center bg-red h-10 md:h-12 px-5 lg:px-12 rounded-lg shadow-lg font-medium text-sm lg:text-[15px] text-white tracking-wider transition-all duration-800 ease-in-out hover:bg-red/90"
      >
        CERCA
      </button>
    </div>
  );
};

export default SearchField;
