import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { SectionHeader3 } from "../shared/sectionHeader/SectionHeader";
import { IoIosArrowDown, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Car } from "@/types/cars";

const Booking = ({ car }: { car: Car }) => {
  return (
    <div>
      {/* Section Header */}
      <SectionHeader3 title="Cosa è incluso nella mia prenotazione?" />

      {/* Accordion Container */}
      <div className="w-full md:w-[450px] shadow-md shadow-black/10 border rounded-xl px-8 py-5">
        <Accordion type="single" collapsible>
          {/* Deposit Policy Accordion Item */}
          <AccordionItem
            value={`faq-item-deposit-${car?.depositePolicy}`} // Unique value
            key={`faq-item-deposit-${car?.depositePolicy}`}
          >
            <AccordionTrigger className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg transition w-full font-[450px]">
              <span className="flex items-center gap-6">
                <IoIosCheckmarkCircleOutline className="text-2xl text-red" />
                Politiche sul deposito
              </span>
              <IoIosArrowDown className="text-red text-xl font-bold" />
            </AccordionTrigger>
            <AccordionContent className="p-3 rounded-b-lg bg-section_bg/30">
              {car?.depositePolicy || "Nessuna politica specificata"}
            </AccordionContent>
          </AccordionItem>

          {/* Damage Policy Accordion Item */}
          <AccordionItem
            value={`faq-item-damage-${car?.damagePolicy}`} // Unique value
            key={`faq-item-damage-${car?.damagePolicy}`}
          >
            <AccordionTrigger className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg transition w-full font-[450px]">
              <span className="flex items-center gap-6">
                <IoIosCheckmarkCircleOutline className="text-2xl text-red" />
                Politiche sui danni
              </span>
              <IoIosArrowDown className="text-red text-xl font-bold" />
            </AccordionTrigger>
            <AccordionContent className="p-3 rounded-b-lg bg-section_bg/30">
              {car?.damagePolicy || "Nessuna politica specificata"}
            </AccordionContent>
          </AccordionItem>

          {/* Mileage Policy Accordion Item */}
          <AccordionItem
            value={`faq-item-mileage-${car?.mileagePolicy}`} // Unique value
            key={`faq-item-mileage-${car?.mileagePolicy}`}
          >
            <AccordionTrigger className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg transition w-full font-[450px]">
              <span className="flex items-center gap-6">
                <IoIosCheckmarkCircleOutline className="text-2xl text-red" />
                Politiche sui chilometri
              </span>
              <IoIosArrowDown className="text-red text-xl font-bold" />
            </AccordionTrigger>
            <AccordionContent className="p-3 rounded-b-lg bg-section_bg/30">
              {car?.mileagePolicy || "Nessuna politica specificata"}
            </AccordionContent>
          </AccordionItem>

          {/* Fuel Policy Accordion Item */}
          <AccordionItem
            value={`faq-item-fuel-${car?.fuelPolicy}`} // Unique value
            key={`faq-item-fuel-${car?.fuelPolicy}`}
          >
            <AccordionTrigger className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg transition w-full font-[450px]">
              <span className="flex items-center gap-6">
                <IoIosCheckmarkCircleOutline className="text-2xl text-red" />
                Politiche sul carburante
              </span>
              <IoIosArrowDown className="text-red text-xl font-bold" />
            </AccordionTrigger>
            <AccordionContent className="p-3 rounded-b-lg bg-section_bg/30">
              {car?.fuelPolicy || "Nessuna politica specificata"}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Booking;
