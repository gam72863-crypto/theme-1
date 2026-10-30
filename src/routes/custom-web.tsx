import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { Page, PageHeader, Stagger, item } from "@/components/Page";
import { PHONE_DISPLAY, PHONE_TEL, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/custom-web")({
  head: () => ({
    meta: [
      { title: "Custom Websites — A One Enterprises" },
      { name: "description", content: "Fully custom websites tailored to your business. Call or WhatsApp A One Enterprises." },
      { property: "og:title", content: "Custom Websites — A One Enterprises" },
      { property: "og:description", content: "Fully custom websites tailored to your business." },
    ],
  }),
  component: CustomWeb,
});

function CustomWeb() {
  return (
    <Page>
      <PageHeader
        eyebrow="Custom Web"
        title="Need a Custom Website?"
        text="We don't just sell themes — we also build fully custom websites tailored to your business."
      />
      <section className="mx-auto max-w-6xl px-6">
        <Stagger className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-16">
          <div className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full bg-gold/25 blob" />
          <motion.p variants={item} className="relative text-sm text-muted-foreground">Call us directly</motion.p>
          <motion.a variants={item} href={PHONE_TEL} className="relative mt-2 flex items-center gap-3 font-display text-4xl font-semibold md:text-6xl">
            <Phone className="h-8 w-8 text-gold" />
            {PHONE_DISPLAY}
          </motion.a>
          <motion.div variants={item} className="relative mt-8">
            <a
              href={whatsappLink("Hi A One Enterprises, I'd like a custom website.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 font-semibold text-gold-foreground transition hover:scale-[1.03]"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </motion.div>
          <motion.p variants={item} className="relative mt-6 text-sm text-muted-foreground">
            Custom website inquiries are handled directly via phone or WhatsApp.
          </motion.p>
        </Stagger>
      </section>
    </Page>
  );
}
