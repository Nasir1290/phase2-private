"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X } from "lucide-react";
import icon1 from "@/assets/home/facebook.svg";
import icon2 from "@/assets/home/linkedin.svg";
import icon3 from "@/assets/home/instagram.svg";
import videoThumbnail1 from "@/assets/home/videocover/video1_cover.jpeg";
import videoThumbnail2 from "@/assets/home/videocover/video2_cover.jpeg";
import videoThumbnail3 from "@/assets/home/videocover/video3_cover.jpeg";
import videoThumbnail4 from "@/assets/home/videocover/video4_cover.jpg";
import { SectionHeader2 } from "@/components/shared/sectionHeader/SectionHeader";
import { SharedButton } from "@/components/shared/sharedButton/SharedButton";

const PromotionVideo = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const videos = [
    { id: 1, thumbnail: videoThumbnail1, videoUrl: "./video-one.mp4" },
    { id: 2, thumbnail: videoThumbnail2, videoUrl: "./video-two.mp4" },
    { id: 3, thumbnail: videoThumbnail3, videoUrl: "./video-three.mp4" },
    { id: 4, thumbnail: videoThumbnail4, videoUrl: "./video-four.mp4" },
  ];

  const handlePlayClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  // Close dialog when clicking outside the video
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectedVideo(null);
      }
    };

    if (selectedVideo) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100); // Delay to avoid conflicts

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [selectedVideo]);

  return (
    <div className="bg-[#F1F1F1] py-20">
      {/* Section Header */}
      <div className="container mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 ">
        <div className="col-span-12 md:col-span-6">
          <p className="text-sm font-semibold text-black uppercase mb-5">
            SOCIAL MEDIA
          </p>
          <div className="w-full md:w-[420px] lg:max-w-96">
            <SectionHeader2
              title="Resta aggiornato sulle"
              highlightedText="prossime promozioni"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 flex justify-between lg:justify-end items-center md:gap-4 lg:gap-10 xl:gap-12 w-full lg:w-2/3">
          <Link href="https://linktr.ee/bittengo">
            <SharedButton text="Seguici sui social" />
          </Link>
          <div className="flex gap-2 md:gap-4 lg:gap-6">
            <Link href="https://www.instagram.com/bittengo_official?igsh=MW5tMnExb2FsOGxuaw%3D%3D&utm_source=qr">
              <Image
                src={icon3}
                alt="Instagram"
                width={40}
                height={40}
                className="w-7 h-7 md:w-10 md:h-10"
              />
            </Link>
            <Link href="https://www.facebook.com/people/Bittengo/61557722955719/?mibextid=LQQJ4d">
              <Image
                src={icon1}
                alt="Facebook"
                width={40}
                height={40}
                className="w-7 h-7 md:w-10 md:h-10"
              />
            </Link>
            <Link href="https://www.linkedin.com/company/bittengo">
              <Image
                src={icon2}
                alt="Linkedin"
                width={40}
                height={40}
                className="w-7 h-7 md:w-10 md:h-10"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Promotion Videos Section */}
      <div className="mt-10 container mx-auto overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 md:gap-5 xl:gap-[60px] 2xl:gap-[70px] mr-10">
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative min-w-[200px] md:min-w-[250px]"
            >
              {/* Video Thumbnail */}
              <Image
                src={video.thumbnail}
                alt={`Thumbnail ${video.id}`}
                width={250}
                height={250}
                className="relative rounded-xl cursor-pointer h-[330px] sm:h-[350px] md:h-[380px] 2xl:h-[450px] bg-red w-[200px] md:w-full"
                onClick={() => handlePlayClick(video.videoUrl)}
              />
              {/* Play Button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <button
                  className="bg-red rounded-full p-4 shadow-lg"
                  onClick={() => handlePlayClick(video.videoUrl)}
                >
                  <Play size={20} color="white" fill="white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Dialog */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 ">
          <div
            ref={modalRef}
            className="relative p-4 rounded-lg mx-auto max-w-[500px]"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-8 right-8 p-2 bg-black/50 text-white rounded-full hover:bg-gray-700 z-50"
            >
              <X size={16} />
            </button>

            {/* Video Player */}
            <video
              controls
              autoPlay
              className="w-full h-[600px] md:h-[700px] lg:h-[750px] xl:h-[750px] 2xl:h-[800px] object-cover rounded-xl "
            >
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionVideo;
