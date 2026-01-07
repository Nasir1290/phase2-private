/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import FavoritesCard from "../allCards/FavoritesCard";
// import PromotionalCards from "./PromotionalCards";
// import { useGetCarBySlugQuery } from "@/redux/api/carApi";
// import Loading from "../shared/loading/Loading";

// export default function PublishAd() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const name = searchParams.get("name");
//   const { data: vehicleData, isLoading: vehicleLoading } = useGetCarBySlugQuery(
//     name as string
//   );
//   if (vehicleLoading) return <Loading />;
//   if (!vehicleData?.success) {
//     router.push("/");
//     return;
//   }
//   console.log(vehicleData?.data);
//   const vehicle = vehicleData?.data;
//   return (
//     <div className=" p-4 md:p-8 mt-28">
//       <div className="container mx-auto">
//         {/* Header */}
//         <div className="mb-8 md:mb-14 border-b pb-2">
//           <h1 className="text-2xl font-semibold text-gray-900 mb-2">
//             Pubblicizza annuncio
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Amplifica la portata del tuo annuncio in pochi click
//           </p>
//         </div>

//         {/* Selected Vehicle */}
//         <div className="mb-8">
//           <p className="text-sm text-gray-500 mb-4">
//             Veicolo selezionato &quot;Maserati Ghibli Gransport&quot;
//           </p>

//           <FavoritesCard {...vehicle} isFavorite={false} />
//         </div>

//         {/* Promuovi Section */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-900 mb-2">
//             Promuovi
//           </h2>
//           <p className="text-gray-500 text-sm mb-8">
//             Seleziona una strategia per evidenziare il tuo annuncio e catturare
//             l&apos;attenzione degli utenti
//           </p>

//           {/* Promotion Cards Grid */}
//           <PromotionalCards />

//           {/* Footer Text */}
//           <div className="mt-8 text-center">
//             <p className="text-xs text-gray-500">
//               Continuando accetto i Termini e condizioni e confermo di aver
//               preso atto della normativa sulla privacy di Bittengo.org
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import FavoritesCard from "../allCards/FavoritesCard";
import PromotionalCards from "./PromotionalCards";
import { useGetCarBySlugQuery } from "@/redux/api/carApi";
import Loading from "../shared/loading/Loading";
import { useEffect } from "react";

export default function PublishAd() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name");

  const {
    data: vehicleData,
    isLoading: vehicleLoading,
    isError,
  } = useGetCarBySlugQuery(name as string, {
    skip: !name, // Don't run query if no name
  });

  // Redirect if no name or error/success false
  useEffect(() => {
    if (!name || (!vehicleLoading && (!vehicleData || !vehicleData.success))) {
      router.push("/");
    }
  }, [name, vehicleLoading, vehicleData, router]);

  if (vehicleLoading) {
    return <Loading />;
  }

  // Final safety check - if no valid vehicle data, don't render anything (redirect already handled)
  if (!vehicleData?.data) {
    return null; // or a fallback message
  }

  const vehicle = vehicleData.data;

  return (
    <div className="p-4 md:p-8 mt-28">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-14 border-b pb-2">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Pubblicizza annuncio
          </h1>
          <p className="text-gray-500 text-sm">
            Amplifica la portata del tuo annuncio in pochi click
          </p>
        </div>

        {/* Selected Vehicle */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-4">
            Veicolo selezionato &quot;{vehicle.brand} {vehicle.model}&quot;
          </p>

          <FavoritesCard vehicle={vehicle} isFavorite={false} />
        </div>

        {/* Promuovi Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Promuovi
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Seleziona una strategia per evidenziare il tuo annuncio e catturare
            l&apos;attenzione degli utenti
          </p>

          <PromotionalCards carId={vehicle?.id} />

          {/* Footer Text */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Continuando accetto i Termini e condizioni e confermo di aver
              preso atto della normativa sulla privacy di Bittengo.org
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
