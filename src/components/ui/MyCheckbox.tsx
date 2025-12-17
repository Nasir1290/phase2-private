"use client";

import React, { useState, useEffect } from "react";

type MyCheckboxProps = {
  label: string;
  defaultChecked?: boolean;
  image?: string;
  onChange?: (checked: boolean) => void;
};

const MyCheckbox: React.FC<MyCheckboxProps> = ({ label, defaultChecked = false, image, onChange }) => {
  const [checked, setChecked] = useState(defaultChecked);

  // ✅ useEffect only fires after render
  useEffect(() => {
    if (onChange) onChange(checked);
  }, [checked, onChange]);

  const toggleCheckbox = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div
      className={`flex items-center space-x-2  gap- cursor-pointer`}
      onClick={toggleCheckbox} // ✅ runs only on click
    >
      <input type="checkbox" checked={checked} readOnly className="hidden" />
      <div
        className={`h-4 w-4 border-2 border-black/70 relative rounded-[3px] ${
          checked ? "bg-white" : ""
        }`}
      >
        {checked && <div className="absolute top-0.5 left-0.5 right-0.5 bottom-0.5 bg-primary" />}
      </div>
        {image && <img src={image} alt={label} className="w-5 h-5 object-contain" />}
      <p className="text-xs font-normal whitespace-nowrap">{label}</p>
    </div>
  );
};

export default MyCheckbox;
