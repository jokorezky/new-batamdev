"use client";

import React from "react";
import { useTotalApplicants } from "@/hooks/job-application";

interface TotalApplicantsProps {
  jobId: string;
  className?: string;
}

const TotalApplicants: React.FC<TotalApplicantsProps> = ({
  jobId,
  className = "",
}) => {
  const { total, loading, error } = useTotalApplicants(jobId);

  if (error) return <p className={className}>Failed to load applicants</p>;

  return (
    <p className={`flex items-center gap-1 ${className}`}>
      People Applied: {loading ? "..." : total}
    </p>
  );
};

export default TotalApplicants;
