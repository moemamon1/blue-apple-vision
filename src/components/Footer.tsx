import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-20 sm:mt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-12 sm:py-16 grid gap-10 sm:gap-12 grid-cols-2 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <span className="size-7 rounded-xl bg-[image:var(--gradient-primary)] grid place-items-center text-primary-foreground text-xs font-bold">B</span>
            Blue Apple
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Sudan's trusted source for genuine iPhones. Imported, verified, and delivered since 2021.
          </p>
          <div className="flex gap-2 mt-6">
            <a href="#" className="size-9 grid place-items-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
              <Instagram className="size-4" />
            </a>
          </div>
        </div>

        {([
          { title: "Shop", links: [{ label: "Phones", to: "/phones" }, { label: "Everyday Use", to: "/accessories" }] },
          { title: "Company", links: [{ label: "About", to: "/about" }, { label: "Contact", to: "/contact" }] },
          { title: "Support", links: [{ label: "Returns", to: "/contact" }, { label: "Warranty", to: "/contact" }, { label: "Track Order", to: "/contact" }] },
        ] as const).map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
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
          <p>© {new Date().getFullYear()} Blue Apple. All rights reserved.</p>
          <p>Imported to Sudan. Trusted since 2021.</p>
        </div>
      </div>
    </footer>
  );
}
