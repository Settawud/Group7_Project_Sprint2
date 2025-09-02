import { ValueContext } from './ValueContext';
import { useMemo, useState, useEffect } from "react";

export const ValueProvider = ({ children }) => {
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

  const addToCart = (item, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.skuId === item.skuId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: (next[idx].quantity || 0) + qty };
        return next;
      }
      return [
        ...prev,
        {
          skuId: item.skuId,
          image: item.image,
          name: item.name,
          altText: item.altText || item.name,
          price: item.price,
          quantity: qty,
          checked: false,
        },
      ];
    });
  };

  const removeFromCart = (skuId) => {
    setCart((prev) => prev.filter((x) => x.skuId !== skuId));
  };

  const removeChecked = () => {
    setCart((prev) => prev.filter((x) => !x.checked));
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
        // cart
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
      }}
    >
      {children}
    </ValueContext.Provider>
  );
};
