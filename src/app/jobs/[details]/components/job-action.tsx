"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Pin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AuthDialog } from "@/components/AuthDialog";
import { useHasApplied } from "@/hooks/job-application";
import { useSaveJob, useHasSaved } from "@/hooks/save-job";
import { ShareButton } from "@/components/ShareButton";
export interface JobActionsProps {
  applyUrl: string;
  jobId: string;
  isActive: boolean;
  className?: string;
}

export const JobActions: React.FC<JobActionsProps> = ({
  applyUrl,
  jobId,
  isActive,
  className = "",
}) => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const isAuthenticated = useAuth();

  const { hasApplied, loading: applyingLoading } = useHasApplied(jobId);
  const { hasSaved, loading: savedLoading, refetch } = useHasSaved(jobId);
  const { saveJob, loading: savingJob } = useSaveJob();

  const requireAuth = (callback?: () => void) => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true);
      return false;
    }
    callback && callback();
    return true;
  };


  const handleSave = () =>
    !savingJob &&
    requireAuth(async () => {
      try {
        await saveJob({ jobId });
        refetch();
        console.log("Job saved!");
      } catch (err) {
        console.error("Failed to save job:", err);
      }
    });

  const handleApply = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setAuthDialogOpen(true);
    }
  };

  const isLoading = applyingLoading || savedLoading || savingJob;
  console.log("isActive", isActive)
  return (
    <>
      <AuthDialog open={authDialogOpen} setOpen={setAuthDialogOpen} />

      <div
        className={`flex flex-wrap justify-start sm:justify-end items-center gap-3 sm:gap-6 pt-4 md:pt-6 ${className}`}
      >
        <ShareButton disabled={isLoading || !isAuthenticated} />
        <div
          onClick={handleSave}
          className={`flex items-center gap-1 text-white text-xs sm:text-sm ${isLoading || hasSaved
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
            }`}
        >
          <Pin size={12} />
          <p>{hasSaved ? "Saved" : savingJob ? "Saving..." : "Save"}</p>
        </div>

        {/* Jika job tidak aktif, tampilkan tombol disabled */}
        {!isActive ? (
          <Button
            disabled
            className="bg-gray-400 cursor-not-allowed text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
          >
            This job is no longer available
          </Button>
        ) : hasApplied ? (
          <Button
            disabled
            className="bg-gray-400 cursor-not-allowed text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
          >
            Applied
          </Button>
        ) : (
          <Link href={applyUrl} passHref>
            <Button
              disabled={applyingLoading}
              onClick={handleApply}
              className="bg-green-800 hover:bg-green-900 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
            >
              {applyingLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={14} />
                  Loading...
                </div>
              ) : (
                "Apply"
              )}
            </Button>
          </Link>
        )}

      </div>
    </>
  );
};
