import { createServerFn } from "@tanstack/react-start";
import { fetchThemes } from "./spree";

// Spree doesn't send CORS headers, so products are fetched server-side.
export const getThemes = createServerFn({ method: "GET" }).handler(() => fetchThemes());
