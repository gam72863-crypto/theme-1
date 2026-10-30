import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Download, Headphones, Phone, RefreshCw, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import { Page, Stagger, item } from "@/components/Page";
import { ThemeGrid } from "@/components/ThemeGrid";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A One Enterprises — Premium Shopify & WooCommerce Themes" },
      { name: "description", content: "Buy premium Shopify and WooCommerce themes ready to upload. Custom websites on request." },
      { property: "og:title", content: "A One Enterprises — Premium Themes" },
      { property: "og:description", content: "Premium Shopify and WooCommerce themes, ready to upload." },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { icon: Download, title: "Instant download", text: "Get your files right after payment." },
  { icon: ShieldCheck, title: "Secure checkout", text: "Simple, trusted payment process." },
  { icon: Sparkles, title: "Premium themes", text: "Carefully crafted, conversion-focused." },
  { icon: RefreshCw, title: "Lifetime updates", text: "Stay current with every release." },
  { icon: Headphones, title: "Fast support", text: "Real help via phone & WhatsApp." },
  { icon: Smartphone, title: "100% responsive", text: "Pixel-perfect on every device." },
];

function Home() {
  return (
    <Page>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-gold/20 blob" />
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-gold/10 blob" style={{ animationDelay: "-5s" }} />
        <Stagger className="relative mx-auto max-w-6xl px-6 pb-20 pt-10">
          <motion.p variants={item} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Digital theme store
          </motion.p>
          <motion.h1 variants={item} className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] md:text-7xl">
            Premium Shopify &amp; WooCommerce Themes.{" "}
            <span className="text-gradient-gold">Ready to Upload.</span>
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Browse and buy high-quality themes for your online store. Need a custom website? Contact{" "}
            <a href={PHONE_TEL} className="text-gold">{PHONE_DISPLAY}</a>.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <Link to="/themes" className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 font-semibold text-gold-foreground shadow-glow transition hover:scale-[1.03]">
              Browse Themes <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/custom-web" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 transition hover:bg-secondary">
              <Phone className="h-4 w-4" /> Custom Website →
            </Link>
          </motion.div>
        </Stagger>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Stagger className="mb-8 flex items-end justify-between">
          <motion.h2 variants={item} className="text-3xl font-semibold">Latest themes</motion.h2>
          <motion.div variants={item}>
            <Link to="/themes" className="text-sm text-gold">View all →</Link>
          </motion.div>
        </Stagger>
        <ThemeGrid limit={3} />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Stagger>
          <motion.h2 variants={item} className="text-3xl font-semibold">Why choose us</motion.h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <motion.div key={f.title} variants={item} whileHover={{ y: -4 }} className="rounded-2xl border border-border bg-card p-6">
                <f.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </Stagger>
      </section>
    </Page>
  );
}
