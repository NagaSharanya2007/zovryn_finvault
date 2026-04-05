export const INITIAL_TRANSACTIONS = [
  { id: 1, title: "Salary Deposit", amount: 464000, category: "Income", type: "income", date: "2025-01-01", icon: "💼" },
  { id: 2, title: "Netflix", amount: 1200, category: "Entertainment", type: "expense", date: "2025-01-03", icon: "🎬" },
  { id: 3, title: "Grocery Store", amount: 9600, category: "Food", type: "expense", date: "2025-01-05", icon: "🛒" },
  { id: 4, title: "Freelance Project", amount: 96000, category: "Income", type: "income", date: "2025-01-08", icon: "💻" },
  { id: 5, title: "Electricity Bill", amount: 6800, category: "Utilities", type: "expense", date: "2025-01-10", icon: "⚡" },
  { id: 6, title: "Restaurant Dinner", amount: 5360, category: "Food", type: "expense", date: "2025-01-12", icon: "🍽️" },
  { id: 7, title: "Gym Membership", amount: 3600, category: "Health", type: "expense", date: "2025-01-15", icon: "🏋️" },
  { id: 8, title: "Dividend Income", amount: 27200, category: "Income", type: "income", date: "2025-01-18", icon: "📈" },
  { id: 9, title: "Uber Rides", amount: 2560, category: "Transport", type: "expense", date: "2025-01-20", icon: "🚗" },
  { id: 10, title: "Coffee Shop", amount: 2240, category: "Food", type: "expense", date: "2025-01-22", icon: "☕" },
  { id: 11, title: "Amazon Shopping", amount: 12480, category: "Shopping", type: "expense", date: "2025-01-24", icon: "📦" },
  { id: 12, title: "Consulting Fee", amount: 72000, category: "Income", type: "income", date: "2025-01-26", icon: "🤝" },
];

export const BALANCE_TREND = [
  { month: "Aug", balance: 656000 },
  { month: "Sep", balance: 728000 },
  { month: "Oct", balance: 624000 },
  { month: "Nov", balance: 816000 },
  { month: "Dec", balance: 920000 },
  { month: "Jan", balance: 1027200 },
];

export const CATEGORY_COLORS = {
  Food: "#f97316",
  Entertainment: "#8b5cf6",
  Utilities: "#06b6d4",
  Health: "#10b981",
  Transport: "#f59e0b",
  Shopping: "#ec4899",
  Income: "#22c55e",
  Other: "#6b7280"
};
