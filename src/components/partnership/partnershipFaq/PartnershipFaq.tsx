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

const PartnershipFaq = () => {
  const faqData = [
    {
      question: "Perché dovrei registrare la mia flotta su Bittengo?",
      answer:
        "Registrare la tua flotta su Bittengo ti permette di ampliare la visibilità dei tuoi veicoli, braggiungere nuovi clienti e massimizzare le opportunità di noleggio. Bittengo fornisce una piattaforma semplice e accessibile, dove i veicoli con un rating superiore a 4.5 stelle su Google vengono selezionati e promossi, aumentando la tua visibilità e la fiducia nei tuoi mezzi. Inoltre, non dovrai gestire direttamente prenotazioni o pagamenti, ma Bittengo ti offre un sistema integrato per ricevere richieste e contattare i noleggiatori in modo semplice e veloce.",
    },
    {
      question: "Quanto costa registrare i miei veicoli su Bittengo?",
      answer:
        "Registrare i tuoi veicoli su Bittengo è completamente gratuito. Non ci sono costi fissi o abbonamenti. Puoi inserire i tuoi mezzi e ricevere richieste di noleggio senza alcuna spesa iniziale. Bittengo ti offre una vetrina per promuovere i tuoi veicoli e collegarti direttamente con i noleggiatori interessati.",
    },
    {
      question: "Come riceverò le richieste di noleggio?",
      answer:
        "Riceverai le richieste di noleggio direttamente tramite email, WhatsApp o telefonicamente, a seconda delle preferenze selezionate dalla persona che desidera noleggiare il tuo veicolo. Puoi gestire le comunicazioni e le prenotazioni direttamente tramite i canali indicati.",
    },
    {
      question: "Posso mettere in evidenza i miei annunci?",
      answer:
        "Attualmente, non è possibile evidenziare i tuoi annunci su Bittengo. Tuttavia, questa funzione sarà disponibile prossimamente per aumentare la visibilità e l’attrattiva dei tuoi veicoli.",
    },
    {
      question: "Bittengo trattiene commissioni sulle prenotazioni?",
      answer:
        "Bittengo non trattiene alcuna commissione sulle prenotazioni, garantendo così un’esperienza trasparente e senza costi aggiuntivi per gli autonoleggi.",
    },
  ];

  return (
    <div id="partnership-faq">
      {" "}
      <div className="container mx-auto ">
        <div className="grid grid-cols-4 gap-5 md:gap-10 2xl:gap-20">
          <div className="col-span-5 xl:col-span-2">
            <SectionHeader2
              title="Ottieni maggiori informazioni"
              highlightedText="sulle partnership"
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

export default PartnershipFaq;
