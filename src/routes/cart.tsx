import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, X, ArrowRight, Tag } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { products } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Blue Apple" }, { name: "description", content: "Your shopping bag" }] }),
  component: CartPage,
});

function CartPage() {
  const [items, setItems] = useState(
    products.slice(0, 2).map((p) => ({ ...p, qty: 1 }))
  );
  const [promo, setPromo] = useState("");

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  const updateQty = (id: string, d: number) =>
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i)));
  const remove = (id: string) => setItems((arr) => arr.filter((i) => i.id !== id));

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <h1 className="text-4xl font-semibold tracking-tight">Your bag</h1>
        <p className="mt-2 text-muted-foreground">{items.length} item{items.length !== 1 && "s"}</p>

        {items.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">Your bag is empty.</p>
            <Link to="/" className="mt-6 inline-block btn-primary px-6 py-3 rounded-full font-medium">Continue shopping</Link>
          </div>
        ) : (
          <div className="mt-10 grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-3xl border border-border bg-card p-4 sm:p-6 animate-fade-in">
                  <div className="size-24 sm:size-32 shrink-0 rounded-2xl surface overflow-hidden">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.category}</p>
                        <p className="font-semibold">{item.name}</p>
                      </div>
                      <button onClick={() => remove(item.id)} className="size-8 grid place-items-center rounded-full hover:bg-muted">
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <button onClick={() => updateQty(item.id, -1)} className="size-9 grid place-items-center hover:bg-muted rounded-l-full">
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="size-9 grid place-items-center hover:bg-muted rounded-r-full">
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <p className="font-semibold">${(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="rounded-3xl border border-border bg-card p-6 lg:p-8 shadow-soft h-fit lg:sticky lg:top-24">
              <h2 className="font-semibold text-lg">Order summary</h2>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="Promo code"
                    className="w-full pl-9 pr-3 py-2.5 rounded-full bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <button className="px-4 py-2.5 rounded-full border border-border text-sm font-medium hover:bg-muted">Apply</button>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-semibold">${total.toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="btn-primary mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-medium">
                Checkout <ArrowRight className="size-4" />
              </Link>
              <p className="mt-3 text-xs text-muted-foreground text-center">Free shipping on orders over $50</p>
            </aside>
          </div>
        )}
      </section>
    </PageShell>
  );
}
