const features = [
  {
    title: "استشارات قبل الجامعة",
    description:
      "فهم الخيارات الأكاديمية والتخصصات المناسبة قبل اتخاذ القرار.",
  },
  {
    title: "دعم خلال الرحلة الجامعية",
    description:
      "إرشاد مستمر يساعدك في التحويل، التأقلم، والفرص الجامعية.",
  },
  {
    title: "تجربة سهلة وسريعة",
    description:
      "إرسال الاستشارة مباشرة بدون حساب، مع متابعة داخلية منظّمة من فريق مدرك.",
  },
] as const;

const steps = [
  { number: "١", label: "تجهيز النموذج" },
  { number: "٢", label: "تنظيم لوحة المستشارين" },
  { number: "٣", label: "إطلاق الخدمة قريبًا" },
] as const;

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-madrak-bg text-madrak-text">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -start-32 h-80 w-80 rounded-full bg-madrak-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -end-24 h-64 w-64 rounded-full bg-madrak-secondary/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 start-1/4 h-56 w-56 rounded-full bg-madrak-primary/5 blur-3xl"
      />

      <header className="relative z-10 border-b border-[var(--madrak-border)] bg-madrak-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <span className="text-lg font-bold tracking-tight text-madrak-primary">
            مدرك
          </span>
          <span className="rounded-full bg-madrak-secondary/90 px-4 py-1.5 text-xs font-semibold text-madrak-text shadow-sm">
            قريبًا
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <section className="mb-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
          <div className="space-y-6">
            <p className="text-sm font-semibold text-madrak-primary">
              بوصلتك الجامعية
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-[1.35] tracking-tight sm:text-4xl lg:text-[2.65rem]">
              استشارات أكاديمية تُنير رحلتك الجامعية
            </h1>
            <p className="max-w-xl text-base leading-8 text-madrak-muted sm:text-lg">
              نجهّز تجربة استشارية تساعدك قبل الجامعة وخلال رحلتك الجامعية،
              لتتخذ قراراتك الأكاديمية بثقة ووضوح.
            </p>
            <p className="max-w-xl rounded-2xl border border-[var(--madrak-border)] bg-madrak-surface px-5 py-4 text-sm leading-7 text-madrak-muted shadow-sm">
              سيتم إطلاق نموذج الاستشارات الأكاديمية قريبًا لاستقبال طلبات
              المستفيدين بدون الحاجة إلى إنشاء حساب.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-[var(--madrak-border)] bg-madrak-surface p-8 shadow-[0_20px_60px_-24px_rgba(6,139,144,0.18)] sm:p-10">
              <p className="mb-2 text-sm font-semibold text-madrak-primary">
                نموذج الاستشارات الأكاديمية
              </p>
              <p className="mb-6 text-2xl font-bold leading-snug">
                بوصلتك الجامعية
              </p>
              <ul className="space-y-4 text-sm leading-7 text-madrak-muted">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-madrak-secondary" />
                  <span>استشارة بدون حساب للمستفيد</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-madrak-primary" />
                  <span>متابعة منظّمة من فريق مدرك</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-madrak-secondary" />
                  <span>إطلاق قريب — ترقّبونا</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-lg font-bold sm:text-xl">ماذا نقدّم؟</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-[var(--madrak-border)] bg-madrak-surface p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 h-1 w-10 rounded-full bg-madrak-primary" />
                <h3 className="mb-2 text-base font-bold">{feature.title}</h3>
                <p className="text-sm leading-7 text-madrak-muted">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[var(--madrak-border)] bg-madrak-surface p-6 shadow-sm sm:p-8">
          <h2 className="mb-8 text-center text-lg font-bold sm:text-xl">
            مراحل الإطلاق
          </h2>
          <ol className="grid gap-6 sm:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.label}
                className="flex flex-col items-center text-center sm:items-start sm:text-start"
              >
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-madrak-primary text-sm font-bold text-white shadow-sm">
                  {step.number}
                </span>
                <span className="text-base font-semibold">{step.label}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[var(--madrak-border)] bg-madrak-surface/70">
        <div className="mx-auto max-w-6xl px-5 py-6 text-center text-sm text-madrak-muted sm:px-8">
          مدرك — للثقافة الجامعية وسوق العمل
        </div>
      </footer>
    </div>
  );
}
