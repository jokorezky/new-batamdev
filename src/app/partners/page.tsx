"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Partner {
    id: string;
    name: string;
    logo: string;
    category: "Community" | "Company" | "Education";
    members?: number;
    url: string;
    highlight?: string;
}

const partners: Partner[] = [
    {
        id: "1",
        name: "BatamDev",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1764044520/raw/event/raw/event/a7504b5e-f05c-427d-afcd-fd50c2dda238_25283aa3-b536-4bc4-a78f-6b8b9cbcf658_batamdev-new%20%282%29%20%281%29.svg",
        category: "Community",
        members: 1200,
        url: "/batamdev",
        highlight: "Core Partner",
    },
    {
        id: "2",
        name: "CyberSec ID",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1758275563/image/event/image/event/b3cef9c2-0d9a-49b9-a09d-a8e7de9c5c93_BITS-logo-petak-saja.png",
        category: "Community",
        members: 800,
        url: "/cybersec-id",
    },
    {
        id: "3",
        name: "Startup Batam",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1757126889/image/event/image/event/922cdf07-b397-4380-b51a-1c1ab3e3ec91_1000006278.jpg",
        category: "Education",
        url: "/ai-research-lab",
        highlight: "Research Partner",
    },
    {
        id: "4",
        name: "Batam Infra",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1756036647/image/event/image/event/fdda9406-fbab-4663-9cad-3e63385bb1c3_9eb97608-18a6-4170-b903-4f5c4b3ef366.jpg",
        category: "Company",
        url: "/startup-foundry",
    },
];

export default function CommunityPartnersPage(): JSX.Element {
    return (
        <main className="min-h-screen bg-black text-white overflow-x-hidden">
            <section className="text-center max-w-2xl mx-auto pt-36 pb-24 md:pt-44 md:pb-32">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-extrabold tracking-tight
            bg-gradient-to-r from-red-500 to-orange-400
            bg-clip-text text-transparent"
                >
                    Partners
                </motion.h1>

                <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-sm md:text-lg">
                    A track record of competitions, experiments, and the most serious builders.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
                    <Badge className="bg-red-600/20 text-red-400 border-red-600/40">
                        <Users className="w-3 h-3 mr-1" /> Communities
                    </Badge>
                    <Badge className="bg-red-600/20 text-red-400 border-red-600/40">
                        <ShieldCheck className="w-3 h-3 mr-1" /> Trusted Partners
                    </Badge>
                    <Badge className="bg-red-600/20 text-red-400 border-red-600/40">
                        <Rocket className="w-3 h-3 mr-1" /> Builders First
                    </Badge>
                </div>
            </section>

            <section className="px-4 max-w-7xl mx-auto pb-24">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {partners.map((partner, i) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >

                            <Card className="group relative h-full bg-black/60 backdrop-blur-xl border border-red-600/30 rounded-3xl p-6 hover:-translate-y-2 hover:border-red-500 hover:shadow-[0_0_45px_rgba(255,0,0,0.35)] transition-all">
                                {partner.highlight && (
                                    <span className="absolute -top-3 right-5 bg-red-600 text-xs px-3 py-1 rounded-full">
                                        {partner.highlight}
                                    </span>
                                )}

                                <CardContent className="p-0 flex flex-col items-center text-center gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-red-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition" />

                                        <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden border-2 border-red-500 bg-black flex items-center justify-center">
                                            <Image
                                                src={partner.logo}
                                                alt={partner.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>


                                    <div className="space-y-1">
                                        <p className="text-lg font-semibold text-red-400">
                                            {partner.name}
                                        </p>
                                        <p className="text-xs text-zinc-400">
                                            {partner.category}
                                        </p>
                                        {partner.members && (
                                            <p className="text-xs text-zinc-500">
                                                {partner.members.toLocaleString()} members
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="px-4 py-24 text-center bg-gradient-to-b from-black via-red-900/30 to-black">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-4xl font-bold mb-4"
                >
                    Become a Community Partner
                </motion.h2>

                <p className="text-gray-400 max-w-xl mx-auto mb-8 text-sm md:text-base">
                    Collaborate on hackathons, workshops, research, and real-world experiments.
                </p>

                <Button
                    size="lg"
                    className="rounded-2xl px-10 py-6 text-lg bg-red-600 hover:bg-red-700"
                >
                    Partner With Us
                </Button>
            </section>
        </main>
    );
}
