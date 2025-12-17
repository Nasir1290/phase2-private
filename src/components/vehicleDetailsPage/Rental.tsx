/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { format, set } from "date-fns";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import calender from "@/assets/vehicleDetails/calender.svg";
import "react-phone-input-2/lib/style.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Textarea } from "../ui/textarea";
import { Car } from "@/types/cars";
import { SharedButton } from "../shared/sharedButton/SharedButton";
import SuccessModal from "../shared/modal/SuccessModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { it } from "date-fns/locale";
import { useRef } from "react";
import { useBookCarMutation } from "@/redux/api/carApi";
import ReservationModal from "./reservation-modal";

const Rental = ({ car }: { car: Car }) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [checkInTime, setCheckInTime] = useState<string>("13:30");
  const [checkOutTime, setCheckOutTime] = useState<string>("13:30");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode] = useState("ch");
  const [email, setEmail] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const [bookCar] = useBookCarMutation();

  const handleDateChange = (item: any) => {
    setDateRange([
      {
        startDate: item.selection.startDate || new Date(),
        endDate: item.selection.endDate || new Date(),
        key: "selection",
      },
    ]);
  };
  // Function to capitalize first letter
  const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  // Ensure localize exists before modifying it
  const customItLocale = {
    ...it,
    localize: {
      ...it.localize!,
      month: (n: number, options?: any) => capitalizeFirstLetter(it.localize!.month(n, options)),
      day: (n: number, options?: any) => capitalizeFirstLetter(it.localize!.day(n, options)),
    },
  };

  const handleSubmit = async () => {
    setIsModalOpen(true);
    const checkinDateFormatted = format(dateRange[0].startDate, "dd/MM/yyyy");
    const checkoutDateFormatted = format(dateRange[0].endDate, "dd/MM/yyyy");

    const bookingData = {
      carId: car.id, // Use car ID from the prop
      checkInDate: checkinDateFormatted,
      checkOutDate: checkoutDateFormatted,
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
      phoneNumber: phoneNumber,
      email: email,
      message: specialRequests || "",
    };

    try {
      const response = await bookCar(bookingData).unwrap();

      if (response.success) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  // Handle modal close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleMonthChange = (direction: "next" | "prev") => {
    if (!datePickerRef.current) return;

    const buttons = datePickerRef.current.querySelectorAll(".rdrNextPrevButton") as NodeListOf<HTMLElement>; // Explicitly cast to HTMLElement

    if (direction === "next" && buttons[1]) {
      (buttons[1] as HTMLElement).click(); // Click built-in "Next" button
    } else if (direction === "prev" && buttons[0]) {
      (buttons[0] as HTMLElement).click(); // Click built-in "Previous" button
    }
  };

  function handleCloseModal(): void {
    setIsModalOpen(false);
  }

  return (
    <div id="rentalVehicle" className="bg-[#F8F8F8] p-5 space-y-5 rounded-xl">
      <style jsx global>{`
        /* Adjusts the overall width and font size of each month */
        .rdrMonth {
          width: 100% !important;
          font-size: 14px;
        }

        /* Styles the entire calendar wrapper (background, border, shadow, and padding) */
        .rdrCalendarWrapper {
          background: white;
          width: 100% !important; /* Ensure it uses full width */
        }

        /* Hides unnecessary date display and predefined range sections */
        .rdrDateDisplayWrapper,
        .rdrDefinedRangesWrapper,
        .rdrStaticRange,
        .rdrInputRange {
          display: none !important;
        }

        /* Styles the weekday names and month/year pickers (font and red text color) */
        .rdrWeekDays,
        .rdrMonthAndYearPickers {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 16px;
          color: #d1252b;
        }

        /* Styles the month and year selection bar */
        .rdrMonthAndYearWrapper {
          padding: 10px 20px;
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Styles the navigation buttons (previous/next month) */
        .rdrNextPrevButton {
          display: block;
          font-size: 10px;
          color: #d1252b !important; /* Red color for navigation buttons */
        }

        /* Default color for all calendar days */
        .rdrDayNumber span {
          color: #1a1a1a;
        }

        /* Styles today's date with a red background */
        .rdrDayToday .rdrDayNumber span:after {
          background: #d1252b;
        }

        /* Styles the start and end date selection (adds a red border around selected dates) */
        .rdrStartEdge,
        .rdrEndEdge {
          width: 90% !important;
          height: 86% !important;
          background: transparent !important;
          border: 3px solid #d1252b !important;
          border-radius: 6px;
        }

        /* Styles the range between the selected start and end date (light red background) */
        .rdrInRange {
          background: #d9d9d94d !important; /* Light red background */
          color: black !important; /* Set text color to black */
        }

        /* Styles the preview range before selection (dashed border) */
        .rdrDayStartPreview,
        .rdrDayEndPreview,
        .rdrDayInPreview {
          border: #fafafa !important;
        }

        /* Styles the currently selected date (keeps text default, only border changes) */
        .rdrSelected {
          background: transparent !important;
          border: 2px solid #d1252b !important;
          color: #1a1a1a !important;
        }

        .rdrDay:hover .rdrDayNumber span {
          background: transparent !important;
          color: #d1252b !important;
        }

        .rdrDayToday .rdrDayNumber span:after {
          background: #d1252b;
        }

        .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span,
        .rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span,
        .rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span,
        .rdrDay:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span {
          color: rgba(209, 37, 43, 1);
        }

        .rdrMonthName {
          display: none;
        }

        /* Removes the default hover circle effect and makes text red on hover */
        .rdrDay:hover .rdrDayNumber span {
          background: transparent !important;
          color: #d1252b !important; /* Make text red on hover */
        }

        /* Hide the year in the month picker */
        .month-only .rdrMonthAndYearWrapper {
          display: flex;
          justify-content: center;
        }

        .month-only .rdrMonthAndYearWrapper .rdrMonthAndYearPicker {
          display: block !important; /* Show month picker */
        }

        .month-only .rdrMonthAndYearWrapper .rdrYearPicker {
          display: none !important; /* Hide year picker */
        }

        /* Styles the passive dates (unused dates, past dates in the current month) to be gray and non-clickable */
        .rdrDayPassive {
          color: gray !important; /* Make text gray */
          background: transparent !important; /* Remove background color */
          pointer-events: none !important; /* Make it non-clickable */
        }

        /* Handle past days in the current month */
        .rdrDay:not(.rdrDayPassive):not(.rdrDayToday):before {
          content: "" !important;
          color: gray !important; /* Make the text gray */
          pointer-events: none !important; /* Disable interaction */
        }
      `}</style>

      <div className="bg-white px-3 md:px-6 py-5 rounded-xl space-y-7 w-full mx-auto ">
        <h2 className="font-medium text-xl mb-3 py-3">Scegli il periodo di noleggio</h2>
        {/* Check-in  */}
        <div className="w-full flex items-center justify-between gap-4 mb-4">
          {/* Check-in Date */}
          <div className="w-full flex flex-col items-start gap-4 ">
            <Label htmlFor="checkIn" className="font-medium">
              Check-in
            </Label>
            <div className="relative w-full">
              <Input
                type="text"
                id="checkIn"
                value={format(dateRange[0].startDate, "dd/MM/yyyy")}
                placeholder="Pick a date"
                className="sm:w-[230px] md:w-56 lg:w-60 xl:w-56 2xl:w-[250px] bg-[#F8F8F8]"
                readOnly
              />
              <Image src={calender} alt="Calendar" className="absolute top-3 right-3" width={20} height={20} />
            </div>
          </div>
          {/* Check-in Time */}
          <div className="w-full flex flex-col items-start gap-4">
            <Label htmlFor="checkInTime" className="font-medium">
              Ora
            </Label>
            <div className="relative">
              <Input
                type="time"
                id="checkInTime"
                className="xl:w-[115px] bg-[#F8F8F8] placeholder:text-text_light_gray 
                 relative"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
              />
            </div>
          </div>
        </div>
        {/* Check-out  */}
        <div className="w-full flex items-center justify-between gap-4 mb-4 ">
          {/* Check-out  Date*/}
          <div className="w-full flex flex-col items-start gap-4 ">
            <Label htmlFor="checkOut" className="font-medium">
              Check-out
            </Label>
            <div className="relative w-full">
              <Input
                type="text"
                id="checkOut"
                value={format(dateRange[0].endDate, "dd/MM/yyyy")}
                placeholder="Pick a date"
                className="sm:w-[230px] md:w-56 lg:w-60 xl:w-56 2xl:w-[250px] bg-[#F8F8F8]"
                readOnly
              />
              <Image src={calender} alt="Calender" className="absolute top-3 right-3" width={20} height={20} />
            </div>
          </div>
          {/* Check-out Time */}
          <div className="w-full flex flex-col items-start gap-4">
            <Label htmlFor="checkOutTime" className="font-medium">
              Ora
            </Label>
            <div className="relative">
              <Input
                type="time"
                id="checkOutTime"
                className="xl:w-[115px] bg-[#F8F8F8]"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
              />
            </div>
          </div>
        </div>
        {/* Calendar component */}
        <div className="rounded-md w-full relative">
          {/* <DateRangePicker
            locale={customItLocale}
            ranges={dateRange}
            onChange={handleDateChange}
            direction="horizontal"
            showDateDisplay={false}
            showMonthAndYearPickers={true}
            minDate={new Date()}
            className="w-full"
          /> */}

          <div className="rounded-md w-full relative" ref={datePickerRef}>
            <DateRangePicker
              locale={customItLocale}
              ranges={dateRange}
              onChange={handleDateChange}
              direction="horizontal"
              showDateDisplay={false}
              showMonthAndYearPickers={true}
              minDate={new Date()}
              className="w-full"
            />
          </div>
          <button
            className="absolute top-3 right-6 md:right-6 lg:right-6 xl:top-3 xl:right-6 text-primary bg-white w-8 h-8 flex items-center justify-center next-arrow"
            onClick={() => handleMonthChange("next")}
          >
            <FaChevronRight size={20} />
          </button>

          <button
            className="absolute top-3 left-6 md:left-6 xl:top-3 xl:left-6 text-primary bg-white w-8 h-8 flex items-center justify-center prev-arrow"
            onClick={() => handleMonthChange("prev")}
          >
            <FaChevronLeft size={20} />
          </button>
        </div>
      </div>

      {/* Enter your contact details */}
      {/* <div className="bg-white px-6 py-5 rounded-xl space-y-10">
        <h2 className="font-medium text-xl mb-5">
          Inserisci i tuoi dati di contatto
        </h2>

        
        <div className="grid w-full gap-4 mb-24 ">
          <Label htmlFor="phoneNumber" className="font-medium">
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
                padding: "1.5rem 4rem",
                borderRadius: "1 1rem 1rem 1",
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


        <div className="grid w-full gap-4 mb-24 ">
          <Label htmlFor="email" className="font-medium">
            Email
          </Label>

          <div className="flex gap-0 items-center border rounded-md">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        
        <div className="grid w-full gap-4">
          <Label htmlFor="message" className="font-medium">
            Richieste speciali
          </Label>
          <Textarea
            placeholder="Inserisci qui le tue richieste speciali..."
            id="message"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            className="h-32"
          />
        </div>
      </div> */}
      <div className="bg-white px-6 py-5 rounded-xl ">
        <p className="font-medium mb-5 text-lg">Riepilogo prenotazione</p>
        <div className="flex  items-center justify-between text-xs mb-2">
          <p>Noleggio 1 Giorno</p>
          <p className="font-medium">420 CHF</p>
        </div>
        <div className="flex  items-center justify-between text-xs">
          <p>Costo del servizio</p>
          <p className="text-[#488D3F] font-medium">GRATIS</p>
        </div>

        <div className="flex  items-center justify-between text-sm mt-4  border-t  border-gray-300/80 border-dashed pt-4">
          <p className="font-semibold">Totale</p>
          <p className="font-semibold">420 CHF</p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <SharedButton text="RISERVA" cls="w-5/6 mx-auto" onClick={handleSubmit} />
      </div>
      <p className="text-sm text-text_light_gray text-center">Non riceverai alcun addebito in questa fase</p>

      {/* Success Modal */}
      <ReservationModal isOpen={isModalOpen} onClose={handleCloseModal} vehicleName="Maserati Ghibli Gransport" />
      {/* <SuccessModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        messages={{
          title: "Riservazione inoltrata correttamente",
          description:
            "La tua richiesta è stata inoltrata con successo. L'autonoleggio proprietario del veicolo ti contatterà al più presto per fornirti tutte le informazioni necessarie per completare il noleggio",
        }}
      /> */}
    </div>
  );
};

export default Rental;
