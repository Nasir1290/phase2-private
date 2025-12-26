"use client";

import { SharedButton } from "@/components/shared/sharedButton/SharedButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { useState } from "react";
import search from "@/assets/home/search.svg";
import Modal from "@/components/shared/modal/Modal";
import swiss from "@/assets/swiss.svg";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation, useLoginMutation, useVerifyUserMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import Cookies from "js-cookie";
import SearchField from "@/components/shared/searchField/SearchField";
const LoginPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [loginUser] = useLoginMutation();
  const [verifyUser] = useVerifyUserMutation();
  const [forgotPass] = useForgotPasswordMutation();
  const router = useRouter();
  // Handle form submission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    try {
      const res = await loginUser(formObject).unwrap();

      if (res?.message === "OTP sent successfully.Verify your email address.") {
        setIsOtpModalOpen(true);
        return;
      }

      if (res?.message === "User logged in successfully") {
        if (res?.data?.accessToken) {
          Cookies.set("accessToken", res?.data?.accessToken);
          localStorage.setItem("accessToken", res?.data?.accessToken);
        }

        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error) {
      const apiError = (
        error as {
          data?: { message?: string; errorMessages?: { message: string }[] };
        }
      )?.data;

      const errorMessage = apiError?.errorMessages?.map((err) => err.message).join(", ") || apiError?.message || "An unexpected error occurred";

      toast.error(errorMessage);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    try {
      const res = await verifyUser(formObject).unwrap();
      if (res.success == true) {
        setIsOtpModalOpen(false);
        toast.success(res.message);
        if (res?.data?.accessToken) {
          Cookies.set("accessToken", res?.data?.accessToken);
          localStorage.setItem("accessToken", res?.data?.accessToken);
        }
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    try {
      const res = await forgotPass(formObject).unwrap();
      if (res.success == true) {
        toast.success(res.message);
        setIsModalOpen(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    // setIsModalOpen(false);
    // setIsSuccessModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleOtpModal = () => {
    setIsOtpModalOpen(!isOtpModalOpen);
  };

  const handleSearchResult = (result: string, longitude: number, latitude: number) => {
    // Create the URL with the search parameters
    const newUrl = `/veicoli?latitude=${latitude}&longitude=${longitude}`;

    // Update the URL without reloading the page
    router.push(newUrl);
  };

  return (
    <div>
      {/* Search Part  */}
      <div className="bg-section_bg h-40 hidden md:flex items-center justify-center">
        <div className="container mx-auto px-4 pt-12 pb-10 flex gap-2 mb-4 w-[800px]">
          <SearchField onResult={handleSearchResult} countryList={["Svizzera", "Italy"]} searchIcon={search} flagIcon={swiss} />
        </div>
      </div>
      {/* Login Part  */}
      <div className="container mx-auto w-full py-16 flex flex-col xl:flex-row items-start justify-between gap-20 xl:gap-0">
        {/* Header Section  */}
        <div className="xl:w-1/2 space-y-10 ">
          <header className="max-w-2xl text-start">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-text_light_gray uppercase">INIZIA</span>
              <h1 className="text-3xl md:text-[30px] font-extrabold">
                Chi <span className="text-primary">siamo?</span>
              </h1>
            </div>
          </header>
          <p className="text-text_light_gray font-normal text-sm">
            Bittengo è il marketplace dedicato al noleggio di veicoli che unisce affidabilità, convenienza e semplicità. Collaboriamo esclusivamente
            con aziende selezionate che rispettano elevati standard di qualità, assicurandoti mezzi sempre in ottime condizioni e tariffe competitive.
            Il nostro obiettivo è offrirti un&apos;esperienza di noleggio trasparente e senza sorprese, con un supporto clienti attivo 7 giorni su 7
            per rispondere a ogni tua esigenza. Che tu abbia bisogno di un’auto per un viaggio o di un furgone per un trasloco, su Bittengo troverai
            la soluzione perfetta in pochi click. Scopri un nuovo modo di noleggiare, comodo, sicuro e su misura per te.
          </p>
          <p className="text-text_light_gray font-normal text-sm">
            Sei un azienda?{" "}
            <Link href="/partnership" className="text-primary underline font-medium">
              Partnership
            </Link>
          </p>
        </div>

        {/* Login Form  */}
        <div className="xl:w-1/2 max-w-[480px] flex justify-center items-center">
          <div className="p-5 md:p-8 border rounded-xl shadow-md space-y-5 w-full  items-end">
            <h2 className="font-bold text-xl mb-8">Accedi</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* E-mail */}
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="email" className="font-normal">
                  E-mail
                </Label>
                <Input type="email" id="email" name="email" className="shadow-md rounded-lg w-full border" />
              </div>

              {/* Password */}
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="password" className="font-normal">
                  Password
                </Label>
                <Input type="password" id="password" name="password" className="shadow-md rounded-lg w-full border" />
              </div>

              {/* Submit Button */}
              <SharedButton text="Accedi" cls="w-full" />
            </form>
            <p className="mx-auto text-center text-text_light_gray font-normal text-[13px]">
              Dimenticato la password?{" "}
              <button onClick={toggleModal} className="text-primary font-medium">
                {" "}
                ripristina
              </button>
            </p>
            <Separator />

            <p className="text-center text-text_light_gray font-normal text-[13px]">
              Effettuando l&apos;accesso o creando un account accetti i 
              <Link href="/terms-condition" className="underline font-medium">
                Termini e le Condizioni
              </Link>
               e{" "}
              <Link href="/terms-condition/#privacy-policy" className="underline font-medium">
                l&apos;Informativa sulla Privacy
              </Link>
            </p>
          </div>

          {/* Pass Reset Modal  */}
          <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
            <h2 className="font-bold text-xl mb-8">Ripristina password</h2>
            <form onSubmit={handleResetSubmit} className="space-y-7">
              {/* Email*/}
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="email" className="font-normal">
                  E-mail
                </Label>
                <Input type="email" id="email" name="email" className="shadow-md rounded-lg w-full border" />
              </div>
              {/* Submit Button */}
              <button className="bg-primary hover:bg-primary/80 text-white z-30 px-6 md:px-10 py-3 rounded-lg font-normal w-full">
                Ripristina password
              </button>
              <p className="mx-auto text-center text-text_light_gray text-xs">
                Inserisci il tuo indirizzo e-mail e ti invieremo un link <br /> per reimpostare la tua password.
              </p>
            </form>
          </Modal>
        </div>
      </div>

      {/* Verify Otp Modal  */}
      <Modal isOpen={isOtpModalOpen} toggleModal={toggleOtpModal}>
        <h2 className="font-bold text-xl mb-8">Invia OTP</h2>
        <form onSubmit={handleOtpSubmit} className="space-y-7">
          {/* Email*/}
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="email" className="font-normal">
              E-mail
            </Label>
            <Input type="email" id="email" name="email" className="shadow-md rounded-lg w-full border" />
          </div>
          {/* Otp  */}
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="email" className="font-normal">
              OTP
            </Label>
            <Input type="number" id="otp" name="otp" className="shadow-md rounded-lg w-full border" />
          </div>
          {/* Submit Button */}
          <button className="bg-primary hover:bg-primary/80 text-white z-30 px-6 md:px-10 py-3 rounded-lg font-normal w-full">Invia</button>
          <p className="mx-auto text-center text-text_light_gray text-xs">
            Abbiamo inviato un&apos;e-mail con un link per verificare il tuo account. Segui le istruzioni per completare la procedura. Se non ricevi
            l&apos;e-mail entro pochi minuti, controlla la cartella Spam o Promozioni. Quell&apos;OTP non sarà più valido dopo 5 minuti.
          </p>
        </form>
      </Modal>
    </div>
  );
};

export default LoginPage;
