"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/Form";
import { InputField } from "@/components/InputField";
import { ImageUpload } from "@/components/ImageUpload";
import { TextareaField } from "@/components/TextareaField";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { emailSchema, fullnameSchema } from "@/lib/validationSchemas";
import { useUpdateUserMutation } from "@/hooks/useUpdateProfileMutation";
import { uploadFile } from "@/hooks/uploadFile";
import { MediaFolderType } from "@/types/MediaFolderType";
const profileSchema = z.object({
  email: emailSchema,
  full_name: fullnameSchema,
  bio: z.string().optional(),
  picture: z.union([z.string(), z.instanceof(File)]).optional(),
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { updateUserProfile, loading } = useUpdateUserMutation();

  const form = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user?.full_name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      picture: user?.picture || "",
    },
  });

  const { setValue } = form;
  useEffect(() => {
    if (user) {
      form.reset({
        full_name: user.full_name || "",
        email: user.email || "",
        bio: user.bio || "",
        picture: user.picture || "",
      });
    }
  }, [user, form]);

  const handleImageUpload = (file: File | null) => {
    setImageFile(file);
    if (!file && user?.picture) {
      form.setValue("picture", user.picture);
    }
  };

  const onSubmit = async (data: ProfileFormInputs) => {
    setIsSubmitting(true);

    try {
      let pictureUrl: string | undefined = undefined;

      if (data.picture instanceof File) {
        const uploadedUrl = await uploadFile(
          data.picture,
          MediaFolderType.COMMUNITY
        );

        if (!uploadedUrl) {
          throw new Error("Gagal mengupload gambar");
        }
        pictureUrl = uploadedUrl.data ?? undefined;
      } else if (typeof data.picture === "string") {
        pictureUrl = data.picture;
      }
      const updateUserInput = {
        full_name: data.full_name,
        bio: data.bio,
        picture: pictureUrl,
      };

      await updateUserProfile(updateUserInput);
      if (pictureUrl && data.picture instanceof File) {
        setValue("picture", pictureUrl, { shouldValidate: true });
      }

      toast({
        variant: "default",
        title: "Berhasil",
        description: "Profil Anda telah berhasil diperbarui.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Peringatan",
        description: "Profil Anda tidak dapat diperbarui. Silakan coba lagi.",
      });

      console.error("Error saat update profil:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-[8fr_4fr] gap-8">
        <div className="flex flex-col gap-y-4">
          <InputField
            label="Nama Lengkap"
            name="full_name"
            placeholder="Nama Lengkap"
            type="text"
            description="Nama asli Anda, nama akan digunakan pada data sertifikat"
            isRequired
          />
          <InputField
            label="Email"
            name="email"
            placeholder="Email"
            type="email"
            isDisabled
            description="Anda dapat mengubah alamat email melalui menu Akun."
            
          />
          <div className="pb-5">
            <TextareaField
              label="Tentang Saya"
              name="bio"
              placeholder="Tulis bio singkat tentang dirimu"
              
            />
            <p className="text-[0.8rem] text-red-400">
              Tulis cerita singkat tentang diri Anda.
            </p>
          </div>
        </div>
        <div>
          <ImageUpload
            label="Foto Diri"
            name="picture"
            select="Pilih Foto"
            hinText="Rasio 1:1 dan <2MB"
            onFileChange={handleImageUpload}
            initialImage={user?.picture}
          />
        </div>
      </div>
      <Button
        className="mt-5 md:mt-0 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-all"
        type="submit"
        disabled={loading}
      >
        {isSubmitting ? "MENYIMPAN..." : "SIMPAN"}
      </Button>
    </Form>

  );
}
