import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ShopifyProductCard } from "@/components/ShopifyProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

export const Route = createFileRoute("/phones")({
  head: () => ({
    meta: [
      { title: "Phones — Blue Apple" },
      { name: "description", content: "Shop the latest iPhone 13 Pro Max through iPhone 16 Pro Max." },
      { property: "og:title", content: "Phones — Blue Apple" },
      { property: "og:description", content: "Premium smartphones from Blue Apple." },
    ],
  }),
  component: PhonesPage,
});

// Sort order so newer iPhones appear first
const MODEL_ORDER = [
  "iPhone 16 Pro Max",
  "iPhone 16 Pro",
  "iPhone 16 Plus",
  "iPhone 16",
  "iPhone 15 Pro Max",
  "iPhone 15 Pro",
  "iPhone 15 Plus",
  "iPhone 15",
  "iPhone 14 Pro Max",
  "iPhone 14 Pro",
  "iPhone 14 Plus",
  "iPhone 14",
  "iPhone 13 Pro Max",
];

function rank(title: string) {
  const idx = MODEL_ORDER.indexOf(title);
  return idx === -1 ? 999 : idx;
}

function PhonesPage() {
  const [phones, setPhones] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchProducts("title:iPhone*", 50)
      .then((products) => {
        if (cancelled) return;
        const sorted = [...products].sort((a, b) => rank(a.title) - rank(b.title));
        setPhones(sorted);
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24 hero-bg">
        <p className="text-sm uppercase tracking-widest text-primary">Smartphones</p>
        <h1 className="mt-3 text-5xl lg:text-6xl font-semibold tracking-tight">
          The phone, <span className="gradient-text">reimagined.</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          From the iPhone 13 Pro Max to the latest iPhone 16 Pro Max — every model, ready to ship.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
        {loading && <p className="text-muted-foreground">Loading iPhones…</p>}
        {error && <p className="text-destructive">Couldn't load products: {error}</p>}
        {!loading && !error && phones.length === 0 && (
          <p className="text-muted-foreground">No products found.</p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {phones.map((p) => (
            <ShopifyProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
