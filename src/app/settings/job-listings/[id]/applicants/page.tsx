"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Applicants from "@/components/Settings/Applicants";

const Applicatants = () => {
  return (
    <div className="px-4 md:px-36 py-10 w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-md font-normal">Kelola Pelamar</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <CardDescription className="w-full">
            <Applicants />
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default Applicatants;
