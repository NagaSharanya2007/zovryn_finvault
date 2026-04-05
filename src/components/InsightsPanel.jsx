export default function InsightsPanel({ transactions }) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const income = transactions.filter((t) => t.type === "income");

  const byCat = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const topCat = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];

  const totalExpenses = expenses.reduce((a, t) => a + t.amount, 0);
  const totalIncome = income.reduce((a, t) => a + t.amount, 0);
  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;

  const insights = [
    { label: "Top Spending", value: topCat ? `${topCat[0]}` : "—", sub: topCat ? `₹${topCat[1]}` : "", color: "#f97316", icon: "🔥" },
    { label: "Savings Rate", value: `${savingsRate}%`, sub: "of income", color: "#22c55e", icon: "💰" },
    { label: "Avg. Transaction", value: `₹${Math.round(totalExpenses / (expenses.length || 1))}`, sub: "per expense", color: "#8b5cf6", icon: "📊" },
    { label: "Total Transactions", value: transactions.length, sub: "this period", color: "#06b6d4", icon: "🔄" }
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
