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

const jobTags: string[] = ["Javascript", "GraphQL"];
const jobsData: Job[] = Array(8).fill({
  title: "Career Opportunities",
  description: "Deploy your new project in one-click.",
  tags: jobTags,
});

export default function CompaniesDetail() {
  return (
    <div className="relative w-full bg-gray-100">
      <header className="px-32 py-3 bg-gradient-to-r from-green-700 to-red-700 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
        <div className="flex items-center py-10 px-4 md:px-0 relative z-10">
          <div className="w-full">
            <div className="flex gap-6">
              <div className="w-32 h-32 flex-shrink-0">
                <AspectRatio ratio={1}>
                  <Image
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                    alt="photo"
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white uppercase relative w-fit after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:border-t-[1px] after:border-green-500">
                  SKILDEV
                </h1>
                <div className="flex items-center gap-6 mt-2">
                  <div className="flex items-center gap-1 text-white text-sm">
                    <MapPin size={12} />
                    <p>Indonesia</p>
                  </div>
                  <div className="flex items-center gap-1 text-white text-sm">
                    <Tag size={12} />
                    <p>Advertising</p>
                  </div>
                  <div className="flex items-center gap-1 text-white text-sm">
                    <User size={12} />
                    <p>11 – 50</p>
                  </div>
                </div>
                <SocialIcons size="14" spacex="space-x-4" />
              </div>
            </div>
            <p className="text-white mt-4">
              PT. Playmakers Synergic Group is a dynamic holding company
              operating in the fields of advertising, Influencer Marketing, 360
              marketing, and digital technology. The company oversees several
              subsidiaries, including PT. Mediatics Digital Indonesia
              (Mediatics), PT. Influencer Marketing Indonesia (Influence ID),
              PT. Circle Management Asia (Circle Managemement), and PT. Nexus
              Xybertech Solutions (NXS).
            </p>
          </div>
        </div>
      </header>
      <main className="w-full px-32 space-y-4 py-6">
        <h2 className="text-2xl font-bold">Career Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobsData.map((job, index) => (
            <Link href="/jobs/1" passHref>
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.description}</CardDescription>
                  <Separator className="my-4 mt-10 bg-gray-100" />
                  <CardContent className="p-0 pt-3">
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag: string, idx: number) => (
                        <div
                          key={idx}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center space-x-2 text-sm"
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
      </main>
    </div>
  );
}
