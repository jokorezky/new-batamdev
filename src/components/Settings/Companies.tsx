"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Eye, Building2, CheckCircle, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import ReusablePagination from "@/components/blocks/reusable-pagination";
import Link from "next/link";
import { useListMyCompanies } from "@/hooks/use-company";
import Image from "next/image";

export default function MyCompanies() {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [searchTerm] = useState("");
  const [industryFilter] = useState("all");
  const [countryFilter] = useState("all");

  const { companies, total, loading, error, refetch } = useListMyCompanies({
    page,
    limit,
    search: searchTerm ? { name: searchTerm } : undefined,
    filter: {
      industry: industryFilter !== "all" ? industryFilter : undefined,
      country: countryFilter !== "all" ? countryFilter : undefined,
    },
    order: {
      orderBy: "createdAt",
      sortBy: "DESC",
    },
  });

  useEffect(() => {
    refetch();
  }, [page, limit, searchTerm, industryFilter, countryFilter, refetch]);

  if (loading)
    return <div className="text-center py-8">Loading companies...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {companies.map((company) => (
          <Card key={company._id} className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <div className="w-full h-40 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
              </div>

              <div className="md:w-2/4 space-y-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{company.name}</h2>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Aktif</span>
                  </div>
                </div>

                {company.country && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="capitalize">{company.country}</span>
                  </div>
                )}

                {company.industry && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span className="capitalize">{company.industry}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {company.industry && (
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs capitalize">
                      {company.industry}
                    </span>
                  )}
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                    Aktif
                  </span>
                </div>

                {company.createdAt && (
                  <p className="text-sm text-muted-foreground">
                    Dibuat pada:{" "}
                    {format(new Date(company.createdAt), "dd MMMM yyyy")}
                  </p>
                )}
              </div>

              <div className="md:w-1/4 flex flex-col gap-2 justify-center">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/settings/companies/${company._id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/companies/${company.url}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    Detail
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/settings/job-listings">
                    <Users className="h-4 w-4 mr-2" />
                    Kelola Loker
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {companies.length > 0 && (
        <ReusablePagination
          page={page}
          limit={limit}
          total={total}
          onPageChange={setPage}
        />
      )}

      {companies.length === 0 && !loading && (
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">
            Anda belum membuat perusahaan apapun.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Mulai dengan membuat perusahaan pertama Anda untuk mengelola event
            dan komunitas.
          </p>
          <Button asChild className="text-white">
            <Link href="/companies/create">Buat Perusahaan Pertama</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
