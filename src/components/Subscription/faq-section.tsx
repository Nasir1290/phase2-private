"use client";

import quesIcon from "@/assets/home/faq.svg";
import { SectionHeader2 } from "@/components/shared/sectionHeader/SectionHeader";
import { SharedButton } from "@/components/shared/sharedButton/SharedButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

const faqItems = [
  {
    question: "Perché dovrei collaborare con Bittengo?",
    answer: "Collaborare con Bittengo ti offre accesso a una vasta rete di clienti e strumenti avanzati per la gestione dei veicoli.",
  },
  {
    question: "Posso promuovere i miei veicoli su Bittengo?",
    answer: "Sì, puoi promuovere i tuoi veicoli utilizzando i nostri piani di abbonamento che offrono diverse opzioni di visibilità.",
  },
  {
    question: "Quanto costa utilizzare la piattaforma Bittengo?",
    answer: "Offriamo diversi piani di abbonamento a partire da 0 CHF per il piano Standard fino a 119 CHF per il piano Business.",
  },
  {
    question: "Che tipo di supporto fornisce Bittengo ai partner?",
    answer: "Forniamo supporto clienti dedicato, strumenti di marketing e assistenza tecnica per tutti i nostri partner.",
  },
  {
    question: "Ci sono costi per diventare partner di Bittengo?",
    answer: "No, diventare partner di Bittengo è gratuito. Paghi solo per i servizi aggiuntivi che scegli di utilizzare.",
  },
];

export default function FAQSection() {
  return (
    <div className="bg-white py-16 px-4">
      {/* ------ FAQ ------ */}
      <div id="faq" className="max-w-[1248px] mx-auto">
        <div className="grid grid-cols-5 gap-5 md:gap-10 2xl:gap-32">
          <div className="col-span-5 xl:col-span-2 space-y-6">
            <div>
              <SectionHeader2 title="Ottieni maggiori informazioni" highlightedText="sulle partnership" topText="DOMANDE" />
            </div>
            <Link href="/contatti">
              <SharedButton text="Facci una domanda" />
            </Link>
          </div>

          {/* Faq  */}
          <div className="col-span-5 xl:col-span-3 w-full mx-auto ">
            <Accordion type="single" collapsible className="space-y-5 rounded-xl">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="flex items-center gap-6 text-start text-sm md:text-base font-semibold p-3 rounded-lg shadow-md transition w-full ">
                    <Image src={quesIcon} alt="Question" width={40} height={40} className="w-7 h-7" />
                    <span className="flex justify-between items-center w-full">
                      {item.question}
                      <IoIosArrowDown className="text-2xl text-primary" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="p-3 shadow-inner mb-4">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
