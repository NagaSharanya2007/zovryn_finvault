import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { AppProvider } from './contexts/AppContext.jsx';
import LoginPage from './screens/LoginPage.jsx';
import AppContent from './AppContent.jsx';

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
      <div className="app-shell dark" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p style={{ color: 'white', fontSize: '18px' }}>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <AppContent />;
}

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
  --text-muted: rgba(15,23,42,0.45);
  --control-bg: #ffffff;
  --control-bg-strong: #f8fafc;
  --control-border: rgba(15,23,42,0.12);
  --control-text: rgba(15,23,42,0.75);
}

.bg-mesh {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, rgba(56,189,248,0.24), transparent 24%),
              radial-gradient(circle at top right, rgba(139,92,246,0.24), transparent 24%),
              radial-gradient(circle at bottom left, rgba(16,185,129,0.18), transparent 26%),
              radial-gradient(circle at bottom right, rgba(244,63,94,0.18), transparent 26%);
  pointer-events: none;
}

.content-wrap { position: relative; max-width: 1340px; margin: 0 auto; padding: 28px 28px 60px; z-index: 1; }
.header-bar { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 20px 24px; margin-bottom: 22px; border-radius: 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(20px); }
.header-bar.light { background: rgba(255,255,255,0.96); }

.logo-mark { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #22d3ee, #8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 16px; color: white; font-weight: 900; box-shadow: 0 0 20px rgba(139,92,246,0.4); animation: logoPulse 3s ease-in-out infinite; }
@keyframes logoPulse { 0%,100% { box-shadow: 0 0 20px rgba(139,92,246,0.4); } 50% { box-shadow: 0 0 35px rgba(34,211,238,0.6); } }

.main-grid { display: flex; flex-direction: column; gap: 20px; padding-top: 24px; }
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.charts-row, .bottom-row { display: grid; grid-template-columns: 1fr; gap: 16px; }

.scroll-section { opacity: 0; transform: translateY(40px) scale(0.98); filter: blur(10px); transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1), filter 0.75s ease-out; will-change: opacity, transform, filter; }
.scroll-section.scroll-visible { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12); }

@media (max-width: 1024px) { .charts-row, .bottom-row { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .stats-row { grid-template-columns: 1fr; } }

.stat-card { border-radius: 20px; padding: 24px; cursor: default; position: relative; overflow: hidden; background: var(--surface); border: 1px solid var(--border); }
.floating-card-inner { position: relative; z-index: 1; }
.grad-blue { background: linear-gradient(135deg, rgba(34,211,238,0.16), rgba(59,130,246,0.14)); }
.grad-green { background: linear-gradient(135deg, rgba(16,185,129,0.16), rgba(34,197,94,0.14)); }
.grad-red { background: linear-gradient(135deg, rgba(244,63,94,0.16), rgba(236,72,153,0.14)); }
.badge-green { background: rgba(16,185,129,0.16); color: #a7f3d0; padding: 8px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; }
.glass-tooltip { background: rgba(15,23,42,0.9); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 14px 16px; color: white; min-width: 120px; }
.chart-card { background: var(--surface2); border: 1px solid var(--border); border-radius: 24px; padding: 26px; }
.spending-legend { display: grid; gap: 10px; width: 100%; }
.spending-legend-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: rgba(255,255,255,0.05); border-radius: 16px; cursor: pointer; transition: transform 0.2s, background 0.2s; }
.spending-legend-row:hover { background: rgba(255,255,255,0.1); transform: translateY(-1px); }
.spending-legend-label { display: flex; align-items: center; gap: 10px; }
.legend-dot { width: 10px; height: 10px; border-radius: 999px; display: inline-block; }
.legend-value { font-weight: 700; }
.tx-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 18px; border-radius: 18px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); margin-bottom: 12px; animation: fadeIn 0.35s ease forwards; opacity: 0; transform: translateY(10px); }
.tx-row-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
.tx-icon-wrap { width: 44px; height: 44px; border-radius: 16px; display: grid; place-items: center; background: rgba(255,255,255,0.08); }
.tx-row-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }
.tx-cat-badge { font-size: 11px; font-weight: 700; padding: 6px 10px; border-radius: 999px; }
.tx-delete-btn { width: 30px; height: 30px; border-radius: 12px; background: rgba(244,63,94,0.14); color: #f472b6; border: 1px solid rgba(244,63,94,0.3); font-size: 12px; display: flex; align-items: center; justify-content: center; }
.tx-delete-btn:hover { background: rgba(244,63,94,0.28); transform: scale(1.05); }
.section-card { background: var(--surface2); border: 1px solid var(--border); border-radius: 24px; padding: 26px; }
.modal-overlay { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.2s ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.modal-box { background: linear-gradient(180deg, rgba(9, 16, 33, 0.98), rgba(10, 15, 34, 0.96)); border: 1px solid rgba(255,255,255,0.16); border-radius: 30px; padding: 34px 30px; width: 100%; max-width: 460px; animation: modalIn 0.28s cubic-bezier(0.22, 1, 0.36, 1); box-shadow: 0 32px 90px rgba(0,0,0,0.45); position: relative; }
.modal-close-btn-top { position: absolute; top: 16px; left: 16px; width: 32px; height: 32px; border-radius: 10px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; z-index: 10; }
@keyframes modalIn { from { opacity: 0; transform: scale(0.92) translateY(28px); } to { opacity: 1; transform: scale(1) translateY(0); } }
.modal-pill-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.modal-pill-btn { min-height: 52px; border-radius: 16px; font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.72); border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.04); transition: all 0.25s ease; box-shadow: inset 0 1px 2px rgba(255,255,255,0.04); display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
.modal-pill-btn:hover { transform: translateY(-1px); border-color: rgba(255,255,255,0.16); }
.modal-pill-inactive { opacity: 0.85; }
.modal-pill-active { color: white; box-shadow: 0 10px 30px rgba(0,0,0,0.18); }
.modal-pill-active.expense { background: rgba(244, 63, 94, 0.18); border-color: rgba(244, 63, 94, 0.35); }
.modal-pill-active.income { background: rgba(34, 211, 238, 0.18); border-color: rgba(34, 211, 238, 0.35); }
.modal-label { display: block; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.62); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.15em; }
.modal-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); color: white; border-radius: 16px; padding: 14px 16px; font-size: 14px; outline: none; font-family: 'DM Sans', sans-serif; transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease; }
.modal-input:hover { background: rgba(255,255,255,0.08); }
.modal-input:focus { border-color: rgba(59, 130, 246, 0.75); box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12); background: rgba(255,255,255,0.08); }
.modal-input::placeholder { color: rgba(255,255,255,0.4); }
.modal-input option { background: rgba(19, 24, 38, 0.96); color: white; }
.modal-close-btn { width: 32px; height: 32px; border-radius: 10px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.modal-close-btn:hover { background: rgba(244,63,94,0.2); color: #f43f5e; }
.modal-close-btn-top:hover { background: rgba(244,63,94,0.2); color: #f43f5e; }
.search-wrap-container { display: flex; align-items: center; gap: 0; width: 100%; min-width: 0; }
.search-wrap { display: flex; align-items: center; width: 100%; background: var(--control-bg); border: 1px solid var(--control-border); border-radius: 18px; padding: 10px 14px; gap: 10px; }
.search-icon { font-size: 14px; color: var(--text-muted); }
.search-input { width: 100%; background: transparent; border: none; outline: none; color: var(--text); font-size: 14px; }
.search-input::placeholder { color: var(--text-muted); }
.search-input:focus { border-color: rgba(34,211,238,0.5); box-shadow: 0 0 0 3px rgba(34,211,238,0.08); }
.add-btn-inline { padding: 8px 14px; border-radius: 0 14px 14px 0; background: linear-gradient(135deg, #22d3ee, #8b5cf6); color: white; font-size: 13px; font-weight: 700; cursor: pointer; border: none; transition: all 0.3s ease; box-shadow: none; display: flex; align-items: center; gap: 4px; margin-left: -14px; position: relative; z-index: 2; }
.add-btn-inline:hover { opacity: 0.9; }
.filter-btn { background: var(--control-bg); border: 1px solid var(--control-border); color: var(--control-text); padding: 10px 14px; border-radius: 14px; font-size: 13px; cursor: pointer; transition: all 0.25s ease; }
.filter-btn-active { background: rgba(34,211,238,0.16); border-color: rgba(34,211,238,0.3); color: var(--text); }
.sort-btn { background: var(--control-bg); border: 1px solid var(--control-border); color: var(--control-text); padding: 10px 14px; border-radius: 14px; font-size: 13px; cursor: pointer; transition: all 0.25s ease; }
.sort-btn:hover { color: var(--text); border-color: rgba(34,211,238,0.25); }
.tx-actions { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; }
.tx-list { display: flex; flex-direction: column; }
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 20px; text-align: center; }
.insight-card { background: var(--surface2); border: 1px solid var(--border); border-radius: 16px; padding: 14px; transition: all 0.3s ease; cursor: default; position: relative; overflow: hidden; }
.insight-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--ins-color, #fff) 0%, transparent 100%); opacity: 0; transition: opacity 0.3s; }
.insight-card:hover::before { opacity: 0.05; }
.insight-card:hover { border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }
.role-select { background: var(--surface2); color: var(--text); border: 1px solid var(--border); border-radius: 10px; padding: 8px 12px 8px 12px; font-size: 13px; font-weight: 600; outline: none; cursor: pointer; font-family: 'DM Sans', sans-serif; appearance: none; -webkit-appearance: none; -moz-appearance: none; background-image: linear-gradient(135deg, transparent 50%, var(--text) 50%), linear-gradient(225deg, transparent 50%, var(--text) 50%); background-position: calc(100% - 14px) calc(50% - 2px), calc(100% - 10px) calc(50% - 2px); background-repeat: no-repeat; background-size: 6px 6px; padding-right: 36px; }
.role-select::-ms-expand { display: none; }
.role-select option, .role-select optgroup { background: var(--surface2) !important; color: var(--text) !important; }
.icon-btn { width: 36px; height: 36px; border-radius: 10px; background: var(--surface2); border: 1px solid var(--border); cursor: pointer; font-size: 16px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
.icon-btn:hover { background: var(--surface); transform: scale(1.05); }
.logout-btn { padding: 8px 16px; border-radius: 10px; background: rgba(244, 63, 94, 0.15); border: 1px solid rgba(244, 63, 94, 0.3); color: #f472b6; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
.logout-btn:hover { background: rgba(244, 63, 94, 0.25); border-color: rgba(244, 63, 94, 0.5); }
@media (max-width: 860px) { .header-bar { flex-direction: column; align-items: flex-start; } .tx-actions { flex-direction: column; align-items: stretch; } .search-wrap-container { flex-direction: column; } }
`;
