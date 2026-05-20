import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Blue Apple" },
      { name: "description", content: "Blue Apple — Sudan's trusted iPhone importer. Founded as Ali Apple in 2021, evolved into a premium mobile commerce platform." },
      { property: "og:title", content: "About Blue Apple" },
      { property: "og:description", content: "Sudan's trusted source for genuine iPhones, imported and delivered." },
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
          From <span className="gradient-text">brokerage</span> to brand.
        </h1>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
          Blue Apple started in 2021 as "Ali Apple" — a phone brokerage connecting buyers in Sudan
          with genuine iPhones sourced from abroad. With no warehouse and no storefront, we built
          trust entirely through social media, one satisfied customer at a time.
        </p>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          As demand grew, we rebranded to Blue Apple — a premium, digital-first smartphone destination
          focused on the Apple ecosystem. Instagram became our launchpad, helping us reach premium buyers
          across Sudan who wanted authentic devices without the risk.
        </p>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Today, Blue Apple is a trusted mobile commerce platform. We import genuine iPhones,
          verify every device, and deliver them straight to your door — from the iPhone 13
          Pro Max through the latest iPhone 17 Pro Max.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20 grid md:grid-cols-3 gap-6">
        {[
          { n: "2021", l: "Founded as Ali Apple" },
          { n: "Sudan", l: "Delivered nationwide" },
          { n: "100%", l: "Genuine Apple devices" },
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
