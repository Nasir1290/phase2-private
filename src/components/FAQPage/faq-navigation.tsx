import logo from "@/assets/Su Bittengo.svg";
import person from "@/assets/Il tuo account.svg";
import policy from "@/assets/Termini e policy.svg";
import security from "@/assets/Sicurezza.svg";
import Image from "next/image";

export default function FAQNavigation() {
  return (
    <div className=" py-16 px-8 md:mt-20">
      <div className="container mx-auto ">
        {/* Header */}

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mt-10 md:mt-0 mb-12 md:mb-28 space-y-10">
            <h2 className=" font-extrabold text-2xl md:text-[30px] uppercase">FAQ</h2>
            <p className="text-sm font-medium text-text_light_gray max-w-[1100px] ">
              {" "}
              Qui troverai le risposte alle domande più frequenti riguardanti il nostro servizio. Consulta le FAQ per ottenere informazioni
              dettagliate <br />
              su come funziona il nostro sistema, i metodi di promozione disponibili, le modalità di pagamento e altro ancora.
            </p>
          </div>
        </div>

        {/* FAQ Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mx-auto">
          {/* Su Bittengo */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            <div className="flex justify-between items-center gap-4 mb-6">
              <h3 className="text-xl font-semibold text-black">Su Bittengo</h3>
              <Image src={logo} alt="Bittengo Logo" width={48} height={48} className="rounded-full h-6 w-6" />
            </div>
            <div className="space-y-3">
              <a href="#" className="block  hover:text-primary transition-colors">
                Come funziona
              </a>
              <a href="#" className="block  hover:text-primary transition-colors">
                La nostra missione
              </a>
              <a href="#" className="block  hover:text-primary transition-colors">
                Partnership
              </a>
            </div>
          </div>

          {/* Il tuo account */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            <div className="flex justify-between items-center gap-4 mb-6">
              <h3 className="text-xl font-semibold text-black">Il tuo account</h3>
              <Image src={person} alt="Bittengo Logo" width={48} height={48} className="-full h-6 w-6" />
            </div>
            <div className="space-y-3">
              <a href="#" className="block  hover:text-primary transition-colors">
                Creazione del tuo account
              </a>
              <a href="#" className="block  hover:text-primary transition-colors">
                Amministrazione dell&#39;account
              </a>
              <a href="#" className="block  hover:text-primary transition-colors">
                Abbonamenti
              </a>
            </div>
          </div>

          {/* Sicurezza */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            <div className="flex justify-between  items-center gap-4 mb-6">
              <h3 className="text-xl font-semibold text-black">Sicurezza</h3>
              <Image src={security} alt="Bittengo Logo" width={48} height={48} className="-full h-6 w-6" />
            </div>
            <div className="space-y-3">
              <a href="#" className="block  hover:text-primary transition-colors">
                Consigli di sicurezza
              </a>
            </div>
          </div>
          {/* Termini e policy */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 h-[232px]">
            <div className="flex justify-between  items-center gap-4 mb-6">
              <h3 className="text-xl font-semibold text-black">Termini e policy</h3>
              <Image src={policy} alt="Bittengo Logo" width={48} height={48} className="-full h-6 w-6" />
            </div>
            <div className="space-y-3">
              <a href="#" className="block  hover:text-primary transition-colors">
                Termini e condizioni
              </a>
              <a href="#" className="block  hover:text-primary transition-colors">
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
