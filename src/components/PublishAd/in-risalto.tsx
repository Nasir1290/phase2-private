"use client";

import inrisalto from "@/assets/pin.svg";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { SkeletonCard } from "../ui/skeleton-card";

interface InRisaltoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InRisaltoModal({ isOpen, onClose }: InRisaltoModalProps) {
  return (
    <Modal
      open={isOpen}
      footer={null}
      closable={false}
      closeIcon={<CloseOutlined style={{ fontSize: "14px" }} />}
      onCancel={onClose}
      width={650}
      centered
      className="in-cima-modal"
      style={{ borderRadius: "8px", overflow: "hidden" }}
    >
      <div className="px-2 md:px-4 pb-6">
        {/* Header */}
        <div className="flex justify-between items-start pb-4">
          <div className=" md:pt-4">
            <div className="flex items-center gap-4  mb-3 md:mb-6">
              <h2 className=" text-gray-900  text-lg sm:text-2xl font-semibold ">In risalto</h2>
              <Image src={inrisalto} alt="In risalto icon" width={24} height={24} className="mt-1" />
            </div>
            <p className="text-sm text-[#AAAAAA] font-medium leading-4  pb-4 md:pb-6">
              La promozione &quot;In risalto&quot; mette il tuo annuncio in evidenza con un contorno rosso, attirando l&apos;attenzione e
              distinguendoti dagli altri. Il tuo annuncio resterà sempre visibile e sarà facilmente notato dagli utenti, aumentando le possibilità di
              ricevere più richieste e contatti.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-primary ml-4 mt- absolute top-3 right-3">
            <X size={20} />
          </button>
        </div>

        {/* Visual Representation */}
        <div className="mb-6 md:pb-6 space-y-6">
          <SkeletonCard showTitle className="border border-primary" />

          {/* Second card without title */}
          <SkeletonCard className="bg-[#7C82861A] max-w-md mx-auto " />

          {/* Third card without title */}
          <SkeletonCard className="bg-[#7C82861A] max-w-md mx-auto " />
        </div>

        {/* Vantaggi Section */}
        <div>
          <h3 className=" mb-4    text-base  font-semibold ">Vantaggi</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-5">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#AAAAAA] font-normal leading-4 ">
                Il contorno rosso attirerà l’attenzione e farà risaltare il tuo annuncio rispetto agli  <br /> altri
              </p>
            </div>
            <div className="flex items-start gap-5">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#AAAAAA] font-normal leading-4 ">
                Il tuo annuncio sarà sempre ben visibile nella lista, attirando l’attenzione degli <br /> utenti
              </p>
            </div>
            <div className="flex items-start gap-5">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#AAAAAA] font-normal leading-4 ">
                Il tuo annuncio andrà in cima alla lista una volta e sarà contraddistinto da un <br /> contorno rosso, durante 24 ore, per una visibilità
                immediata e maggiore impatto.
              </p>
            </div>

            {/* <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">Il contorno rosso attirerà l’attenzione e farà risaltare il tuo annuncio rispetto agli altri </p>
            </div> */}

            {/* <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">Il tuo annuncio sarà sempre ben visibile nella lista, attirando l’attenzione degli utenti </p>
            </div> */}

            {/* <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">
                Il tuo annuncio andrà in cima alla lista una volta e sarà contraddistinto da un contorno rosso, durante 24 ore, per una visibilità
                immediata e maggiore impatto.{" "}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </Modal>
  );
}
