import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow, subHours } from "date-fns";
import { id } from "date-fns/locale";

type CardProps = {
  title: string;
  image?: string;
  url: string;
  fullName?: string;
  className?: string;
  bgColor?: string;
  createdAt?: string;
  category?: string;
};

const LatestNewsCard: React.FC<CardProps> = ({
  title,
  image,
  bgColor,
  url,
  fullName,
  createdAt,
  category,
}) => {
  const postDate = createdAt ? new Date(createdAt) : subHours(new Date(), 1);

  const relativeTime = formatDistanceToNow(postDate, {
    locale: id,
    addSuffix: true,
  });
  return (
    <Link
      href={url}
      className={`flex items-center text-gray-900 overflow-hidden cursor-pointer space-x-4`}
    >
      {image && (
        <div className="w-1/3 shrink-0 bg-white">
          <AspectRatio
            ratio={window.innerWidth < 768 ? 1 : 16 / 9}
            className="bg-muted"
          >
            <Image
              src={image}
              alt="Photo by Drew Beamer"
              fill
              className="w-full object-cover"
            />
          </AspectRatio>
        </div>
      )}
      <div className="space-y-1 flex flex-col">
        <h4 className="text-green-600 text-xs lg:text-md uppercase">
          {category}
        </h4>
        {title && (
          <div
            className={`${bgColor ? `${bgColor} shadow-md px-4 py-2` : ""} 
              text-white rounded-br-lg rounded-tl-lg inline-block`}
          >
            <h2
              className={`text-md lg:text-2xl font-black capitalize tracking-tight min-h-[40px] flex items-center ${
                bgColor ? "text-white" : "text-black"
              }`}
            >
              {title}
            </h2>
            {fullName && (
              <div className="flex items-center space-x-3">
                <p className="text-gray-500 text-xs font-bold">
                  {fullName} - {relativeTime}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default LatestNewsCard;
