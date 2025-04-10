"use client";

import { getRouteApi } from "@tanstack/react-router";
import { motion } from "framer-motion";

const SponsorShowcase = () => {
  const sponsorContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const sponsorItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const routeApi = getRouteApi("/");
  const sponsors = routeApi.useLoaderData().sponsors;

  // Helper function to determine grid size classes
  const getSizeClasses = (size) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "medium":
        return "md:col-span-1 md:row-span-2";
      case "small":
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 mt-8 md:mt-12"
      variants={sponsorContainerVariants}
      initial="hidden"
      animate="visible"
      key="sponsor-grid" // Force re-animation when switching views
    >
      <motion.h2
        className="text-3xl md:text-4xl text-white text-center mb-8 font-laser"
        variants={sponsorItemVariants}
      >
        OUR SPONSORS
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sponsors.map((sponsor, index) => (
          <motion.a
            key={index}
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={sponsorItemVariants}
            className={`${getSizeClasses(
              sponsor.size,
            )} flex flex-col justify-between p-6 rounded-xl bg-black/30 hover:bg-black/50 border border-white/20 transition-all duration-300 group overflow-hidden relative`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {sponsor.logo && (
              <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-35 mix-blend-overlay"
                style={{ backgroundImage: `url(${sponsor.logo})` }}
              ></div>
            )}

            <div className="flex items-center justify-center mb-4 h-16 md:h-24 relative z-10">
              {/* If you have logos, use this */}
              {sponsor.logo ? (
                //   <img
                //     src={sponsor.logo}
                //     alt={sponsor.name}
                //     className="max-h-full max-w-full object-contain"
                //   />
                <div className="text-white text-2xl md:text-3xl font-bold">
                  {sponsor.name}
                </div>
              ) : (
                <div className="text-white text-2xl md:text-3xl font-bold">
                  {sponsor.name}
                </div>
              )}
            </div>

            <div className="relative z-10">
              <h3 className="text-white text-xl md:text-2xl font-semibold font-tektur">
                {sponsor.name}
              </h3>
              <p className="text-white/80 mt-2 font-tektur">
                {sponsor.description}
              </p>
            </div>

            <div className="mt-4 text-white/60 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300 relative z-10">
              {sponsor.link || "Check it out"} →
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default SponsorShowcase;
