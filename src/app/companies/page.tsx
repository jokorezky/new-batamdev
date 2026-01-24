"use client";

import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, ArrowDown, Loader2 } from "lucide-react";
import CompanyCard from "@/components/CompanyCard";
import { useGetCompanies, Company } from "@/hooks/use-company";

export default function Companies() {
  const [filters, setFilters] = useState<{ type: string; value: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { companies, total, totalPage, page, limit, loading, error, refetch } =
    useGetCompanies({
      page: currentPage,
      limit: itemsPerPage,
      filter: {
        industry: filters.find((f) => f.type === "Industry")?.value,
        country: filters.find((f) => f.type === "Country")?.value,
      },
      search: {
        name: filters.find((f) => f.type === "Search")?.value,
      },
      order: {
        orderBy: "createdAt",
        sortBy: "DESC",
      },
    });

  const addFilter = (type: string, value: string) => {
    if (
      !filters.some((filter) => filter.type === type && filter.value === value)
    ) {
      setFilters((prev) => [...prev, { type, value }]);
      setCurrentPage(1);
    }
  };

  const removeFilter = (type: string, value: string) => {
    setFilters((prev) =>
      prev.filter((filter) => !(filter.type === type && filter.value === value))
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters([]);
    setCurrentPage(1);
  };

  const isChecked = (type: string, value: string) => {
    return filters.some(
      (filter) => filter.type === type && filter.value === value
    );
  };

  useEffect(() => {
    refetch();
  }, [filters, currentPage, refetch]);

  const locations = ["Jakarta", "Batam", "Bandung", "Yogyakarta", "Bali"];
  const industries = [
    "IT",
    "Finance",
    "Healthcare",
    "Education",
    "Retail",
    "Physical AI",
  ];

  const renderLoading = () => (
    <div className="flex justify-center items-center py-10">
      <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      <span className="ml-2">Loading companies...</span>
    </div>
  );

  const renderError = () => (
    <div className="flex justify-center items-center py-10 text-red-500">
      Error loading companies. Please try again.
      <Button onClick={() => refetch()} className="ml-4">
        Retry
      </Button>
    </div>
  );

  const renderEmpty = () => (
    <div className="flex justify-center items-center py-10 text-gray-500">
      No companies found matching your criteria.
    </div>
  );

  return (
    <div className="relative w-full">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-3 bg-gradient-to-r from-green-700 to-red-700 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
        <div className="w-full max-w-[1440px] mx-auto relative">
          <div className="flex items-center justify-center py-6 md:py-10 px-0 relative z-10">
            <div className="w-full md:w-1/2 text-center pt-3 md:pt-5">
              <div className="space-y-4 md:space-y-6">
                <div className="flex justify-center items-center">
                  <p className="text-xs md:text-sm text-white uppercase relative w-fit after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-[100%] after:border-t-[1px] after:border-green-500">
                    Kinigo Companies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-2 pt-4">
        <div className="w-full max-w-[1440px] mx-auto relative px-4 sm:px-8 md:px-16 lg:px-32">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="py-2 flex items-center gap-1"
                  >
                    <span>Location</span>
                    <ArrowDown size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="p-4 space-y-3">
                    {locations.map((location) => (
                      <div
                        key={location}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={isChecked("Location", location)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addFilter("Location", location);
                            } else {
                              removeFilter("Location", location);
                            }
                          }}
                          id={location}
                          className="peer h-6 w-6 rounded border border-green-400 data-[state=checked]:bg-green-400 data-[state=checked]:text-white"
                        />
                        <label htmlFor={location}>{location}</label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="py-2 flex items-center gap-1"
                  >
                    <span>Industry</span>
                    <ArrowDown size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="p-4 space-y-3">
                    {industries.map((industry) => (
                      <div
                        key={industry}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={isChecked("Industry", industry)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addFilter("Industry", industry);
                            } else {
                              removeFilter("Industry", industry);
                            }
                          }}
                          id={industry}
                          className="peer h-6 w-6 rounded border border-green-400 data-[state=checked]:bg-green-400 data-[state=checked]:text-white"
                        />
                        <label htmlFor={industry}>{industry}</label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {filters.length > 0 && (
            <>
              <Separator className="my-4 bg-gray-100" />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-4">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter, index) => (
                    <div
                      key={`${filter.type}-${filter.value}-${index}`}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center space-x-2 text-sm"
                    >
                      <span>{`${filter.type}: ${filter.value}`}</span>
                      <button
                        onClick={() => removeFilter(filter.type, filter.value)}
                        className="text-green-800 hover:text-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="w-full sm:w-auto"
                >
                  Clear All Filters
                </Button>
              </div>
            </>
          )}
          <Separator className="my-4 mt-7 bg-gray-100" />
          {loading && renderLoading()}
          {error && renderError()}
          {!loading && !error && (
            <div className="py-5 space-y-6">
              {companies.length === 0 ? (
                renderEmpty()
              ) : (
                <>
                  {companies.map((company: Company, index: number) => (
                    <CompanyCard
                      key={company._id}
                      data={{
                        id: company._id,
                        imageUrl:
                          company.logo ||
                          "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
                        title: company.name,
                        company: company.name,
                        industry: company.industry || "N/A",
                        location: company.country,
                        description:
                          company.description || "No description available",
                        slug: company.url || "",
                      }}
                      isLast={index === companies.length - 1}
                    />
                  ))}

                  {totalPage > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-8">
                      <Button
                        variant="outline"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>

                      <span className="text-sm">
                        Page {currentPage} of {totalPage}
                      </span>

                      <Button
                        variant="outline"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPage)
                          )
                        }
                        disabled={currentPage === totalPage}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
