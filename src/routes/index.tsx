import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { HeroCarousel, type HeroSlide } from "@/components/HeroCarousel";
import {
  fetchAllCollectionsWithProducts,
  fetchProductsByCollectionId,
  type ShopifyCollection,
  type ShopifyProduct,
} from "@/lib/shopify";

const ACCESSORIES_COLLECTION_ID = "323584295108";

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
  const [phoneCollections, setPhoneCollections] = useState<ShopifyCollection[]>([]);
  const [accessories, setAccessories] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [all, acc] = await Promise.all([
          fetchAllCollectionsWithProducts(50, 250),
          fetchProductsByCollectionId(ACCESSORIES_COLLECTION_ID, 20).catch(() => []),
        ]);
        if (cancelled) return;
        const isAccessories = (c: ShopifyCollection) => {
          const numericId = c.id.split("/").pop();
          return (
            numericId === ACCESSORIES_COLLECTION_ID ||
            /accessor|charger|case|cable|airpod|earbud/i.test(c.title)
          );
        };
        const phones = all.filter((c) => c.products.length > 0 && !isAccessories(c));
        setPhoneCollections(phones);
        setAccessories(acc);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const firstPhoneImage = (() => {
    for (const c of phoneCollections) {
      for (const p of c.products) {
        const url = p.images?.edges?.[0]?.node?.url;
        if (url) return url;
      }
    }
    return undefined;
  })();
  const firstAccessoryImage = (() => {
    for (const p of accessories) {
      const url = p.images?.edges?.[0]?.node?.url;
      if (url) return url;
    }
    return undefined;
  })();

  const slides: HeroSlide[] = [
    {
      eyebrow: "Smartphones",
      title: "The latest iPhones.",
      highlight: "Delivered in Sudan.",
      description:
        "From iPhone 13 Pro Max to iPhone 17 Pro Max — genuine, inspected, and backed by a 1-year warranty.",
      ctaLabel: "Shop Phones",
      ctaHref: "/phones",
      image: firstPhoneImage,
      imageAlt: "Latest iPhone",
    },
    {
      eyebrow: "Everyday Use",
      title: "Everyday essentials.",
      highlight: "Built for your Apple life.",
      description:
        "Cases, chargers, cables, earbuds and more — the accessories that keep your day moving.",
      ctaLabel: "Shop Everyday Use",
      ctaHref: "/accessories",
      image: firstAccessoryImage,
      imageAlt: "Apple accessories",
    },
  ];

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
            Trusted Service Since 2021
          </p>
          <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] animate-fade-up stagger-2">
            Premium Phones.{" "}
            <span className="gradient-text-animated">Trusted Service Since 2021.</span>
          </h1>
          <div className="mt-5 sm:mt-6 max-w-2xl space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p className="animate-fade-up stagger-3">
              Blue Apple specializes in smartphones and everyday tech, offering genuine products,
              fast delivery, and a 1-year warranty.
            </p>
            <p className="animate-fade-up stagger-4">
              Enjoy exclusive upgrade offers and discounts with our Blue Apple Membership Card.
            </p>
            <p className="animate-fade-up stagger-5 font-medium text-foreground">
              We don't just sell phones — we build trust.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 pt-8 sm:pt-12">
        <HeroCarousel slides={slides} />
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 pt-14 sm:pt-20 pb-16 sm:pb-20">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-[11px] sm:text-sm uppercase tracking-widest text-primary">Featured</p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              Popular iPhones
            </h2>
          </div>
          <Link
            to="/phones"
            className="text-sm text-primary hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            View all →
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-muted/60 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && featuredPhones.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {featuredPhones.map((phone, idx) => (
              <div
                key={phone.id}
                className={`animate-fade-up lift-card stagger-${Math.min((idx % 8) + 1, 8)}`}
              >
                <ShopifyProductCard product={phone} />
              </div>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
