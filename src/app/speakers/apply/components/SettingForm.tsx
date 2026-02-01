"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/Form";
import { InputField } from "@/components/InputField";
import TiptapEditorInput from "@/components/TiptapEditor";
import { CategoryAsyncSelect } from "@/components/CommunityAsyncMultiSelect";
import propinsiData from "@/constants/propinsi.json";
import { SelectBoxField } from "@/components/SelectBoxField";
import { useUpdateCommunity } from "@/hooks/use-community";
import { JSONContent } from "@tiptap/core";

const communitySchema = z.object({
  name: z.string().min(1, "Community name is required").max(250),
  about: z.string().optional(),
  telegram: z.string().url("Invalid URL").or(z.string().length(0)).optional(),
  instagram: z.string().url("Invalid URL").or(z.string().length(0)).optional(),
  linkedin: z.string().url("Invalid URL").or(z.string().length(0)).optional(),
  website: z.string().url("Invalid URL").or(z.string().length(0)).optional(),
  whatsapp: z.string().url("Invalid URL").or(z.string().length(0)).optional(),
  categories: z.preprocess(
    (val) => (Array.isArray(val) ? val : []),
    z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .optional()
  ),
  province: z.string().optional(),
  city: z.string().optional(),
});

type CommunityFormInputs = z.infer<typeof communitySchema>;

export default function CommunityForm({ community }: { community?: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProvinsi, setSelectedProvinsi] = useState<string>("");
  const [kotaOptions, setKotaOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const form = useForm<CommunityFormInputs>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      name: community?.name || "",
      about: community?.about || "",
      telegram: community?.telegram || "",
      instagram: community?.instagram || "",
      linkedin: community?.linkedin || "",
      website: community?.website || "",
      whatsapp: community?.whatsapp || "",
      categories: Array.isArray(community?.categories)
        ? community.categories.map((cat: any) => ({
            value: cat._id.toString(),
            label: cat.name,
          }))
        : [],
      province: community?.province || "",
      city: community?.city || "",
    },
  });

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
              text: html.replace(/<[^>]*>/g, ""), // Remove HTML tags
            },
          ],
        },
      ],
    };
  };

  const { updateCommunity, loading, error } = useUpdateCommunity();
  const { watch, setValue, control } = form;
  const aboutValue = watch("about");
  const provinceValue = watch("province");

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

  useEffect(() => {
    if (provinceValue) {
      handleProvinsiChange(provinceValue);
      if (community?.city && community?.province === provinceValue) {
        setValue("city", community.city);
      }
    }
  }, [provinceValue, community?.city, community?.province]);

  const handleProvinsiChange = (provinsi: string | undefined) => {
    setSelectedProvinsi(provinsi ?? "");
    const selected = propinsiData.find((p) => p.nama === (provinsi ?? ""));
    const cities = selected
      ? selected.city.map((c) => ({ label: c, value: c }))
      : [];
    setKotaOptions(cities);

    if (!cities.some((c) => c.value === watch("city"))) {
      setValue("city", "");
    }
  };

  useEffect(() => {
    handleProvinsiChange(provinceValue);
  }, [provinceValue]);

  const handleEditorChange = (value: JSONContent) => {
    const description = JSON.stringify(value);
    setValue("about", description);
  };

  const onSubmit = async (data: CommunityFormInputs) => {
    setIsSubmitting(true);

    try {
      const categoriesArray = Array.isArray(data.categories)
        ? data.categories
        : [];

      const communityData = {
        name: data.name,
        about: data.about,
        telegram: data.telegram,
        instagram: data.instagram,
        linkedin: data.linkedin,
        website: data.website,
        whatsapp: data.whatsapp,
        categories: categoriesArray.map((cat) => cat.value),
        province: data.province,
        city: data.city,
      };
      await updateCommunity(community._id, communityData);
    } catch (error) {
      console.error("Error submitting community:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-[80%] space-y-5">
      <h1 className="text-md md:text-2xl font-bold">Settings</h1>
      <Form form={form} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <div className="flex flex-col gap-y-3">
            <InputField
              label="Community Name"
              name="name"
              placeholder="Community Name"
              type="text"
              description="The name of your community"
              isRequired
            />

            <div className="space-y-2">
              <p className="font-bold text-sm">About Community</p>
              <div className="space-y-1">
                <TiptapEditorInput
                  onChange={handleEditorChange}
                  initialContent={getInitialContent()}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="space-y-1">
                <Controller
                  name="categories"
                  control={control}
                  render={({ field }) => (
                    <CategoryAsyncSelect
                      label="Categories Community"
                      name="categories"
                      field={field}
                      isMulti
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SelectBoxField
                label="Province"
                name="province"
                options={propinsiData.map((p) => ({
                  label: p.nama,
                  value: p.nama,
                }))}
              />
              <SelectBoxField
                label="City"
                name="city"
                options={kotaOptions}
                isDisabled={!selectedProvinsi}
              />
            </div>

            <InputField
              label="Telegram Group"
              name="telegram"
              placeholder="https://t.me/yourgroup"
              type="text"
              description="Link to your Telegram group"
            />

            <InputField
              label="WhatsApp Group"
              name="whatsapp"
              placeholder="https://chat.whatsapp.com/yourgroup"
              type="text"
              description="Link to your official WhatsApp group"
            />

            <InputField
              label="Instagram Profile"
              name="instagram"
              placeholder="https://www.instagram.com/yourusername"
              type="text"
              description="Link to your Instagram profile"
            />

            <InputField
              label="LinkedIn Profile"
              name="linkedin"
              placeholder="https://www.linkedin.com/in/yourprofile"
              type="text"
              description="Link to your LinkedIn profile"
            />

            <InputField
              label="Website"
              name="website"
              placeholder="https://yourcommunity.com"
              type="text"
              description="Your community website"
            />

            {Object.keys(form.formState.errors).length > 0 && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md">
                <p className="font-bold">Ada error di field berikut:</p>
                <ul className="list-disc pl-5">
                  {Object.entries(form.formState.errors).map(
                    ([fieldName, error]) => (
                      <li key={fieldName}>
                        {fieldName}: {error.message}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            <Button
              variant="secondary"
              className="w-full mt-2"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
