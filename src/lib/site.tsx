import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Currency, Theme } from "./spree";

export const PHONE_DISPLAY = "0300 760 2961";
export const PHONE_TEL = "tel:+923007602961";
export const WHATSAPP = "https://wa.me/923007602961";

export function whatsappLink(text: string) {
  return `${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function buyLink(t: Theme) {
  return whatsappLink(`Hi A One Enterprises, I want to buy the "${t.name}" ${t.platform} theme.`);
}

const CurrencyCtx = createContext<{ currency: Currency; setCurrency: (c: Currency) => void }>({
  currency: "PKR",
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("PKR");
  useEffect(() => {
    const saved = localStorage.getItem("a1-currency");
    if (saved === "USD" || saved === "PKR") setCurrencyState(saved);
  }, []);
  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("a1-currency", c);
  };
  return <CurrencyCtx.Provider value={{ currency, setCurrency }}>{children}</CurrencyCtx.Provider>;
}

export const useCurrency = () => useContext(CurrencyCtx);
