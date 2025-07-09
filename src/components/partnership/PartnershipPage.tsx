import React from "react";
import PartnershipHero from "./partnershipHero/PartnershipHero";
import PartnershipFaq from "./partnershipFaq/PartnershipFaq";
import PartnershipBenefits from "./partnershipBenefits/PartnershipBenefits";
import PartnershipCustomers from "./partnershipCustomers/PartnershipCustomers";
import PartnershipTerms from "./partnershipTerms/PartnershipTerms";

const PartnershipPage = () => {
  return (
    <div className="space-y-28 lg:space-y-28 xl:space-y-40">
      <PartnershipHero />
      <PartnershipBenefits />
      <PartnershipCustomers />
      <PartnershipTerms />
      <PartnershipFaq />
    </div>
  );
};

export default PartnershipPage;
