/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import MainNavLink from "./Navlink";
import { IoClose } from "react-icons/io5";

interface SideBarProps {
  user?: { name: string; role: string; image: string } | null;
  navRef?: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  navLink: any;
  onClose: () => void;
}

export default function SideBar({
  user,
  navRef,
  isOpen,
  navLink,
  onClose,
}: SideBarProps) {
  return (
    <>
      {/* Backdrop for mobile/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      <div ref={navRef} className="min-h-screen h-full flex">
        {/* Mobile / Tablet Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 border-r md:w-64 lg:hidden shadow-2xl h-full transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Header with Close Icon */}
          <div className="flex items-end justify-end bg-white">
            <button onClick={onClose} className="p-2">
              <IoClose className="w-6 h-6" />
            </button>
          </div>
          <MainNavLink navLink={navLink} user={user} />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-72 h-full border-r">
          <MainNavLink navLink={navLink} user={user} />
        </div>
      </div>
    </>
  );
}
