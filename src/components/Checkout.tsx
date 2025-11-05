import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { getRouteApi } from "@tanstack/react-router";
import { BackgroundMedia } from "./cult/BackgroundMedia";
import HeroTitle from "./HeroTitle";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const stripe_key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(stripe_key);
const routeApi = getRouteApi("/checkout");

export function Checkout() {
  const { id } = routeApi.useSearch();

  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationKey((prevKey) => prevKey + 1);
    }, 8000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <BackgroundMedia
      type="video"
      src="https://img.bigtonk.com/intro-high.mp4"
      variant="dark"
    >
      <div className="flex flex-col items-center justify-start w-full pt-6 md:pt-10 pb-12 min-h-screen">
        {" "}
        {/* Added min-h-screen */}
        <HeroTitle animationKey={animationKey} setCurrentView={() => null} />
        <div id="checkout">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret: id }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
        <Footer />
      </div>
    </BackgroundMedia>
  );
}
