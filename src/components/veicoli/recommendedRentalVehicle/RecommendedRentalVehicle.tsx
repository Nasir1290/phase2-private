"use client";

import { SectionHeader2 } from "@/components/shared/sectionHeader/SectionHeader";
import Image from "next/image";
import mazda from "@/assets/vehicle/noleggia-mazda.jpg";
import benz from "@/assets/vehicle/noleggia-mercedes-benz.jpg";
import maserati from "@/assets/vehicle/noleggia-maserati.jpg";
import ford from "@/assets/vehicle/noleggia-ford.jpg";
import Link from "next/link";
import { motion } from "framer-motion";

const RecommendedRentalVehicle = () => {
  const carBrands = [
    {
      id: 1,
      name: "BMW",
      logo: mazda,
      brand: "Noleggia Mazda",
      diposit: "Da 15 CHF",
      link: "/veicoli?brand=Mazda",
    },
    {
      id: 2,
      name: "MINI",
      logo: benz,
      brand: "Noleggia Mercedes-Benz",
      diposit: "Da 50 CHF",
      link: "/veicoli?brand=Mercedes-Benz",
    },
    {
      id: 3,
      name: "Volkswagen",
      logo: maserati,
      brand: "Noleggia Maserati",
      diposit: "Da 65 CHF",
      link: "/veicoli?brand=Maserati",
    },
    {
      id: 4,
      name: "Toyota",
      logo: ford,
      brand: "Noleggia Ford",
      diposit: "Da 15 CHF",
      link: "/veicoli?brand=Ford",
    },
  ];

  return (
    <div className="">
      {/* Section Header */}
      <div className="container mx-auto">
        <SectionHeader2
          topText="RACCOMANDATO"
          title="Veicoli a noleggio"
          highlightedText="consigliati"
        />
      </div>

      {/* Hardcoded sections */}
      <div className="bg-[#F1F1F1]">
        <div className="container mx-auto overflow-x-auto scrollbar-hide py-10 md:py-16">
          <div className="flex gap-8 w-max">
            {carBrands.map((brand) => (
              <div
                key={brand.id}
                className="relative min-w-[280px] xl:min-w-[200px] 2xl:min-w-[280px]"
              >
                <Link href={brand.link} className="w-full h-40" passHref>
                  <div className="relative w-[270px] xl:w-[256px] 2xl:w-[270px] h-40 overflow-hidden rounded-2xl mb-5">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="w-full h-full"
                    >
                      <Image
                        className="w-full h-full object-cover"
                        src={brand.logo}
                        alt={brand.name}
                        width={500}
                        height={500}
                      />
                    </motion.div>
                  </div>
                </Link>

                <h4 className="font-bold text-base">{brand.brand}</h4>
                <p className="text-sm font-normal mb-1 text-text_light_gray">
                  {brand.diposit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedRentalVehicle;
