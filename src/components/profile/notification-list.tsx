"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { X, User } from "lucide-react";
import logo from "@/assets/logo/logo.png";

interface Notification {
  id: string;
  type: "message" | "ad_status";
  sender?: string;
  message: string;
  avatarUrl?: StaticImageData;
  logoUrl?:  StaticImageData;
  isRead: boolean;
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      sender: "Barbara",
      message: "ti ha inviato un nuovo messaggio",
      avatarUrl: logo,
      isRead: false,
    },
    {
      id: "2",
      type: "message",
      sender: "Tiago Silva",
      message: "ti ha inviato un nuovo messaggio",
      avatarUrl: logo,
      isRead: false,
    },
    {
      id: "3",
      type: "ad_status",
      message: 'Il tuo annuncio "Maserati Ghibli" è stato rifiutato',
      logoUrl: logo,
      isRead: false,
    },
    {
      id: "4",
      type: "ad_status",
      message: 'Il tuo annuncio "Maserati Ghibli" è in fase di revisione',
      logoUrl: logo,
      isRead: false,
    },
    {
      id: "5",
      type: "ad_status",
      message: 'Il tuo annuncio "Maserati Ghibli" è stato approvato',
      logoUrl: logo,
      isRead: false,
    },
    {
      id: "6",
      type: "message",
      sender: "Barbara",
      message: "ti ha inviato un nuovo messaggio",
      avatarUrl: logo,
      isRead: true,
    },
    {
      id: "7",
      type: "message",
      sender: "Tiago Silva",
      message: "ti ha inviato un nuovo messaggio",
      avatarUrl: logo,
      isRead: true,
    },
    {
      id: "8",
      type: "ad_status",
      message: 'Il tuo annuncio "Maserati Ghibli" è stato rifiutato',
      logoUrl: logo,
      isRead: true,
    },
  ]);

  const deleteNotification = (idToDelete: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== idToDelete));
  };

  const newNotifications = notifications.filter((notif) => !notif.isRead);
  const pastNotifications = notifications.filter((notif) => notif.isRead);

  return (
    <div className="min-h-screen sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* New Notifications Section */}
        <div className="lg:mb-24">
          <h2 className="text-end text-primary mb-4 text-sm">Nuove notifiche ({newNotifications.length})</h2>
          <div className="space-y-5">
            {newNotifications.map((notif) => (
              <div key={notif.id} className="flex items-center md:gap-8 bg-white rounded-lg shadow-md border border-gray-100 p-4 relative">
                <div className="flex-shrink-0 mr-4">
                  {notif.type === "message" ? (
                    notif.avatarUrl ? (
                      <Image
                        src={notif.avatarUrl || "/placeholder.svg"}
                        alt={notif.sender || "User"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                    )
                  ) : notif.logoUrl ? (
                    <Image src={notif.logoUrl || "/placeholder.svg"} alt="Brand Logo" width={40} height={40} className="rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {/* Placeholder for brand logo if not provided */}
                      <span className="text-gray-500 text-xs">LOGO</span>
                    </div>
                  )}
                </div>
                <p className="flex-1 text-[#2D3134] text-base">
                  {notif.type === "message" ? (
                    <>
                      <span className="font-medium">{notif.sender}</span> {notif.message}
                    </>
                  ) : (
                    notif.message
                  )}
                </p>
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="absolute top-2 right-2 p-1  transition-colors  text-gray-400 hover:text-primary "
                  aria-label="Delete notification"
                >
                  <X  size={20} />
                </button>
               
              </div>
            ))}
          </div>
        </div>

        {/* Past Notifications Section */}
        <div className=""> 
          <h2 className="text-end text-[#AAAAAA] text-sm mb-4">Passate ({pastNotifications.length})</h2>
          <div className="space-y-5">
            {pastNotifications.map((notif) => (
              <div key={notif.id} className="flex items-center md:gap-8 bg-white rounded-lg shadow-md border border-gray-100 p-4 relative">
                <div className="flex-shrink-0 mr-4">
                  {notif.type === "message" ? (
                    notif.avatarUrl ? (
                      <Image
                        src={notif.avatarUrl || "/placeholder.svg"}
                        alt={notif.sender || "User"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                    )
                  ) : notif.logoUrl ? (
                    <Image src={notif.logoUrl || "/placeholder.svg"} alt="Brand Logo" width={40} height={40} className="rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {/* Placeholder for brand logo if not provided */}
                      <span className="text-gray-500 text-xs">LOGO</span>
                    </div>
                  )}
                </div>
                <p className="flex-1 text-gray-800 text-base">
                  {notif.type === "message" ? (
                    <>
                      <span className="font-medium">{notif.sender}</span> {notif.message}
                    </>
                  ) : (
                    notif.message
                  )}
                </p>
                <button
                  onClick={() => deleteNotification(notif.id)}
                       className="absolute top-2 right-2 p-1  transition-colors  text-gray-400 hover:text-primary "
                  aria-label="Delete notification"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
