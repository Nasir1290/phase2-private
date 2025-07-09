"use client";

import React, { useEffect, useRef, useState } from "react";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { GiConfirmed } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { PiCarFill } from "react-icons/pi";
import TopBar from "../navigationBar/TopBar";
import SideBar from "../navigationBar/SideBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLink = [
    {
      name: "Requested Vehicles",
      href: "/dashboard/requested-vehicles",
      icon: VscGitPullRequestGoToChanges,
    },
    {
      name: "Accepted Vehicles",
      href: "/dashboard/accepted-vehicles",
      icon: GiConfirmed,
    },
    {
      name: "Vehicle Owners",
      href: "/dashboard/vehicle-owners",
      icon: FaUserTie,
    },
    { name: "Add Vehicles", href: "/dashboard/add-vehicle", icon: PiCarFill },
  ];

  return (
    <div className="flex">
      <div className="max-h-screen h-full sticky top-0 z-50">
        <SideBar
          navRef={navRef}
          navLink={navLink}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={null} // replace with user object if available
        />
      </div>
      <div className="w-full">
        <div className="sticky top-0 z-40">
          <TopBar setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        <div className="xl:p-8">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
