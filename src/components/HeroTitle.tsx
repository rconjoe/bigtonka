"use client";

import { motion } from "framer-motion";
import type { Key } from "react";

type HeroTitleProps = {
  animationKey: Key | null | undefined;
  setCurrentView: (view: string) => void;
};

const HeroTitle = ({ animationKey, setCurrentView }: HeroTitleProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: "easeOut" },
    },
  };

  // Define words with their colors
  const words = [
    { text: "WHAT'S", color: "text-red-600/75" },
    { text: "GOOD", color: "text-white/75" },
    { text: "AMERICA", color: "text-blue-600/75" },
  ];

  // Handle click to navigate to home
  const handleTitleClick = () => {
    setCurrentView("home");
  };

  return (
    <motion.div
      key={animationKey}
      className="text-5xl md:text-8xl font-bold tracking-wide flex flex-wrap justify-center gap-x-8 gap-y-1 cursor-pointer"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onClick={handleTitleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className={`${word.color} text-shadow font-laser`}
        >
          {word.text}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default HeroTitle;
