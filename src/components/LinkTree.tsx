"use client"

import React from "react"
import { motion } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"

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
  }

  const linkTreeItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  // Define LinkTree-style buttons
  const linkTreeButtons = [
    { text: "Latest Episode", href: "/latest-episode", description: "Watch our newest content" },
    { text: "Special Interviews", href: "/interviews", description: "Conversations with guests" },
    { text: "Behind the Scenes", href: "/behind-scenes", description: "See how we make the show" },
    { text: "Join Our Newsletter", href: "/newsletter", description: "Weekly updates in your inbox" },
    { text: "Upcoming Events", href: "/events", description: "See where we'll be next" },
  ]

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto px-4 mt-12 md:mt-16 flex flex-col space-y-3"
      variants={linkTreeVariants}
      initial="hidden"
      animate="visible"
    >
      {linkTreeButtons.map((button, index) => (
        <motion.a
          key={index}
          href={button.href}
          variants={linkTreeItemVariants}
          className="flex items-center justify-between w-full p-4 rounded-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 group"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg md:text-xl">
              {button.text}
            </span>
            <span className="text-white/80 text-sm md:text-base">
              {button.description}
            </span>
          </div>
          <FaArrowRight className="text-white opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </motion.a>
      ))}
    </motion.div>
  )
}

export default LinkTree
