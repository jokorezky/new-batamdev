import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarApp } from "./SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarApp />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
