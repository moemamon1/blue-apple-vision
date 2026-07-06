import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, ShieldCheck, Package, MessagesSquare, MapPin } from "lucide-react";
import { PageShell } from "@/components/PageShell";
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
      { title: "Blue Apple — Sudan's Verified Apple Retailer Since 2021" },
      {
        name: "description",
        content:
          "Directly imported iPhones and everyday tech. Every device includes a 1-year Blue Apple warranty and local technical support in Khartoum.",
      },
      { property: "og:title", content: "Blue Apple — Sudan's Verified Apple Retailer" },
      {
        property: "og:description",
        content: "Genuine iPhones, accessories and everyday tech, imported and serviced in Sudan.",
      },
    ],
  }),
  component: HomePage,
});

function firstImage(products: ShopifyProduct[]): string | undefined {
  for (const p of products) {
    const url = p.images?.edges?.[0]?.node?.url;
    if (url) return url;
  }
  return undefined;
}

function HomePage() {
  const t = useT();
  const [phoneCollections, setPhoneCollections] = useState<ShopifyCollection[]>([]);
  const [accessories, setAccessories] = useState<ShopifyProduct[]>([]);
  const [essentials, setEssentials] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [all, acc, ess] = await Promise.all([
        fetchAllCollectionsWithProducts(50, 250).catch(() => [] as ShopifyCollection[]),
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
      setPhoneCollections(all.filter((c) => c.products.length > 0 && !isAccessories(c)));
      setAccessories(acc);
      setEssentials(ess);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const phonesHero = (() => {
    for (const c of phoneCollections) {
      const url = firstImage(c.products);
      if (url) return url;
    }
    return undefined;
  })();
  const accHero = firstImage(accessories);
  const essHero = firstImage(essentials);

  const categories = [
    {
      to: "/phones" as const,
      eyebrow: t("home.phones.eyebrow"),
      title: t("home.phones.title"),
      tag: t("home.phones.highlight"),
      desc: t("home.phones.desc"),
      cta: t("home.phones.cta"),
      img: phonesHero,
      alt: "Genuine iPhones",
    },
    {
      to: "/accessories" as const,
      eyebrow: t("home.acc.eyebrow"),
      title: t("home.acc.title"),
      tag: t("home.acc.tag"),
      desc: t("home.acc.desc"),
      cta: t("home.acc.cta"),
      img: accHero,
      alt: "Apple accessories",
    },
    {
      to: "/everyday-essentials" as const,
      eyebrow: t("home.ess.eyebrow"),
      title: t("home.ess.title"),
      tag: t("home.ess.tag"),
      desc: t("home.ess.desc"),
      cta: t("home.ess.cta"),
      img: essHero,
      alt: "Everyday essentials",
    },
  ];

  const trust = [
    { Icon: ShieldCheck, title: t("home.trust.provenance.title"), desc: t("home.trust.provenance.desc") },
    { Icon: Package, title: t("home.trust.warranty.title"), desc: t("home.trust.warranty.desc") },
    { Icon: MessagesSquare, title: t("home.trust.bilingual.title"), desc: t("home.trust.bilingual.desc") },
    { Icon: MapPin, title: t("home.trust.contact.title"), desc: t("home.trust.contact.desc") },
  ];

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 pt-10 sm:pt-16 space-y-16 sm:space-y-24">
        {/* Editorial hero */}
        <section className="grid lg:grid-cols-12 border border-border bg-card">
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center lg:border-r border-b lg:border-b-0 border-border">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="h-px w-8 bg-accent" />
              <span className="eyebrow">{t("home.eyebrow")}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.05] font-bold text-primary">
              {t("home.title.a")} <br />
              <span className="italic font-normal text-accent">{t("home.title.b")}</span>
            </h1>
            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
              {t("home.p1")}
            </p>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed">
              {t("home.p2")}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3">
              <Link to="/phones" className="btn-primary px-8 sm:px-10 py-4">
                {t("home.cta.shop")}
              </Link>
              <Link to="/contact" className="btn-outline px-8 sm:px-10 py-4">
                {t("home.cta.service")}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative bg-secondary min-h-[380px] lg:min-h-0 flex items-center justify-center overflow-hidden">
            <div className="absolute top-5 end-5 flex flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-tight text-accent z-10">
              <span>Est. Khartoum · 2021</span>
              <span>1-Year Local Warranty</span>
            </div>
            {phonesHero ? (
              <img
                src={phonesHero}
                alt="iPhone"
                loading="eager"
                className="w-full h-full max-h-[560px] object-contain p-10 sm:p-14"
              />
            ) : (
              <div className="w-full aspect-[4/5]" />
            )}
          </div>
        </section>

        {/* Category grid — magazine editorial */}
        <section>
          <div className="flex items-baseline justify-between mb-8 sm:mb-10 pb-4 border-b border-border">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">The Catalog</h2>
            <span className="eyebrow hidden sm:inline">Selection 2025</span>
          </div>
          <div className="grid md:grid-cols-3 gap-10 sm:gap-12">
            {categories.map((c) => (
              <Link key={c.to} to={c.to} className="group lift-card border border-border bg-card p-4 flex flex-col">
                <div className="aspect-square bg-secondary overflow-hidden">
                  {c.img ? (
                    <img
                      src={c.img}
                      alt={c.alt}
                      loading="lazy"
                      className="w-full h-full object-contain p-6 grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  ) : null}
                </div>
                <div className="pt-5 pb-2 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-serif text-2xl font-bold text-primary">{c.title}</h3>
                    <span className="mt-1 font-mono text-[10px] uppercase tracking-tight border border-accent text-accent px-2 py-0.5">
                      {c.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-[11px] uppercase tracking-[0.18em] font-bold text-primary group-hover:text-accent transition-colors">
                    <span>{c.cta}</span>
                    <ArrowUpRight className="size-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust bar — dense factual footer strip */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 py-10 sm:py-12 border-t border-b border-border">
          {trust.map(({ Icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-3">
              <Icon className="size-5 text-accent" strokeWidth={1.5} />
              <h4 className="eyebrow text-primary">{title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </section>

        {/* Closing manifesto line */}
        <section className="pb-8 sm:pb-16 text-center">
          <p className="font-serif italic text-2xl sm:text-4xl text-primary leading-snug max-w-3xl mx-auto">
            {t("home.p3")}
          </p>
        </section>
      </div>
    </PageShell>
  );
}
