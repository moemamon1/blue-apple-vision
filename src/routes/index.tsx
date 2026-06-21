import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ShopifyProductCard } from "@/components/ShopifyProductCard";
import {
  fetchAllCollectionsWithProducts,
  type ShopifyCollection,
  type ShopifyProduct,
} from "@/lib/shopify";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iPhones in Sudan — Blue Apple" },
      {
        name: "description",
        content:
          "Genuine iPhones imported from abroad and delivered across Sudan.",
      },
      {
        property: "og:title",
        content: "iPhones in Sudan — Blue Apple",
      },
      {
        property: "og:description",
        content:
          "Genuine iPhones imported and delivered across Sudan.",
      },
    ],
  }),

  component: PhonesPage,
});

// Sort collections so newest iPhone series appear first, SE/Budget last.
function collectionRank(title: string): number {
  const m = title.match(/iPhone\s+(\d+)/i);
  if (m) return 1000 - parseInt(m[1], 10); // higher number = earlier
  if (/SE|Budget/i.test(title)) return 9999;
  return 5000;
}

function PhonesPage() {
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const all = await fetchAllCollectionsWithProducts(50, 250);
        if (cancelled) return;

        // Keep only iPhone-related collections; sort by series.
        const iphoneCollections = all
          .filter(
            (c) =>
              /iphone/i.test(c.title) ||
              /se|budget/i.test(c.title)
          )
          .filter((c) => c.products.length > 0)
          .sort((a, b) => collectionRank(a.title) - collectionRank(b.title));

        setCollections(iphoneCollections);
      } catch (err: any) {
        console.error(err);
        if (!cancelled) {
          setError(err.message || "Failed to load products");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const allProducts: ShopifyProduct[] = (() => {
    const seen = new Set<string>();
    const list: ShopifyProduct[] = [];
    for (const c of collections) {
      for (const p of c.products) {
        if (!seen.has(p.id)) {
          seen.add(p.id);
          list.push(p);
        }
      }
    }
    return list;
  })();



  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24 hero-bg">
        <p className="text-sm uppercase tracking-widest text-primary">
          iPhones · Imported to Sudan
        </p>

        <h1 className="mt-3 text-5xl lg:text-6xl font-semibold tracking-tight">
          Genuine Apple{" "}
          <span className="gradient-text">
            delivered in Sudan.
          </span>
        </h1>

        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          We import authentic iPhones from abroad and deliver
          them across Sudan — from the iPhone 13 Pro Max to
          the latest iPhone 17 Pro Max.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
        {loading && (
          <p className="text-muted-foreground">
            Loading iPhones...
          </p>
        )}

        {error && (
          <p className="text-red-500">
            Error: {error}
          </p>
        )}

        {!loading && !error && allProducts.length === 0 && (
          <p className="text-muted-foreground">
            No products found.
          </p>
        )}

        {!loading && !error && allProducts.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((phone) => (
              <ShopifyProductCard
                key={phone.id}
                product={phone}
              />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
