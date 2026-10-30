import { describe, expect, it } from "vitest";
import { formatPrice, mapProduct, priceIn } from "@/lib/spree";

describe("Spree product mapping", () => {
  it("tags a product as Shopify from its tags", () => {
    expect(mapProduct({ id: 1, name: "Nova", tags: ["Shopify"] }).platform).toBe("Shopify");
  });
  it("tags a product as WooCommerce from its category", () => {
    expect(mapProduct({ id: 2, name: "Leaf", taxons: [{ name: "WooCommerce" }] }).platform).toBe("WooCommerce");
  });
  it("converts PKR to USD at 280 when no USD price exists", () => {
    const t = mapProduct({ id: 3, name: "X", price: { amount: "2800", currency: "PKR" } });
    expect(priceIn(t, "USD")).toBe(10);
  });
  it("shows zero price as Free", () => {
    expect(formatPrice(0, "PKR")).toBe("Free");
  });
});
