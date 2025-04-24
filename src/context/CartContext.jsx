"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// 1. Create the Context
const CartContext = createContext();

// 2. Create a Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // --- Persistence with localStorage (Optional but Recommended) ---
  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("shoppingCart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length >= 0) {
      // Check length >= 0 to save even when cart becomes empty
      localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
    }
  }, [cartItems]);
  // --- End Persistence ---

  // --- Cart Logic Functions ---
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if item already exists
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Increase quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  const updateQuantity = (productId, quantity) => {
    const newQuantity = Math.max(1, quantity); // Ensure quantity is at least 1
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // --- Derived State (Calculations) ---
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // 3. Provide the state and functions to children
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 4. Create a Custom Hook for easy access
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
