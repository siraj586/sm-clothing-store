import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ShopContext = createContext(null);

const safeParseArray = (value) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === 'undefined') return [];
    return safeParseArray(localStorage.getItem('cartItems'));
  });

  const [favoriteItems, setFavoriteItems] = useState(() => {
    if (typeof window === 'undefined') return [];
    return safeParseArray(localStorage.getItem('favoriteItems'));
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const cartIdSet = useMemo(() => new Set(cartItems.map((i) => i.id)), [cartItems]);
  const favoriteIdSet = useMemo(
    () => new Set(favoriteItems.map((i) => i.id)),
    [favoriteItems]
  );

  const addToCart = (item) => {
    setCartItems((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleFavorite = (item) => {
    setFavoriteItems((prev) => {
      if (prev.some((p) => p.id === item.id)) {
        return prev.filter((p) => p.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isInCart = (id) => cartIdSet.has(id);
  const isFavorite = (id) => favoriteIdSet.has(id);

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        favoriteItems,
        addToCart,
        removeFromCart,
        toggleFavorite,
        isInCart,
        isFavorite,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
};

