"use client"

import React from "react"
import { motion } from "framer-motion"
import { FaPlay, FaYoutube, FaDownload, FaShare } from "react-icons/fa"

const MediaShowcase = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  // Featured video
  const featuredVideo = {
    title: "What's Good America - Season 2 Premiere",
    thumbnail: "/media/featured-thumbnail.jpg",
    videoId: "abc123xyz", // YouTube video ID
    description: "Join us for the Season 2 premiere as we take on the craziest streets and meet the wildest riders in the country.",
    views: "1.2M",
    date: "3 weeks ago"
  }

  // Recent shorts
  const shorts = [
    {
      title: "Insane Wheelie Challenge",
      thumbnail: "/media/short1.jpg",
      videoId: "short1",
      views: "450K"
    },
    {
      title: "Dirt Bike vs Street Bike",
      thumbnail: "/media/short2.jpg",
      videoId: "short2",
      views: "820K"
    },
    {
      title: "City Takeover",
      thumbnail: "/media/short3.jpg",
      videoId: "short3",
      views: "1.1M"
    },
    {
      title: "Police Chase (Almost)",
      thumbnail: "/media/short4.jpg",
      videoId: "short4",
      views: "2.3M"
    }
  ]

  // Channel info
  const channelInfo = {
    name: "What's Good America",
    subscribers: "1.5M",
    description: "The wildest ride culture show on YouTube. We showcase street culture, extreme sports, and everything in between. From dirt bikes in the city to ATVs on the highway, we bring you the most authentic look at ride life across America.",
    foundedIn: "2020",
    uploads: "250+",
    pressContact: "press@whatsgoodamerica.com"
  }

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 mt-8 md:mt-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key="media-showcase"
    >
      {/* Featured Video Section */}
      <motion.div
        className="w-full mb-12"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl text-white font-laser mb-6">LATEST EPISODE</h2>

        <div className="relative aspect-video w-full rounded-xl overflow-hidden group">
          {/* Thumbnail with play overlay */}
          <div className="absolute inset-0 bg-black">
            <img
              src={featuredVideo.thumbnail || "https://placehold.co/1920x1080/333/fff?text=What%27s+Good+America"}
              alt={featuredVideo.title}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-70 transition-opacity duration-300"
            />
          </div>

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600/90 rounded-full flex items-center justify-center group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300 cursor-pointer">
              <FaPlay className="text-white text-xl md:text-2xl ml-1" />
            </div>
          </div>

          {/* Video info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
            <h3 className="text-xl md:text-2xl text-white font-semibold font-tektur">{featuredVideo.title}</h3>
            <p className="text-white/80 mt-2 max-w-3xl line-clamp-2">{featuredVideo.description}</p>
            <div className="flex items-center mt-2 text-white/60 text-sm">
              <span>{featuredVideo.views} views</span>
              <span className="mx-2">•</span>
              <span>{featuredVideo.date}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Shorts Section */}
      <motion.div
        className="mb-12"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl text-white font-laser">SHORTS</h2>
          <a href="https://youtube.com/@whatsgoodamerica/shorts" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/80 hover:text-red-400 transition-colors">
            <span className="mr-2">View all</span>
            <FaYoutube size={20} />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {shorts.map((short, index) => (
            <motion.div
              key={index}
              className="aspect-[9/16] relative rounded-lg overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              variants={itemVariants}
            >
              <img
                src={short.thumbnail || `https://placehold.co/540x960/222/fff?text=Short+${index + 1}`}
                alt={short.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white text-sm md:text-base font-medium line-clamp-1 font-tektur">{short.title}</h3>
                <p className="text-white/70 text-xs md:text-sm mt-1">{short.views} views</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Press Kit / About Section */}
      <motion.div
        className="backdrop-blur-sm bg-white/5 p-6 md:p-8 rounded-xl border border-white/10"
        variants={itemVariants}
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="md:flex-1">
            <h2 className="text-2xl md:text-3xl text-white font-laser mb-4">PRESS KIT</h2>
            <p className="text-white/90 mb-4 font-tektur">{channelInfo.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <h4 className="text-white/60 text-sm uppercase">Founded</h4>
                <p className="text-white font-medium">{channelInfo.foundedIn}</p>
              </div>
              <div>
                <h4 className="text-white/60 text-sm uppercase">Subscribers</h4>
                <p className="text-white font-medium">{channelInfo.subscribers}</p>
              </div>
              <div>
                <h4 className="text-white/60 text-sm uppercase">Videos</h4>
                <p className="text-white font-medium">{channelInfo.uploads}</p>
              </div>
              <div>
                <h4 className="text-white/60 text-sm uppercase">Contact</h4>
                <p className="text-white font-medium">{channelInfo.pressContact}</p>
              </div>
            </div>
          </div>

          <div className="md:w-72 flex flex-col gap-3">
            <a href="#" className="flex items-center justify-between w-full p-3 rounded-lg bg-red-600/90 hover:bg-red-500 transition-colors text-white group">
              <span className="font-medium">Download Press Kit</span>
              <FaDownload className="group-hover:translate-y-1 transition-transform duration-200" />
            </a>
            <a href="#" className="flex items-center justify-between w-full p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white group">
              <span className="font-medium">Media Inquiries</span>
              <FaShare className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default MediaShowcase
