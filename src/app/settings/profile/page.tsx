"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProfileForm from "@/components/Settings/ProfileForm";
import DetailProfileForm from "@/components/Settings/DetailProfileForm";

const LearningPath = () => {
  return (
    <section className="relative max-w-6xl px-4 pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-b from-black via-red-900/40 to-black">
      <Card className="bg-black/95 border  border-red-600 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl py-4 font-bold text-red-500">
            Profil Pengguna
          </CardTitle>
          <Separator className="border-red-600/40" />
        </CardHeader>
        <CardContent>
          <CardDescription className="w-full text-gray-200">
            <ProfileForm />
            <DetailProfileForm />
          </CardDescription>
        </CardContent>
      </Card>
    </section>
  );
};

export default LearningPath;
