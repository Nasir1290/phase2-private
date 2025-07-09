"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateFormData } from "@/redux/slice/vehicleInsertSlice";
import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

interface DetailsStepProps {
  errors: string[];
}
export function DetailsStep({ errors }: DetailsStepProps) {
  const dispatch = useDispatch();
  const hasError = (fieldName: string) => errors.includes(fieldName);
  const { formData } = useSelector((state: RootState) => state.form) || {
    formData: {},
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: string, value: any) => {
    dispatch(updateFormData({ [field]: value }));
  };

  return (
    <div>
      <VehicleInsertionHeader
        title="Descrizione"
        subtitle="Fai risaltare il tuo annuncio con una descrizione dettagliata"
      />
      {/* vehicle Description  */}
      <div className="space-y-4">
        <Label className="font-normal">Descrizione del veicolo</Label>
        <Textarea
          required
          id="description"
          value={formData.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className={`p-5 h-40 resize-none max-w-[580px] shadow-lg shadow-black/10 border rounded-lg ${
            hasError("description") && !formData.description
              ? "border-red"
              : "border-black/5"
          }`}
        />

        {/* Always show the word counter, but cap the displayed count at 20 */}
        <p className="text-sm text-text_light_gray font-medium text-center mr-14 2xl:mr-28">
          {Math.min(
            formData.description?.trim().split(/\s+/).filter(Boolean).length ||
              0,
            20
          )}
          /20 Parole
        </p>
      </div>

      {/* Separator */}
      <div>
        <Separator className="my-20" />
      </div>

      {/* More Fields */}
      <div>
        <VehicleInsertionHeader
          title="Cos’è incluso nella prenotazione"
          subtitle="Inserisici cosa è incluso nella prenotazione e le politiche riguardanti il noleggio"
        />
        {/* Deposito */}
        <div className="mb-10 relative">
          <Label className="font-normal">Deposito</Label>
          <Input
            id="deposite"
            type="number"
            min="0" // Ensures browser prevents negative numbers
            value={formData.deposite ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              // Only allow numbers >= 0
              if (
                value === "" ||
                (!isNaN(Number(value)) && Number(value) >= 0)
              ) {
                handleInputChange(
                  "deposite",
                  value === "" ? null : Number(value)
                );
              }
            }}
            onKeyDown={(e) => {
              // Prevent minus sign, 'e', 'E', and decimal point if needed
              if (["-", "e", "E", "."].includes(e.key)) {
                e.preventDefault();
              }
            }}
            className={`relative p-5 h-12 max-w-72 mt-2 border border-black/5 shadow-md rounded-md ${
              hasError("deposite") && !formData.deposite
                ? "border-red"
                : "border-gray-100"
            }`}
          />
          <p className="absolute top-[38px] left-[230px] font-medium text-[15px] bg-white p-2">
            CHF
          </p>
        </div>
        {/* Textareas */}
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-3">
            <Label className="font-normal">Politiche sul deposito</Label>
            <Textarea
              id="depositePolicy"
              value={formData.depositePolicy || ""}
              placeholder="Per noleggiare questo veicolo, è richiesto un deposito di [Inserisci cifra] CHF. Il deposito verrà rimborsato entro [Inserisci cifra] giorni dal termine del noleggio, a condizione che il veicolo venga restituito nelle condizioni concordate e senza danni"
              onChange={(e) =>
                handleInputChange("depositePolicy", e.target.value)
              }
              className={`${
                hasError("depositePolicy") && !formData.depositePolicy
                  ? "border-red"
                  : "border-gray-100"
              } p-5 h-36 resize-none max-w-[580px] shadow-lg border border-black/5 rounded-lg`}
            />
          </div>

          <div className="space-y-3">
            <Label className="font-normal">Politiche sul carburante</Label>
            <Textarea
              id="fuelPolicy"
              value={formData.fuelPolicy || ""}
              placeholder="Il veicolo viene consegnato con il pieno di carburante. Al momento della restituzione, il serbatoio deve essere altrettanto pieno. In caso contrario, verrà applicata una tariffa di rifornimento pari al costo del carburante mancante"
              onChange={(e) => handleInputChange("fuelPolicy", e.target.value)}
              className={`p-5 h-36 resize-none max-w-[580px] shadow-lg border border-black/5 rounded-lg ${
                hasError("fuelPolicy") && !formData.fuelPolicy
                  ? "border-red"
                  : "border-gray-100"
              }`}
            />
          </div>

          <div className="space-y-3">
            <Label className="font-normal">Politiche sui chilometri</Label>
            <Textarea
              id="mileagePolicy"
              value={formData.mileagePolicy || ""}
              placeholder="Se si supera il limite di chilometri incluso nel noleggio, verrà applicata una tariffa extra di [inserisci cifra] per ogni chilometro extra"
              onChange={(e) =>
                handleInputChange("mileagePolicy", e.target.value)
              }
              className={`p-5 h-36 resize-none max-w-[580px] shadow-lg border border-black/5 rounded-lg ${
                hasError("mileagePolicy") && !formData.mileagePolicy
                  ? "border-red"
                  : "border-gray-100"
              }`}
            />
          </div>

          <div className="space-y-3">
            <Label className="font-normal">Politiche sui danni</Label>
            <Textarea
              id="damagePolicy"
              value={formData.damagePolicy || ""}
              placeholder="Questo veicolo prevede una franchigia di [Inserisci cifra] CHF, in caso di danno, l'importo da addebitare sarà pari al danno subito, fino all'importo massimo della franchigia"
              onChange={(e) =>
                handleInputChange("damagePolicy", e.target.value)
              }
              className={`p-5 h-36 resize-none max-w-[580px] shadow-lg border border-black/5 rounded-lg ${
                hasError("damagePolicy") && !formData.damagePolicy
                  ? "border-red"
                  : "border-gray-100"
              }`}
            />
          </div>
        </div>
        {/* Separator */}
        <div>
          <Separator className="my-20" />
        </div>
      </div>
    </div>
  );
}
