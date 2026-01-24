"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useTopCommunityBuilders } from "@/hooks/use-community";

interface CommunityBuilderCardProps {
  communityName: string;
  communityUrl: string;
  communityLogo: string;
  founderName: string;
  founderPicture: string;
  totalEvents: number;
  totalMembers: number;
}

const CommunityBuilderCard = ({
  communityName,
  communityUrl,
  communityLogo,
  founderName,
  founderPicture,
  totalEvents,
  totalMembers,
}: CommunityBuilderCardProps) => (
  <Link
    href={`/${communityUrl}`}
    prefetch={false}
    className="col-span-1 md:col-span-3 cursor-pointer relative group"
  >
    <Card className="h-full rounded-none overflow-hidden transition-all duration-300 hover:shadow-lg">
      <AspectRatio ratio={9 / 10} className="relative">
        {/* Community Logo */}
        <div className="absolute inset-0 bg-gray-100">
          {communityLogo ? (
            <img
              src={communityLogo}
              alt={communityName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
          )}
        </div>

        {/* Overlay with community info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <CardHeader className="p-0">
            <CardTitle className="text-lg truncate">{communityName}</CardTitle>
          </CardHeader>
          {/* <p className="text-sm opacity-90">{founderName}</p> */}

          <div className="flex items-center justify-between mt-3 text-xs">
            <span>{totalMembers} members</span>
            <span>{totalEvents} events</span>
          </div>
        </div>

        {/* Founder avatar */}
        {founderPicture && (
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full border-2 border-white overflow-hidden">
            <img
              src={founderPicture}
              alt={founderName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </AspectRatio>
    </Card>
  </Link>
);

const CommunityBuilderSkeleton = () => (
  <div className="col-span-1 md:col-span-3">
    <Skeleton className="rounded-2xl overflow-hidden">
      <AspectRatio ratio={9 / 10} />
    </Skeleton>
  </div>
);

interface CommunityBuildersSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export const CommunityBuildersSection = ({
  title = "Community Builders",
  description = "Meet the most active communities in our network",
  className = "",
}: CommunityBuildersSectionProps) => {
  const { topBuilders, loading } = useTopCommunityBuilders();
  const renderCommunityBuilders = () => {
    if (loading) {
      return (
        <>
          <CommunityBuilderSkeleton />
          <CommunityBuilderSkeleton />
          <CommunityBuilderSkeleton />
          <CommunityBuilderSkeleton />
        </>
      );
    }

    if (topBuilders.length === 0) {
      return (
        <div className="col-span-full text-center py-10 text-gray-500">
          No community builders found
        </div>
      );
    }

    return topBuilders.map((builder) => (
      <CommunityBuilderCard
        key={builder.communityId}
        communityName={builder.communityName}
        communityUrl={builder.communityUrl}
        communityLogo={builder.communityLogo}
        founderName={builder.founderName}
        founderPicture={builder.founderPicture}
        totalEvents={builder.totalEvents}
        totalMembers={builder.totalMembers}
      />
    ));
  };
  return (
    <section className={`py-5 lg:py-14 bg-gray-100 ${className}`}>
      <div className="w-full px-4 lg:px-32 max-w-[1440px] mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
          {description && <p className="text-gray-600 mt-2">{description}</p>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-5">
          {renderCommunityBuilders()}
        </div>
      </div>
    </section>
  );
};
