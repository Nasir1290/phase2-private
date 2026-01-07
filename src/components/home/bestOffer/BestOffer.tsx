/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SectionHeader1 } from "@/components/shared/sectionHeader/SectionHeader";
import Image from "next/image";
import fire from "@/assets/home/popularVehicle/in-evidence.svg";
import { motion } from "framer-motion";
import Link from "next/link";
import { useInHomePageCarsQuery } from "@/redux/api/carApi";

const BestOffer = () => {
  const { data: getAllCar } = useInHomePageCarsQuery(`carType=BEST_OFFER`);
  const cars = getAllCar?.data || [];
  console.log(cars);
  return (
    <div id="best-offer" className="container mx-auto">
      {/* Section Header */}
      <div className="max-w-[800px] mx-auto">
        <SectionHeader1
          title="LE NOSTRE MIGLIORI OFFERTE"
          subtitle="Esplora le migliori offerte di noleggio veicoli su Bittengo, approfitta di tariffe vantaggiose e di una vasta scelta di veicoli messi a disposizione da aziende e privati, per rispondere alle tue esigenze di mobilità in modo semplice e conveniente."
        />
      </div>

      {/* Display Cars or Message */}
      <div className="pt-10">
        {cars?.length === 0 ? (
          <div className="text-center text-xl font-bold text-gray-500">
            No cars available in this section.
          </div>
        ) : (
          // Display best offer cars
          <div className="flex overflow-x-auto gap-6 xl:gap-4 2xl:gap-6 scrollbar-hide">
            {cars.map((carInfo: any) => (
              <div
                key={carInfo.car?.id}
                className="flex-shrink-0 relative w-64 md:w-72 lg:w-[280px] xl:lg:w-[268px] 2xl:lg:w-[280px]"
              >
                <Link href={`/veicoli/${carInfo?.car?.id}`} passHref>
                  <div className="relative w-full h-40 overflow-hidden rounded-2xl mb-5">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="w-full h-full"
                    >
                      <Image
                        className="w-full h-full object-cover"
                        src={carInfo?.car?.mainImage || "/default-image.png"}
                        alt={carInfo?.car?.model}
                        width={1000}
                        height={1000}
                      />
                    </motion.div>
                  </div>
                </Link>

                <h4 className="text-base font-normal mb-1">
                  {carInfo?.car?.brand} {carInfo?.car?.model}
                </h4>
                <p className="font-bold text-[16px]">
                  {carInfo?.car?.price?.[2]?.price || "N/A"} CHF
                </p>

                <div className="absolute top-3 left-0 z-40">
                 
                    <div className="flex items-center gap-2 bg-primary text-white py-1 pl-2 pr-4 rounded-r-full">
                      <Image
                        src={fire}
                        alt="car"
                        width={500}
                        height={500}
                        className="h-4 w-4"
                      />
                      <p className="text-xs font-normal">In evidenza</p>
                    </div>
                 
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestOffer;
