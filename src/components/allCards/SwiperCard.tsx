import Image, { StaticImageData } from "next/image";

type SwiperCardProps = {
  image: string | StaticImageData;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  className?: string;
};

const SwiperCard: React.FC<SwiperCardProps> = ({
  image,
  title,
  description,
  className,
}) => {
  return (
    <div
      className={`border shadow-lg hover:shadow-red/10 hover:shadow-lg rounded-2xl p-6 md:px-5 lg:px-8 xl:px-5 2xl:px-6 flex flex-col items-center justify-center gap-4 sm:w-[390px] md:w-[350px] lg:w-[400px] xl:w-[320px] 2xl:w-[350px] h-[240px] ${className}`}
    >
      <Image
        src={image}
        alt="icon"
        width={90}
        height={90}
        className="w-10 h-10"
      />

      <h2 className="text-lg md:text-base lg:text-lg  text-center font-semibold">
        {title}
      </h2>
      {description && (
        <p className="text-text_light_gray font-normal text-center text-sm">
          {description}
        </p>
      )}
    </div>
  );
};

export default SwiperCard;
