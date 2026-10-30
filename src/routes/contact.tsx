import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, Send } from "lucide-react";
import { useState } from "react";
import { Page, PageHeader, Stagger, item } from "@/components/Page";
import { PHONE_DISPLAY, PHONE_TEL, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — A One Enterprises" },
      { name: "description", content: "Questions about a theme or custom website? Message A One Enterprises on WhatsApp." },
      { property: "og:title", content: "Contact — A One Enterprises" },
      { property: "og:description", content: "Message A One Enterprises on WhatsApp." },
    ],
  }),
  component: Contact,
});

const field = "w-full rounded-xl border border-input bg-secondary px-4 py-3 text-sm outline-none transition focus:border-ring";

function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  return (
    <Page>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        text="Questions about a theme or a custom website? Send a message — it opens directly in WhatsApp."
      />
      <Stagger className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-5">
        <motion.form
          variants={item}
          onSubmit={(e) => {
            e.preventDefault();
            window.open(whatsappLink(`Name: ${f.name}\nEmail: ${f.email}\n\n${f.message}`), "_blank");
          }}
          className="space-y-4 rounded-3xl border border-border bg-card p-8 md:col-span-3"
        >
          <input required placeholder="Name" className={field} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <input required type="email" placeholder="Email" className={field} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <textarea required rows={5} placeholder="Message" className={field} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3 font-semibold text-gold-foreground transition hover:scale-[1.03]">
            <Send className="h-4 w-4" /> Send via WhatsApp
          </button>
        </motion.form>
        <motion.div variants={item} className="flex flex-col justify-center rounded-3xl border border-border bg-card p-8 md:col-span-2">
          <p className="text-sm text-muted-foreground">Call or WhatsApp</p>
          <a href={PHONE_TEL} className="mt-2 flex items-center gap-2 font-display text-2xl font-semibold">
            <Phone className="h-5 w-5 text-gold" /> {PHONE_DISPLAY}
          </a>
        </motion.div>
      </Stagger>
    </Page>
  );
}
