import Image from "next/image";
import black_logo from "@/assets/logo/blacklogo.svg";
import white_logo from "@/assets/logo/whitelogo.svg";
import Link from "next/link";

export const BlackLogo = () => {
  return (
    <Link href={"/"}>
      <div className="w-[150px] md:w-40 lg:w-36 xl:w-48">
        <Image
          height={1000}
          width={1000}
          src={black_logo}
          alt="Company Logo"
          className="w-36 md:w-40 "
        />
      </div>
    </Link>
  );
};

export const WhiteLogo = () => {
  return (
    <Link href={"/"}>
      <Image src={white_logo} alt="Company Logo" width={180} height={80} />
    </Link>
  );
};
