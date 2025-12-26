"use client";

import Image from "next/image";
import icon1 from "@/assets/home/supporto-clienti.svg";
import icon2 from "@/assets/home/easy-booking.svg";
import icon3 from "@/assets/home/prezzi-eccellenti.svg";
import icon4 from "@/assets/home/professional-staff.svg";
import icon5 from "@/assets/home/affidabili.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { SectionHeader2 } from "@/components/shared/sectionHeader/SectionHeader";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

const features = [
  {
    src: icon1,
    title: "Supporto clienti",
    description: "Siamo al tuo servizio per risolvere ogni tua esigenza con professionalità, cortesia e massima attenzione al cliente.",
  },
  {
    src: icon2,
    title: "Prenotazione facile",
    description: "Scegli il veicolo, conferma e parti in pochi click. Un noleggio comodo e senza complicazioni.",
  },
  {
    src: icon3,
    title: "Prezzi eccellenti",
    description: "Garantiamo tariffe competitive e accessibili, per offrirti il miglior rapporto qualità-prezzo.",
  },
  {
    src: icon4,
    title: "Staff professionale",
    description: "ll nostro team di professionisti esperti è pronto a consigliarti il veicolo più adatto alle tue esigenze.",
  },
  {
    src: icon5,
    title: "Affidabili",
    description: "Accettiamo solo aziende con un rating superiore a 4.5 stelle su Google, garantendo qualità e affidabilità.",
  },
];

const WeOffer = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between ">
        <div className="max-w-[450px]">
          <SectionHeader2 topText="PERCHE SCEGLIERCI" title="Offriamo le" highlightedText="migliori esperienze" remainingText="di noleggio" />
        </div>

        <Link
          href="/benefici"
          className="hidden md:flex text-sm font-semibold text-primary uppercase  items-center gap-1 hover:bg-primary/5 px-3 py-2 rounded-lg"
        >
          TUTTI I BENEFICI
          <MdArrowForwardIos />
        </Link>
      </div>
      <section className="pt-12">
        <div className="mx-auto ">
          <Swiper
            loop={true}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            slidesPerView={1.2}
            spaceBetween={5}
            breakpoints={{
              424: {
                slidesPerView: 1.3,
                spaceBetween: 10,
              },
              620: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 26,
              },
            }}
            className="mySwiper min-h-[300px]"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index} className="rounded-2xl">
                <div className="container mx-auto flex flex-col items-start gap-5 border p-8 md:p-6 lg:p-7 xl:px-7 rounded-2xl h-[245px]  w-[280px] sm:w-full shadow-lg">
                  <div className="flex items-center mb-4 gap-4">
                    <Image src={feature.src} alt="feature icon" width={60} height={60} className="w-8 h-8" />
                    <h3 className="text-[17px] font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-[14px]">{feature.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <Link
        href="/benefici"
        className="text-sm font-semibold text-primary uppercase flex md:hidden mx-auto  text-center w-full items-center justify-center gap-10 shadow-md px-16 py-6 rounded-lg h-8"
      >
        TUTTI I BENEFICI
        <MdArrowForwardIos />
      </Link>
    </div>
  );
};

export default WeOffer;
