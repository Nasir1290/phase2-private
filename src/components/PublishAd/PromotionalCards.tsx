/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import stars from "@/assets/Paccheto 3 in 1.svg";
import { Button } from "@/components/ui/button";
import cima from "@/assets/Annunci in cima (1).svg";
import home from "@/assets/Annunci in homepage (1).svg";
import annunci from "@/assets/Annunci in risalto (1).svg";
import info from "@/assets/Punto info.svg";
import free from "@/assets/free.svg";
import { useEffect, useRef, useState } from "react";
import MyCheckbox from "../ui/MyCheckbox";
import InCimaModal from "./in-cima-modal";
import InHomepageModal from "./in-homepage-modal";
import InRisaltoModal from "./in-risalto";
import PacchettoModal from "./pacchetto-modal";
import {
  useGetAllPromotionsQuery,
  useApplyPromotionFromWalletMutation,
  usePurchasePromotionMutation,
} from "@/redux/api/subscription";
import Image from "next/image";
import { toast } from "sonner";

const SUCCESS_URL = process.env.NEXT_PUBLIC_PROMOTION_SUCCESS_URL;
const CANCEL_URL = process.env.NEXT_PUBLIC_PROMOTION_CANCEL_URL;

type PromotionType = "IN_CIMA" | "IN_HOMEPAGE" | "IN_RISALTO";

const PromotionalCards = ({ carId }: { carId: string }) => {
  const { data: allPromotionData, isLoading: promotionDataLoading } =
    useGetAllPromotionsQuery("");
  const [purchasePromotion, { isLoading: purchaseLoading }] =
    usePurchasePromotionMutation();
  const [applyFreePromotion, { isLoading: freeLoading }] =
    useApplyPromotionFromWalletMutation();

  const isProcessing = purchaseLoading || freeLoading;

  const [isModalInCimaOpen, setIsModalInCimaOpen] = useState(false);
  const [isModalInHomepageOpen, setIsModalInHomepageOpen] = useState(false);
  const [isModalInRisaltoOpen, setIsModalInRisaltoOpen] = useState(false);
  const [isModalPacchettoOpen, setIsModalPacchettoOpen] = useState(false);

  // One selection per section: promotion ID or "free"
  const [selectedInCima, setSelectedInCima] = useState<string | "free" | null>(
    null
  );
  const [selectedInHomepage, setSelectedInHomepage] = useState<
    string | "free" | null
  >(null);
  const [selectedInRisalto, setSelectedInRisalto] = useState<
    string | "free" | null
  >(null);
  // set promotions into this state to show inline error.
  const [promotionError, setPromotionError] = useState<string | null>(null);
  // ref to take the error message into viewport if it's not
  const errorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (promotionError && errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [promotionError]);

  // helper function to remove all other previous selection
  const clearOtherSelections = (current: PromotionType) => {
    if (current !== "IN_CIMA") setSelectedInCima(null);
    if (current !== "IN_HOMEPAGE") setSelectedInHomepage(null);
    if (current !== "IN_RISALTO") setSelectedInRisalto(null);
  };

  const handleSelectInCima = (value: string | "free") => {
    clearOtherSelections("IN_CIMA");
    setSelectedInCima(selectedInCima === value ? null : value);
  };

  const handleSelectInHomepage = (value: string | "free") => {
    clearOtherSelections("IN_HOMEPAGE");
    setSelectedInHomepage(selectedInHomepage === value ? null : value);
  };

  const handleSelectInRisalto = (value: string | "free") => {
    clearOtherSelections("IN_RISALTO");
    setSelectedInRisalto(selectedInRisalto === value ? null : value);
  };

  const handlePurchase = async () => {
    const selected = selectedInCima || selectedInHomepage || selectedInRisalto;

    if (!selected) {
      toast.error("Seleziona almeno una promozione");
      return;
    }

    if (selected === "free") {
      const type =
        selectedInCima === "free"
          ? "IN_CIMA"
          : selectedInHomepage === "free"
          ? "IN_HOMEPAGE"
          : "IN_RISALTO";
      try {
        await applyFreePromotion({ carId, promotionType: type }).unwrap();
        toast.success("Promozione gratuita applicata!");
      } catch (error: any) {
        const message =
          error?.data?.message ||
          "Si è verificato un errore durante l'applicazione della promozione gratuita";

        setPromotionError(message);
        return;
      }
    }

    try {
      const result = await purchasePromotion({
        promotionId: selected,
        successUrl: SUCCESS_URL,
        cancelUrl: CANCEL_URL,
        carId,
      }).unwrap();
      console.log({ result: result?.data?.session?.url });
      if (result?.data?.session?.url) {
        window.location.href = result.data.session.url;
      }
    } catch (error: any) {
      console.error(error?.data);
      const message = error?.data?.message || "Errore durante il pagamento";
      setPromotionError(message);
      return;
    }
  };

  const handlePacchettoPurchase = async () => {
    if (!pacchetto) return;

    try {
      const result = await purchasePromotion({
        promotionId: pacchetto.id,
        successUrl: SUCCESS_URL,
        cancelUrl: CANCEL_URL,
        carId,
      }).unwrap();

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error: any) {
      const message =
        error?.data?.message || "Errore durante l'acquisto del pacchetto";

      setPromotionError(message);
      return;
    }
  };

  if (promotionDataLoading)
    return <div className="text-center py-10">Caricamento...</div>;
  if (!allPromotionData?.success || !allPromotionData.data)
    return <div className="text-center py-10 text-red-600">Errore</div>;

  const promotions = allPromotionData.data;
  const inCima = promotions.filter((p: any) => p.type === "IN_CIMA");
  const inHomepage = promotions.filter((p: any) => p.type === "IN_HOMEPAGE");
  const inRisalto = promotions.filter((p: any) => p.type === "IN_RISALTO");
  const pacchetto = promotions.find((p: any) => p.type === "PACCHETTO_3IN1");

  const openInCimaModal = () => setIsModalInCimaOpen(true);
  const openInHomepageModal = () => setIsModalInHomepageOpen(true);
  const openInRisaltoModal = () => setIsModalInRisaltoOpen(true);
  const openPacchettoModal = () => setIsModalPacchettoOpen(true);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* In cima */}
        <InCimaModal
          isOpen={isModalInCimaOpen}
          onClose={() => setIsModalInCimaOpen(false)}
        />
        <div className="bg-white border border-black/5 shadow-xl shadow-black/10 rounded-xl p-6 xl:px-10 relative">
          <div className="flex items-center justify-center mb-4">
            <div className="flex flex-col items-center gap-2">
              <h3 className="font-semibold">In cima</h3>
              <div className="w-10 h-10 rounded-full flex items-center justify-center my-1">
                <Image
                  height={20}
                  width={20}
                  src={cima.src}
                  alt="Up"
                  className="w-10 h-10 text-gray-600"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <Image
              height={20}
              width={20}
              src={info.src}
              alt="Info"
              className="w-4 h-4 text-gray-400 cursor-pointer"
              onClick={openInCimaModal}
            />
          </div>
          <p className="text-xs text-[#AAAAAA] mb-6 text-center">
            Porta il tuo annuncio in cima <br /> alla lista per aumentare la{" "}
            <br /> visibilità
          </p>

          <div className="space-y-3 mb-6">
            {inCima.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between">
                <MyCheckbox
                  label={item.name.replace(" In ", " ")}
                  checked={selectedInCima === item.id}
                  onChange={() => handleSelectInCima(item.id)}
                />
                <span className="text-sm font-medium">
                  {item.priceFormatted.replace(" CHF", ".-")}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-4">
              <MyCheckbox
                image={free.src}
                label="Gratuiti (0 disponibili)"
                checked={selectedInCima === "free"}
                onChange={() => handleSelectInCima("free")}
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full bg-transparent rounded"
            onClick={handlePurchase}
            disabled={isProcessing}
          >
            {isProcessing ? "Elaborazione..." : "Acquista"}
          </Button>
        </div>

        {/* In homepage */}
        <InHomepageModal
          isOpen={isModalInHomepageOpen}
          onClose={() => setIsModalInHomepageOpen(false)}
        />
        <div className="bg-white border border-black/5 shadow-xl shadow-black/10 rounded-xl p-6 xl:px-10 relative">
          <div className="flex items-center justify-center mb-4">
            <div className="flex flex-col items-center gap-2">
              <h3 className="font-semibold">In homepage</h3>
              <div className="w-10 h-10 rounded-full flex items-center justify-center my-1">
                <Image
                  height={20}
                  width={20}
                  src={home.src}
                  alt="Home"
                  className="w-10 h-10 text-gray-600"
                />
              </div>
            </div>
          </div>
          <div onClick={openInHomepageModal} className="absolute top-4 right-4">
            <Image
              height={20}
              width={20}
              src={info.src}
              alt="Info"
              className="w-4 h-4 text-gray-400 cursor-pointer"
            />
          </div>
          <p className="text-xs text-[#AAAAAA] mb-6 text-center">
            Promuovi il tuo annuncio sulla homepage ed attira immediatamente
            l&apos;attenzione
          </p>

          <div className="space-y-3 mb-6">
            {inHomepage.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between">
                <MyCheckbox
                  label={item.name.replace(" In ", " ")}
                  checked={selectedInHomepage === item.id}
                  onChange={() => handleSelectInHomepage(item.id)}
                />
                <span className="text-sm font-medium">
                  {item.priceFormatted.replace(" CHF", ".-")}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-4">
              <MyCheckbox
                image={free.src}
                label="Gratuiti (0 giorni)"
                checked={selectedInHomepage === "free"}
                onChange={() => handleSelectInHomepage("free")}
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full bg-transparent rounded"
            onClick={handlePurchase}
            disabled={isProcessing}
          >
            {isProcessing ? "Elaborazione..." : "Acquista"}
          </Button>
        </div>

        {/* In risalto */}
        <InRisaltoModal
          isOpen={isModalInRisaltoOpen}
          onClose={() => setIsModalInRisaltoOpen(false)}
        />
        <div className="bg-white border border-black/5 shadow-xl shadow-black/10 rounded-xl p-6 xl:px-10 relative">
          <div className="flex items-center justify-center mb-4">
            <div className="flex flex-col items-center gap-2">
              <h3 className="font-semibold">In risalto</h3>
              <div className="w-10 h-10 rounded-full flex items-center justify-center my-1">
                <Image
                  height={20}
                  width={20}
                  src={annunci.src}
                  alt="Diamond"
                  className="w-10 h-10 text-gray-600"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <Image
              height={20}
              width={20}
              src={info.src}
              alt="Info"
              className="w-4 h-4 text-gray-400 cursor-pointer"
              onClick={openInRisaltoModal}
            />
          </div>
          <p className="text-xs text-[#AAAAAA] mb-6 text-center">
            Evidenzia il tuo annuncio con <br />
            un bordo rosso per una maggiore visibilità
          </p>

          <div className="space-y-3 mb-6">
            {inRisalto.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between">
                <MyCheckbox
                  label={item.name.replace(" In ", " ")}
                  checked={selectedInRisalto === item.id}
                  onChange={() => handleSelectInRisalto(item.id)}
                />
                <span className="text-sm font-medium">
                  {item.priceFormatted.replace(" CHF", ".-")}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-4">
              <MyCheckbox
                image={free.src}
                label="Gratuiti (0 giorno)"
                checked={selectedInRisalto === "free"}
                onChange={() => handleSelectInRisalto("free")}
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full bg-transparent rounded"
            onClick={handlePurchase}
            disabled={isProcessing}
          >
            {isProcessing ? "Elaborazione..." : "Acquista"}
          </Button>
        </div>

        {/* Pacchetto 3 in 1 */}
        <PacchettoModal
          isOpen={isModalPacchettoOpen}
          onClose={() => setIsModalPacchettoOpen(false)}
        />
        <div className="bg-white border border-primary shadow-xl shadow-black/10 rounded-xl p-6 xl:px-10 relative">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 mb-3">
              <h3 className="font-semibold">Pacchetto 3 in 1</h3>
              <div className="w-24 h-14 flex items-center justify-center">
                <Image
                  height={20}
                  width={20}
                  src={stars.src}
                  alt="Stars"
                  className="w-24 h-14"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <Image
              height={20}
              width={20}
              src={info.src}
              alt="Info"
              className="w-4 h-4 text-gray-400 cursor-pointer"
              onClick={openPacchettoModal}
            />
          </div>

          <p className="text-center mt-4 mb-8 text-sm">
            Attrai clienti
            <br /> istantaneamente
          </p>
          <p className="text-xs text-[#AAAAAA] mb-9 text-center">
            Visibilità multipla garantita <br />
            8 volte in cima, 2 volte in <br /> homepage e 4 volte in risalto
          </p>

          <p className="mb-6 text-base text-center">
            Offerta 3 in 1 a soli{" "}
            <span className="font-bold">
              {pacchetto?.priceFormatted.replace(" CHF", ".-") || "99.-"}
            </span>
          </p>

          <Button
            className="w-full bg-primary hover:bg-primary text-white rounded"
            onClick={handlePacchettoPurchase}
            disabled={isProcessing}
          >
            {isProcessing ? "Elaborazione..." : "Acquista ora"}
          </Button>
        </div>
      </div>
      {promotionError && (
        <div ref={errorRef} className="mt-6 flex justify-center">
          <div className="relative w-full max-w-4xl border border-red-500/60 bg-red-50 text-red-700 rounded-lg px-4 py-3 shadow-[0_0_12px_rgba(239,68,68,0.35)]">
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => setPromotionError(null)}
            >
              ✕
            </button>

            <p className="text-sm font-medium">{promotionError}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PromotionalCards;
