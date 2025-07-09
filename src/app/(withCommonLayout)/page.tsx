import BestBrands from "@/components/home/bestBrands/BestBrands";
import BestOffer from "@/components/home/bestOffer/BestOffer";
import GoogleReview from "@/components/home/googleReview/GoogleReview";
import Hero from "@/components/home/hero/Hero";
import HomeFaq from "@/components/home/homeFaq/HomeFaq";
import PopularDestination from "@/components/home/popularDestination/PopularDestination";
import PopularVehicle from "@/components/home/popularVehicle/PopularVehicle";
import PromotionVideo from "@/components/home/promotionVideo/PromotionVideo";
import RentSteps from "@/components/home/rentSteps/RentSteps";
import RequiredDocument from "@/components/home/requiredDocument/RequiredDocument";
import VehiclesCategory from "@/components/home/vehiclesCategory/VehiclesCategory";
import WeOffer from "@/components/home/weOffer/WeOffer";

const HomePage = () => {
  return (
    <div className="mt-20 space-y-20 xl:space-y-40">
      <Hero />
      <VehiclesCategory />
      <BestOffer />
      <PopularVehicle />
      <BestBrands />
      <PopularDestination />
      <WeOffer />
      <RentSteps />
      <RequiredDocument />
      <PromotionVideo />
      <GoogleReview />
      <HomeFaq />
    </div>
  );
};

export default HomePage;
