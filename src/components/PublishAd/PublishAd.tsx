"use client";

import FavoritesCard from "../allCards/FavoritesCard";
import PromotionalCards from "./PromotionalCards";

export default function PublishAd() {
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
    <div className=" p-4 md:p-8 mt-28">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-14 border-b pb-2">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Pubblicizza annuncio</h1>
          <p className="text-gray-500 text-sm">Amplifica la portata del tuo annuncio in pochi click</p>
        </div>

        {/* Selected Vehicle */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-4">Veicolo selezionato &quot;Maserati Ghibli Gransport&quot;</p>

          <FavoritesCard {...vehicle} isFavorite={false} />
        </div>

        {/* Promuovi Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Promuovi</h2>
          <p className="text-gray-500 text-sm mb-8">
            Seleziona una strategia per evidenziare il tuo annuncio e catturare l&apos;attenzione degli utenti
          </p>

          {/* Promotion Cards Grid */}
          <PromotionalCards />

          {/* Footer Text */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Continuando accetto i Termini e condizioni e confermo di aver preso atto della normativa sulla privacy di Bittengo.org
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
