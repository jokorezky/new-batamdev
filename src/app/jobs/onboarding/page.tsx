"use client";

import React, { useState, useEffect } from "react";
import Step1IntroView from "./components/step1-intro";
import Step2SkillsView from "./components/step2-skill";
import Step3ResumeBioView from "./components/step3-resume-bio";
import { useCheckOnboardingStatus } from "@/hooks/onboarding";

export default function ProfileIntroForm() {
  const [step, setStep] = useState(1);
  const { status } = useCheckOnboardingStatus();

  useEffect(() => {
    if (status?.isCompleted) {
      window.location.href = "/jobs";
    }
  }, [status]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);
  return (
    <div className="w-full">
      {step === 1 && <Step1IntroView onNext={handleNext} />}
      {step === 2 && (
        <Step2SkillsView onNext={handleNext} onBack={handlePrevious} />
      )}
      {step === 3 && <Step3ResumeBioView onBack={handlePrevious} />}
    </div>
  );
}
