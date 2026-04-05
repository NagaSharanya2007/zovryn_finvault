import { useState, useEffect, useContext, createContext, useRef, useCallback } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Sector
} from "recharts";

// ── Auth Context ───────────────────────────────────────────────────────────
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("fin_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = (email, password, name) => {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPassword = String(password || "").trim();
    if (!normalizedEmail || !normalizedPassword) {
      return { success: false, message: "Email and password are required" };
    }
    const users = JSON.parse(localStorage.getItem("fin_users") || "[]");
    if (users.find(u => String(u.email || "").trim().toLowerCase() === normalizedEmail)) {
      return { success: false, message: "Email already registered" };
    }
    const newUser = { id: Date.now(), email: normalizedEmail, password: normalizedPassword, name: String(name || "").trim() };
    users.push(newUser);
    localStorage.setItem("fin_users", JSON.stringify(users));
    localStorage.setItem("fin_user", JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPassword = String(password || "").trim();
    if (!normalizedEmail || !normalizedPassword) {
      return { success: false, message: "Email and password are required" };
    }
    const users = JSON.parse(localStorage.getItem("fin_users") || "[]");
    const foundUser = users.find(
      u => String(u.email || "").trim().toLowerCase() === normalizedEmail && u.password === normalizedPassword
    );
    if (foundUser) {
      localStorage.setItem("fin_user", JSON.stringify(foundUser));
      setUser(foundUser);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const logout = () => {
    localStorage.removeItem("fin_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() { return useContext(AuthContext); }

// ── App Context ────────────────────────────────────────────────────────────
const AppContext = createContext();

const INITIAL_TRANSACTIONS = [
  { id: 1, title: "Salary Deposit", amount: 5800, category: "Income", type: "income", date: "2025-01-01", icon: "💼" },
  { id: 2, title: "Netflix", amount: 15, category: "Entertainment", type: "expense", date: "2025-01-03", icon: "🎬" },
  { id: 3, title: "Grocery Store", amount: 120, category: "Food", type: "expense", date: "2025-01-05", icon: "🛒" },
  { id: 4, title: "Freelance Project", amount: 1200, category: "Income", type: "income", date: "2025-01-08", icon: "💻" },
  { id: 5, title: "Electricity Bill", amount: 85, category: "Utilities", type: "expense", date: "2025-01-10", icon: "⚡" },
  { id: 6, title: "Restaurant Dinner", amount: 67, category: "Food", type: "expense", date: "2025-01-12", icon: "🍽️" },
  { id: 7, title: "Gym Membership", amount: 45, category: "Health", type: "expense", date: "2025-01-15", icon: "🏋️" },
  { id: 8, title: "Dividend Income", amount: 340, category: "Income", type: "income", date: "2025-01-18", icon: "📈" },
  { id: 9, title: "Uber Rides", amount: 32, category: "Transport", type: "expense", date: "2025-01-20", icon: "🚗" },
  { id: 10, title: "Coffee Shop", amount: 28, category: "Food", type: "expense", date: "2025-01-22", icon: "☕" },
  { id: 11, title: "Amazon Shopping", amount: 156, category: "Shopping", type: "expense", date: "2025-01-24", icon: "📦" },
  { id: 12, title: "Consulting Fee", amount: 900, category: "Income", type: "income", date: "2025-01-26", icon: "🤝" },
];

const BALANCE_TREND = [
  { month: "Aug", balance: 8200 }, { month: "Sep", balance: 9100 },
  { month: "Oct", balance: 7800 }, { month: "Nov", balance: 10200 },
  { month: "Dec", balance: 11500 }, { month: "Jan", balance: 12840 },
];

const CATEGORY_COLORS = {
  Food: "#f97316", Entertainment: "#8b5cf6", Utilities: "#06b6d4",
  Health: "#10b981", Transport: "#f59e0b", Shopping: "#ec4899",
  Income: "#22c55e", Other: "#6b7280"
};

function AppProvider({ children }) {
  const stored = typeof window !== "undefined" ? localStorage.getItem("fin_data") : null;
  const parsed = stored ? JSON.parse(stored) : null;

  const [transactions, setTransactions] = useState(parsed?.transactions || INITIAL_TRANSACTIONS);
  const [filter, setFilter] = useState("all");
  const [role, setRole] = useState(parsed?.role || "admin");
  const [dark, setDark] = useState(parsed?.dark ?? true);

  useEffect(() => {
    localStorage.setItem("fin_data", JSON.stringify({ transactions, role, dark }));
  }, [transactions, role, dark]);

  const addTransaction = (tx) => setTransactions(p => [{ ...tx, id: Date.now() }, ...p]);
  const deleteTransaction = (id) => setTransactions(p => p.filter(t => t.id !== id));

  return (
    <AppContext.Provider value={{ transactions, filter, setFilter, role, setRole, dark, setDark, addTransaction, deleteTransaction }}>
      {children}
    </AppContext.Provider>
  );
}

// ── Hooks ──────────────────────────────────────────────────────────────────
function useApp() { return useContext(AppContext); }

function useScrollTrigger() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const startRef = useRef(null);
  useEffect(() => {
    setCount(0);
    startRef.current = null;
    let raf;
    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return count;
}

// ── Ripple Button ──────────────────────────────────────────────────────────
function RippleButton({ children, onClick, className = "", disabled = false }) {
  const [ripples, setRipples] = useState([]);
  const handleClick = (e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(p => [...p, { x, y, id }]);
    setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 700);
    onClick?.(e);
  };
  return (
    <button onClick={handleClick} disabled={disabled}
      className={`relative overflow-hidden ${className}`}>
      {children}
      {ripples.map(r => (
        <span key={r.id} className="ripple-effect"
          style={{ left: r.x, top: r.y }} />
      ))}
    </button>
  );
}

// ── Shimmer ────────────────────────────────────────────────────────────────
function Shimmer({ className = "" }) {
  return <div className={`shimmer-box rounded-xl ${className}`} />;
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, gradient, delta }) {
  const count = useCountUp(value);
  return (
    <div className={`stat-card ${gradient} group`}>
      <div className="floating-card-inner">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">{label}</p>
            <p className="text-3xl font-black text-white tabular-nums">
              ₹{count.toLocaleString()}
            </p>
            {delta !== undefined && (
              <p className={`text-xs mt-1 font-semibold ${delta >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}% vs last month
              </p>
            )}
          </div>
          <div className="card-icon-bubble text-2xl">{icon}</div>
        </div>
        <div className="card-bar-track mt-4">
          <div className="card-bar-fill" style={{ width: `${Math.min((value / 12000) * 100, 100)}%` }} />
        </div>
      </div>
    </div>
  );
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────
function CustomLineTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-tooltip">
      <p className="text-xs text-white/50 mb-1">{label}</p>
      <p className="text-lg font-bold text-white">₹{payload[0].value.toLocaleString()}</p>
    </div>
  );
}

function CustomPieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-tooltip">
      <p className="font-semibold text-white">{payload[0].name}</p>
      <p className="text-emerald-300">₹{payload[0].value.toLocaleString()}</p>
    </div>
  );
}

// ── Scroll Trigger Wrapper ────────────────────────────────────────────────
function ScrollSection({ children, className = "" }) {
  const { ref, isVisible } = useScrollTrigger();
  return (
    <section ref={ref} className={`scroll-section ${isVisible ? "scroll-visible" : ""} ${className}`}>
      {children}
    </section>
  );
}

// ── Chart Cards ────────────────────────────────────────────────────────────
function BalanceTrendChart() {
  const { dark } = useApp();
  const axisColor = dark ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.55)";
  const gridColor = dark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.12)";
  const lineColor = dark ? "#22d3ee" : "#0f4f8f";
  const dotStroke = dark ? "#0f172a" : "#ffffff";
  const activeDotStroke = dark ? "#fff" : "#0f172a";

  return (
    <div className="chart-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Balance Trend</h3>
          <p className="text-xs text-white/40">Last 6 months</p>
        </div>
        <span className="badge-green">+12.4%</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={BALANCE_TREND} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
          <Tooltip content={<CustomLineTooltip />} />
          <Line type="monotone" dataKey="balance" stroke={lineColor} strokeWidth={3}
            dot={{ fill: lineColor, r: 5, strokeWidth: 2, stroke: dotStroke }}
            activeDot={{ r: 8, fill: lineColor, stroke: activeDotStroke, strokeWidth: 2 }}
            animationDuration={1500} animationEasing="ease-out" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Donut Chart ────────────────────────────────────────────────────────────
function SpendingDonut({ transactions }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const expenses = transactions.filter(t => t.type === "expense");
  const byCat = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const data = Object.entries(byCat).map(([name, value]) => ({ name, value }));

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius - 4} outerRadius={outerRadius + 8}
          startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={0.9} />
      </g>
    );
  };

  return (
    <div className="chart-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Spending Breakdown</h3>
          <p className="text-xs text-white/40">By category</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={52} outerRadius={80}
              dataKey="value" animationBegin={0} animationDuration={1200}
              activeIndex={activeIndex} activeShape={renderActiveShape}
              onMouseEnter={(_, i) => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}>
              {data.map((entry, i) => (
                <Cell key={i} fill={CATEGORY_COLORS[entry.name] || "#6b7280"}
                  stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="spending-legend flex-1 w-full">
          {data.map((d, i) => (
            <div key={i} className="spending-legend-row"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}>
              <div className="spending-legend-label">
                <span className="legend-dot"
                  style={{ background: CATEGORY_COLORS[d.name] || "#6b7280" }} />
                <span>{d.name}</span>
              </div>
              <span className="legend-value">₹{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Transaction Row ────────────────────────────────────────────────────────
function TxRow({ tx, onDelete, isAdmin, idx }) {
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
        <span className="tx-cat-badge"
          style={{ background: `${CATEGORY_COLORS[tx.category] || "#6b7280"}22`,
                   color: CATEGORY_COLORS[tx.category] || "#6b7280",
                   border: `1px solid ${CATEGORY_COLORS[tx.category] || "#6b7280"}44` }}>
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

// ── Transactions Panel ─────────────────────────────────────────────────────
function TransactionsPanel({ onAddTx }) {
  const { transactions, filter, setFilter, role, deleteTransaction } = useApp();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = transactions
    .filter(t => filter === "all" || t.type === filter)
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()) ||
                 t.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "amount") return sortDir === "desc" ? b.amount - a.amount : a.amount - b.amount;
      return sortDir === "desc" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
    });

  const toggleSort = (field) => {
    if (sort === field) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSort(field); setSortDir("desc"); }
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
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search transactions…" className="search-input" />
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
          {["all","income","expense"].map(f => (
            <RippleButton key={f} onClick={() => setFilter(f)}
              className={`filter-btn ${filter === f ? "filter-btn-active" : ""}`}>
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
          [1,2,3,4].map(i => <Shimmer key={i} className="h-16 mb-2" />)
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

// ── Add Transaction Modal ──────────────────────────────────────────────────
function AddTxModal({ open, onClose }) {
  const { addTransaction } = useApp();
  const [form, setForm] = useState({ title: "", amount: "", category: "Food", type: "expense", date: new Date().toISOString().slice(0,10) });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const ICONS = { Food: "🛒", Entertainment: "🎬", Utilities: "⚡", Health: "🏋️", Transport: "🚗", Shopping: "📦", Income: "💼", Other: "💰" };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title required";
    if (!form.amount || isNaN(form.amount) || +form.amount <= 0) e.amount = "Valid amount required";
    if (!form.date) e.date = "Date required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    setTimeout(() => {
      addTransaction({ ...form, amount: +form.amount, icon: ICONS[form.category] || "💰" });
      setForm({ title: "", amount: "", category: "Food", type: "expense", date: new Date().toISOString().slice(0,10) });
      setErrors({});
      setSubmitting(false);
      onClose();
    }, 600);
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-white">Add Transaction</h3>
          <RippleButton onClick={onClose} className="modal-close-btn">✕</RippleButton>
        </div>

        <div className="modal-pill-row mb-5">
          {["expense","income"].map(t => (
            <RippleButton key={t} onClick={() => setForm(f => ({ ...f, type: t }))}
              className={`modal-pill-btn ${form.type === t ? (t === "income" ? "modal-pill-active income" : "modal-pill-active expense") : "modal-pill-inactive"}`}>
              {t === "income" ? "📈 Income" : "📉 Expense"}
            </RippleButton>
          ))}
        </div>

        {[
          { label: "Description", key: "title", type: "text", placeholder: "e.g. Netflix subscription" },
          { label: "Amount (₹)", key: "amount", type: "number", placeholder: "0.00" },
          { label: "Date", key: "date", type: "date", placeholder: "" },
        ].map(f => (
          <div key={f.key} className="mb-4">
            <label className="modal-label">{f.label}</label>
            <input type={f.type} value={form[f.key]} placeholder={f.placeholder}
              onChange={e => { setForm(p => ({ ...p, [f.key]: e.target.value })); setErrors(p => ({ ...p, [f.key]: "" })); }}
              className={`modal-input ${errors[f.key] ? "border-rose-500/50" : ""}`} />
            {errors[f.key] && <p className="text-xs text-rose-400 mt-1">{errors[f.key]}</p>}
          </div>
        ))}

        <div className="mb-6">
          <label className="modal-label">Category</label>
          <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
            className="modal-input">
            {Object.keys(ICONS).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <RippleButton onClick={handleSubmit} disabled={submitting}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-300 ${submitting ? "bg-white/10" : "bg-gradient-to-r from-cyan-500 to-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"}`}>
          {submitting ? "Adding…" : "Add Transaction ✦"}
        </RippleButton>
      </div>
    </div>
  );
}

// ── Insights ───────────────────────────────────────────────────────────────
function InsightsPanel({ transactions }) {
  const expenses = transactions.filter(t => t.type === "expense");
  const income = transactions.filter(t => t.type === "income");

  const byCat = expenses.reduce((a, t) => { a[t.category] = (a[t.category]||0)+t.amount; return a; }, {});
  const topCat = Object.entries(byCat).sort((a,b)=>b[1]-a[1])[0];

  const totalExpenses = expenses.reduce((a,t)=>a+t.amount,0);
  const totalIncome = income.reduce((a,t)=>a+t.amount,0);
  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;

  const insights = [
      { label: "Top Spending", value: topCat ? `${topCat[0]}` : "—", sub: topCat ? `₹${topCat[1]}` : "", color: "#f97316", icon: "🔥" },
      { label: "Savings Rate", value: `${savingsRate}%`, sub: "of income", color: "#22c55e", icon: "💰" },
      { label: "Avg. Transaction", value: `₹${Math.round(totalExpenses / (expenses.length||1))}`, sub: "per expense", color: "#8b5cf6", icon: "📊" },
  ];

  return (
    <div className="section-card">
      <h3 className="text-lg font-bold text-white mb-4">Smart Insights</h3>
      <div className="grid grid-cols-2 gap-3">
        {insights.map((ins, i) => (
          <div key={i} className="insight-card group" style={{ "--ins-color": ins.color }}>
            <div className="flex items-start gap-2">
              <span className="text-xl">{ins.icon}</span>
              <div>
                <p className="text-xs text-white/40">{ins.label}</p>
                <p className="text-base font-black" style={{ color: ins.color }}>{ins.value}</p>
                <p className="text-xs text-white/30">{ins.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Login Page ─────────────────────────────────────────────────────────────
function LoginPage() {
  const { register, login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isSignup) {
      if (!name.trim()) {
        setError("Name is required");
        setLoading(false);
        return;
      }
      const result = register(email, password, name);
      if (!result.success) {
        setError(result.message);
      }
    } else {
      const result = login(email, password);
      if (!result.success) {
        setError(result.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-bg" />
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">✦</div>
            <h1 className="login-title">FinVault</h1>
          </div>

          <div className="login-tabs">
            <button
              className={`login-tab ${!isSignup ? "login-tab-active" : ""}`}
              onClick={() => { setIsSignup(false); setError(""); }}>
              Sign In
            </button>
            <button
              className={`login-tab ${isSignup ? "login-tab-active" : ""}`}
              onClick={() => { setIsSignup(true); setError(""); }}>
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {isSignup && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="form-input"
                  disabled={loading}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
                disabled={loading}
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="login-btn">
              {loading ? "Loading..." : (isSignup ? "Create Account" : "Sign In")}
            </button>
          </form>

          <p className="login-footer">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={() => { setIsSignup(!isSignup); setError(""); }}
              className="login-toggle">
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────
function Header() {
  const { role, setRole, dark, setDark } = useApp();
  const { logout } = useAuth();
  const totalBalance = 12840;

  return (
    <header className="header-bar">
      <div className="flex items-center gap-3">
        <div className="logo-mark">✦</div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-black text-white tracking-tight">FinVault</h1>
          <p className="text-xs text-white/30">Personal Finance</p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-nowrap">
        <select value={role} onChange={e => setRole(e.target.value)} className="role-select">
          <option value="admin">👑 Admin</option>
          <option value="viewer">👁 Viewer</option>
        </select>
        <RippleButton onClick={() => setDark(d => !d)} className="icon-btn">{dark ? "☀️" : "🌙"}</RippleButton>
        <RippleButton onClick={logout} className="logout-btn">Logout</RippleButton>
      </div>
    </header>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
function AppContent() {  const { transactions, dark } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const totalBalance = transactions.reduce((a, t) => t.type === "income" ? a + t.amount : a - t.amount, 0) + 8000;
  const totalIncome = transactions.filter(t => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((a, t) => a + t.amount, 0);

  return (
    <div className={`app-shell ${dark ? "dark" : "light"}`}>
      <div className="bg-mesh" />
      <div className="content-wrap">
        <Header />

        <main className="main-grid">
          {/* Stat Cards */}
          <section className="stats-row">
            <StatCard label="Total Balance" value={totalBalance} icon="🏦"
              gradient="grad-blue" delta={12.4} />
            <StatCard label="Monthly Income" value={totalIncome} icon="📈"
              gradient="grad-green" delta={8.2} />
            <StatCard label="Monthly Expenses" value={totalExpenses} icon="📉"
              gradient="grad-red" delta={-3.1} />
          </section>

          {/* Balance trend */}
          <ScrollSection className="charts-row">
            <BalanceTrendChart />
          </ScrollSection>

          {/* Spending breakdown */}
          <ScrollSection className="charts-row">
            <SpendingDonut transactions={transactions} />
          </ScrollSection>

          {/* Smart insights */}
          <ScrollSection className="charts-row">
            <InsightsPanel transactions={transactions} />
          </ScrollSection>

          {/* Transactions list */}
          <ScrollSection className="charts-row">
            <TransactionsPanel onAddTx={() => setModalOpen(true)} />
          </ScrollSection>
        </main>
      </div>

      <AddTxModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <style>{CSS}</style>
        <MainApp />
      </AppProvider>
    </AuthProvider>
  );
}

function MainApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-shell dark" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <p style={{ color: "white", fontSize: "18px" }}>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <AppContent />;
}

// ── Styles ─────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;900&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* Login Page */
.login-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #060912 0%, #0a1428 100%);
  padding: 20px;
}

.login-bg {
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 seed=%222%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22 opacity=%220.03%22/%3E%3C/svg%3E');
  opacity: 0.5;
  pointer-events: none;
}

.login-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
}

.login-card {
  background: rgba(13, 22, 38, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.6);
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
}

.login-logo {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #22d3ee, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 900;
  color: white;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
}

.login-title {
  font-size: 28px;
  font-weight: 900;
  color: white;
  tracking: tight;
}

.login-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.login-tab {
  flex: 1;
  padding: 14px 0;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
}

.login-tab:hover {
  color: rgba(255, 255, 255, 0.7);
}

.login-tab-active {
  color: #22d3ee;
}

.login-tab-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #22d3ee;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-input:focus {
  border-color: rgba(34, 211, 238, 0.5);
  box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.1);
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.form-error {
  font-size: 12px;
  color: #f472b6;
  margin-top: -12px;
}

.login-btn {
  width: 100%;
  padding: 12px 18px;
  margin-top: 8px;
  border-radius: 12px;
  background: linear-gradient(135deg, #22d3ee, #8b5cf6);
  color: white;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.6);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-footer {
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 18px;
}

.login-toggle {
  background: none;
  border: none;
  color: #22d3ee;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s;
}

.login-toggle:hover {
  color: #06b6d4;
}

:root {
  --bg: #060912;
  --surface: rgba(255,255,255,0.04);
  --surface2: rgba(255,255,255,0.07);
  --border: rgba(255,255,255,0.08);
  --text: #ffffff;
  --text-muted: rgba(255,255,255,0.4);
  --control-bg: rgba(255,255,255,0.05);
  --control-bg-strong: rgba(255,255,255,0.08);
  --control-border: rgba(255,255,255,0.12);
  --control-text: rgba(255,255,255,0.75);
  --cyan: #22d3ee;
  --violet: #8b5cf6;
  --emerald: #10b981;
  --rose: #f43f5e;
}

.app-shell { font-family: 'DM Sans', sans-serif; min-height: 100vh; position: relative; overflow-x: hidden; background: var(--bg); color: var(--text); }
.app-shell.light {
  --bg: #f0f4ff;
  --surface: rgba(255,255,255,0.95);
  --surface2: rgba(255,255,255,0.92);
  --border: rgba(15,23,42,0.12);
  --text: #0f172a;
  --text-muted: rgba(15,23,42,0.55);
  --control-bg: rgba(15,23,42,0.06);
  --control-bg-strong: rgba(15,23,42,0.14);
  --control-border: rgba(15,23,42,0.12);
  --control-text: rgba(15,23,42,0.78);
}

/* Animated mesh background */
.bg-mesh {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 80% 60% at 10% 20%, rgba(34,211,238,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 70%, rgba(139,92,246,0.1) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 50% 50%, rgba(16,185,129,0.05) 0%, transparent 60%);
  animation: meshFloat 12s ease-in-out infinite alternate;
}
@keyframes meshFloat {
  from { opacity: 0.8; transform: scale(1); }
  to   { opacity: 1;   transform: scale(1.05) rotate(1deg); }
}

.content-wrap { position: relative; z-index: 1; max-width: 1400px; margin: 0 auto; padding: 0 20px 40px; }

/* Header */
.header-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 0; margin-bottom: 8px;
  border-bottom: 1px solid var(--border);
}
.logo-mark {
  width: 36px; height: 36px; border-radius: 10px;
  background: linear-gradient(135deg, #22d3ee, #8b5cf6);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; color: white; font-weight: 900;
  box-shadow: 0 0 20px rgba(139,92,246,0.4);
  animation: logoPulse 3s ease-in-out infinite;
}
@keyframes logoPulse {
  0%,100% { box-shadow: 0 0 20px rgba(139,92,246,0.4); }
  50%      { box-shadow: 0 0 35px rgba(34,211,238,0.6); }
}

/* Main grid */
.main-grid { display: flex; flex-direction: column; gap: 20px; padding-top: 24px; }
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.charts-row,
.bottom-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.scroll-section {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  filter: blur(10px);
  transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1), filter 0.75s ease-out;
  will-change: opacity, transform, filter;
}

.scroll-section.scroll-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
}

@keyframes scrollFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .charts-row,
  .bottom-row { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .stats-row { grid-template-columns: 1fr; }
}

/* Stat Cards */
.stat-card {
  border-radius: 20px; padding: 24px; cursor: default;
  position: relative; overflow: hidden;
  animation: floatCard 4s ease-in-out infinite;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255,255,255,0.15);
}
.stat-card:nth-child(2) { animation-delay: 1.3s; }
.stat-card:nth-child(3) { animation-delay: 2.6s; }
.stat-card:hover { transform: translateY(-6px) scale(1.02) !important; }

@keyframes floatCard {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-5px); }
}

.grad-blue {
  background: linear-gradient(135deg, #0369a1, #0e7490, #164e63);
  box-shadow: 0 8px 32px rgba(6,182,212,0.25);
}
.grad-blue:hover { box-shadow: 0 16px 48px rgba(6,182,212,0.45); }

.grad-green {
  background: linear-gradient(135deg, #065f46, #047857, #064e3b);
  box-shadow: 0 8px 32px rgba(16,185,129,0.25);
}
.grad-green:hover { box-shadow: 0 16px 48px rgba(16,185,129,0.45); }

.grad-red {
  background: linear-gradient(135deg, #9f1239, #be123c, #881337);
  box-shadow: 0 8px 32px rgba(244,63,94,0.25);
}
.grad-red:hover { box-shadow: 0 16px 48px rgba(244,63,94,0.45); }

.floating-card-inner { position: relative; z-index: 1; }

.card-icon-bubble {
  width: 44px; height: 44px; border-radius: 14px;
  background: rgba(255,255,255,0.15);
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease;
}
.stat-card:hover .card-icon-bubble { transform: rotate(10deg) scale(1.1); }

.card-bar-track { height: 4px; background: rgba(255,255,255,0.15); border-radius: 4px; overflow: hidden; }
.card-bar-fill {
  height: 100%; border-radius: 4px;
  background: rgba(255,255,255,0.6);
  transition: width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Chart cards */
.chart-card,
.section-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 20px; padding: 24px;
  backdrop-filter: blur(12px);
  transition: box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}
.chart-card:hover,
.section-card:hover { box-shadow: 0 12px 36px rgba(34,211,238,0.08); }

.app-shell.light .chart-card,
.app-shell.light .section-card {
  background: var(--surface);
  border-color: var(--border);
  box-shadow: 0 10px 30px rgba(15,23,42,0.08);
}

/* Badges */
.badge-green {
  background: rgba(16,185,129,0.15); color: #10b981;
  border: 1px solid rgba(16,185,129,0.3);
  padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;
}

/* Search */
.search-wrap {
  position: relative; display: flex; align-items: center; width: 100%; max-width: 360px;
}
.search-wrap-container {
  display: flex; align-items: center; gap: 0; position: relative; flex: 1; max-width: 100%;
}
.search-icon { position: absolute; left: 14px; font-size: 14px; pointer-events: none; color: var(--text-muted); }
.search-input {
  background: var(--control-bg); border: 1px solid var(--control-border);
  color: var(--text); padding: 10px 14px 10px 38px;
  border-radius: 14px; font-size: 13px; outline: none; width: 100%; min-width: 180px;
  font-family: 'DM Sans', sans-serif;
  transition: border-color 0.3s, box-shadow 0.3s, width 0.3s;
}
.search-input::placeholder { color: var(--text-muted); }
.search-input:focus {
  border-color: rgba(34,211,238,0.5);
  box-shadow: 0 0 0 3px rgba(34,211,238,0.08);
  width: 100%;
}

/* Filters */
.tx-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.tx-actions .filter-group,
.tx-actions .sort-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filter-btn {
  padding: 8px 18px; border-radius: 999px; font-size: 12px; font-weight: 700;
  background: var(--control-bg); color: var(--control-text);
  border: 1px solid var(--control-border);
  transition: all 0.2s ease; cursor: pointer;
  min-width: 82px;
}
.filter-btn-active {
  background: rgba(34,211,238,0.22); color: var(--text);
  border-color: rgba(34,211,238,0.4);
}
.sort-btn {
  padding: 8px 16px; border-radius: 999px; font-size: 12px; font-weight: 700;
  background: var(--control-bg); color: var(--control-text);
  border: 1px solid var(--control-border); cursor: pointer;
  transition: all 0.2s;
}
.sort-btn:hover { color: var(--text); border-color: rgba(34,211,238,0.25); }

/* Transaction rows */
.tx-list { display: flex; flex-direction: column; gap: 10px; max-height: 420px; overflow-y: auto; padding-right: 4px; }
.tx-list::-webkit-scrollbar { width: 6px; }
.tx-list::-webkit-scrollbar-track { background: transparent; }
.tx-list::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 999px; }

.tx-row {
  display: flex; align-items: center; justify-content: space-between; gap: 14px;
  background: var(--control-bg); border: 1px solid var(--control-border);
  border-radius: 18px; padding: 16px 18px;
  transition: all 0.2s ease;
  animation: txSlideIn 0.4s ease both;
}
.tx-row:hover { background: var(--control-bg-strong); border-color: rgba(34,211,238,0.18); transform: translateX(2px); }

.tx-row-left {
  display: flex; align-items: center; gap: 14px; min-width: 0;
}

.tx-row-right {
  display: flex; align-items: center; gap: 12px; flex-shrink: 0;
}

.tx-icon-wrap {
  width: 40px; height: 40px; border-radius: 14px;
  background: var(--control-bg-strong);
  display: flex; align-items: center; justify-content: center; font-size: 16px;
  flex-shrink: 0;
}
.tx-cat-badge {
  font-size: 11px; font-weight: 700; padding: 6px 12px;
  border-radius: 999px; white-space: nowrap;
  display: inline-flex; align-items: center;
}

.tx-delete-btn {
  width: 30px; height: 30px; border-radius: 12px;
  background: rgba(244,63,94,0.14); color: #f472b6;
  border: 1px solid rgba(244,63,94,0.3); font-size: 12px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.tx-delete-btn:hover { background: rgba(244,63,94,0.28); transform: scale(1.05); }

/* Insights */
.insight-card {
  background: var(--surface2); border: 1px solid var(--border);
  border-radius: 16px; padding: 14px;
  transition: all 0.3s ease; cursor: default;
  position: relative; overflow: hidden;
}
.insight-card::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--ins-color, #fff) 0%, transparent 100%);
  opacity: 0; transition: opacity 0.3s;
}
.insight-card:hover::before { opacity: 0.05; }
.insight-card:hover { border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }

/* Header controls */
.role-select {
  background: var(--surface2); color: var(--text);
  border: 1px solid var(--border); border-radius: 10px;
  padding: 8px 12px 8px 12px; font-size: 13px; font-weight: 600;
  outline: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
  appearance: none; -webkit-appearance: none; -moz-appearance: none;
  background-image: linear-gradient(135deg, transparent 50%, var(--text) 50%), linear-gradient(225deg, transparent 50%, var(--text) 50%);
  background-position: calc(100% - 14px) calc(50% - 2px), calc(100% - 10px) calc(50% - 2px);
  background-repeat: no-repeat; background-size: 6px 6px;
  padding-right: 36px;
}
.role-select::-ms-expand {
  display: none;
}
.role-select option,
.role-select optgroup {
  background: var(--surface2) !important;
  color: var(--text) !important;
}
.icon-btn {
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--surface2); border: 1px solid var(--border);
  cursor: pointer; font-size: 16px; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.icon-btn:hover { background: var(--surface); transform: scale(1.05); }
.logout-btn {
  padding: 8px 16px; border-radius: 10px;
  background: rgba(244, 63, 94, 0.15); border: 1px solid rgba(244, 63, 94, 0.3);
  color: #f472b6; font-size: 13px; font-weight: 600; cursor: pointer;
  transition: all 0.2s ease;
}
.logout-btn:hover {
  background: rgba(244, 63, 94, 0.25);
  border-color: rgba(244, 63, 94, 0.5);
}
.add-btn-inline {
  padding: 8px 14px; border-radius: 0 14px 14px 0;
  background: linear-gradient(135deg, #22d3ee, #8b5cf6);
  color: white; font-size: 13px; font-weight: 700; cursor: pointer;
  border: none; transition: all 0.3s ease;
  box-shadow: none;
  display: flex; align-items: center; gap: 4px;
  margin-left: -14px;
  position: relative; z-index: 2;
}
.add-btn-inline:hover { opacity: 0.9; }

/* Modal */
.modal-overlay {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.modal-box {
  background: linear-gradient(180deg, rgba(9, 16, 33, 0.98), rgba(10, 15, 34, 0.96));
  border: 1px solid rgba(255,255,255,0.16);
  border-radius: 30px; padding: 34px 30px;
  width: 100%; max-width: 460px;
  animation: modalIn 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 32px 90px rgba(0,0,0,0.45);
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.92) translateY(28px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-pill-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.modal-pill-btn {
  min-height: 52px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 700;
  color: rgba(255,255,255,0.72);
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.04);
  transition: all 0.25s ease;
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.04);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.modal-pill-btn:hover {
  transform: translateY(-1px);
  border-color: rgba(255,255,255,0.16);
}

.modal-pill-inactive {
  opacity: 0.85;
}

.modal-pill-active {
  color: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.18);
}

.modal-pill-active.expense {
  background: rgba(244, 63, 94, 0.18);
  border-color: rgba(244, 63, 94, 0.35);
}

.modal-pill-active.income {
  background: rgba(34, 211, 238, 0.18);
  border-color: rgba(34, 211, 238, 0.35);
}

.modal-label {
  display: block; font-size: 11px; font-weight: 700;
  color: rgba(255,255,255,0.62); margin-bottom: 8px;
  text-transform: uppercase; letter-spacing: 0.15em;
}
.modal-input {
  width: 100%; background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12); color: white;
  border-radius: 16px; padding: 14px 16px; font-size: 14px;
  outline: none; font-family: 'DM Sans', sans-serif;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}
.modal-input:hover {
  background: rgba(255,255,255,0.08);
}
.modal-input:focus {
  border-color: rgba(59, 130, 246, 0.75);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
  background: rgba(255,255,255,0.08);
}
.modal-input::placeholder {
  color: rgba(255,255,255,0.4);
}
.modal-input option {
  background: rgba(19, 24, 38, 0.96); color: white;
}
.modal-close-btn {
  width: 32px; height: 32px; border-radius: 10px;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.5); cursor: pointer; font-size: 14px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.modal-close-btn:hover { background: rgba(244,63,94,0.2); color: #f43f5e; }

/* Empty state */
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 48px 20px; text-align: center;
}

/* Shimmer */
.shimmer-box {
  background: linear-gradient(90deg, var(--surface) 25%, var(--surface2) 50%, var(--surface) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

/* Ripple */
.ripple-effect {
  position: absolute; border-radius: 50%;
  width: 80px; height: 80px; margin-left: -40px; margin-top: -40px;
  background: rgba(255,255,255,0.25);
  animation: rippleAnim 0.7s ease-out forwards;
  pointer-events: none;
}
@keyframes rippleAnim {
  from { transform: scale(0); opacity: 0.8; }
  to   { transform: scale(4); opacity: 0; }
}

/* Tooltip */
.glass-tooltip {
  background: rgba(15,23,42,0.9); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px; padding: 10px 14px; backdrop-filter: blur(16px);
  color: #ffffff;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}
.spending-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.spending-legend-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 16px;
  background: var(--control-bg);
  border: 1px solid var(--control-border);
  transition: background 0.2s ease;
}
.spending-legend-row:hover {
  background: var(--control-bg-strong);
}
.spending-legend-label {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  font-size: 13px;
  font-weight: 600;
}
.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.legend-value {
  color: var(--text);
  font-size: 13px;
  font-weight: 700;
}
`;
