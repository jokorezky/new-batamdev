"use client";
import { FileArchive } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SideBarTitle,
} from "@/components/ui/sidebar";
import { CircleCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const items = [
  {
    title: "Progress Belajar",
    url: "/academies",
    icon: FileArchive,
  }
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const isDarkHeader = /^\/academies\/[^/]+\/learning$/.test(pathname);
  const modules = useSelector((state: RootState) => state.moduleAjar.modules);
  return (
    <Sidebar
      className={`fixed h-screen ${
        isDarkHeader ? "bg-[#3f3f46] text-white" : "bg-white"
      }`}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SideBarTitle>
              <h1 className={`${isDarkHeader ? "pt-64 text-2xl" : ""}`}>
                {isDarkHeader ? "Daftar Module" : "Academy"}
              </h1>
            </SideBarTitle>
            <SidebarMenu className={isDarkHeader ? "pt-2" : "pt-24"}>
              {!isDarkHeader &&
                items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`text-md py-8 rounded-none ${
                          isActive
                            ? "bg-zinc-100"
                            : isDarkHeader
                            ? "text-white"
                            : "text-slate-700"
                        }`}
                      >
                        <a
                          href={item.url}
                          className="flex items-center space-x-2"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              {isDarkHeader && (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full px-4"
                  defaultValue="item-0"
                >
                  {modules.map((data, index) => {
                    return (
                      <AccordionItem
                        value={`item-${index}`}
                        className=" border-none"
                      >
                        <AccordionTrigger className="text-xl font-bold hover:no-underline">
                          <div className="flex items-center gap-1">
                            <CircleCheck
                              size={17}
                              color="white"
                              className="bg-red-500 rounded-full"
                            />
                            {data?.title}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-4">
                            {data?.subModules.map((subModule, i) => {
                              return (
                                <h2
                                  key={i}
                                  className="cursor-pointer flex items-center gap-1"
                                  onClick={() =>
                                    router.replace(
                                      `${pathname}?id=${subModule._id}`
                                    )
                                  }
                                >
                                  <CircleCheck
                                    size={17}
                                    color="green"
                                  />
                                  {subModule?.title}
                                </h2>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
