/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal } from "antd";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface BillingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
}

export default function BillingModal({ isOpen, onClose }: BillingModalProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    //  try {
    //    const res = await loginUser(formObject).unwrap();

    //    if (res?.message === "OTP sent successfully.Verify your email address.") {
    //      setIsOtpModalOpen(true);
    //      return;
    //    }

    //    if (res?.message === "User logged in successfully") {
    //      if (res?.data?.accessToken) {
    //        Cookies.set("accessToken", res?.data?.accessToken);
    //        localStorage.setItem("accessToken", res?.data?.accessToken);
    //      }

    //      toast.success("Login successful!");
    //      router.push("/");
    //    }
    //  } catch (error) {
    //    const apiError = (
    //      error as {
    //        data?: { message?: string; errorMessages?: { message: string }[] };
    //      }
    //    )?.data;

    //    const errorMessage = apiError?.errorMessages?.map((err) => err.message).join(", ") || apiError?.message || "An unexpected error occurred";

    //    toast.error(errorMessage);
    //  }
  };

  return (
    <>
      <Modal
        title={null}
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={640}
        className="vehicle-filter-modal"
        closeIcon={null}
        styles={{
          body: { padding: 0 },
        }}
      >
        <div className="bg-white rounded-lg md:p-3">
          {/* Header */}
          <div className="flex justify-between items-start pb-4">
            <div>
              <h2 className="text-xl font-medium mb-2">Dati di fatturazione</h2>
              <p className="text-gray-500 text-sm mb-6">
                Inserisci le informazioni di fatturazione accurate per la gestione delle tue transazioni su Bittengo.
              </p>
            </div>
            <button
              onClick={() => {
                if (onClose) onClose();
              }}
              className="text-gray-400 hover:text-primary ml-4 mt- absolute top-3 right-3"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-2 gap-4  md:gap-6">
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="nome" className="font-normal">
                  Nome
                </Label>
                <Input type="text" id="nome" name="nome" className="shadow-md rounded-lg w-full border" />
              </div>

              <div className="grid w-full items-center gap-3">
                <Label htmlFor="cognome" className="font-normal">
                  Cognome
                </Label>
                <Input type="text" id="cognome" name="cognome" className="shadow-md rounded-lg w-full border" />
              </div>
            </div>
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="telefono" className="font-normal">
                Numero di telefono
              </Label>
              <Input type="text" id="telefono" name="telefono" className="shadow-md rounded-lg w-full border" />
            </div>
            {/* E-mail */}
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="email" className="font-normal">
                E-mail
              </Label>
              <Input type="email" id="email" name="email" className="shadow-md rounded-lg w-full border" />
            </div>
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="azienda" className="font-normal">
                <span>
                  Nome dell&apos;azienda <span className="text-gray-400 text-xs">(facoltativo)</span>
                </span>
              </Label>
              <Input type="text" id="azienda" name="azienda" className="shadow-md rounded-lg w-full border" />
            </div>
            {/* Indirizzo */}
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="indirizzo" className="font-normal">
                Indirizzo
              </Label>
              <Input type="text" id="indirizzo" name="indirizzo" className="shadow-md rounded-lg w-full border" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="cap" className="font-normal">
                  Cap
                </Label>
                <Input type="text" id="cap" name="cap" className="shadow-md rounded-lg w-full border" />
              </div>
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="luogo" className="font-normal">
                  Luogo{" "}
                </Label>
                <Input type="text" id="luogo" name="luogo" className="shadow-md rounded-lg w-full border" />
              </div>
            </div>

            {/* Submit Button */}
            {/* <SharedButton text="Accedi" cls="w-full" /> */}
            <div className="border-b py-2"></div>
          </form>

          {/* Footer */}
          <div className="flex justify-between items-center  pt-4 md:pt-8 border-t border-gray-100">
            <button
              // onClick={handleReset}
              className=" w-36 text-[13px] px-8 xl:px-8 py-2 md:py-1.5 border rounded font-medium shadow-md text-center hover:bg-text_light_gray/10 hover:shadow-lg"
            >
              Annulla
            </button>
            <button
              // onClick={handleApply}
              className=" w-36 text-[13px] px-8 xl:px-8 py-2 md:py-1.5 bg-primary hover:bg-primary/90 hover:shadow-xl  text-white font-medium rounded shadow-lg"
            >
              SALVA
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
