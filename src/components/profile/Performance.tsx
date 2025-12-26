/* eslint-disable @typescript-eslint/no-explicit-any */
import BADGE from "@/assets/Badge unico business (3).svg";
import INCREMENTO from "@/assets/Incremento dei noleggi (1).svg";
import visibilita from "@/assets/Logo aziendale (1).svg";
import Youtube from "@/assets/Video (1).svg";
import { cn } from "@/lib/utils";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import PerformanceVehicleCard from "../myVehicles/PerformanceVehicleCard";
import Pagination from "../shared/pagination/Pagination";
import { VehicleInsertionHeader } from "../shared/sectionHeader/SectionHeader";

export const dummyVehicles = [
  {
    id: "veh1",
    mainImage: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    model: "Civic",
    brand: "Honda",
    description: "A reliable and fuel-efficient compact sedan known for comfort and performance.",
    acceptanceStatus: "ACCEPTED",
    carStatus: "ACTIVE",
    price: [{ price: 100 }, { price: 150 }, { price: 250 }],
  },
  {
    id: "veh2",
    mainImage: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg",
    model: "A4",
    brand: "Audi",
    description: "Luxury compact sedan with smooth handling, stylish cabin, and modern tech features.",
    acceptanceStatus: "PENDING",
    carStatus: "ACTIVE",
    price: [{ price: 180 }, { price: 260 }, { price: 400 }],
  },
  {
    id: "veh3",
    mainImage: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    model: "Corolla",
    brand: "Toyota",
    description: "A dependable sedan offering low maintenance cost and high resale value.",
    acceptanceStatus: "ACCEPTED",
    carStatus: "ACTIVE",
    price: [{ price: 90 }, { price: 130 }, { price: 220 }],
  },
];
const demoVehicles = [
  {
    id: "veh-001",
    mainImage: "https://media.ed.edmunds-media.com/audi/a4/2022/oem/2022_audi_a4_sedan_prestige-s-line_fq_oem_1_1600.jpg",
    model: "A4",
    brand: "Audi",
    description: "Auto in ottime condizioni, cambio automatico, interni in pelle, molto ben mantenuta. Ideale per viaggi lunghi e comfort quotidiano. Dotata di tecnologia all'avanguardia e sistemi di sicurezza avanzati.",
    acceptanceStatus: "ACCEPTED",
    carStatus: "ACTIVE",
    price: [
      { price: 100 },
      { price: 200 },
      { price: 300 }, // used in UI
    ],
  },
 
];

const fuelOptions = [
  {
    name: "BADGE UNICO",
    description:
      "Rendi visibile la tua attività con un badge esclusivo che distingue la tua offerta, aumentando la fiducia dei clienti e la tua visibilità",
    image: BADGE,
    className: "2xl:h-12 2xl:w-12",
  },
  {
    name: "LOGO AZIENDALE",
    description:
      "Esponi il tuo logo e rendi le tue inserzioni più visibili, attirando l’attenzione dei clienti e dando massimo risalto alla tua attività",
    image: visibilita,
    className: "-mt-[22px] 2xl:h-14 2xl:w-14",
  },
  {
    name: "INCREMENTO DEI NOLEGGI",
    description: "Accelera il successo delle tue inserzioni con i nostri piani maggiore visibilità, più richieste e guadagni ottimizzati",
    image: INCREMENTO,
    className: "-mt-[22px] 2xl:h-14 2xl:w-14 scale-110",
  },
  {
    name: "VIDEO",
    description:
      "Carica video per catturare l’attenzione e distinguerti dalla concorrenza, ed ottieni accesso ad un area riservata per i tuoi annunci",
    image: Youtube,
    className: "-mt-[8px] 2xl:h-14 2xl:w-14 ",
  },
];
const Performance = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isVehicleListOpen, setIsVehicleListOpen] = React.useState(false);

  return (
    <div className=" space-y-4 my-8 md:my-16 lg:my-24">
      <div className="mb-20">
        <VehicleInsertionHeader
          className="font-medium"
          title="Performance"
          subtitle="Monitora e migliora i risultati in tempo reale"
          subtitleClassName="text-sm text-text_light_gray"
        />
      </div>
      <div className="flex flex-wrap justify-between items-center ">
        <p className="text-sm text-text_light_gray">Veicolo selezionato “Maserati Ghibli Gransport”</p>

        <div
          onClick={() => setIsVehicleListOpen(true)}
          className="flex text-sm font-semibold text-primary uppercase items-center gap-1 hover:bg-primary/5 px-3 py-2 rounded-lg cursor-pointer"
        >
          <p>SELEZIONA VEICOLO</p>
          <MdArrowForwardIos />
        </div>
        <Modal
          open={isVehicleListOpen}
          footer={null}
          closable={true}
          closeIcon={<CloseOutlined style={{ fontSize: "14px" }} />}
          onCancel={() => setIsVehicleListOpen(false)}
          width={700}
          centered
          className="in-cima-modal"
          style={{ borderRadius: "8px", overflow: "hidden" }}
        >
          <div className="px-2 pt-2 pb-6">
            <div className=" md:pt-4">
              <h2 className=" text-gray-900 mb-3 md:mb-6  text-lg sm:text-2xl font-semibold ">I miei veicoli</h2>
              <p className="text-sm text-[#AAAAAA] font-medium leading-4 border-b border-gray-200 pb-4 md:pb-6">
                Scegli il veicolo dalla tua lista per esplorare in dettaglio le performance e i risultati ad esso correlati
              </p>
            </div>
            <p className="text-gray-400 text-end mb-2">8 Annunci </p>
            <div className="flex flex-col gap-5">
              {dummyVehicles?.map((vehicle) => (
                // <FavoritesCard key={index} {...vehicle} isFavorite={false} />
                <PerformanceVehicleCard
                  key={vehicle.id}
                  acceptanceStatus={vehicle.acceptanceStatus}
                  brand={vehicle.brand}
                  carStatus={vehicle.carStatus}
                  description={vehicle.description}
                  id={vehicle.id}
                  mainImage={vehicle.mainImage}
                  model={vehicle.model}
                  price={vehicle.price}
                  // className={cn(
                  //   selectedCardId === vehicle.id ? "shadow-primary/25 shadow-md" : "border border-gray-200",
                  //   "cursor-pointer rounded-xl"
                  // )}
                  // onClick={() => setSelectedCardId(vehicle.id)}
                />
              ))}
              {/* {ownerDetails?.data?.cars?.length ? (
          ownerDetails.data.cars.map((vehicle: any) => <MyVehicleCard key={vehicle.id} {...vehicle} />)
        ) : (
          <p className="text-center font-semibold text-gray-500">{ "No vehicles available"}</p>
        )} */}
            </div>
            <div className="flex justify-center mt-6 border-b pb-8">
              <Pagination totalPages={5} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>

            <div className="flex justify-between items-center  mt-6 ">
              <button
                onClick={() => setIsVehicleListOpen(false)}
                className=" w-36 text-[13px] px-8 xl:px-8 py-2 md:py-1.5 border rounded font-medium shadow-md text-center hover:bg-text_light_gray/10 hover:shadow-lg"
              >
                Annulla
              </button>
              <button className=" w-36 text-[13px] px-8 xl:px-8 py-2 md:py-1.5 bg-primary hover:bg-primary/90 hover:shadow-xl  text-white font-medium rounded shadow-lg">
                Seleziona
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div className="mb-14">
        {/* <FavoritesCard {...vehicle} isFavorite={false} /> */}
        <div className="grid gap-6">
  {demoVehicles.map(vehicle => (
    <PerformanceVehicleCard key={vehicle.id} {...vehicle} />
  ))}
</div>

      </div>
      <div className="flex flex-col gap-5 md:gap-10 pt-8 ">
        <div className="">
          <VehicleInsertionHeader
            className="mt-10"
            title="Visualizzazioni"
            subtitle="Scopri quante persone hanno visto il tuo annuncio"
            subtitleClassName="text-sm text-text_light_gray"
          />
          <div className="max-w-72 bg-white  flex items-center justify-between px-6 h-12 shadow-md rounded-xl border border-gray-100">
            <p className="text-[#AAAAAA] text-sm">Visite</p>
            <p className="font-medium text-sm">6&#39;5333</p>
          </div>
        </div>
        <div className="">
          <VehicleInsertionHeader
            className="mt-10 max-w-3xl"
            title="Contatti generati"
            subtitle="Scopri quante persone hanno cliccato sui tuoi canali di contatto per mettersi in comunicazione con te"
            subtitleClassName="text-sm text-text_light_gray"
          />

          <div className="max-w-72 bg-white  flex items-center justify-between  px-6  h-12 shadow-md rounded-xl border border-gray-100">
            <p className="text-[#AAAAAA] text-sm">Contatti</p>
            <p className="font-medium text-sm">6</p>
          </div>
        </div>
        <div className="">
          <VehicleInsertionHeader
            className="mt-10"
            title="Clienti acquisiti"
            subtitle="Scopri il numero di persone che hanno scelto di contattarti attraverso i tuoi canali di comunicazione"
            subtitleClassName="text-sm text-text_light_gray"
          />

          <div className="max-w-72 bg-white  flex items-center justify-between  px-6  h-12 shadow-md rounded-xl border border-gray-100">
            <p className="text-[#AAAAAA] text-sm">Clienti</p>
            <p className="font-medium text-sm">4</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center gap-3">
            <VehicleInsertionHeader
              className="mt-10 w-full max-w-4xl"
              title="Aumenta le tue performance"
              subtitle="Potenzia i risultati del tuo annuncio con i nostri pacchetti promozionali o i nostri piani d'abbonamento"
              subtitleClassName="text-sm text-text_light_gray w-full"
            />

            <div className=" flex text-sm font-semibold text-primary uppercase items-center gap-1 hover:bg-primary/5 px-3 py-2 rounded-lg cursor-pointer">
              <p>SCOPRI I PIANI</p>
              <MdArrowForwardIos />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto  justify-items-center gap-5 md:gap-6">
            {fuelOptions.map((fuel: any, index: number) => (
              <div
                key={index}
                className={`w-full border px-4 py-6 shadow-lg rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer
                  hover:shadow-xl transition-shadow duration-300 bg-white text-center 
                  
                  `}
              >
                <Image
                  src={fuel.image}
                  alt={fuel.name}
                  width={40}
                  height={40}
                  className={cn("w-10 h-10 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 object-fill", fuel.className)}
                />
                <h2 className="xl:text-[17px] 2xl:text-lg font-semibold mb-3">{fuel.name}</h2>
                <p className="text-xs text-text_light_gray font-medium leading-tight text-center">{fuel.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
