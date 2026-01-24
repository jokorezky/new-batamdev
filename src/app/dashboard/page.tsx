"use client";
import {
  BookText,
  BriefcaseBusiness,
  Calendar,
  Rocket,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const learnActivity = [
  {
    titleStatus: "Sedang dipelajari",
    status: "learning",
    learningPath: "Belajar Membangun Aplikasi Android untuk Pemula",
  },
  {
    titleStatus: "Sedang dipelajari",
    status: "learning",
    learningPath: "Belajar Front End Developer Pemula",
  },
  {
    titleStatus: "Telah diselesaikan",
    status: "completed",
    learningPath: "Belajar Back End TypeScript Pemula",
  },
  {
    titleStatus: "Telah diselesaikan",
    status: "completed",
    learningPath: "Belajar Dasar DevOps",
  },
];

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      <main>
        <div id="banner" className="w-full bg-red-800">
          <div className="max-w-screen-xl mx-auto py-10 text-white px-16">
            <div className="mb-4">
              <h1 className="font-bold text-3xl pb-2">
                Selamat datang {user?.full_name}!
              </h1>
              <p>Semoga aktivitas belajarmu menyenangkan</p>
            </div>
          </div>
        </div>

        <div
          id="content"
          className="flex gap-8 max-w-screen-xl mx-auto mt-10 px-16"
        >
          <div className="w-full shadow-lg rounded-lg border border-slate-300">
            <div className="flex gap-4 p-4 border-b border-b-slate-300">
              <BookText />
              <h5 className="font-bold">Aktivitas Belajar</h5>
            </div>
            <div className="p-4 space-y-4">
              {learnActivity.map((activity, index) => (
                <div
                  className="bg-gray-100 p-4 rounded-md flex justify-between items-center"
                  key={activity.titleStatus}
                >
                  <div>
                    <h5 className="font-semibold text-sm pb-2">
                      {activity.titleStatus}
                    </h5>
                    <h3>{activity.learningPath}</h3>
                  </div>
                  <Link href="#" className="text-sm text-blue-700 underline">
                    {activity.status === "learning"
                      ? "Lanjutkan"
                      : "Lihat Sertifikat"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full shadow-lg rounded-lg border border-slate-300">
            <div className="flex gap-4 p-4 border-b border-b-slate-300">
              <TrendingUp />
              <h5 className="font-bold">Aktivitas Lain</h5>
            </div>
            <div className="p-4 space-y-4">
              <h5>Belum ada aktivitas</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-md space-y-3">
                  <Calendar color="orange" />
                  <p>Telusuri event dari kinigo</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md space-y-3">
                  <Rocket color="red" />
                  <p>Telusuri chalenge dari kinigo</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md space-y-3 col-span-2">
                  <BriefcaseBusiness color="green" />
                  <p>Telusuri daftar pekerjaan dari perusahaan ternama</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
