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

/* Responsive Layout */
.content-wrap { 
  position: relative; 
  max-width: 1360px; 
  margin: 0 auto; 
  padding: clamp(1rem, 5vw, 2rem) clamp(1rem, 5vw, 2rem) clamp(2rem, 8vw, 4rem); 
  z-index: 1; 
}

.header-bar { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  gap: clamp(0.75rem, 3vw, 1rem); 
  padding: clamp(1rem, 3vw, 1.5rem) clamp(1rem, 4vw, 1.5rem); 
  margin-bottom: clamp(1rem, 3vw, 1.5rem); 
  border-radius: 1rem;
  background: rgba(255,255,255,0.03); 
  border: 1px solid rgba(255,255,255,0.08); 
  backdrop-filter: blur(20px);
  flex-wrap: wrap;
}

.header-bar > div:first-child {
  flex: 1;
  min-width: 200px;
}

.header-bar > div:last-child {
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 0.75rem);
  flex-wrap: wrap;
  justify-content: flex-end;
}

.header-bar.light { background: rgba(255,255,255,0.96); }

.logo-mark { 
  width: clamp(32px, 7vw, 40px); 
  height: clamp(32px, 7vw, 40px); 
  border-radius: 10px; 
  background: linear-gradient(135deg, #22d3ee, #8b5cf6); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: clamp(14px, 4vw, 16px); 
  color: white; 
  font-weight: 900; 
  box-shadow: 0 0 20px rgba(139,92,246,0.4); 
  animation: logoPulse 3s ease-in-out infinite; 
  flex-shrink: 0;
}

@keyframes logoPulse { 0%,100% { box-shadow: 0 0 20px rgba(139,92,246,0.4); } 50% { box-shadow: 0 0 35px rgba(34,211,238,0.6); } }

.main-grid { 
  display: flex; 
  flex-direction: column; 
  gap: clamp(1rem, 4vw, 2rem); 
  padding-top: clamp(1rem, 3vw, 1.5rem); 
}

/* Mobile-first grid layouts */
.stats-row { 
  display: grid; 
  grid-template-columns: 1fr;
  gap: clamp(1rem, 3vw, 1.5rem); 
}

.charts-row, .bottom-row { 
  display: grid; 
  grid-template-columns: 1fr; 
  gap: clamp(1rem, 3vw, 1.5rem); 
}

/* Tablet layout - 2 columns */
@media (min-width: 768px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop layout - 3 columns */
@media (min-width: 1024px) {
  .stats-row {
    grid-template-columns: repeat(3, 1fr);
  }
  .charts-row, .bottom-row { 
    grid-template-columns: 1fr; 
  }
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

.stat-card { 
  border-radius: 1.25rem; 
  padding: clamp(1rem, 4vw, 1.5rem); 
  cursor: default; 
  position: relative; 
  overflow: hidden; 
  background: var(--surface); 
  border: 1px solid var(--border);
  min-height: 140px;
}

/* Card components */
.card-icon-bubble {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(44px, 10vw, 56px);
  height: clamp(44px, 10vw, 56px);
  border-radius: 1rem;
  background: rgba(255,255,255,0.08);
  flex-shrink: 0;
}

.card-bar-track {
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 999px;
  overflow: hidden;
}

.card-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--cyan), var(--violet));
  border-radius: 999px;
  transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.floating-card-inner { position: relative; z-index: 1; }
.grad-blue { background: linear-gradient(135deg, rgba(34,211,238,0.16), rgba(59,130,246,0.14)); }
.grad-green { background: linear-gradient(135deg, rgba(16,185,129,0.16), rgba(34,197,94,0.14)); }
.grad-red { background: linear-gradient(135deg, rgba(244,63,94,0.16), rgba(236,72,153,0.14)); }

.badge-green { 
  background: rgba(16,185,129,0.16); 
  color: #a7f3d0; 
  padding: clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 2vw, 1rem); 
  border-radius: 999px; 
  font-size: clamp(11px, 2vw, 13px); 
  font-weight: 700;
  white-space: nowrap;
}

.glass-tooltip { 
  background: rgba(15,23,42,0.9); 
  border: 1px solid rgba(255,255,255,0.06); 
  border-radius: 16px; 
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2vw, 1.25rem); 
  color: white; 
  min-width: 120px; 
}

.chart-card { 
  background: var(--surface2); 
  border: 1px solid var(--border); 
  border-radius: 1.5rem; 
  padding: clamp(1.25rem, 4vw, 2rem);
  width: 100%;
  overflow-x: auto;
}

.chart-card > div {
  width: 100%;
}

/* Responsive chart heading */
.chart-card .flex {
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .chart-card .flex {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.spending-legend { 
  display: grid; 
  gap: clamp(0.5rem, 2vw, 0.75rem); 
  width: 100%; 
}

.spending-legend-row { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2vw, 1.25rem); 
  background: rgba(255,255,255,0.05); 
  border-radius: 1rem; 
  cursor: pointer; 
  transition: transform 0.2s, background 0.2s;
  gap: 0.75rem;
}

.spending-legend-row:hover { 
  background: rgba(255,255,255,0.1); 
  transform: translateY(-1px); 
}

.spending-legend-label { 
  display: flex; 
  align-items: center; 
  gap: clamp(0.5rem, 2vw, 0.75rem);
  min-width: 0;
  flex: 1;
}

.spending-legend-label span:last-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.legend-dot { 
  width: 10px; 
  height: 10px; 
  border-radius: 999px; 
  display: inline-block;
  flex-shrink: 0;
}

.legend-value { 
  font-weight: 700;
  white-space: nowrap;
}

/* Responsive Transaction Rows */
.tx-row { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  gap: clamp(0.75rem, 3vw, 1.25rem); 
  padding: clamp(1rem, 3vw, 1.5rem); 
  border-radius: 1.125rem; 
  background: rgba(255,255,255,0.04); 
  border: 1px solid rgba(255,255,255,0.08); 
  margin-bottom: clamp(0.75rem, 2vw, 1rem); 
  animation: fadeIn 0.35s ease forwards; 
  opacity: 0; 
  transform: translateY(10px);
  flex-wrap: wrap;
}

.tx-row-left { 
  display: flex; 
  align-items: center; 
  gap: clamp(0.75rem, 2vw, 1rem); 
  min-width: 0;
  flex: 1;
}

.tx-icon-wrap { 
  width: clamp(40px, 8vw, 50px); 
  height: clamp(40px, 8vw, 50px); 
  border-radius: 1rem; 
  display: grid; 
  place-items: center; 
  background: rgba(255,255,255,0.08);
  flex-shrink: 0;
}

.tx-row-right { 
  display: flex; 
  align-items: center; 
  gap: clamp(0.5rem, 2vw, 1rem); 
  flex-wrap: wrap; 
  justify-content: flex-end;
  width: 100%;
}

@media (min-width: 768px) {
  .tx-row-right {
    width: auto;
  }
}

.tx-cat-badge { 
  font-size: clamp(10px, 2vw, 12px); 
  font-weight: 700; 
  padding: clamp(0.4rem, 1vw, 0.6rem) clamp(0.6rem, 2vw, 0.85rem); 
  border-radius: 999px;
}

.tx-delete-btn { 
  width: 32px; 
  height: 32px; 
  border-radius: 10px; 
  background: rgba(244,63,94,0.14); 
  color: #f472b6; 
  border: 1px solid rgba(244,63,94,0.3); 
  font-size: 12px; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.tx-delete-btn:hover { 
  background: rgba(244,63,94,0.28); 
  transform: scale(1.05); 
}

@media (max-width: 480px) {
  .tx-delete-btn {
    width: 28px;
    height: 28px;
    font-size: 10px;
  }
}

.section-card { 
  background: var(--surface2); 
  border: 1px solid var(--border); 
  border-radius: 1.5rem; 
  padding: clamp(1.25rem, 4vw, 2rem);
  width: 100%;
  overflow-x: auto;
}
.modal-overlay { 
  position: fixed; 
  inset: 0; 
  z-index: 100; 
  background: rgba(0,0,0,0.7); 
  backdrop-filter: blur(8px); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  padding: clamp(1rem, 5vw, 2rem); 
  animation: fadeIn 0.2s ease;
  overflow-y: auto;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.modal-box { 
  background: linear-gradient(180deg, rgba(9, 16, 33, 0.98), rgba(10, 15, 34, 0.96)); 
  border: 1px solid rgba(255,255,255,0.16); 
  border-radius: clamp(1.5rem, 4vw, 2rem); 
  padding: clamp(1.5rem, 5vw, 2.5rem); 
  width: 100%; 
  max-width: 460px; 
  animation: modalIn 0.28s cubic-bezier(0.22, 1, 0.36, 1); 
  box-shadow: 0 32px 90px rgba(0,0,0,0.45); 
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.app-shell.light .modal-box {
  background: linear-gradient(180deg, rgba(240, 244, 255, 0.98), rgba(243, 244, 246, 0.96));
  border-color: rgba(15, 23, 42, 0.15);
}

.modal-header {
  margin-bottom: clamp(1.5rem, 5vw, 2rem);
  padding-bottom: clamp(1rem, 3vw, 1.25rem);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.app-shell.light .modal-header {
  border-bottom-color: rgba(15, 23, 42, 0.1);
}

.modal-title {
  font-size: clamp(18px, 5vw, 24px);
  font-weight: 900;
  color: #ffffff;
  text-align: center;
  letter-spacing: -0.5px;
}

.app-shell.light .modal-title {
  color: #0f172a;
}

.modal-close-btn-top { 
  position: absolute; 
  top: 1rem; 
  left: 1rem; 
  width: 32px; 
  height: 32px; 
  border-radius: 10px; 
  background: rgba(255,255,255,0.08); 
  border: 1px solid rgba(255,255,255,0.1); 
  color: rgba(255,255,255,0.5); 
  cursor: pointer; 
  font-size: 14px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  transition: all 0.2s; 
  z-index: 10;
  padding: 0;
}

.app-shell.light .modal-close-btn-top {
  background: rgba(15, 23, 42, 0.08);
  border-color: rgba(15, 23, 42, 0.12);
  color: rgba(15, 23, 42, 0.6);
}

.modal-close-btn-top:hover { 
  background: rgba(244,63,94,0.2); 
  color: #f43f5e; 
}

.app-shell.light .modal-close-btn-top:hover {
  background: rgba(244, 63, 94, 0.15);
  color: #e11d48;
}

@keyframes modalIn { 
  from { opacity: 0; transform: scale(0.92) translateY(28px); } 
  to { opacity: 1; transform: scale(1) translateY(0); } 
}

.modal-pill-row { 
  display: grid; 
  grid-template-columns: repeat(2, minmax(0, 1fr)); 
  gap: clamp(0.75rem, 2vw, 1rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
}

.modal-pill-btn { 
  min-height: clamp(44px, 10vw, 52px); 
  border-radius: 1rem; 
  font-size: clamp(13px, 2vw, 15px); 
  font-weight: 700; 
  color: rgba(255,255,255,0.72); 
  border: 1px solid rgba(255,255,255,0.08); 
  background: rgba(255,255,255,0.04); 
  transition: all 0.25s ease; 
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.04); 
  display: inline-flex; 
  align-items: center; 
  justify-content: center; 
  gap: clamp(0.5rem, 2vw, 0.75rem);
  cursor: pointer;
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem);
}

.app-shell.light .modal-pill-btn {
  color: rgba(15, 23, 42, 0.6);
  border-color: rgba(15, 23, 42, 0.12);
  background: rgba(15, 23, 42, 0.06);
  box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.04);
}

.modal-pill-btn:hover { 
  transform: translateY(-1px); 
  border-color: rgba(255,255,255,0.16); 
}

.app-shell.light .modal-pill-btn:hover {
  border-color: rgba(15, 23, 42, 0.18);
  background: rgba(15, 23, 42, 0.08);
}

.modal-pill-inactive { opacity: 0.85; }

..modal-pill-active { 
  color: white; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.18); 
}

.app-shell.light .modal-pill-active {
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

.app-shell.light .modal-pill-active.expense { 
  background: rgba(244, 63, 94, 0.22); 
  border-color: rgba(244, 63, 94, 0.5); 
}

.app-shell.light .modal-pill-active.income { 
  background: rgba(34, 211, 238, 0.22); 
  border-color: rgba(34, 211, 238, 0.5); 
}

.modal-label { 
  display: block; 
  font-size: clamp(10px, 2vw, 12px); 
  font-weight: 700; 
  color: rgba(255,255,255,0.62); 
  margin-bottom: clamp(0.5rem, 2vw, 0.75rem); 
  text-transform: uppercase; 
  letter-spacing: 0.15em; 
}

.app-shell.light .modal-label {
  color: rgba(15, 23, 42, 0.6);
}

.modal-form-group {
  margin-bottom: clamp(1.25rem, 4vw, 1.75rem);
}

.modal-form-group:last-of-type {
  margin-bottom: clamp(1.75rem, 5vw, 2rem);
}

.modal-error-text {
  font-size: clamp(10px, 2vw, 12px);
  color: #f87171;
  margin-top: clamp(0.5rem, 1.5vw, 0.75rem);
  font-weight: 500;
}

.modal-input { 
  width: 100%; 
  background: rgba(255,255,255,0.05); 
  border: 1px solid rgba(255,255,255,0.12); 
  color: white; 
  border-radius: 1rem; 
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2vw, 1.25rem); 
  font-size: clamp(13px, 2vw, 15px); 
  outline: none; 
  font-family: 'DM Sans', sans-serif; 
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  box-sizing: border-box;
}

.app-shell.light .modal-input {
  background: rgba(15, 23, 42, 0.05);
  border-color: rgba(15, 23, 42, 0.15);
  color: #0f172a;
}

.app-shell.light .modal-input::placeholder {
  color: rgba(15, 23, 42, 0.4);
}

.modal-input:hover { 
  background: rgba(255,255,255,0.08); 
  border-color: rgba(255,255,255,0.18);
}

.app-shell.light .modal-input:hover {
  background: rgba(15, 23, 42, 0.08);
  border-color: rgba(15, 23, 42, 0.22);
}

.modal-input:focus { 
  border-color: rgba(59, 130, 246, 0.75); 
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12); 
  background: rgba(255,255,255,0.08); 
}

.app-shell.light .modal-input:focus {
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
  background: rgba(15, 23, 42, 0.08);
}

.modal-input::placeholder { 
  color: rgba(255,255,255,0.4); 
}

.modal-input option { 
  background: rgba(19, 24, 38, 0.96); 
  color: white; 
}

.app-shell.light .modal-input option {
  background: #ffffff;
  color: #0f172a;
}

.modal-close-btn { 
  width: 32px; 
  height: 32px; 
  border-radius: 10px; 
  background: rgba(255,255,255,0.08); 
  border: 1px solid rgba(255,255,255,0.1); 
  color: rgba(255,255,255,0.5); 
  cursor: pointer; 
  font-size: 14px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  transition: all 0.2s;
  padding: 0;
}

.modal-close-btn:hover { 
  background: rgba(244,63,94,0.2); 
  color: #f43f5e; 
}

.modal-close-btn-top:hover { 
  background: rgba(244,63,94,0.2); 
  color: #f43f5e; 
}

.modal-submit-btn {
  width: 100%;
  padding: clamp(0.875rem, 3vw, 1rem) clamp(1.25rem, 4vw, 1.5rem);
  border-radius: 1.25rem;
  font-size: clamp(14px, 2.5vw, 16px);
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #22d3ee, #8b5cf6);
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.35);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: clamp(0.5rem, 2vw, 1rem);
}

.modal-submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 16px 40px rgba(139, 92, 246, 0.5);
}

.modal-submit-btn:active:not(:disabled) {
  transform: translateY(-1px);
}

.modal-submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
/* Responsive Controls and Search */
.search-wrap-container { 
  display: flex; 
  align-items: stretch; 
  gap: 0; 
  width: 100%; 
  min-width: 0;
  flex-wrap: wrap;
}

@media (min-width: 768px) {
  .search-wrap-container { 
    flex-wrap: nowrap;
  }
}

.search-wrap { 
  display: flex; 
  align-items: center; 
  width: 100%; 
  background: var(--control-bg); 
  border: 1px solid var(--control-border); 
  border-radius: 1.125rem; 
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2vw, 1.25rem); 
  gap: clamp(0.5rem, 2vw, 0.75rem);
  flex: 1;
}

.search-icon { 
  font-size: clamp(13px, 2vw, 15px); 
  color: var(--text-muted);
  flex-shrink: 0;
}

.search-input { 
  width: 100%; 
  background: transparent; 
  border: none; 
  outline: none; 
  color: var(--text); 
  font-size: clamp(13px, 2vw, 15px);
}

.search-input::placeholder { 
  color: var(--text-muted); 
}

.search-input:focus { 
  outline: none;
}

.add-btn-inline { 
  padding: clamp(0.6rem, 2vw, 0.8rem) clamp(1rem, 2vw, 1.25rem); 
  border-radius: 0 1rem 1rem 0; 
  background: linear-gradient(135deg, #22d3ee, #8b5cf6); 
  color: white; 
  font-size: clamp(12px, 2vw, 14px); 
  font-weight: 700; 
  cursor: pointer; 
  border: none; 
  transition: all 0.3s ease; 
  box-shadow: none; 
  display: flex; 
  align-items: center; 
  gap: clamp(0.25rem, 1vw, 0.5rem); 
  margin-left: -1px; 
  position: relative; 
  z-index: 2;
  white-space: nowrap;
  min-height: 3rem;
}

.add-btn-inline:hover { 
  opacity: 0.9; 
}

.filter-btn { 
  background: var(--control-bg); 
  border: 1px solid var(--control-border); 
  color: var(--control-text); 
  padding: clamp(0.6rem, 1.5vw, 0.8rem) clamp(0.75rem, 2vw, 1rem); 
  border-radius: 0.875rem; 
  font-size: clamp(12px, 2vw, 13px); 
  cursor: pointer; 
  transition: all 0.25s ease;
  white-space: nowrap;
}

.filter-btn-active { 
  background: rgba(34,211,238,0.16); 
  border-color: rgba(34,211,238,0.3); 
  color: var(--text); 
}

.sort-btn { 
  background: var(--control-bg); 
  border: 1px solid var(--control-border); 
  color: var(--control-text); 
  padding: clamp(0.6rem, 1.5vw, 0.8rem) clamp(0.75rem, 2vw, 1rem); 
  border-radius: 0.875rem; 
  font-size: clamp(12px, 2vw, 13px); 
  cursor: pointer; 
  transition: all 0.25s ease;
  white-space: nowrap;
}

.sort-btn:hover { 
  color: var(--text); 
  border-color: rgba(34,211,238,0.25); 
}

/* Transactions panel layout */
.tx-actions { 
  display: flex; 
  align-items: center; 
  justify-content: flex-start; 
  flex-wrap: wrap;
  gap: clamp(0.5rem, 2vw, 1rem);
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
}

@media (min-width: 768px) {
  .tx-actions {
    justify-content: space-between;
  }
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 2vw, 0.75rem);
}

.sort-group {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 2vw, 0.75rem);
}

.tx-list { 
  display: flex; 
  flex-direction: column; 
}

.empty-state { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  padding: clamp(2rem, 8vw, 3rem) clamp(1rem, 5vw, 2rem); 
  text-align: center; 
}

.insight-card { 
  background: var(--surface2); 
  border: 1px solid var(--border); 
  border-radius: 1rem; 
  padding: clamp(1rem, 3vw, 1.25rem); 
  transition: all 0.3s ease; 
  cursor: default; 
  position: relative; 
  overflow: hidden; 
}

.insight-card::before { 
  content: ''; 
  position: absolute; 
  inset: 0; 
  background: linear-gradient(135deg, var(--ins-color, #fff) 0%, transparent 100%); 
  opacity: 0; 
  transition: opacity 0.3s; 
}

.insight-card:hover::before { 
  opacity: 0.05; 
}

.insight-card:hover { 
  border-color: rgba(255,255,255,0.2); 
  transform: translateY(-2px); 
}

/* Responsive selects */
.role-select { 
  background-color: var(--surface2); 
  color: var(--text); 
  border: 1px solid var(--border); 
  border-radius: 10px; 
  padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem) clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem); 
  font-size: clamp(12px, 2vw, 13px); 
  font-weight: 600; 
  outline: none; 
  cursor: pointer; 
  font-family: 'DM Sans', sans-serif; 
  appearance: none; 
  -webkit-appearance: none; 
  -moz-appearance: none; 
  -webkit-text-fill-color: var(--text);
  background-image: linear-gradient(135deg, transparent 50%, var(--text) 50%), linear-gradient(225deg, transparent 50%, var(--text) 50%); 
  background-position: calc(100% - 14px) calc(50% - 2px), calc(100% - 10px) calc(50% - 2px); 
  background-repeat: no-repeat; 
  background-size: 6px 6px; 
  padding-right: 2.25rem;
  white-space: nowrap;
}

.role-select::-ms-expand { 
  display: none; 
}

.role-select option, .role-select optgroup { 
  background-color: rgba(15, 23, 42, 0.95) !important; 
  color: #ffffff !important; 
}

.icon-btn { 
  width: clamp(32px, 7vw, 40px); 
  height: clamp(32px, 7vw, 40px); 
  border-radius: 10px; 
  background: var(--surface2); 
  border: 1px solid var(--border); 
  cursor: pointer; 
  font-size: clamp(14px, 3vw, 18px); 
  transition: all 0.2s; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  flex-shrink: 0;
  padding: 0;
}

.icon-btn:hover { 
  background: var(--surface); 
  transform: scale(1.05); 
}

.icon-btn:active {
  transform: scale(0.95);
}

.logout-btn { 
  padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2vw, 1.25rem); 
  border-radius: 10px; 
  background: rgba(244, 63, 94, 0.15); 
  border: 1px solid rgba(244, 63, 94, 0.3); 
  color: #f472b6; 
  font-size: clamp(12px, 2vw, 13px); 
  font-weight: 600; 
  cursor: pointer; 
  transition: all 0.2s ease;
  white-space: nowrap;
}

.logout-btn:hover { 
  background: rgba(244, 63, 94, 0.25); 
  border-color: rgba(244, 63, 94, 0.5); 
}

/* Footer padding for scrolling */
.app-shell { 
  padding-bottom: clamp(2rem, 5vw, 4rem);
}
`;
