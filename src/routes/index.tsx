import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { HeroPanel } from "@/components/HeroPanel";
import { useT } from "@/lib/i18n";
import {
  fetchAllCollectionsWithProducts,
  fetchProductsByCollectionId,
  type ShopifyCollection,
  type ShopifyProduct,
} from "@/lib/shopify";

const ACCESSORIES_COLLECTION_ID = "323584295108";
const EVERYDAY_ESSENTIALS_COLLECTION_ID = "323856171204";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blue Apple — Genuine iPhones & Everyday Tech in Sudan" },
      {
        name: "description",
        content:
          "Genuine iPhones and everyday tech essentials, imported and delivered across Sudan since 2021.",
      },
      { property: "og:title", content: "Blue Apple — Genuine iPhones & Everyday Tech in Sudan" },
      {
        property: "og:description",
        content: "Genuine iPhones and everyday tech, imported and delivered across Sudan.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const t = useT();
  const [phoneCollections, setPhoneCollections] = useState<ShopifyCollection[]>([]);
  const [accessories, setAccessories] = useState<ShopifyProduct[]>([]);
  const [essentials, setEssentials] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [all, acc, ess] = await Promise.all([
          fetchAllCollectionsWithProducts(50, 250),
          fetchProductsByCollectionId(ACCESSORIES_COLLECTION_ID, 20).catch(() => []),
          fetchProductsByCollectionId(EVERYDAY_ESSENTIALS_COLLECTION_ID, 20).catch(() => []),
        ]);
        if (cancelled) return;
        const isAccessories = (c: ShopifyCollection) => {
          const numericId = c.id.split("/").pop();
          return (
            numericId === ACCESSORIES_COLLECTION_ID ||
            numericId === EVERYDAY_ESSENTIALS_COLLECTION_ID ||
            /accessor|charger|case|cable|airpod|earbud/i.test(c.title)
          );
        };
        const phones = all.filter((c) => c.products.length > 0 && !isAccessories(c));
        setPhoneCollections(phones);
        setAccessories(acc);
        setEssentials(ess);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const phoneImages = (() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const c of phoneCollections) {
      for (const p of c.products) {
        const url = p.images?.edges?.[0]?.node?.url;
        if (url && !seen.has(url)) {
          seen.add(url);
          list.push(url);
        }
        if (list.length >= 8) break;
      }
      if (list.length >= 8) break;
    }
    return list;
  })();

  const accessoryImages = (() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const p of accessories) {
      const url = p.images?.edges?.[0]?.node?.url;
      if (url && !seen.has(url)) {
        seen.add(url);
        list.push(url);
      }
      if (list.length >= 8) break;
    }
    return list;
  })();

  const essentialImages = (() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const p of essentials) {
      const url = p.images?.edges?.[0]?.node?.url;
      if (url && !seen.has(url)) {
        seen.add(url);
        list.push(url);
      }
      if (list.length >= 8) break;
    }
    return list;
  })();

  return (
    <PageShell>
      <section className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 pt-10 sm:pt-16 lg:pt-20 hero-bg overflow-hidden">
        <div
          className="hero-blob"
          style={{
            width: 420,
            height: 420,
            top: -120,
            right: -80,
            background:
              "radial-gradient(circle, oklch(0.62 0.22 255 / 0.45), transparent 70%)",
          }}
        />
        <div
          className="hero-blob"
          style={{
            width: 360,
            height: 360,
            bottom: -140,
            left: -100,
            background:
              "radial-gradient(circle, oklch(0.72 0.20 250 / 0.35), transparent 70%)",
            animationDelay: "3s",
          }}
        />

        <div className="relative">
          <p className="text-[11px] sm:text-sm uppercase tracking-widest text-primary animate-fade-up stagger-1">
            {t("home.eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] animate-fade-up stagger-2">
            {t("home.title.a")}{" "}
            <span className="gradient-text-animated">{t("home.title.b")}</span>
          </h1>
          <div className="mt-5 sm:mt-6 max-w-2xl space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p className="animate-fade-up stagger-3">{t("home.p1")}</p>
            <p className="animate-fade-up stagger-4">{t("home.p2")}</p>
            <p className="animate-fade-up stagger-5 font-medium text-foreground">{t("home.p3")}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 pt-8 sm:pt-12 space-y-6 sm:space-y-8">
        <HeroPanel
          eyebrow={t("home.phones.eyebrow")}
          title={t("home.phones.title")}
          highlight={t("home.phones.highlight")}
          description={t("home.phones.desc")}
          ctaLabel={t("home.phones.cta")}
          ctaHref="/phones"
          images={phoneImages}
          imageAlt="Latest iPhone"
          eager
        />
        <HeroPanel
          eyebrow={t("home.acc.eyebrow")}
          title={t("home.acc.title")}
          description={t("home.acc.desc")}
          ctaLabel={t("home.acc.cta")}
          ctaHref="/accessories"
          images={accessoryImages}
          imageAlt="Apple accessories"
          reverse
          intervalMs={4200}
        />
        <HeroPanel
          eyebrow={t("home.ess.eyebrow")}
          title={t("home.ess.title")}
          description={t("home.ess.desc")}
          ctaLabel={t("home.ess.cta")}
          ctaHref="/everyday-essentials"
          images={essentialImages}
          imageAlt="Everyday essentials"
          intervalMs={4600}
        />
      </section>

      <div className="pb-16 sm:pb-20" />

    </PageShell>
  );
}
