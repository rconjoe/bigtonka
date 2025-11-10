import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { BackgroundMedia } from "./cult/BackgroundMedia";
import HeroTitle from "./HeroTitle";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const stripe_key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(stripe_key);
const routeApi = getRouteApi("/checkout");

export function Checkout() {
  // Only extract clientSecret, cartId is no longer needed if shipping step is removed
  const { id: clientSecret } = routeApi.useSearch();
  const navigate = useNavigate();

  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationKey((prevKey) => prevKey + 1);
    }, 8000);
    return () => clearInterval(intervalId);
  }, []);

  // If clientSecret is missing, redirect to home
  useEffect(() => {
    if (!clientSecret) {
      navigate({ to: "/" });
    }
  }, [clientSecret, navigate]);

  if (!clientSecret) {
    return null;
  }

  return (
    <BackgroundMedia
      type="video"
      src="https://img.bigtonk.com/intro-high.mp4"
      variant="dark"
    >
      <div className="flex flex-col items-center justify-start w-full pt-6 md:pt-10 pb-12 min-h-screen">
        <HeroTitle animationKey={animationKey} setCurrentView={() => null} />

        <motion.div
          className="w-full max-w-lg mx-auto px-4 mt-8 md:mt-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            key="payment-step" // Still useful for Framer Motion transitions
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20" // Added styling from former shipping step
          >
            <h2 className="text-2xl md:text-3xl font-laser mb-6 text-center">
              PAYMENT
            </h2>
            <div id="checkout">
              {clientSecret && (
                <EmbeddedCheckoutProvider
                  stripe={stripePromise}
                  options={{ clientSecret }}
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              )}
            </div>
            {/* The "GO BACK" button is removed as there's no step to go back to */}
          </motion.div>
        </motion.div>
        <Footer />
      </div>
    </BackgroundMedia>
  );
}
