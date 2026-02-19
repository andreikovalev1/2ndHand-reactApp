import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '@/features/shop/types';
import { useAuth } from '@/features/auth/hooks/use-auth';

interface ShopContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cart: Product[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  checkInCart: (productId: number) => boolean;
  checkInFavorites: (productId: number) => boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Уникальный ключ для каждого пользователя
  const userKey = useMemo(() => (user ? `user_${user.id}` : null), [user]);

  // ЗАГРУЗКА: Срабатывает при логине или смене пользователя
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userKey) {
        const savedCart = localStorage.getItem(`${userKey}_cart`);
        const savedFavs = localStorage.getItem(`${userKey}_favorites`);
        
        setCart(savedCart ? JSON.parse(savedCart) : []);
        setFavorites(savedFavs ? JSON.parse(savedFavs) : []);
      } else {
        // Если пользователь вышел — только очищаем стейт в памяти
        setCart([]);
        setFavorites([]);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [userKey]);

  // МЕТОДЫ С ПРЯМОЙ ЗАПИСЬЮ:
  // Мы сохраняем в localStorage только здесь, чтобы избежать затирания данных при Logout

  const addToCart = (product: Product) => {
    if (!userKey) return;
    setCart((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      const next = [...prev, product];
      localStorage.setItem(`${userKey}_cart`, JSON.stringify(next));
      return next;
    });
  };

  const removeFromCart = (productId: number) => {
    if (!userKey) return;
    setCart((prev) => {
      const next = prev.filter((p) => p.id !== productId);
      localStorage.setItem(`${userKey}_cart`, JSON.stringify(next));
      return next;
    });
  };

  const toggleFavorite = (product: Product) => {
    if (!userKey) return;
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      const next = exists
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];
      
      localStorage.setItem(`${userKey}_favorites`, JSON.stringify(next));
      return next;
    });
  };

  const checkInCart = (id: number) => cart.some((p) => p.id === id);
  const checkInFavorites = (id: number) => favorites.some((p) => p.id === id);

  return (
    <ShopContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        cart,
        favorites,
        addToCart,
        removeFromCart,
        toggleFavorite,
        checkInCart,
        checkInFavorites,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}