import { Link } from "@tanstack/react-router";
import { Star, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="product-card group block rounded-3xl bg-card border border-border overflow-hidden shadow-soft"
    >
      <div className="relative aspect-square surface overflow-hidden">
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-60" />
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="relative h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
        />
        {product.originalPrice && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
            Save ${product.originalPrice - product.price}
          </span>
        )}
      </div>
      <div className="p-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
        <h3 className="mt-1 font-semibold text-lg">{product.name}</h3>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-primary text-primary" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={(e) => e.preventDefault()}
            className="size-10 grid place-items-center rounded-full bg-foreground text-background opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            aria-label="Add to cart"
          >
            <ShoppingBag className="size-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
