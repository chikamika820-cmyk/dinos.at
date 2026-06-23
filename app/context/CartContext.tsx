"use client";
import { createContext, useContext, useReducer } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  qty: number;
};

type State = { items: CartItem[]; open: boolean };
type Action =
  | { type: "ADD"; item: Omit<CartItem, "qty"> }
  | { type: "REMOVE"; id: string }
  | { type: "QTY"; id: string; qty: number }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "CLEAR" };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "ADD": {
      const ex = s.items.find(i => i.id === a.item.id);
      const items = ex
        ? s.items.map(i => i.id === a.item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...s.items, { ...a.item, qty: 1 }];
      return { items, open: true };
    }
    case "REMOVE": return { ...s, items: s.items.filter(i => i.id !== a.id) };
    case "QTY":    return { ...s, items: s.items.map(i => i.id === a.id ? { ...i, qty: a.qty } : i).filter(i => i.qty > 0) };
    case "OPEN":   return { ...s, open: true };
    case "CLOSE":  return { ...s, open: false };
    case "CLEAR":  return { ...s, items: [] };
    default:       return s;
  }
}

const Ctx = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], open: false });
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
