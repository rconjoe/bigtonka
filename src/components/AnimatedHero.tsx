"use client";

import { useState, useEffect } from "react";
import { BackgroundMedia } from "./cult/BackgroundMedia";
import HeroTitle from "./HeroTitle";
import LinkRow from "./LinkRow";
import LinkTree from "./LinkTree";
import SponsorShowcase from "./SponsorShowcase";
import MediaShowcase from "./MediaShowcase";
import MerchStore from "./MerchStore";
import CartView from "./CartView"; // <-- Import the new CartView component
import { ClerkProvider } from "@clerk/clerk-react";
import { CartProvider } from "../context/CartContext"; // <-- Import the provider
import Footer from "./Footer";

const CLERK_PUB_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const AnimatedHero = () => {
  const [animationKey, setAnimationKey] = useState(0);
  const [currentView, setCurrentView] = useState("home");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationKey((prevKey) => prevKey + 1);
    }, 8000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ClerkProvider publishableKey={CLERK_PUB_KEY}>
      <CartProvider>
        <BackgroundMedia
          type="video"
          src="https://img.bigtonk.com/intro-high.mp4"
          variant="dark"
        >
          <div className="flex flex-col items-center justify-start w-full pt-6 md:pt-10 pb-12 min-h-screen">
            {" "}
            {/* Added min-h-screen */}
            <HeroTitle
              animationKey={animationKey}
              setCurrentView={setCurrentView}
            />
            <LinkRow
              setCurrentView={setCurrentView}
              currentView={currentView}
            />
            {/* Conditional rendering based on currentView */}
            {currentView === "home" && <LinkTree />}
            {currentView === "sponsors" && <SponsorShowcase />}
            {currentView === "media" && <MediaShowcase />}
            {currentView === "merch" && <MerchStore />}
            {currentView === "cart" && <CartView />} {/* <-- Add Cart View */}
            <Footer />
          </div>
        </BackgroundMedia>
      </CartProvider>
    </ClerkProvider>
  );
};

export default AnimatedHero;
