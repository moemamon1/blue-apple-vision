import { useEffect, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage } from "@/components/ProductImage";

export type HeroSlide = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image?: string | null;
  imageAlt: string;
};

type Props = {
  slides: HeroSlide[];
  autoPlayMs?: number;
};

export function HeroCarousel({ slides, autoPlayMs = 6000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setInterval(next, autoPlayMs);
    return () => clearInterval(t);
  }, [next, autoPlayMs, paused, count]);

  if (count === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative w-full shrink-0"
            aria-hidden={i !== index}
            aria-roledescription="slide"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8 p-6 sm:p-8 md:p-12 min-h-[380px] sm:min-h-[440px]">
              <div className="order-2 md:order-1">
                <p className="text-[11px] sm:text-sm uppercase tracking-widest text-primary">
                  {slide.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
                  {slide.title}{" "}
                  {slide.highlight && (
                    <span className="gradient-text-animated">{slide.highlight}</span>
                  )}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-md">
                  {slide.description}
                </p>
                <Link
                  to={slide.ctaHref}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-opacity"
                >
                  {slide.ctaLabel}
                  <ChevronRight className="size-4" />
                </Link>
              </div>
              <div className="order-1 md:order-2">
                <ProductImage
                  src={slide.image ?? undefined}
                  alt={slide.imageAlt}
                  className="aspect-[4/3] w-full rounded-2xl"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 size-10 grid place-items-center rounded-full glass hover:bg-background/80 transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 size-10 grid place-items-center rounded-full glass hover:bg-background/80 transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
