"use client";

import { useState, useEffect } from "react";
import { BackgroundMedia } from "./cult/BackgroundMedia";
import HeroTitle from "./HeroTitle";
import LinkRow from "./LinkRow";
import LinkTree from "./LinkTree";
import SponsorShowcase from "./SponsorShowcase";
import MediaShowcase from "./MediaShowcase";
import MerchStore from "./MerchStore";

const AnimatedHero = () => {
  // State for animation cycles
  const [animationKey, setAnimationKey] = useState(0);
  // State to track current view/page
  const [currentView, setCurrentView] = useState("home");

  // Reset animation every 8 seconds
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
      <div className="flex flex-col items-center justify-start w-full pt-6 md:pt-10 pb-12">
        {/* Main title - now with setCurrentView prop */}
        <HeroTitle
          animationKey={animationKey}
          setCurrentView={setCurrentView}
        />

        {/* Navigation links with setCurrentView prop */}
        <LinkRow setCurrentView={setCurrentView} currentView={currentView} />

        {/* Conditional rendering based on currentView */}
        {currentView === "home" && <LinkTree />}
        {currentView === "sponsors" && <SponsorShowcase />}
        {currentView === "media" && <MediaShowcase />}
        {currentView === "merch" && <MerchStore />}
      </div>
    </BackgroundMedia>
  );
};

export default AnimatedHero;
