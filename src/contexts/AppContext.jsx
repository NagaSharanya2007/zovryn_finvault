import { createContext, useContext, useEffect, useState } from "react";
import { INITIAL_TRANSACTIONS } from "../data/initialData.js";

const AppContext = createContext();
const RUPEE_MULTIPLIER = 80;

function loadTransactions() {
  if (typeof window === "undefined") return INITIAL_TRANSACTIONS;
  const stored = localStorage.getItem("fin_data");
  const parsed = stored ? JSON.parse(stored) : null;
  const transactions = parsed?.transactions || null;

  if (!transactions) return INITIAL_TRANSACTIONS;

  const normalized = transactions.map((t) => ({ ...t, amount: Number(t.amount) }));
  const shouldMigrate = normalized.every((t) => !Number.isNaN(t.amount) && Math.abs(t.amount) < 5000);

  return shouldMigrate
    ? normalized.map((t) => ({ ...t, amount: Math.round(t.amount * RUPEE_MULTIPLIER) }))
    : normalized;
}

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [filter, setFilter] = useState(() => {
    if (typeof window === "undefined") return "all";
    const stored = localStorage.getItem("fin_data");
    const parsed = stored ? JSON.parse(stored) : null;
    return parsed?.filter || "all";
  });
  const [role, setRole] = useState(() => {
    if (typeof window === "undefined") return "admin";
    const stored = localStorage.getItem("fin_data");
    const parsed = stored ? JSON.parse(stored) : null;
    return parsed?.role || "admin";
  });
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("fin_data");
    const parsed = stored ? JSON.parse(stored) : null;
    return parsed?.dark ?? true;
  });

  useEffect(() => {
    localStorage.setItem("fin_data", JSON.stringify({ transactions, filter, role, dark, version: 2 }));
  }, [transactions, filter, role, dark]);

  const addTransaction = (tx) => setTransactions((p) => [{ ...tx, id: Date.now() }, ...p]);
  const deleteTransaction = (id) => setTransactions((p) => p.filter((t) => t.id !== id));

  return (
    <AppContext.Provider value={{ transactions, filter, setFilter, role, setRole, dark, setDark, addTransaction, deleteTransaction }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
