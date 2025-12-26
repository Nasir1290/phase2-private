"use client";

export const SharedButton = ({ text, cls = "", onClick }: { text: string | React.ReactNode; cls?: string; onClick?: () => void }) => {
  return (
    <button
      className={`${cls} bg-primary hover:bg-primary/80 text-white z-30 px-6 md:px-10 py-2 rounded-lg font-medium text-sm md:text-sm lg:text-base`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
