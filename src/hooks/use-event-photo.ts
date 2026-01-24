import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useToast } from "@/hooks/use-toast";

const UPLOAD_EVENT_PHOTOS = gql`
  mutation UploadPhotosToEvent($eventId: String!, $files: [String!]!) {
    uploadPhotosToEvent(eventId: $eventId, files: $files) {
      _id
      title
      photos
      updatedAt
    }
  }
`;

const GET_EVENT_ALBUM = gql`
  query GetEventAlbum($eventSlug: String!) {
    getEventAlbumBySlug(eventSlug: $eventSlug) {
      _id
      title
      description
      photos
      createdAt
      updatedAt
      community {
        _id
        name
      }
    }
  }
`;

export const useUploadEventPhotos = () => {
  const [mutate, { loading, error, data }] = useMutation(UPLOAD_EVENT_PHOTOS);
  const { toast } = useToast();

  const uploadPhotos = async (eventId: string, files: File[]) => {
    try {
      // Convert files to base64
      const base64Promises = files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result as string;
            // Remove data:image/xxx;base64, prefix
            const base64Data = base64.split(",")[1];
            resolve(base64Data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const base64Files = await Promise.all(base64Promises);

      const result = await mutate({
        variables: { eventId, files: base64Files },
      });

      toast({
        title: "Success",
        description: "Photos uploaded successfully",
      });

      return result.data?.uploadPhotosToEvent;
    } catch (err) {
      console.error("Error uploading photos:", err);
      toast({
        title: "Error",
        description: "Failed to upload photos",
        variant: "destructive",
      });
      throw err;
    }
  };

  return {
    uploadPhotos,
    loading,
    error,
    data: data?.uploadPhotosToEvent,
  };
};

export const useGetEventAlbum = (eventSlug: string) => {
  const { data, loading, error, refetch } = useQuery(GET_EVENT_ALBUM, {
    variables: { eventSlug },
    skip: !eventSlug,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  return {
    album: data?.getEventAlbumBySlug,
    loading,
    error,
    refetch,
  };
};
