/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import depositetag from "@/assets/myVehicles/prezzo.svg";
import playIcon from "@/assets/myVehicles/pulsante-attiva.svg";

import copyIcon from "@/assets/copy.svg";
import { default as heartFilled, default as heartOutline } from "@/assets/heartFilled.svg";
import pinIcon from "@/assets/pinIcon.svg";

import { carBrands } from "@/lib/brands";
import MyVehicleModal from "../shared/myVehicleModal/MyVehicleModal";

const ProferitiVehicleCard = ({ id, mainImage, model, brand, description,  carStatus, price }: any) => {
  const [isEliminaModalOpen, setIsEliminaModalOpen] = useState(false);
  const [isSospendiModalOpen, setIsSospendiModalOpen] = useState(false);
  const toggleEliminaModal = () => setIsEliminaModalOpen((prev) => !prev);
  const toggleSospendiModal = () => setIsSospendiModalOpen((prev) => !prev);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isFavorite, setIsFavorite] = useState(true);


  const matchedBrand = carBrands.find((carBrand) => carBrand.name === brand);
  const logo = matchedBrand ? matchedBrand.logo : "/path/to/default-image.jpg";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const truncate = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  return (
    <div className="w-full">
      <div
        className={`relative flex flex-col lg:flex-row items-start rounded-2xl shadow-md w-full border ${
          carStatus === "SUSPEND" ? " bg-black/40 opacity-40" : "border-black/5 bg-white"
        }`}
      >
        {/* ======= CAR IMAGE ======= */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 p-2">
          <Link href={`/veicoli/${id}`} passHref>
            <div className="relative w-full overflow-hidden rounded-xl">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <img
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

        {/* ======= RIGHT SIDE DETAILS ======= */}
        <div className="w-full flex flex-col items-start gap-2.5 pl-7 pr-8 py- relative">
          {/* TOP RIGHT ICONS (Copy + Favorite) */}
          <div className="absolute right-6 top-6 flex items-center gap-4">
            {/* Copy Link */}
            <button
              onClick={() => navigator.clipboard.writeText(window.location.origin + `/veicoli/${id}`)}
              className="opacity-80 hover:opacity-100 transition"
            >
              <Image src={copyIcon} alt="Copy Link" width={20} height={20} />
            </button>

            {/* Favorite Toggle */}
            <button onClick={() => setIsFavorite(!isFavorite)} className="opacity-90 hover:opacity-100 transition">
              <Image src={isFavorite ? heartFilled : heartOutline} alt="Favorite" width={22} height={22} />
            </button>
          </div>

          {/* Title */}
          <div className="flex justify-start items-center gap-4 mt-6">
            <div className="w-6 h-6">
              <Image src={logo} alt={model} width={56} height={40} className="w-full h-full" />
            </div>
            <Link href={`/veicoli/${id}`} passHref>
              <h3 className="text-[18px] font-medium">
                {brand} {model}
              </h3>
            </Link>
          </div>

          {/* Description */}
          <p className="text-text_light_gray text-sm max-w-2xl">{truncate(description, 20)}</p>

          {/* Price */}
          <div className="flex items-center gap-3">
            <Image src={depositetag} alt={model} width={56} height={40} className="w-5 h-5" />
            <p className="font-bold text-[16px]">{price && price[2]?.price ? `${price[2].price} CHF` : "N/A"}</p>
          </div>

          {/* <Separator /> */}
          <div className="border border-b w-full max-w-3xl"></div>

          {/* Address */}
          <div className="flex items-center gap-3 mb-2 lg:mb-0">
            <Image src={pinIcon} alt="Address" width={18} height={18} />
            <p className="text-[15px] font-medium text-[#C93434]">Via castigliano 4, Lugano</p>
          </div>
        </div>

        {/* PLAY BUTTON WHEN SUSPENDED */}
        {carStatus === "SUSPEND" && (
          <button onClick={toggleSospendiModal} className="absolute top-3 right-2 rounded-full">
            <Image src={playIcon} alt="Reattiva annuncio" width={100} height={100} className="w-12 h-12 z-30" />
          </button>
        )}
      </div>

      {/* MODALS */}
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
        title={carStatus === "SUSPEND" ? "Confermi di voler attivare il tuo annuncio?" : "Confermi di voler sospendere il tuo annuncio?"}
        mainImage={mainImage}
        model={model}
        brand={brand}
        logo={logo}
        description={description}
        confirmButtontext={carStatus === "SUSPEND" ? "Sì, attivo" : "Si, sospendi"}
        vehicleId={id}
        currentStatus={carStatus}
      />
    </div>
  );
};

export default ProferitiVehicleCard;
