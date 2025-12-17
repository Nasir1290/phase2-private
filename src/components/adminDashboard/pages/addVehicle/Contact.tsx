/* eslint-disable @typescript-eslint/no-explicit-any */
import { VehicleInsertionHeader } from "@/components/shared/sectionHeader/SectionHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CgClose } from "react-icons/cg";
import infoIcon from "@/assets/vehicleInsertion/punto-info.svg";
import email from "@/assets/vehicleInsertion/email.svg";
import whatsapp from "@/assets/vehicleInsertion/whatsapp.svg";
import { VehicleFormData } from "@/types/vehiclStep";
import MapComponent from "@/components/vehicleInsert/mapComponent/MapComponent";
import Loading from "@/components/shared/loading/Loading";
import { useGetUsersQuery } from "@/redux/api/authApi";

interface ContactProps {
  formData: VehicleFormData;
  onFormChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const Contact = ({ formData, onFormChange }: ContactProps) => {
  const [countryCode, setCountryCode] = useState("ch");
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber || "");
  const [openModal, setOpenModal] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    if (formData.phoneNumber) {
      setPhoneNumber(formData.phoneNumber);
    }
  }, [formData.phoneNumber]);
  const toggleModal = () => setOpenModal(!openModal);

  const handleResult = (
    result: string,
    longitude: number,
    latitude: number
  ) => {
    onFormChange({
      target: { id: "location", value: result },
    } as unknown as React.ChangeEvent<HTMLInputElement>);

    onFormChange({
      target: { id: "longitude", value: longitude },
    } as unknown as React.ChangeEvent<HTMLInputElement>);

    onFormChange({
      target: { id: "latitude", value: latitude },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };
  // User search functionality
  const { data: userdata, isLoading } = useGetUsersQuery({
    searchTerm: debouncedSearchTerm,
  });

  const debouncedSearch = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Increased debounce time for better performance

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const filteredUsers = Array.isArray(userdata?.data)
    ? userdata?.data.filter((user: any) => {
        const fullName = `${user.firstName} ${
          user.lastName || ""
        }`.toLowerCase();
        return fullName.includes(debouncedSearchTerm.toLowerCase());
      })
    : [];

  const handleUserSelect = (user: {
    firstName: string;
    lastName: string | null;
    id: string;
    phoneNumber?: string;
    email?: string;
  }) => {
    const fullName = `${user.firstName} ${user.lastName || ""}`.trim();
    setSearchTerm(fullName);
    setIsDropdownOpen(false);

    // Create synthetic events for each field
    const changes = [
      { id: "advertiserName", value: fullName },
      { id: "ownerId", value: user.id }, // This is the critical one
      ...(user.phoneNumber
        ? [{ id: "phoneNumber", value: user.phoneNumber }]
        : []),
      ...(user.email ? [{ id: "email", value: user.email }] : []),
    ];

    // Dispatch each change
    changes.forEach((change) => {
      onFormChange({
        target: {
          id: change.id,
          value: change.value,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // Update phone number state if available
    if (user.phoneNumber) {
      setPhoneNumber(user.phoneNumber);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);

    // Update form data as user types
    onFormChange({
      target: {
        id: "advertiserName",
        value: e.target.value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const handleInputFocus = () => {
    if (searchTerm && filteredUsers.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  return (
    <div>
      {/* Contact Information */}
      <VehicleInsertionHeader
        title="Contatto"
        subtitle="Gestisci le tue opzioni di contatto in modo rapido e semplice"
      />

      {/* Contact Info  */}
      <div className="space-y-10">
        {/* Name of the inserter */}
        <div className="space-y-4">
          <Label htmlFor="contactName" className="font-normal">
            Nome dell&apos;inserzionista
          </Label>
          <div className="relative flex flex-col gap-3 w-[280px]">
            <Input
              id="advertiserName"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              className="border border-black/5 shadow-lg shadow-black/10 p-5 rounded-lg"
              value={searchTerm || formData.advertiserName || ""}
              placeholder="Search for User"
              autoComplete="off"
            />
            {loading && (
              <div className="absolute top-full left-0 mt-1 w-full z-20">
                <Loading />
              </div>
            )}

            {isDropdownOpen &&
              searchTerm &&
              filteredUsers.length > 0 &&
              !loading && (
                <div className="absolute top-full left-0 mt-1 w-full z-20 bg-white text-black shadow-md rounded-lg border max-h-60 overflow-y-auto">
                  <ul>
                    {filteredUsers.map((user: any) => (
                      <li
                        key={user.id}
                        className="text-sm px-4 py-2 text-black hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleUserSelect(user)}
                      >
                        {user.firstName} {user.lastName || ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {isDropdownOpen &&
              searchTerm &&
              filteredUsers.length === 0 &&
              !loading && (
                <div className="absolute top-full left-0 mt-1 w-full z-20 bg-white shadow-md rounded-lg border text-sm">
                  <p className="px-4 py-2 text-gray-500">
                    No suggestions found
                  </p>
                </div>
              )}
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-10">
          {/* Phone number */}
          <div className="space-y-4">
            <Label htmlFor="phone" className="font-normal">
              Numero di telefono
            </Label>
            <div className="flex gap-0 items-center border rounded-lg shadow-lg">
              <PhoneInput
                country={countryCode}
                value={phoneNumber}
                onChange={(phone, data) => {
                  if ("dialCode" in data) {
                    setCountryCode(data.countryCode);
                    setPhoneNumber(phone);
                    onFormChange({
                      target: { id: "phoneNumber", value: phone },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }
                }}
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
                src={email}
                alt="email"
                className="z-10 absolute top-3.5 left-4 rounded-lg w-6 h-6"
              />
              <Input
                id="email"
                value={formData.email}
                onChange={onFormChange}
                className="relative border shadow-md w-72 rounded-lg px-12 py-6"
                placeholder="email@hotmail.com"
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div className="space-y-5 ">
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
                className="w-4 h-4 opacity-80 mr-1 cursor-pointer"
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
                id="whatsapp"
                value={formData.whatsapp}
                onChange={onFormChange}
                className="relative border shadow-md w-72 rounded-lg pl-[108px] pr-5 py-6"
                placeholder="41792682812"
              />
            </div>
          </div>
        </div>
        <div className="relative space-y-4 w-1/2">
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

      {/* WhatsApp Info Modal */}
      {openModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div
            className="bg-white p-6 rounded-2xl shadow-xl max-w-[300px] mx-auto relative min-w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-lg text-gray-500 hover:text-primary"
            >
              <CgClose size={15} />
            </button>
            <h2 className="text-xl font-medium">Whatsapp</h2>
            <p className="text-sm text-gray-600 mt-4">
              Inserisci il tuo numero con il prefisso internazionale senza
              spazi.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
