"use client";

import type React from "react";

import chf from "@/assets/CHF.png";
import { Heart, Link as Link3, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FavoritesCardProps {
  id: string;
  imageUrl: string;
  logo: string;
  brand: string;
  model: string;
  transmission: string;
  seats: number;
  deposit: string | number;
  available: boolean;
  price: number;
  maxSpeed: number | string;
  whatsappNumber: string;
  phoneNumber: string;
  location: string;
  isFavorite?: boolean;
  isLocation?: boolean;
}

const FavoritesCard: React.FC<FavoritesCardProps> = ({ id, imageUrl, logo, brand, model, price, location, isFavorite = true, isLocation = true }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Mobile Layout (Vertical Stack) */}
      <div className="flex flex-col sm:hidden">
        {/* Vehicle Image - Mobile */}
        <div className="relative">
          <Link href={`/veicoli/${id}`}>
            <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
              <Image src={imageUrl} alt={`${brand} ${model}`} fill className="object-fill hover:scale-105 transition-transform duration-300" />
            </div>
          </Link>
        </div>

        {/* Vehicle Details - Mobile */}
        <div className="p-4">
          {/* Header with logo, title and actions */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Image src={logo || "/placeholder.svg"} alt={brand} width={20} height={20} className="w-5 h-5 object-contain flex-shrink-0" />
              <Link href={`/veicoli/${id}`} className="min-w-0 flex-1">
                <h3 className="text-base font-bold truncate">
                  {brand} {model}
                </h3>
              </Link>
            </div>

            {/* Action buttons */}
            {isFavorite && (
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Link3 className="w-4 h-4 text-gray-500" />
                </button>
                <button onClick={toggleFavorite} className="p-2 hover:bg-gray-100 rounded">
                  <Heart className={`w-4 h-4 ${isFavorited ? "text-primary fill-red-500" : "text-gray-500"}`} />
                </button>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            Description goes here Description goes here Description goes here Description goes here. Description goes here Description goes here.
          </p>

          {/* Price */}
          <div className="flex items-center gap-1 w-full border-b pb-2 mb-2">
            <Image src={chf} alt="CHF" width={20} height={20} className="w-5 h-5" />
            <span className="text-lg font-semibold text-gray-900">CHF {price}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-primary">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Layout (Horizontal) */}
      <div className="hidden sm:flex gap-3 md:gap-6 p-2 ">
        {/* Vehicle Image - Desktop/Tablet */}
        <div className="flex-shrink-0">
          <Link href={`/veicoli/${id}`}>
            <div className="relative w-32 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32 lg:w-56 lg:h-36 xl:w-64 xl:h-40 rounded-lg overflow-hidden">
              <Image src={imageUrl} alt={`${brand} ${model}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </Link>
        </div>

        {/* Vehicle Details - Desktop/Tablet */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Header with logo, title and actions */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt={brand}
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain flex-shrink-0"
                />
                <Link href={`/veicoli/${id}`} className="min-w-0">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold truncate">
                    {brand} {model}
                  </h3>
                </Link>
              </div>

              {/* Action buttons */}
              {isFavorite && (
                <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Link3 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                  </button>
                  <button onClick={toggleFavorite} className="p-1 hover:bg-gray-100 rounded">
                    <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavorited ? "text-primary fill-red-500" : "text-gray-500"}`} />
                  </button>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-2 sm:mb-3 line-clamp-2 max-w-3xl">
              Description goes here Description goes here Description goes here Description goes here. Description goes here Description goes here.
            </p>
          </div>

          {/* Price and Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-1 w-full border-b pb-1 sm:pb-2">
              <Image src={chf} alt="CHF" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">CHF {price}</span>
            </div>
            {isLocation ? (
              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>
            ) : (
              <p className="text-green">Annuncio pubblicato</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesCard;
