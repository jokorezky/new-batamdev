"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  NewspaperIcon,
  BriefcaseBusinessIcon,
  CalendarCheck,
  MicIcon
} from "lucide-react";
import SocialIcons from "@/components/SocialIcons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { about } from "@/constants/example";

export default function AboutPage() {
  return (
    <div className="relative w-full bg-gray-100">
      <header className=" py-3 bg-gradient-to-r from-green-900 to-green-700 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
        <div className="w-full max-w-[1440px] mx-auto relative px-4 md:px-52">
          <div className="flex items-center py-6 md:py-10 px-0 relative z-10">
            <div className="w-full">
              <div className="flex gap-4 md:gap-6">
                <div>
                  <h1 className="text-sm font-bold text-white relative w-fit after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:border-t-[1px] after:border-green-500">
                    About
                  </h1>
                  <img
                    src="/logo-no-text.png"
                    alt="Logo"
                    className="mb-4 w-1/2 md:w-1/5"
                  />
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: about }}
                className="text-base md:text-xl font-medium text-white mt-1"
              />
            </div>
          </div>
        </div>

      </header>
      <div className="mb-8 md:mb-10">
        <Separator className="h-8 md:h-12 w-4/5 md:w-3/5 bg-green-600" />
        <Separator className="h-6 md:h-8 w-2/3 md:w-1/3 bg-green-200" />
      </div>
      <div className="w-full max-w-[1440px] mx-auto relative">
        <main className="w-full px-4 md:px-32 space-y-4 pb-8 md:pb-10">

          <h1 className="text-sm font-bold text-gray-700 relative w-fit after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:border-t-[1px] after:border-green-500">
            Products
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rounded-3xl">
              <CardHeader>
                <div>
                  <button className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <NewspaperIcon className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                </div>

                <CardTitle className="pt-3 md:pt-4 text-2xl md:text-3xl">
                  Media
                </CardTitle>
                <Separator className="my-3 md:my-4 mt-6 md:mt-10 bg-gray-100" />
                <CardContent className="p-0 pt-2 md:pt-3">
                  <div className="flex flex-wrap gap-2 text-sm md:text-base">
                    Connecting the dots of information with cutting-edge insights.
                    Stay informed with the latest tech news and analysis from
                    Batam.
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
            <Card className="rounded-3xl">
              <CardHeader>
                <div>
                  <button className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <BriefcaseBusinessIcon className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                </div>

                <CardTitle className="pt-3 md:pt-4 text-2xl md:text-3xl">
                  Jobs
                </CardTitle>
                <Separator className="my-3 md:my-4 mt-6 md:mt-10 bg-gray-100" />
                <CardContent className="p-0 pt-2 md:pt-3">
                  <div className="flex flex-wrap gap-2 text-sm md:text-base">
                    "Connecting talent to opportunities. Helping you discover the
                    best tech jobs and top professionals."
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
            <Card className="rounded-3xl">
              <CardHeader>
                <div>
                  <button className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <CalendarCheck className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                </div>

                <CardTitle className="pt-3 md:pt-4 text-2xl md:text-3xl">
                  Events
                </CardTitle>
                <Separator className="my-3 md:my-4 mt-6 md:mt-10 bg-gray-100" />
                <CardContent className="p-0 pt-2 md:pt-3">
                  <div className="flex flex-wrap gap-2 text-sm md:text-base">
                    Bringing communities together. Discover the latest tech
                    events, workshops, and networking opportunities around you
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
            <Card className="rounded-3xl">
              <CardHeader>
                <div>
                  <button className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <MicIcon className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                </div>

                <CardTitle className="pt-3 md:pt-4 text-2xl md:text-3xl">
                  Podcast
                </CardTitle>
                <Separator className="my-3 md:my-4 mt-6 md:mt-10 bg-gray-100" />
                <CardContent className="p-0 pt-2 md:pt-3">
                  <div className="flex flex-wrap gap-2 text-sm md:text-base">
                    Discussions about technology, entrepreneurship, and community growth in Batam. GOTALK highlights the people and ideas driving the local tech ecosystem forward
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </main>
        <main className="w-full px-4 md:px-52 space-y-4 pb-8 md:pb-10">
          <h1 className="text-sm font-bold text-gray-700 relative w-fit after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:border-t-[1px] after:border-green-500">
            Follow Us
          </h1>
          <SocialIcons fill="gray" />
        </main>
      </div>
    </div>
  );
}
