import { ValueContext } from './ValueContext';
import { useMemo, useState, useEffect } from "react";
import { Toaster, toast } from 'sonner';
import { api } from '../lib/api';

export const ValueProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  // Auth state (very lightweight demo auth)
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const isAuth = !!user;

  const login = (payload) => {
    const u = payload || { name: "User", email: "user@example.com" };
    setUser(u);
    try { localStorage.setItem("user", JSON.stringify(u)); } catch {}
  };

  const logout = () => {
    setUser(null);
    try { localStorage.removeItem("user"); } catch {}
    // reset cart and related state for a fresh user session
    setCart([]);
    setCheckoutItem([]);
    setInstallChecked(false);
    try { localStorage.removeItem("cart"); } catch {}
  };

  // Initialize cart (persisted)
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const [checkoutItem, setCheckoutItem] = useState([]);
  const [installChecked, setInstallChecked] = useState(false);

  // const addToCart = (item, qty = 1) => {
  //   setCart((prev) => {
  //     const idx = prev.findIndex((cartItem) => cartItem.skuId === item.skuId);
  //     console.log(idx)
  //     if (idx >= 0) {
  //       const next = [...prev];
  //       next[idx] = { ...next[idx], quantity: (next[idx].quantity || 0) + qty };
  //       return next;
  //     }
  //     return [
  //       ...prev,
  //       {
  //         skuId: item.skuId,
  //         image: item.image,
  //         name: item.name,
  //         altText: item.altText || item.name,
  //         price: item.price,
  //         quantity: qty,
  //         checked: false,
  //       },
  //     ];
  //   });
  // };

  function addToCart(productId, name, color, quantity, price, image, altText, sample, variants) {
    if (!color || !productId) {
      return toast.warning("Please select a color.")
    }

    const variantName = sample === "trial" ? "สินค้าทดลอง" : "สี"
    const sku = variants.find(item => item.variantName === variantName && item.variantOption[0] === color[0]);
    //console.log(sku)
    const skuId = sku.skuID


    setCart((prev) => {
      const index = prev.findIndex((cartItem) => cartItem.skuId === skuId);
      if (index >= 0) {
        const next = [...prev];
        next[index] = { ...next[index], quantity: (next[index].quantity || 0) + quantity };
        toast.success('Added to cart', {duration: 1000})
        return next;
      }
      toast.success('Added to cart', {duration: 1000})
      return [
        ...prev,
        {
          productId: productId,
          skuId: skuId,
          image: image,
          name: name,
          variantName: variantName,
          color: color,
          altText: altText,
          price: price,
          quantity: quantity,
          checked: false,
        },
      ];
    });
  }

  const removeFromCart = (skuId) => {
    setCart((prev) => prev.filter((x) => x.skuId !== skuId));
  };

  const removeChecked = async (cart) => {

    try {

    const deleteCart = cart
      .filter((item) => item.checked)
      .map((item) =>
        api.delete(`/cart/items/${item.productId}/${item.variantId}`)
      );

    await Promise.all(deleteCart);
      
    } catch (error) {
    console.error("Failed to remove items:", error);
    alert("Failed to remove some items. Please try again.");
    }

    
    
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, it) => sum + (it.quantity || 0), 0),
    [cart]
  );

  return (
    <ValueContext.Provider
      value={{
        // auth
        user,
        isAuth,
        login,
        logout,
        setUser,
        cart,
        setCart,
        checkoutItem,
        setCheckoutItem,
        installChecked,
        setInstallChecked,
        addToCart,
        removeFromCart,
        removeChecked,
        cartCount,
        isModalOpen,
        setIsModalOpen,
        product, setProduct
      }}
    >
      {children}
    </ValueContext.Provider>
  );
};
