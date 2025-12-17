"use client";

import logo from "@/assets/logo/logo.svg";
import bell from "@/assets/Notifiche in tempo reale.svg";
import sound from "@/assets/Suono delle notifiche.svg";
import { notification } from "antd";
import Image from "next/image";
import { useState } from "react";
import "./notification.css";

export default function NotificationSettings() {
  const [realtimeNotifications, setRealtimeNotifications] = useState(true);
  const [notificationSound, setNotificationSound] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const openBottomRightNotification = () => {
    api.open({
      placement: "bottomRight",
      duration: 3,
      className: "custom-notification", // Add custom class
      message: null,
      description: (
        <div className="flex items-start gap-4 p-">
          {/* LOGO */}
          <div className="flex-shrink-0 md:mt-[10px] md:mr-5">
            <Image
              src={logo} // ← change to your logo
              alt="Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>

          {/* TEXT */}
          <div>
            <p className="text-[18px] font-semibold text-black">
              Ciao <span className="font-bold">Bittengo SAGL!</span>
            </p>
            <p className="text-[15px] text-[#5A5A5A] leading-normal mt-">ecco come visualizzerai le tue notifiche future.</p>
          </div>
        </div>
      ),
    });
  };

  const playTestSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.play();
  };

  return (
    <div className="">
      {/* REQUIRED for antd notifications */}
      {contextHolder}

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Real-time Notifications */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-black">Notifiche in tempo reale</h3>
              <Image src={bell} alt="Notifiche" width={40} height={40} className="w-6 h-6" />
            </div>
            <p className="text-sm text-[#AAAAAA] leading-relaxed">
              Ricevi aggiornamenti immediati con notifiche pop-up nell&apos;angolo <br />
              inferiore destro mentre navighi
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            <button className="text-sm border-b border-black" onClick={openBottomRightNotification}>
              Prova
            </button>

            <button
              onClick={() => setRealtimeNotifications(!realtimeNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                realtimeNotifications ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  realtimeNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notification Sound */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-black">Suono delle notifiche</h3>
              <Image src={sound} alt="Suono notifiche" width={40} height={40} className="w-6 h-6" />
            </div>
            <p className="text-sm text-[#AAAAAA] leading-relaxed">
              Attiva un avviso sonoro per non perdere nessuna notifica <br />
              importante
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            <button className="text-sm border-b border-black" onClick={playTestSound}>
              Prova
            </button>

            <button
              onClick={() => setNotificationSound(!notificationSound)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSound ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSound ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
