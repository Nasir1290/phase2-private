"use client";

import Image from "next/image";
import profilePicture from "@/assets/user.jpg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Modal from "@/components/shared/modal/Modal";
import Cookies from "js-cookie";
import { useDeleteProfileMutation, useGetMyProfileQuery, useRemoveProfilePictureMutation, useUpdateProfileMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SlArrowDown } from "react-icons/sl";

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  indirizzo: string;
  cap: string;
  cantone: string;
  profilePic: File | undefined;
};

export default function ProfileEditor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countryCode] = useState("ch");
  const { data: getProfile } = useGetMyProfileQuery({});
  const user = getProfile?.data;

  const [formData, setFormData] = useState<TFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    indirizzo: "",
    cap: "",
    cantone: "",
    profilePic: undefined,
  });

  useEffect(() => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      indirizzo: user?.indirizzo || "",
      cap: user?.cap || "",
      cantone: user?.cantone || "",
      profilePic: user?.profilePic || profilePicture,
    });
  }, [user]);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [deleteUser] = useDeleteProfileMutation();
  const [removeProfilePicture] = useRemoveProfilePictureMutation();
  const [updateProfile] = useUpdateProfileMutation({});

  const router = useRouter();
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDeleteUser = async () => {
    try {
      const token = user?.token || "your_token_here";
      const response = await deleteUser(token).unwrap();
      toast.success(response.message || "User deleted successfully");
      localStorage.removeItem("accessToken");
      Cookies.remove("accessToken");
      toggleModal();
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error deleting user", error);
      toast.error(error?.data?.message || "Error deleting user");
    }
  };

  // Remove Profile Picture
  const handleRemoveProfilePicture = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await removeProfilePicture(token).unwrap();
      toast.success(response.message || "Profile picture removed successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error removing profile picture", error);
      toast.error(error?.data?.message || "Error removing profile picture");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCantoneChange = (value: string) => {
    setFormData({ ...formData, cantone: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData({ ...formData, profilePic: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    if (selectedImage && formData?.profilePic) {
      formDataToSubmit.append("profilePic", formData?.profilePic);
    }

    // Object.entries(formData).forEach(([key, value]) => {
    //   if (value && value !== user[key as keyof typeof user]) {
    //     console.log(formDataToSubmit);
    //     formDataToSubmit.append(key, value);
    //   }
    // });

    // const data = {
    //   firstName: formData?.firstName,
    //   lastName: formData?.lastName,
    //   email: formData?.email,
    //   phoneNumber: formData?.phoneNumber,
    //   indirizzo: formData?.indirizzo,
    //   cap: formData?.cap,
    //   cantone: formData?.cantone,
    // };

    // Object.entries(data).forEach(([key, value]) => {
    //   if (value && value !== user[key as keyof typeof user]) {
    //     formDataToSubmit.append(key, value);
    //   }
    // });

    if (formData?.firstName) {
      formDataToSubmit.append("firstName", formData.firstName);
    }

    if (formData?.lastName) {
      formDataToSubmit.append("lastName", formData.lastName);
    }
    if (formData?.phoneNumber) {
      formDataToSubmit.append("phoneNumber", formData.phoneNumber);
    }

    if (formData?.indirizzo) {
      formDataToSubmit.append("indirizzo", formData.indirizzo);
    }
    if (formData?.cap) {
      formDataToSubmit.append("cap", formData.cap);
    }
    if (formData?.cantone) {
      formDataToSubmit.append("cantone", formData.cantone);
    }

    try {
      const response = await updateProfile(formDataToSubmit).unwrap();
      toast.success(response.message || "Profile updated successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error updating profile", error);
      toast.error(error?.data?.message || "Error updating profile");
    }

    setIsEditing(false);
  };
  return (
    <div className="mx-auto my-8 md:my-16 lg:my-24">
      <h2 className="text-xl font-bold mb-8">Profilo</h2>
      <div className="space-y-12 md:space-y-16 lg:space-y-20 xl:space-y-28">
        {/* Profile Box */}
        <div className="pb-2 border border-black/5 shadow-xl shadow-black/10 w-[360px] sm:w-[360px] px-4 py-2 sm:px-8 rounded-xl">
          <div className="flex items-center gap-6 py-6">
            <label htmlFor="fileInput" className="cursor-pointer">
              <Image
                src={selectedImage || user?.profilePic || profilePicture}
                alt="Profile picture"
                width={80}
                height={80}
                className="rounded-full w-20 h-20 md:w-24 md:h-24 bg-black object-cover"
              />
            </label>
            <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <div className="flex flex-col gap-5">
              <p className="font-medium text-base">
                {user?.firstName} {user?.lastName}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => document.getElementById("fileInput")?.click()}
                  className="px-4 py-1.5 text-[13px] font-medium shadow-lg rounded-md border border-black/5 text-text_default"
                >
                  Modifica
                </button>
                <button
                  onClick={handleRemoveProfilePicture}
                  disabled={!user?.profilePic}
                  className="px-4 py-1.5 text-[13px] font-medium shadow-lg rounded-md border border-black/5 text-text_default"
                >
                  Rimuovi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile form */}
        <div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-10 mb-20">
              {/* Nome */}
              <div className="space-y-4">
                <Label htmlFor="nome" className="font-normal">
                  Nome
                </Label>
                <Input
                  id="nome"
                  className="h-12 shadow-md rounded-xl border border-gray-100"
                  defaultValue={user?.firstName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>

              {/* Cognome */}
              <div className="space-y-4">
                <Label htmlFor="cognome" className="font-normal">
                  Cognome
                </Label>
                <Input
                  id="cognome"
                  className="h-12 shadow-md rounded-xl border border-gray-100"
                  defaultValue={user?.lastName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>

              {/* Email */}
              <div className="space-y-4">
                <Label htmlFor="email" className="font-normal">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="h-12 shadow-md rounded-xl border border-gray-100"
                  defaultValue={user?.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>

              {/* Telefono */}
              <div className="space-y-4">
                <Label htmlFor="telefono" className="font-normal">
                  Telefono
                </Label>

                <PhoneInput
                  country={countryCode}
                  onChange={(phone) => setFormData({ ...formData, phoneNumber: phone })}
                  value={formData.phoneNumber || user?.phoneNumber || ""}
                  inputStyle={{
                    width: "100%",
                    padding: "1.5rem 4rem",
                    borderRadius: "0.6rem",
                    border: "none",
                    outline: "none",
                    boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
                  }}
                  buttonStyle={{
                    border: "none",
                    borderRadius: "2rem 0 0 2rem",
                    padding: "0.5rem",
                    backgroundColor: "transparent",
                  }}
                  containerClass="w-full"
                />
              </div>

              {/* Indirizzo */}
              <div className="space-y-4">
                <Label htmlFor="indirizzo" className="font-normal">
                  Indirizzo
                </Label>
                <Input
                  id="indirizzo"
                  name="indirizzo"
                  type="text"
                  className="h-12 shadow-md rounded-xl border border-gray-100"
                  value={formData.indirizzo}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center gap-5">
                {/* Cap */}
                <div className="space-y-4 w-1/3">
                  <Label htmlFor="cap" className="font-normal">
                    Cap
                  </Label>
                  <Input
                    id="cap"
                    name="cap" // Add name attribute to match formData key
                    type="number"
                    className="h-12 shadow-md rounded-xl border border-gray-100"
                    value={formData.cap} // Use value to bind the field to formData
                    onChange={handleChange} // Ensure onChange updates the formData correctly
                  />
                </div>

                {/* Cantone */}
                <div className="space-y-4 w-2/3">
                  <Label htmlFor="cantone" className="font-normal">
                    Cantone
                  </Label>

                  <div className="relative">
                    <select
                      id="cantone"
                      defaultValue={user?.cantone}
                      value={formData?.cantone || ""}
                      onChange={(e) => handleCantoneChange(e.target.value)}
                      className="h-12 shadow-md rounded-xl border border-gray-100 bg-white text-sm placeholder:text-neutral-500 w-[240px] sm:w-[244px] lg:w-[264px] xl:w-[364px] 2xl:w-96 px-4 pr-12 appearance-none"
                    >
                      <option value=""> </option>
                      <option value="Argovia">Argovia</option>
                      <option value="Appenzello Esterno">Appenzello Esterno</option>
                      <option value="Appenzello Interno">Appenzello Interno</option>
                      <option value="Basilea Campagna">Basilea Campagna</option>
                      <option value="Basilea Città">Basilea Città</option>
                      <option value="Berna">Berna</option>
                      <option value="Friburgo">Friburgo</option>
                      <option value="Ginevra">Ginevra</option>
                      <option value="Glarona">Glarona</option>
                      <option value="Grigioni">Grigioni</option>
                      <option value="Giura">Giura</option>
                      <option value="Lucerna">Lucerna</option>
                      <option value="Neuchâtel">Neuchâtel</option>
                      <option value="Nidvaldo">Nidvaldo</option>
                      <option value="Obvaldo">Obvaldo</option>
                      <option value="San Gallo">San Gallo</option>
                      <option value="Sciaffusa">Sciaffusa</option>
                      <option value="Soletta">Soletta</option>
                      <option value="Svitto">Svitto</option>
                      <option value="Ticino">Ticino</option>
                      <option value="Turgovia">Turgovia</option>
                      <option value="Uria">Uria</option>
                      <option value="Vallese">Vallese</option>
                      <option value="Vaud">Vaud</option>
                      <option value="Zugo">Zugo</option>
                      <option value="Zurigo">Zurigo</option>
                    </select>

                    {/* Custom Icon */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary pointer-events-none">
                      <SlArrowDown size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />
            {/* Buttons */}
            <div className="flex flex-row justify-between items-center pt-4 mt-10 gap-4">
              <button type="button" onClick={toggleModal} className="text-[15px] underline">
                Cancella profilo
              </button>
              <button type="submit" className="bg-primary text-white px-12 py-2 text-sm font-medium rounded-sm">
                SALVA
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Cancella profilo</h2>
        <p className="text-sm mb-4 sm:mb-8">Questa operazione è irreversibile. Sei sicuro di voler cancellare il tuo profilo?</p>
        <Separator />
        <div className="flex justify-between items-center gap-4 mt-4 sm:mt-8">
          <button onClick={toggleModal} className="bg-white border shadow-md w-36 px-6 py-2 rounded-md text-sm">
            No
          </button>
          <button onClick={handleDeleteUser} className="shadow-md w-36 px-6 py-2 rounded-md bg-primary text-white text-sm">
            Si, cancella
          </button>
        </div>
      </Modal>
    </div>
  );
}
