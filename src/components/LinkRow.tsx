"use client";

import { motion } from "framer-motion";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const LinkRow = ({ setCurrentView, currentView }) => {
  const { cartCount } = useCart();

  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Define menu links with view values (removed HOME)
  const menuLinks = [
    { text: "HOME", href: "home", view: "home" },
    // { text: "HOME", href: "#sponsors", view: "sponsors" },
    { text: "VIDEOS", href: "#media", view: "media" },
    { text: "STORE", href: "#merch", view: "merch" },
  ];

  // Define social media links
  const socialLinks = [
    { icon: <FaYoutube size={24} />, href: "https://youtube.com/@whatsgoodamerica1" },
    { icon: <FaInstagram size={24} />, href: "https://instagram.com/whatsgoodamericaa" },
  ];

  // Handle link click
  const handleLinkClick = (e, view) => {
    e.preventDefault();
    setCurrentView(view);
  };

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
        {/* <motion.button */}
        {/*   onClick={(e) => handleLinkClick(e, "cart")} // <-- Navigate to cart view */}
        {/*   variants={menuItemVariants} // Apply animation variant */}
        {/*   className={`relative text-white md:text-2xl font-medium tracking-wider hover:text-red-400 transition-colors duration-300 text-shadow ${currentView === "cart" ? "text-red-400" : "" */}
        {/*     }`} */}
        {/*   whileHover={{ scale: 1.1 }} */}
        {/*   whileTap={{ scale: 0.95 }} */}
        {/* > */}
        {/*   <FaShoppingCart size={24} /> */}
        {/*   {cartCount > 0 && ( // <-- Display count only if items exist */}
        {/*     <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"> */}
        {/*       {cartCount} */}
        {/*     </span> */}
        {/*   )} */}
        {/* </motion.button> */}
      </div>
    </motion.nav>
  );
};

export default LinkRow;
