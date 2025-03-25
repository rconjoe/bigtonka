"use client"

import React, { useRef } from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

type OverlayVariant = "none" | "light" | "dark"
type MediaType = "image" | "video"

const backgroundVariants = cva(
  "relative w-full overflow-hidden",
  {
    variants: {
      overlay: {
        none: "",
        light:
          "before:absolute before:inset-0 before:bg-white before:opacity-30 before:z-10",
        dark: "before:absolute before:inset-0 before:bg-black before:opacity-30 before:z-10",
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
  height = "h-screen min-h-[500px] lg:min-h-[600px] max-h-[1000px]",
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
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 pointer-events-none z-0"
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
          className="absolute inset-0 h-full w-full object-cover rounded-br-[88px] z-0"
          loading="eager"
        />
      )
    }
  }

  return (
    <div className={mediaClasses}>
      {renderMedia()}
      {children && (
        <div className="relative z-20 h-full w-full">{children}</div>
      )}
    </div>
  )
}
