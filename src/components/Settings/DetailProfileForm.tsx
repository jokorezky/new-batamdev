"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetMyOnboarding, useOnboardingUpdate } from "@/hooks/onboarding";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { MediaFolderType } from "@/types/MediaFolderType";
import { useFunctionCategories } from "@/hooks/use-functions-category";
import { uploadFile } from "@/hooks/uploadFile";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import ReactSelect from "react-select";
import { Controller } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import propinsiData from "@/constants/propinsi.json";

const SocialSchema = z.object({
  platform: z.string(),
  url: z.string().url().or(z.literal("")),
});

const PortfolioSchema = z.object({
  title: z.string(),
  url: z.string().url().or(z.literal("")),
});

const OnboardingSchema = z.object({
  province: z.string().optional(),
  city: z.string().optional(),
  bio: z.string().optional(),
  resumeUrl: z.string().optional(),

  socialLinks: z.array(SocialSchema).default([]),
  portfolios: z.array(PortfolioSchema).default([]),

  selectedSkills: z.array(z.string()).default([]),
});

type OnboardingFormValues = z.infer<typeof OnboardingSchema>;

export default function ProfileForm() {
  const { categories: functionOptions } = useFunctionCategories();
  const { onboarding } = useGetMyOnboarding();
  const { saveAll, loading: saving } = useOnboardingUpdate();
  const [selectedProvinsi, setSelectedProvinsi] = React.useState("");
  const [kotaOptions, setKotaOptions] = React.useState<
    { label: string; value: string }[]
  >([]);
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      province: "",
      city: "",
      bio: "",
      resumeUrl: "",
      socialLinks: [],
      portfolios: [],
      selectedSkills: [],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (onboarding) {
      reset({
        ...onboarding,
        socialLinks: onboarding.socialLinks ?? [],
        portfolios: onboarding.portfolios ?? [],
        selectedSkills: onboarding.selectedSkills ?? [],
      });
      if (onboarding.province) {
        form.setValue("province", onboarding.province);
        setSelectedProvinsi(onboarding.province);

        const selected = propinsiData.find(
          (p) => p.nama === onboarding.province
        );
        const cities =
          selected?.city.map((c: string) => ({ label: c, value: c })) || [];

        setKotaOptions(cities);
      }
    }
  }, [onboarding, reset]);

  React.useEffect(() => {
    if (kotaOptions.length > 0) {
      const exists = kotaOptions.some((c) => c.value === onboarding.city);
      if (exists) {
        console.log("SETTING CITY:", onboarding.city);
        form.setValue("city", onboarding.city);
      }
    }
  }, [kotaOptions]);

  const { append: addSocial } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const { append: addPortfolio } = useFieldArray({
    control,
    name: "portfolios",
  });

  const onSubmit = (values: OnboardingFormValues) => {
    console.log("values", values);
    saveAll(values);
  };

  const handleProvinsiChange = (
    provinsi: string,
    fieldOnChange?: (v: string) => void
  ) => {
    if (fieldOnChange) fieldOnChange(provinsi);

    form.setValue("province", provinsi);
    setSelectedProvinsi(provinsi);

    const selected = propinsiData.find((p) => p.nama === provinsi);

    const cities = selected
      ? selected.city.map((c: string) => ({ label: c, value: c }))
      : [];

    setKotaOptions(cities);
    form.setValue("city", "");
  };

  return (
    <Form {...form}>
      <Separator className="my-4 mt-10" />
      <p className="text-xl py-4 font-bold text-black">Candidate Profile</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Province</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(v) => {
                      handleProvinsiChange(v, field.onChange);
                    }}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="h-10 border border-gray-300 rounded px-3">
                      <SelectValue placeholder="Pilih provinsi" />
                    </SelectTrigger>

                    <SelectContent>
                      {propinsiData.map((p) => (
                        <SelectItem key={p.nama} value={p.nama}>
                          {p.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">City</FormLabel>
                <FormControl>
                  <Select
                    disabled={!selectedProvinsi}
                    onValueChange={(v) => field.onChange(v)}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="h-10 border border-gray-300 rounded px-3">
                      <SelectValue
                        placeholder={
                          selectedProvinsi
                            ? "Pilih kota"
                            : "Pilih provinsi terlebih dahulu"
                        }
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {kotaOptions.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <label className="font-semibold">Bio</label>
          <textarea
            {...register("bio")}
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>

        <FormField
          control={form.control}
          name="resumeUrl"
          render={() => (
            <FormItem>
              <FormLabel className="font-semibold">Upload Resume</FormLabel>
              <FormControl>
                <div className="w-full border border-dashed rounded-xl p-4 bg-white">
                  {form.watch("resumeUrl") && (
                    <a
                      href={form.watch("resumeUrl")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm block"
                    >
                      Lihat Resume Saat Ini
                    </a>
                  )}

                  <FileUpload
                    onChange={async (files: File[]) => {
                      if (!files || files.length === 0) return;

                      try {
                        const uploaded = await uploadFile(
                          files[0],
                          MediaFolderType.RESUME
                        );

                        form.setValue("resumeUrl", uploaded.data);
                      } catch (error) {
                        console.error("Upload gagal:", error);
                      }
                    }}
                  />
                </div>
              </FormControl>

              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Kami menerima dokumen PDF atau Microsoft Office dengan ukuran
                maksimal 5MB.
              </p>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-10 items-start">
          <div>
            <div className="capitalize text-sm font-medium text-gray-800">
              Tautan sosial
            </div>
            <div className="text-xs text-gray-500 mt-1">(opsional)</div>
          </div>

          <div className="space-y-5">
            {form.watch("socialLinks")?.map((_, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center gap-4"
              >
                <FormField
                  control={form.control}
                  name={`socialLinks.${index}.platform`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-32">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-10 border-0 border-b border-gray-300 rounded-none px-0">
                            <SelectValue placeholder="Pilih" />
                          </SelectTrigger>

                          <SelectContent>
                            {[
                              { label: "LinkedIn", value: "linkedin" },
                              { label: "Instagram", value: "instagram" },
                              { label: "GitHub", value: "github" },
                            ].map((s) => (
                              <SelectItem key={s.value} value={s.value}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`socialLinks.${index}.url`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="https://..."
                          className="h-10 border-0 border-b border-gray-300 rounded-none px-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="button"
                  onClick={() => {
                    const arr = form.getValues("socialLinks");
                    arr.splice(index, 1);
                    form.setValue("socialLinks", [...arr]);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addSocial({ platform: "linkedin", url: "" })}
              className="rounded-full px-4 text-sm h-9 border-gray-300 bg-gray-100 hover:bg-gray-200"
            >
              <Plus size={14} className="mr-2" /> TAMBAH LINK
            </Button>

            <p className="text-xs text-gray-500 leading-relaxed">
              Tahukah kamu? Hampir 92% perusahaan meninjau tautan media sosial
              saat menyeleksi kandidat.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-10 items-start">
          <div>
            <div className="text-sm font-medium text-gray-800">Portfolio</div>
            <div className="text-xs text-gray-500 mt-1">(opsional)</div>
          </div>

          <div className="space-y-5">
            {form.watch("portfolios")?.map((_, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center gap-4"
              >
                <FormField
                  control={form.control}
                  name={`portfolios.${index}.title`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-32">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-10 border-0 border-b border-gray-300 rounded-none px-0">
                            <SelectValue placeholder="Pilih" />
                          </SelectTrigger>

                          <SelectContent>
                            {[
                              { label: "GitHub", value: "github" },
                              { label: "Dribbble", value: "dribbble" },
                              { label: "Behance", value: "behance" },
                            ].map((p) => (
                              <SelectItem key={p.value} value={p.value}>
                                {p.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`portfolios.${index}.url`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="github.com/username"
                          className="h-10 border-0 border-b border-gray-300 rounded-none px-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="button"
                  onClick={() => {
                    const arr = form.getValues("portfolios");
                    arr.splice(index, 1);
                    form.setValue("portfolios", [...arr]);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => addPortfolio({ title: "github", url: "" })}
              className="rounded-full px-4 text-sm h-9 border-gray-300 bg-gray-100 hover:bg-gray-200"
            >
              <Plus size={14} className="mr-2" /> TAMBAH LINK
            </Button>

            <p className="text-xs text-gray-500 leading-relaxed">
              Silakan masukkan tautan portofoliomu di sini. Jika perlu
              mengunggah file, kamu dapat menggunakan Google Drive.
            </p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="selectedSkills"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Skills</FormLabel>
              <Controller
                control={form.control}
                name="selectedSkills"
                render={({ field }) => (
                  <ReactSelect
                    isMulti
                    options={functionOptions} // { label, value }[]
                    value={functionOptions.filter((opt) =>
                      field.value.includes(opt.value)
                    )}
                    onChange={(selected) => {
                      const values = (selected || []).map((s: any) => s.value);
                      field.onChange(values);
                    }}
                    placeholder="contoh: Javascript"
                  />
                )}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="secondary" disabled={saving}>
          {saving ? "MENYIMPAN..." : "SIMPAN"}
        </Button>
      </form>
    </Form>
  );
}
