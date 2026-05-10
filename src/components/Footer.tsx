import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <span className="size-7 rounded-xl bg-[image:var(--gradient-primary)] grid place-items-center text-primary-foreground text-xs font-bold">B</span>
            Blue Apple
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Smart Tech. Minimal Design. Premium devices crafted for the way you live.
          </p>
          <div className="flex gap-2 mt-6">
            {[Instagram, Twitter, Youtube, Github].map((Icon, i) => (
              <a key={i} href="#" className="size-9 grid place-items-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Shop", links: ["Phones", "Earbuds", "Watches", "Chargers", "Cases"] },
          { title: "Company", links: ["About", "Press", "Careers", "Sustainability"] },
          { title: "Support", links: ["Contact", "Returns", "Warranty", "Track Order"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
          <p>© {new Date().getFullYear()} Blue Apple Inc. All rights reserved.</p>
          <p>Designed in California. Built for the world.</p>
        </div>
      </div>
    </footer>
  );
}
