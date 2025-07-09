import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VehicleFormData } from "@/types/vehiclStep";

interface DescriptionProps {
  formData: VehicleFormData;
  onFormChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<VehicleFormData>>;
}

const Description = ({
  formData,
  onFormChange,
  setFormData,
}: DescriptionProps) => {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <VehicleInsertionHeader
        title="Descrizione"
        subtitle="Fai risaltare il tuo annuncio con una descrizione dettagliata"
      />

      <div className="space-y-20">
        {/* Vehicle Description */}
        <div className="space-y-4">
          <Label className="font-normal">Descrizione del veicolo</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={onFormChange}
            className="p-5 h-40 resize-none max-w-[580px] shadow-lg shadow-black/10 border border-black/5 rounded-lg w-full"
          />
        </div>

        {/* More Fields */}
        <div>
          <VehicleInsertionHeader
            title="Cos’è incluso nella prenotazione"
            subtitle="Inserisci cosa è incluso nella prenotazione e le politiche riguardanti il noleggio"
          />

          {/* Deposit Input */}
          <div className="mb-10 relative">
            <Label>Deposito</Label>
            <Input
              id="deposite"
              type="number"
              value={formData.deposite ?? ""}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                setFormData({ ...formData, deposite: value });
              }}
              className="relative p-5 h-12 max-w-80 mt-2 border border-black/5 shadow-md rounded-md w-full"
            />
            <p className="absolute top-[38px] left-[270px] font-medium text-[15px] bg-white p-2">
              CHF
            </p>
          </div>

          {/* Textareas for Policies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <Label className="font-normal">Politiche sul deposito</Label>
              <Textarea
                id="depositePolicy"
                value={formData.depositePolicy}
                onChange={onFormChange}
                placeholder="Per noleggiare questo veicolo, è richiesto un deposito di [Inserisci cifra] CHF..."
                className="p-5 h-36 resize-none max-w-[580px] shadow-lg border border-black/5 rounded-lg w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className="font-normal">Politiche sul carburante</Label>
              <Textarea
                id="fuelPolicy"
                value={formData.fuelPolicy}
                onChange={onFormChange}
                placeholder="Il veicolo viene consegnato con il pieno di carburante..."
                className="p-5 h-36 resize-none max-w-[580px] shadow-lg border border-black/5 rounded-lg w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className="font-normal">Politiche sui chilometri</Label>
              <Textarea
                id="mileagePolicy"
                value={formData.mileagePolicy}
                onChange={onFormChange}
                placeholder="Se si supera il limite di chilometri incluso nel noleggio..."
                className="p-5 h-36 resize-none max-w-[580px] shadow-lg border border-black/5 rounded-lg w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className="font-normal">Politiche sui danni</Label>
              <Textarea
                id="damagePolicy"
                value={formData.damagePolicy}
                onChange={onFormChange} // Ensure onChange is passed to update the formData
                placeholder="Questo veicolo prevede una franchigia di [Inserisci cifra] CHF..."
                className="p-5 h-36 resize-none max-w-[580px] shadow-lg border border-black/5 rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
