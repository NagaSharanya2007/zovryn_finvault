import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useApp } from "../contexts/AppContext.jsx";
import { CustomLineTooltip } from "./CustomTooltips.jsx";
import { BALANCE_TREND } from "../data/initialData.js";

export default function BalanceTrendChart() {
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
          <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomLineTooltip />} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke={lineColor}
            strokeWidth={3}
            dot={{ fill: lineColor, r: 5, strokeWidth: 2, stroke: dotStroke }}
            activeDot={{ r: 8, fill: lineColor, stroke: activeDotStroke, strokeWidth: 2 }}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
