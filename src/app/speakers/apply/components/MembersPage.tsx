"use client";
import { useState, useEffect, useRef } from "react";
import { useCommunityMembers } from "@/hooks/use-community";
import { CommunityResponse, CommunityMember } from "@/types/Community";
import Link from "next/link";

export function CommunityMembers({
  community,
}: {
  community: CommunityResponse;
}) {
  const communityId = community._id;
  const [page, setPage] = useState(1);
  const [allMembers, setAllMembers] = useState<CommunityMember[]>([]);

  const { members, pagination, loading, error } = useCommunityMembers(
    communityId,
    page,
    10
  );

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    if (members?.length) {
      setAllMembers((prev) => {
        const newMembers = members.filter(
          (m: CommunityResponse) => !prev.find((p) => p._id === m._id)
        );
        return [...prev, ...newMembers];
      });
    }
    isLoadingRef.current = false;
  }, [members]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          !loading &&
          !isLoadingRef.current &&
          pagination?.hasNextPage
        ) {
          isLoadingRef.current = true;
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, pagination?.hasNextPage]);

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium py-6">
        Error loading members
      </div>
    );
  }

  return (
    <div className="relative w-full pb-60 bg-gray-50">
      <div className="w-auto md:w-[calc(66.666%+2rem)] mx-4 md:mx-auto flex flex-col items-start space-y-4">
        <h3 className="text-2xl font-bold tracking-tight">
          Members{" "}
          <span className="text-gray-500">({pagination?.total || 0})</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {allMembers.map((member, idx) => (
            <div
              key={member._id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-500 hover:shadow-xl md:hover:-translate-y-1 animate-fadeIn"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <Link
                href={`/p/${member.username}`}
                prefetch={false}
                className="cursor-pointer relative space-y-2"
              >
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={
                        member.picture ||
                        `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
                          member.full_name || member.username
                        )}`
                      }
                      alt={member.username}
                      className="w-20 h-20 rounded-full ring-4 ring-indigo-100 object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-gray-800 capitalize text-center truncate max-w-[90%] mx-auto">
                    {member.full_name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate max-w-[90%] mx-auto">
                    @{member.username}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-4 text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-indigo-500"></div>
          </div>
        )}

        <div ref={loaderRef} className="h-10"></div>
      </div>
    </div>
  );
}
