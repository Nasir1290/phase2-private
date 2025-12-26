import React from "react";
import { SectionHeader3 } from "../shared/sectionHeader/SectionHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import quesIcon from "@/assets/faq.svg";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { SharedButton } from "../shared/sharedButton/SharedButton";

const DetailFaq = () => {
  const faqData = [
    {
      question: "Come funziona il servizio di riconsegna flessibile del veicolo?",
      answer:
        "Il nostro servizio di riconsegna flessibile ti permette di lasciare il veicolo in un luogo concordato senza doverlo riportare direttamente presso la nostra sede. Basta avvisarci in anticipo e organizzare la riconsegna, così da offrirti la massima comodità.",
    },
    {
      question: "Come posso modificare o annullare una prenotazione?",
      answer:
        "Puoi modificare o annullare la tua prenotazione contattando il nostro servizio clienti, disponibile 7 giorni su 7, che sarà lieto di assisterti.",
    },
    {
      question: "Posso prenotare un veicolo per un periodo breve o lungo?",
      answer:
        "Sì, è possibile prenotare un veicolo per periodi sia brevi che lunghi. Inoltre, offriamo tariffe personalizzate per noleggi a lungo termine, pensate per rispondere alle diverse esigenze dei nostri clienti.",
    },
    {
      question: "Posso aggiungere un autista al mio noleggio?",
      answer:
        "Sì, è possibile aggiungere un autista al tuo noleggio. Puoi richiedere questo servizio al momento della prenotazione, e provvederemo a fornirti tutte le informazioni necessarie.",
    },
    {
      question: "Come posso contattare il servizio clienti in caso di emergenza?",
      answer:
        "Puoi contattare il nostro servizio clienti in caso di emergenza chiamando il numero dedicato che trovi nel contratto di noleggio, inviando un'email o scrivendo su WhatsApp. Il nostro team è disponibile 7 giorni su 7 per assisterti tempestivamente.",
    },
    {
      question: "L’assicurazione è inclusa nel noleggio di un veicolo?",
      answer: "Sì, l’assicurazione casco totale è inclusa per tutto il periodo di noleggio.",
    },
  ];

  return (
    <div>
      <SectionHeader3 title="FAQ" />
      <Accordion type="single" collapsible className="space-y-5 mb-10">
        {faqData.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="flex items-center gap-6 text-start text-sm md:text-base font-medium p-4 rounded-lg  transition w-full shadow-lg">
              <Image src={quesIcon} alt="Question" width={35} height={35} />
              <span className="flex justify-between w-full font-bold">
                {item.question}
                <IoIosArrowDown className="text-primary text-xl font-bold" />
              </span>
            </AccordionTrigger>
            <AccordionContent className="p-3 rounded-b-lg text-sm  bg-section_bg/20 ">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Link href="/contattaci">
        <SharedButton text="Facci una domanda" cls="mt-6" />
      </Link>
    </div>
  );
};

export default DetailFaq;
