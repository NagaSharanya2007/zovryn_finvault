import { useState } from "react";
import { useApp } from "./contexts/AppContext.jsx";
import Header from "./components/Header.jsx";
import StatCard from "./components/StatCard.jsx";
import ScrollSection from "./components/ScrollSection.jsx";
import BalanceTrendChart from "./components/BalanceTrendChart.jsx";
import SpendingDonut from "./components/SpendingDonut.jsx";
import InsightsPanel from "./components/InsightsPanel.jsx";
import TransactionsPanel from "./components/TransactionsPanel.jsx";
import AddTxModal from "./components/AddTxModal.jsx";

export default function AppContent() {
  const { transactions, dark } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const totalBalance = transactions.reduce((a, t) => (t.type === "income" ? a + t.amount : a - t.amount), 0) + 640000;
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);

  return (
    <div className={`app-shell ${dark ? "dark" : "light"}`}>
      <div className="bg-mesh" />
      <div className="content-wrap">
        <Header />

        <main className="main-grid">
          <section className="stats-row">
            <StatCard label="Total Balance" value={totalBalance} icon="🏦" gradient="grad-blue" delta={12.4} />
            <StatCard label="Monthly Income" value={totalIncome} icon="📈" gradient="grad-green" delta={8.2} />
            <StatCard label="Monthly Expenses" value={totalExpenses} icon="📉" gradient="grad-red" delta={-3.1} />
          </section>

          <ScrollSection className="charts-row">
            <BalanceTrendChart />
          </ScrollSection>

          <ScrollSection className="charts-row">
            <SpendingDonut transactions={transactions} />
          </ScrollSection>

          <ScrollSection className="charts-row">
            <InsightsPanel transactions={transactions} />
          </ScrollSection>

          <ScrollSection className="charts-row">
            <TransactionsPanel onAddTx={() => setModalOpen(true)} />
          </ScrollSection>
        </main>
      </div>

      <AddTxModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
