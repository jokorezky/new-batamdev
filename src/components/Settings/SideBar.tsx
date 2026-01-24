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
  // {
  //   title: "Acara Saya",
  //   url: "/settings/my-events",
  //   icon: ScanQrCode,
  // },
];

const communityItems = [
  {
    title: "Acara",
    url: "/settings/events",
    icon: LayoutList,
  },
  // {
  //   title: "Integrasi Pengembang",
  //   url: "/settings/integration",
  //   icon: Settings,
  // },
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
    <Sidebar className="border-none w-[370px] bg-white">
      <SidebarContent className="pt-20 pl-32 bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl mb-4">
            Pengaturan
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`p-1 ${
                      isActive ? "bg-gray-100 rounded-md" : ""
                    }`}
                  >
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span className="text-[16px]">{item.title}</span>
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
