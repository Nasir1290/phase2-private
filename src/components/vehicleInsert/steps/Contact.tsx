"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateFormData } from "@/redux/slice/vehicleInsertSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import emailIcon from "@/assets/vehicleInsertion/email.svg";
import whatsapp from "@/assets/vehicleInsertion/whatsapp.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import infoIcon from "@/assets/vehicleInsertion/punto-info.svg";
import upload from "@/assets/vehicleInsertion/carica.svg";
import { CgClose } from "react-icons/cg";
import MapComponent from "../mapComponent/MapComponent";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { useDropzone } from "react-dropzone";

interface ContactStepProps {
  errors: string[];
}
export function ContactStep({ errors }: ContactStepProps) {
  const dispatch = useDispatch();
  const hasError = (fieldName: string) => errors.includes(fieldName);
  const { formData } = useSelector((state: RootState) => state.form);
  const [openModal, setOpenModal] = useState(false);
  // const [countryCode] = useState("ch");
  const [advertiserName, setAdvertiserName] = useState<string | undefined>("");
  useEffect(() => {
    dispatch(updateFormData({ advertiserName }));
  }, [advertiserName, dispatch]);
  // Image state for authentication
  const [authenticationImage, setAuthenticationImage] = useState<string | null>(
    null
  );

  const { data: getme } = useGetMyProfileQuery({});

  const [phoneNumber, setPhoneNumber] = useState<string>(
    getme?.data?.phoneNumber || ""
  ); // Set initial phone number from Redux
  const [email, setEmail] = useState<string>(getme?.data?.email || "");

  useEffect(() => {
    if ((getme?.data?.firstName || getme?.data?.lastName) && !advertiserName) {
      setAdvertiserName(getme?.data?.firstName + " " + getme?.data?.lastName);
    }
    // if (getme?.data?.phoneNumber && !phoneNumber) {
    //   setPhoneNumber(getme?.data?.phoneNumber);
    // }
    // if (getme?.data?.email && !email) {
    //   setEmail(getme?.data?.email);
    // }
  }, [
    getme?.data?.firstName,
    getme?.data?.lastName,
    getme?.data?.phoneNumber,
    getme?.data?.email,
    advertiserName,
    phoneNumber,
    email,
  ]);
  useEffect(() => {
    // Dispatch formData updates
    dispatch(updateFormData({ advertiserName, phoneNumber, email }));
  }, [advertiserName, phoneNumber, email, dispatch]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        setAuthenticationImage(imageUrl);
        dispatch(updateFormData({ authenticationFile: file }));
      }
    },
    accept: { "image/*": [] }, // This is the correct format for accept
    multiple: false, // Only one file at a time
  });

  // Remove Authentication image
  const removeAuthenticationImage = () => {
    setAuthenticationImage(null);
    dispatch(updateFormData({ authenticationFile: null }));
  };

  const toggleModal = () => setOpenModal((prev) => !prev);

  useEffect(() => {
    dispatch(updateFormData({ phoneNumber: phoneNumber }));
  }, [phoneNumber, dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResult = (result: any, longitude: number, latitude: number) => {
    // Update formData with the selected location
    dispatch(
      updateFormData({
        location: result,
        longitude: longitude,
        latitude: latitude,
      })
    );
  };

  // Initialize the authentication image with formData if it's a valid file
  useEffect(() => {
    if (
      formData.authenticationFile &&
      formData.authenticationFile instanceof File
    ) {
      const imageUrl = URL.createObjectURL(formData.authenticationFile);
      setAuthenticationImage(imageUrl);
    }
  }, [formData.authenticationFile]);

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div>
        <VehicleInsertionHeader
          title="Contatto"
          subtitle="Gestisci le tue opzioni di contatto in modo rapido e semplice"
        />
        {/* Name of the inserter & Phone number */}
        <div className="space-y-10">
          {/* Name of the inserter */}
          <div className="space-y-4">
            <Label htmlFor="advertiserName" className="font-normal">
              Nome dell’inserzionista
            </Label>
            <Input
              required
              type="text"
              readOnly
              id="advertiserName"
              value={
                advertiserName ||
                `${getme?.data?.firstName}${
                  getme?.data?.lastName ? ` ${getme?.data?.lastName}` : ""
                }`
              }
              onChange={(e) =>
                setAdvertiserName(
                  e.target.value ||
                    `${getme?.data?.firstName}${
                      getme?.data?.lastName ? ` ${getme?.data?.lastName}` : ""
                    }`
                )
              }
              placeholder="Bittengo SAGL"
              className="border border-black/5 shadow-lg shadow-black/10 p-5 max-w-[280px] rounded-lg"
            />
          </div>

          <div className="flex flex-wrap items-end gap-10">
            {/* Phone number */}
            <div className="space-y-4">
              <Label htmlFor="phone" className="font-normal">
                Numero di telefono
              </Label>
              <div className="flex gap-0 items-center border rounded-lg shadow-lg">
                <PhoneInput
                  country="ch"
                  onChange={(phone) => setPhoneNumber(phone)}
                  value={phoneNumber}
                  inputStyle={{
                    width: "100%",
                    border: "none",
                    padding: "1.5rem 4.2rem",
                    borderRadius: "1.5rem 1.5rem 1.5rem 1.5rem",
                  }}
                  buttonStyle={{
                    border: "none",
                    borderRadius: "0.375rem 0 0 0.375rem",
                    padding: "0.5rem",
                    backgroundColor: "transparent",
                  }}
                  containerClass="w-full"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-4">
              <Label htmlFor="email" className="font-normal">
                E-mail
              </Label>
              <div className="relative">
                <Image
                  src={emailIcon}
                  alt="email"
                  className="z-10 absolute top-3.5 left-4 rounded-lg w-6 h-6"
                />
                <Input
                  required
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`relative border shadow-md w-72 rounded-lg px-12 py-6 ${
                    hasError("description") && !formData.description
                      ? "border-red"
                      : "border-black/5"
                  }`}
                  placeholder="email@hotmail.com"
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div className="space-y-5">
              <div className="flex gap-4 items-center justify-between">
                <Label htmlFor="whatsapp" className="font-normal">
                  Whatsapp
                </Label>
                <Image
                  onClick={toggleModal}
                  width={200}
                  height={200}
                  src={infoIcon}
                  alt="info"
                  className="w-4 h-4 opacity-80 mr-1 hover:cursor-pointer"
                />
              </div>

              <div className="relative">
                <Image
                  src={whatsapp}
                  alt="whatsapp"
                  className="z-10 absolute top-[13px] left-4 rounded-lg w-6 h-6"
                />
                <p className="z-10 absolute top-[13px] left-12">wa.me/</p>
                <Input
                  required
                  id="whatsapp"
                  type="number"
                  value={formData.whatsapp || ""} // Default to formData from Redux
                  onChange={(e) =>
                    dispatch(updateFormData({ whatsapp: e.target.value }))
                  }
                  className={`relative border shadow-md w-72 rounded-lg pl-[108px] pr-5 py-6`}
                  placeholder="41792682812"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Separator */}
      <div>
        <Separator className="my-20" />
      </div>
      {/* Ubicazione */}
      <div>
        <VehicleInsertionHeader
          title="Ubicazione"
          subtitle="Indica il luogo in cui si trova parcheggiato il veicolo"
        />
        {/* Ubicazione */}
        <div className="relative space-y-4">
          {/* <MapComponent onResult={handleResult} /> */}
          <MapComponent
            onResult={handleResult}
            initialLocation={formData.location} // Pass stored location
            initialCoords={{
              longitude: formData.longitude || 0,
              latitude: formData.latitude || 0,
            }}
          />
        </div>
      </div>
      {/* Separator */}
      <div>
        <Separator className="my-20" />
      </div>
      <div>
        <VehicleInsertionHeader
          title="Autentificazione"
          subtitle="Carica l'immagine della carta grigia del tuo veicolo"
        />
        <div
          className={`relative xl:w-2/5 aspect-video rounded-lg overflow-hidden border shadow-lg flex items-center justify-center ${
            hasError("description") && !formData.description
              ? "border-red"
              : "border-black/5"
          }`}
        >
          {authenticationImage ? (
            <div className="relative w-full h-full">
              <Image
                src={authenticationImage}
                alt="Authentication Image"
                layout="fill"
                className="object-cover"
              />
              <button
                onClick={removeAuthenticationImage}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className="w-full h-full flex flex-col items-center justify-center rounded-lg cursor-pointer transition-colors"
            >
              <input {...getInputProps()} />
              <Image src={upload} alt="upload" className="w-5 h-5" />
              <span className="text-sm text-gray-500 mt-4">
                Clicca o trascina l&apos;immagine
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Modal */}
      {openModal && (
        <div
          className="fixed -inset-8 bg-section_bg/60 flex justify-center items-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-xl shadow-black/20 max-w-[300px] mx-auto relative min-w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-lg text-gray-500 hover:text-red-500"
            >
              <CgClose size={15} />
            </button>

            {/* Modal Content */}
            <div className="p-3">
              <div className="flex items-center justify-start gap-3">
                <h2 className="text-xl font-medium">Whatsapp</h2>
                <Image
                  src={whatsapp}
                  alt="whatsapp"
                  width={200}
                  height={200}
                  className="w-6 h-6"
                />
              </div>
              <p className="text-sm text-text_light_gray mt-6">
                Per aggiungere il tuo collegamento a WhatsApp, inserisci il tuo
                numero di telefono con il prefisso internazionale, seguito dal
                numero, senza spazi e senza lo 0 iniziale.
              </p>
              <div className="flex items-center gap-2 text-sm mt-5">
                <p className="font-medium">Esempio: </p>
                <p>wa.me/41782480501</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <Separator className="my-20" />
      </div>
    </div>
  );
}
