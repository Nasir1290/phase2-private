/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SectionHeader1 } from "../shared/sectionHeader/SectionHeader";
import { carBrands } from "@/lib/brands";
import { useGetAllBrandsQuery } from "@/redux/api/carApi";
// import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const MarchiPage = () => {
  const { data: allBrands } = useGetAllBrandsQuery({});

  const brands = allBrands?.data || [];

  // Create a map for easier access to the count of each brand
  const brandCountMap = brands.reduce((acc: any, brand: any) => {
    acc[brand.brand] = brand.count;
    return acc;
  }, {});

  // Get brand names from brands API response
  const brandNames = brands.map((brand: any) => brand.brand);

  // Filter car brands based on brand names
  const filteredBrands = carBrands.filter((category) => brandNames.includes(category.name));

  return (
    <div className="p-6 container mx-auto space-y-28">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto">
        <SectionHeader1
          title="I NOSTRI MIGLIORI BRAND"
          subtitle="Scopri i brand più rinomati per il noleggio veicoli, offriamo una selezione di veicoli di qualità garantendo
affidabilità e prestazioni eccellenti per ogni tua esigenza di mobilità"
        />
      </div>

      {/* Brands Section */}
      <div className="container flex flex-wrap justify-center gap-10 md:gap-5 lg:gap-14 2xl:gap-28 mt-8 mx-auto">
        {filteredBrands.map((brand) => (
          <Link
            href={`/veicoli?brand=${brand.name}`}
            key={brand.id}
            className="w-80 xl:w-72 border border-section_bg rounded-2xl shadow-md shadow-black/20 hover:shadow-lg hover:shadow-primary/20 px-4 py-3 md:py-6 flex flex-row md:flex-col gap-4 md:gap-0 items-center"
          >
            <Image width={1000} height={1000} src={brand.logo} alt={brand.name} className="w-10 h-10 md:w-20 md:h-20 md:mb-8" />
            <p className="text-text_light_gray font-medium text-sm">
              {brandCountMap[brand.name] || 0} {brandCountMap[brand.name] === 1 ? "Veicolo" : "Veicoli"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MarchiPage;
