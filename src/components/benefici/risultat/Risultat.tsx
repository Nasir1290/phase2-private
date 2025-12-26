import Image from "next/image";
import clienti from "@/assets/benefici/clienti-soddisfatti.svg";
import car from "@/assets/benefici/ampia-scelta.svg";

const Risultat = () => {
  return (
    <div className="mb-20">
      <div className="container mx-auto ">
        <div className="flex flex-col items-center text-center mt-10 md:mt-0 mb-12 md:mb-16 space-y-10">
          <h2 className="font-extrabold text-2xl md:text-[30px] uppercase">Risultati</h2>
          <p className="hidden xl:block text-sm font-medium text-text_light_gray max-w-[1100px] ">
            Abbiamo raggiunto traguardi significativi, trasformando il noleggio veicoli in un’esperienza semplice e accessibile. Dalle tariffe <br />
            competitive al servizio clienti eccellente, i nostri numeri raccontano una storia di qualità, affidabilità e soddisfazione dei nostri
            utenti
          </p>
          <p className="md:hidden text-sm font-medium text-text_light_gray max-w-[1100px] ">
            Abbiamo raggiunto traguardi significativi, trasformando il noleggio veicoli in un’esperienza semplice e accessibile. Dalle tariffe{" "}
            competitive al servizio clienti eccellente, i nostri numeri raccontano una storia di qualità, affidabilità e soddisfazione dei nostri
            utenti
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="bg-[#F1F1F1] pl-[250px] sm:pl-0 py-8 md:py-8 lg:py-16 xl:px-8 my-18 flex items-center justify-center gap-4 md:gap-8 lg:gap-12 xl:gap-16 overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 xl:gap-12 w-max px-4">
            <div className="bg-white rounded-xl px-8 py-6 h-44 w-[280px] flex flex-col items-center gap-4 shadow-lg hover:shadow-primary/5 hover:shadow-lg border">
              <Image src={clienti} alt="user" width={40} height={40} className="w-9 h-9 mb-3" />
              <h1 className="text-3xl text-primary font-extrabold">+300</h1>
              <p className="text-[15px] font-medium text-center">CLIENTI SODDISFATTI</p>
            </div>
            <div className="bg-white rounded-xl px-8 py-6 h-44 w-[280px] flex flex-col items-center gap-4 shadow-lg hover:shadow-primary/5 hover:shadow-lg border">
              <Image src={car} alt="car" width={80} height={80} className="w-14 h-14 mb-3" />
              <h1 className="text-3xl text-primary font-extrabold">+500</h1>
              <p className="text-[15px] font-medium text-center">NOLEGGI CONCLUSI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Risultat;
