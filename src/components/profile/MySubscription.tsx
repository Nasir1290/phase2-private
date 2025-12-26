/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import business from "@/assets/Business.svg";
import plus from "@/assets/Plus.svg";
import standard from "@/assets/Standard.svg";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import SubscriptionModal from "./subscription-modal";
import downArrow from "@/assets/downArrow.svg";
import { cn } from "@/lib/utils";

export default function MySubscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBusinessGrow, setIsBusinessGrow] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  // const handleSave = (values: any) => {
  //   console.log("Form values:", values);
  //   setIsModalOpen(false);
  // };
  return (
    <div className="my-8 md:my-16 lg:my-24">
      <div className="">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Il mio abbonamento</h1>
            <p className="text-text_light_gray text-sm">Gestisci i dettagli del tuo abbonamento e controlla le altre delle tue funzionalità</p>
          </div>

          {/* <div onClick={handleOpenModal} className="flex items-center gap-2  text-sm font-semibold text-primary cursor-pointer">
            <p> GESTISCI ABBONAMENTO </p>
            <FaChevronRight size={14} />
          </div> */}
          <div  onClick={handleOpenModal} className="hidden md:flex cursor-pointer text-sm font-semibold text-primary uppercase items-center gap-1 hover:bg-primary/5 px-3 py-2 rounded-lg">
            GESTISCI ABBONAMENTO
            <MdArrowForwardIos />
          </div>

          {/* <BillingModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} /> */}
          <SubscriptionModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>

        {/* Subscription Cards */}
        <div className="grid grid-cols-3 gap-6 lg:gap-20 mb-8">
          {/* Standard Card */}
          <div className="flex flex-col gap-8 h-full">
            <div className="bg-white rounded-xl h-[450px] shadow-lg p-6 pt-7  border border-black/5 shadow-black/10">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Standard</h3>
                <Image src={standard} alt="Standard Icon" className="w-10 h-10 mx-auto my-4" width={48} height={48} />
                <p className="text-sm text-[#AAAAAA] py-2">
                  L&#39;essenziale per iniziare <br /> senza costi
                </p>
              </div>

              <div className="space-y-3 mb-6 px-10">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs ">X6 Immagini</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs ">Promozioni a pagamento</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs ">Funzionalità standard</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs ">Annunci gratuiti</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs ">Servizio clienti</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full max-w-[250px] mx-auto bg-transparent shadow">
              Gratuito
            </Button>
          </div>
          {/* Plus Card */}
          <div className="flex flex-col gap-8 h-full">
            <div className="bg-white rounded-xl h-[450px]  shadow-lg p-6 pt-7 md:px-16  border border-black/5 shadow-black/10">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Plus</h3>
                <Image src={plus} alt="Plus Icon" className="w-10 h-10 mx-auto my-4" width={48} height={48} />
                <p className="text-sm text-[#AAAAAA] py-2">Perfetto per piccole aziende che <br /> puntano a crescere rapidamente</p>
              </div>

              <div className="space-y-3 mb-6 ">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs ">X8 Immagini</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs ">X5 in cima</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs ">X1 in risalto</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs ">Badge esclusivo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs ">Supporto H24</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs ">Logo aziendale in vetrina</span>
                </div>
              </div>
            </div>
            <Button className="w-full max-w-[250px] mx-auto bg-primary hover:bg-primary text-white shadow">Piano attuale</Button>
          </div>
          {/* Business Card */}
          <div className="flex flex-col gap-8 h-full">
            <div className={cn("bg-white rounded-xl   shadow-lg p-6 pt-7 md:px-16 border border-black/5 shadow-black/10 overflow-hidden", 
            isBusinessGrow ? "h-[515px] transition-all duration-500 ease-in-out" : "h-[450px] md:h-[450px] lg:h-[450px] transition-all duration-500 ease-in-out"
            )}>
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Business</h3>
                <Image src={business} alt="Business Icon" className="w-10 h-10 mx-auto my-4" width={48} height={48} />
                <p className="text-sm text-[#AAAAAA] py-2">La soluzione ideale per aziende <br /> con grandi lotte e ambizioni</p>
              </div>

              <div className="space-y-3 mb-7">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs">X12 Immagini</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs">X12 in cima</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs">X1 in homepage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs">X3 in risalto</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs">Badge esclusivo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs">Supporto H24</span>
                </div>
                <div className={cn( isBusinessGrow ? "  transition-all duration-500 ease-in-out flex items-center space-x-2" : "hidden transition-all duration-500 ease-in-out")}>
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs">Logo aziendale in vetrina</span>
                </div>
                <div className={cn( isBusinessGrow ? " transition-all duration-500 ease-in-out flex items-center space-x-2" : "hidden transition-all duration-500 ease-in-out")}>
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs">Video negli annunci</span>
                </div>
                <div onClick={
                  () => setIsBusinessGrow(!isBusinessGrow)
                } className={cn("flex items-center justify-center py-2",
                  isBusinessGrow ? "rotate-180 transition-all duration-500 ease-in-out cursor-pointer" : "cursor-pointer transition-all duration-500 ease-in-out"
                )}>
                  <Image src={downArrow} alt="Down Arrow" className="w-5 h-5 text-green" />
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full max-w-[250px] mx-auto bg-transparent shadow">
              Acquista
            </Button>{" "}
          </div>
        </div>
        {/* Current Subscription Section */}
        <div className="mt-20">
          <p className="text-sm text-text_light_gray mb-5">Il tuo abbonamento &quot;Plus&quot;</p>

          <div className="flex items-center gap-6 mb-2 ">
            <h4 className="font-semibold text-gray-900 text-xl">Bittengo SAGL</h4>
            <Image src={plus} alt="Plus Icon" className="w-6 h-6" width={48} height={48} />
          </div>

          <p className="text-sm text-black">Abbonamento Plus: 39 CHF/mese</p>
        </div>
      </div>
    </div>
  );
}
