"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { motion } from "framer-motion";
import pricetag from "@/assets/myVehicles/prezzo.svg";
import { usePathname } from "next/navigation";
import { useGetCarByIDQuery } from "@/redux/api/carApi";
import { carBrands } from "@/lib/brands";

const InsertedVehiclePage = () => {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  const { data: singleCarDetails } = useGetCarByIDQuery(id);
  const carDetails = singleCarDetails?.data;

  const selectedPrice =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    carDetails?.price?.find((p: any) => p.rentalTime === 24)?.price || 0;

  const truncate = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const brandLogos: { [key: string]: string } = carBrands.reduce(
    (acc, brand) => {
      acc[brand.name] = brand.logo;
      return acc;
    },
    {} as { [key: string]: string }
  );

  const brand = carDetails?.brand; // Get the brand from the carDetails


  // Directly access the brand logo using the brand name
  const brandLogo = brandLogos[brand || ""];

  return (
    <div className="">
      <div className="text-center space-y-8">
        <h2 className="text-3xl font-semibold">
          Congratulazioni il tuo annuncio è in fase di revisione!
        </h2>
        <p className="text-text_light_gray">
          Il tuo annuncio è in revisione, ti informeremo non appena verrà
          approvato
        </p>
      </div>

      <div className="my-20">
        <div className="w-full ">
          <div className="flex flex-col lg:flex-row items-start gap-3 bg-white rounded-2xl border border-black/5 shadow-md w-full">
            {/* Car Image */}
            <div className="w-full lg:w-auto lg:flex-shrink-0 p-2">
              <Link href={`/veicoli/${carDetails?.id}`} passHref>
                <div className="relative w-full overflow-hidden rounded-xl">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    <Image
                      src={carDetails?.mainImage}
                      alt={carDetails?.model}
                      width={320}
                      height={240}
                      className="w-[400px] md:w-[800px] lg:w-[300px] xl:w-[280px] h-[175px] rounded-lg object-cover"
                    />
                  </motion.div>
                </div>
              </Link>
            </div>

            {/* Car Details */}
            <div className="w-full flex flex-col items-start gap-2.5 px-8 pt-5 pb-4">
              {/* Title */}
              <div className="flex justify-start items-center gap-4">
                {/* <Image
                  src={logo}
                  alt="Mercedes-Benz C43 AMG (Cabriolet)"
                  width={56}
                  height={40}
                  className="w-6 h-6"
                /> */}

                <div>
                  {brandLogo ? (
                    <Image
                      src={brandLogo} // Use the logo URL from the brandLogos object
                      alt={brand} // Use the brand name for the alt text
                      width={56}
                      height={40}
                      className="w-6 h-6"
                    />
                  ) : (
                    <span>No logo found</span> // Fallback in case no match is found
                  )}
                </div>

                <Link href={`/veicoli/${carDetails?.id}`} passHref>
                  <h3 className="text-[18px] font-medium">
                    {carDetails?.brand} {carDetails?.model}
                  </h3>
                </Link>
              </div>
              {/* Description  */}
              <p className="text-text_light_gray text-sm">
                {carDetails?.description
                  ? truncate(carDetails.description, 20)
                  : ""}
              </p>

              {/* Price  */}
              <div className="flex items-center gap-3">
                <Image
                  src={pricetag}
                  alt="Mercedes-Benz C43 AMG (Cabriolet)"
                  width={56}
                  height={40}
                  className="w-5 h-5"
                />
                <p className="font-medium">CHF {selectedPrice || "N/A"}</p>
              </div>
              <Separator />
              {/* <p
                className={`${
                  adType === "published"
                    ? "text-green"
                    : adType === "underReview"
                    ? "text-yellow-500"
                    : adType === "suspended"
                    ? "text-gray-400"
                    : ""
                } font-medium`}
              >
                {adType === "published"
                  ? "Annuncio pubblicato"
                  : adType === "underReview"
                  ? "Annuncio in revisione"
                  : adType === "suspended"
                  ? "Annuncio sospeso"
                  : "Stato sconosciuto"}
              </p> */}
              <p className="text-yellow-500">Annuncio in revisione</p>
            </div>
          </div>
        </div>
      </div>

      {/* separator  */}
      <div>
        <Separator className="my-10" />
      </div>
      <div className="flex justify-end">
        <Link href="/">
          <button className="w-[140px] py-2 rounded text-[15px] bg-red text-white">
            Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InsertedVehiclePage;
