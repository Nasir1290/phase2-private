"use client";
import { Modal } from "antd";
import { X } from "lucide-react";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { VehicleInsertionHeader } from "../shared/sectionHeader/SectionHeader";
import NotificationList from "./notification-list";
import NotificationSettings from "./notification/notification-settings";

const Notifiche = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className=" mx-auto space-y-4 my-8 md:my-16 lg:my-24">
      <div className="flex justify-between items-center gap-3 lg:mb-20">
        <div className=" ">
          <VehicleInsertionHeader className=" w-full" title="Notifiche" subtitle="Monitora e migliora i risultati in tempo reale" subtitleClassName="text-sm text-text_light_gray" />
        </div>
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex text-sm font-semibold text-primary uppercase items-center gap-1 hover:bg-primary/5 px-3 py-2 rounded-lg cursor-pointer"
        >
          <p>GESTISCI NOTIFICHE</p>
          <MdArrowForwardIos />
        </div>
        <Modal
          open={isModalOpen}
          footer={null}
          // closable={true}
      closeIcon={null}
          onCancel={() => setIsModalOpen(false)}
          width={700}
          centered
          className="in-cima-modal relative"
          style={{ borderRadius: "8px", overflow: "hidden" }}
        >
            <button
                onClick={() => {
                  if (isModalOpen) setIsModalOpen(false);
                }}
                className="text-gray-400 hover:text-primary ml-4 mt- absolute top-3 right-3"
              >
                <X size={20} />
              </button>

          <div className="px-2 pt-2 pb-6">
            {/* <VehicleInsertionHeader
              className="mt-3"
              title="Gestisci notifiche"
              subtitle="Personalizza le notifiche per rimanere sempre aggiornato. Ricevi avvisi in tempo reale per nuovi messaggi, richieste o attività rilevanti, così da non perdere mai nessuna opportunità o aggiornamento importante"
            /> */}

            <div className=" md:pt-4">
              <h2 className=" text-gray-900 mb-3 md:mb-6  text-lg sm:text-2xl font-semibold ">Gestisci notifiche</h2>
              <p className="text-sm text-[#AAAAAA] font-medium leading-4  border-gray-200 pb-4 md:pb-12">
                Personalizza le notifiche per rimanere sempre aggiornato. Ricevi avvisi in tempo reale per nuovi messaggi, richieste o attività
                rilevanti, così da non perdere mai nessuna opportunità o aggiornamento importante
              </p>
            </div>
            <NotificationSettings />
            <div className="flex justify-between items-center mt-8 border-t pt-8  ">
              <button
                onClick={() => setIsModalOpen(false)}
                className=" w-36 text-[13px] px-8 xl:px-8 py-2 md:py-1.5 border rounded font-medium shadow-md text-center hover:bg-text_light_gray/10 hover:shadow-lg"
              >
                Annulla
              </button>
              <button className=" w-36 text-[13px] px-8 xl:px-8 py-2 md:py-1.5 bg-primary hover:bg-primary/90 hover:shadow-xl  text-white font-medium rounded shadow-lg">
                Salva
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <NotificationList />
    </div>
  );
};

export default Notifiche;
