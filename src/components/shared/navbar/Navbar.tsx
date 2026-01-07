"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { BlackLogo } from "../logo/logo";
import { ChevronDown } from "lucide-react";
import globe from "@/assets/home/globe.svg";
import profilebar from "@/assets/home/profile.svg";
import Image from "next/image";
import login from "@/assets/home/navbar/login.svg";
import register from "@/assets/home/navbar/register.svg";
import partnership from "@/assets/home/navbar/pertnership.svg";
import profile from "@/assets/home/navbar/profilo.svg";
import insertVehicle from "@/assets/home/navbar/inserisci-veicolo.svg";
import ownerDashboardIcon from "@/assets/home/navbar/veicoli.svg";
import esci from "@/assets/home/navbar/esci.svg";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/slice/userSlice";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useGetMyProfileQuery, useLogoutMutation } from "@/redux/api/authApi";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Veicoli", path: "/veicoli" },
  { label: "Marchi", path: "/marchi" },
  { label: "Benefici", path: "/benefici" },
  { label: "Recensioni", path: "/#recensioni" },
  { label: "Contatti", path: "/contatti" },
  { label: "FAQ", path: "/faq" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const token = Cookies.get("accessToken");
  const [logout] = useLogoutMutation();
  const { data: getProfile } = useGetMyProfileQuery({});
  const user = getProfile?.data;
  const isOwner = user?.isCarOwner;

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await logout({}).unwrap();

      if (res?.success) {
        // Remove token
        Cookies.remove("accessToken");

        // Clear Redux state
        dispatch(removeUser());

        // Redirect to login
        router.push("/login");

        // Success message
        toast.success("User logged out successfully");
      } else {
        throw new Error(res?.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout Error:", error);

      // Handle API errors properly
      const apiError = (
        error as {
          data?: { message?: string; errorMessages?: { message: string }[] };
        }
      )?.data;

      const errorMessage =
        apiError?.errorMessages?.map((err) => err.message).join(", ") ||
        apiError?.message ||
        "Failed to logout. Please try again.";

      toast.error(errorMessage);
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA] px-4 md:px-8 xl:px-16 2xl:px-10 py-6 border-b shadow-lg shadow-black/20">
      {/* <div className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA] px-4 md:px-8 xl:px-28 2xl:px-10 py-6 border-b shadow-lg shadow-black/40"> */}
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-between items-center w-full">
          {/* Hamburger Menu (Mobile) */}
          <div className="xl:hidden ml-2">
            {isMobileMenuOpen ? (
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={toggleMobileMenu}
              />
            ) : (
              <GiHamburgerMenu
                className="text-2xl cursor-pointer"
                onClick={toggleMobileMenu}
              />
            )}
          </div>

          <div className="ml-5 md:ml-0">
            <BlackLogo />
          </div>

          {/* Desktop Navigation */}
          <motion.ul
            className="hidden xl:flex font-medium gap-5 xl:gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delayChildren: 0.2, staggerChildren: 0.1 },
              },
            }}
          >
            {navLinks.map((link, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.path}
                  className="xl:font-medium text-base xl:text-base hover:text-primary transition"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <div className="flex items-center md:justify-between">
            {/* Language and Currency */}
            <div className="flex items-center space-x-1 md:space-x-4">
              <button className="flex items-center space-x-1 text-base font-medium">
                <Image
                  src={globe}
                  alt="globe"
                  width={20}
                  height={20}
                  className="w-5 h-5 mr-2"
                />
                <span className="hidden md:inline text-base">Italiano</span>
                <ChevronDown className="hidden md:inline w-4 h-4" />
              </button>

              {/* Currency Selector */}
              <button className="hidden md:flex items-center space-x-1 text-base font-medium">
                <span>CHF</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="relative" ref={dropdownRef}>
                {/* Dropdown Trigger */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="focus:outline-none mt-2"
                >
                  <Image
                    src={profilebar}
                    alt="Profile"
                    width={500}
                    height={500}
                    className="w-12 md:w-16 h-8 cursor-pointer"
                  />
                </button>

                {/* Dropdown Content */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#FAFAFA] shadow-lg rounded z-50">
                    <div className="px-1.5 py-3">
                      {token ? (
                        <div className="flex flex-col items-start">
                          {/* Profilo */}
                          <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-right text-sm px-4 py-2 hover:bg-primary/5 rounded font-normal flex items-center gap-3"
                          >
                            <Image
                              src={profile}
                              alt="profile icon"
                              width={100}
                              height={100}
                              className="w-3.5 h-3.5"
                            />
                            Profilo
                          </Link>

                          {/* Inserisci Veicolo */}
                          <Link
                            href="/vehicle-insert"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-right text-sm px-4 py-2 hover:bg-primary/5 rounded font-normal flex items-center gap-3"
                          >
                            <Image
                              src={insertVehicle}
                              alt="insertVehicle icon"
                              width={100}
                              height={100}
                              className="w-3.5 h-3.5"
                            />
                            Inserisci Veicolo
                          </Link>

                          <Separator className="my-2 w-40 mx-auto bg-[#BCC3CE]" />

                          {/* Pertnership */}
                          <Link
                            href="/partnership"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-right text-sm px-4 py-2 hover:bg-primary/5 rounded font-normal flex items-center gap-2"
                          >
                            <Image
                              src={partnership}
                              alt="partnership icon"
                              width={100}
                              height={100}
                              className="w-5 h-5"
                            />
                            Partnership
                          </Link>

                          {/* New Step for Owners */}
                          {isOwner && (
                            <Link
                              href="/my-vehicles"
                              onClick={() => setIsOpen(false)}
                              className="w-full text-right text-sm px-4 py-2 hover:bg-primary/5 rounded font-normal flex items-center gap-3"
                            >
                              <Image
                                src={ownerDashboardIcon}
                                alt="owner dashboard icon"
                                width={100}
                                height={100}
                                className="w-3.5 h-3.5"
                              />
                              Veicoli
                            </Link>
                          )}

                          {/* Esci */}
                          <button
                            onClick={handleLogout}
                            className=" w-full text-right text-sm px-4 py-2 hover:bg-primary/5 rounded font-normal flex items-center gap-3"
                          >
                            <Image
                              src={esci}
                              alt="profile icon"
                              width={100}
                              height={100}
                              className="w-3 h-3"
                            />
                            Esci
                          </button>
                        </div>
                      ) : (
                        <div>
                          {/* Login */}
                          <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-right text-sm px-4 py-2 hover:bg-primary/5 rounded font-normal flex items-center gap-3"
                          >
                            <Image
                              src={login}
                              alt="login icon"
                              width={100}
                              height={100}
                              className="w-4 h-4"
                            />
                            Login
                          </Link>

                          {/* Register */}
                          <Link
                            href="/register"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-right text-sm px-4 py-2 hover:bg-primary/5 rounded font-normal flex items-center gap-3"
                          >
                            <Image
                              src={register}
                              alt="register icon"
                              width={100}
                              height={100}
                              className="w-4 h-4"
                            />
                            Registrati
                          </Link>

                          <Separator className="my-2 w-40 mx-auto bg-[#BCC3CE]" />

                          {/* Partnership */}
                          <div className="my-2 border-gray-300"></div>
                          <Link
                            href="/partnership"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-right text-sm px-4 py-2 hover:bg-primary/5 rounded font-normal flex items-center gap-3"
                          >
                            <Image
                              src={partnership}
                              alt="register icon"
                              width={100}
                              height={100}
                              className="w-5 h-5"
                            />
                            Partnership
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", stiffness: 50 }}
            className="xl:hidden bg-[#FAFAFA] absolute top-[78px] left-0 w-full z-50 shadow-lg"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  className="text-base font-thin font-out border-b px-4 py-2 shadow-sm"
                >
                  <Link
                    href={link.path}
                    className="hover:text-primary transition px-2 font-medium text-[15px]"
                    onClick={toggleMobileMenu}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
