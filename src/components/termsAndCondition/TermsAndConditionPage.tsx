"use client";

import { useState, useEffect, useRef } from "react";
import TerminiCondizioni from "./TerminiCondizioni";
import PrivacyPolicy from "./PrivacyPolicyPage";

const TermsAndConditionPage = () => {
  const [activeTab, setActiveTab] = useState<
    "terminiCondizioni" | "privacyPolicy"
  >("terminiCondizioni");

  // Check if the URL contains the fragment identifier
  useEffect(() => {
    if (window.location.hash === "#privacy-policy") {
      setActiveTab("privacyPolicy");
    }
  }, []);

  const privacySectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToHelpSection = () => {
    const navbarHeight = 60; // Adjust this based on your navbar height

    if (privacySectionRef.current) {
      window.scrollTo({
        top: privacySectionRef.current.offsetTop - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Automatically scroll to section if the URL has a hash
    if (window.location.hash === "#privacy-policy") {
      scrollToHelpSection();
    }
  }, []);

  return (
    <div className="container mx-auto mt-32 xl:mt-40">
      {/* Tab Navigation */}
      <div
        ref={privacySectionRef}
        id="privacy-policy"
        style={{ paddingTop: "60px" }}
        className="flex gap-5 xl:gap-10 border-b mb-4 text-sm md:text-base"
      >
        <button
          className={`px-4 py-2 font-medium text-[15px] ${
            activeTab === "terminiCondizioni"
              ? "bg-red w-52 rounded-lg text-white mb-5 "
              : "w-52 border border-black/20 shadow-md py-3 mb-5 rounded-lg font-medium "
          }`}
          onClick={() => setActiveTab("terminiCondizioni")}
        >
          Termini e Condizioni
        </button>
        <button
          className={`px-4 py-2 font-medium text-[15px] ${
            activeTab === "privacyPolicy"
              ? "bg-red w-52 rounded-lg text-white mb-5 "
              : "w-52 border border-black/20 shadow-md py-3 mb-5 rounded-lg font-medium "
          }`}
          onClick={() => setActiveTab("privacyPolicy")}
        >
          Privacy Policy
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "terminiCondizioni" && <TerminiCondizioni />}
      {activeTab === "privacyPolicy" && <PrivacyPolicy />}
    </div>
  );
};

export default TermsAndConditionPage;
