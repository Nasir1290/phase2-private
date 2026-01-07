"use client";
import fino from "@/assets/fino.svg";
import finoX1 from "@/assets/finox1.svg";
import finoX3 from "@/assets/finox3.svg";
import { SectionHeader1 } from "../shared/sectionHeader/SectionHeader";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    <div className=" py-16 md:py-24 px-4 md:px-0">
      <div className="max-w-[1248px] mx-auto ">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionHeader1 title="RISPARMIA" subtitle="Scopri come ridurre i costi e ottenere il massimo valore dai tuoi abbonamenti" />
        </div>

        {/* Features Grid */}
        <div className="flex items-start justify-center lg:justify-between flex-wrap gap-10 px-5 xl:px-0">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image height={100} width={100} src={fino.src} alt="Fino" className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-bold  mb-4">FINO A X12 IN CIMA</h3>
            <p className="text-[#989898] text-sm leading-relaxed font-semibold">
              Promuovi il tuo annuncio nella parte superiore
              <br />
              per massimizzare la visibilità e attirare più
              <br />
              clienti
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image height={100} width={100} src={finoX1.src} alt="Fino X1" className="w-16 h-16" />
            </div>
            <h3 className="text-lg font-bold  mb-4">FINO A X1 IN HOMEPAGE</h3>
            <p className="text-[#989898] text-sm leading-relaxed font-semibold">
              Attira rapidamente l&#39;attenzione dei clienti e
              <br />
              promuovi il tuo annuncio in primo piano
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image height={100} width={100} src={finoX3.src} alt="Fino X3" className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-bold  mb-4">FINO A X3 IN RISALTO</h3>
            <p className="text-[#989898] text-sm leading-relaxed font-semibold">
              Mettendo il tuo annuncio in evidenza, attirerai
              <br />
              immediatamente più visibilità e maggiore
              <br />
              interesse
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
