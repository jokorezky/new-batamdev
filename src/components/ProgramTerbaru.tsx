"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState } from "react";
import { useProgramsQuery } from "@/hooks/useProgramMutation";

const ProgramTerbaru = () => {
  const swiperRef = useRef<any>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { programs } = useProgramsQuery(page, limit);
  return (
    <div className="bg-gray-100 w-full mt-5 pt-10 pb-0">
      <div className="flex justify-end items-center gap-4 pr-4 md:pr-32">
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
      <div className="grid grid-cols-1 md:grid-cols-12 items-center px-4 md:px-28 py-8 gap-10 md:gap-20">
        <div className="col-span-1 md:col-span-5">
          <div>
            <h1 className="text-2xl md:text-3xl mb-2 font-semibold">
              Program Terbaru Kami
            </h1>
            <p className="text-sm md:text-base">
              Bersama partner, kami menghadirkan berbagai program untuk
              meningkatkan keterampilan dan peluang di dunia teknologi.
            </p>
          </div>
        </div>

        <div className="col-span-1 md:col-span-7">
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
                slidesPerView: 1.2,
              },
            }}
            style={{ width: "100%" }}
          >
            {programs.map((slide, index: number) => (
              <SwiperSlide
                key={index}
                className="bg-white rounded-xl cursor-pointer !h-fit shadow-md"
              >
                <Link href={slide?.link} passHref target="_blank">
                  <div className="block md:flex items-center justify-between rounded-md border-none p-4">
                    <div>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full md:w-36 md:h-36 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 pl-4 space-y-2 mt-4 md:mt-0">
                      <p className="text-md md:text-sm font-medium leading-none">
                        {slide.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {slide.description && parse(slide.description)}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProgramTerbaru;
