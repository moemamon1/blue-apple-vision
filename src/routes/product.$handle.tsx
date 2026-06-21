import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Heart, Truck, Shield, RotateCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { fetchProductByHandle, fetchProducts } from "@/lib/shopify";
import { ShopifyProductCard } from "@/components/ShopifyProductCard";
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
            <div className="relative aspect-square rounded-3xl sm:rounded-[2rem] surface overflow-hidden">
              <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-70" />
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product.title}
                  className="relative h-full w-full object-contain p-8 sm:p-12 animate-fade-in"
                />
              ) : (
                <div className="relative h-full w-full grid place-items-center text-muted-foreground">No image</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-3 sm:mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                {images.map((img: { url: string }, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img.url)}
                    className={`aspect-square rounded-xl sm:rounded-2xl surface border border-border overflow-hidden cursor-pointer hover:border-primary transition ${
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
            <p className="mt-2 sm:mt-3 text-base sm:text-lg text-muted-foreground">{product.description.slice(0, 140)}{product.description.length > 140 ? "..." : ""}</p>

            <div className="mt-6 sm:mt-8 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-semibold">
                {selectedVariant?.price.currencyCode === "USD" ? "$" : `${selectedVariant?.price.currencyCode ?? ""} `}
                {Math.round(parseFloat(selectedVariant?.price.amount ?? "0"))}
              </span>
            </div>

            <p className="mt-5 sm:mt-6 text-sm sm:text-base text-foreground/80 leading-relaxed">{product.description}</p>

            {/* Variants */}
            {product.options && product.options.length > 0 && (
              <div className="mt-6 sm:mt-8 space-y-4">
                {product.options.map((opt: { name: string; values: string[] }) => {
                  const isColor = /colou?r/i.test(opt.name);
                  return (
                    <div key={opt.name}>
                      <p className="text-sm font-medium mb-2">
                        {opt.name}
                        {isColor && (
                          <span className="ml-2 text-muted-foreground font-normal">
                            {selectedVariant?.selectedOptions?.find(
                              (o: { name: string; value: string }) => o.name === opt.name
                            )?.value}
                          </span>
                        )}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.map((val: string) => {
                          const isActive = selectedVariant?.selectedOptions?.some(
                            (o: { name: string; value: string }) => o.name === opt.name && o.value === val
                          );
                          const variantForValue = product.variants.edges.find((v: { node: { selectedOptions?: Array<{ name: string; value: string }> } }) =>
                            v.node.selectedOptions?.some((o: { name: string; value: string }) => o.name === opt.name && o.value === val)
                          );
                          if (isColor) {
                            return (
                              <button
                                key={val}
                                title={val}
                                aria-label={val}
                                onClick={() => variantForValue && setSelectedVariant(variantForValue.node)}
                                className={`size-9 rounded-full border-2 transition shadow-sm ${
                                  isActive ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-foreground/40"
                                }`}
                                style={{ background: colorForName(val) }}
                              />
                            );
                          }
                          return (
                            <button
                              key={val}
                              onClick={() => variantForValue && setSelectedVariant(variantForValue.node)}
                              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                                isActive
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border hover:bg-muted"
                              }`}
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

