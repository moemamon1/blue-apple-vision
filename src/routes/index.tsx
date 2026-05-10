import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Truck, ShieldCheck, Headphones, Star } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/products";
import heroPhone from "@/assets/hero-phone.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blue Apple — Smart Tech. Minimal Design." },
      { name: "description", content: "Discover premium smartphones, earbuds, smartwatches and accessories from Blue Apple." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden hero-bg">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-24 lg:pt-28 lg:pb-40 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium">
              <Sparkles className="size-3.5 text-primary" />
              New • Blue Apple Pro is here
            </span>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
              Smart Tech.
              <br />
              <span className="gradient-text">Minimal Design.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Beautifully engineered devices that blend into your life. Built to last, designed to delight.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/phones"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium"
              >
                Shop Phones <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/accessories"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium border border-border bg-background hover:bg-muted transition-colors"
              >
                Explore Accessories
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
              <div>
                <p className="text-2xl font-semibold text-foreground">2M+</p>
                <p>Happy customers</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="text-2xl font-semibold text-foreground">4.9★</p>
                <p>Average rating</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="text-2xl font-semibold text-foreground">120+</p>
                <p>Countries</p>
              </div>
            </div>
          </div>

          <div className="relative h-[420px] sm:h-[560px] lg:h-[640px]">
            <div className="absolute inset-0 -m-10 bg-[image:var(--gradient-primary)] opacity-20 blur-3xl rounded-full animate-glow" />
            <img
              src={heroPhone}
              alt="Blue Apple Pro smartphone"
              width={1024}
              height={1024}
              className="relative h-full w-full object-contain animate-float drop-shadow-[0_40px_80px_rgba(10,132,255,0.45)]"
            />
            <div className="absolute top-10 -left-2 sm:left-6 glass rounded-2xl px-4 py-3 shadow-elevated animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <p className="text-xs text-muted-foreground">Battery</p>
              <p className="text-sm font-semibold">29h video playback</p>
            </div>
            <div className="absolute bottom-16 -right-2 sm:right-4 glass rounded-2xl px-4 py-3 shadow-elevated animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <p className="text-xs text-muted-foreground">Chip</p>
              <p className="text-sm font-semibold">BA-A18 Bionic</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold">Shop by category</h2>
            <p className="text-muted-foreground mt-2">Find what you love.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to="/accessories"
              className="group rounded-3xl border border-border bg-card p-6 text-center hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="size-14 mx-auto rounded-2xl bg-[image:var(--gradient-primary)] grid place-items-center text-2xl shadow-glow group-hover:scale-110 transition-transform">
                <span className="grayscale-0">{c.icon}</span>
              </div>
              <p className="mt-4 text-sm font-medium">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold">Featured products</h2>
            <p className="text-muted-foreground mt-2">Hand-picked for you.</p>
          </div>
          <Link to="/phones" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* DEAL BANNER */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-accent text-accent-foreground p-10 lg:p-16">
          <div className="absolute -top-24 -right-24 size-96 rounded-full bg-[image:var(--gradient-primary)] opacity-40 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest opacity-70">Limited Time</p>
              <h3 className="mt-3 text-4xl lg:text-5xl font-semibold leading-tight">
                Up to 30% off accessories.
              </h3>
              <p className="mt-4 opacity-80 max-w-md">
                Bundle your favorite chargers, cases and earbuds for unbeatable savings.
              </p>
              <Link to="/deals" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background text-foreground font-medium hover:opacity-90 transition">
                Shop deals <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Free shipping", value: "Worldwide" },
                { label: "30 days", value: "Easy returns" },
                { label: "2 year", value: "Warranty" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/5 backdrop-blur p-5 border border-white/10">
                  <p className="text-xl font-semibold">{s.label}</p>
                  <p className="text-xs opacity-70 mt-1">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold">Loved by millions</h2>
          <p className="text-muted-foreground mt-3">Real words from real people.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Maya K.", role: "Designer", quote: "The cleanest tech experience I've ever owned. The Pro feels like the future." },
            { name: "Daniel R.", role: "Engineer", quote: "Buds Air Pro changed my commute. The ANC is unreal at this price." },
            { name: "Aisha N.", role: "Photographer", quote: "Watch Edge keeps up with everything. The battery life is incredible." },
          ].map((t) => (
            <div key={t.name} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <div className="flex gap-0.5 text-primary mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              </div>
              <p className="text-foreground/90 leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-10 rounded-full bg-[image:var(--gradient-primary)]" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { Icon: Truck, title: "Free shipping", desc: "On orders over $50" },
            { Icon: ShieldCheck, title: "2-year warranty", desc: "Premium protection" },
            { Icon: Headphones, title: "24/7 support", desc: "We're always here" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6">
              <div className="size-12 grid place-items-center rounded-xl bg-primary/10 text-primary">
                <f.Icon className="size-5" />
              </div>
              <div>
                <p className="font-semibold">{f.title}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="rounded-[2rem] hero-bg border border-border p-10 lg:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold">Stay in the loop</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Be first to know about new launches, exclusive deals and stories.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-5 py-3 rounded-full bg-background border border-border outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="btn-primary px-6 py-3 rounded-full font-medium">Subscribe</button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
