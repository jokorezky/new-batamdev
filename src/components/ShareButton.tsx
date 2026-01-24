import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  disabled?: boolean;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ disabled }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (disabled) return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShare}
      disabled={disabled}
      className="flex items-center gap-1 text-white text-xs sm:text-sm cursor-pointer bg-transparent hover:bg-transparent hover:text-white"
    >
      <Copy size={14} />
      {copied ? "Copied!" : "Share"}
    </Button>
  );
};
