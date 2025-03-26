"use client"

import React, { useState, useEffect } from "react"
import { BackgroundMedia } from "./cult/BackgroundMedia"
import HeroTitle from "./HeroTitle"
import LinkRow from "./LinkRow"
import LinkTree from "./LinkTree"

const AnimatedHero = () => {
  // State for animation cycles
  const [animationKey, setAnimationKey] = useState(0)

  // Reset animation every 8 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationKey(prevKey => prevKey + 1)
    }, 8000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <BackgroundMedia
      type="video"
      src="http://console-production-05bc.up.railway.app/api/v1/download-shared-object/aHR0cDovL2J1Y2tldC5yYWlsd2F5LmludGVybmFsOjkwMDAvdHctcHViLTEvU2NyZWVuX1JlY29yZGluZ18yMDI1MDMyNV8xMjQzMzdfWW91VHViZS5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1KNFVDVzVQTUJYQ0RIRklBUU1SSiUyRjIwMjUwMzI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMyNVQyMDA1MTBaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUpLTkZWRFZ6VlFUVUpZUTBSSVJrbEJVVTFTU2lJc0ltVjRjQ0k2TVRjME1qazNOVGt6TWl3aWNHRnlaVzUwSWpvaWRVcDNhREZhV0RKdmN6Vk1NbWgzZWxrM09ITTBRek51VG01eVJubENWemdpZlEuR2NKQmF2Vm5qeXNnR1ZwVlJfUnRjLUowZ3N5dE5FMlBWbkY5aENhdHN4aGpHM2dpdkR0OUl5NWJBLWxxTUxqNW5HamJUbmtiV1NPQVNUWDlmNlc1cVEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT0xOGEyYjc2MWI3MzQ2MTEzZjhmMzRhNjk5Y2ExZGZhNjFhZTEzYjVmYmRiYzY3YmY4YzI5YmMxYWZjNmE4NGMw"
      variant="dark"
    >
      <div className="flex flex-col items-center justify-start h-full w-full pt-6 md:pt-10">
        {/* Main title */}
        <HeroTitle animationKey={animationKey} />

        {/* Navigation links */}
        <LinkRow />

        {/* LinkTree-style buttons */}
        <LinkTree />
      </div>
    </BackgroundMedia>
  )
}

export default AnimatedHero
