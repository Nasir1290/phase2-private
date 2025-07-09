import { SectionHeader1 } from "../shared/sectionHeader/SectionHeader";
import ContactForm from "./contactForm/ContactForm";
import ContactDetails from "./contactDetails/ContactDetails";
import { Separator } from "@/components/ui/separator";

const ContattiPage = () => {
  return (
    <div className="container mx-auto py-10 xl:py-16">
      <SectionHeader1
        title="CONTATTACI"
        subtitle="Siamo pronti a fornirti tutte le informazioni di cui hai bisogno, contattaci tramite i nostri canali e ricevi assistenza immediata per il tuo noleggio"
      />

      <div className="flex flex-col justify-center mx-auto gap-10 lg:gap-10 xl:px-12">
        <div className="mx-auto w-full">
          <ContactForm />
        </div>
        <Separator className="my-4" />
        <ContactDetails />
      </div>
    </div>
  );
};

export default ContattiPage;
