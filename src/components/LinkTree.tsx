"use client";

import { getRouteApi } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react"; // Import useState for managing component state

const LinkTree = () => {
  // State to control the visibility of lifestyle sponsors
  const [showLifestyleSponsors, setShowLifestyleSponsors] = useState(false);

  const linkTreeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.0,
      },
    },
  };

  const linkTreeItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const routeApi = getRouteApi("/");

  // Get the linkTreeButtons from loader data
  const linkTreeButtons = routeApi.useLoaderData().content.linkTreeButtons;

  // Filter the linkTreeButtons based on 'active' status and 'category'
  const filteredLinkTreeButtons = linkTreeButtons.filter((button) => {
    // Always exclude inactive buttons
    if (!button.active) {
      return false;
    }

    // Exclude buttons with 'lifestyle' category if the toggle is not checked
    if (button.category === "lifestyle" && !showLifestyleSponsors) {
      return false;
    }

    // Otherwise, include the button
    return true;
  });

  // Sort the remaining buttons by their 'order' property in ascending order
  const sortedAndFilteredLinkTreeButtons = [...filteredLinkTreeButtons].sort(
    (a, b) => a.order - b.order,
  );

  return (
    // Use a React Fragment to return multiple top-level elements
    <>
      {/* Toggle for "Show lifestyle sponsors" */}
      <div
        className="w-full pt-6 max-w-2xl lg:max-w-4xl mx-auto px-4
                   flex justify-start"
      >
        <label
          htmlFor="lifestyleToggle"
          className="flex items-center cursor-pointer"
        >
          <span
            className="mr-2 text-white/80 text-sm md:text-md
                       font-tektur"
          >
            Show lifestyle sponsors
          </span>
          <div className="relative">
            <input
              type="checkbox"
              id="lifestyleToggle"
              className="sr-only" // Visually hide the native checkbox
              checked={showLifestyleSponsors}
              onChange={(e) => setShowLifestyleSponsors(e.target.checked)}
            />
            {/* Custom toggle switch UI */}
            <div
              className={`block w-8 h-5 rounded-full transition-colors
                          duration-300 ${
                            showLifestyleSponsors
                              ? "bg-blue-800"
                              : "bg-gray-600"
                          }`}
            ></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-3 h-3
                          rounded-full transition-transform duration-300 ${
                            showLifestyleSponsors
                              ? "translate-x-full"
                              : "translate-x-0"
                          }`}
            ></div>
          </div>
        </label>
      </div>

      {/* Main Link Tree Buttons Container */}
      <motion.div
        className="w-full max-w-2xl lg:max-w-4xl mx-auto px-4
                   mt-8 flex flex-col space-y-3"
        variants={linkTreeVariants}
        initial="hidden"
        animate="visible"
      >
        {sortedAndFilteredLinkTreeButtons.map((button) => (
          <motion.a
            key={button.id} // Use button.id as key for better stability
            href={button.href}
            variants={linkTreeItemVariants}
            className="flex items-center justify-between w-full p-4 rounded-lg
              backdrop-blur-sm bg-white/10 hover:bg-white/20
              border border-white/20 transition-all duration-300 group relative
              overflow-hidden font-tektur"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background image (if provided) - uncomment if needed */}
            {/* {button.image && (
              <div className="absolute inset-0 z-0">
                <img
                  src={button.image}
                  alt=""
                  className="w-full h-full object-cover filter opacity-40"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            )} */}

            {/* Content */}
            <div className="flex flex-col relative z-10">
              <span className="text-white font-semibold text-lg md:text-xl">
                {button.text}
              </span>
              <span className="text-white/80 text-sm md:text-base">
                {button.description}
              </span>
            </div>
            <FaArrowRight
              className="text-white opacity-60 group-hover:opacity-100
              group-hover:translate-x-1 transition-all duration-300 relative z-10"
            />
          </motion.a>
        ))}
      </motion.div>
    </>
  );
};

export default LinkTree;
