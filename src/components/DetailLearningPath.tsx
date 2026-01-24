"use client";

import React, { FC, useRef, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import FormulirPendaftaran from "./FormulirPendaftaran";
import Faq from "./Faq";
import { LearningPathDto } from "@/types/LearningPath";

interface LearningPathType {
  data: LearningPathDto;
}
const LearningPath: FC<LearningPathType> = ({ data }) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [jadwalId, setJadwalId] = useState<string>("");
  const handleScrollToForm = (_id: string) => {
    if (formRef.current) {
      if (_id) {
        setJadwalId(_id);
      }

      const offset = 50;
      const elementPosition =
        formRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-28">
        <div className="w-full md:w-1/2 mt-14 hidden md:block">
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl md:text-3xl mb-2 font-extrabold">
              {data?.title}
            </h1>
            <p className="text-sm md:text-base">
              {data?.description && parse(data?.description)}
            </p>
            <Button
              variant="destructive"
              className="mt-6 md:mt-10 py-6 text-md font-bold"
              onClick={() => handleScrollToForm("")}
            >
              {data?.text_button}
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-2 md:mt-0 pt-7">
          <img
            src={data?.why_image}
            alt={data?.title}
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
        <div className="w-full md:w-1/2 block md:hidden pt-4">
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl md:text-3xl mb-2 font-extrabold">
              {data?.title}
            </h1>
            <p className="text-sm md:text-base">
              {data?.description && parse(data?.description)}
            </p>
            <Button
              variant="destructive"
              className="mt-6 md:mt-10 py-6 text-md font-bold"
              onClick={() => handleScrollToForm("")}
            >
              {data?.text_button}
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-56 py-10 bg-gray-50 mt-10">
        <div className="w-full text-center">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">
              Fase Pembelajaran {data?.title}
            </h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 flex flex-col gap-5">
            {data?.populatedFasePembelajaran.map((card, index: number) => (
              <Card key={index} className="flex-1 min-h-[200px]">
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{card.description}</CardDescription>
                  <div className="md:hidden">
                    {card.kurikulum.map((kurikulum, i: number) => {
                      return (
                        <Card
                          key={i}
                          className="shadow-none bg-gray-50 border-none flex flex-col justify-center"
                        >
                          <CardHeader className="py-3 px-0 md:px-6 md:p-6">
                            <CardTitle>{kurikulum.text}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0 md:p-6 py-2">
                            <CardDescription>
                              {kurikulum.description}
                              <div className="flex items-center gap-3">
                                {kurikulum.images.map(
                                  (image: string, index: number) => {
                                    return (
                                      <img
                                        key={index}
                                        src={image}
                                        alt="image"
                                        className="w-20"
                                      />
                                    );
                                  }
                                )}
                              </div>
                            </CardDescription>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="hidden md:flex flex-col justify-between items-center mx-6">
            {data?.populatedFasePembelajaran.map((_, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center min-h-[200px] relative"
              >
                <div
                  className={`absolute z-0 top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 h-[100%] w-px 
                    ${
                      index === data?.populatedFasePembelajaran.length - 1
                        ? "bg-gray-200"
                        : "bg-gradient-to-t from-gray-200 to-transparent"
                    }`}
                />
                <span
                  className={`text-gray-700 font-bold bg-gray-50 px-2 z-10 py-5 
                  ${
                    index === data?.populatedFasePembelajaran.length - 1
                      ? "rounded-full bg-gray-200 p-4"
                      : ""
                  }`}
                >
                  {index}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/2 hidden md:flex  flex-col gap-5">
            {data?.populatedFasePembelajaran.map(
              (fasePembelajaran, index: number) => (
                <Card
                  key={index}
                  className="shadow-none bg-gray-50 border-none flex flex-col justify-center min-h-[200px]"
                >
                  {fasePembelajaran.kurikulum.map((kurikulum, i: number) => {
                    return (
                      <Card
                        key={i}
                        className="shadow-none bg-gray-50 border-none flex flex-col justify-center"
                      >
                        <CardHeader className="py-2">
                          <CardTitle>{kurikulum.text}</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <CardDescription>
                            {kurikulum.description}
                            <div className="flex items-center gap-3">
                              {kurikulum.images.map((image, index: number) => {
                                return (
                                  <img
                                    key={index}
                                    src={image}
                                    alt="image"
                                    className="w-20"
                                  />
                                );
                              })}
                            </div>
                          </CardDescription>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Card>
              )
            )}
          </div>
        </div>
      </div>
      <div className="py-10 md:pt-20">
        <div className="mb-6 flex justify-center items-center relative w-full">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 px-5 md:px-0">
            Kenapa Harus Belajar {data?.title}?
          </h1>
        </div>

        <div className="flex flex-col md:flex-row px-4 md:px-44 gap-5 md:gap-14 items-center">
          <div className="w-full md:w-1/2">
            <img
              src={data?.why_image}
              alt={data?.title}
              className="w-full h-auto rounded-xl"
            />
          </div>
          <div className="space-y-5 w-full md:w-1/2">
            {data?.why_lists.map((why, index: number) => (
              <div key={index}>
                <h3 className="font-semibold text-xl">{why.text}</h3>
                <p>{why.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 md:px-56 py-10 bg-gray-50 mt-10">
        <div className="w-full text-center">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">
              Jadwal dan Biaya
            </h1>
          </div>
        </div>
        {data?.populatedJadwalBiayas.map((jadwal, index: number) => {
          const startDate = dayjs(jadwal.class_start);
          const endDate = dayjs(jadwal.class_end);
          const durationInDays = endDate.diff(startDate, "day");
          const durationInWeeks = endDate.diff(startDate, "week");

          const formattedStartDate = dayjs(jadwal.class_start).format(
            "DD MMM YYYY"
          );
          const formattedEndDate = dayjs(jadwal.class_end).format(
            "DD MMM YYYY"
          );
          return (
            <div className="flex flex-col md:flex-row justify-between md:px-40 space-y-5">
              <div className="hidden md:flex flex-col justify-between items-center mx-6">
                <div
                  key={index}
                  className="flex flex-col items-center justify-center min-h-full relative"
                >
                  <div
                    className={`absolute z-0 top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 h-[100%] w-px 
                      ${
                        index === data?.populatedJadwalBiayas.length - 1
                          ? "bg-gray-200"
                          : "bg-gradient-to-t from-gray-200 to-transparent"
                      }`}
                  />
                  <span
                    className={`text-gray-700 text-center font-bold bg-gray-50 px-2 z-10 py-5 
                    ${
                      index === data?.populatedJadwalBiayas.length - 1
                        ? "rounded-full bg-gray-200 p-4"
                        : ""
                    }`}
                  >
                    {formattedStartDate}
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center md:w-[680px]">
                <Card className="w-full" key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{jadwal?.name}</CardTitle>
                      <Badge variant="secondary">
                        {durationInWeeks > 0
                          ? `${durationInWeeks} minggu`
                          : `${durationInDays} hari`}
                      </Badge>
                    </div>

                    <CardDescription>
                      Selasa - Kamis - Jumat (19:00 s/d 21:00)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <p>Mulai</p>
                        <p className="font-bold">{formattedStartDate}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p>Kelulusan</p>
                        <p className="font-bold">{formattedEndDate}</p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center gap-4 md:gap-10">
                      {jadwal?.isEarlyBirdDiscount && (
                        <div>
                          <p>Early Bird Price</p>
                          <h2 className="text-2xl font-bold text-red-600">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(jadwal?.earlyBirdPrice)}
                          </h2>
                        </div>
                      )}
                      <div>
                        <p>Normal Price</p>
                        <h2 className="text-2xl font-bold">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(jadwal?.normalPrice)}
                        </h2>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => handleScrollToForm(jadwal._id)}
                      variant="destructive"
                      className="px-10 py-6 w-full font-extrabold text-xl"
                    >
                      Daftar Sekarang
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={formRef} className="px-3 md:px-72 py-10 md:mt-10">
        <div className="w-full text-center">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">
              Formulir Pendaftaran
            </h1>
            {/* <p>
              Setelah kirim formulir, kamu akan ke halaman pembayaran Rp100rb.
              Biaya ini akan dipotong dari total pembayaran bootcamp!
            </p> */}
          </div>
        </div>
        <FormulirPendaftaran data={data} jadwalId={jadwalId} />
      </div>
      <div className="px-0 md:px-56 py-10 bg-gray-50 mt-10">
        <Faq data={data} />
      </div>

      <div className="py-10 md:pt-20">
        <div className="mb-6 flex justify-center items-center relative w-full">
          <h1 className="text-xl md:text-xl font-semibold mb-4 px-3 md:px-0 text-center md:text-left">
            Jadilah {data?.title} seperti mereka
          </h1>
        </div>
        <div className="md:mt-14 flex justify-center items-center relative w-full">
          <Button
            onClick={() => handleScrollToForm("")}
            variant="destructive"
            className="mt-6 md:mt-10 py-6 text-md font-bold"
          >
            {data?.text_button}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
