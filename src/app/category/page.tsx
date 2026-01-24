"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  NewspaperIcon,
  BriefcaseBusinessIcon,
  CalendarCheck,
} from "lucide-react";
import SocialIcons from "@/components/SocialIcons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { about } from "@/constants/example";

export default function AboutPage() {
  return (
    <div className="relative w-full bg-gray-100 min-h-screen">
      <header className="px-4 sm:px-8 lg:px-16 xl:px-52 py-3 bg-gradient-to-r from-green-900 to-green-700 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
        <div className="flex items-center py-6 md:py-8 lg:py-10 px-0 relative z-10">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <div className="flex flex-col items-start sm:items-center">
                <h1 className="text-sm font-bold text-white relative w-fit after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:border-t-[1px] after:border-green-500">
                  About
                </h1>
                <img
                  src="/Asset 1.svg"
                  alt="Logo"
                  className="mb-4 w-3/4 sm:w-1/2 md:w-3/4 max-w-[300px] mx-auto sm:mx-0"
                />
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: about }}
                className="text-base sm:text-lg md:text-xl font-medium text-white mt-1"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mb-8 sm:mb-10">
        <Separator className="h-8 sm:h-10 md:h-12 w-4/5 sm:w-3/4 md:w-3/5 bg-green-600 mx-auto" />
        <Separator className="h-6 sm:h-7 md:h-8 w-2/3 sm:w-1/2 md:w-1/3 bg-green-200 mx-auto" />
      </div>

      <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-52 space-y-6 pb-8 md:pb-10">
        <h1 className="text-sm font-bold text-gray-700 relative w-fit mx-auto sm:mx-0 after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:border-t-[1px] after:border-green-500">
          Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: (
                <NewspaperIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
              ),
              title: "Media",
              description:
                "Connecting the dots of information with cutting-edge insights. Stay informed with the latest tech news and analysis from Batam.",
            },
            {
              icon: (
                <BriefcaseBusinessIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
              ),
              title: "Jobs",
              description:
                "Connecting talent to opportunities. Helping you discover the best tech jobs and top professionals.",
            },
            {
              icon: (
                <CalendarCheck className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
              ),
              title: "Events",
              description:
                "Bringing communities together. Discover the latest tech events, workshops, and networking opportunities around you",
            },
          ].map((item) => (
            <Card
              key={item.description}
              className="rounded-3xl hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div>
                  <button className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    {item.icon}
                  </button>
                </div>
                <CardTitle className="pt-3 sm:pt-4 text-2xl sm:text-2xl md:text-3xl">
                  {item.title}
                </CardTitle>
                <Separator className="my-3 sm:my-4 mt-6 sm:mt-8 md:mt-10 bg-gray-100" />
                <CardContent className="p-0 pt-2 sm:pt-3">
                  <div className="flex flex-wrap gap-2 text-sm sm:text-base">
                    {item.description}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>

      {/* Follow Us Section */}
      <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-52 space-y-4 pb-10 sm:pb-12 md:pb-16">
        <h1 className="text-sm font-bold text-gray-700 relative w-fit mx-auto sm:mx-0 after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:border-t-[1px] after:border-green-500">
          Follow Us
        </h1>
        <div className="flex justify-center sm:justify-start">
          <SocialIcons fill="gray" />
        </div>
      </main>
    </div>
  );
}
