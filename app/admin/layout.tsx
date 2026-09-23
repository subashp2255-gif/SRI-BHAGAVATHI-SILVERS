import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Admin CMS | Sri Bhagavathi Silvers",
  description: "Centralized Content Management System for Sri Bhagavathi Silvers",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If user is accessing /admin/login or unauthenticated, let child pages render without sidebar layout
  if (!session) {
    return <>{children}</>;
  }

  return <AdminLayoutClient user={session}>{children}</AdminLayoutClient>;
}
