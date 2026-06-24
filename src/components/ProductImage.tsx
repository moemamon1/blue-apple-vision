import { cn } from "@/lib/utils";

type ProductImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  imageClassName?: string;
  loading?: "eager" | "lazy";
};

export function ProductImage({
  src,
  alt,
  className,
  imageClassName,
  loading = "lazy",
}: ProductImageProps) {
  return (
    <div className={cn("relative overflow-hidden product-image-surface", className)}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          className={cn("relative h-full w-full object-contain", imageClassName)}
        />
      ) : (
        <div className="relative h-full w-full grid place-items-center text-muted-foreground text-xs">
          No image
        </div>
      )}
    </div>
  );
}