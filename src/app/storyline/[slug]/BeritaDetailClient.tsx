"use client";

import { useState, useEffect, useRef } from "react";
import StoryTopWidgetDetailWithProfile from "@/components/StoryTopWidgetDetailWithProfile";
import StoryDetailLayout from "@/components/StoryDetailLayout";
import FloatingShareButton from "@/components/FloatingShareButtons";

interface BeritaDetailClientProps {
  news: any;
}

export default function BeritaDetailClient({ news }: BeritaDetailClientProps) {
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);
  const topWidgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!topWidgetRef.current) return;
      const rect = topWidgetRef.current.getBoundingClientRect();
      setIsFloatingVisible(rect.bottom < 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div ref={topWidgetRef}>
        <StoryTopWidgetDetailWithProfile data={news} />
      </div>

      <div className="mt-0 lg:mt-20">
        <StoryDetailLayout data={news} />
      </div>
      <div className="hidden lg:block">
        {isFloatingVisible && <FloatingShareButton />}
      </div>
    </div>
  );
}
