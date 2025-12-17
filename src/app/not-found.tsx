"use client";

import Lottie from "lottie-react";
import Link from "next/link";
import errorAnimation from "@/assets/error.json";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center text-center bg-gray-200">
      {/* Lottie Animation */}
      <Lottie className="h-80 w-80" animationData={errorAnimation} />

      {/* Message */}
      <h1 className="text-3xl font-semibold text-text_dark_gray mt-6">Oops! Page Not Found</h1>
      <p className="text-text_light_gray font-medium mt-2 max-w-md">The page you are looking for may have been removed, renamed, or may not exist.</p>

      {/* Home Button */}
      <Link href="/">
        <button className="mt-6 bg-primary text-white px-8 py-3 rounded-lg  font-medium shadow-md transition hover:bg-primary/80 text-sm">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
