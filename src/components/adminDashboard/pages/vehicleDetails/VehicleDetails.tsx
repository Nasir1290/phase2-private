/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { LuImageOff } from "react-icons/lu";
import { useGetCarByIDQuery } from "@/redux/api/carApi";
import { usePathname } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/vehicleDetailsPage/RentalTable";
import Loading from "@/components/shared/loading/Loading";
const VehicleDetails = () => {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  const { data: singleCarDetails } = useGetCarByIDQuery(id);
  const carDetails = singleCarDetails?.data;
  if (!carDetails) {
    return <Loading />;
  }

  return (
    <div className="px-4 py-8 overflow-x-auto space-y-10">
      {/* Header Section */}
      <header>
        <div className="flex items-center gap-5">
          {/* <Image
            src={carDetails?.logo}
            alt={`${carDetails?.model} logo`}
            width={100}
            height={100}
            className="w-8 h-8"
          /> */}
          <h1 className="text-2xl font-semibold">{carDetails?.model}</h1>
        </div>
      </header>
      {/* Details section  */}
      <div className="space-y-16">
        {/* main Image  */}
        <section className="flex flex-wrap gap-4">
          {carDetails?.mainImage ? (
            <Image
              src={carDetails?.mainImage}
              alt={`${carDetails.model}`}
              width={2000}
              height={2000}
              priority
              className="w-full h-full lg:h-[500px] object-cover rounded-lg"
            />
          ) : (
            <div className="w-[470px] h-64 bg-primary/20 flex flex-col  items-center justify-center gap-4 rounded-lg ">
              <LuImageOff size={30} className=" text-text_dark_gray" />
              <span className="text-text_dark_gray font-medium">No image found</span>
            </div>
          )}
        </section>
        {/* Image Gallery */}
        <section className="flex flex-wrap gap-4">
          {carDetails?.otherImages?.map((image: string, index: number) =>
            image ? (
              <Image
                key={index}
                src={image}
                alt={`${carDetails?.model} Image ${index + 1}`}
                width={500}
                height={500}
                className="w-[470px] h-64 object-cover rounded-lg"
              />
            ) : (
              <div key={index} className="w-[470px] h-64 bg-primary/20 flex flex-col items-center justify-center gap-4 rounded-lg">
                <LuImageOff size={30} className=" text-text_dark_gray" />
                <span className="text-text_dark_gray font-medium">No image found</span>
              </div>
            )
          )}
        </section>
        {/* Car Details Section */}
        <section className="space-y-8">
          <h2 className="font-semibold text-2xl">Car Details</h2>
          <div className="grid grid-cols-3 gap-4 w-1/2">
            <p className="flex flex-col">
              <span className="text-lg font-medium text-text_light_gray">Anno</span> <span className="text-[15px]">{carDetails?.year}</span>
            </p>
            <p className="flex flex-col">
              <span className="text-lg font-medium text-text_light_gray">Color</span> <span className="text-[15px]">{carDetails?.color}</span>
            </p>
            <p className="flex flex-col">
              <span className="text-lg font-medium text-text_light_gray">0-100 km/h</span> <span className="text-[15px]">{carDetails?.kmh} sec</span>
            </p>
            <p className="flex flex-col">
              <span className="text-lg font-medium text-text_light_gray">Transmission</span>{" "}
              <span className="text-[15px]">{carDetails?.transmission}</span>
            </p>
            <p className="flex flex-col">
              <span className="text-lg font-medium text-text_light_gray">Engine</span> <span className="text-[15px]">{carDetails?.engine}</span>
            </p>
            <p className="flex flex-col">
              <span className="text-lg font-medium text-text_light_gray">Max Speed</span>{" "}
              <span className="text-[15px]">{carDetails?.maxSpeed} km/h</span>
            </p>
            <p className="flex flex-col">
              <span className="text-lg font-medium text-text_light_gray">Horsepower</span>{" "}
              <span className="text-[15px]">{carDetails?.horsePower} CV</span>
            </p>
            <p className="flex flex-col">
              <span className="text-lg font-medium text-text_light_gray">Seats</span> <span className="text-[15px]">{carDetails?.seats}</span>
            </p>
            <p className="flex flex-col">
              <span className="text-lg font-medium text-text_light_gray">Fuel</span> <span className="text-[15px]">{carDetails?.fuelType}</span>
            </p>
          </div>
        </section>

        {/* Rental Information Section */}
        <section className="rental-info space-y-8">
          <h2 className="font-semibold text-2xl">Rental Information</h2>
          <p>
            <strong>Location:</strong> {carDetails?.location}
          </p>
          {/* Fuel Policy */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Fuel Policy</h3>
            <p className="text-[15px]">{carDetails?.fuelPolicy}</p>
          </div>
          {/* Kilometer Policy */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Kilometer Policy</h3>
            <p className="text-[15px]">{carDetails?.mileagePolicy}</p>
          </div>
          {/* Deposit policies */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Deposit policies</h3>
            <p className="text-[15px]">{carDetails?.depositePolicy}</p>
          </div>
          {/* Damage policies */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Damage policies</h3>
            <p className="text-[15px]">{carDetails?.damagePolicy}</p>
          </div>
          {/* Pricing Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-2xl">Pricing</h3>
            <Table className="w-1/2">
              <TableHeader>
                <TableRow className="font-semibold">
                  <TableHead className="w-[20px]">TEMPO DI NOLEGGIO</TableHead>
                  <TableHead className="w-[20px]">PREZZO</TableHead>
                  <TableHead className="w-[20px]">KM INCLUSI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carDetails?.price?.map((info: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium border-b">
                      {info.rentalTime} {info.rentalTime === 1 ? "ora" : "ore"}
                    </TableCell>
                    <TableCell className="font-medium border-b">{info.price} .-</TableCell>
                    <TableCell className="font-medium border-b">{info.kilometerPerHour} km/h</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Accessories Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-2xl">Accessories</h3>
            <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
              {carDetails?.accessories.map((accessory: string, index: number) => (
                <li key={index} className="text-[15px]">
                  {accessory}
                </li>
              ))}
            </ul>
          </div>
          {/* Description */}
          <div className="space-y-4">
            <h3 className="font-semibold text-2xl">Description</h3>
            <p className="text-[15px]">{carDetails?.description}</p>
          </div>

          {/* Authentication Image  */}
          <section className="flex flex-wrap gap-4">
            {carDetails?.authenticationFile ? (
              <img
                src={carDetails?.authenticationFile}
                alt="Authentication Image"
                width={2000}
                height={2000}
                className="w-full h-full lg:h-[500px] object-cover rounded-lg"
              />
            ) : (
              <div className="w-[470px] h-64 bg-primary/20 flex flex-col  items-center justify-center gap-4 rounded-lg ">
                <LuImageOff size={30} className=" text-text_dark_gray" />
                <span className="text-text_dark_gray font-medium">No image found</span>
              </div>
            )}
          </section>
        </section>
      </div>
    </div>
  );
};

export default VehicleDetails;
