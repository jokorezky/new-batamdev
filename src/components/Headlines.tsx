import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

type PopulerProps = {
  title: string;
  url: string;
};

type CardProps = {
  title: string;
  content: string;
  url: string;
  image?: string;
  className?: string;
  popularItems: PopulerProps[];
  isLoading?: boolean;
  category?: string;
};

const HeadlineCard: React.FC<CardProps> = ({
  title,
  content,
  url,
  image,
  className,
  popularItems = [],
  isLoading,
  category,
}) => {
  if (isLoading) {
    return (
      <div className={`border rounded-sm ${className}`}>
        <AspectRatio ratio={16 / 9}>
          <Skeleton className="w-full h-full rounded-sm" />
        </AspectRatio>

        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  return (
    <article
      className={`border bg-white border-gray-200 rounded-b-sm transition ${className}`}
    >
      <Link href={`/${url}`} className="group block">
        {image && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-t-sm"
            />
          </AspectRatio>
        )}

        <div className="p-6 space-y-3">
          {category && (
            <p className="text-xs tracking-widest uppercase text-gray-500">
              {category}
            </p>
          )}

          <h1 className="text-3xl lg:text-4xl font-serif font-bold leading-tight text-gray-900 group-hover:underline">
            {title}
          </h1>
        </div>
      </Link>

      {popularItems.length > 1 && (
        <>
          <Separator className="bg-gray-200" />
          <div className="px-6 py-5 space-y-4">
            <p className="text-sm font-semibold tracking-wide text-gray-900">
              TOP HEADLINES
            </p>

            <ul className="space-y-3">
              {popularItems.slice(1, 4).map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${item.url}`}
                    className="block text-gray-800 font-medium leading-snug hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </article>
  );
};

export default HeadlineCard;
