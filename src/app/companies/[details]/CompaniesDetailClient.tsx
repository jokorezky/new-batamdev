// app/companies/[slug]/CompaniesDetailClient.tsx
"use client";

import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { MapPin, Tag, User } from "lucide-react";
import Link from "next/link";
import SocialIcons from "@/components/SocialIcons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Job = {
  title: string;
  description: string;
  tags: string[];
};

type Company = {
  _id: string;
  url: string;
  name: string;
  country: string;
  industry: string;
  description: string;
  culture: string;
  employeeRange: string;
  logo: string;
  deletedAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const jobTags: string[] = ["Javascript", "GraphQL"];
// const jobsData: Job[] = Array(8).fill({
//   title: "Career Opportunities",
//   description: "Deploy your new project in one-click.",
//   tags: jobTags,
// });

const jobsData: Job[] = [];

interface CompaniesDetailClientProps {
  company: Company;
}

export default function CompaniesDetailClient({
  company,
}: CompaniesDetailClientProps) {
  return (
    <div className="relative w-full bg-gray-100">
      <header className="py-3 bg-gradient-to-r from-green-700 to-red-700 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
        <div className="w-full max-w-[1440px] mx-auto relative px-4 md:px-32">
          <div className="flex items-center py-6 md:py-10 px-4 md:px-0 relative z-10">
            <div className="w-full">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0">
                  <AspectRatio ratio={1}>
                    <Image
                      src={
                        company.logo ||
                        "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                      }
                      alt={`${company.name} logo`}
                      fill
                      className="rounded-md object-cover"
                      sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 128px"
                    />
                  </AspectRatio>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase relative w-fit after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:border-t-[1px] after:border-green-500">
                    {company.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-2">
                    <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
                      <MapPin size={12} />
                      <p>{company.country}</p>
                    </div>
                    <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
                      <Tag size={12} />
                      <p>{company.industry}</p>
                    </div>
                    <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
                      <User size={12} />
                      <p>{company.employeeRange}</p>
                    </div>
                  </div>
                  <SocialIcons size="14" spacex="space-x-3 sm:space-x-4" />
                </div>
              </div>
              <p className="text-white mt-3 sm:mt-4 text-sm sm:text-base">
                {company.description}
              </p>
              {company.culture && (
                <p className="text-white mt-3 sm:mt-4 text-sm sm:text-base">
                  <strong>Budaya Perusahaan:</strong> {company.culture}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="w-full max-w-[1440px] mx-auto relative">
        <main className="w-full px-4 sm:px-6 md:px-32 space-y-4 py-4 sm:py-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            Career Opportunities
          </h2>

          {jobsData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {jobsData.map((job, index) => (
                <Link href={`/jobs/${job.title}`} passHref key={index}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                        {job.description}
                      </CardDescription>
                      <Separator className="my-3 sm:my-4 mt-6 sm:mt-10 bg-gray-100" />
                      <CardContent className="p-0 pt-2 sm:pt-3">
                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag: string, idx: number) => (
                            <div
                              key={idx}
                              className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full flex items-center space-x-2 text-xs sm:text-sm"
                            >
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gray-50 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 17v-1a4 4 0 00-8 0v1m8 0H8m8 0a4 4 0 01-8 0M12 14v-3m0 0V8m0 3h3m-3 0H9"
                />
              </svg>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                Belum Ada Lowongan Tersedia
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-md">
                Saat ini belum ada posisi terbuka. Namun, kami selalu mencari
                talenta terbaik. Silakan kembali lagi nanti.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
