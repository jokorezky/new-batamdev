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
        name: "Batamdev",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1764044520/raw/event/raw/event/a7504b5e-f05c-427d-afcd-fd50c2dda238_25283aa3-b536-4bc4-a78f-6b8b9cbcf658_batamdev-new%20%282%29%20%281%29.svg",
        // members: 1200,
        // highlight: "Core Community",
        url: "/batamdev",
    },
    {
        id: "c2",
        name: "swift batam",
        logo: "/swiftbatam.png",
        url: "https://www.swiftbatam.id",
    },
    {
        id: "c2",
        name: "BITS Batam",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1767418437/image/event/image/event/6a16bf94-5a97-4101-99a5-b55ef6d6cd2b_bits.png",
        // members: 800,
        url: "/cybersec-id",
    },
    {
        id: "3",
        name: "Startup Batam",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1757126889/image/event/image/event/922cdf07-b397-4380-b51a-1c1ab3e3ec91_1000006278.jpg",

        url: "/ai-research-lab",
        // highlight: "Research Partner",
    },
    {
        id: "4",
        name: "Batam Infra",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1762840544/image/event/image/event/862635d1-dc10-4b87-8a9a-cc32449c8738_batam-infra.png",
        url: "/startup-foundry",
    },
];

const institutionalPartners: Partner[] = [
    {
        id: "i1",
        name: "BSSN",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/LOGO_BSSN.png",
        highlight: "Venue & National Cybersecurity Partner",
        url: "https://bsre.bssn.go.id",
    },
    {
        id: "i4",
        name: "solnet",
        logo: "/solnet-logo.webp",
        highlight: "Venue & Official Partner",
        url: "https://solnet.net.id",
    },
    {
        id: "i4",
        name: "hacker otodidak",
        logo: "https://hackerotodidak.com/wp-content/uploads/2021/05/text118-1.png",
        highlight: "Official Partner",
        url: "https://hackerotodidak.com",
    },
    {
        id: "i3",
        name: "Cubezone",
        logo: "/cubezone.jpeg",
        highlight: "Venue Partner",
        url: "https://www.instagram.com/cubezone_",
    },
    {
        id: "i4",
        name: "orchard park batam",
        logo: "/orchardparkbatam.png",
        highlight: "Venue Partner",
        url: "https://www.orchardparkbatam.com",
    },
    {
        id: "i2",
        name: "skildev Academy",
        logo: "https://skildev.id/logo-text-white.png",
        highlight: "Venue & Official Education Partner",
        url: "https://skildev.id",
    },
    {
        id: "i5",
        name: "GoKepri",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1762760948/image/event/image/event/8c5e93d9-1a53-4408-986d-a79bd6d34814_logo-_-go-kepri.png",
        highlight: "Media Partner",
        url: "https://gokepri.com",
    },
    {
        id: "i6",
        name: "kinigo - menuju masa depan",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1762761089/image/event/image/event/0093929a-6f0d-4bf3-bb7a-1b20c3b0fcb7_logo-no-text%20%281%29.png",
        highlight: "Media Partner",
        url: "https://kinigo.id",
    },
    {
        id: "i7",
        name: "haluan kepri",
        logo: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1762762262/image/event/image/event/06cfd2a6-9bce-4900-9ef4-936103e78460_logo_kepri_2.png",
        highlight: "Media Partner",
        url: "https://kepri.harianhaluan.com",
    },
];

function PartnerCard({ partner }: { partner: Partner }) {
    const CardContentInner = (
        <Card className="group relative h-full bg-black/60 backdrop-blur-xl border border-red-600/30 rounded-3xl p-6 hover:-translate-y-2 hover:border-red-500 hover:shadow-[0_0_40px_rgba(255,0,0,0.35)] transition-all">
            {partner.highlight && (
                <span className="absolute -top-3 text-red-400 right-5 bg-red-900 text-xs px-3 py-1 rounded-full">
                    {partner.highlight}
                </span>
            )}

            <CardContent className="p-0 flex flex-col items-center text-center gap-4">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-red-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition" />
                    <div className="h-20 md:h-24 flex items-center">
                        <Image
                            src={partner.logo}
                            alt={partner.name}
                            height={96}
                            width={240}
                            className="h-full w-auto object-contain"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="font-semibold text-red-400 capitalize">
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

                <p className="text-sm text-zinc-400 mb-8">
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
