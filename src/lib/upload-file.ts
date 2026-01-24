import { toast } from "sonner";
import { apiFetch } from "./api-fetch";

type SingleUploadResponse = {
  message: string;
  data: string | null;
  success: boolean;
};

type MultiUploadResponse = {
  message: string;
  data: string[] | null;
  success: boolean;
};

export const uploadFile = async (file: File): Promise<SingleUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "product");

  return await apiFetch("/uploads/uploadFile", {
    method: "POST",
    body: formData,
  });
};

export const uploadFiles = async (
  files: File[]
): Promise<MultiUploadResponse> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });
  formData.append("folder", "product");

  return await apiFetch("/uploads/uploadFiles", {
    method: "POST",
    body: formData,
  });
};

export const uploadSingleIfExists = async (
  fileList?: FileList | File[]
): Promise<string> => {
  const files = Array.from(fileList ?? []);
  if (files.length > 0) {
    const res = await uploadFile(files[0]);
    if (res?.data) return res.data;
    toast.error(res.message);
    throw new Error(res.message);
  }
  return "";
};

export const uploadMultipleIfExists = async (
  fileList?: FileList | File[]
): Promise<string[]> => {
  const files = Array.from(fileList ?? []);
  if (files.length > 0) {
    const res = await uploadFiles(files);
    if (res?.data) return res.data;
    toast.error(res.message);
    throw new Error(res.message);
  }
  return [];
};
