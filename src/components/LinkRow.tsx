"use client"

import React from "react"
import { motion } from "framer-motion"
import { FaYoutube, FaInstagram } from "react-icons/fa"

const LinkRow = () => {
  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  // Define menu links - easy to add or remove
  const menuLinks = [
    { text: "MERCH", href: "/merch" },
    { text: "SPONSORS", href: "/sponsors" },
    { text: "MEDIA", href: "/media" },
    // You can add more links here and they'll automatically be spaced evenly
  ]

  // Define social media links
  const socialLinks = [
    { icon: <FaYoutube size={24} />, href: "https://youtube.com" },
    { icon: <FaInstagram size={24} />, href: "https://instagram.com" },
  ]

  return (
    <motion.nav
      className="flex items-center justify-between w-full max-w-4xl px-4 mt-6"
      variants={menuContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Create a container that will evenly space all items */}
      <div className="w-full flex items-center justify-between">
        {/* Regular menu links */}
        {menuLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            variants={menuItemVariants}
            className="text-white md:text-2xl font-medium tracking-wider hover:text-red-400 transition-colors duration-300 text-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {link.text}
          </motion.a>
        ))}

        {/* Social media links as a group */}
        <motion.div
          className="flex items-center space-x-4"
          variants={menuItemVariants}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-400 transition-colors duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default LinkRow
