"use client";

import Image from "next/image";
import React from "react";

type MyCheckboxProps = {
  label: string;
  checked?: boolean; // ← Now controlled from parent
  image?: string;
  onChange?: (checked: boolean) => void;
};

const MyCheckbox: React.FC<MyCheckboxProps> = ({
  label,
  checked = false,
  image,
  onChange,
}) => {
  const toggleCheckbox = () => {
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <div
      className="flex items-center space-x-2 gap- cursor-pointer select-none"
      onClick={toggleCheckbox}
    >
      <input type="checkbox" checked={checked} readOnly className="hidden" />
      <div
        className={`h-4 w-4 border-2 border-black/70 relative rounded-[3px] ${
          checked ? "bg-white" : ""
        }`}
      >
        {checked && (
          <div className="absolute top-0.5 left-0.5 right-0.5 bottom-0.5 bg-primary" />
        )}
      </div>
      {image && (
        <Image
          width={20}
          height={20}
          src={image}
          alt={label}
          className="w-5 h-5 object-contain"
        />
      )}
      <p className="text-xs font-normal whitespace-nowrap">{label}</p>
    </div>
  );
};

export default MyCheckbox;
