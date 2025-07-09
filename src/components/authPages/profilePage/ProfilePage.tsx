"use client";

import { useState } from "react";
import Sicurezza from "./Sicurezza";
import Profilo from "./Profilo";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "sicurezza">(
    "profile"
  );

  return (
    <div className="container mx-auto mt-40">
      {/* Tab Navigation */}
      <div className="flex gap-20 border-b mb-4">
        <button
          className={`pr-4 py-2 font-medium ${
            activeTab === "profile" ? " text-red underline" : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profilo
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "sicurezza" ? " text-red underline" : ""
          }`}
          onClick={() => setActiveTab("sicurezza")}
        >
          Sicurezza
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && <Profilo />}
      {activeTab === "sicurezza" && <Sicurezza />}
    </div>
  );
};

export default ProfilePage;
