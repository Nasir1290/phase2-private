import { Car } from "@/types/cars";
import { SectionHeader3 } from "../shared/sectionHeader/SectionHeader";
import { FaCheck } from "react-icons/fa";

const Accessori = ({ car }: { car: Car }) => {
  return (
    <div>
      <SectionHeader3 title="Accessori" />
      <div className="grid grid-cols-12 gap-3 md:gap-5">
        {car?.accessories.map((accessory, id) => (
          <p
            key={id}
            className="col-span-6 md:col-span-4 flex items-center gap-4 md:gap- font-normal text-[15px]"
          >
            <FaCheck className="text-green" />
            {accessory}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Accessori;
