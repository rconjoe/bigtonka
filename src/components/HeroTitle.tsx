"use client"

import React from "react"
import { motion } from "framer-motion"

const HeroTitle = ({ animationKey }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: "easeOut" },
    },
  }

  // Define words with their colors
  const words = [
    { text: "WHAT'S", color: "text-red-600/75" },
    { text: "GOOD", color: "text-white/75" },
    { text: "AMERICA", color: "text-blue-600/75" },
  ]

  return (
    <motion.div
      key={animationKey}
      className="text-5xl md:text-8xl font-bold tracking-wide flex flex-wrap justify-center gap-x-8 gap-y-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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
  )
}

export default HeroTitle
