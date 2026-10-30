import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, PackageOpen, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { formatPrice, priceIn, type Theme } from "@/lib/spree";
import { getThemes } from "@/lib/themes.functions";
import { buyLink, useCurrency } from "@/lib/site";

const FILTERS = ["All", "Shopify", "WooCommerce", "Free", "Premium"] as const;
type Filter = (typeof FILTERS)[number];

function matches(t: Theme, f: Filter, price: number) {
  if (f === "All") return true;
  if (f === "Free") return price <= 0;
  if (f === "Premium") return price > 0;
  return t.platform === f;
}

function ThemeCard({ t }: { t: Theme }) {
  const { currency } = useCurrency();
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-muted" />}
        {t.image && (
          <img
            src={t.image}
            alt={t.name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${loaded ? "blur-0" : "blur-md"}`}
          />
        )}
        {t.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-gold px-3 py-1 text-xs font-semibold text-gold-foreground">
            {t.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="rounded-full border border-border px-2.5 py-0.5">{t.platform}</span>
          {t.version && <span>v{t.version}</span>}
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold">{t.name}</h3>
          <span className="font-display font-semibold text-gold">
            {formatPrice(priceIn(t, currency), currency)}
          </span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={t.previewUrl ?? `https://spree.sh/products/${t.slug}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-sm transition hover:bg-secondary"
          >
            <ExternalLink className="h-4 w-4" /> Live Preview
          </a>
          <a
            href={buyLink(t)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:scale-[1.03]"
          >
            <ShoppingBag className="h-4 w-4" /> Buy Now
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function ThemeGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<Filter>("All");
  const { currency } = useCurrency();
  const { data, isPending, isError } = useQuery({
    queryKey: ["spree", "themes"],
    queryFn: () => getThemes(),
    staleTime: 60_000,
  });
  const list = (data ?? []).filter((t) => matches(t, filter, priceIn(t, currency))).slice(0, limit);

  return (
    <div>
      {!limit && (
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="relative rounded-full border border-border px-4 py-2 text-sm"
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative ${filter === f ? "font-semibold text-gold-foreground" : "text-muted-foreground"}`}>
                {f}
              </span>
            </button>
          ))}
        </div>
      )}
      {isPending ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit ?? 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-20 text-center"
        >
          <PackageOpen className="h-10 w-10 text-gold" />
          <h3 className="mt-4 text-xl font-semibold">
            {isError ? "Couldn't load themes" : "Themes coming soon"}
          </h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {isError
              ? "The store is temporarily unreachable. Please try again shortly."
              : "New Shopify & WooCommerce themes are being added. Check back shortly."}
          </p>
        </motion.div>
      ) : (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((t) => (
              <ThemeCard key={t.id} t={t} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Instant download link delivered via email or WhatsApp after payment.
      </p>
    </div>
  );
}
