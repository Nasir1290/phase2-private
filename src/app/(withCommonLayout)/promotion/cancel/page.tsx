/* eslint-disable react/no-unescaped-entities */
"use client";

import Loading from "@/components/shared/loading/Loading";
import { useGetCarPromotionWithCheckoutIdQuery } from "@/redux/api/carApi";
import { useSearchParams } from "next/navigation";
import React from "react";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CancelPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data: carPromotionData, isLoading: carPromotionLoading } =
    useGetCarPromotionWithCheckoutIdQuery(sessionId as string, {
      skip: !sessionId,
    });

  if (carPromotionLoading) {
    return <Loading />;
  }

  // If we have session_id but no data, it means payment was cancelled before completion
  const isCancelled = !carPromotionData?.data;

  return (
    <div className="container mx-auto p-4 md:p-8 mt-28 max-w-5xl">
      {/* Cancel Header - Lightweight */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-5">
          <XCircle className="w-20 h-20 text-red-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {isCancelled ? "Pagamento Annullato" : "Operazione Interrotta"}
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          {isCancelled
            ? "Il pagamento è stato annullato. Nessun addebito è stato effettuato sul tuo metodo di pagamento."
            : "Qualcosa è andato storto durante il processo di pagamento."}
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Puoi riprovare quando vuoi o contattare l'assistenza se necessario.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">

        <Button asChild variant="outline" size="lg" className="px-8">
          <Link href="/my-vehicles">Vai ai miei veicoli</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="px-8">
          <Link href="/">Torna alla Home</Link>
        </Button>
      </div>
    </div>
  );
}
