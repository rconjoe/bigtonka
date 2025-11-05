import { BackgroundMedia } from "./cult/BackgroundMedia";
import HeroTitle from "./HeroTitle";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { getRouteApi, Link, useNavigate } from "@tanstack/react-router"; // Import useNavigate
import { motion } from "framer-motion"; // Import motion for animations
import { sdk } from "../lib/sdk";
import { FaCheckCircle } from "react-icons/fa"; // For a success icon

const routeApi = getRouteApi("/return");

export function Return() {
  const [animationKey, setAnimationKey] = useState(0);
  const [status, setStatus] = useState("loading"); // Initial status to show loading state
  const [customerEmail, setCustomerEmail] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const { session_id } = routeApi.useSearch();

  useEffect(() => {
    if (!session_id) {
      // If no session_id, redirect to home or a generic error page
      navigate({ to: "/" });
      return;
    }

    sdk.client
      .fetch(`/checkout/status?session_id=${session_id}`)
      .then((response) => {
        setStatus(response.status);
        setCustomerEmail(response.customer_email);
      })
      .catch((error) => {
        console.error("Error fetching checkout status:", error);
        setStatus("error"); // Set status to error if fetch fails
      });
  }, [session_id, navigate]); // Add navigate to dependency array

  useEffect(() => {
    // Redirect if status is 'open'
    if (status === "open") {
      navigate({ to: "/checkout", search: { id: session_id } });
    }
  }, [status, session_id, navigate]); // Add navigate to dependency array

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationKey((prevKey) => prevKey + 1);
    }, 8000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <BackgroundMedia
      type="video"
      src="https://img.bigtonk.com/intro-high.mp4"
      variant="dark"
    >
      <div className="flex flex-col items-center justify-start w-full pt-6 md:pt-10 pb-12 min-h-screen">
        <Link to="/">
          <HeroTitle animationKey={animationKey} setCurrentView={() => null} />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 md:mt-12 text-center text-white p-6 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 max-w-xl mx-auto"
        >
          {status === "loading" && (
            <p className="text-xl md:text-2xl font-laser">
              Loading order status...
            </p>
          )}

          {status === "complete" && (
            <>
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-laser mb-4">
                ORDER CONFIRMED!
              </h1>
              <p className="text-lg md:text-xl text-white/80">
                A confirmation has been sent to:{" "}
                <span className="font-semibold text-red-400">
                  {customerEmail}
                </span>
              </p>
              <p className="text-sm text-white/60 mt-4">
                Thank you for your purchase!
              </p>
            </>
          )}

          {status === "error" && (
            <p className="text-xl md:text-2xl font-laser text-red-500">
              There was an error processing your order. Please try again.
            </p>
          )}
        </motion.div>

        <Footer />
      </div>
    </BackgroundMedia>
  );
}
