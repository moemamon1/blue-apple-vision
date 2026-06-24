import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Heart, Truck, Shield, RotateCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { fetchProductByHandle, fetchProducts } from "@/lib/shopify";
import { ShopifyProductCard } from "@/components/ShopifyProductCard";
import { ProductImage } from "@/components/ProductImage";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/product/$handle")({
  loader: async ({ params }) => {
    const product = await fetchProductByHandle(params.handle);
    if (!product) throw notFound();
    const related = await fetchProducts("vendor:Apple AND product_type:Smartphones", 8);
    return { product, related: related.filter((p) => p.handle !== params.handle).slice(0, 4) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.title} — Blue Apple` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.title} — Blue Apple` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.images.edges[0]?.node.url ?? "" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="text-3xl font-semibold">Product not found</h1>
        <Link to="/" className="mt-6 inline-block text-primary">Back to shop</Link>
      </div>
    </PageShell>
  ),
  errorComponent: ({ error }: { error: Error }) => (
    <PageShell>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    </PageShell>
  ),
  component: ProductDetailPage,
});

const COLOR_MAP: Record<string, string> = {
  black: "#1d1d1f",
  "space black": "#1d1d1f",
  "space gray": "#52555a",
  "space grey": "#52555a",
  graphite: "#3a3a3c",
  midnight: "#171e27",
  "midnight black": "#171e27",
  white: "#f5f5f7",
  starlight: "#f0ead6",
  silver: "#e3e4e5",
  gold: "#f4e1c1",
  "rose gold": "#f5cac3",
  pink: "#f7c6c7",
  red: "#bf0013",
  "product red": "#bf0013",
  blue: "#3b6ea5",
  "sierra blue": "#a7c1d9",
  "pacific blue": "#2e4a62",
  "deep blue": "#2c3e5d",
  green: "#54625a",
  "alpine green": "#5b6a5a",
  yellow: "#f5e07a",
  purple: "#b5a7d6",
  "deep purple": "#56506b",
  "natural titanium": "#bcb8b1",
  "blue titanium": "#5f7588",
  "white titanium": "#e9e5dd",
  "black titanium": "#3b3b3d",
  "desert titanium": "#bda37a",
  titanium: "#bcb8b1",
  orange: "#e9863b",
  teal: "#3aa6a0",
};

function colorForName(name: string): string {
  const key = name.trim().toLowerCase();
  if (COLOR_MAP[key]) return COLOR_MAP[key];
  // try partial match
  for (const k of Object.keys(COLOR_MAP)) {
    if (key.includes(k)) return COLOR_MAP[k];
  }
  return "#cccccc";
}

type DescBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

function parseDescription(raw: string): DescBlock[] {
  const lines = raw
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const blocks: DescBlock[] = [];
  let currentList: string[] | null = null;

  const isBullet = (l: string) => /^([-*•·●◦▪►–]|\d+[.)])\s+/.test(l);
  const stripBullet = (l: string) => l.replace(/^([-*•·●◦▪►–]|\d+[.)])\s+/, "").trim();

  for (const line of lines) {
    if (isBullet(line)) {
      if (!currentList) {
        currentList = [];
        blocks.push({ type: "ul", items: currentList });
      }
      currentList.push(stripBullet(line));
    } else {
      currentList = null;
      blocks.push({ type: "p", text: line });
    }
  }
  return blocks;
}

function ProductDetailPage() {
  const { product, related } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges[0]?.node);
  const addItem = useCartStore((s) => s.addItem);
  const [adding, setAdding] = useState(false);

  const images = product.images.edges.map((e: { node: { url: string; altText: string | null } }) => e.node);
  const [activeImage, setActiveImage] = useState(images[0]?.url ?? "");

  const handleAdd = async () => {
    if (!selectedVariant) return;
    setAdding(true);
    try {
      await addItem({
        variantId: selectedVariant.id,
        productHandle: product.handle,
        productTitle: product.title,
        variantTitle: selectedVariant.title,
        image: images[0]?.url ?? null,
        price: selectedVariant.price,
        quantity: qty,
      });
      toast.success(`${product.title} added to cart`);
    } finally {
      setAdding(false);
    }
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-6 sm:py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="lg:sticky lg:top-24 self-start">
            <ProductImage
              src={activeImage}
              alt={product.title}
              loading="eager"
              className="aspect-square rounded-3xl sm:rounded-[2rem]"
              imageClassName="p-8 sm:p-12 animate-fade-in"
            />
            {images.length > 1 && (
              <div className="mt-3 sm:mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                {images.map((img: { url: string }, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img.url)}
                    className={`aspect-square rounded-xl sm:rounded-2xl product-image-surface border border-border overflow-hidden cursor-pointer hover:border-primary transition ${
                      activeImage === img.url ? "border-primary ring-2 ring-primary/20" : ""
                    }`}
                  >
                    <img src={img.url} alt="" className="h-full w-full object-contain p-2 sm:p-3 opacity-80" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-widest text-primary">{product.productType || "Smartphones"}</p>
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">{product.title}</h1>

            <div className="mt-6 sm:mt-8 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-semibold">
                {selectedVariant?.price.currencyCode === "USD" ? "$" : `${selectedVariant?.price.currencyCode ?? ""} `}
                {Math.round(parseFloat(selectedVariant?.price.amount ?? "0"))}
              </span>
            </div>

            {product.description?.trim() && (
              <div className="mt-6 sm:mt-8 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Overview
                </h2>
                <div className="mt-3 space-y-3 text-sm sm:text-base text-foreground/85 leading-relaxed">
                  {parseDescription(product.description).map((block, i) =>
                    block.type === "p" ? (
                      <p key={i}>{block.text}</p>
                    ) : (
                      <ul key={i} className="list-disc pl-5 space-y-1.5 marker:text-primary">
                        {block.items.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Variants */}
            {product.options && product.options.length > 0 && (
              <div className="mt-6 sm:mt-8 space-y-4">
                {product.options.map((opt: { name: string; values: string[] }) => {
                  const isColor = /colou?r/i.test(opt.name);
                  const currentSelections: Record<string, string> = {};
                  selectedVariant?.selectedOptions?.forEach((o: { name: string; value: string }) => {
                    currentSelections[o.name] = o.value;
                  });

                  // Pick the variant that best matches: must have opt.name === val,
                  // and match as many other current selections as possible.
                  const pickVariantFor = (val: string) => {
                    const desired = { ...currentSelections, [opt.name]: val };
                    let best: { node: typeof selectedVariant } | null = null;
                    let bestScore = -1;
                    for (const edge of product.variants.edges as Array<{ node: { selectedOptions?: Array<{ name: string; value: string }> } }>) {
                      const so = edge.node.selectedOptions ?? [];
                      const hasVal = so.some((o) => o.name === opt.name && o.value === val);
                      if (!hasVal) continue;
                      let score = 0;
                      for (const o of so) {
                        if (desired[o.name] === o.value) score++;
                      }
                      if (score > bestScore) {
                        bestScore = score;
                        best = edge as { node: typeof selectedVariant };
                      }
                    }
                    return best;
                  };

                  return (
                    <div key={opt.name}>
                      <p className="text-sm font-medium mb-2">
                        {opt.name}
                        {isColor && (
                          <span className="ml-2 text-muted-foreground font-normal">
                            {currentSelections[opt.name]}
                          </span>
                        )}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.map((val: string) => {
                          const isActive = currentSelections[opt.name] === val;
                          const variantForValue = pickVariantFor(val);
                          const disabled = !variantForValue;
                          if (isColor) {
                            return (
                              <button
                                key={val}
                                title={val}
                                aria-label={val}
                                disabled={disabled}
                                onClick={() => variantForValue && setSelectedVariant(variantForValue.node)}
                                className={`size-9 rounded-full border-2 transition shadow-sm ${
                                  isActive ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-foreground/40"
                                } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                                style={{ background: colorForName(val) }}
                              />
                            );
                          }
                          return (
                            <button
                              key={val}
                              disabled={disabled}
                              onClick={() => variantForValue && setSelectedVariant(variantForValue.node)}
                              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                                isActive
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border hover:bg-muted"
                              } ${disabled ? "opacity-40 cursor-not-allowed line-through" : ""}`}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-4">
              <div className="flex items-center rounded-full border border-border shrink-0">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="size-11 grid place-items-center hover:bg-muted rounded-l-full">
                  <Minus className="size-4" />
                </button>
                <span className="w-8 sm:w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="size-11 grid place-items-center hover:bg-muted rounded-r-full">
                  <Plus className="size-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                disabled={adding || !selectedVariant}
                className="btn-primary flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-medium text-sm sm:text-base disabled:opacity-50"
              >
                {adding ? <Loader2 className="size-4 animate-spin" /> : <><ShoppingBag className="size-4" /> Add to cart</>}
              </button>
              <button className="size-11 sm:size-12 grid place-items-center rounded-full border border-border hover:bg-muted shrink-0">
                <Heart className="size-5" />
              </button>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 text-xs">
              {[
                { Icon: Truck, t: "Free shipping" },
                { Icon: RotateCw, t: "30-day returns" },
                { Icon: Shield, t: "1-year warranty" },
              ].map((b) => (
                <div key={b.t} className="rounded-xl sm:rounded-2xl border border-border p-3 sm:p-4 text-center">
                  <b.Icon className="size-5 mx-auto text-primary" />
                  <p className="mt-2 font-medium text-[11px] sm:text-xs">{b.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
          <h2 className="text-2xl font-semibold mb-6">You may also like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p: import("@/lib/shopify").ShopifyProduct) => (
              <ShopifyProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}

