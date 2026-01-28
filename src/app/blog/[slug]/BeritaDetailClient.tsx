"use client";

import { useState, useEffect, useRef } from "react";
import TopWidgetDetailWithProfile from "@/components/TopWidgetDetailWithProfile";
import DetailLayout from "@/components/DetailLayout";

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
    <div className="relative px-4 pt-20 pb-28 md:pt-32 md:pb-30">
      <div ref={topWidgetRef}>
        <TopWidgetDetailWithProfile data={news} />
      </div>
      <div className="mt-0">
        <DetailLayout data={news} />
      </div>
    </div>
  );
}
