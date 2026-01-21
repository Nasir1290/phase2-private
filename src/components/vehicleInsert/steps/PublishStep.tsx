"use client";
import FavoritesCard from "@/components/allCards/FavoritesCard";
/* eslint-disable @typescript-eslint/no-explicit-any */

import PromotionalCards from "@/components/PublishAd/PromotionalCards";
import Loading from "@/components/shared/loading/Loading";
import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { Separator } from "@/components/ui/separator";
import { useGetCarBySlugQuery } from "@/redux/api/carApi";
import { useSearchParams } from "next/navigation";
import React from "react";

const PublishStep = ({}: any) => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const { data: carData, isLoading } = useGetCarBySlugQuery(slug as string);
  if (isLoading) return <Loading />;
  if (!carData) return <div>Car not found</div>;
  console.log(carData?.data);
  return (
    <div>
      <FavoritesCard vehicle={carData?.data} isFavorite={false} />
      <VehicleInsertionHeader
        subtitleClassName="max-w-[600px]"
        title="Pubblica"
        subtitle={`Scegli una strategia per promuovere il tuo annuncio e attirare più utenti, oppure clicca su "Pubblica" senza selezionare un metodo di promozione`}
      />
      {/* Promotion Cards Grid */}
      <PromotionalCards carId={carData?.data?.id} />
      <div>
        <p className="yy-8 lg:my-20 text-text_light_gray font-normal text-[14px]">
          Continuando accetto i 
          <span className="underline">Termini e condizioni</span> e confermo di
          aver preso atto della 
          <span className="underline">normativa sulla privacy</span> di
          Bittengo.org
        </p>
        <Separator className=" my-8 lg:my-20" />
      </div>
    </div>
  );
};

export default PublishStep;
