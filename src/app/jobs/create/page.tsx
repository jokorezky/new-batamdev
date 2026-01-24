"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CreatableSelect from "react-select/creatable";
import { SingleValue } from "react-select";
import TiptapEditorInput from "@/components/TiptapEditor";
import { JSONContent } from "@tiptap/core";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TextInput } from "@/components/blocks/text-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/Combobox";
import { useCompaniesLite } from "@/hooks/use-company";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import SkillsMultiSelect, {
  SkillOption,
} from "@/components/blocks/skills-multi-select";
import { useCreateJob } from "@/hooks/use-jobs";
import { CreateJobInput } from "@/types/jobs";
import { useFunctionCategories } from "@/hooks/use-functions-category";

type OptionType = { value: string; label: string };

const jobTypes = [
  { value: "full-time", label: "Penuh Waktu" },
  { value: "part-time", label: "Paruh Waktu" },
  { value: "contract", label: "Kontrak" },
  { value: "internship", label: "Magang" },
];

const experiences = [
  { value: "less-1", label: "Kurang dari 1 tahun" },
  { value: "1-3", label: "1 - 3 tahun" },
  { value: "3-5", label: "3 - 5 tahun" },
  { value: "5+", label: "5+ tahun" },
];

const countries = [
  // Singapura & Malaysia
  { value: "singapore", label: "Singapura" },
  { value: "kuala-lumpur", label: "Kuala Lumpur" },
  { value: "penang", label: "Penang" },
  { value: "johor-bahru", label: "Johor Bahru" },
  { value: "malaysia-other", label: "Malaysia (Lainnya)" },

  // Kepulauan Riau (Kepri)
  { value: "batam", label: "Batam" },
  { value: "bintan", label: "Bintan" },
  { value: "tanjung-pinang", label: "Tanjung Pinang" },
  { value: "lingga", label: "Lingga" },
  { value: "karimun", label: "Karimun" },

  // Opsi remote
  { value: "remote", label: "Remote" },
];

const salaryCurrencies = [
  { value: "USD", label: "USD" },
  { value: "SGD", label: "SGD" },
  { value: "IDR", label: "IDR" },
];

const jobSchema = z.object({
  company: z.string().min(1, "Nama perusahaan wajib diisi"),
  title: z.string().min(1, "Judul pekerjaan wajib diisi"),
  function: z.string().min(1, "Bidang pekerjaan wajib diisi"),
  jobType: z.string().min(1, "Tipe pekerjaan wajib diisi"),
  experience: z.string().min(1, "Pengalaman wajib diisi"),
  location: z.string().min(1, "Lokasi kerja wajib diisi"),
  remoteAllowed: z.boolean(),
  billingHourly: z.boolean(),
  salaryCurrency: z.string().optional(),
  salaryMin: z
    .string()
    .optional()
    .refine((v) => !v || /^\d+(\.\d{1,2})?$/.test(v), "Nominal tidak valid"),
  salaryMax: z
    .string()
    .optional()
    .refine((v) => !v || /^\d+(\.\d{1,2})?$/.test(v), "Nominal tidak valid"),
  description: z.string().min(20, "Deskripsi harus minimal 20 karakter"),
  skills: z.array(z.string()).min(1, "Minimal 3 skill wajib diisi"),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function JobCreatePage() {
  const [billingHourly, setBillingHourly] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const postFromCompany = searchParams?.get("company") ?? "";
  const [skills, setSkills] = useState<SkillOption[]>([]);
  const { companies = [], loading } = useCompaniesLite();
  const companyOptions: OptionType[] = useMemo(
    () => companies.map((c: any) => ({ value: c.id ?? c.name, label: c.name })),
    [companies]
  );
  const { categories: functionOptions } =
    useFunctionCategories();

  const { createJob, loading: loadingCreateJob } = useCreateJob();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      company: "",
      title: "",
      function: "",
      jobType: "full-time",
      experience: "less-1",
      location: "",
      remoteAllowed: false,
      salaryCurrency: "IDR",
      salaryMin: "",
      salaryMax: "",
      description: "",
      skills: [],
      billingHourly: false,
    },
  });

  useEffect(() => {
    if (postFromCompany) {
      form.setValue("company", postFromCompany);
    }
  }, [postFromCompany]);

  const [selectedCompany, setSelectedCompany] = useState<OptionType | null>(
    null
  );
  const [companyInput, setCompanyInput] = useState("");

  useEffect(() => {
    if (form.getValues("company")) {
      setSelectedCompany({
        label: form.getValues("company"),
        value: form.getValues("company"),
      });
    }
  }, []);

  const handleCompanyChange = (newValue: SingleValue<OptionType>) => {
    setSelectedCompany(newValue ?? null);
    form.setValue("company", newValue ? newValue.label : "");
  };

  const handleCompanyCreate = (inputValue: string) => {
    const newOpt = {
      value: inputValue.toLowerCase().replace(/\s+/g, "-"),
      label: inputValue,
    };
    setSelectedCompany(newOpt);
    form.setValue("company", newOpt.label);
  };

  const onTextEditorInput = (value: JSONContent) => {
    const description = JSON.stringify(value);
    form.setValue("description", description);
  };

  const onSubmit = async (data: JobFormValues) => {
    const payload: CreateJobInput = {
      company: data.company,
      title: data.title,
      function: data.function,
      jobType: data.jobType,
      experience: data.experience,
      location: data.location,
      remoteAllowed: data.remoteAllowed,
      salaryCurrency: data.salaryCurrency || "",
      salaryMin: data.salaryMin || "",
      salaryMax: data.salaryMax || "",
      description: data.description,
      skills: data.skills,
      billingHourly: billingHourly,
    };
    await createJob(payload);
    router.push('/settings/job-listings');
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border border-gray-100">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Pasang Lowongan
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Isi data lowongan Anda
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-3">
                <div className="text-xs text-gray-500 rounded-sm">
                  Pratinjau
                </div>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Perusahaan
                      </label>
                      <FormControl>
                        <CreatableSelect
                          isClearable
                          placeholder="Pilih atau buat perusahaan"
                          options={companyOptions}
                          isLoading={loading}
                          onInputChange={(val) => setCompanyInput(val)}
                          onChange={handleCompanyChange}
                          onCreateOption={handleCompanyCreate}
                          value={selectedCompany ?? null}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              minHeight: "44px",
                            }),
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Judul Pekerjaan
                      </label>
                      <FormControl>
                        <Input
                          placeholder="Contoh: Software Engineer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-400 mt-1">
                        Mohon hanya memasang lowongan untuk perusahaan Anda
                        sendiri.
                      </p>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="function"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Bidang Pekerjaan
                        </label>
                        <FormControl>
                          <Combobox
                            items={functionOptions}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Pilih bidang"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Tipe Pekerjaan
                        </label>
                        <FormControl>
                          <Combobox
                            items={jobTypes}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Pilih tipe pekerjaan"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Pengalaman
                        </label>
                        <FormControl>
                          <Combobox
                            items={experiences}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Pilih pengalaman"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Lokasi Kerja (Kota)
                        </label>
                        <FormControl>
                          <Combobox
                            items={countries}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Contoh: Batam"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="remoteAllowed"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-sm font-medium text-gray-800 mb-2 block">
                          Boleh Bekerja Remote?
                        </label>

                        <div className="flex bg-gray-900/40 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden w-fit">
                          <button
                            type="button"
                            onClick={() => field.onChange(true)}
                            className={`
                              w-20 py-2 text-sm font-semibold transition-all
                              ${field.value === true
                                ? "bg-blue-600 text-white shadow-[0_0_15px_3px_rgba(59,130,246,0.7)]"
                                : "text-gray-300 hover:bg-gray-800"
                              }
                            `}
                          >
                            YA
                          </button>

                          <button
                            type="button"
                            onClick={() => field.onChange(false)}
                            className={`
                              w-20 py-2 text-sm font-semibold transition-all border-l border-gray-700
                              ${field.value === false
                                ? "bg-red-600 text-white shadow-[0_0_15px_3px_rgba(220,38,38,0.7)]"
                                : "text-gray-300 hover:bg-gray-800"
                              }
                            `}
                          >
                            TIDAK
                          </button>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Skema Pembayaran
                  </label>

                  <div className="flex items-center space-x-3 border p-4 rounded-lg bg-gray-50">
                    <Switch
                      id="billing-mode"
                      checked={billingHourly}
                      onCheckedChange={setBillingHourly}
                    />
                    <Label htmlFor="billing-mode" className="text-gray-800">
                      {billingHourly
                        ? "Bayar Per Jam — biaya dihitung berdasarkan durasi kerja"
                        : "Langganan Bulanan — satu harga tetap setiap bulan"}
                    </Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                  <FormField
                    control={form.control}
                    name="salaryCurrency"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Mata Uang
                        </label>
                        <FormControl>
                          <Combobox
                            items={salaryCurrencies}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Mata uang"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salaryMin"
                    render={({ field }) => (
                      <TextInput
                        control={form.control}
                        name="salaryMin"
                        label="Minimal"
                        placeholder="Contoh: 2000000"
                        type="currency"
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salaryMax"
                    render={({ field }) => (
                      <TextInput
                        control={form.control}
                        name="salaryMax"
                        label="Maksimal"
                        placeholder="Contoh: 5000000"
                        type="currency"
                      />
                    )}
                  />

                  <div className="flex items-center justify-center h-full pt-6">
                    <span className="text-xs text-gray-400">
                      {billingHourly ? "per jam" : "per bulan"}
                    </span>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Deskripsi Pekerjaan
                      </label>
                      <FormControl>
                        <TiptapEditorInput
                          onChange={onTextEditorInput}
                          initialContent={
                            field.value
                              ? (JSON.parse(field.value) as JSONContent)
                              : undefined
                          }
                          placeholder="Jelaskan tanggung jawab, kualifikasi, dan benefit..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Required Skills
                  </label>

                  <SkillsMultiSelect
                    value={skills}
                    onChange={(v) => {
                      setSkills(v);
                      form.setValue(
                        "skills",
                        v.map((x) => x.label)
                      );
                    }}
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    Tambahkan minimal 3 skill.
                  </p>

                  <FormMessage />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto rounded-sm"
                      type="button"
                      onClick={() => router.back()}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Sebelumnya
                    </Button>

                    {/* <Button
                      type="button"
                      variant="ghost"
                      className="w-full sm:w-auto rounded-sm"
                      onClick={() =>
                        console.log("Preview data:", form.getValues())
                      }
                    >
                      Pratinjau
                    </Button> */}
                  </div>



                  <div className="flex gap-2 w-full sm:w-auto ml-auto">
                    {/* <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto rounded-sm"
                      onClick={() =>
                        console.log("Simpan draft:", form.getValues())
                      }
                    >
                      Simpan Draft
                    </Button> */}



                    <Button
                      type="submit"
                      disabled={loadingCreateJob}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-sm"
                    >
                      {loadingCreateJob ? (
                        <span className="flex items-center">
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          Memproses...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Terbitkan
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
                {Object.keys(form.formState.errors).length > 0 && (
                  <div className="w-full p-4 rounded-md border border-red-300 bg-red-50 text-red-700 text-sm space-y-1">
                    <p className="font-semibold text-red-800">Periksa kembali beberapa isian:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {Object.entries(form.formState.errors).map(([key, value]) => (
                        <li key={key}>
                          {value?.message ? value.message : `Field ${key} tidak valid.`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
