import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Minus, Plus, ShoppingBag, Heart, Truck, Shield, RotateCw } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Blue Apple` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Blue Apple` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="text-3xl font-semibold">Product not found</h1>
        <Link to="/" className="mt-6 inline-block text-primary">Go home</Link>
      </div>
    </PageShell>
  ),
  errorComponent: ({ error }) => (
    <PageShell>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    </PageShell>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"specs" | "reviews" | "shipping">("specs");
  const [color, setColor] = useState(product.colors[0]);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-6 sm:py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="relative aspect-square rounded-3xl sm:rounded-[2rem] surface overflow-hidden">
              <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-70" />
              <img
                src={product.image}
                alt={product.name}
                className="relative h-full w-full object-contain p-8 sm:p-12 animate-fade-in"
                key={color}
              />
            </div>
            <div className="mt-3 sm:mt-4 grid grid-cols-4 gap-2 sm:gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-xl sm:rounded-2xl surface border border-border overflow-hidden cursor-pointer hover:border-primary transition">
                  <img src={product.image} alt="" className="h-full w-full object-contain p-2 sm:p-3 opacity-80" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-widest text-primary">{product.category}</p>
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">{product.name}</h1>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg text-muted-foreground">{product.tagline}</p>

            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-sm">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="mt-6 sm:mt-8 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-semibold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-base sm:text-lg text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>

            <p className="mt-5 sm:mt-6 text-sm sm:text-base text-foreground/80 leading-relaxed">{product.description}</p>

            <div className="mt-6 sm:mt-8">
              <p className="text-sm font-medium mb-3">Color</p>
              <div className="flex gap-3">
                {product.colors.map((c: string) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`size-10 rounded-full border-2 transition ${color === c ? "border-primary scale-110" : "border-border"}`}
                    style={{ backgroundColor: c }}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>

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
              <Link to="/cart" className="btn-primary flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-medium text-sm sm:text-base">
                <ShoppingBag className="size-4" /> Add to cart
              </Link>
              <button className="size-11 sm:size-12 grid place-items-center rounded-full border border-border hover:bg-muted shrink-0">
                <Heart className="size-5" />
              </button>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 text-xs">
              {[
                { Icon: Truck, t: "Free shipping" },
                { Icon: RotateCw, t: "30-day returns" },
                { Icon: Shield, t: "2-year warranty" },
              ].map((b) => (
                <div key={b.t} className="rounded-xl sm:rounded-2xl border border-border p-3 sm:p-4 text-center">
                  <b.Icon className="size-5 mx-auto text-primary" />
                  <p className="mt-2 font-medium text-[11px] sm:text-xs">{b.t}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-12">
              <div className="flex gap-2 border-b border-border">
                {(["specs", "reviews", "shipping"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-3 text-sm font-medium capitalize border-b-2 -mb-px transition ${
                      tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="py-6 animate-fade-in" key={tab}>
                {tab === "specs" && (
                  <dl className="divide-y divide-border">
                    {product.specs.map((s: { label: string; value: string }) => (
                      <div key={s.label} className="grid grid-cols-2 py-3 text-sm">
                        <dt className="text-muted-foreground">{s.label}</dt>
                        <dd className="font-medium">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {tab === "reviews" && (
                  <div className="space-y-5">
                    {[
                      { n: "Alex M.", r: 5, t: "Absolutely stunning. Worth every penny." },
                      { n: "Priya S.", r: 5, t: "Build quality is incredible. Highly recommend." },
                      { n: "Tom B.", r: 4, t: "Great product, fast delivery." },
                    ].map((r) => (
                      <div key={r.n} className="rounded-2xl border border-border p-5">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{r.n}</p>
                          <div className="flex text-primary">
                            {[...Array(r.r)].map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{r.t}</p>
                      </div>
                    ))}
                  </div>
                )}
                {tab === "shipping" && (
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>Free standard shipping on all orders over $50. Express delivery available at checkout.</p>
                    <p>Ships within 1–2 business days. Tracking provided via email.</p>
                    <p>30-day return policy. No questions asked.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <h2 className="text-2xl font-semibold mb-6">You may also like</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.filter((p) => p.id !== product.id).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
