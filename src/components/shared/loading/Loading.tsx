"use client";

import Lottie from "lottie-react";
import loading from "@/assets/loading.json";

const Loading = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center text-center">
      {/* Lottie Animation */}
      <Lottie className="h-40 w-40" animationData={loading} />
    </div>
  );
};

export default Loading;
