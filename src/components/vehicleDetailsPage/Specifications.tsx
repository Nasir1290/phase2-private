"use client";

import React from "react";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineTimer } from "react-icons/md";
import { PiEngineDuotone } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { SlSpeedometer } from "react-icons/sl";
import { ImPower } from "react-icons/im";
import { TbAutomaticGearbox } from "react-icons/tb";
import { BsFuelPump } from "react-icons/bs";
import { IoMdColorFill } from "react-icons/io";
import { Car } from "@/types/cars";
import { SectionHeader3 } from "../shared/sectionHeader/SectionHeader";

const Specifications = ({ car }: { car: Car }) => {
  const iconList = [
    {
      icon: <CiCalendar />,
      title: "Anno ",
      subtitle: car?.year,
    },
    {
      icon: <IoMdColorFill />,
      title: "Colore",
      subtitle: car?.color,
    },
    {
      icon: <MdOutlineTimer />,
      title: "0-100KM/H",
      subtitle: car?.kmh,
    },
    {
      icon: <TbAutomaticGearbox />,
      title: "Trasmisione",
      subtitle: car?.transmission === "AUTOMATIC" ? "Automatico" : "Manuale",
    },
    {
      icon: <PiEngineDuotone />,
      title: "Motore",
      subtitle: car?.engine,
    },
    {
      icon: <SlSpeedometer />,
      title: "V.Max",
      subtitle: car?.maxSpeed,
    },
    {
      icon: <ImPower />,
      title: "Cavalli",
      subtitle: car?.horsePower,
    },
    { icon: <GoPeople />, title: "Posti", subtitle: car?.seats },
    {
      icon: <BsFuelPump />,
      title: "Carburante",
      subtitle: car?.fuelType
        ? car?.fuelType.charAt(0).toUpperCase() +
          car?.fuelType.slice(1).toLowerCase()
        : "", // Capitalize the first letter and make the rest lowercase
    },
  ];
  // const ford = [
  //   {
  //     icon: <GoArrowBoth />,
  //     title: "LUNGHEZZA ESTERNA",
  //     subtitle: car?.lunghezza_esterna,
  //   },
  //   {
  //     icon: <GoArrowBoth />,
  //     title: "LARGHEZZA ESTERNA",
  //     subtitle: car?.larghezza_esterna,
  //   },
  //   {
  //     icon: <BsArrowDownUp />,
  //     title: "ALTEZZA ESTERNA",
  //     subtitle: car?.altezza_esterna,
  //   },
  //   {
  //     icon: <GoArrowBoth />,
  //     title: "LUNGHEZZA INTERNA",
  //     subtitle: car?.lunghezza_interna,
  //   },
  //   {
  //     icon: <GoArrowBoth />,
  //     title: "LARGHEZZA INTERNA",
  //     subtitle: car?.larghezza_interna,
  //   },
  //   {
  //     icon: <BsArrowDownUp />,
  //     title: "ALTEZZA INTERNA",
  //     subtitle: car?.altezza_interna,
  //   },
  //   {
  //     icon: <BsCart2 />,
  //     title: "PESO A VUOTO",
  //     subtitle: car?.peso_a_vuoto,
  //   },

  //   {
  //     icon: <BsCart2 />,
  //     title: "CARICO MASSIMO",
  //     subtitle: car?.carico_massimo,
  //   },
  //   {
  //     icon: <TbAutomaticGearbox />,
  //     title: "TRASMISSIONE",
  //     subtitle: car?.transmission,
  //   },
  //   {
  //     icon: <GoPeople />,
  //     title: "POSTI A SEDERE",
  //     subtitle: car.carico_massimo,
  //   },
  //   {
  //     icon: <BsFuelPump />,
  //     title: "CARBURANTE",
  //     subtitle: car?.carburante,
  //   },
  // ];
  return (
    <div>
      <SectionHeader3 title="Specifiche" />

      <div className="hidden md:grid grid-cols-12 gap-2 md:gap-10">
        {iconList.map((spec, index) => (
          <div
            key={index}
            className="col-span-6 md:col-span-4 flex items-center gap-5"
          >
            <p className="text-xl md:text-3xl text-text_light_gray font-bold">
              {spec.icon}
            </p>
            <div>
              <h2 className="font-medium text-text_light_gray">{spec.title}</h2>
              <p className="text-text_dark_gray">{spec.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {iconList.map((spec, index) => (
          <div
            key={index}
            className="md:hidden flex items-center justify-between gap-5"
          >
            <div className="flex gap-4">
              <p className="text-xl md:text-3xl text-text_light_gray font-bold">
                {spec.icon}
              </p>
              <h2 className="font-medium text-text_light_gray">{spec.title}</h2>
            </div>
            <div>
              <p className="text-text_dark_gray">{spec.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specifications;
