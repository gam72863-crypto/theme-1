import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/Page";
import { ThemeGrid } from "@/components/ThemeGrid";

export const Route = createFileRoute("/themes")({
  head: () => ({
    meta: [
      { title: "Themes — A One Enterprises" },
      { name: "description", content: "Shopify & WooCommerce themes ready to upload. Filter, preview live and buy in one tap." },
      { property: "og:title", content: "Themes — A One Enterprises" },
      { property: "og:description", content: "Shopify & WooCommerce themes ready to upload." },
    ],
  }),
  component: () => (
    <Page>
      <PageHeader
        eyebrow="Marketplace"
        title="Shopify & WooCommerce Themes Ready to Upload"
        text="Filter by platform or price, preview live, and buy in one tap."
      />
      <section className="mx-auto max-w-6xl px-6">
        <ThemeGrid />
      </section>
    </Page>
  ),
});
