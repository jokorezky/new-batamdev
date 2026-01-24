"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import TiptapEditorInput from "@/components/TiptapEditor";
import { JSONContent } from "@tiptap/core";
import { useCreateCommunity } from "@/hooks/use-community";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  ImageIcon,
  Loader2,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { uploadFile } from "@/hooks/uploadFile";
import { MediaFolderType } from "@/types/MediaFolderType";
import Image from "next/image";

const communitySchema = z.object({
  name: z.string().min(3, "Community name must be at least 3 characters"),
  about: z.string().min(20, "About must be at least 20 characters"),
  logo: z.any().refine((file) => file, "Logo is required"),
  cover: z.any().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type CommunityFormInputs = z.infer<typeof communitySchema>;

const steps = [
  {
    id: "name",
    title: "What's your community name?",
    description: "Choose a name that represents your community's identity",
    field: "name",
  },
  {
    id: "about",
    title: "Tell us about your community",
    description: "What makes your community special? What's your mission?",
    field: "about",
  },
  {
    id: "logo",
    title: "Upload your community logo",
    description: "A square image that represents your community (min 256x256)",
    field: "logo",
  },
  {
    id: "cover",
    title: "Add a cover image (optional)",
    description:
      "A wide banner image that will appear at the top of your community page",
    field: "cover",
  },
  {
    id: "website",
    title: "Community website (optional)",
    description: "Add a link to your community's website if you have one",
    field: "website",
  },
];

export default function CommunityCreateForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleEditorChange = (value: JSONContent) => {
    const description = JSON.stringify(value);
    setValue("about", description);
  };

  const formMethods = useForm<CommunityFormInputs>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      name: "",
      about: "",
      logo: null,
      cover: null,
      website: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = formMethods;

  const { createCommunity, loading, error } = useCreateCommunity();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("cover", file);
      const reader = new FileReader();
      reader.onloadend = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const isJsonString = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const htmlToTiptap = (html: string): JSONContent => {
    return {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: html.replace(/<[^>]*>/g, ""),
            },
          ],
        },
      ],
    };
  };

  const aboutValue = watch("about");

  const getInitialContent = () => {
    if (!aboutValue) return undefined;

    try {
      if (isJsonString(aboutValue)) {
        return JSON.parse(aboutValue) as JSONContent;
      } else {
        // Handle HTML string or plain text
        return htmlToTiptap(aboutValue);
      }
    } catch (e) {
      console.error("Error parsing about content:", e);
      return undefined;
    }
  };

  const triggerLogoInput = () => logoInputRef.current?.click();
  const triggerCoverInput = () => coverInputRef.current?.click();

  const nextStep = async () => {
    const field = steps[currentStep].field as keyof CommunityFormInputs;
    const isValid = await trigger(field);

    if (!isValid) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data: CommunityFormInputs) => {
    setIsSubmitting(true);
    try {
      let logoUrl = "";
      if (data.logo instanceof File) {
        const result = await uploadFile(data.logo, MediaFolderType.COMMUNITY);
        logoUrl = result.data;
      }

      let coverUrl = "";
      if (data.cover instanceof File) {
        const result = await uploadFile(data.cover, MediaFolderType.COMMUNITY);
        coverUrl = result.data;
      }
      const payload = {
        name: data.name,
        about: data.about,
        logo: logoUrl,
        cover: coverUrl,
        website: data.website,
      };
      const response = await createCommunity(payload);
      if (response) {
        router.push(`/${response.url}`);
      }
    } catch (error) {
      console.error("Error creating community:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background grid place-items-center px-6 mb-10">
      <div className="w-full max-w-3xl p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Create Community
            </h1>
            <p className="text-gray-500">
              Build your own community and connect with like-minded people
            </p>
          </div>
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              {steps.map((_, i) => (
                <div
                  key={_.field}
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
                    case "name":
                      return (
                        <Input
                          {...register("name")}
                          className=""
                          placeholder="e.g. Tech Innovators"
                        />
                      );
                    case "about":
                      return (
                        <TiptapEditorInput
                          onChange={handleEditorChange}
                          initialContent={getInitialContent()}
                          imageInline={false}
                        />
                      );
                    case "logo":
                      return (
                        <div>
                          <input
                            type="file"
                            ref={logoInputRef}
                            onChange={handleLogoChange}
                            accept="image/*"
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
                        </div>
                      );
                    case "cover":
                      return (
                        <div>
                          <input
                            type="file"
                            ref={coverInputRef}
                            onChange={handleCoverChange}
                            accept="image/*"
                            className="hidden"
                          />
                          {coverPreview ? (
                            <div className="relative w-full h-48 rounded-xl overflow-hidden">
                              <Image
                                src={coverPreview}
                                alt="cover"
                                fill
                                className="object-cover"
                              />

                              {/* Tombol edit & delete */}
                              <div className="absolute bottom-4 right-4 flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCoverPreview(null);
                                    setValue("cover", null);
                                  }}
                                  className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={triggerCoverInput}
                                  className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={triggerCoverInput}
                              className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-xl hover:border-gray-400"
                            >
                              <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                              <p className="text-gray-500">
                                Click to upload cover image
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    case "website":
                      return (
                        <Input
                          {...register("website")}
                          placeholder="https://yourcommunity.com"
                        />
                      );
                  }
                })()}
                {errors[
                  steps[currentStep].field as keyof CommunityFormInputs
                ] && (
                  <p className="text-red-500 text-sm mt-2">
                    {
                      errors[
                        steps[currentStep].field as keyof CommunityFormInputs
                      ]?.message as string
                    }
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-between">
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
                  key="next-btn"
                  type="button"
                  onClick={nextStep}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  key="submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />{" "}
                      Creating...
                    </>
                  ) : (
                    "Create Community"
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
