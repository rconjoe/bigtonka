import { createFileRoute } from "@tanstack/react-router";
import AnimatedHero from "@/components/AnimatedHero";
import getAll from "@/lib/api";

export const Route = createFileRoute("/")({
  component: App,

  // make this function a thing
  loader: () => getAll(),
});

function App() {
  return <AnimatedHero />;
}
