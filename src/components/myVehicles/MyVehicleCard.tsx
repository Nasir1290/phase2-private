"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import depositetag from "@/assets/myVehicles/prezzo.svg";
import dots from "@/assets/myVehicles/elenco-opzioni.svg";
import playIcon from "@/assets/myVehicles/pulsante-attiva.svg";
import { Separator } from "../ui/separator";
import trash from "@/assets/myVehicles/elimina.svg";
import pause from "@/assets/myVehicles/sospendere.svg";
import MyVehicleModal from "../shared/myVehicleModal/MyVehicleModal";
import { carBrands } from "@/lib/brands";

interface VehicleCardProps {
  id: string;
  mainImage: string;
  model: string;
  brand: string;
  description: string;
  acceptanceStatus: string;
  carStatus: string;
  price: { price: number }[];
}

const MyVehicleCard: React.FC<VehicleCardProps> = ({
  id,
  mainImage,
  model,
  brand,
  description,
  acceptanceStatus,
  carStatus,
  price,
}) => {
  const [isEliminaModalOpen, setIsEliminaModalOpen] = useState(false);
  const [isSospendiModalOpen, setIsSospendiModalOpen] = useState(false);
  const toggleEliminaModal = () => setIsEliminaModalOpen((prev) => !prev);
  const toggleSospendiModal = () => setIsSospendiModalOpen((prev) => !prev);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  const matchedBrand = carBrands.find((carBrand) => carBrand.name === brand);
  const logo = matchedBrand ? matchedBrand.logo : "/path/to/default-image.jpg";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const truncate = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="w-full">
      <div
        className={`relative flex flex-col lg:flex-row items-start rounded-2xl shadow-md w-full border ${
          carStatus === "SUSPEND"
            ? " bg-black/40 opacity-40"
            : "border-black/5 bg-white"
        }`}
      >
        {/* Car Image */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 p-2">
          <Link href={`/veicoli/${id}`} passHref>
            <div className="relative w-full overflow-hidden rounded-xl">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <Image
                  src={mainImage}
                  alt={model}
                  width={320}
                  height={240}
                  className="w-[400px] md:w-[800px] lg:w-[300px] xl:w-[280px] h-[175px] rounded-lg object-cover"
                />
              </motion.div>
            </div>
          </Link>
        </div>

        {/* Car Details */}
        <div className="w-full flex flex-col items-start gap-2.5 pl-7 pr-8 py-5">
          {/* Title */}
          <div className="flex justify-start items-center gap-4">
            <div className="w-6 h-6">
              <Image
                src={logo}
                alt={model}
                width={56}
                height={40}
                className="w-full h-full"
              />
            </div>
            <Link href={`/veicoli/${id}`} passHref>
              <h3 className="text-[18px] font-medium">
                {brand} {model}
              </h3>
            </Link>
          </div>
          {/* Description  */}
          <p className="text-text_light_gray text-sm">
            {truncate(description, 20)}{" "}
          </p>
          {/* deposite  */}
          <div className="flex items-center gap-3">
            <Image
              src={depositetag}
              alt={model}
              width={56}
              height={40}
              className="w-5 h-5"
            />
            <p className="font-bold text-[16px]">
              {/* Accessing the price from an array of objects */}
              {price && price[2]?.price ? `${price[2].price} CHF` : "N/A"}
            </p>
            {/* <p className="font-medium">CHF {selectedPrice}</p> */}
          </div>
          <Separator />

          <div className="flex items-center justify-between w-full">
            <p
              className={`${
                acceptanceStatus === "ACCEPTED" && carStatus === "ACTIVE"
                  ? "text-green"
                  : acceptanceStatus === "PENDING"
                  ? "text-yellow-500"
                  : ""
              } font-medium text-[15px]`}
            >
              {acceptanceStatus === "ACCEPTED" && carStatus === "ACTIVE"
                ? "Annuncio pubblicato"
                : acceptanceStatus === "PENDING"
                ? "Annuncio in revisione"
                : "Annuncio sospeso"}
            </p>

            <div className="relative inline-block lg:hidden" ref={dropdownRef}>
              <button
                onClick={handleOpenDropdown}
                onTouchEnd={handleOpenDropdown} // Add touch support for mobile
                className="p-2 -mr-2" // Added padding for better touch target
              >
                <Image
                  src={dots}
                  alt="Menu"
                  width={100}
                  height={100}
                  className="w-3 h-3 xl:w-4 xl:h-4 opacity-70 hover:opacity-100"
                />
              </button>
              {isOpen && (
                <div className="z-50 bg-white absolute right-0 mt-2 w-36 shadow-lg rounded-md border">
                  <ul className="p-1 text-sm text-gray-700">
                    <li
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent immediate dropdown close
                        toggleEliminaModal();
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                        toggleEliminaModal();
                      }}
                      className="rounded font-[450] px-4 py-2 hover:bg-red/5 cursor-pointer flex justify-between"
                    >
                      <span>Elimina</span>
                      <Image
                        src={trash}
                        alt="Elimina"
                        width={100}
                        height={100}
                        className="w-4 h-4"
                      />
                    </li>
                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSospendiModal();
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                        toggleSospendiModal();
                      }}
                      className="rounded font-[450] px-4 py-2 hover:bg-red/5 cursor-pointer flex justify-between"
                    >
                      <span>Sospendi</span>
                      <Image
                        src={pause}
                        alt="Sospendi"
                        width={100}
                        height={100}
                        className="w-3.5 h-3.5"
                      />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dropdown Options */}
        <div
          className="hidden lg:relative lg:inline-block p-5"
          ref={dropdownRef}
        >
          <button onClick={handleOpenDropdown} className="">
            <Image
              src={dots}
              alt="Menu"
              width={100}
              height={100}
              className="w-3 h-3 xl:w-4 xl:h-4 opacity-70 hover:opacity-100"
            />
          </button>
          {isOpen && (
            <div className="z-10 bg-white absolute left-4 mt-0 w-36 shadow-lg rounded-md border">
              <ul className="p-1 text-sm text-gray-700">
                <li
                  onClick={toggleEliminaModal}
                  className="rounded font-[450] px-4 py-2 hover:bg-red/5 cursor-pointer flex justify-between"
                >
                  <span>Elimina</span>
                  <Image
                    src={trash}
                    alt="Elimina"
                    width={100}
                    height={100}
                    className="w-4 h-4"
                  />
                </li>
                <li
                  onClick={toggleSospendiModal}
                  className="rounded font-[450] px-4 py-2 hover:bg-red/5 cursor-pointer flex justify-between"
                >
                  <span>Sospendi</span>
                  <Image
                    src={pause}
                    alt="Sospendi"
                    width={100}
                    height={100}
                    className="w-3.5 h-3.5"
                  />
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Play Button for Suspended Ads */}
        {carStatus === "SUSPEND" && (
          <button
            // onClick={() => console.log("Reactivating ad...")}
            onClick={toggleSospendiModal}
            className="absolute top-3 right-2 rounded-full"
          >
            <Image
              src={playIcon}
              alt="Reattiva annuncio"
              width={100}
              height={100}
              className="w-12 h-12 z-30"
            />
          </button>
        )}
      </div>

      <MyVehicleModal
        isOpen={isEliminaModalOpen}
        toggleModal={toggleEliminaModal}
        title="Confermi di voler eliminare il tuo annuncio?"
        mainImage={mainImage}
        model={model}
        brand={brand}
        logo={logo}
        description={description}
        confirmButtontext="Si, rimuovi"
        vehicleId={id}
        currentStatus={carStatus}
      />
      <MyVehicleModal
        isOpen={isSospendiModalOpen}
        toggleModal={toggleSospendiModal}
        title={
          carStatus === "SUSPEND"
            ? "Confermi di voler attivare il tuo annuncio?"
            : "Confermi di voler sospendere il tuo annuncio?"
        }
        // title="Confermi di voler attivare il tuo annuncio?"
        mainImage={mainImage}
        model={model}
        brand={brand}
        logo={logo}
        description={description}
        confirmButtontext={
          carStatus === "SUSPEND" ? "Sì, attivo" : "Si, sospendi"
        }
        vehicleId={id}
        currentStatus={carStatus}
      />
    </div>
  );
};

export default MyVehicleCard;
