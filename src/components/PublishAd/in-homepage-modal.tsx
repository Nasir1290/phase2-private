"use client";

import home from "@/assets/Annunci in homepage (1).svg";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Check, X } from "lucide-react";
import Image from "next/image";

interface InHomepageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InHomepageModal({ isOpen, onClose }: InHomepageModalProps) {
  return (
    <Modal
      open={isOpen}
      footer={null}
      closable={false}
      closeIcon={<CloseOutlined style={{ fontSize: "14px" }} />}
      onCancel={onClose}
      width={650}
      centered
      className="in-homepage-modal"
      style={{ borderRadius: "8px", overflow: "hidden" }}
    >
      <div className="px-2 md:px-4 pb-6">
        {/* Header */}
        <div className="flex justify-between items-start pb-4">
          <div className=" md:pt-4">
            <div className="flex items-center gap-4  mb-3 md:mb-6">
              <h2 className=" text-gray-900  text-lg sm:text-2xl font-semibold ">In homepage</h2>
              <Image src={home} alt="In homepage icon" width={20} height={20} className="mt-1" />
            </div>
            <p className="text-sm text-[#AAAAAA] font-medium leading-4  pb-4 md:pb-6">
              La promozione &quot;In homepage&quot; ti permette di posizionare il tuo annuncio direttamente nella pagina principale della piattaforma,
              garantendo una visibilità immediata e privilegiata per raggiungere più utenti e aumentare la pubblicità al noleggio.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-primary ml-4 mt- absolute top-3 right-3">
            <X size={20} />
          </button>
        </div>

        {/* Visual Representation */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-10">
            <div className="bg-[#7C82861A] rounded-lg p-2 shadow-md mb-4">
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
            <div className="bg-white rounded-lg p-2 shadow-md mb-4">
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
            <div className="bg-[#7C82861A] rounded-lg p-2 shadow-md mb-4">
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
        </div>

        {/* Vantaggi Section */}
        <div>
          <h3 className="mb-4    text-base  font-semibold ">Vantaggi</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-5">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#AAAAAA] font-normal leading-4 ">
                Il tuo annuncio sarà tra i primi nella homepage, visibile a tutti gli utenti appena accedono alla piattaforma.
              </p>
            </div>

            <div className="flex items-start gap-5">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#AAAAAA] font-normal leading-4 ">
                Il tuo annuncio sarà immediatamente visibile in homepage per 24 ore garantendo massima esposizione.
              </p>
            </div>

            <div className="flex items-start gap-5">
              <Check className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#AAAAAA] font-normal leading-4 ">Ottieni una posizione esclusiva rispetto agli altri annunci</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
