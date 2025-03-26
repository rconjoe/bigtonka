"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BackgroundMedia } from "./cult/BackgroundMedia"
import { FaYoutube, FaInstagram } from "react-icons/fa" // Make sure to install react-icons

const AnimatedHero = () => {
  // Add a state to track animation cycles for the main text only
  const [animationKey, setAnimationKey] = useState(0)

  // Set up interval to reset animation every 8 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationKey(prevKey => prevKey + 1)
    }, 8000)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

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

  // Define words with their colors
  const words = [
    { text: "WHAT'S", color: "text-red-600/75" },
    { text: "GOOD", color: "text-white/75" },
    { text: "AMERICA", color: "text-blue-600/75" },
  ]

  // Define menu links - easy to add or remove
  const menuLinks = [
    { text: "MERCH", href: "/merch" },
    { text: "SPONSORS", href: "/sponsors" },
    // You can add more links here and they'll automatically be spaced evenly
  ]

  // Define social media links
  const socialLinks = [
    { icon: <FaYoutube size={24} />, href: "https://youtube.com" },
    { icon: <FaInstagram size={24} />, href: "https://instagram.com" },
  ]

  return (
    <BackgroundMedia
      type="video"
      src="http://console-production-05bc.up.railway.app/api/v1/download-shared-object/aHR0cDovL2J1Y2tldC5yYWlsd2F5LmludGVybmFsOjkwMDAvdHctcHViLTEvU2NyZWVuX1JlY29yZGluZ18yMDI1MDMyNV8xMjQzMzdfWW91VHViZS5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1KNFVDVzVQTUJYQ0RIRklBUU1SSiUyRjIwMjUwMzI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMyNVQyMDA1MTBaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUpLTkZWRFZ6VlFUVUpZUTBSSVJrbEJVVTFTU2lJc0ltVjRjQ0k2TVRjME1qazNOVGt6TWl3aWNHRnlaVzUwSWpvaWRVcDNhREZhV0RKdmN6Vk1NbWgzZWxrM09ITTBRek51VG01eVJubENWemdpZlEuR2NKQmF2Vm5qeXNnR1ZwVlJfUnRjLUowZ3N5dE5FMlBWbkY5aENhdHN4aGpHM2dpdkR0OUl5NWJBLWxxTUxqNW5HamJUbmtiV1NPQVNUWDlmNlc1cVEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT0xOGEyYjc2MWI3MzQ2MTEzZjhmMzRhNjk5Y2ExZGZhNjFhZTEzYjVmYmRiYzY3YmY4YzI5YmMxYWZjNmE4NGMw"
      variant="dark"
    >
      <div className="flex flex-col items-center justify-start h-full w-full pt-16 md:pt-20">
        {/* Main text - animates every 8 seconds */}
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

        {/* Menu links - animate once on load */}
        <motion.nav
          className="flex items-center justify-between w-full max-w-4xl px-4 mt-8 md:mt-12"
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
                className="text-white text-xl md:text-2xl font-medium tracking-wider hover:text-red-400 transition-colors duration-300 text-shadow"
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
      </div>
    </BackgroundMedia>
  )
}

export default AnimatedHero
