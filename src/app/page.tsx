import Image from "next/image";

import { ComingSoonBadge } from "@/components/coming-soon-badge";

export default function Home() {
  return (
    <div className="min-h-dvh bg-[linear-gradient(180deg,#edf6f7_0%,#ffffff_48%,#ffffff_52%,#edf6f7_100%)]">
      <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col items-center justify-center gap-7 px-6 py-10 text-center">
        <div className="flex w-full justify-center">
          <Image
            src="/images/madrak-logo.svg"
            alt="ملتقى مدرك — للثقافة الجامعية وسوق العمل"
            width={224}
            height={140}
            className="h-auto w-52 -translate-x-3 object-contain object-center sm:w-56 sm:-translate-x-4"
            priority
          />
        </div>

        <ComingSoonBadge />

        <div className="space-y-1.5">
          <h1 className="text-lg font-bold text-[#1a1a1a] sm:text-xl">
            بوصلتك الجامعية
          </h1>
          <p className="text-sm text-[#8f9fa1]">
            نموذج الاستشارات الأكاديمية
          </p>
        </div>
      </main>
    </div>
  );
}
