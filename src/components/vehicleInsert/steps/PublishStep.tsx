/* eslint-disable @typescript-eslint/no-explicit-any */
import PromotionalCards from "@/components/PublishAd/PromotionalCards";
import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { Separator } from "@/components/ui/separator";
import React from "react";

const PublishStep = ({}: any) => {
  return (
    <div>
      <VehicleInsertionHeader
        subtitleClassName="max-w-[600px]"
        title="Pubblica"
        subtitle={`Scegli una strategia per promuovere il tuo annuncio e attirare più utenti, oppure clicca su "Pubblica" senza selezionare un metodo di promozione`}
      />
      {/* Promotion Cards Grid */}
      <PromotionalCards />
      <div>
        <p className="my-8 lg:my-20 text-text_light_gray font-normal text-[14px]">
          Continuando accetto i <span className="underline">Termini e condizioni</span> e confermo di aver preso atto della <span className="underline">normativa sulla privacy</span> di Bittengo.org
        </p>
        <Separator className=" my-8 lg:my-20" />
      </div>
    </div>
  );
};

export default PublishStep;
