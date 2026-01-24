import { useEffect, useState, forwardRef } from "react";
import { Input } from "./input";

interface CurrencyInputProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, placeholder, disabled, className }, ref) => {
    const [displayValue, setDisplayValue] = useState("");

    function formatCurrency(val: string | number) {
      const num = typeof val === "string" ? val.replace(/\D/g, "") : val;
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // 🔥 penting: sync displayValue dengan value dari react-hook-form
    useEffect(() => {
      setDisplayValue(formatCurrency(value || ""));
    }, [value]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const raw = e.target.value.replace(/\D/g, "");
      setDisplayValue(formatCurrency(raw));
      onChange(raw);
    }

    return (
      <Input
        ref={ref}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        disabled={disabled}
        className={className}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
