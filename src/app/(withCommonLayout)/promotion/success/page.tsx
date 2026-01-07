/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import FavoritesCard from "@/components/allCards/FavoritesCard";
import Loading from "@/components/shared/loading/Loading";
import { useGetCarPromotionWithCheckoutIdQuery } from "@/redux/api/carApi";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data: carPromotionData, isLoading: carPromotionLoading } =
    useGetCarPromotionWithCheckoutIdQuery(sessionId as string, {
      skip: !sessionId,
    });

  if (carPromotionLoading) {
    return <Loading />;
  }

  if (!carPromotionData?.data) {
    return (
      <div className="container mx-auto p-8 mt-28 text-center">
        <p className="text-red-600 text-lg">Errore: Nessun dato di promozione trovato.</p>
      </div>
    );
  }

  const carPromotion = carPromotionData.data;
  const car = carPromotion.car;

  // Map promotion type to readable Italian name
  const promotionNameMap: Record<string, string> = {
    IN_CIMA: "In Cima",
    IN_HOMEPAGE: "In Homepage",
    IN_RISALTO: "In Risalto",
    PACCHETTO_3IN1: "Pacchetto 3 in 1",
  };

  const promotionDisplayName =
    promotionNameMap[carPromotion.promotionType] || carPromotion.promotionType;

  return (
    <div className="container mx-auto p-4 md:p-8 mt-28 max-w-5xl">
      {/* Lightweight Success Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-5">
          <CheckCircle color="green" className="w-20 h-20 text-green-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-green mb-3">
          Pagamento completato con successo!
        </h1>
        <p className="text-base text-gray-600">
          La promozione <span className="font-semibold text-primary">{promotionDisplayName}</span> è stata applicata al tuo annuncio.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Attivata il {new Date(carPromotion.startTime).toLocaleDateString("it-IT")}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button asChild size="lg" className="px-8">
          <Link href="/my-vehicles">Vai ai miei veicoli</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="px-8">
          <Link href="/">Torna alla Home</Link>
        </Button>
      </div>

      {/* Car Card - Unchanged */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 text-center">
          Il tuo annuncio ora è promosso
        </h2>
        <FavoritesCard vehicle={car} isFavorite={false} isLocation={false} />
      </div>
    </div>
  );
}