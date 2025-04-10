import { createFileRoute } from "@tanstack/react-router";
import AnimatedHero from "@/components/AnimatedHero";
import linktree from "@/lib/api/linktree";

export const Route = createFileRoute("/")({
  component: App,

  // make this function a thing
  loader: () => linktree(),
});

function App() {
  return <AnimatedHero />;
}
