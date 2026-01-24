import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, ArrowRight, Banknote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SocialIcons from "@/components/SocialIcons";
import SafeHTML from "@/components/blocks/safe-html";
import { formatIDR } from "@/lib/currencyIdr";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { JobActions } from "./components/job-action";
import ReportButton from "@/components/ReportButton";
import type { Metadata } from "next";
import { fetchJobData } from "@/lib/fetchJobData";
import TotalApplicants from "./components/total-applicants"

export const dynamicParams = true;
export const dynamic = "auto";

export async function generateMetadata(props: any): Promise<Metadata> {
  const params = await props.params;
  const id = params.details;

  const job = await fetchJobData(id);

  if (!job) {
    return {
      title: "Job not found",
      description: "The job you are looking for was not found.",
    };
  }
  const descriptionText = job?.companyId?.description;
  const canonicalUrl = `https://kinigo.id/jobs/${job._id}`;

  return {
    title: `${job.title} — ${job.companyId?.name}`,
    description: descriptionText,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${job.title} — ${job.companyId?.name}`,
      description: descriptionText,
      url: canonicalUrl,
      type: "article",
      images: job.companyId?.logo
        ? [
          {
            url: job.companyId.logo,
            width: 800,
            height: 600,
            alt: job.title,
          },
        ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: job.title,
      description: descriptionText,
      images: job.companyId?.logo ? [job.companyId.logo] : [],
    },
  };
}

export default async function DetailJobs(props: any) {
  const params = await props.params;
  const details = params.details;

  const job = await fetchJobData(details);

  if (!job) return <div>Not found</div>;

  const createdAt = new Date(job.createdAt);
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
  return (
    <div className="relative w-full bg-gray-100">
      <div className="py-3 bg-gradient-to-l from-green-700 to-green-900 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
        <div className="w-full max-w-[1440px] mx-auto relative">
          <div className="flex items-center py-6 md:py-5 relative z-10 px-4 md:px-32">
            <div className="w-full pt-3 md:pt-5">
              <div className="space-y-4 flex flex-col md:flex-row justify-between w-full">
                <div className="space-y-4 flex flex-row gap-4 sm:gap-6 w-full items-start sm:items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0 cursor-pointer">
                    <AspectRatio ratio={1}>
                      <Image
                        src={job.companyId?.logo || "/default.jpg"}
                        alt="photo"
                        fill
                        className="object-contain"
                      />
                    </AspectRatio>
                  </div>

                  <div className="space-y-1 !mt-0">
                    <p className="text-lg sm:text-xl md:text-2xl text-white uppercase font-bold">
                      {job.title}
                    </p>

                    <Link href={`/companies/${job.companyId?.url}`} passHref>
                      <p className="cursor-pointer capitalize text-gray-200 hover:underline text-sm md:text-base">
                        {job.companyId?.name}
                      </p>
                    </Link>

                    <div className="flex flex-col gap-2 sm:gap-2 pt-2">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-1 text-xs text-white">
                          <MapPin size={12} />
                          <span className="capitalize line-clamp-1">
                            {job.location}
                          </span>
                        </div>
                        <Badge
                          className="rounded-full text-white"
                          variant="outline"
                        >
                          {job.remoteAllowed ? "Remote" : "On-site"}
                        </Badge>
                      </div>

                      <div className="flex capitalize items-center gap-1 text-white text-xs">
                        <Banknote size={12} />
                        <span>{job.salaryCurrency}</span>
                        <span>
                          {formatIDR(job.salaryMin)} -{" "}
                          {formatIDR(job.salaryMax)}{" "}
                          {job.billingHourly ? "/ jam" : ""}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-6">
                        <div className="flex items-center gap-1 text-white text-xs">
                          <Clock size={12} />
                          <p>Created: {formattedDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <ReportButton jobId={job._id} />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-4 md:pt-6 text-white text-xs sm:text-sm">
                <p>
                  Function:{" "}
                  <span className="font-bold capitalize">
                    {job.function.replace("-", " ").trim()}
                  </span>
                </p>
                <p>
                  Type:{" "}
                  <span className="font-bold capitalize">{job.jobType}</span>
                </p>
                <p>
                  Experience:{" "}
                  <span className="font-bold">{job.experience} years</span>
                </p>
                <TotalApplicants jobId={job._id} />
              </div>
              <JobActions jobId={job._id} applyUrl={`/jobs/${job._id}/apply`} isActive={job.isActive}/>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto relative">
        <div className="relative w-full flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 px-4 sm:px-6 md:px-10 lg:px-32">
          <div className="w-full md:w-3/4 space-y-4 sm:space-y-5">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  Required Skills
                </CardTitle>
                <Separator className="my-4 bg-gray-100" />
                <CardContent className="p-0 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {job.skills?.map((skill: string) => (
                      <div
                        key={skill}
                        className="bg-green-100 capitalize text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  Description
                </CardTitle>
                <Separator className="my-4 bg-gray-100" />
                <CardContent className="p-0 pt-2">
                  <SafeHTML html={job.description} />
                </CardContent>
              </CardHeader>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="mb-1 sm:mb-2 text-lg sm:text-xl">
                  Culture
                </CardTitle>
                <Separator className="my-3 sm:my-4 mt-6 sm:mt-10 bg-gray-100" />
                <CardContent className="p-0 pt-2 sm:pt-3">
                  <SafeHTML html={job.companyId.culture} />
                </CardContent>
              </CardHeader>
            </Card>
          </div>

          <div className="w-full md:w-1/4 space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-5">
              <div className="space-y-2 sm:space-y-3">
                <p className="text-lg sm:text-xl font-bold">
                  About The Company
                </p>
                <Separator className="bg-gray-200" />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <p className="text-gray-500 text-xs sm:text-sm mb-4">
                  <SafeHTML html={job.companyId.description} />
                </p>
                <div className="space-y-0">
                  <p className="text-gray-500 text-xs">Location</p>
                  <p className="text-gray-800 text-sm capitalize">
                    {job.companyId.country}
                  </p>
                </div>
                <div className="space-y-0">
                  <p className="text-gray-500 text-xs">Industries</p>
                  <p className="text-gray-800 text-sm capitalize">
                    {job.companyId.industry}
                  </p>
                </div>
                <div className="space-y-0">
                  <p className="text-gray-500 text-xs">Employees</p>
                  <p className="text-gray-800 text-sm capitalize">
                    {job.companyId.employeeRange}
                  </p>
                </div>
              </div>
              <div className="hidden lg:block">
                <SocialIcons spacex="space-x-3 sm:space-x-4" fill="gray" />
              </div>
              <Separator className="bg-gray-200" />
              <Link href={`/companies/${job.companyId.url}`} passHref>
                <button className="border rounded-full bg-green-600 text-white hover:border-green-500 hover:text-white hover:bg-green-900 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-md flex items-center mt-3 sm:mt-5 w-full sm:w-auto justify-center">
                  Company Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>

            {/* <div className="space-y-2 sm:space-y-3">
              <p className="text-lg sm:text-xl font-bold">Similar Jobs</p>
              <Separator className="bg-gray-200" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
