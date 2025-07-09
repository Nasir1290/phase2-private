import { SectionHeader3 } from "../shared/sectionHeader/SectionHeader";
import { Car } from "@/types/cars";

const RentalDescription = ({ car }: { car: Car }) => {
  return (
    <div className="max-w-2/3">
      <SectionHeader3
        title={`Descrizione ${car?.brand} ${car?.model} a noleggio`}
      />

      <p className="text-text_dark_gray text-start">{car?.description}</p>
    </div>
  );
};

export default RentalDescription;
