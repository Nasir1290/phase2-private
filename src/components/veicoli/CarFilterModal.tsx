/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ConfigProvider, Modal, Select, Slider } from "antd";
import { X } from "lucide-react";
import { useState } from "react";

import automatic from "@/assets/filterIcons/Automatic1.svg";
import ConDeposito from "@/assets/filterIcons/ConDeposito.svg";
import menual from "@/assets/filterIcons/Manual1.svg";
import Nodeposit from "@/assets/filterIcons/No deposit.svg";
import filter from "@/assets/vehicle/filter.svg";
import { carBrands } from "@/lib/brands";
import Image from "next/image";

// Import default (normal) icons
import cabrioletB from "@/assets/home/vehicleCategory/cabriolet-b.svg";
import commercialiB from "@/assets/home/vehicleCategory/commerciali-b.svg";
import coupeB from "@/assets/home/vehicleCategory/coupe-b.svg";
import elettricaB from "@/assets/home/vehicleCategory/elettrica-b.svg";
import hatchbackB from "@/assets/home/vehicleCategory/hatchback-b.svg";
import lussoB from "@/assets/home/vehicleCategory/lusso-b.svg";
import minivanB from "@/assets/home/vehicleCategory/minivan-b.svg";
import monovolumeB from "@/assets/home/vehicleCategory/monovolume-b.svg";
import sportivaB from "@/assets/home/vehicleCategory/sportiva-b.svg";
import stationwagonB from "@/assets/home/vehicleCategory/stationwagon-b.svg";
import suvB from "@/assets/home/vehicleCategory/suv-b.svg";

// Import hover (red) icons
import cabrioletR from "@/assets/home/vehicleCategory/cabriolet-r.svg";
import commercialiR from "@/assets/home/vehicleCategory/commerciali-r.svg";
import coupeR from "@/assets/home/vehicleCategory/coupe-r.svg";
import elettricaR from "@/assets/home/vehicleCategory/elettrica-r.svg";
import hatchbackR from "@/assets/home/vehicleCategory/hatchback-r.svg";
import lussoR from "@/assets/home/vehicleCategory/lusso-r.svg";
import minivanR from "@/assets/home/vehicleCategory/minivan-r.svg";
import monovolumeR from "@/assets/home/vehicleCategory/monovolume-r.svg";
import sportivaR from "@/assets/home/vehicleCategory/sportiva-r.svg";
import stationwagonR from "@/assets/home/vehicleCategory/stationwagon-r.svg";
import suvR from "@/assets/home/vehicleCategory/suv-r.svg";
import { cn } from "@/lib/utils";
import { BsChevronDown } from "react-icons/bs";

const { Option } = Select;

interface VehicleFilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const vehicleCategories = [
  { id: "Coupé", name: "Coupé", icon: coupeB, hoverIcon: coupeR },
  { id: "Cabriolet", name: "Cabriolet", icon: cabrioletB, hoverIcon: cabrioletR },
  { id: "Commerciali", name: "Commerciali", icon: commercialiB, hoverIcon: commercialiR },
  { id: "Elettrica", name: "Elettrica", icon: elettricaB, hoverIcon: elettricaR },
  { id: "Hatchback", name: "Hatchback", icon: hatchbackB, hoverIcon: hatchbackR },
  { id: "Lusso", name: "Lusso", icon: lussoB, hoverIcon: lussoR },
  { id: "Minivan", name: "Minivan", icon: minivanB, hoverIcon: minivanR },
  { id: "Monovolume", name: "Monovolume", icon: monovolumeB, hoverIcon: monovolumeR },
  { id: "Sportiva", name: "Sportiva", icon: sportivaB, hoverIcon: sportivaR },
  { id: "Station wagon", name: "Station wagon", icon: stationwagonB, hoverIcon: stationwagonR },
  { id: "Suv", name: "Suv", icon: suvB, hoverIcon: suvR },
];

export default function VehicleFilterModal({ open, onClose, onApply }: VehicleFilterModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("Ferrari");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 380]);
  const [withDeposit, setWithDeposit] = useState(false);
  const [withoutDeposit, setWithoutDeposit] = useState(false);
  const [selectedFuel, setSelectedFuel] = useState<string>("");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<(typeof vehicleCategories)[number] | null>(null);

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedBrand("Ferrari");
    setPriceRange([0, 380]);
    setWithDeposit(false);
    setWithoutDeposit(false);
    setSelectedFuel("");
    setSelectedTransmission("");
  };

  const handleApply = () => {
    const filters = {
      category: selectedCategory,
      brand: selectedBrand,
      priceRange,
      withDeposit,
      withoutDeposit,
      fuelType: selectedFuel,
      transmission: selectedTransmission,
    };
    onApply(filters);
    onClose();
  };

  return (
    <>
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsFilterModalOpen(true)}>
        <Image src={filter} alt="filtri" width={20} height={20} className="h-4 w-4" />
        <p className="text-text_dark_gray text-sm cursor-pointer">Filtri</p>
      </div>
      <Modal
        title={null}
        open={isFilterModalOpen}
        onCancel={() => {
          if (setIsFilterModalOpen) setIsFilterModalOpen(false);
        }}
        footer={null}
        width={660}
        className="vehicle-filter-modal"
        closeIcon={null}
        styles={{
          body: { padding: 0 },
        }}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#D1252B",
            },
          }}
        >
          <div className="bg-white rounded-lg ">
            {/* Header */}
            <div className="flex justify-between items-start pb-4">
              <div className="md:px-4 md:pt-4">
                <h2 className=" text-gray-900 mb-3 md:mb-6  text-lg sm:text-2xl font-semibold ">Filtri</h2>
                <p className="text-sm text-[#AAAAAA] font-medium leading-4 border-b border-gray-200 pb-4 md:pb-6">
                  Personalizza la tua ricerca per trovare velocemente il veicolo che meglio si adatta alle tue esigenze. Scegli tra diverse opzioni
                  come tipo di veicolo, marchio, tipologia di cambio e prezzo per ottenere risultati precisi e mirati.
                </p>
              </div>
              <button
                onClick={() => {
                  if (setIsFilterModalOpen) setIsFilterModalOpen(false);
                }}
                className="text-gray-400 hover:text-primary ml-4 mt- absolute top-3 right-3"
              >
                <X size={20} />
              </button>
            </div>
            <div className="md:px-4">
              <div className="">
                {/* Category Section */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Categoria</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 border-b border-gray-300 md:pb-8">
                    {vehicleCategories.map((category) => (
                      <button
                        onMouseEnter={() => setHoveredItem(category as any)}
                        onMouseLeave={() => setHoveredItem(null)}
                        key={category.id}
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? "" : category.id)}
                        className={` flex flex-col items-center justify-center p-[7px] rounded-md border transition-all shadow hover:shadow-primary/20 hover:shadow-md hover:text-primary ${
                          selectedCategory === category.id ? " shadow-primary/20 shadow-md" : " bg-white hover:border-gray-300 shadow-md"
                        }`}
                      >
                        <div className="w-12 h-6 mb- flex items-center justify-center">
                          <Image
                            src={
                              hoveredItem?.id == category.id
                                ? category.hoverIcon.src
                                : selectedCategory === category.id
                                ? category.hoverIcon.src
                                : category.icon.src
                            }
                            alt={category.name}
                            width={112}
                            height={24}
                            className={`w-24 h-auto ${selectedCategory === category.id ? "text-primary" : "text-gray-600"}`}
                          />
                        </div>
                        <span
                          className={`text-[11px] text-center leading-3 hover:text-primary ${
                            selectedCategory === category.id ? "text-primary" : " "
                          }`}
                        >
                          {category.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand Section */}
                <div className="mb-8 border-b border-gray-300 md:pb-8">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Brand</h3>
                  <Select
                    value={selectedBrand}
                    onChange={setSelectedBrand}
                    className="w-full shadow-md"
                    size="middle"
                    suffixIcon={
                      <span className="text-primary/60">
                        <BsChevronDown size={20} />
                      </span>
                    }
                    style={{ height: "42px" }}
                  >
                    {carBrands.map((brand, i) => {
                      const brandName = typeof brand === "string" ? brand : brand.name;
                      return (
                        <Option key={i} value={brandName}>
                          <div className="flex items-center py-1">
                            <div className="w-5 h-5 bg-gray-200 rounded mr-3 flex items-center justify-center">
                              <Image height={100} width={100} src={brand.logo.src} alt="logo" className={`w-5 h-auto `} />
                            </div>
                            {brandName}
                          </div>
                        </Option>
                      );
                    })}
                  </Select>
                </div>

                {/* Price Section */}
                <div className="mb-8 border-b border-gray-300 md:pb-8">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Prezzo giornaliero</h3>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                      <span>{priceRange?.[0]} CHF</span>
                      <span>{priceRange?.[1]} CHF</span>
                    </div>
                    <Slider
                      range
                      min={0}
                      max={380}
                      value={priceRange}
                      onChange={(value) => {
                        if (Array.isArray(value) && value.length === 2) {
                          setPriceRange([value[0], value[1]]);
                        }
                      }}
                      className="mb-6"
                      styles={{
                        track: { backgroundColor: "#ef4444" },
                        tracks: { backgroundColor: "#ef4444" },
                      }}
                      handleStyle={[
                        { borderColor: "#ef4444", backgroundColor: "#ef4444", boxShadow: "none" },
                        { borderColor: "#ef4444", backgroundColor: "#ef4444", boxShadow: "none" },
                      ]}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setWithDeposit(!withDeposit)}
                      className={cn(
                        `flex items-center justify-center gap-5 p-2 rounded-lg border transition-all hover:shadow-primary/20 shadow-md  hover:text-primary ${
                          withDeposit ? "shadow-primary/20 shadow-md text-primary" : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
                        }`
                      )}
                    >
                      <Image height={100} width={100} src={ConDeposito.src} alt="Con deposito" className={`w-[18px] h-auto `} />
                      <p className="text-sm ">Con deposito</p>
                    </button>
                    <button
                      onClick={() => setWithoutDeposit(!withoutDeposit)}
                      className={`flex items-center justify-center gap-5 p-2 rounded-lg border transition-all hover:shadow-primary/20 shadow-md  hover:text-primary ${
                        withoutDeposit ? "shadow-primary/20 shadow-md text-primary" : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      <Image height={100} width={100} src={Nodeposit.src} alt="Con deposito" className={`w-5 h-auto `} />
                      <p className="text-sm ">Senza deposito</p>
                    </button>
                  </div>
                </div>

                {/* Fuel Type Section */}
                <div className="mb-8 border-b border-gray-300 md:pb-8">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Carburante</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["Benzina", "Diesel", "Elettrico", "Ibrido"].map((fuel) => (
                      <button
                        key={fuel}
                        onClick={() => setSelectedFuel(selectedFuel === fuel ? "" : fuel)}
                        className={`p-1 rounded-lg border text-sm transition-all hover:shadow-primary/20 shadow-md  hover:text-primary ${
                          selectedFuel === fuel
                            ? "shadow-primary/20 shadow-md text-primary"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {fuel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transmission Section */}
                <div className="mb-8 border-b border-gray-300 md:pb-8">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Trasmissione</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedTransmission(selectedTransmission === "manuale" ? "" : "manuale")}
                      className={`flex items-center justify-center gap-5 p-[6px] rounded-lg border text-sm transition-all  hover:shadow-primary/20 shadow-md  hover:text-primary ${
                        selectedTransmission === "manuale"
                          ? "shadow-primary/20 shadow-md text-primary"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <Image height={100} width={100} src={menual.src} alt="menual" className={`w-5 h-6 `} />
                      Manuale
                    </button>
                    <button
                      onClick={() => setSelectedTransmission(selectedTransmission === "automatico" ? "" : "automatico")}
                      className={`flex items-center justify-center gap-5 p-[6px] rounded-lg border text-sm transition-all  hover:shadow-primary/20 shadow-md  hover:text-primary ${
                        selectedTransmission === "automatico"
                          ? "shadow-primary/20 shadow-md text-primary"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <Image height={100} width={100} src={automatic.src} alt="automatic" className={`w-5 h-6 `} />
                      Automatico
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center   ">

                <button
                  onClick={handleReset}
                  className=" w-36 text-[13px] px-8 xl:px-8 py-2 md:py-1.5 border rounded font-medium shadow-md text-center hover:bg-text_light_gray/10 hover:shadow-lg"
                >
                  Ripristina
                </button>
                <button
                  onClick={handleApply}
                  className=" w-36 text-[13px] px-8 xl:px-8 py-2 md:py-1.5 bg-primary hover:bg-primary/90 hover:shadow-xl  text-white font-medium rounded shadow-lg"
                >
                  Applica
                </button>
              </div>
            </div>
          </div>
        </ConfigProvider>
      </Modal>
    </>
  );
}
