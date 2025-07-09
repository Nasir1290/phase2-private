import i11 from "@/assets/benefici/mission.svg";
import i12 from "@/assets/benefici/vision.svg";
import { SectionHeader1 } from "@/components/shared/sectionHeader/SectionHeader";
import Image from "next/image";

const Ambition = () => {
  const cardData = [
    {
      image: i11,
      title: "MISSIONE",
      description:
        "La missione di Bittengo è rendere il noleggio veicoli semplice, veloce e sicuro, garantendo qualità e accessibilità per tutti.",
    },
    {
      image: i12,
      title: "VISIONE",
      description:
        "La visione di Bittengo è offrire un servizio di noleggio veicoli innovativo e accessibile, attraverso una piattaforma sicura e intuitiva che semplifica ogni esigenza di mobilità.",
    },
  ];

  return (
    <div>
      <SectionHeader1
        title="AMBIZIONE"
        subtitle="Puntiamo su innovazione, qualità e un servizio che anticipi le esigenze dei nostri clienti."
      />

      <div className=" flex flex-col items-center justify-center md:flex-row gap-10 md:gap-5 xl:gap-48 pt-20">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`border shadow-lg hover:shadow-red/10 hover:shadow-lg rounded-2xl p-6 md:px-5 lg:px-8 xl:px-5 2xl:px-6 flex flex-col items-center justify-evenly w-[350px] sm:w-[390px] md:w-[350px] lg:w-[400px] xl:w-[320px] 2xl:w-[360px] h-[240px]`}
          >
            <div className="w-12 h-12">
              <Image
                src={card.image}
                alt="icon"
                width={900}
                height={900}
                className="w-full h-full"
              />
            </div>

            <h2 className="text-lg md:text-base lg:text-lg  text-center font-semibold">
              {card.title}
            </h2>
            {card.description && (
              <p className="h-16 text-text_light_gray font-normal text-center text-[13px]">
                {card.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ambition;
