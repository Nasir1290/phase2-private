"use client";

import stars from "@/assets/Paccheto 3 in 1.svg";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Check, X } from "lucide-react";
import { SkeletonCard } from "../ui/skeleton-card";
interface PacchettoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PacchettoModal({ isOpen, onClose }: PacchettoModalProps) {
  return (
    <Modal
      open={isOpen}
      footer={null}
      closable={false}
      closeIcon={<CloseOutlined style={{ fontSize: "14px" }} />}
      onCancel={onClose}
      width={650}
      centered
      className="pacchetto-modal"
      style={{ borderRadius: "8px", overflow: "hidden" }}
    >
      <div className="px-2 md:px-4 pb-6">
        {/* Header */}
        <div className="flex justify-between items-start pb-4">
          <div className=" md:pt-4">
            <div className="flex items-center gap-4  mb-3 md:mb-6">
              <h2 className=" text-gray-900  text-lg sm:text-2xl font-semibold ">Pacchetto 3 in 1</h2>
              {/* <Image src={inrisalto} alt="In risalto icon" width={24} height={24} className="mt-1" /> */}
            </div>
            <p className="text-sm text-[#AAAAAA] font-medium leading-4  pb-4 md:pb-6">
              Il pacchetto 3 in 1 combina tre promozioni fondamentali: &quot;In Alto &quot;, &quot;In Risalto &quot; e &quot;In Homepage &quot;,
              offrendo massima visibilità al tuo annuncio su Bittengo. Ottieni una presenza continua e accattivante grazie al posizionamento in cima,
              al contorno rosso per evidenziare il tuo annuncio, e all&apos;esposizione nella homepage, aumentando così le tue possibilità di ricevere
              richieste e contatti, il tutto ad un prezzo super scontato!
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-primary ml-4 mt- absolute top-3 right-3">
            <X size={20} />
          </button>
        </div>
        {/* Stars */}
        {/* <div className="flex justify-center gap-1 mb-6">
          <Star className="w-6 h-6 text-yellow-400 fill-current" />
          <Star className="w-6 h-6 text-yellow-400 fill-current" />
          <Star className="w-6 h-6 text-yellow-400 fill-current" />
        </div> */}

        <img src={stars.src} alt="Stars" className="mx-auto mb-8 max-w-28" />

        {/* Visual Representation */}
        <div className="mb-6">
          {/* Homepage Section */}
          <div className="grid grid-cols-3 gap-10 mb-8">
            <div className="bg-[#7C82861A] rounded-lg p-2 shadow-lg mb-4">
              <div className="w-full h-24 mb-3 bg-gray-300 rounded animate-pulse"></div>
              <div className="flex  items-center justify-between gap-8">
                <div className="w-full h-2 bg-gray-300 rounded-sm mb-2 animate-pulse"></div>
                <div className="w-full max-w-9 h-2 bg-gray-300 rounded mb-2 animate-pulse"></div>
              </div>
              <div className="h-2 bg-gray-300 rounded w-full max-w-8 mb-2 animate-pulse"></div>
              <div className="flex items-center justify-between gap-5  mt-5">
                <div className="h-2 bg-gray-300  w-full rounded animate-pulse"></div>
                <div className="h-2 bg-gray-300  w-full rounded animate-pulse"></div>
                <div className="h-2 bg-gray-300  w-full rounded animate-pulse"></div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-2 shadow-lg mb-4">
              <div className="w-full h-24 mb-3 bg-gray-300 rounded animate-pulse"></div>
              <div className="flex  items-center justify-between gap-8">
                <div className="w-full h-2 bg-gray-300 rounded-sm mb-2 animate-pulse"></div>
                <div className="w-full max-w-9 h-2 bg-gray-300 rounded mb-2 animate-pulse"></div>
              </div>
              <div className="h-2 bg-gray-300 rounded w-full max-w-8 mb-2 animate-pulse"></div>
              <div className="flex items-center justify-between gap-5  mt-5">
                <div className="h-2 bg-gray-300  w-full rounded animate-pulse"></div>
                <div className="h-2 bg-gray-300  w-full rounded animate-pulse"></div>
                <div className="h-2 bg-gray-300  w-full rounded animate-pulse"></div>
              </div>
            </div>
            <div className="bg-[#7C82861A] rounded-lg p-2 shadow-lg mb-4">
              <div className="w-full h-24 mb-3 bg-gray-300 rounded animate-pulse"></div>
              <div className="flex  items-center justify-between gap-8">
                <div className="w-full h-2 bg-gray-300 rounded-sm mb-2 animate-pulse"></div>
                <div className="w-full max-w-9 h-2 bg-gray-300 rounded mb-2 animate-pulse"></div>
              </div>
              <div className="h-2 bg-gray-300 rounded w-full max-w-8 mb-2 animate-pulse"></div>
              <div className="flex items-center justify-between gap-5  mt-5">
                <div className="h-2 bg-gray-300  w-full rounded animate-pulse"></div>
                <div className="h-2 bg-gray-300  w-full rounded animate-pulse"></div>
                <div className="h-2 bg-gray-300  w-full rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="mb-6 md:pb-6 space-y-8">
            <SkeletonCard showTitle className="border border-primary" />
            <SkeletonCard showTitle className="" />

            <div className="h-16 bg-gray-300  w-full rounded animate-pulse max-w-sm mx-auto"></div>
          </div>
        </div>

        {/* Vantaggi Section */}
        <div>
          <h3 className=" mb-4    text-base  font-semibold ">Vantaggi</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-5">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#AAAAAA] font-normal leading-4 ">
                Contiene: in alto x8 volte, sarà presente in homepage x2 volte e evidenziato con il contorno rosso in risalto per x4 volte, garantendo
                una visibilità senza pari
              </p>
            </div>
            <div className="flex items-start gap-5">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#AAAAAA] font-normal leading-4 ">
                Acquistando questo pacchetto ottieni il massimo valore ad un costo ridotto di <br /> oltre il 30%
              </p>
            </div>
            <div className="flex items-start gap-5">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#AAAAAA] font-normal leading-4 ">
                Puoi utilizzare le promozioni in modo flessibile, scegliendo come e quando attivarle per ottimizzare la visibilità{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
