import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ArrowRight, ShoppingBag, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ProductImage } from "@/components/ProductImage";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Blue Apple" }, { name: "description", content: "Your shopping bag" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, updateQuantity, removeItem, getCheckoutUrl } = useCartStore();
  const subtotal = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "USD";
  const totalItems = items.reduce((n, i) => n + i.quantity, 0);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <h1 className="text-4xl font-semibold tracking-tight">Your bag</h1>
        <p className="mt-2 text-muted-foreground">{totalItems} item{totalItems !== 1 && "s"}</p>

        {items.length === 0 ? (
          <div className="mt-16 text-center">
            <ShoppingBag className="size-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Your bag is empty.</p>
            <Link to="/" className="mt-6 inline-block btn-primary px-6 py-3 rounded-full font-medium">Continue shopping</Link>
          </div>
        ) : (
          <div className="mt-10 grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 rounded-3xl border border-border bg-card p-4 sm:p-6 animate-fade-in">
                  <ProductImage
                    src={item.image}
                    alt={item.productTitle}
                    className="size-24 sm:size-32 shrink-0 rounded-2xl"
                    imageClassName="p-2"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.variantTitle}</p>
                        <p className="font-semibold">{item.productTitle}</p>
                      </div>
                      <button onClick={() => removeItem(item.variantId)} className="size-8 grid place-items-center rounded-full hover:bg-muted">
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="size-9 grid place-items-center hover:bg-muted rounded-l-full">
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="size-9 grid place-items-center hover:bg-muted rounded-r-full">
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <p className="font-semibold">
                        {currency === "USD" ? "$" : `${currency} `}
                        {(parseFloat(item.price.amount) * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
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
                  <span className="font-medium">
                    {currency === "USD" ? "$" : `${currency} `}
                    {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-semibold">
                  {currency === "USD" ? "$" : `${currency} `}
                  {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="btn-primary mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-medium"
              >
                Checkout <ExternalLink className="size-4" />
              </button>
              <p className="mt-3 text-xs text-muted-foreground text-center">Secure checkout powered by Shopify</p>
            </aside>
          </div>
        )}
      </section>
    </PageShell>
  );
}

