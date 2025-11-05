import { createFileRoute } from "@tanstack/react-router";
import AnimatedHero from "@/components/AnimatedHero";
import { sdk } from "@/lib/sdk";

const region_id = "reg_01K49C2Y6MXY9ZNG0XCRCNBN1N";

export const Route = createFileRoute("/")({
  component: App,

  loader: async () => {
    const videos = await sdk.client.fetch("/youtube");
    const links = await sdk.client.fetch("/linktree/linkrow");
    const products = await sdk.store.product.list({
      fields: `*variants.calculated_price,+metadata`,
      region_id,
    });

    return {
      links,
      videos,
      products,
    };
  },
});

function App() {
  return <AnimatedHero />;
}
