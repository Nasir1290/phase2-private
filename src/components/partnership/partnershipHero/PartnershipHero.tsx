"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import banner from "@/assets/partnership/partnership-hero.svg";
import check from "@/assets/partnership/right.svg";
import registrationKey from "@/assets/partnership/registrazione-gratuita.svg";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
const PartnershipHero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const helpSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToHelpSection = () => {
    const navbarHeight = 20;

    if (helpSectionRef.current) {
      window.scrollTo({
        top: helpSectionRef.current.offsetTop - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (window.location.hash === "#help-section") {
      scrollToHelpSection();
    }
  }, []);

  return (
    <div className="w-full">
      {/* Banner Image */}
      <div className="relative">
        <Image
          src={banner}
          alt="Banner Image"
          width={2000}
          height={740}
          className="w-full min-h-[500px] md:h-[800px] xl:h-[700px] object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 md:bg-black/20 2xl:bg-black/10" />
        <div className="container mx-auto absolute inset-0 flex items-center ">
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 justify-items-end gap-8">
            {/* Header text  */}
            <header className="mt-2 xl:mt-10 col-span-1 xl:col-span-1 2xl:col-span-1 text-start mb-8 lg:mb-0">
              <div className="flex flex-col gap-4">
                <span className="text-sm font-medium text-white uppercase">
                  NETWORK
                </span>
                <h1 className=" text-3xl md:text-[30px] font-extrabold text-white">
                  Registra <br />
                  <span className="text-red">
                    la tua flotta di veicoli
                  </span>{" "}
                  <br />
                  su bittengo.org
                </h1>
                <p className="mt-4 lg:mt-6 text-sm text-white max-w-2xl">
                  Unisciti a Bittengo.org, il marketplace innovativo che ti
                  consente di offrire i tuoi veicoli per il noleggio a una vasta
                  rete di clienti. Registrando la tua flotta, potrai aumentare
                  la visibilità dei tuoi veicoli e sfruttare le potenzialità del
                  nostro network per ottenere risultati concreti. Con la nostra
                  piattaforma sicura e intuitiva, potrai espandere la tua base
                  di clienti, raggiungendo non solo privati, ma anche turisti e
                  cittadini in cerca di veicoli pratici e convenienti
                </p>
              </div>
            </header>
            {/* Registration section */}
            <div className="col-span-1 bg-section_bg xl:bg-section_bg/85 shadow w-full xl:max-w-md mx-auto lg:mx-0 rounded-2xl px-10 py-6 hidden md:flex flex-col items-center">
              <div className="flex items-center justify-between mb-6 w-full ">
                <h2 className="text-base lg:text-lg 2xl:text-2xl font-bold">
                  Registrazione Gratuita
                </h2>
                <Image
                  src={registrationKey || "/placeholder.svg"}
                  alt="check"
                  width={40}
                  height={40}
                  className="w-8 h-8 2xl:w-10 2xl:h-10"
                />
              </div>
              <div className="space-y-4 2xl:space-y-5">
                {[
                  "Gestisci le tue prenotazioni in completa autonomia",
                  "Assistenza dedicata in ogni fase",
                  "Nessuna commissione nascosta",
                  "Espandi la tua visibilità e accedi a una rete di clienti in cerca di veicoli per ogni esigenza",
                ].map((text, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <Image
                      src={check || "/placeholder.svg"}
                      alt="check"
                      width={20}
                      height={20}
                      className="w-4 h-4 flex-shrink-0"
                    />
                    <p className="text-sm">{text}</p>
                  </div>
                ))}
              </div>
              <Separator className="bg-gray-500/50 my-6" />
              <div className="mx-auto">
                <Link href="/register">
                  <button
                    // onClick={toggleModal}
                    className="bg-red text-white px-6 py-2.5 rounded-lg text-[15px] font-medium w-72"
                  >
                    INIZIA ORA
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden col-span-1 bg-gray-200/70 xl:bg-section_bg/85 shadow w-full  mx-auto lg:mx-0 rounded-2xl p-4 flex flex-col items-center">
        {/* Animated Details Section */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 2xl:space-y-5 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6 w-full">
            <h2 className="text-base lg:text-lg 2xl:text-2xl font-bold">
              Registrazione Gratuita
            </h2>
            <Image
              src={registrationKey}
              alt="check"
              width={40}
              height={40}
              className="w-8 h-8 2xl:w-10 2xl:h-10"
            />
          </div>

          {[
            "Gestisci le tue prenotazioni in completa autonomia",
            "Assistenza dedicata in ogni fase",
            "Nessuna commissione nascosta",
            "Espandi la tua visibilità e accedi a una rete di clienti in cerca di veicoli per ogni esigenza",
          ].map((text, index) => (
            <div key={index} className="flex items-start gap-6">
              <Image
                src={check}
                alt="check"
                width={20}
                height={20}
                className="w-4 h-4 flex-shrink-0"
              />
              <p className="text-sm">{text}</p>
            </div>
          ))}
        </motion.div>

        {/* Button to toggle details */}
        <div className="mt-5 bg-white mx-auto flex flex-col items-center text-text_light_gray font-normal justify-center gap-3 p-4 rounded-lg">
          <button onClick={toggleDetails} className="flex items-center gap-1">
            Scopri di più <MdKeyboardDoubleArrowUp />
          </button>
          <Link
            href="/register"
            className="bg-red text-white px-6 py-2.5 rounded-lg text-[15px] font-medium w-80 flex items-center justify-center"
          >
            INIZIA ORA
          </Link>
        </div>
      </div>

      {/* Partnership Nav */}
      <div className="hidden md:block bg-white px-16 xl:px-4 py-4 sm:py-6 shadow-lg ">
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between gap-4">
          {["Vantaggi", "Clientela", "Termini e condizioni", "FAQ"].map(
            (item, index) => (
              <Link
                key={index}
                href={`#partnership-${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="font-medium underline hover:text-red text-sm sm:text-base"
              >
                {item}
              </Link>
            )
          )}
        </div>
      </div>
      <div className="md:hidden mt-10 xl:mt-0 bg-white px-4 py-4 sm:py-6 shadow-lg ">
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between gap-4">
          {["Vantaggi", "Clientela", "T&C", "FAQ"].map((item, index) => (
            <Link
              key={index}
              href={`#partnership-${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-medium underline hover:text-red text-sm sm:text-base"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* {isModalOpen && <CompanyRegistration toggleModal={toggleModal} />} */}
    </div>
  );
};

export default PartnershipHero;
