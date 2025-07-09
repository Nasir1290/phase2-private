"use client";

import { SharedButton } from "@/components/shared/sharedButton/SharedButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { useState } from "react";
import search from "@/assets/home/search.svg";
import SuccessModal from "@/components/shared/modal/SuccessModal";
import swiss from "@/assets/swiss.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCreateUserMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SearchField from "@/components/shared/searchField/SearchField";

const RegisterPage = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode] = useState("ch");
  const [createUser] = useCreateUserMutation();
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Extract form data
    const formData = new FormData(e.target as HTMLFormElement);
    const formObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    // Validate password: use confirm-password only for validation
    if (formObject["password"] !== formObject["confirm-password"]) {
      setPasswordError("Le password non corrispondono!");
      console.error("Password mismatch error");
      return;
    }
    setPasswordError(null);
    delete formObject["confirm-password"];
    formObject["phoneNumber"] = phoneNumber;

    try {
      const res = await createUser(formObject).unwrap();
      if (res.success === true) {
        setIsSuccessModalOpen(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      const apiError = (
        error as {
          data?: { message?: string; errorMessages?: { message: string }[] };
        }
      )?.data;

      const errorMessage =
        apiError?.errorMessages?.map((err) => err.message).join(", ") ||
        apiError?.message ||
        "An unexpected error occurred";

      toast.error(errorMessage);
    }
  };

  const toggleSuccessModal = () => {
    setIsSuccessModalOpen(!isSuccessModalOpen);
  };

  const handleSearchResult = (
    result: string,
    longitude: number,
    latitude: number
  ) => {
    // Create the URL with the search parameters
    const newUrl = `/veicoli?latitude=${latitude}&longitude=${longitude}`;

    // Update the URL without reloading the page
    router.push(newUrl);
  };

  return (
    <div>
      {/* Search Part */}
      <div className="bg-section_bg h-40 hidden md:flex items-center justify-center">
        <div className="container mx-auto px-4 pt-12 pb-10 flex gap-2 mb-4 w-[800px]">
          <SearchField
            onResult={handleSearchResult}
            countryList={["Svizzera", "Italy"]}
            searchIcon={search}
            flagIcon={swiss}
          />
        </div>
      </div>
      {/* Register Part */}
      <div className="container mx-auto py-16 flex flex-col xl:flex-row items-start justify-between gap-20 xl:gap-0">
        {/* Header Section */}
        <div className="xl:w-1/2 space-y-10">
          <header className="max-w-[370px] text-start">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-text_light_gray uppercase">
                NETWORK
              </span>
              <h1 className="text-3xl md:text-[30px] font-extrabold">
                Registrati <span className="text-red">gratuitamente</span>{" "}
                <br />
                su bittengo.org
              </h1>
            </div>
          </header>
          <p className="text-text_light_gray font-normal text-sm">
            Registrati gratuitamente su Bittengo.org e scopri un nuovo modo di
            noleggiare o offrire veicoli in totale sicurezza. Se cerchi
            un&apos;auto o un furgone, potrai accedere a un’ampia selezione di
            mezzi da fornitori affidabili con un rating minimo di 4.5,
            confrontare tariffe trasparenti e ricevere supporto 7 giorni su 7.
            Se invece sei un’azienda, potrai pubblicare i tuoi veicoli, ricevere
            richieste dirette da clienti interessati e aumentare la visibilità
            della tua attività. Con Bittengo, il noleggio diventa semplice,
            veloce e senza sorprese. Registrati ora e inizia subito a noleggiare
            oppure guadagnare con i tuoi veicoli.
          </p>
          <p className="text-text_light_gray font-normal text-sm">
            Sei un azienda?{" "}
            <Link
              href="/partnership"
              className="text-red underline font-medium"
            >
              Partnership
            </Link>
          </p>
        </div>

        {/* Registration Form */}
        <div className="xl:w-1/2 max-w-[480px] flex justify-center items-center">
          <div className="p-5 md:p-8 border rounded-xl shadow-lg space-y-5 w-full items-end">
            <h2 className="font-bold text-xl mb-8">Registrati</h2>
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Name */}
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="name" className="font-normal">
                  Nome
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="firstName"
                  className="shadow-md rounded-lg w-full border"
                  required
                />
              </div>
              {/* Cognome */}
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="cognome" className="font-normal">
                  Cognome
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="shadow-md rounded-lg w-full border"
                  required
                />
              </div>
              {/* Email */}
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="email" className="font-normal">
                  E-mail
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className="shadow-md rounded-lg w-full border"
                  required
                />
              </div>
              {/* Phone Number */}
              <div className="grid w-full gap-4 mb-24">
                <Label htmlFor="phoneNumber" className="font-normal">
                  Numero di telefono
                </Label>
                <div className="flex gap-0 items-center border rounded-lg shadow-md">
                  <PhoneInput
                    country={countryCode}
                    onChange={(phone) => {
                      setPhoneNumber(phone);
                    }}
                    value={phoneNumber}
                    inputStyle={{
                      width: "100%",
                      border: "none",
                      padding: "1.4rem 4rem",
                      borderRadius: "1.5rem",
                    }}
                    buttonStyle={{
                      border: "none",
                      borderRadius: "0.375rem 0 0 0.375rem",
                      padding: "0.5rem",
                      backgroundColor: "transparent",
                    }}
                    containerClass="w-full"
                    placeholder="79 268 28 12"
                  />
                </div>
              </div>
              {/* Password Fields */}
              <div className="flex gap-5 justify-between">
                {/* Password */}
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="password" className="font-normal">
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    className="shadow-md rounded-lg w-full border"
                    required
                  />
                </div>
                {/* Confirm Password */}
                <div className="grid w-full items-center gap-3">
                  <Label htmlFor="confirm-password" className="font-normal">
                    Conferma password
                  </Label>
                  <Input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    required
                    className={`shadow-md rounded-lg w-full border ${
                      passwordError ? "border-red" : ""
                    }`}
                  />
                </div>
              </div>
              {passwordError && (
                <p className="text-red text-sm">{passwordError}</p>
              )}
              {/* Submit Button */}
              <SharedButton text="Registrati" cls="w-full" />
              <p className="mx-auto text-center text-text_light_gray text-[13px]">
                Hai già un account registrato?
                <Link href="/login" className="text-red font-medium">
                  {" "}
                  Accedi
                </Link>
              </p>
            </form>
            <Separator />
            <p className="text-center text-text_light_gray text-[13px]">
              Effettuando l&apos;accesso o creando un account accetti i 
              <Link href="/terms-condition" className="underline font-medium">
                Termini e le Condizioni
              </Link>
               e{" "}
              <Link
                href="/terms-condition/#privacy-policy"
                className="underline font-medium"
              >
                l&apos;Informativa sulla Privacy
              </Link>
            </p>
          </div>
          {/* Success Modal */}
          <SuccessModal
            isOpen={isSuccessModalOpen}
            toggleModal={toggleSuccessModal}
            messages={{
              title: "Registrazione avvenuta con successo",
              description:
                "Controlla la tua casella email, incluso lo spam, e clicca sul link di conferma per attivare il tuo account.",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
