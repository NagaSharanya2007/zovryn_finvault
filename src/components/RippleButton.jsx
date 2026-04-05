import { useState } from "react";

export default function RippleButton({ children, onClick, className = "", disabled = false }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((previous) => [...previous, { x, y, id }]);
    setTimeout(() => setRipples((previous) => previous.filter((r) => r.id !== id)), 700);
    onClick?.(e);
  };

  return (
    <button onClick={handleClick} disabled={disabled} className={`relative overflow-hidden ${className}`}>
      {children}
      {ripples.map((r) => (
        <span key={r.id} className="ripple-effect" style={{ left: r.x, top: r.y }} />
      ))}
    </button>
  );
}
