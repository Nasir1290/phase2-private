// app/edit-vehicle/[slug]/page.tsx
import { Separator } from "@/components/ui/separator";
import EditVehiclePage from "@/components/vehicleEdit/EditVehiclePage";

export default async function VehicleEditPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  return (
    <div className="container mx-auto pt-32 pb-8">
      <h1 className="text-3xl font-bold mb-2">Modifica annuncio</h1>
      <p className="text-muted-foreground mb-6">
        Aggiorna le informazioni del tuo veicolo
      </p>
      <Separator className="mb-8" />
      <EditVehiclePage slug={slug} />
    </div>
  );
}
