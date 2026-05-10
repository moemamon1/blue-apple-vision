import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/phones")({
  head: () => ({
    meta: [
      { title: "Phones — Blue Apple" },
      { name: "description", content: "Premium smartphones engineered for performance and beauty." },
      { property: "og:title", content: "Phones — Blue Apple" },
      { property: "og:description", content: "Premium smartphones from Blue Apple." },
    ],
  }),
  component: PhonesPage,
});

function PhonesPage() {
  const phones = products.filter((p) => p.category === "Smartphones");
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24 hero-bg">
        <p className="text-sm uppercase tracking-widest text-primary">Smartphones</p>
        <h1 className="mt-3 text-5xl lg:text-6xl font-semibold tracking-tight">
          The phone, <span className="gradient-text">reimagined.</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          Titanium frames, breakthrough cameras, and the fastest chips ever in a Blue Apple phone.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...phones, ...products, ...phones].slice(0, 6).map((p, i) => (
            <ProductCard key={p.id + i} product={p} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
