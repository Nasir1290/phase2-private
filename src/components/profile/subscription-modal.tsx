"use client";
import plus from "@/assets/Plus.svg";
import { Modal } from "antd";
import { X } from "lucide-react";
import Image from "next/image";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  return (
    <>
      <Modal
        title={null}
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={450}
        className="vehicle-filter-modal"
        closeIcon={null}
        styles={{
          body: { padding: 0 },
        }}
      >
        <div className="bg-white rounded-lg md:p-3">
          {/* Header */}
          <div className="flex justify-between items-start pb-4">
            <div>
              <h2 className="text-xl font-medium mb-2">Gestisci abbonamento</h2>
            </div>
            <button
              onClick={() => {
                if (onClose) onClose();
              }}
              className="text-gray-400 hover:text-primary ml-4 mt- absolute top-3 right-3"
            >
              <X size={20} />
            </button>
          </div>

          {/* Subscription Info Row */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            {/* Left Side */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-medium">Abbonamento PLUS</span>
                {/* <CheckCircle className="w-5 h-5 text-green-500" /> */}
                <Image src={plus} alt="Plus Icon" className="w-5 h-5" />
              </div>
              <p className="text-gray-900 font-bold mt-1">CHF 29.90/Mese</p>
            </div>

            {/* Right Side */}
            <div className="">
              <span className="text-[#000000] text-sm">Prossima fatturazione</span>
              <p className="text-gray-500 text-sm">10/12/2024</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center  pt-4 md:pt-8 border-t border-gray-100">
            <button
              // onClick={handleReset}
              className=" w-36 text-[13px] px-8 xl:px-8 py-2 md:py-1.5 border rounded font-medium shadow-md text-center hover:bg-text_light_gray/10 hover:shadow-lg"
            >
              Annulla
            </button>
            <button
              // onClick={handleApply}
              className=" w-36 text-[13px] px-8 xl:px-8 py-2 md:py-1.5 bg-primary hover:bg-primary/90 hover:shadow-xl  text-white font-medium rounded shadow-lg"
            >
              Cancella
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
