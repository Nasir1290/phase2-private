"use client";
// import SUBSCRIPTIONS from "@/assets/subscription/subscription.png";
import BADGE from "@/assets/Badge unico business (2).svg";
import FLESSIBILITA from "@/assets/Flessibilità 1.svg";
import INCREMENTO from "@/assets/Incremento dei noleggi.svg";
import PUBBLICITA from "@/assets/Pubblicità 1.svg";
import SUPPORTO from "@/assets/Supporto clienti 7.7 1.svg";
import visibilita from "@/assets/Visibilità aumentata 1.svg";
const backgroundVideo = "/background.mp4";
import Image from "next/image";
import { SectionHeader1 } from "../shared/sectionHeader/SectionHeader";
import FAQSection from "./faq-section";
import FeaturesSection from "./features-section";
import PricingTable from "./pricing-table";

const Subscription = () => {
  // const fuelOptions = [
  //   {
  //     name: "VISIBILITA AUMENTATA",
  //     description:
  //       "Esponi il tuo logo e rendi le tue inserzioni più visibili, attirando l’attenzione dei clienti e dando massimo risalto alla tua attività",
  //     image: visibilita,
  //   },
  //   {
  //     name: "INCREMENTO DEI NOLEGGI",
  //     description: "Accelera il successo delle tue inserzioni con i nostri piani maggiore visibilità, più richieste e guadagni ottimizzati",
  //     image: INCREMENTO,
  //   },
  //   {
  //     name: "FLESSIBILITA",
  //     description:
  //       "Con i nostri abbonamenti, gestisci facilmente le tue offerte e rispondi rapidamente alle richieste, garantendo una maggiore adattabilità e soddisfazione per i tuoi clienti",
  //     image: FLESSIBILITA,
  //   },
  //   {
  //     name: "BADGE UNICO",
  //     description:
  //       "Rendi visibile la tua attività con un badge esclusivo che distingue la tua offerta, aumentando la fiducia dei clienti e la tua visibilità",
  //     image: BADGE,
  //   },
  //   {
  //     name: "SUPPORTO CLIENTI 7/7",
  //     description: "Il nostro supporto clienti è attivo 7 giorni su 7, pronto a rispondere ad ogni tua esigenza",
  //     image: SUPPORTO,
  //   },
  //   {
  //     name: "PUBBLICITA",
  //     description: "Sblocca promozioni gratuite per ampliare la visibilità del tuo annuncio e raggiungere più utenti sulla piattaforma",
  //     image: PUBBLICITA,
  //   },
  // ];

  return (
    <div>
        {/* background video */}
      <div className="relative w-full min-h-screen md:h-[calc(100vh-200px)] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>

        {/* Optional dark overlay */}
        {/* <div className="absolute inset-0 bg-black opacity-30"></div> */}

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white min-h-screen md:h-[calc(100vh-200px)]">
          <h2 className="text-xl md:text-4xl font-bold">Sblocca il</h2>
          <h2 className="text-xl md:text-4xl font-bold mb-3 md:mb-10">
            <span className="text-primary">potenziale</span> della tua flotta
          </h2>
          <p className="mt-2 max-w-[800px] text-center px-2">
            Unisciti a Bittengo.org, il marketplace innovativo che ti consente di offrire i tuoi veicoli per il noleggio <br /> a una vasta rete
            di clienti. Registrando la tua flotta, potrai aumentare la visibilità dei tuoi veicoli e <br /> sfruttare le potenzialità del nostro
            network per ottenere risultati concreti. Con la nostra piattaforma <br /> sicura e intuitiva, potrai espandere la tua base di
            clienti, raggiungendo non solo privati, ma anche <br /> turisti e cittadini in cerca di veicoli pratici e convenienti
          </p>
          <button className="mt-8 px-11 pt-[6px] pb-[5px] bg-primary text-white rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300 font-bold">
            VEDI PIANI
          </button>
        </div>
      </div>

      {/* VANTAGGI */}
      <div className="max-w-[1248px] mx-auto">
        <div className="  px-4 py-10 md:py-20">
          {/* <VehicleInsertionHeader title="Carburante" subtitle=" Seleziona il tipo di carburante necessario per il tuo veicolo" /> */}
          <SectionHeader1 title="VANTAGGI" subtitle="Scopri i benefici di sottoscrivere un abbonamento a bittengo.org" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto mt-10 md:mt-16 justify-items-center gap-5 md:gap-10">
            {/* {fuelOptions.map((fuel: any, index: number) => (
              <div
                key={index}
                className={`w-full border px-4 py-7 shadow-lg rounded-lg flex flex-col items-center justify-cente gap-2 cursor-pointer
                  hover:shadow-xl transition-shadow duration-300 bg-white text-center`}
              >
                <Image src={fuel.image} alt={fuel.name} width={40} height={40} className="w-10 h-10 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12" />
                <h2 className="xl:text-[17px] 2xl:text-lg font-semibold mb-4">{fuel.name}</h2>
                <p className="text-xs text-text_light_gray font-medium leading-tight text-center max-w-[250px]">{fuel.description}</p>
              </div>
            ))} */}
              <div
                className={`w-full border px-4 py-7 shadow-lg rounded-lg flex flex-col items-center justify-cente gap-2 cursor-pointer
                  hover:shadow-xl transition-shadow duration-300 bg-white text-center`}
              >
                <Image src={visibilita} alt={"visibilita"} width={40} height={40} className="w-10 h-10 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12" />
                <h2 className="xl:text-[17px] 2xl:text-lg font-semibold mt-2 mb-4">VISIBILITA AUMENTATA</h2>
                <p className="text-xs text-text_light_gray font-medium leading-tight text-center max-w-[260px]">Esponi il tuo logo e rendi le tue inserzioni più visibili, attirando l’attenzione dei clienti e dando massimo risalto alla tua attività</p>
              </div>
              <div
                className={`w-full border px-4 py-7 shadow-lg rounded-lg flex flex-col items-center justify-cente gap-2 cursor-pointer
                  hover:shadow-xl transition-shadow duration-300 bg-white text-center`}
              >
                <Image src={INCREMENTO} alt={"INCREMENTO"} width={40} height={40} className="w-10 h-10 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12" />
                <h2 className="xl:text-[17px] 2xl:text-lg font-semibold mt-2 mb-4">INCREMENTO DEI NOLEGGI</h2>
                <p className="text-xs text-text_light_gray font-medium leading-tight text-center max-w-[260px]">Accelera il successo delle tue inserzioni con <br /> i nostri piani maggiore visibilità, più richieste <br />e guadagni ottimizzati</p>
              </div>
              <div
                className={`w-full border px-4 py-7 shadow-lg rounded-lg flex flex-col items-center justify-cente gap-2 cursor-pointer
                  hover:shadow-xl transition-shadow duration-300 bg-white text-center`}
              >
                <Image src={FLESSIBILITA} alt={"FLESSIBILITA"} width={40} height={40} className="w-10 h-10 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12" />
                <h2 className="xl:text-[17px] 2xl:text-lg font-semibold mt-2 mb-4">FLESSIBILITA</h2>
                <p className="text-xs text-text_light_gray font-medium leading-tight text-center max-w-[260px]">Con i nostri abbonamenti, gestisci facilmente <br /> le tue offerte e rispondi rapidamente alle richieste, garantendo una maggiore adattabilità e soddisfazione per i tuoi clienti</p>
              </div>
              <div
                className={`w-full border px-4 py-7 shadow-lg rounded-lg flex flex-col items-center justify-cente gap-2 cursor-pointer
                  hover:shadow-xl transition-shadow duration-300 bg-white text-center`}
              >
                <Image src={BADGE} alt={"BADGE"} width={40} height={40} className="w-10 h-10 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12" />
                <h2 className="xl:text-[17px] 2xl:text-lg font-semibold mt-2 mb-4">BADGE UNICO</h2>
                <p className="text-xs text-text_light_gray font-medium leading-tight text-center max-w-[260px]">Rendi visibile la tua attività con un badge esclusivo che distingue la tua offerta, aumentando la fiducia dei clienti e la tua visibilità</p>
              </div>
              <div
                className={`w-full border px-4 py-7 shadow-lg rounded-lg flex flex-col items-center justify-cente gap-2 cursor-pointer
                  hover:shadow-xl transition-shadow duration-300 bg-white text-center`}
              >
                <Image src={SUPPORTO} alt={"SUPPORTO"} width={40} height={40} className="w-10 h-10 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12" />
                <h2 className="xl:text-[17px] 2xl:text-lg font-semibold mt-2 mb-4">SUPPORTO CLIENTI 7/7</h2>
                <p className="text-xs text-text_light_gray font-medium leading-tight text-center max-w-[260px]">Il nostro supporto clienti è attivo 7 giorni su 7, pronto a rispondere ad ogni tua esigenza</p>
              </div>
              <div
                className={`w-full border px-4 py-7 shadow-lg rounded-lg flex flex-col items-center justify-cente gap-2 cursor-pointer
                  hover:shadow-xl transition-shadow duration-300 bg-white text-center`}
              >
                <Image src={PUBBLICITA} alt={"PUBBLICITA"} width={40} height={40} className="w-10 h-10 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12" />
                <h2 className="xl:text-[17px] 2xl:text-lg font-semibold mt-2 mb-4">PUBBLICITA</h2>
                <p className="text-xs text-text_light_gray font-medium leading-tight text-center max-w-[260px]">Sblocca promozioni gratuite per ampliare la visibilità del tuo annuncio e raggiungere più utenti sulla piattaforma</p>
              </div>
              
              
            
          </div>
        </div>

        <div className="container mx-auto px-4 mb-10">
          <header className={`max-w-2xl text-start mb-5 lg:mb-16 `}>
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-text_light_gray uppercase">ABBONAMENTI</span>
              <h1 className="text-2xl md:text-[30px] font-extrabold">
                Una panoramica dei <br /> nostri <span className="text-primary">piani d’abbonamento</span>
              </h1>
            </div>
          </header>
        </div>
      </div>
      <PricingTable />
      <FeaturesSection />
      <FAQSection />
    </div>
  );
};

export default Subscription;
