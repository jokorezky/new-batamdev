"use client"

import { GlobeIcon } from "lucide-react"
import { Combobox } from "@/components/Combobox"
import { cn } from "@/lib/utils"

const timezones: readonly { readonly value: string; readonly label: string }[] = [
    { value: "GMT+07:00", label: "GMT+07:00 (Jakarta)" },
    { value: "Asia/Singapore-GMT+08:00", label: "GMT+08:00 (Singapore)" },
    { value: "Asia/Kuala_Lumpur-GMT+08:00", label: "GMT+08:00 (Kuala Lumpur)" },
] as const

interface TimezoneSelectorProps {
    readonly value?: string
    readonly onChange?: (value: string) => void
    readonly className?: string
}

export function TimezoneSelector({
    value = "GMT+07:00",
    onChange,
    className,
}: Readonly<TimezoneSelectorProps>) {
    return (
        <div className={cn("md:col-span-4 bg-gray-100 rounded-xl p-2", className)}>
            <div className="flex items-center gap-2 text-gray-500">
                <GlobeIcon className="h-4 w-4 opacity-50" />
                <Combobox
                    items={timezones}
                    value={value}
                    onChange={(newValue) => onChange?.(newValue)}
                    placeholder="Select timezone"
                    className="bg-transparent border-0 shadow-none p-0 h-auto text-gray-500 py-8"
                    searchPlaceholder="Search timezone..."
                />
            </div>
        </div>
    )
}