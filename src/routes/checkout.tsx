import CheckoutFlow from "@/components/CheckoutFlow";
import { BackgroundMedia } from "@/components/cult/BackgroundMedia";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <CartProvider>
      <BackgroundMedia
        type="video"
        src="https://img.bigtonk.com/intro-high.mp4"
        variant="dark"
      >
        <div className="flex flex-col items-center justify-start w-full pt-6 md:pt-10 pb-12 min-h-screen">
          {" "}
          <CheckoutFlow />
          <Footer />
        </div>
      </BackgroundMedia>
    </CartProvider>
  );
}
