import {
  ConsultationForm,
  ConsultationPageHeader,
} from "@/components/consultation-form";

export const metadata = {
  title: "طلب استشارة أكاديمية | بوصلتك الجامعية",
  description:
    "نموذج طلب الاستشارات الأكاديمية — بوصلتك الجامعية من مدرك.",
};

export default function ConsultationPage() {
  return (
    <main className="min-h-full bg-gradient-to-b from-[#f4fbfb] via-white to-[#fff9ef] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <ConsultationPageHeader />
        <ConsultationForm />
      </div>
    </main>
  );
}
