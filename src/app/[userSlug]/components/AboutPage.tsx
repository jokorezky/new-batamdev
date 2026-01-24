"use client";

import React, { useState, useRef, useEffect } from "react";
import { CommunityResponse } from "@/types/Community";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface UserSlugContentProps {
  community: CommunityResponse;
}

export default function EventPage({ community }: UserSlugContentProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [activeDate, setActiveDate] = useState("May, 2020");
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  const aboutContent = typeof community.about === 'string'
    ? JSON.parse(community.about)
    : community.about;

  const editor = useEditor({
    content: aboutContent,
    editable: false,
    extensions: [StarterKit],
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!calendarContainerRef.current) return;
      const calendarRect = calendarContainerRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const stickyStart = scrollPosition + calendarRect.top - 100;
      setIsSticky(scrollPosition > stickyStart);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dateElement = entry.target.querySelector("time");
            if (dateElement) {
              setActiveDate(dateElement.textContent || "May, 2020");
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "-100px 0px -100px 0px" }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="relative w-full pb-60 bg-gray-50">
      <div className="w-auto md:w-[calc(66.666%+2rem)] mx-4 md:mx-auto flex flex-col items-start">
        <div className="relative w-full flex flex-col md:flex-row gap-10">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-800 w-full space-y-3">
            <h1 className="text-md md:text-2xl font-bold">About</h1>
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}