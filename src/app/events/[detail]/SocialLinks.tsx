"use client";

import { PiTelegramLogo } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import { Instagram, Linkedin, Globe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface SocialLinksProps {
  whatsapp?: string;
  telegram?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
}

export default function SocialLinks({
  whatsapp,
  telegram,
  instagram,
  linkedin,
  website,
}: SocialLinksProps) {
  const activeLinks = [
    { icon: PiTelegramLogo, url: telegram },
    { icon: FaWhatsapp, url: whatsapp },
    { icon: Instagram, url: instagram },
    { icon: Linkedin, url: linkedin },
    { icon: Globe, url: website },
  ].filter((link): link is { icon: any; url: string } => !!link.url);

  if (activeLinks.length === 0) return null;

  return (
    <div className="flex items-center gap-4 pt-2">
      {activeLinks.map(({ icon: Icon, url }) => (
        <Tooltip key={url}>
          <TooltipTrigger asChild>
            <Link href={url} target="_blank" rel="noopener noreferrer">
              <Icon className="w-4 h-4 cursor-pointer" />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-gray-100">
            <p>{url}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
