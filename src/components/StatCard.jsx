import useCountUp from "../hooks/useCountUp.js";

export default function StatCard({ label, value, icon, gradient, delta }) {
  const count = useCountUp(value);
  return (
    <div className={`stat-card ${gradient} group`}>
      <div className="floating-card-inner">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-2">{label}</p>
            <p className="text-2xl sm:text-3xl font-black text-white tabular-nums break-words">₹{count.toLocaleString()}</p>
            {delta !== undefined && (
              <p className={`text-xs mt-2 font-semibold ${delta >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}% vs last month
              </p>
            )}
          </div>
          <div className="card-icon-bubble text-2xl flex-shrink-0">{icon}</div>
        </div>
        <div className="card-bar-track mt-4">
          <div className="card-bar-fill" style={{ width: `${Math.min((value / 12000) * 100, 100)}%` }} />
        </div>
      </div>
    </div>
  );
}
