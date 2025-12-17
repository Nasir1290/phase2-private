"use client";

import edit from "@/assets/edit.svg";
import { Label } from "@/components/ui/label";

import { Modal } from "antd";
import { X } from "lucide-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleName: string;
}

export default function ReservationModal({ isOpen, onClose, vehicleName }: ReservationModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("79 268 28 12");
  const [countryCode] = useState("ch");
  // Dummy data for summary
  const summary = {
    checkInDate: "10/05/2025",
    checkInTime: "13:35",
    checkOutDate: "15/05/2025",
    checkOutTime: "20:35",
    deposit: 420,
    rentalPrice: 420,
    serviceCost: "GRATIS",
    total: 420,
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    // <ConfigProvider
    //   theme={{
    //     token: {
    //       colorPrimary: "#D1252B",
    //       colorLink: "#D1252B",
    //     },
    //   }}
    // >
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={900}
      className="reservation-modal"
      bodyStyle={{ backgroundColor: "#F8F8F8", borderRadius: 8, padding: 0 }}
      // closeIcon={<X className="w-5 h-5 text-gray-500 hover:" />}
      closeIcon={null}
      // title={}
    >
       <button
                onClick={onClose}
                className="text-gray-400 hover:text-primary ml-4 mt- absolute top-3 right-3"
              >
                <X size={20} />
              </button>
      <div className="text-center font-semibold text-lg pt-8 pb-2">Riserva {vehicleName}</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-6 text-[#000000]">
        {/* Left Column: Booking Summary */}
        <div className="bg-white p-6 rounded-lg font-normal">
          <h3 className="text-lg font-semibold mb-6">Riepilogo prenotazione</h3>
          <div className="space-y-5 ">
            <div className="flex items-center justify-between pb-6 border-b border-gray-300/80 border-dashed">
              <span className="font-semibold">Check-in</span>
              <div className="flex items-center gap-2">
                <span className="sm:mr-12 ">{summary.checkInDate}</span>
                <span className="sm:mr-9">{summary.checkInTime}</span>
                {/* <Edit className="w-4 h-4 text-primary cursor-pointer" /> */}
                <div className="w-3 h-3 cursor-pointer">
                  <img src={edit.src} alt="Edit" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pb-6 border-b  border-gray-300/80 border-dashed">
              <span className="font-semibold">Check-out</span>
              <div className="flex items-center gap-2">
                <span className="sm:mr-11">{summary.checkOutDate}</span>
                <span className="sm:mr-9">{summary.checkOutTime}</span>
                {/* <Edit className="w-4 h-4 text-primary cursor-pointer" /> */}
                <div className="w-3 h-3 cursor-pointer">
                  <img src={edit.src} alt="Edit" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pb-6 border-b  border-gray-300/80 border-dashed">
              <span className="">Deposito</span>
              <span className="font-semibold">{summary.deposit} CHF</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="">Noleggio 1 giorno</span>
              <span className="font-semibold">{summary.rentalPrice} CHF</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="">Costo del servizio</span>
              <span className="text-[#488D3F] font-semibold">{summary.serviceCost}</span>
            </div>
            <div className="flex items-center justify-between pt-8 border-t  border-gray-300/80 border-dashed">
              <span className="text-xl font-semibold ">Totale</span>
              <span className="text-xl font-semibold ">{summary.total} CHF</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Details Form */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold  mb-6">Inserisci i tuoi dati di contatto</h3>
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* <div>
                <p className="mb-2 font-medium">Numero di telefono</p>
                <Input.Group compact>
                  <Select defaultValue="+41" size="large" style={{ width: "25%" }} options={[{ value: "+41", label: "+41" }]} />
                  <Input
                    size="large"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="79 268 28 12"
                    style={{ width: "75%" }}
                    required
                  />
                </Input.Group>
              </div> */}

            <div className="grid w-full gap-3 ">
              <Label htmlFor="phoneNumber" className="font-normal">
                Numero di telefono
              </Label>

              <div className="flex gap-0 items-center border rounded-md">
                <PhoneInput
                  country={countryCode}
                  onChange={(phone) => {
                    setPhoneNumber(phone);
                  }}
                  value={phoneNumber}
                  inputStyle={{
                    width: "100%",
                    border: "none",
                    padding: "1.2rem 4rem",
                    borderRadius: "1 1rem 1rem 1",
                  }}
                  buttonStyle={{
                    border: "none",
                    borderRadius: "0.400rem 0 0 0.400rem",
                    padding: "0.5rem",
                    backgroundColor: "transparent",
                  }}
                  containerClass="w-full"
                  placeholder="79 268 28 12"
                />
              </div>
            </div>

            <div className="grid w-full items-center gap-3">
              <Label htmlFor="email" className="font-normal">
                E-mail
              </Label>
              <Input
                type="text"
                id="email"
                name="email"
                placeholder="Inserisci qui la tua e-mail"
                className=" focus:shadow-primary/10 rounded-lg w-full border"
              />
            </div>

            <div className="grid w-full gap-3">
              <Label htmlFor="message" className="font-normal">
                Richieste speciali
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Inserisci qui le tue richieste speciali..."
                className=" focus:shadow-primary/10 rounded-lg w-full"
              />
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-primary text-white font-semibold py-3 rounded-lg shadow-md transition-colors">
              RISERVA ORA
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">Non riceverai alcun addebito in questa fase</p>
          </form>
        </div>
      </div>
    </Modal>
    // </ConfigProvider>
  );
}
