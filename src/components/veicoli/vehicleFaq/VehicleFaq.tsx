import { SectionHeader2 } from "@/components/shared/sectionHeader/SectionHeader";
import { SharedButton } from "@/components/shared/sharedButton/SharedButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import ques from "@/assets/partnership/faq.svg";

const VehicleFaq = () => {
  const faqData = [
    {
      question: "I prezzi indicati sono definitivi?",
      answer:
        "i prezzi indicati su Bittengo potrebbero subire variazioni a seconda delle politiche del noleggiatore e delle condizioni specifiche del veicolo. Ti consigliamo di contattare direttamente l’autonoleggio tramite la sezione “Contatta” nell’annuncio oppure compilando l’apposito format di contatto per verificare la disponibilità del veicolo.",
    },
    {
      question: "Come posso capire se un veicolo è vicino alla mia zona?",
      answer:
        "Puoi verificare la posizione del veicolo direttamente nell’annuncio. Lì troverai informazioni relative alla posizione del veicolo.",
    },
    {
      question: "Come vengono selezionati i veicoli presenti nell’elenco?",
      answer:
        "I veicoli presenti nell’elenco di Bittengo sono selezionati tra aziende e privati che mettono a disposizione i loro mezzi per il noleggio. Per garantire qualità e affidabilità, i veicoli devono avere un rating superiore alle 4.5 stelle su Google.",
    },
    {
      question: "Come funziona Bittengo?",
      answer:
        "Bittengo è una piattaforma di noleggio veicoli che mette in connessione aziende e privati che desiderano offrire i loro mezzi per il noleggio. Funziona come un marketplace in cui gli utenti possono cercare, confrontare e prenotare veicoli direttamente online. Bittengo semplifica il processo di noleggio, offrendo trasparenza e sicurezza, e garantisce che i veicoli disponibili siano selezionati tra quelli con un alto livello di qualità e affidabilità.",
    },
    {
      question: "Posso noleggiare un veicolo per piu giorni?",
      answer:
        "Sì, su Bittengo puoi noleggiare un veicolo per più giorni. Puoi specificare la durata del noleggio direttamente al momento della prenotazione, selezionando il numero di giorni desiderati.",
    },
  ];

  return (
    <div id="partnership-faq">
      {" "}
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-5 md:gap-10 2xl:gap-20">
          <div className="col-span-5 xl:col-span-2 max-w-[520px]">
            <SectionHeader2
              title="Ottieni maggiori informazioni"
              highlightedText="sui veicoli a noleggio"
              topText="DOMANDE"
            />
            <Link href="/contatti">
              <SharedButton text="Facci una domanda" />
            </Link>
          </div>
          {/* Faq  */}
          <div className="col-span-5 xl:col-span-2 w-full mx-auto ">
            <Accordion
              type="single"
              collapsible
              className="space-y-5 rounded-lg"
            >
              {faqData.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="flex items-center gap-6 text-start text-sm md:text-base font-semibold p-3 rounded-lg shadow-md transition w-full ">
                    <Image
                      src={ques}
                      alt="Question"
                      width={40}
                      height={40}
                      className="w-8 h-8"
                    />
                    <span className="flex justify-between items-center w-full">
                      {item.question}
                      <IoIosArrowDown className="text-2xl text-red" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="p-3 shadow-inner  mb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleFaq;
