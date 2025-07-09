"use client";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const getDaysInMonth = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysArray = [];

  for (let i = 0; i < firstDay.getDay(); i++) {
    daysArray.push(null); // Empty slots for alignment
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    daysArray.push(i);
  }

  return daysArray;
};

const CustomCalendar: React.FC = () => {
  const today = new Date();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear] = useState(today.getFullYear()); // Static year

  const days = getDaysInMonth(currentYear, currentMonth);

  const handleDayClick = (day: number | null) => {
    if (day === null) return;
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDates([date]); // Single selection, extend for range
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      if (direction === "prev") {
        return prev === 0 ? 11 : prev - 1;
      } else {
        return prev === 11 ? 0 : prev + 1;
      }
    });
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 w-96">
      {/* Month and Static Year Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          className="text-red bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-md border border-gray-300 hover:bg-gray-100 transition-all"
          onClick={() => handleMonthChange("prev")}
        >
          <FaChevronLeft size={18} />
        </button>

        <div className="text-lg font-semibold text-gray-700">
          {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
            new Date(currentYear, currentMonth)
          )}{" "}
          <span className="text-gray-500">{currentYear}</span>
        </div>

        <button
          className="text-red bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-md border border-gray-300 hover:bg-gray-100 transition-all"
          onClick={() => handleMonthChange("next")}
        >
          <FaChevronRight size={18} />
        </button>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 text-center text-sm font-semibold text-red-600 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 text-center">
        {days.map((day, index) => (
          <div
            key={index}
            className={`py-3 text-sm cursor-pointer rounded-md ${
              day === null
                ? "pointer-events-none"
                : selectedDates.some(
                    (d) =>
                      d.getDate() === day &&
                      d.getMonth() === currentMonth &&
                      d.getFullYear() === currentYear
                  )
                ? "bg-red-500 text-white"
                : "hover:bg-red-100"
            }`}
            onClick={() => handleDayClick(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
