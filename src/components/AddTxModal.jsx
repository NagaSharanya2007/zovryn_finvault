import { useState } from "react";
import { useApp } from "../contexts/AppContext.jsx";
import RippleButton from "./RippleButton.jsx";

const ICONS = {
  Food: "🛒",
  Entertainment: "🎬",
  Utilities: "⚡",
  Health: "🏋️",
  Transport: "🚗",
  Shopping: "📦",
  Income: "💼",
  Other: "💰"
};

export default function AddTxModal({ open, onClose }) {
  const { addTransaction } = useApp();
  const [form, setForm] = useState({ title: "", amount: "", category: "Food", type: "expense", date: new Date().toISOString().slice(0, 10) });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title required";
    if (!form.amount || isNaN(form.amount) || +form.amount <= 0) e.amount = "Valid amount required";
    if (!form.date) e.date = "Date required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      addTransaction({ ...form, amount: +form.amount, icon: ICONS[form.category] || "💰" });
      setForm({ title: "", amount: "", category: "Food", type: "expense", date: new Date().toISOString().slice(0, 10) });
      setErrors({});
      setSubmitting(false);
      onClose();
    }, 600);
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <RippleButton onClick={onClose} className="modal-close-btn-top">✕</RippleButton>
        <div className="mb-6">
          <h3 style={{ color: 'var(--text)' }} className="text-xl font-black">Add Transaction</h3>
        </div>

        <div className="modal-pill-row mb-5">
          {["expense", "income"].map((t) => (
            <RippleButton
              key={t}
              onClick={() => setForm((f) => ({ ...f, type: t }))}
              className={`modal-pill-btn ${form.type === t ? (t === "income" ? "modal-pill-active income" : "modal-pill-active expense") : "modal-pill-inactive"}`}>
              {t === "income" ? "📈 Income" : "📉 Expense"}
            </RippleButton>
          ))}
        </div>

        {[
          { label: "Description", key: "title", type: "text", placeholder: "e.g. Netflix subscription" },
          { label: "Amount (₹)", key: "amount", type: "number", placeholder: "0.00" },
          { label: "Date", key: "date", type: "date", placeholder: "" }
        ].map((field) => (
          <div key={field.key} className="mb-4">
            <label className="modal-label">{field.label}</label>
            <input
              type={field.type}
              value={form[field.key]}
              placeholder={field.placeholder}
              onChange={(e) => {
                setForm((p) => ({ ...p, [field.key]: e.target.value }));
                setErrors((p) => ({ ...p, [field.key]: "" }));
              }}
              className={`modal-input ${errors[field.key] ? "border-rose-500/50" : ""}`}
            />
            {errors[field.key] && <p className="text-xs text-rose-400 mt-1">{errors[field.key]}</p>}
          </div>
        ))}

        <div className="mb-6">
          <label className="modal-label">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            className="modal-input"
          >
            {Object.keys(ICONS).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <RippleButton
          onClick={handleSubmit}
          disabled={submitting}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-300 ${submitting ? "bg-white/10" : "bg-gradient-to-r from-cyan-500 to-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"}`}
        >
          {submitting ? "Adding…" : "Add Transaction ✦"}
        </RippleButton>
      </div>
    </div>
  );
}
