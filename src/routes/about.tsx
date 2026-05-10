import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Blue Apple" },
      { name: "description", content: "We design devices that disappear into your life." },
      { property: "og:title", content: "About Blue Apple" },
      { property: "og:description", content: "Smart Tech. Minimal Design." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-6 lg:px-10 py-20 lg:py-32 text-center">
        <p className="text-sm uppercase tracking-widest text-primary">Our story</p>
        <h1 className="mt-4 text-5xl lg:text-7xl font-semibold tracking-tight">
          Tech that <span className="gradient-text">disappears.</span>
        </h1>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
          Blue Apple was born from a simple belief: technology should feel invisible. We obsess over every
          curve, pixel, and gram so that what's left in your hand is pure delight. From the first sketch to
          the final assembly, our devices are crafted with intention.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20 grid md:grid-cols-3 gap-6">
        {[
          { n: "10+", l: "Years building" },
          { n: "120+", l: "Countries served" },
          { n: "2M+", l: "Customers worldwide" },
        ].map((s) => (
          <div key={s.l} className="rounded-3xl border border-border bg-card p-10 text-center">
            <p className="text-5xl font-semibold gradient-text">{s.n}</p>
            <p className="mt-2 text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
