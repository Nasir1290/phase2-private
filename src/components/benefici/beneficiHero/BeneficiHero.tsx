"use client";

import easyBooking from "@/assets/benefici/easy-booking.svg";
import supporto from "@/assets/benefici/supporto-clienti.svg";
import prezzi from "@/assets/benefici/prezzi-migliori.svg";
import affidabili from "@/assets/benefici/affidabili.svg";
// import Card from "../shared/card/Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { SectionHeader1 } from "@/components/shared/sectionHeader/SectionHeader";
import SwiperCard from "@/components/allCards/SwiperCard";

const cardData = [
  {
    image: easyBooking,
    title: "PRENOTAZIONE FACILE",
    description:
      "Scegli il veicolo, conferma e parti in pochi click Un'esperienza di noleggio veloce e senza stress",
  },
  {
    image: supporto,
    title: "SUPPORTO CLIENTI 7/7",
    description:
      "Il nostro supporto clienti è attivo 7 giorni su 7, pronto a rispondere ad ogni tua esigenza",
  },
  {
    image: prezzi,
    title: "PREZZI MIGLIORI ",
    description:
      "Garantiamo tariffe competitive e convenienti, assicurandoti il miglior rapporto qualità-prezzo per ogni noleggio.",
  },
  {
    image: affidabili,
    title: "AFFIDABILI",
    description:
      "Accettiamo solo aziende con un rating superiore a 4.5 stelle su Google, garantendo qualità e affidabilità.",
  },
];

const BeneficiHero = () => {
  return (
    <div className="mx-auto">
      <SectionHeader1
        title="BENEFICI"
        subtitle="Vantaggi esclusivi per un’esperienza di noleggio premium con Bittengo"
      />

      <section className="mx-auto">
        <div className="flex items-center justify-center">
          <Swiper
            loop={true}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            breakpoints={{
              424: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 1.8,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              1280: {
                slidesPerView: 2.5,
                spaceBetween: 5,
              },
              1404: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
            }}
            className="mySwiper h-[280px] mx-auto"
          >
            {cardData.map((card, index) => (
              <SwiperSlide key={index} className="mx-auto p-2">
                <SwiperCard
                  key={index}
                  image={card.image}
                  title={card.title}
                  description={card.description}
                  className=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default BeneficiHero;
