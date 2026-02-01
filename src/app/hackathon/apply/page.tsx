"use client";

import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { InputWithIcon } from "@/components/blocks/input-with-icon";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Building2,
  Mail,
  Phone,
  Globe,
  Handshake,
  Rocket,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { useFormSubmit, FormType } from "@/hooks/use-form-submit";

const SPONSOR_BUDGET_OPTIONS = [
  "Rp 10.000.000 – Rp 25.000.000",
  "Rp 25.000.000 – Rp 50.000.000",
  "Rp 50.000.000 – Rp 100.000.000",
  "Rp 100.000.000 – Rp 250.000.000",
  "Rp 250.000.000+",
];

type SponsorFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  companyWebsite?: string;
  budget?: string;
  eventObjectives?: string;
  agreeToMarketing?: boolean;
};

export default function ApplySponsorPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<SponsorFormData>();

  const { submitForm, loading } = useFormSubmit();

  const onSubmit: SubmitHandler<SponsorFormData> = async (data) => {
    const payload = {
      formType: FormType.SPONSOR,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      companyWebsite: data.companyWebsite,
      budget: data.budget,
      eventObjectives: data.eventObjectives
        ? [data.eventObjectives]
        : [],
      agreeToMarketing: data.agreeToMarketing ?? false,
    };

    const result = await submitForm(payload);

    if (result.error) {
      alert(result.error);
      return;
    }

    alert("Sponsor application submitted successfully 🚀");
    reset();
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 pt-36 pb-24">
      <section className="max-w-5xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <Badge className="mx-auto bg-red-600/20 text-red-400 border-red-600/40">
            Sponsorship Application
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Become an <span className="text-red-500">Event Sponsor</span>
          </h1>

          <p className="text-zinc-400 max-w-2xl mx-auto">
            Partner with a curated tech audience. Build brand authority,
            meaningful exposure, and long-term impact.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {[{
            icon: <Handshake className="w-6 h-6" />,
            title: "Targeted Exposure",
            desc: "Reach founders, engineers, and decision-makers directly.",
          }, {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Brand Credibility",
            desc: "Position your brand alongside trusted tech initiatives.",
          }, {
            icon: <Rocket className="w-6 h-6" />,
            title: "Measurable ROI",
            desc: "Sponsorships designed for impact, not just visibility.",
          }].map((item) => (
            <Card
              key={item.title}
              className="bg-black/60 border border-red-600/30 rounded-3xl"
            >
              <CardContent className="p-6 space-y-4">
                <div className="text-red-400">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-black/70 border border-red-600/40 rounded-3xl backdrop-blur-xl">
            <CardContent className="p-8 space-y-8">
              <h2 className="text-2xl font-semibold text-red-400">
                Sponsor Application Form
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <InputWithIcon
                    placeholder="Contact Person Name"
                    icon={<Building2 />}
                    {...register("name", { required: true })}
                  />

                  <InputWithIcon
                    placeholder="Email Address"
                    icon={<Mail />}
                    {...register("email", { required: true })}
                  />

                  <InputWithIcon
                    placeholder="WhatsApp Number"
                    icon={<Phone />}
                    {...register("phone", { required: true })}
                  />

                  <InputWithIcon
                    placeholder="Company Name"
                    icon={<Building2 />}
                    {...register("company", { required: true })}
                  />

                  <InputWithIcon
                    placeholder="Company Website"
                    icon={<Globe />}
                    {...register("companyWebsite")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">
                    Estimated Sponsorship Budget (IDR)
                  </label>

                  <Select onValueChange={(value) => setValue("budget", value)}>
                    <SelectTrigger className="bg-black/60 border-red-600/40 rounded-xl">
                      <div className="flex items-center gap-2 w-full">
                        <Wallet className="h-4 w-4 text-red-400 shrink-0" />
                        <SelectValue
                          placeholder="Select budget range"
                          className="flex-1 text-left"
                        />
                      </div>
                    </SelectTrigger>


                    <SelectContent className="bg-black border-red-600/40">
                      {SPONSOR_BUDGET_OPTIONS.map((budget) => (
                        <SelectItem key={budget} value={budget}>
                          {budget}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <p className="text-xs text-zinc-500">
                    This helps us recommend the most suitable sponsorship package.
                  </p>
                </div>

                <Textarea
                  rows={4}
                  placeholder="What are your sponsorship goals? (branding, hiring, product exposure, etc)"
                  {...register("eventObjectives")}
                />

                <label className="flex items-center gap-2 text-sm text-zinc-400">
                  <input
                    type="checkbox"
                    {...register("agreeToMarketing")}
                    className="accent-red-600"
                  />
                  I agree to be contacted regarding sponsorship opportunities
                </label>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <p className="text-xs text-zinc-500 max-w-xl">
                    We carefully curate sponsors to ensure alignment and
                    long-term partnership value.
                  </p>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 rounded-2xl px-10"
                  >
                    {loading ? "Submitting..." : "Apply as Sponsor"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}
