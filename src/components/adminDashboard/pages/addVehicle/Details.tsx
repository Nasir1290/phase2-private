import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VehicleFormData } from "@/types/vehiclStep";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DetailsProps {
  formData: VehicleFormData;
  onFormChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
}

const Details = ({ formData, onFormChange, setFormData }: DetailsProps) => {
  const colors = [
    "Giallo",
    "Arancione",
    "Rosso",
    "Viola",
    "Rosa",
    "Azzurro",
    "Blu",
    "Verde",
    "Grigio",
    "Marrone",
    "Bianco",
    "Nero",
  ];

  const seatsOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  return (
    <div className="space-y-10">
      <VehicleInsertionHeader
        title="Dettagli"
        subtitle="Inserisci le informazioni utili per aiutare gli utenti"
      />

      <div className="flex flex-wrap items-center justify-start gap-10">
        {/* Trasmissione */}
        <div className="relative flex flex-col gap-3">
          <Label htmlFor="transmission">Trasmissione</Label>
          <select
            id="transmission"
            value={formData.transmission}
            onChange={onFormChange}
            className="relative shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent pr-8 text-sm font-normal text-black invalid:text-white"
          >
            <option value="" disabled>
              Seleziona una trasmissione
            </option>
            <option className="text-black" value="AUTOMATIC">
              Automatico
            </option>
            <option className="text-black" value="MANUAL">
              Manuale
            </option>
          </select>
          <div className="absolute top-12 left-52 transform -translate-y-1/2 pointer-events-none">
            <IoIosArrowDown className="w-4 h-4 text-red" />
          </div>
        </div>

        {/* Colore */}
        <div className="relative flex flex-col gap-3">
          <Label htmlFor="color">Colore</Label>
          <select
            id="color"
            value={formData.color}
            onChange={onFormChange}
            className="relative shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent pr-8 text-sm font-normal text-black invalid:text-white"
          >
            <option value="" disabled>
              Seleziona un colore
            </option>
            {colors.map((color) => (
              <option key={color} className="text-black" value={color}>
                {color}
              </option>
            ))}
          </select>
          <div className="absolute top-12 left-52 transform -translate-y-1/2 pointer-events-none">
            <IoIosArrowDown className="w-4 h-4 text-red" />
          </div>
        </div>

        {/* 0-100 km/h */}
        <div className="relative flex flex-col gap-3">
          <Label htmlFor="kmh">0-100 km/h</Label>
          <Input
            id="kmh"
            type="number"
            value={
              formData.kmh !== undefined && formData.kmh !== null
                ? formData.kmh.toString()
                : ""
            }
            onChange={(e) => {
              const kmhValue = e.target.value ? Number(e.target.value) : 0;
              setFormData({ ...formData, kmh: kmhValue });
            }}
            className="shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent text-sm font-normal text-black"
          />
        </div>

        {/* Motore */}
        <div className="relative flex flex-col gap-3">
          <Label htmlFor="engine">Motore</Label>
          <Input
            id="engine"
            type="text"
            value={formData.engine}
            onChange={onFormChange}
            className="shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent text-sm font-normal text-black"
          />
        </div>

        {/* Velocità massima */}
        <div className="relative flex flex-col gap-3">
          <Label htmlFor="maxSpeed">Velocità massima</Label>
          <Input
            id="maxSpeed"
            type="number"
            value={formData.maxSpeed || ""}
            onChange={(e) => {
              const maxSpeedValue = e.target.value
                ? Number(e.target.value)
                : "";
              setFormData({ ...formData, maxSpeed: maxSpeedValue });
            }}
            className="shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent text-sm font-normal text-black"
          />
        </div>

        {/* Horse Power */}
        <div className="relative flex flex-col gap-3">
          <Label htmlFor="horsePower">Cavalli</Label>
          <Input
            id="horsePower"
            type="number"
            value={formData.horsePower || ""}
            onChange={(e) => {
              const horsePowerValue = e.target.value
                ? Number(e.target.value)
                : "";
              setFormData({ ...formData, horsePower: horsePowerValue });
            }}
            className="shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent text-sm font-normal text-black"
          />
        </div>

        {/* Posti a sedere */}
        <div className="relative flex flex-col gap-3">
          <Label htmlFor="seats">Posti a sedere</Label>
          <select
            id="seats"
            value={formData.seats || ""}
            onChange={(e) => {
              const selectedSeats = e.target.value
                ? Number(e.target.value)
                : "";
              setFormData({ ...formData, seats: selectedSeats });
            }}
            className="relative shadow-md rounded-lg border border-gray-100 w-60 px-4 py-2.5 appearance-none bg-transparent pr-8 text-sm font-normal text-black invalid:text-white"
          >
            <option value="" disabled>
              Seleziona posti a sedere
            </option>
            {seatsOptions.map((seats) => (
              <option key={seats} className="text-black" value={seats}>
                {seats}
              </option>
            ))}
          </select>
          <div className="absolute top-12 left-52 transform -translate-y-1/2 pointer-events-none">
            <IoIosArrowDown className="w-4 h-4 text-red" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
