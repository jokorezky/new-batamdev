"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
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

  const { register, handleSubmit, control, reset, formState: { errors } } = form;

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

        const selected = propinsiData.find((p) => p.nama === onboarding.province);
        const cities = selected?.city.map((c: string) => ({ label: c, value: c })) || [];
        setKotaOptions(cities);
      }
    }
  }, [onboarding, reset]);

  useEffect(() => {
    if (kotaOptions.length > 0) {
      const exists = kotaOptions.some((c) => c.value === onboarding.city);
      if (exists) form.setValue("city", onboarding.city);
    }
  }, [kotaOptions]);

  const { append: addSocial } = useFieldArray({ control, name: "socialLinks" });
  const { append: addPortfolio } = useFieldArray({ control, name: "portfolios" });

  const onSubmit = (values: OnboardingFormValues) => saveAll(values);

  const handleProvinsiChange = (provinsi: string, fieldOnChange?: (v: string) => void) => {
    if (fieldOnChange) fieldOnChange(provinsi);
    form.setValue("province", provinsi);
    setSelectedProvinsi(provinsi);

    const selected = propinsiData.find((p) => p.nama === provinsi);
    const cities = selected ? selected.city.map((c: string) => ({ label: c, value: c })) : [];
    setKotaOptions(cities);
    form.setValue("city", "");
  };

  return (
    <div className="bg-black min-h-screen p-6 text-white font-sans">
      <Form {...form}>
        <Separator className="my-4 border-red-500" />
        <p className="text-2xl py-4 font-bold text-red-500 tracking-wide uppercase">Candidate Profile</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-red-400">Province</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(v) => handleProvinsiChange(v, field.onChange)}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="h-12 border-2 border-red-500 rounded-lg bg-black text-white hover:shadow-lg hover:shadow-red-500/50 transition-all">
                        <SelectValue placeholder="Pilih provinsi" />
                      </SelectTrigger>
                      <SelectContent className="bg-black text-white">
                        {propinsiData.map((p) => (
                          <SelectItem key={p.nama} value={p.nama}>{p.nama}</SelectItem>
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
                  <FormLabel className="font-semibold text-red-400">City</FormLabel>
                  <FormControl>
                    <Select
                      disabled={!selectedProvinsi}
                      onValueChange={(v) => field.onChange(v)}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="h-12 border-2 border-red-500 rounded-lg bg-black text-white hover:shadow-lg hover:shadow-red-500/50 transition-all">
                        <SelectValue
                          placeholder={selectedProvinsi ? "Pilih kota" : "Pilih provinsi terlebih dahulu"}
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-black text-white">
                        {kotaOptions.map((c) => (
                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
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
            <label className="font-semibold text-red-400">Bio</label>
            <textarea
              {...register("bio")}
              className="w-full border-2 border-red-500 rounded-lg p-3 bg-black text-white placeholder-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              rows={4}
              placeholder="Tulis sedikit tentang dirimu..."
            />
          </div>

          <FormField
            control={form.control}
            name="resumeUrl"
            render={() => (
              <FormItem>
                <FormLabel className="font-semibold text-red-400">Upload Resume</FormLabel>
                <FormControl>
                  <div className="w-full border-2 border-dashed border-red-500 rounded-xl p-4 bg-black hover:shadow-lg hover:shadow-red-500/50 transition-all">
                    {form.watch("resumeUrl") && (
                      <a
                        href={form.watch("resumeUrl")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 underline text-sm block"
                      >
                        Lihat Resume Saat Ini
                      </a>
                    )}
                    <FileUpload
                      onChange={async (files: File[]) => {
                        if (!files || files.length === 0) return;
                        try {
                          const uploaded = await uploadFile(files[0], MediaFolderType.RESUME);
                          form.setValue("resumeUrl", uploaded.data);
                        } catch (error) {
                          console.error("Upload gagal:", error);
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <p className="text-xs text-red-500 mt-2 leading-relaxed">
                  Kami menerima dokumen PDF atau Microsoft Office max 5MB.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-5">
            {form.watch("socialLinks")?.map((_, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center gap-4">
                <FormField control={form.control} name={`socialLinks.${index}.platform`} render={({ field }) => (
                  <FormItem className="w-full md:w-32">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="h-10 border-b-2 border-red-500 rounded-none bg-black text-white">
                          <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                        <SelectContent className="bg-black text-white">
                          {[
                            { label: "LinkedIn", value: "linkedin" },
                            { label: "Instagram", value: "instagram" },
                            { label: "GitHub", value: "github" },
                          ].map((s) => (
                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name={`socialLinks.${index}.url`} render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="https://..."
                        className="h-10 border-b-2 border-red-500 rounded-none bg-black text-white placeholder-red-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <button type="button" onClick={() => {
                  const arr = form.getValues("socialLinks");
                  arr.splice(index, 1);
                  form.setValue("socialLinks", [...arr]);
                }} className="text-red-500 hover:text-red-400">
                  <X size={16} />
                </button>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={() => addSocial({ platform: "linkedin", url: "" })}
              className="rounded-full px-4 text-sm h-9 border-red-500 bg-black text-red-500 hover:bg-red-500 hover:text-black transition-all">
              <Plus size={14} className="mr-2" /> TAMBAH LINK
            </Button>
          </div>

          <FormField control={form.control} name="selectedSkills" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-red-400">Skills</FormLabel>
              <Controller
                control={form.control}
                name="selectedSkills"
                render={({ field }) => (
                  <ReactSelect
                    isMulti
                    options={functionOptions}
                    value={functionOptions.filter((opt) => field.value.includes(opt.value))}
                    onChange={(selected) => {
                      const values = (selected || []).map((s: any) => s.value);
                      field.onChange(values);
                    }}
                    placeholder="Contoh: Javascript"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        background: "#0D0D0D",
                        borderColor: "#FF3B3B",
                        color: "white",
                        minHeight: '44px',
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "#0D0D0D",
                        color: "white",
                        borderRadius: "8px",
                      }),
                      menuList: (base) => ({
                        ...base,
                        backgroundColor: "#0D0D0D",
                        color: "white",
                        padding: 0,
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#FF3B3B/20" : "#0D0D0D",
                        color: state.isSelected ? "#FF3B3B" : "white",
                        padding: "10px 15px",
                        cursor: "pointer",
                        "&:active": {
                          backgroundColor: "#FF3B3B/30",
                        },
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#FF3B3B/20",
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "#FF3B3B",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "#FF3B3B80",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "white",
                      }),
                    }}
                  />

                )}
              />
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" variant="secondary" disabled={saving}
            className="bg-red-500 text-black hover:bg-red-600 hover:text-white transition-all">
            {saving ? "MENYIMPAN..." : "SIMPAN"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
