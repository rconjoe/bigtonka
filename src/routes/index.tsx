import { createFileRoute } from "@tanstack/react-router";
import AnimatedHero from "@/components/AnimatedHero";
import { sdk } from "@/lib/sdk";

export const Route = createFileRoute("/")({
  component: App,

  loader: async () => {
    const videos = await sdk.client.fetch("/youtube");
    const links = await sdk.client.fetch("/linktree/linkrow");

    return {
      links,
      videos,
    };
  },
});

function App() {
  return <AnimatedHero />;
}
