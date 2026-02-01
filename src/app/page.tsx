"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Users, Rocket } from "lucide-react";
import Link from "next/link";
import { useGetEventsQuery } from "@/hooks/events";
import { useListUsers } from "@/hooks/use-user";

interface User {
  name: string;
  picture: string;
}

interface Event {
  title: string;
  date: string;
  description?: string;
  endTime?: string;
  slugname?: string;
}

export default function FuturisticCommunityLanding(): JSX.Element {
  const [page] = useState(1);

  const order: "ASC" | "DESC" = "DESC";

  const { data: dataEvents } = useGetEventsQuery(
    page,
    6,
    order
  );

  const { data: listUser } = useListUsers(1, 150, "");
  const events: Event[] = dataEvents?.data.map((e: any) => ({
    title: e.title,
    date: new Date(e.startDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    description: e.content || undefined,
    endTime: e.endTime || undefined,
    slugname: e.slugname,
  })) || [];

  const now = new Date();

  const combineDateTime = (dateStr: string, timeStr?: string): Date => {
    const parsedDate = new Date(dateStr);
    if (isNaN(parsedDate.getTime())) return new Date(NaN);

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    const dateISO = `${year}-${month}-${day}`;

    if (timeStr) {
      return new Date(`${dateISO}T${timeStr}`);
    }
    return new Date(dateISO);
  };

  const pastEvents = events.filter((event) => {
    const eventEndDateTime = combineDateTime(event.date, event.endTime);
    return eventEndDateTime < now;
  });

  const upcomingEvents = events.filter((event) => {
    const eventEndDateTime = combineDateTime(event.date, event.endTime);
    return eventEndDateTime >= now;
  });

  const users: (User & { isDicebear: boolean })[] =
    listUser?.listUsers.data.map(u => {
      const seed = encodeURIComponent(u.username);
      const styles = ['bottts', 'pixel-art', 'adventurer', 'micah'];
      const style = styles[Math.floor(Math.random() * styles.length)];

      const isDicebear = !u.picture;

      return {
        name: u.full_name || u.username,
        picture: u.picture || `https://api.dicebear.com/6.x/${style}/svg?seed=${seed}`,
        isDicebear,
      };
    }) || [];

  const sortedUsers = React.useMemo(() => {
    return [...users].sort((a, b) => {
      if (a.isDicebear === b.isDicebear) return 0;
      return a.isDicebear ? 1 : -1;
    });
  }, [users]);

  const totalMembers = listUser?.listUsers.total || 0;
  const randomPositions = React.useMemo(() => {
    return sortedUsers.map(() => ({
      top: Math.random() * 85,
      left: Math.random() * 90,
      float: 6 + Math.random() * 10,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 2,
    }));
  }, [sortedUsers.length]);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans">

      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-40 bg-gradient-to-b from-black via-red-900/40 to-black">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <img
            src="https://res.cloudinary.com/dbnxkii6r/image/upload/v1762769258/image/event/image/event/ed1d6dae-f0b9-4de2-b279-1743b9ee23c3_logo-batamdev-white.png"
            alt="Batamdev Logo"
            className="h-24 md:h-32 max-w-full object-contain animate-pulse"
          />

          <p className="text-gray-400 max-w-md md:max-w-2xl mx-auto mb-8 text-base md:text-lg">
            A future-focused community for developers, designers, AI enthusiasts,
            and startup builders. Learn, collaborate, and build real projects.
          </p>

          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/join"
                className="relative bg-red-600 px-4 py-2 md:px-6 md:py-3 rounded-xl hover:bg-red-700 transition flex items-center gap-2 text-sm md:text-base shadow-md hover:shadow-[0_0_25px_rgba(255,0,0,0.6)]"
              >
                Join Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/roadmap" className="relative border border-red-600 text-red-400 px-4 py-2 md:px-6 md:py-3 rounded-xl hover:bg-red-600/20 transition text-sm md:text-base shadow-md hover:shadow-[0_0_25px_rgba(255,0,0,0.5)]">
                View Roadmap
              </Link>
            </div>
            <p className="text-gray-400 text-center text-sm md:text-base mt-4 tracking-wide italic">
              Join <span className="text-red-600 font-bold">{totalMembers}+</span> builders shaping the tech of tomorrow.
            </p>
          </div>

        </motion.div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -z-10 w-[120%] h-full bg-gradient-to-b from-red-600/20 to-transparent blur-3xl animate-pulse" />
      </section>

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

      <section id="events" className="relative px-4 py-20 md:px-6 md:py-32 bg-black/90 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(255,0,0,0.12),transparent_70%)] animate-pulse-slow blur-3xl"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-red-900/10 via-black/30 to-black/90"></div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 md:mb-16 text-red-500 tracking-wider drop-shadow-lg">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, i) => (
              <Link href={`/events/${event.slugname}`} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}
                  className="relative group bg-black/40 border border-red-600/40 rounded-3xl p-6 md:p-8 backdrop-blur-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] hover:border-red-500 transition-all duration-500 cursor-pointer"
                >
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-500/50 via-pink-500/30 to-red-600/50 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500 z-0"></div>

                  <h3 className="relative text-xl md:text-2xl font-bold mb-2 text-red-400 group-hover:text-red-500 drop-shadow-md z-10">
                    {event.title}
                  </h3>
                  <p className="relative text-gray-400 mb-2 text-sm md:text-base z-10">
                    {event.date}
                  </p>
                  {event.description && (
                    <p className="relative text-gray-300 text-sm md:text-base z-10">
                      {event.description}
                    </p>
                  )}
                </motion.div>
              </Link>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="col-span-full text-center flex flex-col items-center gap-4"
            >
              <p className="text-gray-300 text-lg md:text-xl tracking-wide">
                <span className="text-red-500 font-semibold">No events scheduled yet.</span><br />
                The stage is open. <span className="text-white font-semibold">Be the speaker who defines what’s next.</span>
              </p>

              <Link
                href="/speakers/apply"
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl
               border border-red-500 text-red-400 hover:bg-red-500/10
               hover:text-red-300 transition shadow-md
               hover:shadow-[0_0_25px_rgba(255,0,0,0.4)]"
              >
                Be a Speaker <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

          )}
        </div>
      </section>

      <section
        id="community"
        className="relative px-4 py-24 md:px-6 md:py-36 bg-gradient-to-b from-black via-red-900/30 to-black overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.25),transparent_60%)] blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Active Members
          </h2>

          <p className="text-gray-400 mb-12 text-sm md:text-base">
            Builders, engineers, and creators actively learning and shipping.
          </p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative inline-flex items-center justify-center mb-16"
          >
            <div className="absolute inset-0 rounded-full bg-red-600/30 blur-3xl animate-pulse" />
            <div className="relative text-6xl md:text-8xl font-extrabold text-red-500">
              {totalMembers}+
            </div>
          </motion.div>

          <div className="relative w-full h-72 md:h-96">
            {users.map((user, i) => {
              const p = randomPositions[i];

              return (
                <motion.img
                  key={i}
                  src={user.picture}
                  alt={user.name}
                  className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full
                    border border-red-500 bg-black object-cover
                    ${user.isDicebear ? "z-10 opacity-70" : "z-30 scale-110"}
                  `}
                  style={{
                    top: `${p.top}%`,
                    left: `${p.left}%`,
                  }}
                  animate={{
                    y: [0, -p.float, 0],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: p.delay,
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://api.dicebear.com/6.x/adventurer/svg?seed=${encodeURIComponent(user.name)}`;
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 md:px-6 md:py-32 bg-black/90 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(255,0,0,0.15),transparent_70%)] animate-pulse-slow blur-3xl"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-red-900/10 via-black/30 to-black/90"></div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 md:mb-16 text-red-500 tracking-wider drop-shadow-lg">
          Past Events
        </h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
          {pastEvents.length > 0 ? (
            pastEvents.map((event, i) => (
              <Link href={`/events/${event.slugname}`} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}
                  className="relative group bg-black/40 border border-red-600/40 rounded-3xl p-6 md:p-8 backdrop-blur-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] hover:border-red-500 transition-all duration-500 cursor-pointer"
                >
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-600/50 via-pink-500/30 to-red-600/50 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500 z-0"></div>
                  <h3 className="relative text-xl md:text-2xl font-bold mb-2 text-red-400 group-hover:text-red-500 drop-shadow-md z-10">
                    {event.title}
                  </h3>
                  <p className="relative text-gray-400 text-sm md:text-base z-10">
                    {event.date}
                  </p>
                </motion.div>
              </Link>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-gray-400 text-center text-lg md:text-xl col-span-full italic drop-shadow-md"
            >
              No chronicles yet. Your legacy is waiting to be written.
            </motion.p>
          )}
        </div>
      </section>

      <section className="px-4 py-20 md:px-6 md:py-32 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Level Up?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm md:text-base">
          Join batamdev and become part of the next generation of technology builders.
        </p>
        <Link
          href="/join"
          className="bg-red-600 px-6 py-3 md:px-8 md:py-4 rounded-2xl hover:bg-red-700 transition text-base md:text-xl"
        >
          Join Now
        </Link>
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
