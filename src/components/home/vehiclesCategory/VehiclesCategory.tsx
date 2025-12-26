"use client";

import { useState } from "react";
import { SectionHeader2 } from "@/components/shared/sectionHeader/SectionHeader";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Import default (normal) icons
import coupeB from "@/assets/home/vehicleCategory/coupe-b.svg";
import elettricaB from "@/assets/home/vehicleCategory/elettrica-b.svg";
import hatchbackB from "@/assets/home/vehicleCategory/hatchback-b.svg";
import lussoB from "@/assets/home/vehicleCategory/lusso-b.svg";
import stationwagonB from "@/assets/home/vehicleCategory/stationwagon-b.svg";
import minivanB from "@/assets/home/vehicleCategory/minivan-b.svg";
import sportivaB from "@/assets/home/vehicleCategory/sportiva-b.svg";
import monovolumeB from "@/assets/home/vehicleCategory/monovolume-b.svg";
import commercialiB from "@/assets/home/vehicleCategory/commerciali-b.svg";
import suvB from "@/assets/home/vehicleCategory/suv-b.svg";
import cabrioletB from "@/assets/home/vehicleCategory/cabriolet-b.svg";

// Import hover (red) icons
import coupeR from "@/assets/home/vehicleCategory/coupe-r.svg";
import elettricaR from "@/assets/home/vehicleCategory/elettrica-r.svg";
import hatchbackR from "@/assets/home/vehicleCategory/hatchback-r.svg";
import lussoR from "@/assets/home/vehicleCategory/lusso-r.svg";
import stationwagonR from "@/assets/home/vehicleCategory/stationwagon-r.svg";
import minivanR from "@/assets/home/vehicleCategory/minivan-r.svg";
import sportivaR from "@/assets/home/vehicleCategory/sportiva-r.svg";
import monovolumeR from "@/assets/home/vehicleCategory/monovolume-r.svg";
import commercialiR from "@/assets/home/vehicleCategory/commerciali-r.svg";
import suvR from "@/assets/home/vehicleCategory/suv-r.svg";
import cabrioletR from "@/assets/home/vehicleCategory/cabriolet-r.svg";
import { useGetAllCategoriesQuery } from "@/redux/api/carApi";
import Link from "next/link";

const VehiclesCategory = () => {
  const carCategories = [
    {
      id: 1,
      name: "Coupè",
      displayName: "Coupè",
      logo: coupeB,
      hoverLogo: coupeR,
    },

    {
      id: 2,
      name: "Elettrica",
      displayName: "Elettrica",
      logo: elettricaB,
      hoverLogo: elettricaR,
    },
    {
      id: 3,
      name: "Hatchback",
      displayName: "Hatchback",
      logo: hatchbackB,
      hoverLogo: hatchbackR,
    },
    {
      id: 4,
      name: "Lusso",
      displayName: "Lusso",
      logo: lussoB,
      hoverLogo: lussoR,
    },
    {
      id: 5,
      name: "Stationwagon",
      displayName: "Station wagon",
      logo: stationwagonB,
      hoverLogo: stationwagonR,
    },
    {
      id: 6,
      name: "Minivan",
      displayName: "Minivan",
      logo: minivanB,
      hoverLogo: minivanR,
    },
    {
      id: 7,
      name: "Sportiva",
      displayName: "Sportiva",
      logo: sportivaB,
      hoverLogo: sportivaR,
    },
    {
      id: 8,
      name: "Monovolume",
      displayName: "Monovolume",
      logo: monovolumeB,
      hoverLogo: monovolumeR,
    },
    {
      id: 9,
      name: "Commerciali",
      displayName: "Commerciali",
      logo: commercialiB,
      hoverLogo: commercialiR,
    },
    {
      id: 10,
      name: "Suv",
      displayName: "Suv",
      logo: suvB,
      hoverLogo: suvR,
    },
    {
      id: 11,
      name: "Cabriolet",
      displayName: "Cabriolet",
      logo: cabrioletB,
      hoverLogo: cabrioletR,
    },
  ];

  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { data: allCategories } = useGetAllCategoriesQuery({});
  const categories = allCategories?.data || [];

  // Filter carCategories to only include those present in the categories array from the database
  const filteredCategories = carCategories.filter((category) => categories.includes(category.name));

  return (
    <div className="container mx-auto">
      {/* Section Header */}
      <div className="max-w-[400px]">
        <SectionHeader2 topText="SCOPRI" title="Scegli tra le nostre" highlightedText="categorie" remainingText="di veicoli" />
      </div>

      {/* Navigation Buttons */}
      <div className="relative">
        {/* Left icon  */}
        <button
          className="hidden md:flex custom-prev absolute top-1/2 left-[-20px] lg:left-[-60px] z-10 transform -translate-y-1/2 text-4xl font-thin text-primary"
          aria-label="Previous"
        >
          <BsChevronLeft />
        </button>
        {/* Right icon  */}
        <button
          className="hidden md:flex custom-next absolute top-1/2 right-[-20px] lg:right-[-60px] z-10 transform -translate-y-1/2 text-4xl font-thin text-primary"
          aria-label="Next"
        >
          <BsChevronRight />
        </button>
        {/* Swiper Carousel */}
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
          slidesPerView={1}
          spaceBetween={3}
          breakpoints={{
            375: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            425: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 6,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 25,
            },
          }}
          className="mySwiper p-10"
        >
          {filteredCategories?.length === 0 ? (
            <div className="col-span-full text-center text-xl font-bold text-gray-500">No Category available in this section.</div>
          ) : (
            filteredCategories.map((category) => (
              <SwiperSlide
                key={category.id}
                className=" hover:shadow-md shadow shadow-black/20 hover:shadow-primary/10 rounded-2xl border/40 px-2 py-3 flex flex-col justify-center items-center gap-3 m-2 transition-all duration-300 max-w-[155px] sm:max-w-[180px] md:max-w-[178px] lg:max-w-[180px] xl:max-w-[158px] 2xl:max-w-[170px] bg-white"
                onMouseEnter={() => setHoveredItem(category?.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link href={`/veicoli?category=${category.name}`}>
                  <Image
                    src={hoveredItem === category.id ? category.hoverLogo : category.logo}
                    alt={category.name}
                    width={500}
                    height={500}
                    className="object-contain w-[50px] 2xl:w-[55px] h-6 mx-auto mb-2 transition-transform duration-300"
                  />
                  <p className="text-base font-medium text-center transition-colors text-black">{category.displayName}</p>
                </Link>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default VehiclesCategory;
