import axiosInstance from "@/lib/axiosInstance";

export const uploadFile = async (file: File, folderType: string) => {
  const formData = new FormData();
  formData.append("folder", "event");
  formData.append("file", file);
  try {
    const response = await axiosInstance.post("/uploads/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const uploadFiles = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  try {
    const response = await axiosInstance.post("/upload/multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
};

export const uploadEventPhotos = async (eventId: string, files: File[]) => {
  const formData = new FormData();
  formData.append("eventId", eventId);
  files.forEach((file) => formData.append("files", file));

  try {
    const response = await axiosInstance.post(
      "/event-photos/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading event photos:", error);
    throw error;
  }
};
