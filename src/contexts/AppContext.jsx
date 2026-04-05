import { createContext, useContext, useEffect, useState } from "react";
import { INITIAL_TRANSACTIONS } from "../data/initialData.js";

const AppContext = createContext();

export function AppProvider({ children }) {
  const stored = typeof window !== "undefined" ? localStorage.getItem("fin_data") : null;
  const parsed = stored ? JSON.parse(stored) : null;

  const [transactions, setTransactions] = useState(parsed?.transactions || INITIAL_TRANSACTIONS);
  const [filter, setFilter] = useState(parsed?.filter || "all");
  const [role, setRole] = useState(parsed?.role || "admin");
  const [dark, setDark] = useState(parsed?.dark ?? true);

  useEffect(() => {
    localStorage.setItem("fin_data", JSON.stringify({ transactions, filter, role, dark }));
  }, [transactions, filter, role, dark]);

  const addTransaction = (tx) => setTransactions(p => [{ ...tx, id: Date.now() }, ...p]);
  const deleteTransaction = (id) => setTransactions(p => p.filter(t => t.id !== id));

  return (
    <AppContext.Provider value={{ transactions, filter, setFilter, role, setRole, dark, setDark, addTransaction, deleteTransaction }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
