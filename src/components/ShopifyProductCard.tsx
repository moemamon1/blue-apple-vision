import { Link } from "@tanstack/react-router";
import { ShoppingBag, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export function ShopifyProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;
  const variant = product.variants.edges[0]?.node;
  const addItem = useCartStore((s) => s.addItem);
  const [adding, setAdding] = useState(false);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    setAdding(true);
    try {
      await addItem({
        variantId: variant.id,
        productHandle: product.handle,
        productTitle: product.title,
        variantTitle: variant.title,
        image: image?.url ?? null,
        price: variant.price,
        quantity: 1,
      });
      toast.success(`${product.title} added to cart`);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.handle }}
      className="product-card group block rounded-3xl bg-card border border-border overflow-hidden shadow-soft"
    >
      <div className="relative aspect-square bg-white overflow-hidden">
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <filter id="whitenBg" colorInterpolationFilters="sRGB">
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.25" intercept="-0.18" />
              <feFuncG type="linear" slope="1.25" intercept="-0.18" />
              <feFuncB type="linear" slope="1.25" intercept="-0.18" />
            </feComponentTransfer>
          </filter>
        </svg>
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? product.title}
            loading="lazy"
            style={{ filter: "url(#whitenBg)" }}
            className="relative h-full w-full object-contain p-5 sm:p-8 transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="relative h-full w-full grid place-items-center text-muted-foreground text-xs">
            No image
          </div>
        )}
      </div>
      <div className="p-4 sm:p-6">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
          {product.productType || "Smartphones"}
        </p>
        <h3 className="mt-1 font-semibold text-sm sm:text-lg line-clamp-1">{product.title}</h3>
        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
          {product.description}
        </p>
        <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-base sm:text-xl font-semibold">
              {price.currencyCode === "USD" ? "$" : `${price.currencyCode} `}
              {Math.round(parseFloat(price.amount))}
            </span>
          </div>
          <button
            onClick={handleAdd}
            disabled={adding || !variant}
            className="shrink-0 size-9 sm:size-10 grid place-items-center rounded-full bg-foreground text-background transition-all duration-300 disabled:opacity-50"
            aria-label="Add to cart"
          >
            {adding ? <Loader2 className="size-4 animate-spin" /> : <ShoppingBag className="size-4" />}
          </button>
        </div>
      </div>
    </Link>
  );
}
