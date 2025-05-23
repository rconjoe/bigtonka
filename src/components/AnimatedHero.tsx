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
import { CartProvider } from "../context/CartContext"; // <-- Import the provider

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
    // Wrap the relevant part (or whole component) with CartProvider
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
          <LinkRow setCurrentView={setCurrentView} currentView={currentView} />
          {/* Conditional rendering based on currentView */}
          {currentView === "home" && <LinkTree />}
          {currentView === "sponsors" && <SponsorShowcase />}
          {currentView === "media" && <MediaShowcase />}
          {currentView === "merch" && <MerchStore />}
          {currentView === "cart" && <CartView />} {/* <-- Add Cart View */}
        </div>
      </BackgroundMedia>
    </CartProvider>
  );
};

export default AnimatedHero;
