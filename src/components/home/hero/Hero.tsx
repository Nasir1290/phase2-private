"use client";

import Image from "next/image";
import Link from "next/link";
import search from "@/assets/home/search.svg";
import allVehicle from "@/assets/home/all-vehicles.svg";
import offer from "@/assets/home/special-offers.svg";
import destination from "@/assets/home/destinations.svg";
import partnership from "@/assets/home/partnership.svg";
import swiss from "@/assets/swiss.svg";
import banner from "@/assets/banner.svg";
import SearchField from "@/components/shared/searchField/SearchField";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const handleSearchResult = (
    result: string,
    longitude: number,
    latitude: number
  ) => {
    const newUrl = `/veicoli?latitude=${latitude}&longitude=${longitude}`;
    router.push(newUrl);
  };

  return (
    <section className="relative">
      {/* Image Container - maintains exact original layout */}
      <div className="relative w-full h-[310px] sm:h-[500px] md:h-[400px] lg:h-[600px]">
        <Image
          src={banner}
          alt="Luxury red car"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
        />
      </div>
      {/* Content Overlay - unchanged from original */}
      <div className="absolute inset-0">
        <div className="container mx-auto px-4 md:pt-20">
          <div className="max-w-3xl mx-auto text-white mt-40 lg:mt-60 shadow-lg">
            {/* search field - unchanged */}
            <SearchField
              onResult={handleSearchResult}
              countryList={["Svizzera", "Italy"]}
              searchIcon={search}
              flagIcon={swiss}
            />

            {/* 4 buttons - unchanged */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              <Link href="/veicoli" className="block">
                <div className="md:w-full h-9 md:h-12 bg-[#09090973] hover:bg-[#090909]/65 flex justify-center items-center gap-4 px-4 rounded-lg">
                  <Image
                    src={allVehicle}
                    alt="all vehicle"
                    width={100}
                    height={100}
                    className="h-5 w-5"
                  />
                  <p className="text-xs xl:text-[15px]">Tutti i veicoli</p>
                </div>
              </Link>
              <Link href="#best-offer" className="block">
                <div className="md:w-full h-9 md:h-12 bg-[#09090973] hover:bg-[#090909]/65 flex justify-center items-center gap-4 px-4 rounded-lg">
                  <Image
                    src={offer}
                    alt="all vehicle"
                    width={100}
                    height={100}
                    className="h-5 w-5"
                  />
                  <p className="text-xs xl:text-[15px]">Offerte speciali</p>
                </div>
              </Link>
              <Link href="#popular-destinations" className="block">
                <div className="md:w-full h-9 md:h-12 bg-[#09090973] hover:bg-[#090909]/65 flex justify-center items-center gap-3 px-4 rounded-lg">
                  <Image
                    src={destination}
                    alt="all vehicle"
                    width={100}
                    height={100}
                    className="h-5 w-5"
                  />
                  <p className="text-xs xl:text-[15px]">Destinazioni</p>
                </div>
              </Link>
              <Link href="/partnership" className="block">
                <div className="md:w-full h-9 md:h-12 bg-[#09090973] hover:bg-[#090909]/65 flex justify-center items-center gap-4 px-4 rounded-lg">
                  <Image
                    src={partnership}
                    alt="all vehicle"
                    width={100}
                    height={100}
                    className="h-5 w-5"
                  />
                  <p className="text-xs xl:text-[15px]">Partnerships</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
