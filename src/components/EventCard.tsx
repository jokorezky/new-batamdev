import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Community {
  name: string;
}

export const EventCard = ({
  image,
  startDate,
  title,
  address,
  slugname,
  community,
}: {
  image: string;
  startDate: string;
  title: string;
  address: string;
  slugname: string;
  community: Community;
}) => {
  const zonedDate = toZonedTime(new Date(startDate), "Asia/Jakarta");
  const formattedDate = format(zonedDate, "d MMMM yyyy", { locale: id });
  return (
    <div className="group col-span-1 md:col-span-4">
      <Link
        href={`/events/${slugname}`}
        prefetch={false}
        className="cursor-pointer relative space-y-3"
      >
        <AspectRatio ratio={10 / 6} className="bg-muted">
          <img
            // src={image}
            src={
              image &&
              (image.includes("coderjs.s3.ap-southeast-2.amazonaws.com") ||
                image.includes("properioid.s3.ap-southeast-1.amazonaws.com"))
                ? "/no-image.jpg"
                : image || "/no-image.jpg"
            }
            alt="event"
            className="h-full w-full object-cover bg-gray-200 transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </AspectRatio>
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
        <p className="font-bold text-xl leading-[1.1]">{title}</p>
        <p className="flex items-center gap-2 cursor-pointer">
          <p className="text-xs font-bold cursor-pointer hover:underline">
            Hosted by: {community.name}
          </p>
        </p>
        <Badge variant="secondary">{address}</Badge>
      </Link>
    </div>
  );
};
