import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  currency?: string;
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, currency, disabled, ...props }, ref) => {
    return currency ? (
      <label
        className={cn(
          "px-3 flex gap-2 items-center bg-background dark:bg-input/30 selection:bg-primary file:bg-transparent border-input rounded-md border file:border-0 aria-invalid:border-destructive focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <span
          className={cn(
            "text-base sm:text-sm h-9 py-1 inline-flex items-center sm:pt-1.5"
          )}
        >
          {currency}
        </span>
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground placeholder:text-sm placeholder:font-medium selection:text-primary-foreground flex h-9 w-full min-w-0 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:text-sm file:font-medium md:text-sm",
            className
          )}
          {...props}
        />
      </label>
    ) : (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground placeholder:text-sm placeholder:font-medium selection:bg-primary selection:text-primary-foreground bg-background dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
          disabled && "pointer-events-none opacity-50"
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
