import { useState } from "react";
import ProferitiVehicleCard from "../myVehicles/ProferitiVehicleCard";
import Pagination from "../shared/pagination/Pagination";
import { VehicleInsertionHeader } from "../shared/sectionHeader/SectionHeader";

const demoVehicles = [
  {
    id: "veh-001",
    mainImage: "https://media.ed.edmunds-media.com/audi/a4/2022/oem/2022_audi_a4_sedan_prestige-s-line_fq_oem_1_1600.jpg",
    model: "A4",
    brand: "Audi",
    description:
      "Auto in ottime condizioni, cambio automatico, interni in pelle, molto ben mantenuta. Ideale per viaggi lunghi e comfort quotidiano. Dotata di tecnologia all'avanguardia e sistemi di sicurezza avanzati.",
    acceptanceStatus: "ACCEPTED",
    carStatus: "ACTIVE",
    price: [
      { price: 100 },
      { price: 200 },
      { price: 300 }, // used in UI
    ],
  },
];

export default function FavoritesComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className=" space-y-4 my-8 md:my-16 lg:my-24">
      <VehicleInsertionHeader className="" title="Veicoli preferiti" subtitle="Veicoli salvati per un rapido accesso" />
      <div className="grid gap-6">
        {demoVehicles.map((vehicle) => (
          <ProferitiVehicleCard key={vehicle.id} {...vehicle} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination totalPages={5} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
