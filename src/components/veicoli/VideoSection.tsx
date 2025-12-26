"use client";

import videoThumbnail1 from "@/assets/home/videocover/video1_cover.jpeg";
import videoThumbnail2 from "@/assets/home/videocover/video2_cover.jpeg";
import videoThumbnail3 from "@/assets/home/videocover/video3_cover.jpeg";
import videoThumbnail4 from "@/assets/home/videocover/video4_cover.jpg";
import { SectionHeader2 } from "@/components/shared/sectionHeader/SectionHeader";
import { ArrowDown, ArrowUp, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const VideoSection = () => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const videos = [
    { id: 1, thumbnail: videoThumbnail1, videoUrl: "./video-one.mp4" },
    { id: 2, thumbnail: videoThumbnail2, videoUrl: "./video-two.mp4" },
    { id: 3, thumbnail: videoThumbnail3, videoUrl: "./video-three.mp4" },
    { id: 4, thumbnail: videoThumbnail4, videoUrl: "./video-four.mp4" },
  ];

  const handlePlayClick = (index: number) => {
    setSelectedVideoIndex(index);
    setCurrentActiveIndex(index);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedVideoIndex(null);
      }
    };

    if (selectedVideoIndex !== null) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [selectedVideoIndex]);

  // Auto play next video - only if it's from the currently active slide
  const handleVideoEnd = (videoIndex: number) => {
    // Only auto-advance if this video end event is from the currently active slide
    if (swiperRef.current && videoIndex === currentActiveIndex) {
      swiperRef.current.slideNext();
      // Update the active index to match the new slide
      const newIndex = (currentActiveIndex + 1) % videos.length;
      setCurrentActiveIndex(newIndex);

      // Auto-play the next video
      setTimeout(() => {
        const currentSlide = swiperRef.current!.slides[swiperRef.current!.activeIndex];
        const videoEl = currentSlide.querySelector("video") as HTMLVideoElement | null;
        if (videoEl) {
          videoEl.play().catch((error) => {
            console.warn("Auto-play failed:", error);
          });
        }
      }, 5000);
    }
  };

  // Handle manual slide changes
  const handleSlideChange = (swiper: SwiperType) => {
    const newActiveIndex = swiper.realIndex;
    setCurrentActiveIndex(newActiveIndex);

    // Pause all videos first
    swiper.slides.forEach((slide) => {
      const videoEl = slide.querySelector("video") as HTMLVideoElement | null;
      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    });

    // Play the current video
    setTimeout(() => {
      const currentSlide = swiper.slides[swiper.activeIndex];
      const videoEl = currentSlide.querySelector("video") as HTMLVideoElement | null;
      if (videoEl) {
        videoEl.play().catch((error) => {
          console.warn("Auto-play failed:", error);
        });
      }
    }, 100);
  };

  return (
    <div>
      {/* Section Header */}
      <div className="container mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 ">
        <div className="col-span-12 md:col-span-6">
          <p className="text-sm font-medium text-text_light_gray uppercase mb-5">ANTEPRIMA</p>
          <div className="w-full md:w-[420px] lg:max-w-96">
            <SectionHeader2 title="Video veicoli a" highlightedText="noleggio" />
          </div>
        </div>
      </div>

      <div className="bg-[#F1F1F1] py-20 relative">
        {/* Thumbnails Swiper */}
        <div className=" container mx-auto relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".thumb-next",
              prevEl: ".thumb-prev",
            }}
            spaceBetween={45}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
            }}
            speed={600}
          >
            {videos.map((video, index) => (
              <SwiperSlide key={video.id}>
                <div className="relative">
                  <Image
                    src={video.thumbnail}
                    alt={`Thumbnail ${video.id}`}
                    width={250}
                    height={250}
                    className="rounded-xl cursor-pointer h-[330px] sm:h-[350px] md:h-[380px] 2xl:h-[450px] w-full object-cover"
                    onClick={() => handlePlayClick(index)}
                  />
                  {/* Play Button */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <button className="bg-primary rounded-full p-2 shadow-lg" onClick={() => handlePlayClick(index)}>
                      <Play size={20} color="white" fill="white" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-[#45474A] text-white px-2 md:px-6 py-4 rounded-xl text-sm w-[calc(100%-1rem)]">
                    <h3 className="font-semibold mb-[3px] text-[15px] ">8950 CHF</h3>
                    <h3 className=" text-xs font-normal">Bugatti Chiron</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Navigation */}
          <button className="thumb-prev absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black transition">
            ◀
          </button>
          <button className="thumb-next absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black transition">
            ▶
          </button>
        </div>

        {/* Modal Vertical Video Swiper */}
        {selectedVideoIndex !== null && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div ref={modalRef} className="relative p-4 rounded-lg mx-auto max-w-[1000px] w-full">
              {/* Close */}
              <button
                onClick={() => setSelectedVideoIndex(null)}
                className="absolute top-4 right-52 p-2 bg-black/50 text-white rounded-full hover:bg-gray-700 z-50"
              >
                <X size={16} />
              </button>

              <Swiper
                modules={[Navigation]}
                direction="vertical"
                navigation={{
                  nextEl: ".video-down",
                  prevEl: ".video-up",
                }}
                initialSlide={selectedVideoIndex}
                speed={600}
                loop={true}
                className="rounded-xl h-[800px]"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={handleSlideChange}
              >
                {videos.map((video, index) => (
                  <SwiperSlide key={video.id}>
                    <div className="relative">
                      <video
                        controls
                        autoPlay
                        onEnded={() => handleVideoEnd(index)}
                        className="w-full h-[600px] md:h-[700px] lg:h-[750px] xl:h-[750px] 2xl:h-[800px] object-cover rounded-xl max-w-[500px] mx-auto relative"
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Vertical Navigation */}
                      {/* <div className="absolute top-1/2 -translate-y-1/2 right-48 flex flex-col gap-4 z-50">
                        <button
                          // onClick={handlePrev}
                          className="video-up bg-black/50 p-2 rounded-full hover:bg-gray-700"
                        >
                          <ArrowUp size={20} color="white" />
                        </button>
                        <button
                          // onClick={handleNext}
                          className="video-down bg-black/50 p-2 rounded-full hover:bg-gray-700"
                        >
                          <ArrowDown size={20} color="white" />
                        </button>
                      </div> */}

                      {/* Vertical Navigation */}
                      <div className="absolute inset-y-0 right-2 xs:right-4 md:top-1/2 md:-translate-y-1/2 md:right-[180px] flex flex-col items-center justify-center gap-4 z-50">
                        <button className="video-up w-10 h-10  flex items-center justify-center bg-black/50 hover:bg-black rounded-full transition shadow-md">
                          <ArrowUp size={20} className="text-white" />
                        </button>
                        <button className="video-down w-10 h-10  flex items-center justify-center bg-black/50 hover:bg-black rounded-full transition shadow-md">
                          <ArrowDown size={20} className="text-white" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-60 bg-[#21262D] text-white px-2 md:px-6 py-4 rounded-xl text-sm w-full max-w-[487px]">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold mb-[3px] text-[15px] ">Maserati Ghibli</h3>
                            <h3 className=" text-xs font-normal">5435 CHF</h3>
                          </div>
                        
                          <button
                className="w-fit text-[13px] px-6 py-2 bg-primary hover:bg-primary/90 hover:shadow-xl mt-1  text-white font-medium rounded shadow-lg"
              >
                PRENOTA
              </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
