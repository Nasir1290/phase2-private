import CookiesBox from "@/components/shared/cookies/CookiesBox";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import React, { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>
        <Navbar />
        <div className="relative">
          {children}
          <div className="fixed bottom-10 w-full z-10">
            <CookiesBox />
          </div>
        </div>
        <Toaster />
        <Footer />
      </div>
    </>
  );
};

export default CommonLayout;
