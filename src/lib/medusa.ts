import Medusa from "@medusajs/js-sdk";

let MEDUSA_BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL;
let MEDUSA_PUBLISHABLE_KEY = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY;

export const medusa = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: import.meta.env.MODE === "development",
  publishableKey: MEDUSA_PUBLISHABLE_KEY,
});
