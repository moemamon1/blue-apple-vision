import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/products";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories — Blue Apple" },
      { name: "description", content: "Earbuds, watches, chargers, cases and gaming accessories." },
      { property: "og:title", content: "Accessories — Blue Apple" },
      { property: "og:description", content: "Premium accessories from Blue Apple." },
    ],
  }),
  component: AccessoriesPage,
});

function AccessoriesPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24 hero-bg">
        <p className="text-sm uppercase tracking-widest text-primary">Accessories</p>
        <h1 className="mt-3 text-5xl lg:text-6xl font-semibold tracking-tight">
          Designed to <span className="gradient-text">complete it.</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          Earbuds, watches, chargers and more. Crafted to work seamlessly together.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <Link key={c.slug} to="/accessories" className="px-4 py-2 rounded-full border border-border text-sm hover:bg-muted transition">
              {c.icon} {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.filter(p => p.category !== "Smartphones").concat(products).map((p, i) => (
            <ProductCard key={p.id + i} product={p} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
