"use client"
import { useState } from "react";
import { FaFacebook, FaTwitter, FaWhatsapp, FaShareAlt } from "react-icons/fa";

const FloatingShareBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setIsOpen(false), 500);
  };

  return (
    <div
      className="fixed left-0 top-[15%] bg-green-700 p-2 transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center cursor-pointer">
          <FaShareAlt className="text-white text-2xl" />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen
              ? "opacity-100 scale-100 max-h-[180px]"
              : "max-h-0 opacity-0 scale-90"
          }`}
        >
          <div className="flex flex-col space-y-2 items-center p-3 w-14">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 flex items-center justify-center cursor-pointer">
                <FaFacebook className="text-white text-2xl hover:text-gray-300" />
              </div>
            </a>
            <a
              href="https://twitter.com/intent/tweet?url=YOUR_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 flex items-center justify-center cursor-pointer">
                <FaTwitter className="text-white text-2xl hover:text-gray-300" />
              </div>
            </a>
            <a
              href="https://api.whatsapp.com/send?text=YOUR_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 flex items-center justify-center cursor-pointer">
                <FaWhatsapp className="text-white text-2xl hover:text-gray-300" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingShareBox;
