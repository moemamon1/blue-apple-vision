import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { Flame } from "lucide-react";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Deals — Blue Apple" },
      { name: "description", content: "Limited-time offers on Blue Apple devices and accessories." },
      { property: "og:title", content: "Deals — Blue Apple" },
      { property: "og:description", content: "Save big on premium tech." },
    ],
  }),
  component: DealsPage,
});

function DealsPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24 hero-bg">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium">
          <Flame className="size-3.5 text-primary" /> Limited time
        </span>
        <h1 className="mt-4 text-5xl lg:text-6xl font-semibold tracking-tight">
          Today's <span className="gradient-text">best deals.</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          Save up to 30% on selected devices and accessories. Don't wait — when they're gone, they're gone.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={{ ...p, originalPrice: Math.round(p.price * 1.3) }} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
