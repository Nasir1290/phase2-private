"use client";

import { useState } from "react";

const tabs = [
  { id: "su-bittengo", label: "Su Bittengo", active: true },
  { id: "il-tuo-account", label: "Il tuo account", active: false },
  { id: "sicurezza", label: "Sicurezza", active: false },
  { id: "termini-policy", label: "Termini e policy", active: false },
];

const sidebarItems = [
  { id: "come-funziona", label: "Come funziona", active: true },
  { id: "la-nostra-missione", label: "La nostra missione", active: false },
  { id: "partnership", label: "Partnership", active: false },
];

export default function FAQDetail() {
  const [activeTab, setActiveTab] = useState("su-bittengo");
  const [activeSidebarItem, setActiveSidebarItem] = useState("come-funziona");

  return (
    <div className="bg-white min-h-screen mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-16">
        {/* Top Navigation Tabs */}
        <div className="flex flex-wrap gap-8 mb-6 sm:mb-20 border-b pb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                tab.id === activeTab ? "  text-[13px] px-8 xl:px-8 py-2 md:py-1.5 bg-primary hover:bg-primary/90 hover:shadow-xl  text-white font-medium rounded shadow-lg" : "text-[13px] px-8 xl:px-8 py-2 md:py-1.5 border rounded font-medium shadow-md text-center hover:bg-text_light_gray/10 hover:shadow-lg"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left Sidebar - Mobile: Full width, Desktop: Fixed width */}
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="shadow-lg rounded-xl p-4 sm:p-6  border border-black/5 shadow-black/10">
              <nav className="space-y-1 sm:space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSidebarItem(item.id)}
                    className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                      item.id === activeSidebarItem ? "text-primary bg-white font-medium" : "text-gray-700 hover:bg-white hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-10 sm:px-10   border border-black/5 shadow-black/10">
              <h1 className="text-xl sm:text-2xl font-semibold text-primary mb-6 sm:mb-8">Come funziona Bittengo ?</h1>

              <div className="space-y-6 sm:space-y-8">
                {/* First Section */}
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">Testo di prova</h2>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di
                    prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova
                    Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di
                    prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova
                    Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova.
                  </p>
                </div>

                {/* Second Section */}
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">Testo di prova</h2>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di
                    prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova
                    Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di
                    prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova
                    Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova Testo di prova.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
