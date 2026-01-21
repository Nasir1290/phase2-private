"use client";

import Image from "next/image";
// import { FaRegCalendarCheck } from "react-icons/fa";
import heart from "@/assets/heart.svg";
import redHeart from "@/assets/redHeart.svg";
import automatic from "@/assets/vehicle/automatic.svg";
import deposito from "@/assets/vehicle/deposit.svg";
import eye from "@/assets/vehicle/eye.svg";
import kilometers from "@/assets/vehicle/kilometers.svg";
import manuale from "@/assets/vehicle/manule.svg";
import noDiposite from "@/assets/vehicle/no-deposit.svg";
import seat from "@/assets/vehicle/seat.svg";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import ContactModal from "../veicoli/contactModal/ContactModal";

interface VehicleCardProps {
  id: string;
  mainImage: string;
  logo: string;
  brand: string;
  model: string;
  transmission: string;
  seats: number;
  deposit: string | number;
  available: boolean;
  price: number;
  maxSpeed: number | string;
  whatsappNumber: string;
  phoneNumber: string;
  location: string;
  isInrisalto: boolean;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  id,
  mainImage,
  logo,
  brand,
  model,
  transmission,
  seats,
  deposit,
  price,
  maxSpeed,
  whatsappNumber,
  phoneNumber,
  location,
  isInrisalto = false,
}) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [randomViews, setRandomViews] = useState<number>(0);
  const toggleModal = () => setIsContactModalOpen((prev) => !prev);

  useEffect(() => {
    setRandomViews(Math.floor(Math.random() * 12) + 1);
  }, []);
  return (
    <div className="w-full ">
      <div
        className={`flex flex-col lg:flex-row items-start ${
          isInrisalto
            ? "bg-[#D1252B05] rounded-2xl border border-[#D1252B]"
            : "bg-white rounded-2xl border border-black/5"
        } shadow-md w-full`}
      >
        {/* Car Image */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 p-2">
          <div className="relative w-full overflow-hidden rounded-xl">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              {/* Link wraps only the image */}
              <Link href={`/veicoli/${id}`}>
                <Image
                  src={mainImage}
                  alt={model}
                  width={320}
                  height={240}
                  className="relative w-[400px] md:w-[800px] lg:w-[300px] xl:w-[280px] h-[175px] rounded-lg object-cover"
                />
              </Link>
              {/* <div className="absolute top-2 right-2 flex md:hidden items-center gap-2 border border-gray-700 rounded-full py-0.5 px-2 text-[14px]">
              <IoLocationOutline  className=" size-4"/>
                <p className="text-[14px] font-normal">{location.split(",").slice(0,-1).join(",")}</p>
              </div> */}
            </motion.div>
            {/* Heart sits on top */}
            <div
              onClick={() => setIsHeartClicked(!isHeartClicked)}
              className="absolute top-2 right-2 bg-whit p-1 rounded-full shadow-md cursor-pointer z-10"
            >
              {isHeartClicked ? (
                <Image src={redHeart} alt="heart" width={20} height={20} />
              ) : (
                <Image src={heart} alt="heart" width={20} height={20} />
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row md:gap-2 p-4 md:py-4">
          {/* Car Details */}
          <div className="w-full flex flex-col items-start gap-2 xl:gap-2">
            {/* Title */}
            <div className="flex justify-start items-center gap-5 mb-2">
              <Image
                src={logo}
                alt={model}
                width={500}
                height={500}
                className="w-8 h-8"
                unoptimized
              />
              <Link
                href={`/veicoli/${id}`}
                className="text-[16px] lg:text-[19px] font-bold"
              >
                {brand} {model}
              </Link>
            </div>

            {/* Features */}
            <div className="w-full flex items-center justify-between md:justify-start gap-5 md:gap-8 text-gray-600 text-sm">
              {/* Transmission */}
              <div className="flex items-center  gap-2 sm:gap-2.5">
                <Image
                  src={transmission === "AUTOMATIC" ? automatic : manuale}
                  alt={transmission}
                  width={100}
                  height={100}
                  className="w-4 h-4"
                />
                <p className="text-text_dark_gray text-[14px]">
                  {transmission === "AUTOMATIC" ? "Automatico" : "Manuale"}
                </p>
              </div>
              {/* Seat for pc*/}
              <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
                <Image
                  src={seat}
                  alt="seat"
                  width={20}
                  height={20}
                  className="w-5 h-5 md:w-4 md:h-4"
                />
                <p className="text-text_dark_gray text-[13px]">{seats}</p>
              </div>
              {/* Deposit */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                <Image
                  src={deposit ? deposito : noDiposite}
                  alt="deposit"
                  width={24}
                  height={24}
                  className="w-4 h-4 md:w-4 md:h-4"
                />
                <p className="text-text_dark_gray text-[13px]">
                  {/* {deposit ? `${deposit} CHF` : "Nessun deposito"} */}

                  {Number(deposit) === 0
                    ? "Nessun deposito"
                    : Number(deposit) >= 1
                    ? `${Number(deposit)} CHF`
                    : "N/A"}
                </p>
              </div>
              {/* Viewers for mobile*/}
              <div className="xl:hidden  flex items-center gap-2 sm:gap-2.5 text-gray-500 text-sm py-3">
                <Image
                  src={eye}
                  alt="viewers"
                  width={24}
                  height={16}
                  className="w-4 h-4"
                />
                <p className="text-[14px] text-text_dark_gray">{randomViews}</p>
              </div>
            </div>

            {/* Viewers for pc*/}
            <div className="hidden  xl:flex items-center gap-2 sm:gap-2.5 text-gray-500 text-sm py-3">
              <Image
                src={eye}
                alt="viewers"
                width={24}
                height={16}
                className="w-4 h-4"
              />
              <p className="text-[14px] text-text_dark_gray/70">
                {randomViews} utenti stanno vedendo questo veicolo
              </p>
            </div>
            {/* Location for mobile */}
            <div className=" flex  items-center gap-2 sm:gap-2.5   text-[14px] mb-2 sm:mb-0 lg:bg-[#BCC3CE]/10 rounded-full py-1 lg:px-2 text-sm">
              <IoLocationOutline className=" size-4 text-primary" />
              <p className="text-text_dark_gray text-[13px] font-normal">
                {location.split(",").slice(0, -1).join(",")}
              </p>
            </div>

            {/* Availability Badge */}
            {/* <div className="hidden md:flex items-center gap-2 sm:gap-2.5 border border-gray-700 rounded-full py-1 px-4 text-sm">
              <IoLocationOutline />
              <p className="text-[12px] font-normal">{location.split(",").slice(0,-1).join(",")}</p>
            </div> */}
          </div>

          {/* Price & Action Buttons */}
          <div className="w-full flex flex-col justify-between items-start lg:items-end">
            {/* Price */}
            <div className="hidden md:block space-y-4">
              <p className="text-[13px] text-text_light_gray font-medium">
                PREZZO GIORNALIERO
              </p>
              <div className="flex flex-row lg:flex-col items-start xl:items-end gap-20 xl:gap-4">
                <p className="text-[19px] font-bold">CHF {price}</p>

                <p className="flex items-center gap-2 text-sm font-semibold text-text_light_gray">
                  <Image
                    src={kilometers || "/placeholder.svg"}
                    alt="kilometers"
                    width={24}
                    height={16}
                    className="w-4 h-4"
                  />
                  {maxSpeed === "Unlimited"
                    ? "KM illimitati"
                    : `${maxSpeed} KM`}
                </p>
              </div>
            </div>
            {/* Display only in sm device  */}
            <div className="md:hidden flex justify-between items-center space-y-4 w-full">
              {/* KM INCLUSI */}
              <div className="flex flex-col gap-2">
                <p className="text-[13px] text-text_light_gray font-medium">
                  KM INCLUSI
                </p>
                <p className="flex items-center gap-2 text-sm font-semibold text-text_light_gray">
                  <Image
                    src={kilometers || "/placeholder.svg"}
                    alt="kilometers"
                    width={24}
                    height={16}
                    className="w-4 h-4"
                  />
                  {maxSpeed === "Unlimited"
                    ? "KM illimitati"
                    : `${maxSpeed} KM`}
                </p>
              </div>
              {/* PREZZO  */}
              <div className="flex flex-col items-end gap-2">
                <p className="text-[13px] text-text_light_gray font-medium">
                  PREZZO GIORNALIERO
                </p>
                <p className="md:text-[19px] font-bold">CHF {price}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-6 xl:gap-5 w-full lg:w-auto my-5 md:my-0">
              <Link
                href={`/veicoli/${id}`}
                className="w-full text-[13px] px-8 xl:px-8 py-2 md:py-1.5 border rounded font-medium shadow-md text-center hover:bg-text_light_gray/10 hover:shadow-lg"
              >
                DETTAGLI
              </Link>
              <button
                onClick={toggleModal}
                className="w-full text-[13px] px-8 xl:px-8 py-2 md:py-1.5 bg-primary hover:bg-primary/90 hover:shadow-xl  text-white font-medium rounded shadow-lg"
              >
                CONTATTA
              </button>
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        toggleModal={toggleModal}
        id={id}
        whatsappNumber={whatsappNumber}
        phoneNumber={phoneNumber}
      />
    </div>
  );
};

export default VehicleCard;
