import quesIcon from "@/assets/home/faq.svg";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { SectionHeader2 } from "@/components/shared/sectionHeader/SectionHeader";
import { SharedButton } from "@/components/shared/sharedButton/SharedButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HomeFaq = () => {
  const faqData = [
    {
      question: "Come funziona Bittengo?",
      answer:
        "Bittengo è un marketplace che ti permette di noleggiare veicoli in pochi click. Cerca il veicolo che ti serve, filtra per tipo, prezzo o località, e invia la tua richiesta di noleggio. L’azienda proprietaria del veicolo riceverà la tua richiesta e ti risponderà tramite email, WhatsApp o telefonata.",
    },
    {
      question:
        "Chi mi contatterà dopo aver inviato una richiesta di noleggio?",
      answer:
        "Dopo aver inviato la tua richiesta, sarai contattato direttamente dall’azienda proprietaria del veicolo tramite email, WhatsApp o telefonata, per definire i dettagli e completare la prenotazione.",
    },
    {
      question:
        "Come posso contattare l’autonoleggio per ulteriori informazioni?",
      answer:
        "Puoi contattare l’autonoleggio compilando l’apposito form di contatto o cliccando sul pulsante 'Contatta' all’interno dell’annuncio.",
    },
    {
      question: "Bittengo gestisce i pagamenti e le prenotazioni?",
      answer:
        "No, Bittengo non gestisce i pagamenti né le prenotazioni. Il nostro ruolo è offrire una piattaforma che metta in contatto gli utenti con le aziende di autonoleggio. Dopo aver inviato una richiesta, sarà l'azienda a gestire direttamente ogni aspetto della prenotazione e del pagamento.",
    },
    {
      question: "Posso noleggiare un veicolo per più giorni?",
      answer:
        "Sì, puoi noleggiare un veicolo per più giorni. Nella piattaforma Bittengo, puoi selezionare la durata del noleggio in base alle tue esigenze. Gli autonoleggi presenti su Bittengo gestiscono direttamente le prenotazioni e le tariffe giornaliere o settimanali.",
    },
  ];

  return (
    <div id="faq" className="container mx-auto">
      <div className="grid grid-cols-5 gap-5 md:gap-10 2xl:gap-32">
        <div className="col-span-5 xl:col-span-2 space-y-6">
          <div>
            <SectionHeader2
              title="Ottieni maggiori informazioni"
              highlightedText="su Bittengo.org"
              topText="DOMANDE"
            />
          </div>
          <Link href="/contatti">
            <SharedButton text="Facci una domanda" />
          </Link>
        </div>

        {/* Faq  */}
        <div className="col-span-5 xl:col-span-3 w-full mx-auto ">
          <Accordion type="single" collapsible className="space-y-5 rounded-xl">
            {faqData.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="flex items-center gap-6 text-start text-sm md:text-base font-semibold p-3 rounded-lg shadow-md transition w-full ">
                  <Image
                    src={quesIcon}
                    alt="Question"
                    width={40}
                    height={40}
                    className="w-7 h-7"
                  />
                  <span className="flex justify-between items-center w-full">
                    {item.question}
                    <IoIosArrowDown className="text-2xl text-red" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="p-3 shadow-inner mb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default HomeFaq;
