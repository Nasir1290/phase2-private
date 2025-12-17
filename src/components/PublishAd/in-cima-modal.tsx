"use client";

import incimaUp from "@/assets/Annunci in cima (1).svg";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { SkeletonCard } from "../ui/skeleton-card";

interface InCimaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InCimaModal({ isOpen, onClose }: InCimaModalProps) {
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
      <div className="md:px-3 pb-6">
        {/* Header */}
        {/* <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-medium">In cima</h2>
          <InfoCircleOutlined className="text-gray-400" style={{ fontSize: "16px" }} />
        </div>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          La promozione &quot;In cima&quot; ti consente di posizionare il tuo annuncio in cima alla lista, garantendo massima visibilità. Puoi
          scegliere di riportarlo in cima manualmente ogni volta che lo desideri, rendendolo subito accessibile agli utenti interessati per essere
          contattato rapidamente.
        </p> */}

        {/* Header */}
        <div className="flex justify-between items-start pb-4">
          <div className=" md:pt-4">
            <div className="flex items-center gap-4  mb-3 md:mb-6">
              <h2 className=" text-gray-900  text-lg sm:text-2xl font-semibold ">In cima</h2>
              <Image src={incimaUp} alt="In cima icon" width={20} height={20} className="mt-1" />
            </div>
            <p className="text-sm text-[#AAAAAA] font-medium leading-4  pb-4 md:pb-6">
              La promozione &quot;In cima&quot; ti consente di posizionare il tuo annuncio in cima alla lista, garantendo massima visibilità. Puoi
              scegliere di riportarlo in cima manualmente ogni volta che lo desideri, rendendolo subito accessibile agli utenti interessati per essere
              contattato rapidamente.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-primary ml-4 mt- absolute top-3 right-3">
            <X size={20} />
          </button>
        </div>

        {/* Visual Representation */}
        <div className="mb-6 md:pb-6 space-y-6">
          {/* Your Ad - Highlighted */}
          {/* <div className="bg-white border-2 border-primary rounded-lg p-4 mb-3 relative">
            <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">Il tuo annuncio</div>
            <div className="flex gap-3 pt-6">
              <div className="w-16 h-12 bg-gray-300 rounded"></div>
              <div className="flex-1">
                <div className="h-2 bg-gray-300 rounded mb-2"></div>
                <div className="h-2 bg-gray-300 rounded w-2/3 mb-2"></div>
                <div className="h-2 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div> */}

          {/* Other Ads - Grayed Out */}
          {/* <div className="space-y-3">
            <div className="bg-gray-100 rounded-lg p-4 opacity-60">
              <div className="flex gap-3">
                <div className="w-16 h-12 bg-gray-300 rounded"></div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-300 rounded mb-2"></div>
                  <div className="h-2 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 opacity-60">
              <div className="flex gap-3">
                <div className="w-16 h-12 bg-gray-300 rounded"></div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-300 rounded mb-2"></div>
                  <div className="h-2 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 opacity-60">
              <div className="flex gap-3">
                <div className="w-16 h-12 bg-gray-300 rounded"></div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-300 rounded mb-2"></div>
                  <div className="h-2 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div> */}

          {/* First card with title and red button */}
          <SkeletonCard showTitle />

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
                Il tuo annuncio resterà in cima alla lista dei veicoli finché verranno pubblicati altri annunci.
              </p>
            </div>

            <div className="flex items-start gap-5">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="ext-sm text-[#AAAAAA] font-normal leading-4">
                Aumenta la tua probabilità di essere contattato grazie a una posizione <br /> privilegiata.
              </p>
            </div>

            <div className="flex items-start gap-5">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="ext-sm text-[#AAAAAA] font-normal leading-4">
                Gli utenti troveranno il tuo annuncio al primo colpo, ottenendo tutta più semplice <br />  e veloce.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
