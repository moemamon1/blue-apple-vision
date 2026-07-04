import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Blue Apple" },
      { name: "description", content: "Blue Apple — Sudan's trusted iPhone importer." },
      { property: "og:title", content: "About Blue Apple" },
      { property: "og:description", content: "Sudan's trusted source for genuine iPhones." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const t = useT();
  const stats = [
    { n: "2021", l: t("about.stat1") },
    { n: t("about.stat2.value"), l: t("about.stat2") },
    { n: t("about.stat3.value"), l: t("about.stat3") },
  ];
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-10 py-12 sm:py-20 lg:py-32 text-center">
        <p className="text-[11px] sm:text-sm uppercase tracking-widest text-primary">{t("about.eyebrow")}</p>
        <h1 className="mt-4 text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
          {t("about.title.a")} <span className="gradient-text">{t("about.title.mid")}</span> {t("about.title.b")}
        </h1>
        <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed">{t("about.p1")}</p>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">{t("about.p2")}</p>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">{t("about.p3")}</p>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 pb-16 sm:pb-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((s) => (
          <div key={s.l} className="rounded-3xl border border-border bg-card p-6 sm:p-10 text-center">
            <p className="text-3xl sm:text-5xl font-semibold gradient-text">{s.n}</p>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
