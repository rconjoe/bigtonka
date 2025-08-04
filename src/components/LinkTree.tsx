"use client";

import { getRouteApi } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const LinkTree = () => {
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
  const linkTreeButtons = routeApi.useLoaderData().linkTreeButtons;

  // Sort the linkTreeButtons by their 'order' property in ascending order
  // and then filter to only include active buttons
  const sortedAndFilteredLinkTreeButtons = [...linkTreeButtons]
    .filter((button) => button.active === true) // Filter for active buttons
    .sort((a, b) => a.order - b.order);

  return (
    <motion.div
      className="w-full max-w-2xl lg:max-w-4xl mx-auto px-4 mt-8 md:mt-12 flex flex-col space-y-3"
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
          {/* Background image (if provided) */}
          {/* {button.image && ( */}
          {/*   <div className="absolute inset-0 z-0"> */}
          {/*     <img */}
          {/*       src={button.image} */}
          {/*       alt="" */}
          {/*       className="w-full h-full object-cover filter opacity-40" */}
          {/*     /> */}
          {/*     <div className="absolute inset-0 bg-black/10" /> */}
          {/*   </div> */}
          {/* )} */}

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
  );
};

export default LinkTree;
