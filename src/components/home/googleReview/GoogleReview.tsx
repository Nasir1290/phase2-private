"use client";

import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { SectionHeader2 } from "@/components/shared/sectionHeader/SectionHeader";
import { BlackLogo } from "@/components/shared/logo/logo";
import ReviewCarousel from "./ReviewCarousal";
import StarRating from "@/components/shared/starRating/StarRating";

const GoogleReview = () => {
  return (
    <div id="recensioni" className="container mx-auto ">
      {/* Section Header */}
      <div className="max-w-[500px]">
        <SectionHeader2 topText="RECENSIONI" title="Cosa dicono i nostri clienti" highlightedText="sul nostro servizio di noleggio" />
      </div>
      {/* Content Grid */}
      <div className="grid grid-cols-12 md:gap-3 lg:gap-5 items-center">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-3 flex flex-col items-center md:items-start justify-between gap-14">
          {/* Logo */}
          <BlackLogo />

          {/* Google Reviews Section */}
          <div className="bg-section_bg/60 text-sm font-semibold shadow-md lg:px-4 xl:px-8 py-8 rounded-lg space-y-3 md:mr-8 w-full">
            <p className="flex justify-center items-center gap-3 text-text_dark_gray text-lg">
              <FcGoogle className="text-xl " />
              Google Reviews
            </p>

            <div className="flex justify-center items-center gap-3 text-base font-semibold">
              <span className="text-text_dark_gray/70 text-[15px]">5</span>
              <StarRating ratingValue={5} totalRatings={43} />
              <span className="text-text_dark_gray/70 text-[15px]">43</span>
            </div>

            <Link href="https://g.page/r/CSE8B-rI3SAyEBM/review" className="text-primary font-semibold text-center text-sm uppercase mx-auto block">
              Lascia una recensione
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-9 md:px-5 lg:p-5">
          <ReviewCarousel />
        </div>
      </div>
    </div>
  );
};

export default GoogleReview;
