import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { BackgroundMedia } from "./cult/BackgroundMedia";
import HeroTitle from "./HeroTitle";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sdk } from "../lib/sdk";

const stripe_key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(stripe_key);
const routeApi = getRouteApi("/checkout");

// Define a type for the shipping address
interface ShippingAddress {
  firstName: string; // Changed from fullName
  lastName: string; // Added lastName
  email: string; // Added email field
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export function Checkout() {
  const { id: clientSecret, cartId } = routeApi.useSearch();
  const navigate = useNavigate();

  const [animationKey, setAnimationKey] = useState(0);
  const [currentStep, setCurrentStep] = useState(1); // 1 for shipping, 2 for payment
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "", // Initialize firstName
    lastName: "", // Initialize lastName
    email: "", // Initialize email
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });
  const [useBillingAsShipping, setUseBillingAsShipping] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationKey((prevKey) => prevKey + 1);
    }, 8000);
    return () => clearInterval(intervalId);
  }, []);

  // Effect to validate the form whenever shippingAddress or useBillingAsShipping changes
  useEffect(() => {
    let isValid = false;

    if (useBillingAsShipping) {
      isValid = true;
    } else {
      const {
        firstName, // Include firstName in validation
        lastName, // Include lastName in validation
        email, // Include email in validation
        addressLine1,
        city,
        state,
        zipCode,
        country,
      } = shippingAddress;
      isValid =
        firstName.trim() !== "" && // Validate firstName
        lastName.trim() !== "" && // Validate lastName
        email.trim() !== "" && // Validate email
        addressLine1.trim() !== "" &&
        city.trim() !== "" &&
        state.trim() !== "" &&
        zipCode.trim() !== "" &&
        country.trim() !== "";
    }
    setIsFormValid(isValid);
  }, [shippingAddress, useBillingAsShipping]);

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = async () => {
    if (isFormValid) {
      try {
        const cartData = {
          shipping_address: {
            first_name: shippingAddress.firstName,
            last_name: shippingAddress.lastName,
            address_1: shippingAddress.addressLine1,
            address_2: shippingAddress.addressLine2,
            city: shippingAddress.city,
            province: shippingAddress.state,
            postal_code: shippingAddress.zipCode,
          },
          metadata: {
            use_billing_as_shipping: useBillingAsShipping,
          },
        };

        sdk.store.cart.update(cartId, cartData);

        setCurrentStep(2); // Go to payment step
      } catch (e) {
        alert("Error setting shipping address - please try again later");
        console.error(e);
      }
    } else {
      alert("Please fill in all required shipping address fields.");
    }
  };

  const handleBackStep = () => {
    setCurrentStep(1); // Go back to shipping address step
  };

  // If clientSecret is missing, redirect to home
  useEffect(() => {
    if (!clientSecret) {
      navigate({ to: "/" });
    }
  }, [clientSecret, navigate]);

  if (!clientSecret) {
    return null;
  }

  return (
    <BackgroundMedia
      type="video"
      src="https://img.bigtonk.com/intro-high.mp4"
      variant="dark"
    >
      <div className="flex flex-col items-center justify-start w-full pt-6 md:pt-10 pb-12 min-h-screen">
        <HeroTitle animationKey={animationKey} setCurrentView={() => null} />

        <motion.div
          className="w-full max-w-lg mx-auto px-4 mt-8 md:mt-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Step 1: Shipping Address */}
          {currentStep === 1 && (
            <motion.div
              key="shipping-step"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20"
            >
              <h2 className="text-2xl md:text-3xl font-laser mb-6 text-center">
                SHIPPING ADDRESS
              </h2>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm mb-1">
                    Email Address
                  </label>
                  <input
                    type="email" // Use type="email" for better validation
                    id="email"
                    name="email"
                    value={shippingAddress.email}
                    onChange={handleAddressChange}
                    className={`w-full p-2 rounded bg-black/50 border border-white/30 focus:outline-none focus:border-red-500 ${
                      useBillingAsShipping
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                    required={!useBillingAsShipping}
                    disabled={useBillingAsShipping}
                  />
                </div>
                {/* First Name Field */}
                <div>
                  <label htmlFor="firstName" className="block text-sm mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={shippingAddress.firstName}
                    onChange={handleAddressChange}
                    className={`w-full p-2 rounded bg-black/50 border border-white/30 focus:outline-none focus:border-red-500 ${
                      useBillingAsShipping
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                    required={!useBillingAsShipping}
                    disabled={useBillingAsShipping}
                  />
                </div>
                {/* Last Name Field */}
                <div>
                  <label htmlFor="lastName" className="block text-sm mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={shippingAddress.lastName}
                    onChange={handleAddressChange}
                    className={`w-full p-2 rounded bg-black/50 border border-white/30 focus:outline-none focus:border-red-500 ${
                      useBillingAsShipping
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                    required={!useBillingAsShipping}
                    disabled={useBillingAsShipping}
                  />
                </div>
                {/* Form fields are disabled if "useBillingAsShipping" is checked */}
                <div>
                  <label htmlFor="addressLine1" className="block text-sm mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    value={shippingAddress.addressLine1}
                    onChange={handleAddressChange}
                    className={`w-full p-2 rounded bg-black/50 border border-white/30 focus:outline-none focus:border-red-500 ${
                      useBillingAsShipping
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                    required={!useBillingAsShipping}
                    disabled={useBillingAsShipping}
                  />
                </div>
                <div>
                  <label htmlFor="addressLine2" className="block text-sm mb-1">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    value={shippingAddress.addressLine2}
                    onChange={handleAddressChange}
                    className={`w-full p-2 rounded bg-black/50 border border-white/30 focus:outline-none focus:border-red-500 ${
                      useBillingAsShipping
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={useBillingAsShipping}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      className={`w-full p-2 rounded bg-black/50 border border-white/30 focus:outline-none focus:border-red-500 ${
                        useBillingAsShipping
                          ? "opacity-60 cursor-not-allowed"
                          : ""
                      }`}
                      required={!useBillingAsShipping}
                      disabled={useBillingAsShipping}
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                      className={`w-full p-2 rounded bg-black/50 border border-white/30 focus:outline-none focus:border-red-500 ${
                        useBillingAsShipping
                          ? "opacity-60 cursor-not-allowed"
                          : ""
                      }`}
                      required={!useBillingAsShipping}
                      disabled={useBillingAsShipping}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm mb-1">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={handleAddressChange}
                      className={`w-full p-2 rounded bg-black/50 border border-white/30 focus:outline-none focus:border-red-500 ${
                        useBillingAsShipping
                          ? "opacity-60 cursor-not-allowed"
                          : ""
                      }`}
                      required={!useBillingAsShipping}
                      disabled={useBillingAsShipping}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm mb-1">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleAddressChange}
                      className={`w-full p-2 rounded bg-black/50 border border-white/30 focus:outline-none focus:border-red-500 ${
                        useBillingAsShipping
                          ? "opacity-60 cursor-not-allowed"
                          : ""
                      }`}
                      required={!useBillingAsShipping}
                      disabled={useBillingAsShipping}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>

                {/* <div className="flex items-center mt-4"> */}
                {/*   <input */}
                {/*     type="checkbox" */}
                {/*     id="useBillingAsShipping" */}
                {/*     checked={useBillingAsShipping} */}
                {/*     onChange={(e) => setUseBillingAsShipping(e.target.checked)} */}
                {/*     className="form-checkbox h-4 w-4 text-red-600 rounded" */}
                {/*   /> */}
                {/*   <label */}
                {/*     htmlFor="useBillingAsShipping" */}
                {/*     className="ml-2 text-sm text-white/80" */}
                {/*   > */}
                {/*     Use billing address as shipping address */}
                {/*   </label> */}
                {/* </div> */}

                <motion.button
                  onClick={handleNextStep}
                  className={`w-full py-3 mt-6 bg-red-600 text-white rounded-lg font-semibold text-lg transition-colors ${
                    isFormValid
                      ? "hover:bg-red-500"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  whileHover={isFormValid ? { scale: 1.02 } : {}}
                  whileTap={isFormValid ? { scale: 0.98 } : {}}
                  disabled={!isFormValid}
                >
                  NEXT: PROCEED TO PAYMENT
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Step 2: Embedded Checkout */}
          {currentStep === 2 && (
            <motion.div
              key="payment-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-laser flex-grow text-center pr-20">
                  PAYMENT
                </h2>
              </div>
              <div id="checkout">
                {clientSecret && (
                  <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                  >
                    <EmbeddedCheckout />
                  </EmbeddedCheckoutProvider>
                )}
              </div>
              <motion.button
                onClick={handleBackStep}
                className={`w-full py-3 mt-6 bg-red-600 text-white rounded-lg font-semibold text-lg transition-colors ${
                  isFormValid
                    ? "hover:bg-red-500"
                    : "opacity-50 cursor-not-allowed"
                }`}
                whileHover={isFormValid ? { scale: 1.02 } : {}}
                whileTap={isFormValid ? { scale: 0.98 } : {}}
                disabled={!isFormValid}
              >
                GO BACK
              </motion.button>
            </motion.div>
          )}
        </motion.div>
        <Footer />
      </div>
    </BackgroundMedia>
  );
}
