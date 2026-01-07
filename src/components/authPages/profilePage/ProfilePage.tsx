/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Drawer } from "antd";
import { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import Profilo from "./Profilo";
import Sicurezza from "./Sicurezza";
import ProfileComponent from "@/components/profile";
import FavoritesComponent from "@/components/profile/FavoritesComponent";
import Performance from "@/components/profile/Performance";
import Notifiche from "@/components/profile/Notifiche";
import { useRouter, useSearchParams } from "next/navigation";

const ProfilePage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tabs] = useState([
    "Profile",
    "Abbonamento",
    "Sicurezza",
    "Preferiti",
    "Performance",
    "Notifiche",
  ]);
  // const [activeTab, setActiveTab] = useState<"profile" | "sicurezza" | "Abbonamento" | "Preferiti" | "Notifiche" | "Performance">("profile");

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get active tab from query, default to "profile"
  const activeTab = searchParams.get("tab") || "Profile";

  const handleTabChange = (tab: string) => {
    router.push(`?tab=${tab}`); // updates query param
  };

  return (
    <div className="container mx-auto mt-40">
      {/* Tab Navigation */}
      <>
        <div className="hidden md:flex justify-between gap-3 border-b mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={` py-2 font-medium ${
                activeTab === tab ? " text-primary underline" : ""
              }`}
              // onClick={() => setActiveTab(tab as any)}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="md:hidden flex justify-between gap-3 border-b mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "sicurezza" ? " text-primary underline" : ""
            }`}
            onClick={() => setOpenDrawer(true)}
          >
            <RiMenu2Fill size={24} />
          </button>
          <Drawer
            title="Basic Drawer"
            closable={{ "aria-label": "Close Button" }}
            onClose={() => setOpenDrawer(false)}
            open={openDrawer}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`block px-4 py-2 font-medium ${
                  activeTab === tab ? " text-primary underline" : ""
                }`}
                onClick={() => {
                  handleTabChange(tab as any);
                  setOpenDrawer(false);
                }}
              >
                {tab}
              </button>
            ))}
          </Drawer>
        </div>
      </>

      {/* Tab Content */}
      {activeTab === "Profile" && <Profilo />}
      {activeTab === "Abbonamento" && <ProfileComponent />}
      {activeTab === "Sicurezza" && <Sicurezza />}
      {activeTab === "Preferiti" && <FavoritesComponent />}
      {activeTab === "Performance" && <Performance />}
      {activeTab === "Notifiche" && <Notifiche />}
    </div>
  );
};

export default ProfilePage;
