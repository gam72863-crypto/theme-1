// Spree Commerce Store API v3 client. The publishable key is safe for browser use.
export const SPREE_URL = "https://spree.sh";
export const SPREE_KEY = "pk_Mzcj8rDNZwrUWgvSeCcevY1c";

export type Platform = "Shopify" | "WooCommerce" | "Other";

export type Theme = {
  id: string;
  name: string;
  slug: string;
  image?: string | undefined;
  platform: Platform;
  version?: string | undefined;
  badge?: string | undefined;
  /** price amounts keyed by currency code, e.g. { PKR: 4500, USD: 16 } */
  prices: Record<string, number>;
  previewUrl?: string | undefined;
};

/**
 * Spree payloads are loose: every field is optional and extra ones show up
 * depending on the store's setup. The fields we read are declared so the
 * index signature stays opt-in.
 */
interface Any {
  [key: string]: any;
  id?: any;
  name?: any;
  slug?: any;
  price?: any;
  currency?: any;
  prices?: any;
  variants?: any;
  default_variant?: any;
  tags?: any;
  taxons?: any;
  categories?: any;
  metadata?: any;
  public_metadata?: any;
  custom_fields?: any;
  product_properties?: any;
  properties?: any;
  media?: any;
  images?: any;
  thumbnail_url?: any;
  amount?: any;
  currency_code?: any;
  is_master?: any;
  pretty_name?: any;
  key?: any;
  value?: any;
  property_name?: any;
  large_url?: any;
  original_url?: any;
  url?: any;
  medium_url?: any;
}

function num(v: unknown): number | undefined {
  const n = typeof v === "string" ? parseFloat(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) ? n : undefined;
}

function collectPrices(p: Any): Record<string, number> {
  const out: Record<string, number> = {};
  const add = (pr: Any | undefined) => {
    if (!pr || typeof pr !== "object") return;
    const amt = num(pr.amount ?? pr.price);
    const cur = pr.currency ?? pr.currency_code;
    if (amt !== undefined && cur && out[cur] === undefined) out[cur] = amt;
  };
  const variants: Any[] = p.variants ?? [];
  const master = variants.find((v) => v.is_master) ?? variants[0];
  [p, p.default_variant, master].forEach((src) => {
    if (!src) return;
    add(src.price);
    (src.prices ?? []).forEach(add);
  });
  if (Object.keys(out).length === 0) {
    const amt = num(p.price);
    if (amt !== undefined) out[p.currency ?? "PKR"] = amt;
  }
  return out;
}

function textBag(p: Any): string {
  const parts: string[] = [];
  (p.tags ?? []).forEach((t: any) => parts.push(typeof t === "string" ? t : t?.name ?? ""));
  (p.taxons ?? p.categories ?? []).forEach((t: any) => parts.push(t?.name ?? t?.pretty_name ?? ""));
  parts.push(p.name ?? "");
  return parts.join(" ").toLowerCase();
}

function metaValue(p: Any, keys: string[]): string | undefined {
  const sources: Any[] = [p.metadata, p.public_metadata, p.custom_fields].filter(Boolean);
  for (const s of sources) {
    if (Array.isArray(s)) {
      const hit = s.find((f: Any) => keys.includes(String(f.key ?? f.name ?? "").toLowerCase()));
      if (hit?.value) return String(hit.value);
    } else {
      for (const k of keys) if (s[k]) return String(s[k]);
    }
  }
  for (const pr of p.product_properties ?? p.properties ?? []) {
    const n = String(pr.property_name ?? pr.name ?? "").toLowerCase();
    if (keys.includes(n) && pr.value) return String(pr.value);
  }
  return undefined;
}

export function mapProduct(p: Any): Theme {
  const bag = textBag(p);
  const platform: Platform = bag.includes("shopify")
    ? "Shopify"
    : bag.includes("woo")
      ? "WooCommerce"
      : "Other";
  const media: Any[] = p.media ?? p.images ?? [];
  const firstMedia = media[0];
  const image =
    p.thumbnail_url ??
    firstMedia?.large_url ??
    firstMedia?.original_url ??
    firstMedia?.url ??
    firstMedia?.medium_url;
  return {
    id: String(p.id),
    name: p.name ?? "Untitled theme",
    slug: p.slug ?? String(p.id),
    image,
    platform,
    version: metaValue(p, ["version"]),
    badge: metaValue(p, ["badge"]),
    previewUrl: metaValue(p, ["preview_url", "preview", "demo_url", "demo"]),
    prices: collectPrices(p),
  };
}

export async function fetchThemes(): Promise<Theme[]> {
  const all: Theme[] = [];
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(
      `${SPREE_URL}/api/v3/store/products?expand=variants,media&limit=50&page=${page}`,
      { headers: { "X-Spree-Api-Key": SPREE_KEY, Accept: "application/json" } },
    );
    if (!res.ok) throw new Error(`Spree responded ${res.status}`);
    const json = (await res.json()) as { data?: Any[]; meta?: { pages?: number } };
    (json.data ?? []).forEach((p) => all.push(mapProduct(p)));
    if (!json.meta?.pages || page >= json.meta.pages) break;
  }
  return all;
}

export type Currency = "PKR" | "USD";
export const USD_RATE = 280; // PKR per USD when Spree has no USD price

export function priceIn(t: Theme, currency: Currency): number {
  if (t.prices[currency] !== undefined) return t.prices[currency];
  if (currency === "USD" && t.prices["PKR"] !== undefined) return t.prices["PKR"] / USD_RATE;
  if (currency === "PKR" && t.prices["USD"] !== undefined) return t.prices["USD"] * USD_RATE;
  const first = Object.values(t.prices)[0];
  return first ?? 0;
}

export function formatPrice(amount: number, currency: Currency): string {
  if (amount <= 0) return "Free";
  if (currency === "USD")
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  return `Rs ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(amount)}`;
}
