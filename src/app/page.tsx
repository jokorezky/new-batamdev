"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Users, Rocket } from "lucide-react";

interface User {
  name: string;
  picture: string;
}

interface Event {
  title: string;
  date: string;
  description?: string;
}

export default function FuturisticCommunityLanding(): JSX.Element {
  const [users] = useState<User[]>(
    Array.from({ length: 30 }, (_, i) => ({
      name: `Member ${i + 1}`,
      picture: `https://i.pravatar.cc/150?img=${i + 1}`,
    }))
  );

  const [upcomingEvents] = useState<Event[]>([
    {
      title: "HackTown 2026",
      date: "March 15, 2026",
      description: "Join our hackathon and build future-ready products.",
    },
    {
      title: "AI Workshop",
      date: "April 10, 2026",
      description: "Learn AI fundamentals and collaborate with other builders.",
    },
  ]);

  const [pastEvents] = useState<Event[]>([
    { title: "BatamDev Launch", date: "December 1, 2025" },
    { title: "Cybersecurity Meetup", date: "November 10, 2025" },
  ]);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-40 bg-gradient-to-b from-black via-red-900/40 to-black">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <img
            src="https://res.cloudinary.com/dbnxkii6r/image/upload/v1762769258/image/event/image/event/ed1d6dae-f0b9-4de2-b279-1743b9ee23c3_logo-batamdev-white.png"
            alt="BatamDev Logo"
            className="h-24 md:h-32 w-auto animate-pulse"
          />

          <p className="text-gray-400 max-w-md md:max-w-2xl mx-auto mb-8 text-base md:text-lg">
            A future-focused community for developers, designers, AI enthusiasts,
            and startup builders. Learn, collaborate, and build real projects.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-red-600 px-4 py-2 md:px-6 md:py-3 rounded-xl hover:bg-red-700 transition flex items-center gap-2 text-sm md:text-base">
              Join Now <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-red-600 text-red-400 px-4 py-2 md:px-6 md:py-3 rounded-xl hover:bg-red-600/20 transition text-sm md:text-base">
              View Roadmap
            </button>
          </div>
        </motion.div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -z-10 w-[120%] h-full bg-gradient-to-b from-red-600/20 to-transparent blur-3xl animate-pulse" />
      </section>

      {/* WHY JOIN */}
      <section className="px-4 py-20 md:px-6 md:py-32 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
          Why Join Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
          <Feature
            icon={<Cpu className="w-8 h-8 text-red-500" />}
            title="Tech & AI First"
            desc="Focused on modern software engineering, AI literacy, and builder mindset."
          />
          <Feature
            icon={<Users className="w-8 h-8 text-red-500" />}
            title="Community Driven"
            desc="Learn together through real discussions, case studies, and collaboration."
          />
          <Feature
            icon={<Rocket className="w-8 h-8 text-red-500" />}
            title="Real Impact"
            desc="Not just theory. Build real projects, portfolios, and career leverage."
          />
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section id="events" className="px-4 py-20 md:px-6 md:py-32 bg-black/70">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {upcomingEvents.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-black/50 border border-red-600 rounded-2xl p-4 md:p-6 backdrop-blur-xl hover:scale-105 transition"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-red-500">
                {event.title}
              </h3>
              <p className="text-gray-400 mb-2 text-sm md:text-base">
                {event.date}
              </p>
              {event.description && (
                <p className="text-gray-300 text-sm md:text-base">
                  {event.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMMUNITY */}
      <section
        id="community"
        className="px-4 py-20 md:px-6 md:py-32 bg-gradient-to-b from-black via-red-900/20 to-black"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Active Members
        </h2>

        <div className="relative w-full h-72 md:h-96">
          {users.map((user, i) => (
            <motion.img
              key={i}
              src={user.picture}
              alt={user.name}
              className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-red-500 object-cover"
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 90}%`,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            />
          ))}
        </div>
      </section>

      {/* PAST EVENTS */}
      <section className="px-4 py-20 md:px-6 md:py-32 bg-black/80">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Past Events
        </h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {pastEvents.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-red-900/30 border border-red-600 rounded-3xl p-4 md:p-6 backdrop-blur-xl hover:scale-105 transition"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-red-500">
                {event.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                {event.date}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 md:px-6 md:py-32 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Level Up?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm md:text-base">
          Join BatamDev and become part of the next generation of technology builders.
        </p>
        <button className="bg-red-600 px-6 py-3 md:px-8 md:py-4 rounded-2xl hover:bg-red-700 transition text-base md:text-xl">
          Join Now
        </button>
      </section>
    </main>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function Feature({ icon, title, desc }: Readonly<FeatureProps>): JSX.Element {
  return (
    <div className="bg-black/50 border border-red-600/40 rounded-2xl p-4 md:p-6 backdrop-blur-xl flex flex-col items-center text-center gap-4 hover:scale-105 transition">
      <div>{icon}</div>
      <h3 className="text-lg md:text-xl font-semibold text-red-500">
        {title}
      </h3>
      <p className="text-gray-400 text-sm md:text-base">{desc}</p>
    </div>
  );
}
