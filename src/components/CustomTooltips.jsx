export function CustomLineTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-tooltip">
      <p className="text-xs text-white/50 mb-1">{label}</p>
      <p className="text-lg font-bold text-white">₹{payload[0].value.toLocaleString()}</p>
    </div>
  );
}

export function CustomPieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-tooltip">
      <p className="font-semibold text-white">{payload[0].name}</p>
      <p className="text-emerald-300">₹{payload[0].value.toLocaleString()}</p>
    </div>
  );
}
