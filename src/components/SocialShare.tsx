"use client";

import { Facebook, Twitter, Linkedin, Copy } from "lucide-react";
import { useState } from "react";

export default function SocialShare() {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex justify-end items-center space-x-3 relative">
      {[ 
        { icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
        { icon: Twitter, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}` },
        { icon: Linkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
      ].map((item, idx) => {
        const Icon = item.icon;
        return (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-gray-600 hover:text-gray-900 transition-transform transition-colors duration-300 transform hover:scale-110"
          >
            <Icon size={20} />
          </a>
        );
      })}

      <button
        onClick={handleCopy}
        className="relative p-2 rounded-full text-gray-600 hover:text-gray-900 transition-transform transition-colors duration-300 transform hover:scale-110"
      >
        <Copy size={20} />
        {copied && (
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
