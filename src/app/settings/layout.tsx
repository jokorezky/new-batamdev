import LayoutSettings from "@/components/Settings/Layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutSettings>{children}</LayoutSettings>;
}
