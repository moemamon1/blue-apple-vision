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
      <section className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-10 py-12 sm:py-20 lg:py-32 text-center">
        <p className="text-[11px] sm:text-sm uppercase tracking-widest text-primary">Our story</p>
        <h1 className="mt-4 text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
          From <span className="gradient-text">brokerage</span> to brand.
        </h1>
        <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Blue Apple started in 2021 under the name "Ali Apple" — a phone brokerage service connecting customers in Sudan with genuine iPhones sourced from abroad. With no warehouse and no physical store, we built trust entirely through social media, one satisfied customer at a time.
        </p>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          As demand grew, we rebranded to Blue Apple — evolving into a premium digital destination for smartphones, with a strong focus on the Apple ecosystem. Instagram became our launchpad, helping us reach customers seeking authentic devices and a safe buying experience in Sudan.
        </p>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Today, Blue Apple is a trusted e-commerce platform for smartphones and everyday tech, offering delivery services to multiple countries. We import genuine iPhones, thoroughly inspect and verify each device's quality, and deliver it directly to your doorstep — from iPhone 13 Pro Max up to the latest iPhone 17 Pro Max.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 pb-16 sm:pb-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {[
          { n: "2021", l: "Founded as Ali Apple" },
          { n: "Sudan", l: "Delivered nationwide" },
          { n: "100%", l: "Genuine Apple devices" },
        ].map((s) => (
          <div key={s.l} className="rounded-3xl border border-border bg-card p-6 sm:p-10 text-center">
            <p className="text-3xl sm:text-5xl font-semibold gradient-text">{s.n}</p>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
