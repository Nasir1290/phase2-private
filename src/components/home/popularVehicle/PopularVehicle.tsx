/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PopularVehicleCard from "@/components/allCards/PopularVehicleCard";
import { SectionHeader2 } from "@/components/shared/sectionHeader/SectionHeader";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import { useGetAllCarByTypesQuery } from "@/redux/api/carApi";

const PopularVehicle = () => {
  const { data: getAllCar } = useGetAllCarByTypesQuery(`carType=POPULAR`);
  const cars = getAllCar?.data || [];

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <div className="max-w-80">
          <SectionHeader2
            topText="ESPLORA"
            title="Esplora i veicoli più "
            highlightedText="popolari"
          />
        </div>
        <Link
          href={"/veicoli"}
          className="hidden md:flex text-sm font-semibold text-red uppercase items-center gap-1 hover:bg-red/5 px-3 py-2 rounded-lg"
        >
          TUTTI I VEICOLI
          <MdArrowForwardIos />
        </Link>
      </div>

      <div className="pt-10">
        {cars.length === 0 ? (
          <div className="text-center text-xl font-bold text-gray-500">
            No popular cars available.
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide">
            <div className="grid grid-flow-col auto-cols-max gap-6 xl:gap-3 2xl:gap-6 mb-5">
              {cars?.map((car: any) => (
                <div key={car.id}>
                  <PopularVehicleCard car={car} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Link
        href={"/veicoli"}
        className="text-sm font-semibold text-red uppercase flex md:hidden mx-auto  text-center w-full items-center justify-center gap-10 shadow-md px-16 py-6 rounded-lg h-8 mt-6"
      >
        TUTTI I VEICOLI
        <MdArrowForwardIos />
      </Link>
    </div>
  );
};

export default PopularVehicle;
