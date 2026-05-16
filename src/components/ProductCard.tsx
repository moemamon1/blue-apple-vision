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
          className="relative h-full w-full object-contain p-5 sm:p-8 transition-transform duration-700 group-hover:scale-110"
        />
        {product.originalPrice && (
          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[10px] sm:text-xs font-medium">
            Save ${product.originalPrice - product.price}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-6">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
        <h3 className="mt-1 font-semibold text-sm sm:text-lg line-clamp-1">{product.name}</h3>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-primary text-primary" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span className="hidden sm:inline">({product.reviews})</span>
        </div>
        <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-base sm:text-xl font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={(e) => e.preventDefault()}
            className="shrink-0 size-9 sm:size-10 grid place-items-center rounded-full bg-foreground text-background transition-all duration-300 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
            aria-label="Add to cart"
          >
            <ShoppingBag className="size-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
