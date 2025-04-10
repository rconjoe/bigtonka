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

  // // Mock data for sponsors
  // const sponsors = [
  //   {
  //     name: "ERidePro",
  //     logo: "https://static.wixstatic.com/media/827dc9_a86b61ece2f7481aab68411613d86ce2~mv2.png/v1/crop/x_278,y_306,w_4230,h_2629/fill/w_605,h_376,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_3581%E5%89%AF%E6%9C%AC.png",
  //     description: "Premium electric rides and accessories",
  //     href: "https://eridepro.com",
  //     link: "Get a new bike today",
  //     size: "large", // For bento grid sizing
  //   },
  //   {
  //     name: "Tonka Apparel",
  //     logo: "/sponsors/tonka.png",
  //     description: "Official What's Good America clothing",
  //     href: "https://tonkaapparel.com",
  //     size: "medium",
  //   },
  //   {
  //     name: "Action Sports",
  //     logo: "/sponsors/actionsports.png",
  //     description: "Your ultimate source for extreme sports gear",
  //     href: "https://actionsports.com",
  //     size: "medium",
  //   },
  //   {
  //     name: "Energy Drinks",
  //     logo: "/sponsors/energy.png",
  //     description: "Fuel your adventures",
  //     href: "https://energydrinks.com",
  //     size: "small",
  //   },
  //   {
  //     name: "Tech Innovations",
  //     logo: "/sponsors/tech.png",
  //     description: "Cutting edge technology for modern riders",
  //     href: "https://techinnovations.com",
  //     size: "small",
  //   },
  // ];

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
            className={`${getSizeClasses(sponsor.size)} flex flex-col justify-between p-6 rounded-xl backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 group overflow-hidden`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center mb-4 h-16 md:h-24">
              {/* If you have logos, use this */}
              {sponsor.logo ? (
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-white text-2xl md:text-3xl font-bold">
                  {sponsor.name}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-white text-xl md:text-2xl font-semibold font-tektur">
                {sponsor.name}
              </h3>
              <p className="text-white/80 mt-2 font-tektur">
                {sponsor.description}
              </p>
            </div>

            <div className="mt-4 text-white/60 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
              {sponsor.link || "Check it out"} →
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default SponsorShowcase;
