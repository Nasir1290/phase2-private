import Image, { StaticImageData } from "next/image";
import team1 from "@/assets/benefici/tiago.svg";
import team2 from "@/assets/benefici/giulia.svg";
import team3 from "@/assets/benefici/leonardo.svg";

interface TeamMember {
  name: string;
  image: string | StaticImageData;
}

const teamMembers: TeamMember[] = [
  {
    name: "Tiago",
    image: team1,
  },
  {
    name: "Giulia",
    image: team2,
  },
  {
    name: "Leonardo",
    image: team3,
  },
];

export default function Team() {
  return (
    <div>
      <div className={`flex flex-col lg:flex-row-reverse items-center gap-14`}>
        <div className="w-full lg:w-1/2 space-y-10">
          <div className="max-w-[500px]">
            <header className="max-w-2xl text-start mb-5 lg:mb-16">
              <div className="flex flex-col gap-4">
                <span className="text-sm font-medium text-text_light_gray uppercase">CHI SIAMO</span>

                <h1 className="text-2xl md:text-[30px] font-extrabold">
                  Team giovane pronto ad <br /> offrirvi <span className="text-primary">un noleggio innovativo</span>
                </h1>
              </div>
            </header>
          </div>
          <p className="text-sm md:text-[15px] font-normal text-text_light_gray ">
            Il nostro team giovane e dinamico è il cuore pulsante di Bittengo, sempre all’avanguardia sulle ultime tendenze del noleggio veicoli. Con
            una visione fresca e innovativa, ci impegniamo a rendere il tuo noleggio un&apos;esperienza semplice, conveniente e sicura. Offriamo
            soluzioni moderne che soddisfano le tue esigenze, garantendo un servizio rapido e trasparente. Attenti alla qualità, offriamo supporto
            clienti disponibile 7 giorni su 7. Scegli Bittengo per un noleggio che unisce tecnologia avanzata e un’esperienza personalizzata, rendendo
            ogni viaggio senza stress e al passo con i tempi.
          </p>
        </div>
        <div className="w-full lg:w-1/2 mx-auto">
          <div className="flex justify-center items-center gap-5 lg:relative w-full">
            {/* Central Member - Tiago */}
            <div className=" lg:relative text-center lg:-top-20 lg:mr-20">
              <div className="relative w-full ">
                <Image
                  src={teamMembers[0].image}
                  alt={teamMembers[0].name}
                  width={1000}
                  height={1000}
                  className="w-32 lg:w-[135px] object-cover rounded-full border-1 border-footer_bg/30"
                />
              </div>
              <span className="block mt-2 text-base font-semibold">{teamMembers[0].name}</span>
            </div>

            {/* Right Member - Giulia */}
            <div className=" lg:absolute lg:top-44 lg:right-5 xl:top-16 xl:right-16 2xl:top-28 2xl:right-24 text-center">
              <div className="relative w-full aspect-square">
                <Image
                  src={teamMembers[1].image}
                  alt={teamMembers[1].name}
                  width={1000}
                  height={1000}
                  className="w-32 lg:w-[145px] object-cover rounded-full border-1 border-footer_bg/30"
                />
              </div>
              <span className="block mt-2 text-base font-semibold">{teamMembers[1].name}</span>
            </div>

            {/* Left/Bottom Member - Leonardo */}
            <div className=" lg:absolute lg:top-56 lg:left-4 xl:top-36 xl:left-0 2xl:top-40 2xl:left-5 text-center">
              <div className="relative">
                <Image
                  src={teamMembers[2].image}
                  alt={teamMembers[2].name}
                  width={1000}
                  height={1000}
                  className="w-32 lg:w-[160px] object-cover rounded-full border-1 border-footer_bg/30"
                />
              </div>
              <span className="block mt-2 text-base font-semibold">{teamMembers[2].name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
