import { FC } from "react";
import { MapPin, BriefcaseBusiness, Banknote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Job } from "@/types/jobs";
import { formatIDR } from "@/lib/currencyIdr";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface JobCardProps {
  data: Job;
}

const JobCard: FC<JobCardProps> = ({ data }) => {
  const createdAt = new Date(data.createdAt);
  const now = new Date();

  const createdDateOnly = new Date(
    createdAt.getFullYear(),
    createdAt.getMonth(),
    createdAt.getDate()
  );
  const nowDateOnly = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const diffDays = Math.floor(
    (nowDateOnly.getTime() - createdDateOnly.getTime()) / (1000 * 60 * 60 * 24)
  );

  const formattedDate =
    diffDays === 0
      ? "Today"
      : diffDays < 7
      ? `${diffDays} d`
      : format(createdAt, "d MMMM yyyy", { locale: id });

  const max = 8;
  const skills = data.skills || [];
  const displayed = skills.slice(0, max);
  const extra = skills.length - max;
  return (
    <Link href={`/jobs/${data._id}`} className="block">
      <Card
        className="
          group cursor-pointer border border-gray-200 dark:border-gray-800
          rounded-xl overflow-hidden bg-white dark:bg-gray-900
          shadow-sm hover:shadow-xl transition-all duration-300
          hover:-translate-y-1
        "
      >
        <CardHeader
          className="
            !flex-row !items-start !space-y-0
            gap-4 p-5
          "
        >
          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 border">
            <Image
              src={data.companyId.logo}
              alt={`${data.companyId.name} logo`}
              fill
              className="object-contain p-1"
            />
          </div>

          <div className="flex-1">
            <h3
              className="
                text-base sm:text-lg font-semibold tracking-tight
                group-hover:text-green-600 transition-colors line-clamp-1
                flex justify-between items-center w-full
              "
            >
              <span className="line-clamp-1 capitalize">{data.title}</span>
              <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                {formattedDate}
              </span>
            </h3>

            <p className="capitalize text-green-700 dark:text-green-400 font-medium text-sm hover:underline line-clamp-1">
              {data.companyId.name}
            </p>
          </div>
        </CardHeader>

        <CardContent className="px-5">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
              <MapPin size={12} />
              <span className="capitalize line-clamp-1">{data.location}</span>
            </div>
            <Badge className="rounded-full" variant="outline">
              {data.remoteAllowed ? "Remote" : "On-site"}
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mt-1">
            <BriefcaseBusiness size={12} />
            <span className="capitalize line-clamp-1">{data.jobType}</span>
          </div>
          <div className="flex capitalize items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
            <Banknote size={12} />
            <span>{data.salaryCurrency}</span>
            <span>
              {formatIDR(data.salaryMin)} - {formatIDR(data.salaryMax)}{" "}
              {data.billingHourly ? "/ jam" : ""}
            </span>
          </div>
        </CardContent>

        <CardFooter
          className="
            flex flex-wrap gap-1.5 p-3
            bg-gray-50/50 dark:bg-gray-900/50
            border-t border-gray-200 dark:border-gray-800
            backdrop-blur-sm
          "
        >
          {displayed.map((skill) => (
            <Badge
              key={skill}
              className="
            capitalize
            rounded-full px-2 py-0.5
            text-[10px] font-medium
            bg-gray-200 dark:bg-gray-800
            text-gray-800 dark:text-gray-200
            shadow-sm
            hover:scale-105 transition-transform
          "
            >
              {skill}
            </Badge>
          ))}

          {extra > 0 && (
            <Badge
              className="
            rounded-full px-2 py-0.5
            text-[10px] font-medium
            bg-blue-200 dark:bg-blue-800
            text-blue-800 dark:text-blue-200
            shadow-sm
          "
            >
              +{extra} lainnya
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;
