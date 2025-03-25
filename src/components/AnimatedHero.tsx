"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BackgroundMedia } from "./cult/BackgroundMedia"

const AnimatedHero = () => {
  // Add a state to track animation cycles
  const [animationKey, setAnimationKey] = useState(0)

  // Set up interval to reset animation every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationKey(prevKey => prevKey + 1)
    }, 10000)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: "easeOut" },
    },
  }

  // Define words with their colors
  const words = [
    { text: "WHAT'S", color: "text-red-600" },
    { text: "GOOD", color: "text-white" },
    { text: "AMERICA", color: "text-blue-600" },
  ]

  return (
    <BackgroundMedia
      type="video"
      src="http://console-production-05bc.up.railway.app/api/v1/download-shared-object/aHR0cDovL2J1Y2tldC5yYWlsd2F5LmludGVybmFsOjkwMDAvdHctcHViLTEvU2NyZWVuX1JlY29yZGluZ18yMDI1MDMyNV8xMjQzMzdfWW91VHViZS5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1KNFVDVzVQTUJYQ0RIRklBUU1SSiUyRjIwMjUwMzI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMyNVQyMDA1MTBaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUpLTkZWRFZ6VlFUVUpZUTBSSVJrbEJVVTFTU2lJc0ltVjRjQ0k2TVRjME1qazNOVGt6TWl3aWNHRnlaVzUwSWpvaWRVcDNhREZhV0RKdmN6Vk1NbWgzZWxrM09ITTBRek51VG01eVJubENWemdpZlEuR2NKQmF2Vm5qeXNnR1ZwVlJfUnRjLUowZ3N5dE5FMlBWbkY5aENhdHN4aGpHM2dpdkR0OUl5NWJBLWxxTUxqNW5HamJUbmtiV1NPQVNUWDlmNlc1cVEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT0xOGEyYjc2MWI3MzQ2MTEzZjhmMzRhNjk5Y2ExZGZhNjFhZTEzYjVmYmRiYzY3YmY4YzI5YmMxYWZjNmE4NGMw"
      variant="dark"
    >
      <div className="flex items-start mt-4 justify-center h-full w-full">
        <motion.div
          key={animationKey} // Add key to force re-render
          className="text-6xl md:text-8xl font-bold tracking-wide flex flex-wrap justify-center gap-x-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className={`${word.color} text-shadow`}
            >
              {word.text}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </BackgroundMedia>
  )
}

export default AnimatedHero
