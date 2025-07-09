/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React from "react";
import deposito from "@/assets/vehicle/deposit.svg";
import nessunDeposito from "@/assets/home/popularVehicle/no-deposit.svg";
import manuale from "@/assets/home/popularVehicle/manuale.svg";
import automatico from "@/assets/home/popularVehicle/automatic.svg";
import seats from "@/assets/home/popularVehicle/seats.svg";
import distance from "@/assets/home/popularVehicle/kilometers.svg";
import { motion } from "framer-motion";
import Link from "next/link";

const PopularVehicleCard = ({ car }: any) => {
  if (!car) return null;
  return (
    <div>
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <div
          key={car?.id}
          className="min-h-[320px] rounded-2xl overflow-hidden shadow-lg p-1 border hover:shadow-lg"
        >
          <Link href={`/veicoli/${car?.id}`} passHref>
            <div className="relative w-full h-40 mb-5">
              <Image
                className="w-[270px] xl:w-[260px] 2xl:w-[270px] h-40 object-cover rounded-2xl"
                src={car?.mainImage || "/default-image.png"}
                alt={`${car?.model}`}
                width={1000}
                height={1000}
              />
            </div>
            <div className="p-3 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-[17px] font-bold">
                  {car?.brand || "Unknown Model"}
                </h2>
                <div className="flex items-center gap-1">
                  {/* <Image
                    src={nessunDeposito}
                    alt="no deposit icon"
                    width={100}
                    height={100}
                    className="h-5 w-5"
                  /> */}
                  <Image
                    src={car?.deposite === 0 ? nessunDeposito : deposito}
                    alt="deposit"
                    width={24}
                    height={24}
                    className="md:w-4 md:h-4"
                  />
                  <span className="text-xs">
                    {car?.deposite === 0
                      ? "Nessun deposito"
                      : car?.deposite >= 1
                      ? `${car.deposite} CHF`
                      : "N/A"}
                  </span>
                </div>
              </div>
              <span className="text-[13px] text-text_dark_gray font-light">
                {car?.model}
              </span>

              <div className="mt-2 flex justify-between text-sm pb-4">
                <div className="flex items-end gap-2">
                  <Image
                    src={
                      car?.transmission === "AUTOMATIC" ? automatico : manuale
                    }
                    alt="transmission icon"
                    width={100}
                    height={100}
                    className="h-5 w-5"
                  />
                  <span className="text-xs text-text_dark_gray">
                    {car?.transmission === "AUTOMATIC"
                      ? "Automatico"
                      : "Manuale"}
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <Image
                    src={seats}
                    alt="seats icon"
                    width={24}
                    height={24}
                    className="h-5 w-5"
                  />
                  <span className="text-xs text-text_dark_gray">
                    {car?.seats || "N/A"}
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <Image
                    src={distance}
                    alt="distance icon"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <span className="text-xs text-text_dark_gray">
                    {car?.price?.find((item: any) => item.rentalTime === 24)
                      ?.kilometerPerHour === "Unlimited"
                      ? "illimitati"
                      : car?.price?.find((item: any) => item.rentalTime === 24)
                          ?.kilometerPerHour
                      ? `${parseInt(
                          car?.price?.find(
                            (item: any) => item.rentalTime === 24
                          )?.kilometerPerHour
                        )}`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PopularVehicleCard;
