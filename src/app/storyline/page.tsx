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

export default function Storyline() {
  return (
    <div className="relative w-full bg-gray-100 min-h-screen">
      <header className="py-3 bg-gradient-to-r  from-green-900 to-green-700 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
        <div className="w-full max-w-[1440px] mx-auto relative">
          <div className="flex items-center py-6 md:py-8 lg:py-10 px-0 relative z-10 px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="w-full">
              <div className="flex flex-col lg:flex-row gap-6 md:gap-12 lg:gap-32 items-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white capitalize text-center lg:text-left">
                  Storyline
                </h1>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 md:w-[45vw] h-12 md:bg-green-700 md:opacity-80 md:-z-10 md:-bottom-10" />
          </div>
        </div>
      </header>

      {/* Products Section */}
      <div className="w-full max-w-[1440px] mx-auto relative">
        <main className="w-full px-4 sm:px-8 lg:px-16 xl:px-32 space-y-6 pb-8 md:pb-10 my-16">
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
            ].map((item, index) => (
              <Card
                key={index}
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
      </div>

    </div>
  );
}
