import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/phones", label: "Phones" },
  { to: "/accessories", label: "Accessories" },
  { to: "/deals", label: "Deals" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <span className="size-7 rounded-xl bg-[image:var(--gradient-primary)] shadow-glow grid place-items-center text-primary-foreground text-xs font-bold">
            B
          </span>
          <span>Blue Apple</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground font-medium" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button className="hidden sm:grid size-10 place-items-center rounded-full hover:bg-muted transition-colors" aria-label="Search">
            <Search className="size-[18px]" />
          </button>
          <Link
            to="/cart"
            className="size-10 grid place-items-center rounded-full hover:bg-muted transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingBag className="size-[18px]" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
          </Link>
          <button className="hidden sm:grid size-10 place-items-center rounded-full hover:bg-muted transition-colors" aria-label="Account">
            <User className="size-[18px]" />
          </button>
          <button
            className="md:hidden size-10 grid place-items-center rounded-full hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden glass border-t border-border animate-fade-in">
          <ul className="px-6 py-4 space-y-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
