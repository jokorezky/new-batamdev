"use client";

import React, { useState } from "react";
import {
  Check,
  X,
  Star,
  Zap,
  Newspaper,
  BriefcaseBusiness,
  CalendarCheck,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RegisterForm } from "@/components/RegisterForm";

type PlanFeature = {
  name: string;
  basic: string | React.ReactNode;
  lite: string | React.ReactNode;
  core: string | React.ReactNode;
  icon: React.ReactNode;
};

type PricingPlan = {
  id: string;
  name: string;
  price: string;
  quarterlyPrice: string;
  yearlyPrice: string;
  billing: string;
  cta: string;
  cancel: string;
  popular: boolean;
  inactive?: boolean;
};

const plans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "Rp 0",
    quarterlyPrice: "Rp 0",
    yearlyPrice: "Rp 0",
    billing: "forever",
    cta: "Get started",
    cancel: "",
    popular: false,
    inactive: false,
  },
  {
    id: "lite",
    name: "Lite",
    quarterlyPrice: "Rp 0",
    yearlyPrice: "Rp0",
    price: "Rp 0",
    billing: "billed quarterly",
    cta: "Subscribe",
    cancel: "Cancel anytime",
    popular: false,
    inactive: true,
  },
  {
    id: "core",
    name: "Core",
    quarterlyPrice: "Rp 0",
    yearlyPrice: "Rp 0",
    price: "Rp 0",
    billing: "billed quarterly",
    cta: "Subscribe",
    cancel: "Cancel anytime",
    popular: true,
    inactive: true,
  },
];

const features: PlanFeature[] = [
  {
    name: "Berita pilihan harian",
    basic: "5x/bulan",
    lite: "Unlimited",
    core: "Unlimited",
    icon: <Newspaper className="w-4 h-4" />,
  },
  {
    name: "Akses ke Konten Premium",
    basic: <X className="text-gray-400" />,
    lite: "Unlimited",
    core: "Unlimited",
    icon: <Star className="w-4 h-4" />,
  },
  {
    name: "Access to Visual Stories",
    basic: <X className="text-gray-400" />,
    lite: "Unlimited",
    core: "Unlimited",
    icon: <BriefcaseBusiness className="w-4 h-4" />,
  },
  {
    name: "Ad-free reading experience",
    basic: <X className="text-gray-400" />,
    lite: <Check className="text-green-500" />,
    core: <Check className="text-green-500" />,
    icon: <Zap className="w-4 h-4" />,
  },
  {
    name: "Company databases access",
    basic: "3/month",
    lite: "10/month",
    core: "Unlimited",
    icon: <BriefcaseBusiness className="w-4 h-4" />,
  },
  {
    name: "Conference perks",
    basic: <X className="text-gray-400" />,
    lite: <X className="text-gray-400" />,
    core: <Check className="text-green-500" />,
    icon: <CalendarCheck className="w-4 h-4" />,
  },
  {
    name: "Priority support",
    basic: <X className="text-gray-400" />,
    lite: <X className="text-gray-400" />,
    core: <Check className="text-green-500" />,
    icon: <Check className="w-4 h-4" />,
  },
];

export default function Subscription() {
  const [isYearly, setIsYearly] = useState(false);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const open = activePlanId !== null;
  const setOpen = (isOpen: boolean) => {
    if (!isOpen) setActivePlanId(null);
  };
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Stay ahead in Batam's tech landscape
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock exclusive insights and data charting the future of Batam
            tech.
            <span className="block text-gray-500 text-sm mt-1">
              Sign up in 20 seconds. Cancel anytime.
            </span>
          </p>
        </div>

        <div className="lg:hidden space-y-6 mb-12">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4 bg-white px-6 py-3 rounded-lg shadow-sm">
              <span
                className={`font-medium ${
                  !isYearly ? "text-green-600" : "text-gray-500"
                }`}
              >
                Bill quarterly
              </span>
              <Switch
                id="billing-toggle"
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-green-500"
              />
              <span
                className={`font-medium ${
                  isYearly ? "text-green-600" : "text-gray-500"
                }`}
              >
                Bill yearly
              </span>
            </div>
          </div>
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden ${
                plan.popular ? "ring-2 ring-green-500" : ""
              } ${plan.inactive ? "opacity-60" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}
              {plan.inactive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
                  <span className="bg-white px-3 py-1 rounded-md text-sm font-medium text-gray-800">
                    Coming Soon
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="text-xl font-semibold">{plan.name}</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {isYearly ? plan.yearlyPrice : plan.quarterlyPrice}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isYearly ? "billed yearly" : "billed quarterly"}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plan.cancel && (
                    <p className="text-center text-sm text-gray-500">
                      {plan.cancel}
                    </p>
                  )}

                  <div className="border-t pt-4">
                    <ul className="space-y-3">
                      {features.map((feature) => (
                        <li key={feature.name} className="flex items-center">
                          <span className="mr-2 text-gray-500">
                            {feature.icon}
                          </span>
                          <span className="text-sm flex-1">{feature.name}</span>
                          <span className="text-sm font-medium">
                            {plan.id === "basic"
                              ? feature.basic
                              : plan.id === "lite"
                              ? feature.lite
                              : feature.core}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4 bg-white px-6 py-3 rounded-lg shadow-sm">
              <span
                className={`font-medium ${
                  !isYearly ? "text-green-600" : "text-gray-500"
                }`}
              >
                Bill quarterly
              </span>
              <Switch
                id="billing-toggle"
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-green-500"
              />
              <span
                className={`font-medium ${
                  isYearly ? "text-green-600" : "text-gray-500"
                }`}
              >
                Bill yearly
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-0.5 bg-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-white p-6 rounded-tl-lg items-center flex justify-center">
              FEATURES
            </div>
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`bg-white p-6 text-center relative ${
                  plan.popular ? "bg-gray-50" : ""
                } ${plan.id === "core" ? "rounded-tr-lg" : ""}
                  ${plan.inactive ? "opacity-60" : ""}`}
              >
                {plan.inactive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
                    <span className="bg-white px-3 py-1 rounded-md text-sm font-medium text-gray-800">
                      Coming Soon
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <p className="text-2xl font-bold">
                  {isYearly ? plan.yearlyPrice : plan.quarterlyPrice}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {isYearly ? "billed yearly" : "billed quarterly"}
                </p>
                {index === 0 && plan.name === "Basic" ? (
                  <Dialog
                    open={activePlanId === plan.id}
                    onOpenChange={setOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-gray-900 text-white"
                        }`}
                        onClick={() => setActivePlanId(plan.id)}
                      >
                        {plan.cta}
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="p-4 w-full lg:max-w-xl h-full lg:h-auto z-[100]"
                      onPointerDownOutside={(e) => e.preventDefault()}
                      onEscapeKeyDown={(e) => e.preventDefault()}
                    >
                      <Card className="w-full h-full max-h-[600px] p-0 shadow-none border-none">
                        <CardContent className="relative p-0 pt-10">
                          <RegisterForm
                            onRegisterSuccess={() => setOpen(false)}
                          />
                        </CardContent>
                      </Card>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-900 text-white"
                    } ${plan.inactive ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={plan.inactive}
                  >
                    {plan.cta}
                  </Button>
                )}
                {plan.cancel && (
                  <p className="text-xs text-gray-500 mt-2">{plan.cancel}</p>
                )}
              </div>
            ))}

            {/* Feature rows */}
            {features.map((feature) => (
              <React.Fragment key={feature.name}>
                <div className="bg-gray-50 p-4 flex items-center">
                  <span className="mr-2 text-gray-500">{feature.icon}</span>
                  <span className="text-sm font-medium">{feature.name}</span>
                </div>
                <div className="bg-white p-4 flex items-center justify-center">
                  <span className="text-sm">{feature.basic}</span>
                </div>
                <div className="bg-white p-4 flex items-center justify-center">
                  <span className="text-sm">{feature.lite}</span>
                </div>
                <div className="bg-white p-4 flex items-center justify-center rounded-br-lg">
                  <span className="text-sm">{feature.core}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
