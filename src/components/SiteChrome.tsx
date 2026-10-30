import { Link } from "@tanstack/react-router";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP, useCurrency } from "@/lib/site";
import type { Currency } from "@/lib/spree";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/themes", label: "Themes" },
  { to: "/custom-web", label: "Custom Web" },
  { to: "/contact", label: "Contact" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-gold font-display text-sm font-bold text-gold-foreground">
        A1
      </span>
      <span className="font-display text-base font-semibold">A One Enterprises</span>
    </Link>
  );
}

export function Header() {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const { currency, setCurrency } = useCurrency();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-background/80 py-3 backdrop-blur-xl" : "py-5"}`}
    >
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute left-0 top-0 h-0.5 w-full origin-left bg-gradient-gold"
      />
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6">
        <Logo />
        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-secondary" />
                  )}
                  <span className="relative">{n.label}</span>
                </>
              )}
            </Link>
          ))}
        </div>
        <div role="radiogroup" aria-label="Currency" className="flex rounded-full border border-border p-0.5 text-xs">
          {(["PKR", "USD"] as Currency[]).map((c) => (
            <button
              key={c}
              role="radio"
              aria-checked={currency === c}
              onClick={() => setCurrency(c)}
              className={`rounded-full px-3 py-1.5 font-semibold transition ${currency === c ? "bg-gradient-gold text-gold-foreground" : "text-muted-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </nav>
      <div className="mx-auto mt-3 flex max-w-6xl gap-1 overflow-x-auto px-6 md:hidden">
        {NAV.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            activeOptions={{ exact: n.to === "/" }}
            className="rounded-full px-3 py-1.5 text-xs text-muted-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
          >
            {n.label}
          </Link>
        ))}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">
            Premium Shopify &amp; WooCommerce themes, ready to upload.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Pages</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-foreground">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Get in touch</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href={PHONE_TEL} className="hover:text-foreground">{PHONE_DISPLAY}</a></li>
            <li><a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-foreground">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} A One Enterprises · Built by A One Enterprises
      </p>
    </footer>
  );
}
