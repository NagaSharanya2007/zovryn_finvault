import { useAuth } from "../contexts/AuthContext.jsx";
import { useApp } from "../contexts/AppContext.jsx";
import RippleButton from "./RippleButton.jsx";

export default function Header() {
  const { role, setRole, dark, setDark } = useApp();
  const { logout } = useAuth();

  return (
    <header className="header-bar">
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <div className="logo-mark">✦</div>
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <h1 className="text-base sm:text-lg font-black text-white tracking-tight truncate">FinVault</h1>
          <p className="text-xs text-white/30 whitespace-nowrap">Personal Finance</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
        <select value={role} onChange={(e) => setRole(e.target.value)} className="role-select">
          <option value="admin">👑 Admin</option>
          <option value="viewer">👁 Viewer</option>
        </select>
        <RippleButton onClick={() => setDark((d) => !d)} className="icon-btn">{dark ? "☀️" : "🌙"}</RippleButton>
        <RippleButton onClick={logout} className="logout-btn">Logout</RippleButton>
      </div>
    </header>
  );
}
