import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClient } from "@/lib/apolloClient";
import { GET_USER_BY_SLUG_QUERY } from "@/hooks/use-user";
import { ProfileWithArticles } from "./profile-card";
import { User } from "@/types/User";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { userslug } = await params;

  const client = getClient();
  const { data } = await client.query<{ getUserByslug: User }>({
    query: GET_USER_BY_SLUG_QUERY,
    variables: {
      getUserBySlugInput: { username: userslug },
    },
    fetchPolicy: "no-cache",
  });

  const user = data?.getUserByslug;

  if (!user) notFound();

  return {
    title: `${user.full_name}'s Profile`,
    description: `Profile page of ${user.full_name}`,
  };
}

export default async function ProfilePage({ params }: any) {
  const { userslug } = await params;

  const client = getClient();
  const { data } = await client.query<{ getUserByslug: User }>({
    query: GET_USER_BY_SLUG_QUERY,
    variables: {
      getUserBySlugInput: { username: userslug },
    },
    fetchPolicy: "no-cache",
  });

  const user = data?.getUserByslug;

  if (!user) return notFound();

  return (
    <div className="w-full px-4 md:px-32 py-2 pt-20 max-w-[1440px] mx-auto relative">
      <ProfileWithArticles user={user} />
    </div>
  );
}
