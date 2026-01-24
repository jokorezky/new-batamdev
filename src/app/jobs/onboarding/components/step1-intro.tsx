"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Plus, X } from "lucide-react";
import { uploadFile } from "@/hooks/uploadFile";
import { MediaFolderType } from "@/types/MediaFolderType";
import { useGetMeQuery } from "@/hooks/useGetMeQuery";
import { useOnboardingForm } from "@/hooks/onboarding";
import propinsiData from "@/constants/propinsi.json";

const socialOptions = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
] as const;

const portfolioOptions = [
  { value: "github", label: "GitHub" },
  { value: "dribbble", label: "Dribbble" },
  { value: "behance", label: "Behance" },
  { value: "website", label: "Website Pribadi" },
  { value: "gdrive", label: "Google Drive" },
] as const;

const schema = z.object({
  province: z.string().min(1, "Pilih provinsi"),
  city: z.string().min(1, "Pilih kota"),

  socialLinks: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string().url("Masukkan URL yang valid"),
      })
    )
    .default([]),

  portfolios: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string().url("Masukkan URL yang valid"),
      })
    )
    .default([]),
});

export type ProfileFormValues = z.infer<typeof schema>;

export default function ProfileIntroForm({ onNext }: { onNext: () => void }) {
  const { data, refetch } = useGetMeQuery();
  const { submitStep1, loading } = useOnboardingForm();
  const [selectedProvinsi, setSelectedProvinsi] = React.useState("");
  const [kotaOptions, setKotaOptions] = React.useState<
    { label: string; value: string }[]
  >([]);

  const [profileImage, setProfileImage] = React.useState<string | null>(null);
  const [profileFile, setProfileFile] = React.useState<File | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      province: "",
      city: "",
      socialLinks: [],
      portfolios: [],
    },
  });

  React.useEffect(() => {
    refetch();
  }, []);

  React.useEffect(() => {
    if (!data?.getMe) return;

    const user = data.getMe;
    if (user.picture) {
      setProfileImage(user.picture);
    }
    if (user.province) {
      form.setValue("province", user.province);
      setSelectedProvinsi(user.province);

      const selected = propinsiData.find((p) => p.nama === user.province);
      const cities =
        selected?.city.map((c: string) => ({ label: c, value: c })) || [];

      setKotaOptions(cities);
    }
  }, [data]);

  React.useEffect(() => {
    if (!data?.getMe) return;
    const user = data.getMe;

    if (kotaOptions.length > 0) {
      const exists = kotaOptions.some((c) => c.value === user.city);
      if (exists) {
        console.log("SETTING CITY:", user.city);
        form.setValue("city", user.city);
      }
    }
  }, [kotaOptions]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }

    setProfileFile(file);
    setProfileImage(URL.createObjectURL(file));
  };

  const uploadProfileImage = async (): Promise<string> => {
    if (!profileFile) return "";

    try {
      const fileUrl = await uploadFile(
        profileFile,
        MediaFolderType.PROFILE_PHOTO
      );
      return fileUrl.data;
    } catch (error) {
      console.error("Upload gagal:", error);
      alert("Upload foto gagal, coba ulang.");
      throw error;
    }
  };

  const addSocial = () => {
    form.setValue("socialLinks", [
      ...form.getValues("socialLinks"),
      { platform: "linkedin", url: "" },
    ]);
  };

  const addPortfolio = () => {
    form.setValue("portfolios", [
      ...form.getValues("portfolios"),
      { platform: "github", url: "" },
    ]);
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

  const handleSubmit = form.handleSubmit(async (data) => {
    let uploadedImageUrl = profileImage || "";

    if (profileFile) {
      uploadedImageUrl = await uploadProfileImage();
    }

    const finalData = {
      ...data,
      profileImage: uploadedImageUrl,
    };

    try {
      await submitStep1(finalData);
      onNext();
    } catch (error) {
      console.error("Failed to save step 1:", error);
    }
  });

  return (
    <div className="w-full bg-white px-6 py-10 flex flex-col items-center">
      <div className="text-sm text-gray-500 mb-8">
        Menyiapkan profil kamu —{" "}
        <span className="font-semibold">11% selesai!</span>
      </div>

      <h1 className="text-3xl font-semibold text-center">
        Pertama, perkenalkan diri kamu.
      </h1>
      <p className="text-sm text-gray-500 text-center mt-2 max-w-xl">
        Ini membantu perusahaan untuk memahami kamu sebagai kandidat.
      </p>

      <div className="w-full max-w-4xl mt-10 md:mt-16 space-y-14">
        <Form {...form}>
          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-10 items-start">
              <div className="capitalize text-sm font-medium text-gray-800">
                Foto profil
              </div>

              <div className="relative w-24 h-24 rounded-full bg-gray-200 mx-auto md:mx-0">
                <img
                  src={profileImage || "/no-image.jpg"}
                  alt="profil"
                  className="w-full h-full object-cover rounded-full overflow-hidden"
                />

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute rounded-full top-1 right-1 z-10 text-gray-600 hover:text-gray-800 w-7 h-7"
                >
                  <X size={18} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-10 items-start">
              <div className="capitalize text-sm font-medium text-gray-800">
                Lokasi saat ini
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="sr-only">Propinsi</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(v) =>
                            handleProvinsiChange(v, field.onChange)
                          }
                          value={field.value || ""}
                        >
                          <SelectTrigger
                            className={`h-10 ${
                              form.formState.errors.province
                                ? "border-b-red-500"
                                : "border-b border-gray-300"
                            } border-0 rounded-none px-0`}
                          >
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
                      <FormLabel className="sr-only">Kota</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(v) => {
                            field.onChange(v);
                            form.setValue("city", v);
                          }}
                          value={field.value || ""}
                          disabled={!selectedProvinsi}
                        >
                          <SelectTrigger
                            className={`h-10 ${
                              form.formState.errors.city
                                ? "border-b-red-500"
                                : "border-b border-gray-300"
                            } border-0 rounded-none px-0`}
                          >
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
            </div>

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
                                {socialOptions.map((s) => (
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
                  onClick={addSocial}
                  className="rounded-full px-4 text-sm h-9 border-gray-300 bg-gray-100 hover:bg-gray-200"
                >
                  <Plus size={14} className="mr-2" /> TAMBAH LINK
                </Button>

                <p className="text-xs text-gray-500 leading-relaxed">
                  Tahukah kamu? Hampir 92% perusahaan meninjau tautan media
                  sosial saat menyeleksi kandidat.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-10 items-start">
              <div>
                <div className="text-sm font-medium text-gray-800">
                  Portfolio
                </div>
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
                      name={`portfolios.${index}.platform`}
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
                                {portfolioOptions.map((p) => (
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
                  onClick={addPortfolio}
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

            <div className="flex justify-end py-10">
              <Button
                type="submit"
                disabled={loading}
                className="px-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? "MENYIMPAN..." : "LANJUT"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
