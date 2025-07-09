import { SectionHeader2 } from "@/components/shared/sectionHeader/SectionHeader";
import Image from "next/image";
import client from "@/assets/partnership/clienti-soddisfatti.svg";
import star from "@/assets/partnership/marketplace.svg";
import car from "@/assets/partnership/ampia-scelta.svg";

const PartnershipCustomers = () => {
  return (
    <div id="partnership-clientela">
      <div className="container mx-auto">
        <SectionHeader2
          topText="TRAGUARDI"
          title="Esplora nuova"
          highlightedText="clientela"
        />
      </div>

      <div className="bg-[#F1F1F1] w-full pt-10 pb-6">
        <div className="container mx-auto">
          <div className="flex flex-row overflow-x-auto gap-6 scrollbar-hide">
            {/* CLIENTI SODDISFATTI  */}
            <div className="bg-white px-20 lg:w-[255px] h-[170px] shadow-lg border rounded-xl p-6 flex flex-col items-center text-center mb-4">
              <Image
                src={client}
                alt="client"
                width={50}
                height={50}
                className="w-8 h-8 xl:w-8 xl:h-8"
              />
              <p className="text-red text-3xl font-extrabold mt-3 mb-3">+300</p>
              <p className="text-black font-medium text-sm ">
                CLIENTI SODDISFATTI
              </p>
            </div>
            {/* MARKETPLACE DI NOLEGGIO */}
            <div className="mx-auto bg-white px-20 lg:w-[255px] h-[170px] shadow-lg border rounded-xl flex flex-col items-center text-center">
              <Image
                src={star}
                alt="star"
                width={50}
                height={50}
                className="mt-3 lg:mt-3 w-14 h-14 xl:w-20 xl:h-w-20"
              />
              <p className="text-red text-3xl font-extrabold mt-0 ml-4">1°</p>
              <p className="text-black font-medium text-sm mt-2">
                MARKETPLACE DI NOLEGGIO
              </p>
            </div>
            {/* MARKETPLACE DI NOLEGGIO */}
            <div className="bg-white px-20 lg:w-[255px] h-[170px] shadow-lg border rounded-xl flex flex-col items-center text-center p-3 space-y-1">
              <Image
                src={car}
                alt="car"
                width={50}
                height={50}
                className="w-14 h-14"
              />
              <p className="text-red text-3xl font-extrabold mb-3">+500</p>
              <p className="text-black font-medium text-sm mb-6">
                NOLEGGI CONCLUSI
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipCustomers;
