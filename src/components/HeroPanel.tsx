import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { ProductImage } from "@/components/ProductImage";

type Props = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  images: string[];
  imageAlt: string;
  reverse?: boolean;
  intervalMs?: number;
  eager?: boolean;
};

export function HeroPanel({
  eyebrow,
  title,
  highlight,
  description,
  ctaLabel,
  ctaHref,
  images,
  imageAlt,
  reverse = false,
  intervalMs = 3500,
  eager = false,
}: Props) {
  const [idx, setIdx] = useState(0);
  const count = images.length;

  useEffect(() => {
    if (count < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(t);
  }, [count, intervalMs]);

  useEffect(() => {
    if (idx >= count && count > 0) setIdx(0);
  }, [count, idx]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8 p-6 sm:p-8 md:p-12 min-h-[380px] sm:min-h-[440px]`}
      >
        <div className={reverse ? "order-2 md:order-2" : "order-2 md:order-1"}>
          <p className="text-[11px] sm:text-sm uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
            {title}{" "}
            {highlight && <span className="gradient-text-animated">{highlight}</span>}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-md">
            {description}
          </p>
          <Link
            to={ctaHref}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-opacity"
          >
            {ctaLabel}
            <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className={reverse ? "order-1 md:order-1" : "order-1 md:order-2"}>
          <div className="relative aspect-[4/3] w-full">
            {count === 0 ? (
              <ProductImage
                src={undefined}
                alt={imageAlt}
                className="absolute inset-0 rounded-2xl"
              />
            ) : (
              images.map((src, i) => (
                <div
                  key={src + i}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    i === idx ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={i !== idx}
                >
                  <ProductImage
                    src={src}
                    alt={imageAlt}
                    className="absolute inset-0 rounded-2xl"
                    loading={eager && i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))
            )}

            {count > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === idx
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
