import { useEffect, useState } from "react";

export interface SpeakerUser {
  full_name: string;
  username: string;
  picture?: string | null;
  job_title?: string | null;
  profession?: string | null;
  github?: string | null;
  linkedin?: string | null;
}

export interface Speaker {
  _id: string;
  role: string;
  isActive: boolean;
  userId: SpeakerUser;
}


const GET_ACTIVE_SPEAKERS = `
  query GetActiveSpeakers {
    getActiveSpeakers {
      _id
      role
      isActive
      userId {
        full_name
        username
        picture
        job_title
        profession
        github
        linkedin
      }
    }
  }
`;


const dicebear = (seed: string) =>
  `https://api.dicebear.com/7.x/personas/png?seed=${encodeURIComponent(seed)}`;

export function useSpeakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpeakers() {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: GET_ACTIVE_SPEAKERS }),
          }
        );

        const json = await res.json();

        if (json.errors) {
          throw new Error(json.errors[0].message);
        }

        const normalized = json.data.getActiveSpeakers.map(
          (s: Speaker) => ({
            ...s,
            userId: {
              ...s.userId,
              picture:
                s.userId.picture || dicebear(s.userId.username),
            },
          })
        );

        setSpeakers(normalized);
      } catch (err: any) {
        setError(err.message ?? "Failed to load speakers");
      } finally {
        setLoading(false);
      }
    }

    fetchSpeakers();
  }, []);

  return {
    speakers,
    loading,
    error,
  };
}
