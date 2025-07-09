import { SectionHeader2 } from "@/components/shared/sectionHeader/SectionHeader";
import { SharedButton } from "@/components/shared/sharedButton/SharedButton";
import Link from "next/link";

const RentSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Scegli il tuo veicolo",
      description:
        "Esplora il nostro marketplace per trovare l'auto ideale, con una selezione adatta a ogni esigenza, dai veicoli per la città a quelli per i viaggi più lunghi",
    },
    {
      number: 2,
      title: "Invia la tua richiesta",
      description:
        "Dopo aver selezionato il veicolo, compila la tua richiesta di noleggio direttamente sul nostro sito. Se hai bisogno di opzioni extra, potrai comunicarlo facilmente tramite l’apposito format di contatto",
    },
    {
      number: 3,
      title: "Ritira il tuo veicolo",
      description:
        "Il veicolo sarà disponibile presso il punto di ritiro predefinito dall’azienda di autonoleggio. Puoi ritirarlo facilmente oppure, se l’opzione è disponibile, richiedere la consegna a domicilio direttamente al noleggiatore",
    },
  ];

  return (
    <div className="container mx-auto">
      <div className=" grid grid-cols-12 gap-16 items-center justify-between ">
        {/* Left Section */}
        <div className="col-span-12 lg:col-span-6 space-y-8 max-w-[330px] ">
          <SectionHeader2
            topText="COME FUNZIONA"
            title="Noleggia un veicolo in"
            highlightedText="soli 3 steps"
            className="mb-8"
          />
          <Link href="/veicoli">
            <SharedButton text="Noleggia un veicolo" cls="mx-auto" />
          </Link>{" "}
        </div>

        {/* Right Section */}
        <div className="col-span-6">
          <div className="relative">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex items-start mb-6 lg:mb-8 last:mb-0 "
              >
                {/* Number with Circle */}
                <div className="flex flex-col items-center mr-6 relative">
                  <div className="flex items-center justify-center w-14 h-14 text-white bg-red rounded-full font-bold text-3xl">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-full w-0.5 h-28 ${
                        index === steps.length - 2
                          ? "border-l-2 border-red border-dashed"
                          : "bg-red"
                      }`}
                      style={
                        index === steps.length - 2
                          ? {
                              borderStyle: "dashed",
                              borderWidth: "0 0 0 2px",
                              borderColor: "red",
                              borderSpacing: "20px",
                              height: "8rem",
                            }
                          : {}
                      }
                    ></div>
                  )}
                </div>

                {/* Text Content */}
                <div className="">
                  <span className="text-lg font-bold border-b-2 border-red mb-4">
                    {step.title}
                  </span>
                  <p className="text-text_dark_gray text-sm font-[440] mt-4">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentSteps;
