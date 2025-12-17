"use client";

import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import Link from "next/link";

const CookiesBox = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cookiesAccepted = Cookie.get("cookies_accepted");
    if (cookiesAccepted) {
      setIsVisible(false);
    }
  }, []);

  const handleOkClick = () => {
    Cookie.set("cookies_accepted", "true", { expires: 365 });
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="bg-[#F4F4F4] px-8 lg:px-10 py-5 w-full xl:w-[760px] container mx-auto rounded-lg">
          <div className="flex justify-between items-center gap-4">
            <div className="text-sm font-medium text-black/90">
              Utilizziamo i cookie per assicurarvi la migliore esperienza sul nostro sitoweb.{" "}
              <Link href="/terms-condition/#privacy-policy" className="underline text-primary">
                Scopri di più.
              </Link>
            </div>
            <button className="text-sm font-medium bg-primary text-white px-8 py-2 rounded" onClick={handleOkClick}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiesBox;
