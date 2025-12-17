import { Menu, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function TopBar({ isOpen, setIsOpen }: { isOpen?: boolean; setIsOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-between px-6 py-3 w-full">
        <button className="lg:hidden " onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>

        {/* Left Section */}
        <div className="lg:flex items-center gap-2 hidden h-14">
          <span className="hidden sm:inline text-2xl font-semibold text-black">
            Welcome Back, <span className="text-primary">Admin!</span>
          </span>
          <span className="text-xl">👋</span>
        </div>
      </div>
    </header>
  );
}
