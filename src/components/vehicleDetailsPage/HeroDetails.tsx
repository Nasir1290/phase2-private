/* eslint-disable @next/next/no-img-element */
"use client";

import location from "@/assets/vehicleDetails/location.svg";
import { carBrands } from "@/lib/brands";
import { Car } from "@/types/cars";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Dialog, DialogContent } from "./VehicleDetailDialog";
// Import the correct type for Swiper
import heart from "@/assets/heartDetails.svg";
import redHeart from "@/assets/redHeart.svg";
import { Swiper as SwiperType } from "swiper/types";
import Loading from "../shared/loading/Loading";

const HeroDetails = ({ car }: { car: Car }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const brandLogos: { [key: string]: string } = carBrands.reduce((acc, brand) => {
    acc[brand?.name?.trim()?.toLowerCase()] = brand.logo;
    return acc;
  }, {} as { [key: string]: string });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any) => {
    setActiveThumbIndex(swiper.realIndex);
  };
  // Get the logo of the car's brand from brandLogos
  const brandLogo = brandLogos[car?.brand?.trim()?.toLowerCase() || ""];

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? car.otherImages.length : prev - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (car.otherImages.length + 1));
  };

  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);

  if (!car) {
    return <Loading />;
  }

  return (
    <div className="relative w-full mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-4 md:mb-12">
        <h2 className="flex items-center gap-6 text-xl md:text-2xl font-semibold">
          <Image src={brandLogo || "/placeholder.svg"} alt="car" width={300} height={300} className="w-8 h-8 md:w-12 md:h-12" />
          {car?.brand || "Car Name"} {car?.model || "Car Name"}
        </h2>

        <div className="flex items-center gap-1">
          <button onClick={toggleFavorite} className="">
            {isFavorited ? 
               <Image 
                 src={redHeart}
                 alt="heart"
                 width={18}
                 height={20}
                    className="w-4 h-4"
               /> : 
              <Image 
                src={heart}
                alt="heart"
                width={24}
                height={24}
                className="w-4 h-4"
              />
              }
          </button>
          

          <h2 className="flex items-center gap-1 text-base underline text-text_dark_gray/95">
            <Image src={location || "/placeholder.svg"} alt="location" width={20} height={20} className="w-4 h-4" />
            {car?.location || "Location Not Available"}
          </h2>
        </div>
      </div>

      <div className="mt-6">
        <div className="relative">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={{
              nextEl: nextButtonRef.current,
              prevEl: prevButtonRef.current,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
            onSlideChange={(swiper) => setActiveThumbIndex(swiper.realIndex)}
          >
            <SwiperSlide key="main-image" onClick={() => openModal(0)} className="relative">
              <img
                src={car?.mainImage || ""}
                alt="Main Car Image"
                className="aspect-w-16 aspect-h-9 object-cover relative cursor-pointer w-full h-[200px] xl:h-[580px] rounded-xl bg-gray-50"
                width={2000}
                height={2000}
              />
            </SwiperSlide>

            {car.otherImages?.map((image, index) => (
              <SwiperSlide key={index} onClick={() => openModal(index + 1)} className="relative">
                <img
                  src={image || ""}
                  alt={`Car Image ${index + 1}`}
                  className="aspect-w-16 aspect-h-9 object-cover relative cursor-pointer w-full h-[200px] xl:h-[580px] rounded-xl bg-gray-50"
                  width={2000}
                  height={2000}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            ref={prevButtonRef}
            className="z-10 absolute top-1/2 left-1 xl:left-4 transform -translate-y-1/2 bg-transparent text-white p-3 rounded-full"
          >
            <SlArrowLeft size={35} className="w-6 lg:w-8" />
          </button>
          <button
            ref={nextButtonRef}
            className="z-10 absolute top-1/2 right-1 xl:right-4 transform -translate-y-1/2 bg-transparent text-white p-3 rounded-full"
          >
            <SlArrowRight size={35} className="w-6 lg:w-8" />
          </button>
        </div>

        <Swiper
          loop={true}
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper mt-6"
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => setThumbsSwiper(swiper)}
        >
          <SwiperSlide key="main-thumb">
            <div className="relative">
              <img
                src={car.mainImage || ""}
                alt="Main Thumbnail"
                width={2100}
                height={2000}
                className={`object-cover rounded-md h-[50px] md:h-[100px] w-[250px] md:w-[200px] cursor-pointer bg-gray-50 ${
                  activeThumbIndex === 0 ? "" : "opacity-50"
                }`}
                onClick={() => setActiveThumbIndex(0)}
              />
            </div>
          </SwiperSlide>
          {car.otherImages?.map((image, index) => (
            <SwiperSlide key={`thumb-${index}`}>
              <div className="relative">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  width={2100}
                  height={2000}
                  className={`object-cover rounded-md h-[50px] md:h-[100px] w-[250px] md:w-[200px] cursor-pointer ${
                    activeThumbIndex === index + 1 ? "" : "opacity-50"
                  }`}
                  onClick={() => setActiveThumbIndex(index + 1)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="border-none max-w-full p-0 bg-footer_bg/50">
          <button
            onClick={() => setModalOpen(false)}
            className="absolute right-4 top-4 z-50 rounded-full opacity-70 hover:opacity-100 border disabled:pointer-events-none p-1"
          >
            <X className="h-6 w-6 text-white hover:font-extrabold" />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={previousImage}
              className="absolute left-0 z-50 ml-5 lg:p-2 border-white/70 border-2 rounded-full text-white hover:bg-black/70 focus:outline-none"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="relative w-full h-4/5 flex items-center justify-center">
              {/* Show Main Image if it's the selected one */} {/* 16:9 aspect ratio container */}
              <img
                src={currentImageIndex === 0 ? car.mainImage : car?.otherImages[currentImageIndex - 1] || "/placeholder.svg"}
                alt={`Car Image ${currentImageIndex}`}
                className="absolute inset-0 w-full h-full object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 z-50 lg:p-2 rounded-full bg-black/50 border-white/70 border-2 text-white hover:bg-black/70 focus:outline-none"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroDetails;
