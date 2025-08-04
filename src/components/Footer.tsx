// components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer
      className="w-full max-w-2xl lg:max-w-4xl mx-auto px-4 mt-16 pb-8
      flex flex-col items-center text-center"
    >
      {/* <a */}
      {/*   href="https://www.buymeacoffee.com/yourprofile" // <--- REPLACE WITH YOUR BUYMEACOFFEE LINK */}
      {/*   target="_blank" */}
      {/*   rel="noopener noreferrer" */}
      {/*   className="text-white font-tektur font-semibold text-lg md:text-xl mb-2 */}
      {/*     hover:text-white/80 transition-colors duration-300" */}
      {/* > */}
      {/*   Click Here to Support The Rideouts */}
      {/* </a> */}
      <a
        href="https://www.instagram.com/trogdooor" // <--- REPLACE WITH YOUR INSTAGRAM LINK
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 font-tektur text-sm md:text-base
          hover:text-white/80 transition-colors duration-300"
      >
        Made by <u>Joe Bullet</u>
      </a>
    </footer>
  );
};

export default Footer;
