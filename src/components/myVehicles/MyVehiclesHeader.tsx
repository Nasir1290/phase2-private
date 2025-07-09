import { Separator } from "../ui/separator";

const MyVehiclesHeader = () => {
  return (
    <div className="container mx-auto space-y-4">
      <h2 className="text-[26px] font-medium">I miei veicoli </h2>
      <p className="text-[15px] text-text_light_gray">
        Gestisci i tuoi annunci in modo semplice e veloce
      </p>
      <Separator />
    </div>
  );
};

export default MyVehiclesHeader;
