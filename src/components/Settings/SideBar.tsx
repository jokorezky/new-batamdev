"use client";

import {
  User,
  Settings,
  LayoutList,
  ScanQrCode,
  Building,
  IdCard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const baseItems = [
  {
    title: "Profil",
    url: "/settings/profile",
    icon: User,
  },
];

const communityItems = [
  {
    title: "Acara",
    url: "/settings/events",
    icon: LayoutList,
  },
];

const companyItems = [
  {
    title: "Perusahaan",
    url: "/settings/companies",
    icon: Building,
  },
  {
    title: "Lowongan Kerja",
    url: "/settings/job-listings",
    icon: IdCard,
  },
];

export function SidebarApp() {
  const user = useSelector((state: RootState) => state.auth.user);
  const pathname = usePathname();

  const hasCompanies = user?.companies && user.companies.length > 0;

  const items = [
    ...baseItems,
    ...(user?.communities ? communityItems : []),
    ...(hasCompanies ? companyItems : []),
  ];

  return (
    <Sidebar className="border-none w-[300px] bg-black/95 text-gray-300">
      <SidebarContent className="pt-20 pl-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl mb-4 text-red-500 font-bold">
            Pengaturan
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`
                      rounded-lg transition-colors duration-200
                      ${isActive ? "bg-red-700/20 text-red-500" : "hover:bg-red-900/10 hover:text-red-400"}
                      flex items-center
                    `}
                  >
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center gap-2 px-4 py-2"
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            isActive ? "text-red-500" : "text-gray-400"
                          }`}
                        />
                        <span className="text-[16px] font-semibold">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
