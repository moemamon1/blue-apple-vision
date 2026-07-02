import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard, Lock, ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { products } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Blue Apple" }, { name: "description", content: "Secure checkout" }] }),
  component: CheckoutPage,
});

const steps = ["Information", "Shipping", "Payment"] as const;

function CheckoutPage() {
  const [step, setStep] = useState(0);
  const items = products.slice(0, 2);
  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const total = subtotal;

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10 py-8 sm:py-12">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to bag
        </Link>
        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">Checkout</h1>

        {/* Stepper */}
        <ol className="mt-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2 flex-1">
              <button
                onClick={() => setStep(i)}
                className={`size-8 rounded-full grid place-items-center text-xs font-medium transition ${
                  i <= step ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-glow" : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="size-4" /> : i + 1}
              </button>
              <span className={`text-sm ${i === step ? "font-medium" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-border" />}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 lg:p-8 shadow-soft animate-fade-in" key={step}>
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-lg">Contact information</h2>
                <Field label="Email" type="email" placeholder="you@example.com" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First name" />
                  <Field label="Last name" />
                </div>
                <Field label="Address" />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label="City" />
                  <Field label="State" />
                  <Field label="ZIP" />
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-3">
                <h2 className="font-semibold text-lg">Shipping method</h2>
                {[
                  { name: "Standard", time: "5–7 days", price: "Free" },
                  { name: "Express", time: "2–3 days", price: "$14.99" },
                  { name: "Next-day", time: "1 day", price: "$29.99" },
                ].map((opt, i) => (
                  <label key={opt.name} className="flex items-center justify-between p-5 rounded-2xl border border-border cursor-pointer hover:border-primary transition has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="ship" defaultChecked={i === 0} className="accent-primary" />
                      <div>
                        <p className="font-medium">{opt.name}</p>
                        <p className="text-sm text-muted-foreground">{opt.time}</p>
                      </div>
                    </div>
                    <p className="font-semibold">{opt.price}</p>
                  </label>
                ))}
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  Payment <Lock className="size-4 text-muted-foreground" />
                </h2>
                <div className="rounded-2xl border border-border p-5 bg-[image:var(--gradient-primary)] text-primary-foreground shadow-glow">
                  <div className="flex justify-between items-center">
                    <CreditCard className="size-6" />
                    <span className="text-sm opacity-80">VISA</span>
                  </div>
                  <p className="mt-8 tracking-widest text-lg">•••• •••• •••• 4242</p>
                  <div className="mt-4 flex justify-between text-xs opacity-90">
                    <span>YOUR NAME</span>
                    <span>12/28</span>
                  </div>
                </div>
                <Field label="Card number" placeholder="1234 5678 9012 3456" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry" placeholder="MM/YY" />
                  <Field label="CVC" placeholder="123" />
                </div>
                <Field label="Name on card" />
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="px-6 py-3 rounded-full border border-border text-sm font-medium disabled:opacity-40 hover:bg-muted"
              >
                Back
              </button>
              {step < steps.length - 1 ? (
                <button onClick={() => setStep((s) => s + 1)} className="btn-primary px-8 py-3 rounded-full font-medium">
                  Continue
                </button>
              ) : (
                <button className="btn-primary px-8 py-3 rounded-full font-medium">Pay ${total}</button>
              )}
            </div>
          </div>

          <aside className="rounded-3xl border border-border bg-card p-6 shadow-soft h-fit lg:sticky lg:top-24">
            <h2 className="font-semibold">Order summary</h2>
            <div className="mt-4 space-y-3">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3">
                  <div className="size-14 rounded-xl surface overflow-hidden">
                    <img src={i.image} alt={i.name} className="h-full w-full object-contain p-1" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{i.name}</p>
                    <p className="text-muted-foreground text-xs">Qty 1</p>
                  </div>
                  <p className="text-sm font-medium">${i.price}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>Free</span></div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-border mt-2">
                <span>Total</span><span>${total}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
