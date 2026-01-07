/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Modal, Select, Slider } from "antd";
import { X } from "lucide-react";
import { useState } from "react";

import Cabriolet from "@/assets/filterIcons/Cabriolet.svg";
import Commerciali from "@/assets/filterIcons/Commerciali.svg";
import ConDeposito from "@/assets/filterIcons/ConDeposito.svg";
import Coupe from "@/assets/filterIcons/Coupé.svg";
import Elettrica from "@/assets/filterIcons/Elettrica.svg";
import Hatchback from "@/assets/filterIcons/Hatchback.svg";
import Lusso from "@/assets/filterIcons/Lusso.svg";
import Minivan from "@/assets/filterIcons/Minivan.svg";
import Monovolume from "@/assets/filterIcons/Monovolume.svg";
import Sportiva from "@/assets/filterIcons/Sportiva.svg";
import StationWagon from "@/assets/filterIcons/Station wagon.svg";
import Suv from "@/assets/filterIcons/Suv.svg";
import automatic from "@/assets/filterIcons/automatic.svg";
import menual from "@/assets/filterIcons/menual.svg";
import filter from "@/assets/vehicle/filter.svg";
import { carBrands } from "@/lib/brands";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";

const { Option } = Select;

interface VehicleFilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const vehicleCategories = [
  { id: "Coupé", name: "Coupé", icon: Coupe },
  { id: "Cabriolet", name: "Cabriolet", icon: Cabriolet },
  { id: "Commerciali", name: "Commerciali", icon: Commerciali },
  { id: "Elettrica", name: "Elettrica", icon: Elettrica },
  { id: "Hatchback", name: "Hatchback", icon: Hatchback },
  { id: "Lusso", name: "Lusso", icon: Lusso },
  { id: "Minivan", name: "Minivan", icon: Minivan },
  { id: "Monovolume", name: "Monovolume", icon: Monovolume },
  { id: "Sportiva", name: "Sportiva", icon: Sportiva },
  { id: "Station wagon", name: "Station wagon", icon: StationWagon },
  { id: "Suv", name: "Suv", icon: Suv },
];

export default function VehicleFilterModal({ open, onClose, onApply }: VehicleFilterModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("Ferrari");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 380]);
  const [withDeposit, setWithDeposit] = useState(false);
  const [withoutDeposit, setWithoutDeposit] = useState(false);
  const [selectedFuel, setSelectedFuel] = useState<string>("");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("automatico");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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
        width={640}
        className="vehicle-filter-modal"
        closeIcon={null}
        styles={{
          body: { padding: 0 },
        }}
      >
        <div className="bg-white rounded-lg md:p-4">
          {/* Header */}
          <div className="flex justify-between items-start pb-4">
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-3 md:mb-6">Filtri</h2>
              <p className="text-sm text-[#AAAAAA] font-medium leading-relaxed border-b border-gray-200 pb-4 md:pb-6">
                Personalizza la tua ricerca per trovare velocemente il veicolo che meglio si adatta alle tue esigenze. Scegli tra diverse opzioni come
                tipo di veicolo, marchio, tipologia di cambio e prezzo per ottenere risultati precisi e mirati.
              </p>
            </div>
            <button
              onClick={() => {
                if (setIsFilterModalOpen) setIsFilterModalOpen(false);
              }}
              className="text-gray-400 hover:text-gray-600 ml-4 mt-1"
            >
              <X size={20} />
            </button>
          </div>

          <div className="">
            {/* Category Section */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-900 mb-4">Categoria</h3>
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2 border-b border-gray-200 md:pb-8">
                {vehicleCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? "" : category.id)}
                    className={` flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                      selectedCategory === category.id ? "border-primary bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="w-16 h-6 mb-2 flex items-center justify-center">
                      {/* <svg
                      width="32"
                      height="20"
                      viewBox="0 0 32 20"
                      className={selectedCategory === category.id ? "fill-red-500" : "fill-gray-600"}
                    >
                      <path d="M4 14h2v2H4v-2zm6 0h2v2h-2v-2zm6 0h2v2h-2v-2zm6 0h2v2h-2v-2zM2 8h28v4H2V8zm2-2h24l-2-4H6L4 6z" />
                    </svg> */}
                      <Image
                      height={28}
                      width={28}
                        src={category.icon.src}
                        alt={category.name}
                        className={`w-28 h-auto ${selectedCategory === category.id ? "text-primary" : "text-gray-600"}`}
                      />
                    </div>
                    <span className={`text-xs text-center leading-tight ${selectedCategory === category.id ? "text-primary" : "text-gray-600"}`}>
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Section */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-900 mb-4">Brand</h3>
              <Select
                value={selectedBrand}
                onChange={setSelectedBrand}
                className="w-full"
                size="large"
                suffixIcon={
                  <span className="text-gray-400">
                    <IoIosArrowDown />
                  </span>
                }
                style={{ height: "48px" }}
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
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-900 mb-4">Prezzo giornaliero</h3>
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>0 CHF</span>
                  <span>380 CHF</span>
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
                  className={`flex items-center justify-center gap-3 p-3 rounded-lg border transition-all shadow-md ${
                    withDeposit ? "border-primary bg-red-50 text-primary" : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <Image height={100} width={100} src={ConDeposito.src} alt="Con deposito" className={`w-5 h-auto `} />
                  <p className="text-sm ">Con deposito</p>
                </button>
                <button
                  onClick={() => setWithoutDeposit(!withoutDeposit)}
                  className={`flex items-center justify-center gap-3 p-3 rounded-lg border transition-all shadow-md ${
                    withoutDeposit ? "border-primary bg-red-50 text-primary" : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <Image height={100} width={100} src={ConDeposito.src} alt="Con deposito" className={`w-5 h-auto `} />
                  <p className="text-sm ">Senza deposito</p>
                </button>
              </div>
            </div>

            {/* Fuel Type Section */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-900 mb-4">Carburante</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["Benzina", "Diesel", "Elettrico", "Ibrido"].map((fuel) => (
                  <button
                    key={fuel}
                    onClick={() => setSelectedFuel(selectedFuel === fuel ? "" : fuel)}
                    className={`p-3 rounded-lg border text-sm transition-all shadow-md ${
                      selectedFuel === fuel ? "border-primary bg-red-50 text-primary" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {fuel}
                  </button>
                ))}
              </div>
            </div>

            {/* Transmission Section */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-900 mb-4">Trasmissione</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedTransmission(selectedTransmission === "manuale" ? "" : "manuale")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm transition-all shadow-md ${
                    selectedTransmission === "manuale"
                      ? "border-primary bg-red-50 text-primary"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Image height={100} width={100} src={menual.src} alt="menual" className={`w-5 h-auto `} />
                  Manuale
                </button>
                <button
                  onClick={() => setSelectedTransmission(selectedTransmission === "automatico" ? "" : "automatico")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm transition-all shadow-md ${
                    selectedTransmission === "automatico"
                      ? "border-primary bg-red-50 text-primary"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Image height={100} width={100} src={automatic.src} alt="automatic" className={`w-5 h-auto `} />
                  Automatico
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center  pt-4 md:pt-8 border-t border-gray-100">
            <Button onClick={handleReset} className="text-gray-600 border-gray-300 hover:border-gray-400 hover:text-gray-700 sm:px-12" size="large">
              Ripristina
            </Button>
            <Button
              onClick={handleApply}
              className="bg-primary hover:bg-primary border-primary hover:border-primary text-white sm:px-12"
              size="large"
            >
              Applica
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
