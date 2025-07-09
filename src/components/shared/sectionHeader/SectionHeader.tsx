// SectionHeader1
export const SectionHeader1 = ({
  title,
  subtitle,
}: {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center text-center mt-10 md:mt-0 mb-12 md:mb-16 space-y-10">
      <h2 className=" font-extrabold text-2xl md:text-[30px] uppercase">
        {title}
      </h2>
      <p className="text-sm font-medium text-text_light_gray max-w-[1100px] ">
        {subtitle}
      </p>
    </div>
  );
};

// SectionHeader2
interface SectionHeaderProps2 {
  topText?: string | React.ReactNode;
  title?: string | React.ReactNode;
  highlightedText?: string | React.ReactNode;
  remainingText?: string | React.ReactNode;
  className?: string;
}

export const SectionHeader2 = ({
  topText,
  title,
  highlightedText,
  remainingText,
  className,
}: SectionHeaderProps2) => {
  return (
    <header className={`max-w-2xl text-start mb-5 lg:mb-16 ${className}`}>
      <div className="flex flex-col gap-4">
        {topText && (
          <span className="text-sm font-medium text-text_light_gray uppercase">
            {topText}
          </span>
        )}
        <h1 className="text-2xl md:text-[30px] font-extrabold">
          {title}{" "}
          {highlightedText && (
            <span className="text-red">{highlightedText}</span>
          )}{" "}
          {remainingText}
        </h1>
      </div>
    </header>
  );
};

interface SectionHeaderProps3 {
  title?: string | React.ReactNode;
  className?: string;
}
export const SectionHeader3 = ({ title, className }: SectionHeaderProps3) => {
  return (
    <header className={`max-w-2xl text-start mb-10 ${className}`}>
      <div className="flex flex-col gap-4">
        <h1 className=" font-medium text-2xl md:text-[26px]">{title}</h1>
      </div>
    </header>
  );
};
interface VehicleInsertionHeaderProps {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  className?: string;
}
export const VehicleInsertionHeader = ({
  title,
  subtitle,
  className,
}: VehicleInsertionHeaderProps) => {
  return (
    <header className={`max-w-2xl text-start mb-10 ${className}`}>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-text_light_gray font-normal text-[15px]">
          {subtitle}
        </p>
      </div>
    </header>
  );
};
