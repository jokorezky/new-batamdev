"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCheckOnboardingStatus } from "@/hooks/onboarding";
import { useListJobs } from "@/hooks/use-jobs";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import JobCard from "@/components/JobCard";
import { useTranslations } from "next-intl";
import { JobCardSkeleton } from "@/components/blocks/job-skeleton";
import Link from "next/link";

import type { ListJobsInput, Job as JobType } from "@/types/jobs";

export default function Jobs(): JSX.Element {
  const { status, loading: loadingCheckOnboarding } =
    useCheckOnboardingStatus();
  const t = useTranslations("JobsPage");

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(9);

  const [filters, setFilters] = useState<{ type: string; value: string }[]>([]);
  const [showAddResumeLink, setShowAddResumeLink] = useState<boolean>(true);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  const listParams: ListJobsInput = {
    page,
    limit,
    search: { keyword: "" },
    filter: {},
    order: { sortBy: "DESC" },
  };

  const {
    jobs: jobsData,
    totalPage = 1,
    loading,
    error,
    refetch,
  } = useListJobs(listParams);

  const addFilter = (type: string, value: string) => {
    if (!filters.some((f) => f.type === type && f.value === value)) {
      setFilters((prev) => [...prev, { type, value }]);
    }
  };

  const removeFilter = (type: string, value: string) => {
    setFilters((prev) =>
      prev.filter((filter) => !(filter.type === type && filter.value === value))
    );
  };

  const clearAllFilters = () => setFilters([]);

  const isChecked = (type: string, value: string) =>
    filters.some((filter) => filter.type === type && filter.value === value);

  const locations = ["Jakarta", "Batam", "Bandung", "Yogyakarta", "Bali"].map(
    (loc) => t(`locations.${loc}`)
  );
  const skills = [
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "GraphQL",
    "TypeScript",
  ];
  const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship"].map(
    (type) => t(`jobTypes.${type.replace("-", "")}`)
  );
  const yearsOfExperience = ["<1 Year", "1-3 Years", "3-5 Years", ">5 Years"];
  const industries = ["IT", "Finance", "Healthcare", "Education", "Retail"].map(
    (ind) => t(`industries.${ind}`)
  );
  const salaries = ["<4Jt", "4JT-7Jt", "7Jt-11Jt", "11Jt-17Jt", ">17Jt"];

  return (
    <div className="relative w-full">
      {!loadingCheckOnboarding && !status?.isCompleted && showAddResumeLink && (
        <div className="px-4 md:px-32 py-3 bg-gradient-to-b from-green-700 to-green-900 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
          <div className="w-full max-w-[1440px] mx-auto relative">
            <div className="flex items-center justify-center py-10 md:py-5 px-4 md:px-0 relative z-10">
              <div className="w-full md:w-1/2 text-center pt-1">
                <div className="space-y-2">
                  <div className="space-y-0 capitalize flex items-center border border-w-1 p-2 rounded-sm relative">
                    <Button
                      className="absolute -right-5 -top-5 rounded-full bg-green-500 text-white hover:text-white hover:bg-green-700"
                      variant="outline"
                      size="icon"
                      onClick={() => setShowAddResumeLink(false)}
                    >
                      <X size={10} />
                    </Button>
                    <h1 className="text-sm text-white font-semibold">
                      <Link
                        href=""
                        className="underline cursor-pointer text-green-300 hover:text-green-200"
                      >
                        {t("addResume.title")}
                      </Link>{" "}
                      <span className="block md:inline">
                        {t("addResume.subtitle")}
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-4 md:px-32 py-2 pt-4 max-w-[1440px] mx-auto flex gap-2">
        <Popover data-align="start">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-md shadow-none p-6 font-bold"
            >
              <span>Location</span>
              {filters.some((f) => f.type === "Location") && (
                <span className="bg-blue-500 text-white rounded-full px-2 text-sm">
                  {filters.filter((f) => f.type === "Location").length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Location</h3>
                <Button
                  variant="link"
                  onClick={() => {
                    setFilters((prev) =>
                      prev.filter((f) => f.type !== "Location")
                    );
                  }}
                >
                  Reset
                </Button>
              </div>
              <div className="flex flex-col space-y-1">
                {locations.map((loc) => (
                  <label key={loc} className="flex items-center space-x-2">
                    <Checkbox
                      checked={isChecked("Location", loc)}
                      onCheckedChange={(checked) => {
                        if (checked) addFilter("Location", loc);
                        else removeFilter("Location", loc);
                      }}
                    />
                    <span>{loc}</span>
                  </label>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button
          variant="outline"
          onClick={() => setShowFilterModal(true)}
          className="flex items-center gap-2 rounded-md shadow-none p-6 font-bold"
        >
          <Filter size={16} />
          {t("filters.title")}
        </Button>
      </div>

      <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
        <DialogContent className="max-w-lg w-full p-6">
          <DialogHeader>
            <DialogTitle>{t("filters.title")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            {[
              { name: "Skill", items: skills },
              { name: "Experience", items: yearsOfExperience },
              { name: "Industry", items: industries },
              { name: "Salary", items: salaries },
              { name: "JobType", items: jobTypes },
            ].map((filterCategory) => (
              <div key={filterCategory.name}>
                <h3 className="font-semibold mb-2">
                  {t(`filterTypes.${filterCategory.name}`)}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {filterCategory.items.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        checked={isChecked(filterCategory.name, item)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            if (
                              filterCategory.name === "Experience" ||
                              filterCategory.name === "Salary"
                            ) {
                              setFilters((prev) => [
                                ...prev.filter(
                                  (f) => f.type !== filterCategory.name
                                ),
                                { type: filterCategory.name, value: item },
                              ]);
                            } else {
                              addFilter(filterCategory.name, item);
                            }
                          } else {
                            removeFilter(filterCategory.name, item);
                          }
                        }}
                        id={`modal-${filterCategory.name}-${item}`}
                        className="peer h-6 w-6 rounded border border-green-400 data-[state=checked]:bg-green-400 data-[state=checked]:text-white"
                      />
                      <label htmlFor={`modal-${filterCategory.name}-${item}`}>
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="w-full mt-4"
            >
              {t("clearFilters")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4 flex flex-col md:flex-row justify-between items-baseline px-4 md:px-32">
        {filters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <div
                key={`${filter.type}-${filter.value}-${index}`}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center space-x-2 text-sm"
              >
                <span>{`${t(`filterTypes.${filter.type}`)}: ${
                  filter.value
                }`}</span>
                <button
                  onClick={() => removeFilter(filter.type, filter.value)}
                  className="text-green-800 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 md:px-32 py-8 bg-gray-50 dark:bg-gray-900 rounded-xl mt-2">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {Array.from({ length: 3 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {!loading && error && (
            <p className="text-center w-full text-red-500">
              Error loading jobs.
              <button
                onClick={() => refetch?.()}
                className="ml-2 underline text-sm"
              >
                Retry
              </button>
            </p>
          )}
          {!loading && !error && jobsData.length === 0 && (
            <p className="text-center w-full">No jobs found.</p>
          )}
          {!loading &&
            !error &&
            jobsData.map((job) => <JobCard key={job._id} data={job} />)}
        </div>
      </div>
    </div>
  );
}
