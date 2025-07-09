"use client";

import Image from "next/image";
import googleReview from "@/assets/benefici/google-reviews.svg";
import { SectionHeader2 } from "@/components/shared/sectionHeader/SectionHeader";
const HighQualityRental = () => {
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-14`}>
      <div className="w-full lg:w-1/2 space-y-10">
        <div className="max-w-[370px]">
          <SectionHeader2
            topText="FEEDBACK"
            title="Un servizio di noleggio di"
            highlightedText="alta qualità"
          />
        </div>
        <p className="text-sm md:text-[15px] font-normal text-text_light_gray ">
          Bittengo è un marketplace che connette clienti e fornitori di veicoli,
          offrendo un&apos;esperienza di noleggio che si distingue per qualità,
          affidabilità e convenienza. Accedi a una vasta selezione di veicoli,
          sempre in ottime condizioni, puliti e ben equipaggiati, per garantire
          comfort e sicurezza. Le tariffe sono trasparenti e senza sorprese, per
          permetterti di viaggiare senza preoccupazioni. Scegli tra diverse
          opzioni, tutte con un servizio clienti sempre disponibile a
          supportarti in ogni fase del noleggio. Con Bittengo, trovi soluzioni
          di mobilità che soddisfano i più alti standard.
        </p>
      </div>
      <div className="w-full lg:w-1/2">
        {" "}
        <div className="flex justify-center items-center ">
          <Image
            src={googleReview}
            alt="icon"
            width={100}
            height={100}
            className="w-60 h-40"
          />
        </div>
      </div>
    </div>
  );
};

export default HighQualityRental;
