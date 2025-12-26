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
import { useGetAllSubscriptionsQuery } from "@/redux/api/subscription";

export default function MySubscription() {
  const { data, isLoading } = useGetAllSubscriptionsQuery(undefined);

const plusPlan = data?.data?.find((p: any) => p.name === "PLUS");
const businessPlan = data?.data?.find((p: any) => p.name === "BUSINESS");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBusinessGrow, setIsBusinessGrow] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
const renderFeatures = (features: string[]) => (
  <div className="space-y-3 mb-6">
    {features.map((feature, index) => (
      <div key={index} className="flex items-center space-x-2">
        <Check className="w-5 h-5 text-green" />
        <span className="text-xs">{feature}</span>
      </div>
    ))}
  </div>
);

  // const handleSave = (values: any) => {
  //   console.log("Form values:", values);
  //   setIsModalOpen(false);
  // };
  if (isLoading) {
  return <p className="text-center py-20">Loading subscriptions...</p>;
}

  return (
    <div className="my-8 md:my-16 lg:my-24">
      <div className="">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Il mio abbonamento</h1>
            <p className="text-text_light_gray text-sm">Gestisci i dettagli del tuo abbonamento e controlla le altre delle tue funzionalità</p>
          </div>

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
        {/* Plus Card */}
<div className="flex flex-col gap-8 h-full">
  <div className="bg-white rounded-xl h-[450px] shadow-lg p-6 pt-7 md:px-16 border border-black/5 shadow-black/10">
    <div className="text-center mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Plus</h3>
      <Image src={plus} alt="Plus Icon" className="w-10 h-10 mx-auto my-4" />
      <p className="text-sm text-[#AAAAAA] py-2">
        {plusPlan?.description}
      </p>
    </div>

    {plusPlan && renderFeatures(plusPlan.features)}
  </div>

  <Button className="w-full max-w-[250px] mx-auto bg-primary text-white shadow">
    Piano attuale – {plusPlan?.monthlyPrice} CHF/mese
  </Button>
</div>

          {/* Business Card */}
       {/* Business Card */}
<div className="flex flex-col gap-8 h-full">
  <div
    className={cn(
      "bg-white rounded-xl shadow-lg p-6 pt-7 md:px-16 border border-black/5 shadow-black/10 overflow-hidden",
      isBusinessGrow ? "h-[515px]" : "h-[450px]",
      "transition-all duration-500 ease-in-out"
    )}
  >
    <div className="text-center mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Business</h3>
      <Image src={business} alt="Business Icon" className="w-10 h-10 mx-auto my-4" />
      <p className="text-sm text-[#AAAAAA] py-2">
        {businessPlan?.description}
      </p>
    </div>

    <div className="space-y-3 mb-7">
      {businessPlan?.features
        ?.slice(0, 6)
        .map((feature: string, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green" />
            <span className="text-xs">{feature}</span>
          </div>
        ))}

      {/* Expanded features */}
      {isBusinessGrow &&
        businessPlan?.features
          ?.slice(6)
          .map((feature: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green" />
              <span className="text-xs">{feature}</span>
            </div>
          ))}

      <div
        onClick={() => setIsBusinessGrow(!isBusinessGrow)}
        className={cn(
          "flex items-center justify-center py-2 cursor-pointer transition-all duration-500",
          isBusinessGrow && "rotate-180"
        )}
      >
        <Image src={downArrow} alt="Down Arrow" className="w-5 h-5" />
      </div>
    </div>
  </div>

  <Button variant="outline" className="w-full max-w-[250px] mx-auto shadow">
    Acquista – {businessPlan?.monthlyPrice} CHF/mese
  </Button>
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
