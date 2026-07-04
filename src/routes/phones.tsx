import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ShopifyProductCard } from "@/components/ShopifyProductCard";
import { useT } from "@/lib/i18n";
import {
  fetchAllCollectionsWithProducts,
  type ShopifyCollection,
  type ShopifyProduct,
} from "@/lib/shopify";

export const Route = createFileRoute("/phones")({
  head: () => ({
    meta: [
      { title: "Phones — Blue Apple" },
      { name: "description", content: "Genuine iPhones imported from abroad and delivered across Sudan." },
      { property: "og:title", content: "Phones — Blue Apple" },
      { property: "og:description", content: "Genuine iPhones imported and delivered across Sudan." },
    ],
  }),
  component: PhonesPage,
});

const ACCESSORIES_COLLECTION_ID = "323584295108";
const EVERYDAY_ESSENTIALS_COLLECTION_ID = "323856171204";

function collectionRank(title: string): number {
  const m = title.match(/iPhone\s+(\d+)/i);
  if (m) return 1000 - parseInt(m[1], 10);
  if (/SE|Budget/i.test(title)) return 8000;
  return 5000;
}

function PhonesPage() {
  const t = useT();
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const all = await fetchAllCollectionsWithProducts(50, 250);
        if (cancelled) return;
        const isAccessories = (c: ShopifyCollection) => {
          const numericId = c.id.split("/").pop();
          return (
            numericId === ACCESSORIES_COLLECTION_ID ||
            numericId === EVERYDAY_ESSENTIALS_COLLECTION_ID ||
            /accessor|charger|case|cable|airpod|earbud/i.test(c.title)
          );
        };
        const visible = all
          .filter((c) => c.products.length > 0 && !isAccessories(c))
          .sort((a, b) => collectionRank(a.title) - collectionRank(b.title));
        setCollections(visible);
      } catch (err: any) {
        if (!cancelled) setError(err.message || "Failed to load products");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const allProducts: ShopifyProduct[] = (() => {
    const seen = new Set<string>();
    const list: ShopifyProduct[] = [];
    for (const c of collections) {
      for (const p of c.products) {
        if (!seen.has(p.id)) { seen.add(p.id); list.push(p); }
      }
    }
    return list;
  })();

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-10 sm:py-16 lg:py-20 hero-bg">
        <p className="text-[11px] sm:text-sm uppercase tracking-widest text-primary">{t("phones.eyebrow")}</p>
        <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
          {t("phones.title.a")} <span className="gradient-text-animated">{t("phones.title.b")}</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl">
          {t("phones.desc")}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 pb-16 sm:pb-20">
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-muted/60 animate-pulse" />
            ))}
          </div>
        )}
        {error && <p className="text-red-500">{t("phones.error")} {error}</p>}
        {!loading && !error && allProducts.length === 0 && (
          <p className="text-muted-foreground">{t("phones.none")}</p>
        )}
        {!loading && !error && allProducts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {allProducts.map((phone, idx) => (
              <div key={phone.id} className={`animate-fade-up lift-card stagger-${Math.min((idx % 8) + 1, 8)}`}>
                <ShopifyProductCard product={phone} />
              </div>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
