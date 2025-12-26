import FavoritesCard from "@/components/allCards/FavoritesCard";
import { Separator } from "@/components/ui/separator";
import VehicleInsertPage from "@/components/vehicleInsert/VehicleInsertPage";

const page = () => {
  const vehicle = {
    id: "3",
    imageUrl:
      "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&height=900&width=1600&fit=bounds",
    logo: "https://wallpapercave.com/wp/wp2657676.jpg",
    brand: "Ford",
    model: "Transit 330",
    transmission: "MANUAL",
    seats: 3,
    deposit: 300,
    available: true,
    price: 230,
    maxSpeed: 150,
    whatsappNumber: "+41123456789",
    phoneNumber: "+41123456789",
    location: "Via castigliano 4, Lugano",
    isFavorite: false,
    isLocation: false,
  };
  return (
    <div className="mt-44 container mx-auto space-y-6 my-20">
      <div className="space-y-2">
        <h2 className="text-3xl md:text-[30px] font-semibold">Modifica annuncio</h2>
        <p className="text-text_light_gray">Gestisci e aggiorna il tuo annuncio in pochi click</p>
      </div>
      <div>
        <Separator className="mb-16" />
      </div>{" "}
      <div className="mb-14">
        <p className="text-text_light_gray mb-3">Veicolo selezionato “Maserati Ghibli Gransport”</p>
        <FavoritesCard {...vehicle} isFavorite={false} />
      </div>
      <VehicleInsertPage />
    </div>
  );
};

export default page;
