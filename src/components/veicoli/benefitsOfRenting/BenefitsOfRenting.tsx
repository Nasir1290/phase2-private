import Image from "next/image";
import Link from "next/link";
import commision from "@/assets/vehicle/zero-commissioni.svg";
import prize from "@/assets/vehicle/prezzeeccellenti.svg";
import ampia from "@/assets/vehicle/ampiascelta.svg";
import nessun from "@/assets/vehicle/no-deposit.svg";
import { MdArrowForwardIos } from "react-icons/md";

const BenefitsOfRenting = () => {
  return (
    <div id="partnership-terms" className="container mx-auto">
      {/* Header  */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <header className="max-w-2xl text-start lg:mb-10">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-medium text-text_light_gray uppercase">
              VANTAGGI
            </span>
            <h1 className="text-2xl md:text-[30px] font-extrabold">
              Benefici di noleggiare con
              <br />
              <span className="text-red">Bittengo.org</span>
            </h1>
          </div>
        </header>

        <Link
          href="/benefici"
          className="hidden text-sm font-semibold text-red uppercase md:flex items-center gap-1 hover:bg-red/5 h-8 px-3 py-2 my-auto rounded-lg"
        >
          TUTTI I BENEFICI
          <MdArrowForwardIos />
        </Link>
      </div>
      {/* Cards  */}
      <div className="w-full py-10">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-10 xl:gap-10 2xl:gap-5 w-max px-4">
            {/* ZERO COMMISSIONI */}
            <div className="w-64 md:w-72 lg:w-52 xl:w-[245px] 2xl:w-72 p-2 flex flex-col items-start gap-4 text-start">
              <div className="flex items-center gap-5">
                <Image
                  src={commision}
                  alt="commision"
                  width={50}
                  height={50}
                  className="w-9 h-9"
                />
                <p className="text-[17px] font-semibold mt-3 mb-3">
                  ZERO COMMISSIONI
                </p>
              </div>
              <p className="text-text_light_gray font-medium text-sm">
                Non addebitiamo alcuna commissione aggiuntiva per il servizio
              </p>
            </div>
            {/* PREZZI ECCELLENTI */}
            <div className="w-64 md:w-72 lg:w-52 xl:w-[245px] 2xl:w-72 p-2 flex flex-col items-start gap-4 text-start">
              <div className="flex items-center gap-5">
                <Image
                  src={prize}
                  alt="prize"
                  width={50}
                  height={50}
                  className="w-9 h-9"
                />
                <p className="text-[17px] font-semibold mt-3 mb-3">
                  PREZZI ECCELLENTI
                </p>
              </div>
              <p className="text-text_light_gray font-medium text-sm">
                Offriamo tariffe competitive e accessibili, per offrirti il
                miglior rapporto qualità-prezzo
              </p>
            </div>
            {/* AMPIA SCELTA */}
            <div className="w-64 md:w-72 lg:w-52 xl:w-[245px] 2xl:w-72 p-2 flex flex-col items-start gap-4 text-start">
              <div className="flex items-center gap-5">
                <Image
                  src={ampia}
                  alt="ampia"
                  width={50}
                  height={50}
                  className="w-10 h-10"
                />
                <p className="text-[17px] font-semibold mt-3 mb-3">
                  AMPIA SCELTA
                </p>
              </div>
              <p className="text-text_light_gray font-medium text-sm">
                Scegli tra una varietà di veicoli, dalle auto compatte ai
                furgoni, per trovare la soluzione perfetta per te
              </p>
            </div>
            {/* NESSUN DEPOSITO */}
            <div className="w-64 md:w-72 lg:w-52 xl:w-[245px] 2xl:w-72 p-2 flex flex-col items-start gap-4 text-start">
              <div className="flex items-center gap-5">
                <Image
                  src={nessun}
                  alt="nessun"
                  width={50}
                  height={50}
                  className="w-9 h-9"
                />
                <p className="text-[17px] font-semibold mt-3 mb-3">
                  NESSUN DEPOSITO
                </p>
              </div>
              <p className="text-text_light_gray font-medium text-sm">
                Possibilità di prenotare veicoli senza deposito
              </p>
            </div>
          </div>
        </div>
      </div>
      <Link
        href="/benefici"
        className="text-sm font-semibold text-red uppercase flex md:hidden mx-auto  text-center w-full items-center justify-center gap-10 shadow-md px-16 py-6 rounded-lg h-8 mt-6"
      >
        TUTTI I BENEFICI
        <MdArrowForwardIos />
      </Link>
    </div>
  );
};

export default BenefitsOfRenting;
