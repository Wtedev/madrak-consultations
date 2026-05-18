import { redirect } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { requireSession } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "لوحة الإدارة | بوصلتك الجامعية",
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session;
  try {
    session = await requireSession();
  } catch {
    redirect("/admin/login");
  }

  const admin = await getPrisma().adminUser.findUnique({
    where: { id: session.sub },
    select: { name: true },
  });

  return (
    <main className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <AdminHeader adminName={admin?.name ?? session.name} />
        {children}
      </div>
    </main>
  );
}
