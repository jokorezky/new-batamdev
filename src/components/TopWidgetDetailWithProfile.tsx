"use client";
import SocialShare from "@/components/SocialShare";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Speech, RotateCcw } from "lucide-react";
import { useRef, useState, useEffect } from "react";

type userType = { full_name: string };
type CardProps = {
  title: string;
  content: string;
  category: string;
  url: string;
  thumbnail_url?: string;
  titleThumbnail?: string;
  userId: userType;
  createdAt: string;
  audio_url?: string;
};
type DataDetail = { data: CardProps };

const AudioVisualizer = ({ isPlaying }: { isPlaying: boolean }) => (
  <div className={`absolute right-2 bottom-2 flex items-end h-16 ${isPlaying ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="w-2 h-2 mx-0.5 bg-red-500 rounded-full"
        style={{
          animation: isPlaying ? `pulse ${0.5 + i * 0.1}s ease-in-out infinite alternate` : "none",
          height: isPlaying ? `${Math.random() * 24 + 8}px` : "8px",
          boxShadow: "0 0 6px rgba(255, 0, 0, 0.8)",
        }}
      />
    ))}
    <style jsx>{`
      @keyframes pulse {
        0% { height: 8px; }
        100% { height: 32px; }
      }
    `}</style>
  </div>
);

const TopWidget: React.FC<DataDetail> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    try {
      if (!audioRef.current && data?.audio_url) {
        audioRef.current = new Audio(data.audio_url);
        audioRef.current.preload = "auto";
        audioRef.current.addEventListener("ended", () => {
          setIsPlaying(false);
          if (audioRef.current) audioRef.current.currentTime = 0;
        });
      }
      if (isPlaying) {
        await audioRef.current?.pause();
      } else {
        await audioRef.current?.play().catch(() => alert("Silakan ketuk sekali lagi untuk memutar"));
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Audio error:", error);
    }
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", () => {});
        audioRef.current = null;
      }
    };
  }, []);

  const thumbnail = data?.thumbnail_url?.includes("coderjs.s3.ap-southeast-2.amazonaws.com")
    ? "/no-image.jpg"
    : data?.thumbnail_url || "/no-image.jpg";

  return (
    <div className="w-full flex justify-center py-6 px-4 bg-black">
      <div className="w-full max-w-3xl flex flex-col items-center space-y-3 pt-4">
        <div className="relative w-full rounded-xl overflow-hidden">
          <img
            src={thumbnail}
            alt={data?.title || "Story Image"}
            className="w-full h-48 sm:h-64 object-cover rounded-xl border-2 border-red-500/40"
          />
          <AudioVisualizer isPlaying={isPlaying} />
        </div>

        <p className="uppercase text-red-400 text-xs tracking-widest">{data?.category}</p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-red-500 text-center leading-snug drop-shadow-lg">{data?.title}</h3>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-300 text-sm sm:text-base">
          <p>{data?.userId?.full_name}</p>
          <span className="hidden sm:block">•</span>
          <p>{format(new Date(data.createdAt), "h:mm a - MMMM d, yyyy", { locale: id })}</p>
        </div>

        {data?.audio_url && (
          <div className="flex space-x-2 mt-3">
            <Button
              onClick={handlePlay}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 px-3 py-2"
            >
              <Speech className={`h-5 w-5 ${isPlaying ? "animate-beat" : ""}`} />
              {isPlaying ? "Jeda" : "Putar"}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-800/20 flex items-center gap-1 px-3 py-2"
            >
              <RotateCcw className="h-5 w-5" />
              Reset
            </Button>
          </div>
        )}

        <div className="w-full flex justify-center mt-2">
          <SocialShare />
        </div>
      </div>
    </div>
  );
};

export default TopWidget;
