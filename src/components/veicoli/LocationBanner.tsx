"use client";

import Image from "next/image";
import { useGetAllBrandsQuery } from "@/redux/api/carApi";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { carBrands } from "@/lib/brands";
const LocationBanner = () => {
  const { data: allBrands } = useGetAllBrandsQuery({});
  const brands = allBrands?.data || [];

  const filteredBrands = carBrands.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (brand) => brands.some((b: any) => b.brand === brand?.name)
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center text-center mt-10 md:mt-0 mb-12 md:mb-16 space-y-10 max-w-[950px] mx-auto">
        <h2 className=" font-extrabold text-2xl md:text-[30px]">
          Noleggia un veicolo in Svizzera
        </h2>
        <p className="text-sm font-medium text-text_light_gray max-w-[920px] ">
          Noleggio veicoli di alta qualità per ogni esigenza. Il nostro
          marketplace comprende auto e furgoni perfettamente manutenuti, ideali
          per spostamenti personali, professionali o per grandi trasporti.
          Offriamo tariffe di noleggio trasparenti e competitive, con un
          servizio affidabile e senza sorprese. Scopri le opzioni di noleggio a
          breve e lungo termine, tutte con assicurazione inclusa, per
          un&apos;esperienza di mobilità premium
        </p>
      </div>

      <div className="pt-10">
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            425: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 25,
            },
          }}
          className="mySwiper"
        >
          {filteredBrands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <Link href={`/veicoli/?brand=${brand.name}`}>
                <div className="bg-white shadow-md shadow-black/20 hover:shadow-red/20 hover:shadow-md rounded-2xl border/40 py-3 flex justify-center items-center m-2 min-w-[120px] max-w-[260px]">
                  <Image
                    src={brand?.logo}
                    alt={brand?.name}
                    width={50}
                    height={50}
                    className="object-contain w-8 h-8 lg:w-10 lg:h-10 xl:w-[50px] xl:h-[50px] 2xl:w-14 2xl:h-14"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LocationBanner;
