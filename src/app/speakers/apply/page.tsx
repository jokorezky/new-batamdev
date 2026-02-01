"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { InputWithIcon } from "@/components/blocks/input-with-icon";
import { Badge } from "@/components/ui/badge";
import { Mic, ShieldCheck, Rocket, User, Globe, Mail, Briefcase, Building2, Phone } from "lucide-react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useFormSubmit, FormType } from "@/hooks/use-form-submit";

type FormData = {
  name: string;
  email: string;
  phone: string;
  role?: string;
  linkedInUrl?: string;
  topicInterest?: string;
  company?: string;
};

export default function ApplySpeakerPage(): JSX.Element {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { submitForm, loading } = useFormSubmit();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const payload = {
      ...data,
      formType: FormType.SPEAKER,
    };

    const result = await submitForm(payload);

    if (result.error) {
      alert(result.error);
      return;
    }

    alert("Speaker application submitted!");
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
          <Badge className="mx-auto w-fit bg-red-600/20 text-red-400 border-red-600/40">
            Speaker Application
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Apply as a <span className="text-red-500">Future Speaker</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Share real-world experience, inspire builders, and help shape the
            future of technology through impactful talks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {[{
            icon: <Mic className="w-6 h-6" />,
            title: "Authority & Personal Branding",
            desc: "Position yourself as a trusted expert. Your name becomes associated with clarity, depth, and real-world impact.",
          }, {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Credibility That Compounds",
            desc: "Speaking builds long-term trust. One strong talk can outperform years of self-promotion.",
          }, {
            icon: <Rocket className="w-6 h-6" />,
            title: "Career & Opportunity Leverage",
            desc: "Open doors to consulting, leadership roles, partnerships, and global invitations.",
          }].map((item) => (
            <Card
              key={item.title}
              className="bg-black/60 border border-red-600/30 rounded-3xl backdrop-blur-xl"
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
          transition={{ delay: 0.15 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {[{
            title: "Personal Brand That Feels Earned",
            desc: "You don’t chase attention - attention comes to you. Speaking validates your experience publicly and professionally.",
          }, {
            title: "Network With Decision Makers",
            desc: "Access founders, CTOs, investors, and senior engineers who value insight over noise.",
          }, {
            title: "Content That Works Everywhere",
            desc: "One talk turns into clips, articles, podcasts, and long-term digital assets.",
          }, {
            title: "Reputation Beyond Your Company",
            desc: "Your influence is no longer tied to a single role or employer. You become independently credible.",
          }].map((item) => (
            <Card
              key={item.title}
              className="bg-black/50 border border-red-600/20 rounded-3xl"
            >
              <CardContent className="p-6 space-y-2">
                <h4 className="font-semibold text-red-400">{item.title}</h4>
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
                Speaker Application Form
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <InputWithIcon
                    placeholder="Full Name"
                    icon={<User />}
                    {...register("name", { required: true })}
                  />

                  <InputWithIcon
                    placeholder="Email Address"
                    icon={<Mail />}
                    {...register("email", { required: true })}
                  />

                  <InputWithIcon
                    placeholder="WhatsApp Number"
                    icon={<Phone />}          // ✅ WA
                    {...register("phone", { required: true })}
                  />

                  <InputWithIcon
                    placeholder="Company Name"
                    icon={<Building2 />}      // ✅ Company
                    {...register("company")}
                  />

                  <InputWithIcon
                    placeholder="Primary Expertise (e.g. Backend, AI, Security)"
                    icon={<Briefcase />}      // ✅ Role / Expertise
                    {...register("role")}
                  />

                  <InputWithIcon
                    placeholder="Website / LinkedIn / GitHub"
                    icon={<Globe />}          // ✅ Link
                    {...register("linkedInUrl")}
                  />
                </div>

                <Textarea
                  rows={4}
                  placeholder="Proposed talk topics or session ideas (optional)"
                  {...register("topicInterest")}
                />

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <p className="text-xs text-zinc-500 max-w-xl">
                    All submissions are reviewed manually. Quality, clarity, and
                    authenticity matter more than popularity.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 rounded-2xl px-10"
                  >
                    {loading ? "Submitting..." : "Submit Application"}
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
