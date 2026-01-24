"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthDialog } from "@/components/AuthDialog";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import CreatableSelect from "react-select/creatable";
import { SingleValue } from "react-select";

import { useCompaniesLite } from "@/hooks/use-company";

type OptionType = {
  value: string;
  label: string;
};

export default function JobsEmployers() {
  const router = useRouter();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const isAuthenticated = useAuth();

  const [selectedCompany, setSelectedCompany] = useState<OptionType | null>(
    null
  );
  const [keyword, setKeyword] = useState("");

  const { companies, loading } = useCompaniesLite(keyword);

  const options: OptionType[] = companies.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  useEffect(() => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true);
    }
  }, [isAuthenticated]);

  const handleChange = (newValue: SingleValue<OptionType>) => {
    setSelectedCompany(newValue);
    if (newValue) {
      router.push(`/jobs/create?company=${encodeURIComponent(newValue.label)}`);
    }
  };

  const handleCreate = (inputValue: string) => {
    const newOption = {
      value: inputValue.toLowerCase().replace(/\s+/g, "-"),
      label: inputValue,
    };

    setSelectedCompany(newOption);

    router.push(
      `/companies/create?company=${encodeURIComponent(newOption.label)}`
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-14">
      <h1 className="text-2xl font-bold mb-8 text-center tracking-tight">
        Sebelum kita melanjutkan...
      </h1>

      <Card className="border shadow-2xl rounded-2xl p-6 backdrop-blur-xl w-full max-w-lg">
        <CardContent className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <Image
              src="/company.png"
              alt="Company Icon"
              width={140}
              height={140}
              className="opacity-90"
            />
            <p className="mt-4 text-center text-sm md:text-base">
              Dari perusahaan mana Anda berasal?
            </p>
          </div>

          <div className="w-full text-black">
            <CreatableSelect
              isClearable
              options={options}
              onChange={handleChange}
              onCreateOption={handleCreate}
              value={selectedCompany}
              placeholder="Cari atau buat perusahaan..."
              onInputChange={(val, meta) => {
                if (meta.action === "input-change") {
                  setKeyword(val);
                }
              }}
              isLoading={loading}
              classNamePrefix="react-select"
            />
          </div>
        </CardContent>
      </Card>

      {isAuthenticated && (
        <AuthDialog open={authDialogOpen} setOpen={setAuthDialogOpen} />
      )}
    </div>
  );
}
