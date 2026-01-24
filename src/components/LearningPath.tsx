"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { LearningPathDto } from "@/types/LearningPath";
import { useLearningProgramsQuery } from "@/hooks/useLearningProgramMutation";

import { Swiper as SwiperType } from "swiper";

const LearningPath = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { programs } = useLearningProgramsQuery(page, limit);

  return (
    <div className="py-10 md:py-20 px-4 md:px-28 bg-gray-100 md:bg-white">
      <div className="flex items-center justify-center pb-2">
        <div className="w-full md:px-40 text-center">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl mb-4 font-bold">
              Fase Pembelajaran kinigo
            </h1>
            <p className="text-sm md:text-base">
              Dirancang untuk memberikan pengalaman belajar terstruktur dan
              mendalam, dengan fokus pada keterampilan praktis yang dibutuhkan
              industri. Setiap fase mengantar Anda dari dasar hingga tingkat
              lanjutan, memastikan kesiapan karir di dunia teknologi.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-4 mb-5">
        <Button
          variant="outline"
          size="icon"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight />
        </Button>
      </div>
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 3.7,
          },
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {programs.map((slide: LearningPathDto, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative group">
              <Link href={`/fase-pembelajaran/${slide.slug}`} passHref>
                <img
                  src={slide.why_image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center rounded-b-md bg-gradient-to-t from-black via-transparent to-transparent">
                  <p className="text-white text-lg font-semibold mt-20 group-hover:text-yellow-500 transition-colors duration-300 ease-in-out">
                    {slide.title}
                  </p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LearningPath;
