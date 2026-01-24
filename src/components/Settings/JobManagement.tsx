"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Eye, MapPin, Building2, Briefcase } from "lucide-react";
import { format } from "date-fns";
import ReusablePagination from "@/components/blocks/reusable-pagination";
import Link from "next/link";
import { useListMyJobs } from "@/hooks/use-jobs";
import { ListJobsInput } from "@/types/jobs";
import { formatIDR } from "@/lib/currencyIdr";

export default function JobManagement() {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const { jobs, total, totalPage, loading, error, refetch } = useListMyJobs({
    page,
    limit,
    search: { keyword: "" },
  } as ListJobsInput);

  useEffect(() => {
    refetch?.({
      input: {
        page,
        limit,
        search: { keyword: "" },
      } as ListJobsInput,
    });
  }, [page, limit, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Hiring Dashboard</h1>
        <Button asChild className="text-white">
          <Link href="/jobs/employers">Buat Lowongan Baru</Link>
        </Button>
      </div>

      {jobs.length > 0 ? (
        <>
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card
                key={job._id}
                className="p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3 space-y-3">
                    <div className="flex items-center gap-2">
                      <h2 className="uppercase text-lg font-semibold">
                        {job.title}
                      </h2>
                    </div>

                    <div className="capitalize flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{job.companyId?.name}</span>
                    </div>

                    <div className="capitalize flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="capitalize px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
                        {job.function.replace("-", " ").trim()}
                      </span>
                      <span className="capitalize px-2 py-1 bg-green-100 text-green-800 rounded-md">
                        {job.jobType}
                      </span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md capitalize">
                        {job.experience} years
                      </span>
                    </div>

                    <p className="text-sm font-medium">
                      {job.salaryCurrency} {formatIDR(job.salaryMin)} –{" "}
                      {formatIDR(job.salaryMax)}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Dibuat pada:{" "}
                      {format(new Date(job.createdAt), "dd MMM yyyy")}
                    </p>
                  </div>

                  <div className="md:w-1/3 flex flex-col gap-2 justify-center">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/settings/job-listings/${job._id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/jobs/${job._id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Detail
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/settings/job-listings/${job._id}/applicants`}>
                        <Briefcase className="h-4 w-4 mr-2" />
                        Kelola Pelamar
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <ReusablePagination
            page={page}
            limit={limit}
            total={total}
            onPageChange={setPage}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">
            Anda belum membuat lowongan pekerjaan.
          </p>
          <Button asChild className="text-white">
            <Link href="/jobs/create">Buat Lowongan Pertama</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
