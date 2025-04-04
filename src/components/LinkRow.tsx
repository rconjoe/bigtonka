"use client"

import React from "react"
import { motion } from "framer-motion"
import { FaYoutube, FaInstagram } from "react-icons/fa"

const LinkRow = ({ setCurrentView, currentView }) => {
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

  // Define menu links with view values (removed HOME)
  const menuLinks = [
    { text: "SPONSORS", href: "#sponsors", view: "sponsors" },
    { text: "MEDIA", href: "#media", view: "media" },
    { text: "MERCH", href: "#merch", view: "merch" },
  ]

  // Define social media links
  const socialLinks = [
    { icon: <FaYoutube size={24} />, href: "https://youtube.com" },
    { icon: <FaInstagram size={24} />, href: "https://instagram.com" },
  ]

  // Handle link click
  const handleLinkClick = (e, view) => {
    e.preventDefault()
    setCurrentView(view)
  }

  return (
    <motion.nav
      className="flex items-center justify-between w-full max-w-4xl px-4 mt-8"
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
            onClick={(e) => handleLinkClick(e, link.view)}
            variants={menuItemVariants}
            className={`text-white md:text-2xl font-medium tracking-wider hover:text-red-400 transition-colors duration-300 text-shadow ${currentView === link.view ? "text-red-400" : ""
              }`}
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

