import { SectionHeader2 } from "../sectionHeader/SectionHeader";

const BeneficiBanner = ({
  details,
  topText,
  title,
  highlightedText,
  className,
  children,
}: {
  topText?: string | React.ReactNode;
  title?: string | React.ReactNode;
  highlightedText?: string | React.ReactNode;
  details?: string | React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`flex flex-col items-center gap-14 ${className}`}>
      <div className="w-full lg:w-1/2 space-y-10">
        <div className="max-w-[370px]">
          <SectionHeader2
            topText={topText}
            title={title}
            highlightedText={highlightedText}
          />
        </div>
        <p className="text-sm md:text-[15px] font-normal text-text_light_gray ">
          {details}
        </p>
      </div>
      <div className="w-full lg:w-1/2">{children}</div>
    </div>
  );
};

export default BeneficiBanner;
