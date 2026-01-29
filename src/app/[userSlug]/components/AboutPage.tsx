"use client";

import React, { useState, useRef, useEffect } from "react";
import { CommunityResponse } from "@/types/Community";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface UserSlugContentProps {
  community: CommunityResponse;
}

export default function EventPage({ community }: UserSlugContentProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [activeDate, setActiveDate] = useState("May, 2020");
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  const aboutContent =
    typeof community.about === "string"
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
      const calendarRect =
        calendarContainerRef.current.getBoundingClientRect();
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
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
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-black via-neutral-950 to-black">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-red-600/20 blur-[140px] rounded-full" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24">
        <div className="mb-12">
          <span className="text-xs tracking-widest uppercase text-red-500/80">
            Community Insight
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-white">
            About This Community
          </h1>
          <p className="mt-3 text-sm md:text-base text-neutral-400 max-w-xl">
            Visi, misi, dan cerita di balik komunitas ini.
          </p>
        </div>

        <div
          ref={calendarContainerRef}
          className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.4)] p-8 md:p-12"
        >
          <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-p:text-neutral-300 prose-a:text-red-400">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </section>
  );
}
