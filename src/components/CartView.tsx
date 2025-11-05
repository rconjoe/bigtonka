"use client";

import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { sdk } from "../lib/sdk";
import { useNavigate } from "@tanstack/react-router";

const CartView = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    // cartCount,
  } = useCart();

  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const handleCheckout = async () => {
    try {
      const response = await sdk.client.fetch("/checkout/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: cartItems,
      });

      // @ts-ignore
      const id = response.clientSecret;

      navigate({ to: "/checkout", search: { id } });
    } catch (e) {
      console.error("Checkout process failed:", e);
      alert("Could not proceed to checkout. Please try again later.");
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto px-4 mt-8 md:mt-12 pb-16 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key="cart-view" // Ensures animation runs on view change
    >
      <motion.h2
        className="text-3xl md:text-4xl font-laser mb-8 text-center"
        variants={itemVariants}
      >
        YOUR CART
      </motion.h2>

      {cartItems.length === 0 ? (
        <motion.p
          className="text-center text-white/80 text-xl"
          variants={itemVariants}
        >
          Your cart is empty.
        </motion.p>
      ) : (
        <>
          {/* Cart Items List */}
          <motion.div
            className="space-y-4 mb-8"
            variants={containerVariants} // Stagger items inside
          >
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="flex items-center justify-between p-4 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.image ||
                      `https://placehold.co/64x64/222/fff?text=${item.name[0]}`
                    }
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold font-tektur">{item.name}</h3>
                    <p className="text-sm text-white/70">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 border border-white/30 rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 hover:bg-white/20 rounded-l"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="px-2 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-white/20 rounded-r"
                      aria-label="Increase quantity"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  {/* Item Total */}
                  <span className="w-20 text-right font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-400"
                    aria-label="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Cart Summary & Actions */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 rounded-lg backdrop-blur-sm bg-black/30 border border-white/20"
            variants={itemVariants}
          >
            <div>
              <button
                onClick={clearCart}
                className="text-sm text-white/70 hover:text-red-400 transition-colors"
              >
                Clear Cart
              </button>
            </div>
            <div className="text-right">
              <div className="text-xl md:text-2xl font-bold mb-2">
                Total: ${totalPrice.toFixed(2)}
              </div>
              <motion.button
                className="w-full md:w-auto py-2 px-6 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold text-lg transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCheckout()}
              >
                PROCEED TO CHECKOUT
              </motion.button>
              <p className="text-xs text-white/60 mt-2">
                Shipping & taxes calculated at checkout.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default CartView;
