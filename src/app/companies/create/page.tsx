"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import CreatableSelect from "react-select/creatable";
import { SingleValue } from "react-select";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Combobox } from "@/components/Combobox";
import { uploadFile } from "@/hooks/uploadFile";
import { MediaFolderType } from "@/types/MediaFolderType";
import {
  ImageIcon,
  PencilIcon,
  Loader2,
  ArrowRight,
  ArrowLeft,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import { useCreateCompany, useCompaniesLite } from "@/hooks/use-company";

const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  country: z.string().min(1, "Country is required"),
  industry: z.string().min(1, "Industry is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  culture: z.string().optional(),
  employeeRange: z.string().min(1, "Employee range is required"),
  logo: z.any().optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

const industries = [
  { value: "e-commerce", label: "E-commerce Platforms" },
  { value: "fintech", label: "Financial Technology" },
  { value: "healthtech", label: "Health Technology" },
  { value: "edtech", label: "Education Technology" },
  { value: "saas", label: "Software as a Service" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "real-estate", label: "Real Estate" },
  { value: "transportation", label: "Transportation" },
  { value: "media", label: "Media & Entertainment" },
];

const countries = [
  { value: "singapore", label: "Singapore" },
  { value: "indonesia", label: "Indonesia" },
  { value: "malaysia", label: "Malaysia" },
  { value: "thailand", label: "Thailand" },
  { value: "vietnam", label: "Vietnam" },
  { value: "philippines", label: "Philippines" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "australia", label: "Australia" },
  { value: "japan", label: "Japan" },
];

const employeeRanges = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1001-5000", label: "1001-5000 employees" },
  { value: "5000+", label: "5000+ employees" },
];

const steps = [
  {
    id: "basic",
    title: "Basic Information",
    description: "Provide basic details about your company",
    fields: ["name", "country", "industry", "logo"],
  },
  {
    id: "about",
    title: "About Company",
    description: "Describe what your company does",
    fields: ["description"],
  },
  {
    id: "culture",
    title: "Company Culture & Size",
    description: "Share information about your work environment and team size",
    fields: ["culture", "employeeRange"],
  },
];

export default function CreateCompanyPage() {
  const { companies } = useCompaniesLite();
  const searchParams = useSearchParams();
  const companyFromParams = searchParams.get("company") || "";
  const postJobFromParams = searchParams.get("post-job") || "";
  const [currentStep, setCurrentStep] = useState(0);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      country: "",
      industry: "",
      description: "",
      culture: "",
      employeeRange: "",
      logo: null,
    },
  });

  const createCompanyMutation = useCreateCompany();

  const companyOptions =
    companies?.map((c: any) => ({
      value: c.name,
      label: c.name,
    })) ?? [];

  useEffect(() => {
    if (companyFromParams) {
      const exists = companyOptions.find(
        (option) =>
          option.value.toLowerCase() === companyFromParams.toLowerCase()
      );

      if (exists) {
        form.setValue("name", exists.value);
      } else {
        form.setValue("name", companyFromParams);
      }
    }
  }, [companyFromParams, companyOptions, form]);
  const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setLogoFile(file);
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    form.setValue("logo", file);
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    form.setValue("logo", null);
  };

  const uploadLogo = async (): Promise<string> => {
    if (!logoFile) return "";

    setIsUploading(true);
    try {
      const fileUrl = await uploadFile(logoFile, MediaFolderType.COMPANY_LOGO);
      setIsUploading(false);
      return fileUrl.data;
    } catch (error) {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: "Failed to upload logo. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const onSubmit = async (data: CompanyFormData) => {
    try {
      let logoUrl = "";
      if (logoFile) {
        logoUrl = await uploadLogo();
      }

      const companyData = {
        name: data.name,
        country: data.country,
        industry: data.industry,
        description: data.description,
        culture: data.culture,
        employeeRange: data.employeeRange,
        logo: logoUrl,
      };

      await createCompanyMutation.createCompany(companyData);

      toast({
        title: "Success",
        description: "Company created successfully",
      });
      if (postJobFromParams) {
        router.push("/");
      } else {
        router.push("/companies");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create company. Please try again.",
        variant: "destructive",
      });
    }
  };

  const nextStep = async () => {
    const currentStepFields = steps[currentStep].fields;
    const isValid = await form.trigger(currentStepFields as any);

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const triggerLogoInput = () => fileInputRef.current?.click();

  return (
    <div className="bg-background grid place-items-center px-6 py-10">
      <div className="w-full max-w-3xl p-6 md:p-10 bg-white rounded-lg shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Create Company
              </h1>
            </div>

            <div className="flex items-center justify-between mb-10">
              {steps.map((_, i) => (
                <div
                  key={_.id}
                  className={`w-full h-2 rounded-full mx-1 transition-all ${
                    i < currentStep
                      ? "bg-green-500"
                      : i === currentStep
                      ? "bg-green-300"
                      : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  {steps[currentStep].description}
                </p>

                {(() => {
                  const step = steps[currentStep].id;
                  switch (step) {
                    case "basic":
                      return (
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <CreatableSelect
                                    isClearable
                                    placeholder="Select or create company"
                                    value={
                                      field.value
                                        ? {
                                            value: field.value,
                                            label: field.value,
                                          }
                                        : null
                                    }
                                    onChange={(
                                      val: SingleValue<{
                                        value: string;
                                        label: string;
                                      }>
                                    ) => field.onChange(val ? val.value : "")}
                                    options={companyOptions}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormControl>
                                  <Combobox
                                    items={countries}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Select a country"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="industry"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormControl>
                                  <Combobox
                                    items={industries}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Select an industry"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="logo"
                            render={({ field }) => (
                              <FormItem>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  onChange={handleLogoUpload}
                                  className="hidden"
                                />
                                {logoPreview ? (
                                  <div className="relative w-40 h-40 mx-auto">
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-300">
                                      <Image
                                        src={logoPreview}
                                        alt="logo"
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="absolute top-0 right-2 flex gap-2 z-50">
                                      <button
                                        type="button"
                                        onClick={triggerLogoInput}
                                        className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 mt-2 mr-2"
                                      >
                                        <PencilIcon className="h-4 w-4" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={removeLogo}
                                        className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 mt-2"
                                      >
                                        <TrashIcon className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    onClick={triggerLogoInput}
                                    className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-10 rounded-xl hover:border-gray-400"
                                  >
                                    <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                                    <p className="text-gray-500">
                                      Click to upload logo
                                    </p>
                                  </div>
                                )}
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      );
                    case "about":
                      return (
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your company, its mission, vision, and what makes it unique..."
                                  {...field}
                                  rows={8}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      );
                    case "culture":
                      return (
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="culture"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe your company culture, values, and work environment..."
                                    {...field}
                                    rows={4}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="employeeRange"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormControl>
                                  <Combobox
                                    items={employeeRanges}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Select employee range"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      );
                  }
                })()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-10">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={createCompanyMutation.loading || isUploading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {createCompanyMutation.loading || isUploading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />{" "}
                      Creating...
                    </>
                  ) : (
                    "Create Company"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
