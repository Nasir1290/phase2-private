"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import img1 from "@/assets/home/googlereview/nicole-recine.png";
import img2 from "@/assets/home/googlereview/giovanni-giovannoli.png";
import StarRating from "@/components/shared/starRating/StarRating";

// interface Review {
//   id: number;
//   name: string;
//   date: string;
//   rating: number;
//   review: React.ReactNode;
//   avatar?: string | StaticImageData;
// }

// Review data
const reviews = [
  {
    id: 1,
    name: "Nicole Recine",
    date: "a month ago",
    rating: 5,
    review:
      "Io e mia mamma ci siamo  trovate davvero benissimo, molto professionali. Prezzo ottimo. D`ora in poi ci affideremo a voi! Grazie mille",
    avatar: img1,
  },
  {
    id: 2,
    name: "Gabriele Demircan",
    date: "2 months ago",
    rating: 4,
    review:
      "Furgone tenuto bene, consegna e riconsegna chiavi facile e comoda. Cinghie disponibili per legare le cose e...",
    avatar: "",
  },
  {
    id: 3,
    name: "Demon Mal",
    date: "2 months ago",
    rating: 5,
    review:
      "Personale gentile e comprensivi, prezzi adatti in base ad ogni esigenza. Consiglio per privati o ditte.",
    avatar: "",
  },
  {
    id: 4,
    name: "Lucia",
    date: "4 months ago",
    rating: 5,
    review:
      "Servizio completo. Ragazzi davvero super gentili. Supporto molto accogliente Consiglio!!",
    avatar: "",
  },
  {
    id: 5,
    name: "Samuel John",
    date: "a month ago",
    rating: 5,
    review:
      "Noleggio furgone ha funzionato benissimo. Tutto ben organizzato. Prezzo top 👍🏽 …",
    avatar: "",
  },
  {
    id: 6,
    name: "roza mirkova",
    date: "4 months ago",
    rating: 5,
    review: "Lo consiglio a tutti, servizio completo. Ragazzi super gentili.",
    avatar: "",
  },
  {
    id: 7,
    name: "Sergio Karatepe",
    date: "3 months ago",
    rating: 5,
    review:
      "Esperienza positivissima, titolari gentilissimi e molto disponibili Consigliatissimo",
    avatar: "",
  },
  {
    id: 8,
    name: "Sonja Muscionico",
    date: "4 months ago",
    rating: 5,
    review: "Servizio perfetto.  Ragazzi gentilissimi.  Consiglio a tutti.",
    avatar: "",
  },
  {
    id: 9,
    name: "Alessia Doria",
    date: "4 months ago",
    rating: 5,
    review: "Supporto clienti super cordiale e simpatica",
    avatar: "",
  },
  {
    id: 10,
    name: "Mariana Bogdan",
    date: "4 months ago",
    rating: 5,
    review: "Bravissimi!",
    avatar: "",
  },
  {
    id: 11,
    name: "Tiago Silva",
    date: "3 weeks ago",
    rating: 5,
    review: "",
    avatar: "",
  },
  {
    id: 12,
    name: "Leonardo Pires",
    date: "3 weeks ago",
    rating: 5,
    review: "",
    avatar: "",
  },
  {
    id: 13,
    name: "Данил Николенко",
    date: "3 weeks ago",
    rating: 5,
    review: "",
    avatar: "",
  },
  {
    id: 14,
    name: "Giovanni Giovannoli",
    date: "a month ago",
    rating: 5,
    review: "",
    avatar: img2,
  },
  {
    id: 15,
    name: "Framiry Commigigliotti",
    date: "2 months ago",
    rating: 5,
    review: "",
    avatar: "",
  },
  {
    id: 16,
    name: "eleonora giannini",
    date: "3 months ago",
    rating: 5,
    review: "",
    avatar: "",
  },
];

export default function ReviewCarousel() {
  const getInitials = (name: string) => {
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
    return initials;
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="my-10 md:mx-auto md:px-4 relative">
      {/* Custom Navigation Buttons */}
      <button
        className="hidden md:flex custom-prev absolute top-1/2 left-[-28px] z-10 transform -translate-y-1/2 text-4xl font-thin text-red"
        aria-label="Previous"
      >
        <BsChevronLeft />
      </button>
      <button
        className="hidden md:flex custom-next absolute top-1/2 right-[-28px] z-10 transform -translate-y-1/2 text-4xl font-thin text-red"
        aria-label="Next"
      >
        <BsChevronRight />
      </button>

      <Swiper
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, Autoplay]}
        slidesPerView={1.5}
        spaceBetween={20}
        breakpoints={{
          425: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="mySwiper w-[360px] sm:w-[380px]  md:w-full "
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="h-52">
            <div className="bg-gray-100 p-6 space-y-4 h-60 rounded-md">
              <div className="h-48 ">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start justify-between gap-3">
                    {review.avatar ? (
                      <Image
                        src={review.avatar}
                        alt={`${review.name}'s Avatar`}
                        className="rounded-full h-7 w-7"
                      />
                    ) : (
                      <div
                        style={{
                          backgroundColor: getRandomColor(),
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="rounded-full h-7 w-7 text-white font-bold text-sm"
                      >
                        {getInitials(review.name)}{" "}
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-bold">{review.name}</h3>
                      <p className="text-sm text-text_light_gray font-medium">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <FcGoogle className="text-2xl" />
                </div>
                {/* Rating */}
                <StarRating ratingValue={4.9} totalRatings={16} />
                {/* Review Text */}
                <p className="text-[13px] mt-2">{review.review}</p>

                {/* Link */}
                <a
                  href="https://g.page/r/CSE8B-rI3SAyEBM/review"
                  className="text-text_light_gray text-[13px] font-semibold"
                >
                  Leggi di più
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
