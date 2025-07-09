"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IoIosArrowDown } from "react-icons/io";
import benzina from "@/assets/vehicleInsertion/benzina.svg";
import DIESEL from "@/assets/vehicleInsertion/diesel.svg";
import ELETTRICO from "@/assets/vehicleInsertion/elettrico.svg";
import IBRIDO from "@/assets/vehicleInsertion/ibrido.svg";
import Image from "next/image";
import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateFormData } from "@/redux/slice/vehicleInsertSlice";

interface BasicInfoStepProps {
  errors: string[];
}

export function BasicInfoStep({ errors }: BasicInfoStepProps) {
  const dispatch = useDispatch();
  const { formData } = useSelector((state: RootState) => state.form);
  const carBrands = [
    "Alfa romeo",
    "Alpine",
    "Aston martin",
    "Audi",
    "Bentley",
    "Bmw",
    "BYD",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Citroen",
    "Cupra",
    "Dacia",
    "Daihatsu",
    "Dodge",
    "Dongfeng",
    "Dr",
    "Ferrari",
    "Fiat",
    "Ford",
    "Genesis",
    "Honda",
    "Hummer",
    "Hyundai",
    "Infiniti",
    "Isuzu",
    "Iveco",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Lancia",
    "Land rover",
    "Lexus",
    "Lotus",
    "Maserati",
    "Mazda",
    "Mclaren",
    "Mercedes-benz",
    "Mini",
    "Mitsubishi",
    "Nissan",
    "Opel",
    "Peugeout",
    "Polestar",
    "Porsche",
    "Renault",
    "Rolls-royce",
    "Seat",
    "Skoda",
    "Smart",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Volvo",
    "Volkswagen",
    "Voyah",
  ];

  const fuelOptions = [
    {
      name: "BENZINA",
      description:
        "Seleziona benzina se il tuo veicolo richiede SP95, SP98 o SP100",
      image: benzina,
    },
    {
      name: "DIESEL",
      description:
        "Seleziona diesel se il tuo veicolo richiede gasolio standard o premium",
      image: DIESEL,
    },
    {
      name: "ELETTRICO",
      description:
        "Seleziona elettrico se il tuo veicolo richiede una ricarica tramite energia elettrica",
      image: ELETTRICO,
    },
    {
      name: "IBRIDO",
      description:
        "Seleziona ibrido se il tuo veicolo utilizza sia engine elettrico che combustione interna",
      image: IBRIDO,
    },
  ];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    // Update the formData with the checkbox value
    dispatch(updateFormData({ isConfirmed: isChecked }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: string, value: any) => {
    dispatch(updateFormData({ [field]: value }));
  };

  const hasError = (fieldName: string) => errors.includes(fieldName);

  return (
    <div className="space-y-10">
      {/* Registrazione  */}
      <div className="space-y-16">
        <VehicleInsertionHeader
          title="Registrazione"
          subtitle="Inserisci i dati base del tuo veicolo"
        />
        {/* Categoria */}
        <div className="relative flex flex-col gap-3">
          <Label htmlFor="category" className="relative">
            Categoria
          </Label>

          <select
            required
            id="category"
            value={formData.category || ""}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className={`relative shadow-md rounded-lg border ${
              hasError("category") && !formData.category
                ? "border-red"
                : "border-gray-100"
            } w-60 px-4 py-2.5 appearance-none bg-transparent pr-8 text-sm font-normal text-black focus:outline-none ${
              formData.category === "" ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled></option>
            <option className="text-black" value="Coupè">
              Coupè
            </option>
            <option className="text-black" value="Elettrica">
              Elettrica
            </option>
            <option className="text-black" value="Hatchback">
              Hatchback
            </option>
            <option className="text-black" value="Lusso">
              Lusso
            </option>
            <option className="text-black" value="Stationwagon">
              Station Wagon
            </option>
            <option className="text-black" value="Minivan">
              Minivan
            </option>
            <option className="text-black" value="Sportiva">
              Sportiva
            </option>
            <option className="text-black" value="Monovolume">
              Monovolume
            </option>
            <option className="text-black" value="Commerciali">
              Commerciali
            </option>
            <option className="text-black" value="Suv">
              Suv
            </option>
            <option className="text-black" value="Cabriolet">
              Cabriolet
            </option>
          </select>

          {/* Custom Dropdown Arrow */}
          <div className="absolute top-12 left-52 transform -translate-y-1/2 pointer-events-none">
            <IoIosArrowDown className="w-4 h-4 text-red" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-10">
          {/* Marchio */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="brand">Marchio</Label>
            <select
              required
              id="brand"
              value={formData.brand || ""}
              onChange={(e) => handleInputChange("brand", e.target.value)}
              className={`relative shadow-md rounded-lg ${
                hasError("brand") && !formData.brand
                  ? "border-red"
                  : "border-gray-100"
              } border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent pr-8 text-sm font-normal text-black  invalid:text-white focus:outline-none`}
            >
              <option value="" disabled>
                Select a brand
              </option>
              {carBrands.map((brand, index) => (
                <option key={index} className="text-black" value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            {/* Custom Dropdown Arrow */}
            <div className="absolute top-12 left-52 transform -translate-y-1/2 pointer-events-none">
              <IoIosArrowDown className="w-4 h-4 text-red" />
            </div>
          </div>

          {/* Modello */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="model">Modello</Label>
            <Input
              required
              id="model"
              type="text"
              value={formData.model || ""}
              onChange={(e) => handleInputChange("model", e.target.value)}
              className={`shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent text-sm font-normal ${
                hasError("model") && !formData.model
                  ? "border-red"
                  : "border-gray-100"
              }`}
            />
          </div>

          {/* Anno */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="year">Anno</Label>
            <select
              required
              id="anno"
              value={formData.year || ""}
              onChange={(e) =>
                handleInputChange("year", Number(e.target.value))
              }
              className={`relative shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent pr-8 text-sm font-normal text-black invalid:text-white focus:outline-none ${
                hasError("year") && !formData.year
                  ? "border-red"
                  : "border-gray-100"
              }`}
            >
              <option value="" disabled>
                Select a year
              </option>
              <option className="text-black" value="1990">
                1990
              </option>
              <option className="text-black" value="1990">
                1991
              </option>
              <option className="text-black" value="1992">
                1992
              </option>
              <option className="text-black" value="1994">
                1994
              </option>
              <option className="text-black" value="1995">
                1995
              </option>
              <option className="text-black" value="1996">
                1996
              </option>
              <option className="text-black" value="1997">
                1997
              </option>
              <option className="text-black" value="1998">
                1998
              </option>
              <option className="text-black" value="1999">
                1999
              </option>
              <option className="text-black" value="2000">
                2000
              </option>
              <option className="text-black" value="2001">
                2001
              </option>
              <option className="text-black" value="2002">
                2002
              </option>
              <option className="text-black" value="2003">
                2003
              </option>
              <option className="text-black" value="2004">
                2004
              </option>
              <option className="text-black" value="2005">
                2005
              </option>
              <option className="text-black" value="2006">
                2006
              </option>
              <option className="text-black" value="2007">
                2007
              </option>
              <option className="text-black" value="2008">
                2008
              </option>
              <option className="text-black" value="2009">
                2009
              </option>
              <option className="text-black" value="2010">
                2010
              </option>
              <option className="text-black" value="2011">
                2011
              </option>
              <option className="text-black" value="2012">
                2012
              </option>
              <option className="text-black" value="2013">
                2013
              </option>
              <option className="text-black" value="2014">
                2014
              </option>
              <option className="text-black" value="2015">
                2015
              </option>
              <option className="text-black" value="2016">
                2016
              </option>
              <option className="text-black" value="2017">
                2017
              </option>
              <option className="text-black" value="2018">
                2018
              </option>
              <option className="text-black" value="2019">
                2019
              </option>
              <option className="text-black" value="2020">
                2020
              </option>
              <option className="text-black" value="2021">
                2021
              </option>
              <option className="text-black" value="2022">
                2022
              </option>
              <option className="text-black" value="2023">
                2023
              </option>
              <option className="text-black" value="2024">
                2024
              </option>
              <option className="text-black" value="2025">
                2025
              </option>
            </select>

            {/* Custom Dropdown Arrow */}
            <div className="absolute top-12 left-52 transform -translate-y-1/2 pointer-events-none">
              <IoIosArrowDown className="w-4 h-4 text-red" />
            </div>
          </div>
        </div>
      </div>
      {/* Separator */}
      <div>
        <Separator className="my-20" />
      </div>
      {/* Dettagli */}
      <div className="space-y-16">
        <VehicleInsertionHeader
          title="Dettagli"
          subtitle="Inserisci le informazioni utili per aiutare gli utenti"
        />

        <div className="max-w-4xl flex flex-wrap items-center justify-start gap-10">
          {/* Trasmissione */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="transmission">Trasmissione</Label>

            <select
              required
              id="transmission"
              value={formData.transmission || ""}
              onChange={(e) =>
                handleInputChange("transmission", e.target.value)
              }
              className={`relative shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent pr-8 text-sm font-normal
              text-black invalid:text-white focus:outline-none ${
                hasError("transmission") && !formData.transmission
                  ? "border-red"
                  : "border-gray-100"
              }`}
            >
              <option value="" disabled className="">
                Select a trasmissione
              </option>
              <option className="text-black" value="AUTOMATIC">
                Automatico
              </option>
              <option className="text-black" value="MANUAL">
                Manuale
              </option>
            </select>

            {/* Custom Dropdown Arrow */}
            <div className="absolute top-12 left-52 transform -translate-y-1/2 pointer-events-none">
              <IoIosArrowDown className="w-4 h-4 text-red" />
            </div>
          </div>
          {/* Colore */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="color">Colore</Label>
            <select
              required
              id="color"
              value={formData.color || ""}
              onChange={(e) => handleInputChange("color", e.target.value)}
              className={`relative shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent pr-8 text-sm font-normal  text-black invalid:text-white focus:outline-none ${
                hasError("color") && !formData.color
                  ? "border-red"
                  : "border-gray-100"
              }`}
            >
              <option value="" disabled>
                Select a color
              </option>
              <option className="text-black" value="Giallo">
                Giallo
              </option>
              <option className="text-black" value="Arancione">
                Arancione
              </option>
              <option className="text-black" value="Rosso">
                Rosso
              </option>
              <option className="text-black" value="Viola">
                Viola
              </option>
              <option className="text-black" value="Rosa">
                Rosa
              </option>
              <option className="text-black" value="Azzurro">
                Azzurro
              </option>
              <option className="text-black" value="Blu">
                Blu
              </option>
              <option className="text-black" value="Verde">
                Verde
              </option>
              <option className="text-black" value="Grigio">
                Grigio
              </option>
              <option className="text-black" value="Marrone">
                Marrone
              </option>
              <option className="text-black" value="Bianco">
                Bianco
              </option>
              <option className="text-black" value="Nero">
                Nero
              </option>
            </select>

            {/* Custom Dropdown Arrow */}
            <div className="absolute top-12 left-52 transform -translate-y-1/2 pointer-events-none">
              <IoIosArrowDown className="w-4 h-4 text-red" />
            </div>
          </div>
          {/* 0-100 km/h  */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="kmh">0-100 km/h</Label>
            <div className="relative">
              <Input
                required
                id="kmh"
                type="number"
                value={formData.kmh || ""}
                onChange={(e) =>
                  handleInputChange("kmh", Number(e.target.value))
                }
                className={`relatile shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent text-sm font-normal ${
                  hasError("kmh") && !formData.kmh
                    ? "border-red"
                    : "border-gray-100"
                }`}
              />
              <p className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 text-sm font-medium">
                SEC
              </p>
            </div>
          </div>
          {/* Motore */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="engine">Motore</Label>
            <Input
              required
              id="engine"
              type="text"
              value={formData.engine || ""}
              onChange={(e) => handleInputChange("engine", e.target.value)}
              className={`shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent text-sm font-normal ${
                hasError("engine") && !formData.engine
                  ? "border-red"
                  : "border-gray-100"
              }`}
            />
          </div>
          {/* maxSpeed  */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="maxSpeed">Velocità massima</Label>
            <div className="relative ">
              <Input
                required
                id="maxSpeed"
                type="number"
                value={formData.maxSpeed || ""}
                onChange={(e) =>
                  handleInputChange("maxSpeed", Number(e.target.value))
                }
                className={`relative shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent text-sm font-normal ${
                  hasError("maxSpeed") && !formData.maxSpeed
                    ? "border-red"
                    : "border-gray-100"
                }`}
              />
              <p className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 text-sm font-medium">
                KM/H
              </p>
            </div>
          </div>
          {/* Cavalli */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="horsePower">Cavalli</Label>
            <div className="relative">
              <Input
                required
                id="horsePower"
                type="number"
                value={formData.horsePower || ""}
                onChange={(e) =>
                  handleInputChange("horsePower", Number(e.target.value))
                }
                className={`relative shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent text-sm font-normal ${
                  hasError("horsePower") && !formData.horsePower
                    ? "border-red"
                    : "border-gray-100"
                }`}
              />
              <p className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 text-sm font-medium">
                CV
              </p>
            </div>
          </div>
          {/* seats  */}
          <div className="relative flex flex-col gap-3">
            <Label htmlFor="transmission">Posti a sedere</Label>

            <select
              required
              id="seats"
              value={formData.seats || ""}
              onChange={(e) =>
                handleInputChange("seats", Number(e.target.value))
              }
              className={`relative shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent pr-8 text-sm font-normal text-black invalid:text-white focus:outline-none ${
                hasError("seats") && !formData.seats
                  ? "border-red"
                  : "border-gray-100"
              }`}
            >
              <option value="" disabled>
                Posti a sedere
              </option>
              <option className="text-black" value="1">
                1
              </option>
              <option className="text-black" value="2">
                2
              </option>
              <option className="text-black" value="3">
                3
              </option>
              <option className="text-black" value="4">
                4
              </option>
              <option className="text-black" value="5">
                5
              </option>
              <option className="text-black" value="6">
                6
              </option>
              <option className="text-black" value="7">
                7
              </option>
              <option className="text-black" value="8">
                8
              </option>
              <option className="text-black" value="9">
                9
              </option>
              <option className="text-black" value="10">
                10
              </option>
            </select>

            {/* Custom Dropdown Arrow */}
            <div className="absolute top-12 left-52 transform -translate-y-1/2 pointer-events-none">
              <IoIosArrowDown className="w-4 h-4 text-red" />
            </div>
          </div>
        </div>
      </div>
      {/* Separator */}
      <div>
        <Separator className="my-20" />
      </div>
      {/* Carburante */}
      <div className="space-y-16">
        <VehicleInsertionHeader
          title="Carburante"
          subtitle=" Seleziona il tipo di carburante necessario per il tuo veicolo"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {fuelOptions.map((fuel, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("fuelType", fuel.name)}
              className={`${
                hasError("fuelType") && !formData.fuelType
                  ? "border-red"
                  : "border-gray-100"
              } lg:w-[270px] xl:w-[270px] 2xl:w-[280px] border px-4 py-7 shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer
                  ${
                    formData.fuelType === fuel.name
                      ? "shadow shadow-red/10"
                      : "border-gray-200"
                  }`}
            >
              <Image
                src={fuel.image}
                alt={fuel.name}
                width={40}
                height={40}
                className="w-10 h-10 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12"
              />
              <h2 className="xl:text-[17px] 2xl:text-lg font-semibold">
                {fuel.name}
              </h2>
              <p className="text-xs text-text_light_gray font-medium leading-tight text-center">
                {fuel.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Checkbox */}
      <div className="pt-10">
        <label className="flex items-center text-sm underline cursor-pointer">
          <input
            required
            type="checkbox"
            checked={formData.isConfirmed || false} // Ensure it's checked when formData is available
            onChange={handleCheckboxChange} // Track checkbox state
            className="mr-2 cursor-pointer"
          />
          Confermo che affitterò come azienda registrata e fornirò la mia
          assicurazione per il noleggio.
        </label>
      </div>
      {/* Separator */}
      <div>
        <Separator className="my-20" />
      </div>
    </div>
  );
}
