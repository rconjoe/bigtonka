"use client";

import { motion } from "framer-motion";
import { FaYoutube, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { getRouteApi } from "@tanstack/react-router";

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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const routeApi = getRouteApi("/");

  const carouselVideos = routeApi.useLoaderData().videos;
  const shorts = routeApi.useLoaderData().shorts;

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  // State for the shorts modal
  const [showShortsModal, setShowShortsModal] = useState(false);
  const [selectedShort, setSelectedShort] = useState(null);

  const handlePrevClick = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? carouselVideos.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === carouselVideos.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // Functions to handle shorts modal
  const openShortsModal = (short) => {
    setSelectedShort(short);
    setShowShortsModal(true);
  };

  const closeShortsModal = () => {
    setShowShortsModal(false);
    setSelectedShort(null);
  };

  const currentVideo = carouselVideos[currentVideoIndex];

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 mt-8 md:mt-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key="media-showcase"
    >
      {/* Featured Video Carousel Section */}
      <motion.div className="w-full mb-6" variants={itemVariants}>
        <h2 className="text-3xl md:text-4xl text-white font-laser mb-6">
          NEW CONTENT
        </h2>

        <div>
          {/* Video Player */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-3">
            <iframe
              src={`https://www.youtube.com/embed/${currentVideo.videoid}`}
              title={currentVideo.title}
              allow={`accelerometer; autoplay; clipboard-write; encrypted-media;
                gyroscope; picture-in-picture`}
              allowFullScreen
              className="w-full h-full"
              key={currentVideo.videoid} // Key for re-rendering iframe on slide change
            ></iframe>
          </div>

          {/* Navigation Buttons and Indicators */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevClick}
              className={`bg-black/50 hover:bg-black/70 text-white p-2
                rounded-full transition-colors`}
              aria-label="Previous video"
            >
              <FaChevronLeft size={18} />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 flex-grow">
              {carouselVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === currentVideoIndex ? "bg-white" : "bg-white/50"
                    } transition-colors`}
                  aria-label={`Go to video ${index + 1}`}
                ></button>
              ))}
            </div>

            <button
              onClick={handleNextClick}
              className={`bg-black/50 hover:bg-black/70 text-white p-2
                rounded-full transition-colors`}
              aria-label="Next video"
            >
              <FaChevronRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Shorts Section */}
      <motion.div className="mb-12" variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl text-white font-laser">
            SHORTS
          </h2>
          <a
            href="https://youtube.com/@whatsgoodamerica/shorts"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center text-white/80 hover:text-red-400
              transition-colors`}
          >
            <span className="mr-2">View all</span>
            <FaYoutube size={20} />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {shorts.map((short, index) => (
            <motion.div
              key={index}
              className={`aspect-[9/16] relative rounded-lg overflow-hidden
                group cursor-pointer`}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              variants={itemVariants}
              onClick={() => openShortsModal(short)} // Add click handler
              role="button" // Improve accessibility for clickable element
              tabIndex={0} // Make it focusable for keyboard navigation
              aria-label={`Play short: ${short.title}`} // Describe the action for screen readers
            >
              <img
                src={
                  short.thumbnail ||
                  `https://placehold.co/540x960/222/fff?text=Short+${index + 1
                  }`
                }
                alt={short.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/70
                  via-transparent to-transparent`}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3
                  className={`text-white text-sm md:text-base font-medium
                  line-clamp-1`}
                >
                  {short.title}
                </h3>
                <p className="text-white/70 text-xs md:text-sm mt-1"></p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Shorts Modal */}
      {showShortsModal && selectedShort && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center
            bg-black bg-opacity-80 p-4`}
          onClick={closeShortsModal} // Close modal when clicking backdrop
        >
          <div
            className={`relative w-full max-w-sm h-auto aspect-[9/16]
              bg-black rounded-lg overflow-hidden`}
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <button
              onClick={closeShortsModal}
              className={`absolute top-2 right-2 text-white text-3xl z-10
                bg-black/50 rounded-full w-10 h-10 flex items-center
                justify-center hover:bg-black/70`}
              aria-label="Close video player"
            >
              &times;
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedShort.videoid}?autoplay=1`}
              title={selectedShort.title}
              allow={`accelerometer; autoplay; clipboard-write; encrypted-media;
                gyroscope; picture-in-picture`}
              allowFullScreen
              className="w-full h-full"
            ></iframe>
            <div
              className={`absolute bottom-0 left-0 right-0 p-3
                bg-gradient-to-t from-black/80 to-transparent`}
            >
              <h3 className="text-white text-lg font-bold line-clamp-2">
                {selectedShort.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MediaShowcase;
