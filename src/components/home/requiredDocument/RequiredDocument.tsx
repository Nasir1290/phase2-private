"use client";

import Image from "next/image";
import driver from "@/assets/home/driver.svg";
import Europe_icon from "@/assets/home/europe.svg";
import Switzerland_icon from "@/assets/home/swiss.svg";
import Usa_icon from "@/assets/home/usa.svg";
import { SectionHeader1 } from "@/components/shared/sectionHeader/SectionHeader";

const RequiredDocument: React.FC = () => {
  return (
    <div className="container mx-auto">
      {/* Section Header */}
      <SectionHeader1
        title="DOCUMENTI RICHIESTI"
        subtitle="Documenti necessari per il noleggio di un veicolo in Svizzera"
      />

      {/* Hardcoded sections */}
      <div className="grid grid-cols-1 md:grid-cols-2  justify-around items-start  overflow-x-hidden">
        {/* Non residenti in CH */}
        <div className="flex flex-col items-center text-center mb-3 pt-20">
          <div className="relative">
            <Image
              src={driver}
              alt="Non residenti in CH"
              width={300}
              height={300}
              className="relative mx-auto w-40 h-40"
            />

            <Image
              src={Europe_icon}
              alt="Non residenti in CH"
              width={500}
              height={500}
              className="absolute -top-4 -right-2 w-10 h-10 z-40"
            />
            <Image
              src={Usa_icon}
              alt="Non residenti in CH"
              width={500}
              height={500}
              className="absolute -top-14 right-10 w-10 h-10 z-40"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-[22px] font-semibold mt-5">
              Non residenti in CH
            </h3>
            <p className="max-w-[400px] text-sm font-[450] mt-2 text-text_light_gray">
              Patente di guida nazionale in corso di validità, passaporto o
              documento d&apos;identità ufficiale valido
            </p>
          </div>
        </div>

        {/* Residenti in Svizzera */}
        <div className="flex flex-col items-center text-center mb-3 pt-20">
          <div className="relative">
            <Image
              src={driver}
              alt="Residenti in Svizzera"
              width={300}
              height={300}
              className="mx-auto w-40 h-40"
            />
            <Image
              src={Switzerland_icon}
              alt="Residenti in Svizzera"
              width={500}
              height={500}
              className="absolute -top-8 right-2 w-10 h-10 z-40"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-[22px] font-semibold mt-5">
              Residenti in Svizzera
            </h3>
            <p className="max-w-sm text-sm font-[450] mt-2 text-text_light_gray">
              Patente di guida valida, documento d&apos;identità
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequiredDocument;
