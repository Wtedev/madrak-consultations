"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

import {
  CONSULTATION_TYPE_LABELS,
  CONTACT_METHOD_LABELS,
  CURRENT_STAGE_LABELS,
  GENDER_LABELS,
} from "@/lib/consultation-mappers";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  currentStage: string;
  university: string;
  majorInterest: string;
  consultationType: string;
  question: string;
  preferredContactMethod: string;
};

const initialForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  gender: "",
  currentStage: "",
  university: "",
  majorInterest: "",
  consultationType: "",
  question: "",
  preferredContactMethod: "",
};

const inputClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-madrak-primary focus:ring-2 focus:ring-madrak-primary/20";

const labelClassName = "mb-2 block text-sm font-medium text-slate-700";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

function RequiredMark() {
  return (
    <span className="text-red-500" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
      <div className="mb-5 border-b border-slate-100 pb-4">
        <h2 className="text-base font-semibold text-slate-800">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        ) : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function ConsultationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setErrors({});

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as {
        success: boolean;
        referenceCode?: string;
        errors?: Record<string, string>;
        message?: string;
      };

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setSubmitError(result.message ?? "تعذر إرسال الطلب. حاول مرة أخرى.");
        }
        return;
      }

      if (result.success && result.referenceCode) {
        setReferenceCode(result.referenceCode);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setSubmitError("تعذر الاتصال بالخادم. تحقق من اتصالك وحاول مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  }

  if (referenceCode) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center shadow-md ring-1 ring-slate-100">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-madrak-primary/10 text-2xl text-madrak-primary">
          ✓
        </div>
        <h2 className="text-xl font-semibold text-slate-800">
          تم استلام طلبك بنجاح
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          شكرًا لتواصلك معنا. سيقوم فريق الاستشارات بمراجعة طلبك والرد عليك عبر
          وسيلة التواصل التي اخترتها.
        </p>
        <div className="mt-6 rounded-xl border border-dashed border-madrak-primary/30 bg-madrak-primary/5 px-4 py-5">
          <p className="text-xs text-slate-500">الرقم المرجعي لطلبك</p>
          <p className="mt-1 font-mono text-lg font-semibold tracking-wide text-madrak-primary">
            {referenceCode}
          </p>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          احتفظ بهذا الرقم لمتابعة طلبك عند التواصل معنا.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="rounded-xl border border-madrak-secondary/40 bg-madrak-secondary/15 px-4 py-3 text-sm leading-relaxed text-slate-700">
        الاستشارات الأكاديمية متاحة للمستفيدين بدون الحاجة إلى إنشاء حساب.
      </div>

      <FormSection
        title="البيانات الشخصية"
        description="معلومات التواصل الأساسية"
      >
        <div>
          <label htmlFor="fullName" className={labelClassName}>
            الاسم الثلاثي
            <RequiredMark />
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            className={inputClassName}
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="مثال: محمد أحمد العلي"
          />
          <FieldError message={errors.fullName} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className={labelClassName}>
              رقم الجوال
              <RequiredMark />
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              dir="ltr"
              className={`${inputClassName} text-left`}
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="05xxxxxxxx"
            />
            <FieldError message={errors.phone} />
          </div>

          <div>
            <label htmlFor="email" className={labelClassName}>
              البريد الإلكتروني
            </label>
            <input
              id="email"
              name="email"
              type="email"
              dir="ltr"
              className={`${inputClassName} text-left`}
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="example@email.com"
            />
            <FieldError message={errors.email} />
          </div>
        </div>

        <fieldset>
          <legend className={labelClassName}>
            الجنس
            <RequiredMark />
          </legend>
          <div className="flex flex-wrap gap-3">
            {GENDER_LABELS.map((option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition ${
                  form.gender === option
                    ? "border-madrak-primary bg-madrak-primary/5 text-madrak-primary"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={form.gender === option}
                  onChange={() => updateField("gender", option)}
                  className="accent-madrak-primary"
                />
                {option}
              </label>
            ))}
          </div>
          <FieldError message={errors.gender} />
        </fieldset>
      </FormSection>

      <FormSection
        title="الخلفية الأكاديمية"
        description="ساعدنا على فهم وضعك الدراسي الحالي"
      >
        <div>
          <label htmlFor="currentStage" className={labelClassName}>
            المرحلة الحالية
            <RequiredMark />
          </label>
          <select
            id="currentStage"
            name="currentStage"
            className={inputClassName}
            value={form.currentStage}
            onChange={(e) => updateField("currentStage", e.target.value)}
          >
            <option value="">اختر المرحلة</option>
            {CURRENT_STAGE_LABELS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError message={errors.currentStage} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="university" className={labelClassName}>
              الجامعة
            </label>
            <input
              id="university"
              name="university"
              type="text"
              className={inputClassName}
              value={form.university}
              onChange={(e) => updateField("university", e.target.value)}
              placeholder="اسم الجامعة (إن وجد)"
            />
            <FieldError message={errors.university} />
          </div>

          <div>
            <label htmlFor="majorInterest" className={labelClassName}>
              التخصص الحالي أو التخصص المهتم به
            </label>
            <input
              id="majorInterest"
              name="majorInterest"
              type="text"
              className={inputClassName}
              value={form.majorInterest}
              onChange={(e) => updateField("majorInterest", e.target.value)}
              placeholder="مثال: علوم الحاسب"
            />
            <FieldError message={errors.majorInterest} />
          </div>
        </div>
      </FormSection>

      <FormSection title="تفاصيل الاستشارة">
        <div>
          <label htmlFor="consultationType" className={labelClassName}>
            نوع الاستشارة المطلوبة
            <RequiredMark />
          </label>
          <select
            id="consultationType"
            name="consultationType"
            className={inputClassName}
            value={form.consultationType}
            onChange={(e) => updateField("consultationType", e.target.value)}
          >
            <option value="">اختر نوع الاستشارة</option>
            {CONSULTATION_TYPE_LABELS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError message={errors.consultationType} />
        </div>

        <div>
          <label htmlFor="question" className={labelClassName}>
            اكتب سؤالك أو استفسارك الأكاديمي
            <RequiredMark />
          </label>
          <textarea
            id="question"
            name="question"
            rows={5}
            className={`${inputClassName} min-h-[120px] resize-y`}
            value={form.question}
            onChange={(e) => updateField("question", e.target.value)}
            placeholder="اشرح استفسارك بوضوح لنساعدك بأفضل شكل..."
          />
          <FieldError message={errors.question} />
        </div>

        <fieldset>
          <legend className={labelClassName}>
            نمط التواصل المفضل للإجابة
            <RequiredMark />
          </legend>
          <div className="flex flex-wrap gap-3">
            {CONTACT_METHOD_LABELS.map((option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition ${
                  form.preferredContactMethod === option
                    ? "border-madrak-primary bg-madrak-primary/5 text-madrak-primary"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value={option}
                  checked={form.preferredContactMethod === option}
                  onChange={() => updateField("preferredContactMethod", option)}
                  className="accent-madrak-primary"
                />
                {option}
              </label>
            ))}
          </div>
          <FieldError message={errors.preferredContactMethod} />
        </fieldset>
      </FormSection>

      {submitError ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-madrak-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#057a7f] focus:outline-none focus:ring-2 focus:ring-madrak-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "جاري الإرسال..." : "إرسال طلب الاستشارة"}
      </button>
    </form>
  );
}

export function ConsultationPageHeader() {
  return (
    <header className="mb-8 text-center">
      <Image
        src="/images/madrak-logo.svg"
        alt="مدرك"
        width={120}
        height={48}
        className="mx-auto h-12 w-auto"
        priority
      />
      <p className="mt-4 text-sm text-madrak-primary">بوصلتك الجامعية</p>
      <h1 className="mt-1 text-2xl font-semibold text-slate-800 sm:text-3xl">
        نموذج الاستشارات الأكاديمية
      </h1>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        املأ النموذج أدناه وسيتواصل معك فريق الاستشارات الأكاديمية في أقرب وقت.
      </p>
    </header>
  );
}
