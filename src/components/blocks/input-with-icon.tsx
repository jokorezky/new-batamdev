import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputWithIconProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    icon?: React.ReactNode;
  };

export function InputWithIcon({
  icon,
  className,
  ...props
}: InputWithIconProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
          {icon}
        </div>
      )}
      <Input
        {...props}
        className={cn(icon && "pl-10", className)}
      />
    </div>
  );
}
