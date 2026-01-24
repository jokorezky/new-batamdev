"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Companies from "@/components/Settings/Companies";

const EventPath = () => {
  return (
    <div className="px-4 md:px-36 py-10 w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-md font-normal">Company</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <CardDescription className="w-full">
            <Companies />
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventPath;
