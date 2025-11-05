"use client";

import { motion } from "framer-motion";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "../context/CartContext"; // Assuming path is correct
import { FaShoppingCart, FaCheckCircle } from "react-icons/fa"; // For add to cart icon and success

// Define types for Medusa products (simplified)
// You might want a more complete type definition from your Medusa SDK
interface MedusaProductVariant {
  id: string; // variant_id from Medusa
  title: string;
  calculated_price: {
    calculated_amount: number;
  };
}

interface MedusaProduct {
  id: string; // product_id from Medusa
  title: string;
  description: string;
  thumbnail?: string;
  variants: MedusaProductVariant[];
  metadata: {
    stripe_product_id: string;
    stripe_price_id: string;
  };
}

const MerchStore = () => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

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
  // @ts-ignore - Assuming your loader provides a 'products' array
  const { products } = routeApi.useLoaderData().products;

  // State to hold selected variants for each product
  const [selectedVariants, setSelectedVariants] = useState<{
    [productId: string]: string;
  }>({});

  // Initialize selectedVariants with the first variant of each product
  // This needs to be done carefully to avoid infinite loops with useEffect
  // and ensuring it only runs once on component mount for initial state.
  // A simple approach is to do it within the map if not already set.

  const handleVariantChange = (productId: string, variantId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantId,
    }));
  };

  const handleAddToCart = (product: MedusaProduct) => {
    const selectedVariantId = selectedVariants[product.id];
    const selectedVariant = product.variants.find(
      (v) => v.id === selectedVariantId,
    );

    if (!selectedVariant) {
      console.warn("No variant selected for product:", product.title);
      // Optionally show a user-facing error
      return;
    }

    const price = selectedVariant.calculated_price.calculated_amount;

    if (price === undefined) {
      console.error("Price not found for selected variant:", selectedVariant);
      return;
    }

    const cartProduct = {
      id: product.id, // Medusa product ID
      name: `${product.title} (${selectedVariant.title})`, // Combine name and variant for display
      price: price, // Medusa prices are usually in cents
      image: product.thumbnail,
      variantId: selectedVariant.id, // Medusa variant ID for uniqueness
      uniqueCartItemId: selectedVariant.id, // Use variant ID as the true unique ID in cart
      stripe_product_id: product.metadata.stripe_product_id,
      stripe_price_id: product.metadata.stripe_price_id,
    };

    addToCart(cartProduct);
    setAddedProductId(product.id); // Set product ID for confirmation animation
    setTimeout(() => setAddedProductId(null), 1500); // Clear after a short delay
  };

  const handleProceedToCheckout = () => {
    // In a real application, you would:
    // 1. Create a checkout session on your backend using the cartItems.
    // 2. Redirect the user to the Stripe Checkout page URL returned by your backend.
    console.log("Proceeding to checkout with cart:", cartItems);

    // For now, let's just navigate to the cart view
    navigate({ to: "/#cart" });
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 mt-8 md:mt-12 pb-16 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key="merch-store"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-laser mb-8 text-center"
        variants={itemVariants}
      >
        MERCHANDISE
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: MedusaProduct) => {
          // Initialize selected variant if not already set
          if (!selectedVariants[product.id] && product.variants.length > 0) {
            setSelectedVariants((prev) => ({
              ...prev,
              [product.id]: product.variants[0].id,
            }));
          }

          const currentSelectedVariant = product.variants.find(
            (v) => v.id === selectedVariants[product.id],
          );

          const displayPrice = currentSelectedVariant
            ? currentSelectedVariant.calculated_price.calculated_amount
            : null;

          return (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="flex flex-col p-4 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 relative overflow-hidden"
            >
              {/* Added to cart confirmation */}
              {addedProductId === product.id && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 flex items-center justify-center bg-green-700/80 text-white text-xl font-bold rounded-lg z-20"
                >
                  <FaCheckCircle className="mr-2" /> Added!
                </motion.div>
              )}

              <img
                src={
                  product.thumbnail ||
                  `https://placehold.co/300x300/222/fff?text=${product.title}`
                }
                alt={product.title}
                className="w-full h-96 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold font-tektur mb-2">
                {product.title}
              </h3>
              <p className="text-white/80 text-sm mb-3 flex-grow">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold">
                  {displayPrice ? `$${displayPrice.toFixed(2)}` : "N/A"}
                </span>

                {/* Variant Selector */}
                {product.variants.length > 1 && (
                  <select
                    value={selectedVariants[product.id] || ""}
                    onChange={(e) =>
                      handleVariantChange(product.id, e.target.value)
                    }
                    className="p-2 rounded bg-black/50 text-white border border-white/30 text-sm font-tektur cursor-pointer"
                  >
                    {product.variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <motion.button
                onClick={() => handleAddToCart(product)}
                className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaShoppingCart /> Add to Cart
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* {cartItems.length > 0 && ( */}
      {/*   <motion.div */}
      {/*     className="mt-12 flex justify-center" */}
      {/*     variants={itemVariants} */}
      {/*   > */}
      {/*     <motion.button */}
      {/*       onClick={handleProceedToCheckout} */}
      {/*       className="py-3 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xl transition-colors" */}
      {/*       whileHover={{ scale: 1.03 }} */}
      {/*       whileTap={{ scale: 0.97 }} */}
      {/*     > */}
      {/*       PROCEED TO CHECKOUT */}
      {/*     </motion.button> */}
      {/*   </motion.div> */}
      {/* )} */}
    </motion.div>
  );
};

export default MerchStore;
