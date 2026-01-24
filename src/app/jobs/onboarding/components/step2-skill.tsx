"use client";

import React, { useState } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useFunctionCategories } from "@/hooks/use-functions-category";
import { useOnboardingForm } from "@/hooks/onboarding";

export default function Step2SkillsView({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
  const { categories: functionOptions } = useFunctionCategories();
  const { submitStep2, loading } = useOnboardingForm();
  const handleChange = (skills: any) => {
    setSelectedSkills(skills || []);
  };
  const handleNext = async (selectedSkills: any[]) => {
    try {
      const skillValues = selectedSkills.map((s) => s.value);
      await submitStep2(skillValues);
      onNext();
    } catch (error) {
      console.error("Failed to save skills:", error);
    }
  };

  const removeSkill = (value: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s.value !== value));
  };

  // const addAll = () => {
  //   setSelectedSkills(functionOptions);
  // };

  return (
    <div className="w-full bg-white px-6 py-10 flex flex-col items-center">
      <div className="text-sm text-gray-500 mb-8">
        Mengatur profil Anda —{" "}
        <span className="font-semibold">21% selesai!</span>
      </div>

      <h1 className="text-3xl font-bold text-center">
        Keahlian apa yang kamu miliki?
      </h1>

      <div className="w-full max-w-4xl mt-10 space-y-10">
        <div className="w-full border rounded-lg p-4 bg-white shadow-sm">
          <p className="text-gray-600 text-sm mb-3">
            Bagus! Untuk meningkatkan peluang lamaran diterima, tambahkan
            minimal 5 keahlian lainnya.
          </p>

          <Select
            isMulti
            options={functionOptions}
            value={selectedSkills}
            onChange={handleChange}
            placeholder="contoh: Javascript"
          />

          {/* <div className="flex gap-2 mt-3 flex-wrap">
            {functionOptions.map((s) => (
              <span
                key={s.value}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs"
              >
                {s.label}
              </span>
            ))}
          </div> */}
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="font-medium mb-3">Keahlian yang dipilih</p>

          <div className="flex gap-2 flex-wrap">
            {selectedSkills.map((skill) => (
              <div
                key={skill.value}
                className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
              >
                {skill.label}
                <button onClick={() => removeSkill(skill.value)}>
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between py-10">
          <Button
            variant="outline"
            onClick={onBack}
            className="px-6 h-10 rounded-full"
          >
            KEMBALI
          </Button>

          <Button
            className="px-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white"
            onClick={() => handleNext(selectedSkills)}
            disabled={loading}
          >
            {loading ? "MENYIMPAN..." : "LANJUT"}
          </Button>
        </div>
      </div>
    </div>
  );
}
