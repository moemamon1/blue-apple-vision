import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();
  const cols = [
    {
      title: t("footer.shop"),
      links: [
        { label: t("nav.phones"), to: "/phones" as const },
        { label: t("nav.accessories"), to: "/accessories" as const },
        { label: t("nav.everyday"), to: "/everyday-essentials" as const },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("nav.about"), to: "/about" as const },
        { label: t("nav.contact"), to: "/contact" as const },
      ],
    },
    {
      title: t("footer.support"),
      links: [
        { label: t("footer.returns"), to: "/contact" as const },
        { label: t("footer.warranty"), to: "/contact" as const },
        { label: t("footer.track"), to: "/contact" as const },
      ],
    },
  ];

  return (
    <footer className="border-t border-border mt-20 sm:mt-32 bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-12 sm:py-16 grid gap-10 sm:gap-12 grid-cols-2 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="size-8 grid place-items-center border border-primary text-primary text-[11px] font-bold font-mono">BA</span>
            <span className="font-serif text-lg font-bold">Blue Apple</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            {t("footer.tagline")}
          </p>
          <div className="flex gap-2 mt-6">
            <a href="#" className="size-9 grid place-items-center border border-border hover:border-primary hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="size-4" />
            </a>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.22em] text-accent mb-4">{col.title}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-foreground transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Blue Apple. {t("footer.rights")}</p>
          <p>{t("footer.imported")}</p>
        </div>
      </div>
    </footer>
  );
}
