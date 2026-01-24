import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface CompanyCardProps {
  data: {
    id: string;
    imageUrl: string;
    title: string;
    company: string;
    location?: string;
    description?: string;
    date?: string;
    slug: string;
    industry?: string;
  };
  isLast?: boolean;
}

const CompanyCard: FC<CompanyCardProps> = ({ data, isLast }) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
          <div className="w-full sm:w-32 h-32 flex-shrink-0 cursor-pointer mx-auto sm:mx-0">
            <Link href={`/companies/${data.slug}`}>
              <div className="relative w-full h-full rounded-md flex items-center justify-center">
                <Image
                  src={data.imageUrl}
                  alt={`Logo ${data.company}`}
                  fill
                  className="rounded-md object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 96px, 128px"
                />
              </div>
            </Link>
          </div>
          <div className="space-y-0  sm:text-left">
            <Link href={`/jobs/${data.id}`} className="inline-block">
              <h4 className="uppercase text-lg sm:text-xl font-bold cursor-pointer hover:underline">
                {data.company}
              </h4>
            </Link>
            <div className="flex flex-col sm:flex-row sm:gap-1 items-center text-sm text-gray-500">
              <p className="capitalize">{data.location}</p>
              <p className="hidden sm:block">•</p>
              <p className="capitalize">{data.industry}</p>
            </div>
            <p className="capitalize text-sm text-gray-500 pt-2 sm:pt-3">
              {data.description}
            </p>
          </div>
        </div>
      </div>
      {!isLast && <Separator className="my-5 mt-6 bg-gray-100" />}
    </div>
  );
};

export default CompanyCard;
