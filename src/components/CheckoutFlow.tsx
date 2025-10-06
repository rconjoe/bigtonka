"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { formatPrice } from "@/lib/utils";
import { FaExclamation, FaSpinner } from "react-icons/fa";
import { StateSelect, CitySelect } from "react-country-state-city";

const steps = ["Email", "Address", "Fulfillment", "Payment"];

const CheckoutFlow = () => {
  const { cart, addOrderEmail, addOrderAddress } = useCart();

  const [step, setStep] = useState(0);
  const [stepLoading, setStepLoading] = useState(false);
  const [currentState, setCurrentState] = useState(null);
  const [form, setForm] = useState({
    email: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: "",
      country: "USA",
    },
    billingAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: "",
      country: "USA",
    },
    sameAsShipping: true, // New state for the checkbox
    fulfillment: "shipping", // or pickup
    payment: "card", // or paypal, etc.
  });

  const handleEmailStep = () => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      setStepLoading(false);
      alert("Please enter a valid email address.");
      return;
    }
    addOrderEmail(form.email);
    setStepLoading(false);
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleAddressStep = () => {
    // Add validation for shipping address fields here if needed
    // For now, just proceed
    if (form.sameAsShipping) {
      addOrderAddress(form.address, form.address);
    } else {
      addOrderAddress(form.address, form.billingAddress);
    }
    setStepLoading(false);
    if (step < steps.length - 1) setStep(step + 1);
  };

  const nextStep = () => {
    setStepLoading(true);
    switch (step) {
      case 0:
        handleEmailStep();
        break;
      case 1:
        handleAddressStep();
        break;
      default:
        setStepLoading(false);
        if (step < steps.length - 1) setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target;

    if (name === "sameAsShipping") {
      setForm((prev) => ({ ...prev, sameAsShipping: checked }));
    } else if (name in form.address) {
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else if (name in form.billingAddress) {
      setForm((prev) => ({
        ...prev,
        billingAddress: { ...prev.billingAddress, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const renderAddressForm = (
    addressType: "address" | "billingAddress",
    title: string,
  ) => (
    <>
      <label className="block text-sm mt-4">{title}</label>
      <input
        type="text"
        name="line1"
        placeholder="Address line 1"
        value={form[addressType].line1}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            [addressType]: { ...prev[addressType], line1: e.target.value },
          }))
        }
        className="w-full bg-white/10 border border-white/20 rounded px-3 py-2"
      />
      <input
        type="text"
        name="line2"
        placeholder="Address line 2"
        value={form[addressType].line2}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            [addressType]: { ...prev[addressType], line2: e.target.value },
          }))
        }
        className="w-full bg-white/10 border border-white/20 rounded px-3 py-2"
      />
      <div className="grid grid-cols-2 gap-2">
        <div className="w-full bg-white/10 border border-white/20 rounded px-3 py-2">
          <CitySelect
            placeHolder="City"
            countryid={233}
            stateid={currentState?.id}
            onChange={(e) => {
              setForm((prev) => ({
                ...prev,
                [addressType]: { ...prev[addressType], city: e.name },
              }));
            }}
          />
        </div>
        <div className="w-full bg-white/10 border border-white/20 rounded px-3 py-2">
          <StateSelect
            placeHolder="State"
            countryid={233}
            onChange={(e) => {
              setCurrentState(e);
              setForm((prev) => ({
                ...prev,
                [addressType]: { ...prev[addressType], state: e.state_code },
              }));
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          name="zip"
          placeholder="ZIP / Postal Code"
          value={form[addressType].zip}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              [addressType]: { ...prev[addressType], zip: e.target.value },
            }))
          }
          className="w-full bg-white/10 border border-white/20 rounded px-3 py-2"
        />
        <input
          type="text"
          name="country"
          disabled={true}
          value="USA"
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              [addressType]: { ...prev[addressType], country: e.target.value },
            }))
          }
          className="w-full bg-white/10 border border-white/20 rounded px-3 py-2"
        />
      </div>
    </>
  );

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
            className={`flex-1 text-center text-xs ${i <= step ? "text-red-500" : "text-white/40"
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
              <div className="flex text-sm">
                <FaExclamation /> {"  "}
                USA orders only (for now).
              </div>
              {renderAddressForm("address", "Shipping Address")}
              <div className="mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="sameAsShipping"
                    checked={form.sameAsShipping}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  Billing address same as shipping address
                </label>
              </div>
              {!form.sameAsShipping && (
                <div className="mt-4 border-t border-white/20 pt-4 space-y-2">
                  {renderAddressForm("billingAddress", "Billing Address")}
                </div>
              )}
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
            disabled={stepLoading}
          >
            {stepLoading ? <FaSpinner className="fa-spin" /> : "Back"}
          </button>
        )}
        {step < steps.length - 1 && (
          <button
            className="ml-auto px-4 py-2 rounded bg-red-600 hover:bg-red-500"
            onClick={nextStep}
            disabled={stepLoading}
          >
            {stepLoading ? <FaSpinner className="animate-spin" /> : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutFlow;
