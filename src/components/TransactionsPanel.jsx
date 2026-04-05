import { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext.jsx";
import RippleButton from "./RippleButton.jsx";
import Shimmer from "./Shimmer.jsx";
import TxRow from "./TxRow.jsx";

export default function TransactionsPanel({ onAddTx }) {
  const { transactions, filter, setFilter, role, deleteTransaction } = useApp();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = transactions
    .filter((t) => filter === "all" || t.type === filter)
    .filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "amount") return sortDir === "desc" ? b.amount - a.amount : a.amount - b.amount;
      return sortDir === "desc" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
    });

  const toggleSort = (field) => {
    if (sort === field) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    else {
      setSort(field);
      setSortDir("desc");
    }
  };

  return (
    <div className="section-card">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">Transactions</h3>
          <p className="text-xs text-white/40">{filtered.length} records</p>
        </div>
        <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
          <div className="search-wrap-container">
            <div className="search-wrap flex-1 sm:flex-none">
              <span className="search-icon">🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transactions…"
                className="search-input"
              />
            </div>
            {role === "admin" && (
              <RippleButton onClick={onAddTx} className="add-btn-inline">
                <span className="font-bold">+</span> Add
              </RippleButton>
            )}
          </div>
        </div>
      </div>

      <div className="tx-actions flex flex-wrap items-center gap-2 mb-4">
        <div className="filter-group flex flex-wrap gap-2">
          {["all", "income", "expense"].map((f) => (
            <RippleButton
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn ${filter === f ? "filter-btn-active" : ""}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </RippleButton>
          ))}
        </div>
        <div className="sort-group ml-auto flex flex-wrap gap-2">
          <RippleButton onClick={() => toggleSort("date")} className="sort-btn">
            Date {sort === "date" ? (sortDir === "desc" ? "↓" : "↑") : ""}
          </RippleButton>
          <RippleButton onClick={() => toggleSort("amount")} className="sort-btn">
            Amount {sort === "amount" ? (sortDir === "desc" ? "↓" : "↑") : ""}
          </RippleButton>
        </div>
      </div>

      <div className="tx-list">
        {loading ? (
          [1, 2, 3, 4].map((i) => <Shimmer key={i} className="h-16 mb-2" />)
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="text-4xl mb-3">🪣</div>
            <p className="text-white/40 text-sm">No transactions found</p>
          </div>
        ) : (
          filtered.map((tx, i) => (
            <div key={tx.id} className="group/row">
              <TxRow tx={tx} onDelete={deleteTransaction} isAdmin={role === "admin"} idx={i} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
