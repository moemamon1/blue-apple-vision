import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ShopifyProductCard } from "@/components/ShopifyProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories — Blue Apple" },
      { name: "description", content: "Premium Apple accessories imported to Sudan." },
      { property: "og:title", content: "Accessories — Blue Apple" },
      { property: "og:description", content: "Premium Apple accessories imported to Sudan." },
    ],
  }),
  component: AccessoriesPage,
});

function AccessoriesPage() {
  const [items, setItems] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchProducts("vendor:Apple AND (product_type:Accessories OR title:charger OR title:case OR title:cable)", 20)
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24 hero-bg">
        <p className="text-sm uppercase tracking-widest text-primary">Accessories</p>
        <h1 className="mt-3 text-5xl lg:text-6xl font-semibold tracking-tight">
          Apple <span className="gradient-text">essentials.</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          Chargers, cases, cables and more. Genuine Apple accessories imported and delivered across Sudan.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
        {loading && <p className="text-muted-foreground">Loading accessories...</p>}
        {!loading && items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No accessories found yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">Check back soon or browse our iPhones.</p>
          </div>
        )}
        {!loading && items.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ShopifyProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
