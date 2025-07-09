import { Separator } from "@/components/ui/separator";
import VehicleInsertPage from "@/components/vehicleInsert/VehicleInsertPage";

const VehicleInsert = () => {
  return (
    <div className="mt-44 container mx-auto space-y-6 my-20">
      <div className="space-y-2">
        <h2 className="text-3xl md:text-[30px] font-semibold">
          Inserisci annuncio
        </h2>
        <p className="text-text_light_gray">
          Pubblica il tuo annuncio e ricevi prenotazioni
        </p>
      </div>
      <div>
        <Separator className="mb-24" />
      </div>{" "}
      <VehicleInsertPage />
    </div>
  );
};

export default VehicleInsert;
