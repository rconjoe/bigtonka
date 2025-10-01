"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { formatPrice } from "@/lib/utils";

const steps = ["Email", "Address", "Fulfillment", "Payment"];

const CheckoutFlow = () => {
  const { cart } = useCart();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    fulfillment: "shipping", // or pickup
    payment: "card", // or paypal, etc.
  });

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (step === 1 && name in form.address) {
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-white">
      <h2 className="text-3xl font-laser mb-8 text-center">CHECKOUT</h2>

      {/* Stepper Progress */}
      <div className="flex justify-between mb-8 relative">
        {steps.map((label, i) => (
          <div
            key={i}
            className={`flex-1 text-center text-xs ${
              i <= step ? "text-red-500" : "text-white/40"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="relative min-h-[250px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-email"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              <label className="block text-sm">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2"
              />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-address"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-2"
            >
              <label className="block text-sm">Shipping Address</label>
              <input
                type="text"
                name="line1"
                placeholder="Address line 1"
                value={form.address.line1}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2"
              />
              <input
                type="text"
                name="line2"
                placeholder="Address line 2"
                value={form.address.line2}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.address.city}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={form.address.state}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP / Postal Code"
                  value={form.address.zip}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={form.address.country}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-fulfillment"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              <label className="block text-sm mb-2">
                Choose Fulfillment Option
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="fulfillment"
                    value="shipping"
                    checked={form.fulfillment === "shipping"}
                    onChange={handleInputChange}
                  />
                  Shipping
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="fulfillment"
                    value="pickup"
                    checked={form.fulfillment === "pickup"}
                    onChange={handleInputChange}
                  />
                  Store Pickup
                </label>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-payment"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              <label className="block text-sm mb-2">Payment Method</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={form.payment === "card"}
                    onChange={handleInputChange}
                  />
                  Credit / Debit Card
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={form.payment === "paypal"}
                    onChange={handleInputChange}
                  />
                  PayPal
                </label>
              </div>

              {/* Order Overview */}
              <div className="mt-6 p-4 rounded bg-white/5 border border-white/10">
                <h4 className="font-bold mb-2">Order Summary</h4>
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm mb-1"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.unit_price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold mt-2">
                  <span>Total</span>
                  <span>{formatPrice(cart.total || 0)}</span>
                </div>
              </div>

              <button
                className="w-full py-3 bg-red-600 hover:bg-red-500 rounded-lg font-semibold"
                onClick={() => alert("Submitting order...")}
              >
                Place Order
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {step > 0 && (
          <button
            className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
            onClick={prevStep}
          >
            Back
          </button>
        )}
        {step < steps.length - 1 && (
          <button
            className="ml-auto px-4 py-2 rounded bg-red-600 hover:bg-red-500"
            onClick={nextStep}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutFlow;
