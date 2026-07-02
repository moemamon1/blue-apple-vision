import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ShopifyProductCard } from "@/components/ShopifyProductCard";
import { fetchProductsByCollectionId, type ShopifyProduct } from "@/lib/shopify";
import { useState, useEffect } from "react";

const ACCESSORIES_COLLECTION_ID = "323584295108";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Everyday Use — Blue Apple" },
      { name: "description", content: "Everyday tech essentials imported to Sudan." },
      { property: "og:title", content: "Everyday Use — Blue Apple" },
      { property: "og:description", content: "Everyday tech essentials imported to Sudan." },
    ],
  }),
  component: AccessoriesPage,
});

function AccessoriesPage() {
  const [items, setItems] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchProductsByCollectionId(ACCESSORIES_COLLECTION_ID, 50)
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
      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-10 sm:py-16 lg:py-24 hero-bg">
        <p className="text-[11px] sm:text-sm uppercase tracking-widest text-primary">Everyday Use</p>
        <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
          Everyday <span className="gradient-text">essentials.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl">
          Chargers, cases, cables, earbuds and more. Genuine everyday tech imported and delivered across Sudan.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 pb-16 sm:pb-20">
        {loading && <p className="text-muted-foreground">Loading products...</p>}
        {!loading && items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Nothing here yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">Check back soon or browse our phones.</p>
          </div>
        )}
        {!loading && items.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map((item) => (
              <ShopifyProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
