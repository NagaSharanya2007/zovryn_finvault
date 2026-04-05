import { useState } from "react";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS } from "../data/initialData.js";
import { CustomPieTooltip } from "./CustomTooltips.jsx";

export default function SpendingDonut({ transactions }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const expenses = transactions.filter((t) => t.type === "expense");
  const byCat = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const data = Object.entries(byCat).map(([name, value]) => ({ name, value }));

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius - 4}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.9}
        />
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
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={80}
              dataKey="value"
              animationBegin={0}
              animationDuration={1200}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(_, i) => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={CATEGORY_COLORS[entry.name] || "#6b7280"} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="spending-legend flex-1 w-full">
          {data.map((d, i) => (
            <div
              key={i}
              className="spending-legend-row"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="spending-legend-label">
                <span className="legend-dot" style={{ background: CATEGORY_COLORS[d.name] || "#6b7280" }} />
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
