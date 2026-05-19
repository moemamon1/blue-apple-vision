import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ShopifyProductCard } from "@/components/ShopifyProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iPhones in Sudan — Blue Apple" },
      {
        name: "description",
        content:
          "Genuine iPhones imported from abroad and delivered across Sudan. iPhone 13 Pro Max through iPhone 17 Pro Max.",
      },
      {
        property: "og:title",
        content: "iPhones in Sudan — Blue Apple",
      },
      {
        property: "og:description",
        content: "Genuine iPhones imported and delivered across Sudan.",
      },
    ],
  }),
  component: PhonesPage,
});

// Sort order so newer iPhones appear first
const MODEL_ORDER = [
  "iPhone 17 Pro Max",
  "iPhone 17 Pro",
  "iPhone 17 Plus",
  "iPhone 17",
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

    fetchProducts("vendor:Apple AND product_type:Smartphones", 50)
      .then((products) => {
        if (cancelled) return;

        const sorted = [...products].sort(
          (a, b) => rank(a.title) - rank(b.title)
        );

        setPhones(sorted);
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24 hero-bg">
        <p className="text-sm uppercase tracking-widest text-primary">
          iPhones · Imported to Sudan
        </p>

        <h1 className="mt-3 text-5xl lg:text-6xl font-semibold tracking-tight">
          Genuine Apple,{" "}
          <span className="gradient-text">
            delivered in Sudan.
          </span>
        </h1>

        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          We import authentic iPhones from abroad and deliver them across
          Sudan — from the iPhone 13 Pro Max to the latest iPhone 17 Pro Max.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
        {loading && (
          <p className="text-muted-foreground">
            Loading iPhones…
          </p>
        )}

        {error && (
          <p className="text-destructive">
            Couldn't load products: {error}
          </p>
        )}

        {!loading && !error && phones.length === 0 && (
          <p className="text-muted-foreground">
            No products found.
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {phones.map((p) => (
            <ShopifyProductCard
              key={p.id}
              product={p}
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
