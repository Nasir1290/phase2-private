import plus from "@/assets/Plus.svg";
import standard from "@/assets/Standard.svg";
import BADGE from "@/assets/VANTAGGI/BADGE.png";
import { Check } from "lucide-react";
import Image from "next/image";

export default function PricingTable() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 md:py-20">
      <div className="max-w-[1248px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-28">
          {/* Standard Plan */}
          <div className="relative bg-white rounded-2xl shadow-md border-0">
            <div className="text-center pb-6 pt-8">
              <h3 className="text-xl font-bold mb-6">Standard</h3>
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Image src={standard.src} alt="Badge" className="w-12 h-12" />
              </div>
              <p className="text-sm text-[#AAAAAA] leading-relaxed">
                L&#39;essenziale per iniziare
                <br />
                senza costi
              </p>
            </div>
            <div className="px-8 md:px-[70px] pb-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">X5 Immagini</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">Promozioni a pagamento</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">Funzionalità standard</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">Annunci gratuiti</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">Servizio clienti</span>
                </div>
              </div>

              <div className="">
                <div className="mb-6 md:pt-[107px]">
                  <div className="text-xs font-semibold mb-1">CHF</div>
                  <div className="flex items-baseline gap-1 font-semibold">
                    <span className="text-4xl ">0.</span>
                    <span className="text-4xl ">-</span>
                    <span className="text-xs ml-2">/ MESE</span>
                  </div>
                </div>
                <button className="bg-white border w-full px-6 py-3 rounded-md text-sm">Piano attuale</button>
              </div>
            </div>
          </div>

          {/* Plus Plan */}
          <div className="relative bg-white rounded-2xl shadow-md border-0">
            <div className="text-center pb-6 pt-8">
              <h3 className="text-xl font-bold mb-6">Plus</h3>
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Image src={plus.src} alt="Badge" className="w-12 h-12" />
              </div>
              <p className="text-sm text-[#AAAAAA] leading-relaxed">
                Perfetto per piccole aziende che
                <br />
                puntano a crescere rapidamente
              </p>
            </div>
            <div className="px-8  md:px-[70px] pb-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">X8 Immagini</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">X5 In cima</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">X1 In risalto</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">Badge esclusivo</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">Supporto H24</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">Logo aziendale in vetrina</span>
                </div>
              </div>

              <div className="mb-6 md:pt-[70px]  font-semibold">
                <div className="text-xs mb-1">CHF</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl  ">39.</span>
                  <span className="text-4xl  ">-</span>
                  <span className="text-xs ml-2">/ MESE</span>
                </div>
              </div>
              <button className=" w-full px-6 py-3 rounded-md bg-primary text-white text-sm">Acquista</button>
            </div>
          </div>

          {/* Business Plan */}
          <div className="relative bg-white rounded-2xl shadow-md border-0">
            <div className="text-center pb-6 pt-8">
              <h3 className="text-xl font-bold mb-6">Business</h3>
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Image src={BADGE.src} alt="Badge" className="w-12 h-12" />
              </div>
              <p className="text-sm text-[#AAAAAA] leading-relaxed">
                La soluzione ideale per aziende
                <br />
                con grandi flotte e ambizioni
              </p>
            </div>
            <div className="px-8  md:px-[70px] pb-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">X12 Immagini</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">X12 In cima</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">X1 In homepage</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">X3 In risalto</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">Badge esclusivo</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">Supporto H24</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">Logo aziendale in vetrina</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-sm ">Video negli annunci</span>
                </div>
              </div>

              <div className="mb-6 font-semibold">
                <div className="text-xs  mb-1">CHF</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl ">119.</span>
                  <span className="text-4xl ">-</span>
                  <span className="text-xs  ml-2">/ MESE</span>
                </div>
              </div>
              <button className=" w-full px-6 py-3 rounded-md bg-primary text-white text-sm">Acquista</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
