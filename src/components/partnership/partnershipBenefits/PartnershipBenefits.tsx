import { SectionHeader1 } from "@/components/shared/sectionHeader/SectionHeader";
import check from "@/assets/partnership/check.svg";
import Image from "next/image";

const PartnershipBenefits = () => {
  const benefits = [
    {
      title: "NESSUN COSTO NASCOSTO",
      description:
        " Registrazione gratuita e senza impegni, per entrare subito a far parte della nostra piattaforma di noleggio veicoli senza rischi economici",
    },
    {
      title: "CLIENTI REALI",
      description:
        "Tratterai direttamente con clienti reali, senza l'intervento di intermediari o agenti, garantendo una comunicazione più diretta e trasparente",
    },
    {
      title: "AUMENTA LA TUA VISIBILITA ",
      description:
        "Inserisci i tuoi veicoli su Bittengo per raggiungere un ampio pubblico di clienti in cerca di noleggio. Aumenta la tua visibilità online e attrai più richieste grazie alla nostra piattaforma",
    },
    {
      title: "METTI IN RISALTO LA TUA FLOTTA",
      description:
        "Promuovi i tuoi veicoli con annunci in evidenza sulla homepage o in alto nell’elenco, aumentando la probabilità che i tuoi veicoli vengano visti e prenotati da più utenti",
    },
    {
      title: "ESPANDI IL TUO MERCATO",
      description:
        "Raggiungi nuovi clienti, dai turisti ai residenti, senza spese iniziali. Con Bittengo, puoi accedere a una rete di utenti in cerca di veicoli, ampliando il tuo mercato in modo semplice e conveniente",
    },
    {
      title: "ASSISTENZA CLIENTI 7/7",
      description:
        "La nostra assistenza clienti è disponibile 7 giorni su 7 per supportarti in ogni fase, dalla registrazione alla gestione delle prenotazioni. Siamo sempre a tua disposizione per risolvere qualsiasi problema e ottimizzare la tua esperienza di noleggio",
    },
  ];

  return (
    <div id="partnership-vantaggi" className="container text-black space-y-24">
      <SectionHeader1
        title="VANTAGGI"
        subtitle="Scopri i benefici esclusivi della piattaforma bittengo.org"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-5">
            <Image
              src={check}
              alt="check"
              width={100}
              height={100}
              className="w-6 h-6"
            />
            <div className="space-y-4">
              <h3 className="text-[18px] font-semibold">{benefit.title}</h3>
              <p className="text-sm font-medium text-text_light_gray">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnershipBenefits;
