"use client";

import React from "react";
import { useApplicants } from "@/hooks/job-application";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import jsPDF from "jspdf";

interface OnboardingData {
  resumeUrl?: string;
  selectedSkills?: string[];
}

interface UserData {
  full_name: string;
  email: string;
  picture?: string;
  phone_number?: string;
  onboarding?: OnboardingData;
}

export interface Applicant {
  _id: string;
  userId: UserData;
  createdAt: string;
}

export default function ApplicantsList(): JSX.Element {
  const { id: jobId } = useParams();

  const {
    applicants,
    loading,
    error,
  } = useApplicants(String(jobId));

  const handleDownloadResume = (url: string | undefined): void => {
    if (!url) return;
    console.log("url", url)
    console.log("masik sini")
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";
    link.target = "_blank";
    link.click();
  };

  
  const formatSkill = (skill: string) => {
    return skill
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("app.userId.onboarding?.resumeUrl", applicants[0].userId.onboarding?.resumeUrl)
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Daftar Pelamar</h2>

      {applicants.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">
          Belum ada pelamar.
        </p>
      ) : (
        applicants.map((app) => (
          <Card key={app._id} className="p-4 flex items-start gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={app.userId.picture} />
              <AvatarFallback>
                {app.userId.full_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h3 className="font-semibold">{app.userId.full_name}</h3>
              <p className="text-sm text-muted-foreground">{app.userId.email}</p>

              {app.userId.phone_number && (
                <p className="text-sm text-muted-foreground">
                  {app.userId.phone_number}
                </p>
              )}

              <p className="text-xs text-muted-foreground mt-1">
                Melamar pada: {format(new Date(app.createdAt), "dd MMM yyyy")}
              </p>

              {app.userId.onboarding?.resumeUrl && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-3"
                  onClick={() =>
                    handleDownloadResume(app.userId.onboarding?.resumeUrl)
                  }
                >
                  Download Resume
                </Button>
              )}

              {app.userId.onboarding?.selectedSkills &&
                app.userId.onboarding.selectedSkills.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-1">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {app.userId.onboarding.selectedSkills.map(
                        (skill: string, i: number) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
                          >
                            {formatSkill(skill)}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
