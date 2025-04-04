"use client"

import React, { useRef } from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

type OverlayVariant = "none" | "light" | "dark"
type MediaType = "image" | "video"

const backgroundVariants = cva(
  "relative w-full", // Removed overflow-hidden to allow scrolling
  {
    variants: {
      overlay: {
        none: "",
        light:
          "before:fixed before:inset-0 before:bg-white before:opacity-40 before:z-10", // Changed to fixed
        dark: "before:fixed before:inset-0 before:bg-black before:opacity-40 before:z-10", // Changed to fixed
      },
      type: {
        image: "",
        video: "",
      },
    },
    defaultVariants: {
      overlay: "none",
      type: "image",
    },
  }
)

interface BackgroundMediaProps {
  variant?: OverlayVariant
  type?: MediaType
  src: string
  alt?: string
  className?: string
  children?: React.ReactNode
  height?: string
}

export const BackgroundMedia: React.FC<BackgroundMediaProps> = ({
  variant = "light",
  type = "image",
  src,
  alt = "",
  className,
  children,
  height = "min-h-screen", // Changed to min-h-screen to allow expansion
}) => {
  const mediaRef = useRef<HTMLVideoElement | null>(null)
  const mediaClasses = cn(backgroundVariants({ overlay: variant, type }), height, className)

  const renderMedia = () => {
    if (type === "video") {
      return (
        <video
          ref={mediaRef}
          aria-hidden="true"
          muted
          loop
          className="fixed inset-0 h-full w-full object-cover transition-opacity duration-300 pointer-events-none z-0" // Changed to fixed
          autoPlay
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )
    } else {
      return (
        <img
          src={src}
          alt={alt}
          className="fixed inset-0 h-full w-full object-cover rounded-br-[88px] z-0" // Changed to fixed
          loading="eager"
        />
      )
    }
  }

  return (
    <div className={mediaClasses}>
      {renderMedia()}
      {children && (
        <div className="relative z-20 w-full min-h-screen pb-16">
          {children}
        </div>
      )}
    </div>
  )
}

