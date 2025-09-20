"use client";

import { getRouteApi } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FaShoppingCart, FaEnvelope } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const MerchStore = () => {
  const routeApi = getRouteApi("/");

  // Get the linkTreeButtons from loader data
  const products = routeApi.useLoaderData().products.products;
  const { addToCart } = useCart();
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

  //
  // return (
  //   <motion.div
  //     className="w-full max-w-5xl mx-auto px-4 mt-8 md:mt-12 pb-16"
  //     variants={containerVariants}
  //     initial="hidden"
  //     animate="visible"
  //     key="merch-store"
  //   >
  //     <h2 className="text-3xl md:text-4xl text-white font-laser mb-6">
  //       COMING... AUGUST 2025
  //     </h2>
  //   </motion.div>
  // )

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 mt-8 md:mt-12 pb-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key="merch-store"
    >
      {/* All Products */}
      <motion.div className="mb-12" variants={itemVariants}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl text-white font-laser">
            ALL PRODUCTS
          </h2>

          {/* <div className="flex gap-2"> */}
          {/*   <select className="bg-white/10 text-white border border-white/20 rounded px-3 py-1 text-sm"> */}
          {/*     <option>All Categories</option> */}
          {/*     <option>Apparel</option> */}
          {/*     <option>Accessories</option> */}
          {/*     <option>Collectibles</option> */}
          {/*   </select> */}
          {/**/}
          {/*   <select className="bg-white/10 text-white border border-white/20 rounded px-3 py-1 text-sm"> */}
          {/*     <option>Sort by: Featured</option> */}
          {/*     <option>Price: Low to High</option> */}
          {/*     <option>Price: High to Low</option> */}
          {/*     <option>Newest</option> */}
          {/*   </select> */}
          {/* </div> */}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg overflow-hidden group cursor-pointer"
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              variants={itemVariants}
            >
              {/* Product thumbnail */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={
                    product.thumbnail ||
                    `https://placehold.co/300x300/222/fff?text=${product.title}`
                  }
                  alt={product.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Variant Selector Row */}
              {product.variants && product.variants.length > 0 && (
                <div className="flex flex-wrap gap-2 px-4 py-2">
                  {product.variants.map((variant, vIndex) => (
                    <button
                      key={vIndex}
                      className="px-2 py-1 text-xs rounded-md border border-white/20 text-white/80 hover:bg-white/10 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        // You can store selected variant in state or pass it to addToCart
                        console.log("Selected variant:", variant);
                      }}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              )}

              {/* Product Info */}
              <div className="p-4">
                <span className="text-white/60 text-xs">
                  {product.category}
                </span>
                <h3 className="text-white font-medium font-tektur line-clamp-1">
                  {product.title}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white font-bold">${product.price}</span>
                  <button
                    className="text-white bg-red-600/80 hover:bg-red-600 p-1.5 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <FaShoppingCart size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Newsletter Signup */}
      {/* <motion.div */}
      {/*   className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6 md:p-8" */}
      {/*   variants={itemVariants} */}
      {/* > */}
      {/*   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6"> */}
      {/*     <div className="md:flex-1"> */}
      {/*       <h3 className="text-2xl text-white font-bold font-tektur mb-2"> */}
      {/*         JOIN THE CREW */}
      {/*       </h3> */}
      {/*       <p className="text-white/80"> */}
      {/*         Sign up for our newsletter to get early access to drops, exclusive */}
      {/*         discounts, and behind-the-scenes content. */}
      {/*       </p> */}
      {/*     </div> */}
      {/**/}
      {/*     <div className="md:w-1/2"> */}
      {/*       <div className="flex"> */}
      {/*         <input */}
      {/*           type="email" */}
      {/*           placeholder="Your email address" */}
      {/*           className="flex-1 bg-white/10 border border-white/20 text-white px-4 py-3 rounded-l-lg focus:outline-none focus:border-red-400" */}
      {/*         /> */}
      {/*         <motion.button */}
      {/*           className="bg-red-600 hover:bg-red-500 text-white px-4 py-3 rounded-r-lg flex items-center gap-2" */}
      {/*           whileHover={{ scale: 1.03 }} */}
      {/*           whileTap={{ scale: 0.97 }} */}
      {/*         > */}
      {/*           <FaEnvelope /> */}
      {/*           <span className="hidden md:inline">SUBSCRIBE</span> */}
      {/*         </motion.button> */}
      {/*       </div> */}
      {/*       <p className="text-white/60 text-xs mt-2"> */}
      {/*         We respect your privacy. Unsubscribe at any time. */}
      {/*       </p> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </motion.div> */}
    </motion.div>
  );
};

export default MerchStore;
