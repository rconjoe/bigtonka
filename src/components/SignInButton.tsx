"use client";

import { SignInButton as ClerkSignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const SignInButton = () => {
  return (
    // This component from Clerk handles the click event to open the sign-in modal.
    <ClerkSignInButton mode="modal">
      <motion.button
        className="text-white md:text-2xl font-medium tracking-wider hover:text-red-400 transition-colors duration-300 text-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        SIGN IN
      </motion.button>
    </ClerkSignInButton>
  );
};

export default SignInButton;
