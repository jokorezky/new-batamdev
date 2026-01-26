"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, ShieldCheck, Rocket } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Partner {
    id: string;
    name: string;
    logo: string;
    url?: string;
    highlight?: string;
    members?: number;
}

const communityPartners: Partner[] = [
    {
        id: "c1",
        name: "BatamDev",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1764044520/raw/event/raw/event/a7504b5e-f05c-427d-afcd-fd50c2dda238_25283aa3-b536-4bc4-a78f-6b8b9cbcf658_batamdev-new%20%282%29%20%281%29.svg",
        members: 1200,
        highlight: "Core Community",
        url: "/batamdev",
    },
    {
        id: "c2",
        name: "BITS Batam",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1758275563/image/event/image/event/b3cef9c2-0d9a-49b9-a09d-a8e7de9c5c93_BITS-logo-petak-saja.png",
        members: 800,
        url: "/cybersec-id",
    },
    {
        id: "3",
        name: "Startup Batam",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1757126889/image/event/image/event/922cdf07-b397-4380-b51a-1c1ab3e3ec91_1000006278.jpg",

        url: "/ai-research-lab",
        highlight: "Research Partner",
    },
    {
        id: "4",
        name: "Batam Infra",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1756036647/image/event/image/event/fdda9406-fbab-4663-9cad-3e63385bb1c3_9eb97608-18a6-4170-b903-4f5c4b3ef366.jpg",
        url: "/startup-foundry",
    },
];

const institutionalPartners: Partner[] = [
    {
        id: "i1",
        name: "BSSN",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/LOGO_BSSN.png",
        highlight: "National Cybersecurity Partner",
        url: "https://bsre.bssn.go.id",
    },
    {
        id: "i2",
        name: "skildev",
        logo: "https://skildev.id/logo-skildev.png",
        highlight: "Official Education Partner",
        url: "https://skildev.id",
    },
];

function PartnerCard({ partner }: { partner: Partner }) {
    const CardContentInner = (
        <Card className="group relative h-full bg-black/60 backdrop-blur-xl border border-red-600/30 rounded-3xl p-6 hover:-translate-y-2 hover:border-red-500 hover:shadow-[0_0_40px_rgba(255,0,0,0.35)] transition-all">
            {partner.highlight && (
                <span className="absolute -top-3 right-5 bg-red-600 text-xs px-3 py-1 rounded-full">
                    {partner.highlight}
                </span>
            )}

            <CardContent className="p-0 flex flex-col items-center text-center gap-4">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-red-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition" />
                    <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden border-2 border-red-500 bg-black">
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

                    {partner.members && (
                        <p className="text-xs text-zinc-500">
                            {partner.members.toLocaleString()} members
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    if (partner.url) {
        const isExternal = partner.url.startsWith("http");

        return (
            <Link
                href={partner.url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="block h-full"
                aria-label={`Visit ${partner.name}`}
            >
                {CardContentInner}
            </Link>
        );
    }

    return <div className="h-full">{CardContentInner}</div>;
}


export default function PartnersPage(): JSX.Element {
    return (
        <main className="min-h-screen bg-black text-white overflow-x-hidden">
            <section className="text-center max-w-3xl mx-auto pt-36 pb-24 md:pt-44 md:pb-32">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent"
                >
                    Partners & Collaborators
                </motion.h1>

                <p className="mt-4 text-gray-400 text-sm md:text-lg">
                    Communities, institutions, and organizations that have
                    supported real-world cybersecurity and developer initiatives.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
                    <Badge className="bg-red-600/20 text-red-400 border-red-600/40">
                        <Users className="w-3 h-3 mr-1" /> Communities
                    </Badge>
                    <Badge className="bg-red-600/20 text-red-400 border-red-600/40">
                        <ShieldCheck className="w-3 h-3 mr-1" /> Trusted Institutions
                    </Badge>
                    <Badge className="bg-red-600/20 text-red-400 border-red-600/40">
                        <Rocket className="w-3 h-3 mr-1" /> Builders First
                    </Badge>
                </div>
            </section>

            <section className="px-4 max-w-7xl mx-auto pb-24">
                <h2 className="text-2xl font-bold mb-8 text-red-400">
                    Community Partners
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {communityPartners.map((partner, i) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <PartnerCard partner={partner} />
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="px-4 max-w-7xl mx-auto pb-32">
                <h2 className="text-2xl font-bold mb-4 text-red-400">
                    Institutional & Venue Partners
                </h2>

                <p className="text-sm text-zinc-400 mb-8 max-w-2xl">
                    National institutions and organizations that have hosted
                    or supported major events, workshops, and cybersecurity initiatives.
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {institutionalPartners.map((partner) => (
                        <PartnerCard key={partner.id} partner={partner} />
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
                    Become a Partner
                </motion.h2>

                <p className="text-gray-400 max-w-xl mx-auto mb-8 text-sm md:text-base">
                    Collaborate on hackathons, workshops, research,
                    and high-impact real-world experiments.
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
