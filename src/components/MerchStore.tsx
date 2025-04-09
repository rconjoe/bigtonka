"use client";

import { motion } from "framer-motion";
import { FaShoppingCart, FaTshirt, FaTag, FaEnvelope } from "react-icons/fa";

const MerchStore = () => {
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

  // Featured product
  const featuredProduct = {
    title: "WGA Season 2 Box Set",
    image: "/products/wga-box-set.jpg",
    price: 149.99,
    description:
      "Limited edition collector's set with exclusive merch, behind-the-scenes footage, and signed memorabilia from the crew.",
    badge: "LIMITED EDITION",
  };

  // Product categories
  const categories = [
    {
      name: "Apparel",
      icon: <FaTshirt />,
      description: "T-shirts, hoodies, and hats",
      image: "/categories/apparel.jpg",
    },
    {
      name: "Accessories",
      icon: <FaTag />,
      description: "Stickers, patches, and keychains",
      image: "/categories/accessories.jpg",
    },
    {
      name: "Collectibles",
      icon: <FaShoppingCart />,
      description: "Limited edition items and memorabilia",
      image: "/categories/collectibles.jpg",
    },
  ];

  // Products
  const products = [
    {
      name: "WGA Logo Tee",
      image: "/products/tee1.jpg",
      price: 29.99,
      category: "Apparel",
      bestseller: true,
    },
    {
      name: "Ride or Die Hoodie",
      image: "/products/hoodie1.jpg",
      price: 59.99,
      category: "Apparel",
    },
    {
      name: "City Takeover Snapback",
      image: "/products/hat1.jpg",
      price: 34.99,
      category: "Apparel",
      bestseller: true,
    },
    {
      name: "Street Culture Sticker Pack",
      image: "/products/stickers.jpg",
      price: 12.99,
      category: "Accessories",
    },
    {
      name: "Wheelie King Patch",
      image: "/products/patch1.jpg",
      price: 9.99,
      category: "Accessories",
    },
    {
      name: "Metal WGA Keychain",
      image: "/products/keychain.jpg",
      price: 19.99,
      category: "Accessories",
    },
    {
      name: "Season 1 Poster (Signed)",
      image: "/products/poster.jpg",
      price: 24.99,
      category: "Collectibles",
      bestseller: true,
    },
    {
      name: "Bike Life Mug",
      image: "/products/mug.jpg",
      price: 14.99,
      category: "Collectibles",
    },
  ];

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 mt-8 md:mt-12 pb-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key="merch-store"
    >
      {/* Featured Product */}
      <motion.div className="w-full mb-12" variants={itemVariants}>
        <h2 className="text-3xl md:text-4xl text-white font-laser mb-6">
          FEATURED GEAR
        </h2>

        <div className="relative w-full rounded-xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/2 aspect-square md:aspect-auto relative">
              <img
                src={
                  featuredProduct.image ||
                  "https://placehold.co/600x600/333/fff?text=Featured+Product"
                }
                alt={featuredProduct.title}
                className="w-full h-full object-cover"
              />
              {featuredProduct.badge && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {featuredProduct.badge}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl text-white font-bold font-tektur">
                  {featuredProduct.title}
                </h3>
                <p className="text-white/80 mt-3 mb-4 text-lg">
                  {featuredProduct.description}
                </p>

                <div className="text-2xl md:text-3xl text-white font-bold my-4">
                  ${featuredProduct.price}
                </div>
              </div>

              <div className="mt-6">
                <motion.button
                  className="w-full py-3 px-6 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaShoppingCart />
                  <span>ADD TO CART</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div className="mb-12" variants={itemVariants}>
        <h2 className="text-2xl md:text-3xl text-white font-laser mb-6">
          SHOP BY CATEGORY
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="relative h-40 rounded-lg overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              variants={itemVariants}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={
                    category.image ||
                    `https://placehold.co/400x200/222/fff?text=${category.name}`
                  }
                  alt={category.name}
                  className="h-full w-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-300"
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/30">
                <div className="text-3xl text-white mb-2">{category.icon}</div>
                <h3 className="text-xl text-white font-bold font-tektur">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm text-center mt-1">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div className="mb-12" variants={itemVariants}>
        <h2 className="text-2xl md:text-3xl text-white font-laser mb-6">
          BEST SELLERS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products
            .filter((product) => product.bestseller)
            .map((product, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg overflow-hidden group cursor-pointer"
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                variants={itemVariants}
              >
                {/* Product Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={
                      product.image ||
                      `https://placehold.co/300x300/222/fff?text=${product.name}`
                    }
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-white font-medium font-tektur line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white font-bold">
                      ${product.price}
                    </span>
                    <button className="text-white bg-red-600/80 hover:bg-red-600 p-1.5 rounded-full">
                      <FaShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* All Products */}
      <motion.div className="mb-12" variants={itemVariants}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl text-white font-laser">
            ALL PRODUCTS
          </h2>

          <div className="flex gap-2">
            <select className="bg-white/10 text-white border border-white/20 rounded px-3 py-1 text-sm">
              <option>All Categories</option>
              <option>Apparel</option>
              <option>Accessories</option>
              <option>Collectibles</option>
            </select>

            <select className="bg-white/10 text-white border border-white/20 rounded px-3 py-1 text-sm">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
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
              {/* Product Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={
                    product.image ||
                    `https://placehold.co/300x300/222/fff?text=${product.name}`
                  }
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <span className="text-white/60 text-xs">
                  {product.category}
                </span>
                <h3 className="text-white font-medium font-tektur line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white font-bold">${product.price}</span>
                  <button className="text-white bg-red-600/80 hover:bg-red-600 p-1.5 rounded-full">
                    <FaShoppingCart size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div
        className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6 md:p-8"
        variants={itemVariants}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="md:flex-1">
            <h3 className="text-2xl text-white font-bold font-tektur mb-2">
              JOIN THE CREW
            </h3>
            <p className="text-white/80">
              Sign up for our newsletter to get early access to drops, exclusive
              discounts, and behind-the-scenes content.
            </p>
          </div>

          <div className="md:w-1/2">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/20 text-white px-4 py-3 rounded-l-lg focus:outline-none focus:border-red-400"
              />
              <motion.button
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-3 rounded-r-lg flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaEnvelope />
                <span className="hidden md:inline">SUBSCRIBE</span>
              </motion.button>
            </div>
            <p className="text-white/60 text-xs mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MerchStore;
