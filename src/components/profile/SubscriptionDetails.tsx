/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import cima from "@/assets/up.svg";
import risalto from "@/assets/risalto.svg";
import sagl from "@/assets/building.svg";
import home from "@/assets/home.svg";
import Image from "next/image";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import BillingModal from "./billing-modal";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { TUserData } from "@/types/global";

export default function SubscriptionDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userData } = useGetMyProfileQuery("");
  const user: TUserData = userData?.data;
  console.log(user);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (values: any) => {
    console.log("Form values:", values);
    setIsModalOpen(false);
  };
  return (
    <div className="">
      {/* Annunci Section */}
      <div className="mb-12">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Annunci
            </h2>
            <p className="text-text_light_gray text-sm">
              Promuovi i tuoi annunci e raggiungi più visibilità e clienti
            </p>
          </div>

          {/* <div className="flex items-center gap-2  text-sm font-semibold text-primary">
            <p> GESTISCI ANNUNCI </p>
            <FaChevronRight size={14} />
          </div> */}
          <div className="hidden md:flex text-sm font-semibold text-primary uppercase items-center gap-1 hover:bg-primary/5 px-3 py-2 rounded-lg cursor-pointer">
            GESTISCI ANNUNCI
            <MdArrowForwardIos />
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-16">
          {/* Annunci di noleggio attivi */}
          <div className="bg-white rounded-xl shadow-lg px-6 py-4 border border-black/5 shadow-black/10">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-[#AAAAAA] font-medium text-sm ">
                  Annunci di noleggio attivi
                </h3>
              </div>
              <div className="text-2xl font-bold text-gray-900">0/200</div>
            </div>
          </div>

          {/* Annunci in cima */}
          <div className="bg-white rounded-xl shadow-lg px-6 py-4 border border-black/5 shadow-black/10">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-[#AAAAAA] font-medium text-sm ">
                  Annunci in cima
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {user?.inCimaTimes}/15
                </span>
                {/* <Info className="w-5 h-5 text-gray-400" /> */}
                <Image
                  src={cima}
                  alt="Cima Icon"
                  className="w-5 h-5 text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Annunci in homepage */}
          <div className="bg-white rounded-xl shadow-lg px-6 py-4 border border-black/5 shadow-black/10">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-[#AAAAAA] font-medium text-sm">
                  Annunci in homepage
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {user?.inHomePageDays}/15
                </span>

                <Image
                  src={home}
                  alt="Home Icon"
                  className="w-5 h-5 text-gray-400 mb-[2px]"
                />
              </div>
            </div>
          </div>

          {/* Annunci in risalto */}
          <div className="bg-white rounded-xl shadow-lg px-6 py-4 border border-black/5 shadow-black/10">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-[#AAAAAA] font-medium text-sm">
                  Annunci in risalto
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {user?.inRisaltoDays}/15
                </span>
                {/* <Diamond className="w-5 h-5 text-gray-400" /> */}
                <Image
                  src={risalto}
                  alt="Risalto Icon"
                  className="w-5 h-5 text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dati di fatturazione Section */}
      <div>
        <div className="flex justify-between items-start mb-6 mt-24">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Dati di fatturazione
            </h2>
            <p className="text-text_light_gray text-sm">
              Modifica o aggiorna i dati di fatturazione
            </p>
          </div>

          <div
            onClick={handleOpenModal}
            className="hidden md:flex text-sm font-semibold text-primary uppercase items-center gap-1 hover:bg-primary/5 px-3 py-2 rounded-lg cursor-pointer"
          >
            GESTISCI FATTURAZIONE
            <MdArrowForwardIos />
          </div>
          <BillingModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        </div>

        {/* Billing Information Card */}
        <div className="bg-white rounded-lg  border-gray-200 py-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12  flex items-center justify-center">
              {/* <Building2 className="w-6 h-6 text-gray-600" /> */}
              <Image src={sagl} alt="SAGL Icon" className="w-11 h-11 " />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                Bittengo SAGL
              </h3>
              <p className=" text-sm">Via Massagno 17, 6900 Massagno</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
