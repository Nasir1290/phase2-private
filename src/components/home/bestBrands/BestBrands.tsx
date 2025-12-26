"use client";

import { SectionHeader1 } from "@/components/shared/sectionHeader/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { carBrands } from "@/lib/brands";
import { useGetAllBrandsQuery } from "@/redux/api/carApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import { Autoplay } from "swiper";

const BestBrands = () => {
  const { data: allBrands } = useGetAllBrandsQuery({});
  const brands = allBrands?.data || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const brandNames = brands.map((brand: any) => brand.brand);
  const filteredBrands = carBrands.filter((category) => brandNames.includes(category.name));

  return (
    <div className="container mx-auto">
      {/* Section Header */}
      <div className="max-w-[850px] mx-auto">
        <SectionHeader1
          title="I NOSTRI MIGLIORI BRAND"
          subtitle="Scopri i brand più rinomati per il noleggio veicoli, offriamo una selezione di veicoli di qualità garantendo
affidabilità e prestazioni eccellenti per ogni tua esigenza di mobilità"
        />
      </div>

      {/* Hardcoded sections */}
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        // modules={[Autoplay]}
        slidesPerView={2} // Adjust based on your needs (e.g., 2 for smaller screens)
        spaceBetween={10}
        breakpoints={{
          425: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 25,
          },
        }}
        className="mySwiper pt-10"
      >
        {filteredBrands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <Link href={`/veicoli/?brand=${brand.name}`}>
              <div className="bg-white shadow-md shadow-black/20 hover:shadow-primary/20 hover:shadow-md rounded-2xl border/40 py-3 flex justify-center items-center m-2 max-w-[260px] ml-[1px]">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={500}
                  height={500}
                  className="object-contain w-8 h-8 lg:w-10 lg:h-10 xl:w-[50px] xl:h-[50px] 2xl:w-14 2xl:h-14"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestBrands;
