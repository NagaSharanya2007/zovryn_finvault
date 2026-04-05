import RippleButton from "./RippleButton.jsx";
import { CATEGORY_COLORS } from "../data/initialData.js";

export default function TxRow({ tx, onDelete, isAdmin, idx }) {
  return (
    <div className="tx-row" style={{ animationDelay: `${idx * 40}ms` }}>
      <div className="tx-row-left">
        <div className="tx-icon-wrap">{tx.icon}</div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{tx.title}</p>
          <p className="text-xs text-white/40">{tx.date}</p>
        </div>
      </div>
      <div className="tx-row-right">
        <span
          className="tx-cat-badge"
          style={{
            background: `${CATEGORY_COLORS[tx.category] || "#6b7280"}22`,
            color: CATEGORY_COLORS[tx.category] || "#6b7280",
            border: `1px solid ${CATEGORY_COLORS[tx.category] || "#6b7280"}44`
          }}
        >
          {tx.category}
        </span>
        <span className={`text-sm font-bold tabular-nums ${tx.type === "income" ? "text-emerald-400" : "text-rose-400"}`}>
          {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString()}
        </span>
        {isAdmin && (
          <RippleButton onClick={() => onDelete(tx.id)} className="tx-delete-btn">
            ✕
          </RippleButton>
        )}
      </div>
    </div>
  );
}
