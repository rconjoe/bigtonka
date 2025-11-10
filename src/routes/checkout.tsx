import { Checkout } from "../components/Checkout";
import { createFileRoute } from "@tanstack/react-router";

type CheckoutSearch = {
  id: string;
  // cartId: string;
};

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): CheckoutSearch => {
    return {
      id: search.id as string,
      // cartId: (search.cartId as string) || "",
    };
  },
  component: Checkout,
});
