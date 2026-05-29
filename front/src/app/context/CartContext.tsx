import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { cartAPI, balanceAPI } from "../api/api";

export interface CartItem {
  id?: string;
  productId: number;
  name: string;
  description: string;
  price: string;
  priceNum: number;
  image: string;
  qty: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
}

interface CartContextType {
  items: CartItem[];
  user: User | null;
  token: string | null;
  addItem: (product: { id: number; name: string; description: string; price: string; priceNum: number; image: string }) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  updateQty: (productId: number, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  count: number;
  login: (token: string, user: User) => void;
  logout: () => void;
  loadCart: () => Promise<void>;
  topupBalance: (amount: number) => Promise<void>;
  isLoggedIn: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      const userData = JSON.parse(storedUser);
      setUser(userData);
      loadCartFromAPI(storedToken);
    }
    setLoading(false);
  }, []);

  const loadCartFromAPI = async (authToken: string) => {
    try {
      const response = await cartAPI.getCart(authToken);
      if (response.success) {
        setItems(response.cart || []);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addItem = useCallback(async (product: { id: number; name: string; description: string; price: string; priceNum: number; image: string }) => {
    if (!token) {
      alert('Please login first');
      return;
    }

    try {
      const response = await cartAPI.addItem(token, {
        productId: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        priceNum: product.priceNum,
        image: product.image,
      });

      if (response.success) {
        setItems(response.cart);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }, [token]);

  const removeItem = useCallback(async (productId: number) => {
    if (!token) return;

    try {
      const response = await cartAPI.removeItem(token, productId);
      if (response.success) {
        setItems(response.cart);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }, [token]);

  const updateQty = useCallback(async (productId: number, qty: number) => {
    if (!token) return;
    if (qty < 1) return;

    try {
      const response = await cartAPI.updateQty(token, productId, qty);
      if (response.success) {
        setItems(response.cart);
      }
    } catch (error) {
      console.error('Error updating qty:', error);
    }
  }, [token]);

  const clearCart = useCallback(async () => {
    if (!token) return;

    try {
      const response = await cartAPI.clear(token);
      if (response.success) {
        setItems([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }, [token]);

  const login = useCallback((authToken: string, userData: User) => {
    setToken(authToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setItems([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const loadCart = useCallback(async () => {
    if (!token) return;
    await loadCartFromAPI(token);
  }, [token]);

  const topupBalance = useCallback(async (amount: number) => {
    if (!token || !user) return;

    try {
      const response = await balanceAPI.topup(token, amount);
      if (response.success) {
        setUser({ ...user, balance: response.balance });
        localStorage.setItem('user', JSON.stringify({ ...user, balance: response.balance }));
      }
    } catch (error) {
      console.error('Error topping up balance:', error);
      throw error;
    }
  }, [token, user]);

  const total = items.reduce((sum, i) => sum + i.priceNum * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQty, 
      clearCart, 
      total, 
      count,
      user,
      token,
      login,
      logout,
      loadCart,
      topupBalance,
      isLoggedIn: !!token,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
