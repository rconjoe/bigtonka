import React, { createContext, useState, useContext, useEffect } from "react";
import { HttpTypes } from "@medusajs/types";
import { DEFAULT_REGION, medusa } from "../lib/medusa";

type CartContextType = {
  cart?: HttpTypes.StoreCart;
  setCart: React.Dispatch<
    React.SetStateAction<HttpTypes.StoreCart | undefined>
  >;
  refreshCart: () => void;
  addToCart: (variant_id: string) => void;
  cartCount: () => number;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  addOrderEmail: (email: string) => void;
  addOrderAddress: (
    billing_address: HttpTypes.StoreAddAddress,
    shipping_address: HttpTypes.StoreAddAddress,
  ) => void;
};

const CartContext = createContext<CartContextType | null>(null);

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<HttpTypes.StoreCart>();

  const region = DEFAULT_REGION;

  useEffect(() => {
    if (cart) {
      return;
    }

    const cartId = localStorage.getItem("cart_id");
    if (!cartId) {
      medusa.store.cart
        .create({
          region_id: region,
        })
        .then(({ cart: dataCart }) => {
          localStorage.setItem("cart_id", dataCart.id);
          setCart(dataCart);
        });
    } else {
      medusa.store.cart.retrieve(cartId).then(({ cart: dataCart }) => {
        setCart(dataCart);
      });
    }
  }, [cart]);

  const refreshCart = () => {
    localStorage.removeItem("cart_id");
    setCart(undefined);
  };

  const addToCart = (variant_id: string) => {
    const cartId = localStorage.getItem("cart_id");
    if (!cartId) {
      return;
    }

    medusa.store.cart
      .createLineItem(cartId, {
        variant_id,
        quantity: 1,
      })
      .then(({ cart: dataCart }) => {
        setCart(dataCart);
      });
  };

  const cartCount = () => {
    if (!cart || !cart.items) {
      return 0;
    }

    return cart.items.length;
  };

  const removeFromCart = (itemId: string) => {
    const cartId = localStorage.getItem("cart_id");
    if (!cartId) {
      return;
    }

    medusa.store.cart
      .deleteLineItem(cartId, itemId)
      .then(({ parent: dataCart }) => {
        setCart(dataCart);
      });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const cartId = localStorage.getItem("cart_id");
    if (!cartId) {
      return;
    }

    medusa.store.cart
      .updateLineItem(cartId, itemId, {
        quantity,
      })
      .then(({ cart: dataCart }) => {
        setCart(dataCart);
      });
  };

  const addOrderEmail = (email: string) => {
    const cartId = localStorage.getItem("cart_id");
    if (!cartId) {
      return;
    }

    try {
      medusa.store.cart
        .update(cartId, {
          email,
        })
        .then(({ cart: dataCart }) => {
          setCart(dataCart);
        });
    } catch (e) {
      alert(
        "There was an error during checkout (addOrderEmail). Please try again.",
      );
    }
  };

  const addOrderAddress = (
    billing_address: HttpTypes.StoreAddAddress,
    shipping_address: HttpTypes.StoreAddAddress,
  ) => {
    const cartId = localStorage.getItem("cart_id");
    if (!cartId) {
      return;
    }

    try {
      medusa.store.cart
        .update(cartId, {
          billing_address,
          shipping_address,
        })
        .then(({ cart: dataCart }) => {
          setCart(dataCart);
        });
    } catch (e) {
      alert(
        "There was an error during checkout (addOrderAddress). Please try again.",
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        refreshCart,
        addToCart,
        cartCount,
        removeFromCart,
        updateQuantity,
        addOrderEmail,
        addOrderAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart needs a CartProvider");
  }

  return context;
};
