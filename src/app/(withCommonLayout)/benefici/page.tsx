import Ambition from "@/components/benefici/ambition/Ambition";
import BeneficiHero from "@/components/benefici/beneficiHero/BeneficiHero";
import HighQualityRental from "@/components/benefici/highQualityRental/HighQualityRental";
import Risultat from "@/components/benefici/risultat/Risultat";
import Team from "@/components/benefici/team/Team";
import Timeline from "@/components/benefici/timeline/Timeline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benefici",
};

const Benefici = () => {
  return (
    <div className="py-10 xl:py-16 mt-20 ">
      <div className="container mx-auto my-6 mb-32  md:py-8 lg:py-16 space-y-10 lg:space-y-28">
        <BeneficiHero />
        <HighQualityRental />
        <Team />
      </div>
      <Risultat />
      <div className="container mx-auto py-16 space-y-36 mt-12">
        <Timeline />
        <Ambition />
      </div>
    </div>
  );
};

export default Benefici;
