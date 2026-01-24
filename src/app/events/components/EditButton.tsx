"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface User {
  _id: string;
}
interface EditButtonProps {
  href: string;
  userId: User[];
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function EditButton({
  href,
  userId,
  className = "",
  variant = "outline",
  size = "sm",
}: EditButtonProps) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const admins = userId;
  const isAdmin = admins?.some((admin) => admin._id === user?._id) || false;
  if (!isAdmin) {
    return;
  }
  return (
    <Button
      variant={variant}
      size={size}
      className={`gap-2 ${className}`}
      onClick={() => router.push(href)}
    >
      <Pencil className="h-3 w-3" />
      <span>Edit</span>
    </Button>
  );
}
