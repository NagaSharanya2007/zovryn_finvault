import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function LoginPage() {
  const { register, login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isSignup) {
      if (!name.trim()) {
        setError("Name is required");
        setLoading(false);
        return;
      }
      const result = register(email, password, name);
      if (!result.success) {
        setError(result.message);
      }
    } else {
      const result = login(email, password);
      if (!result.success) {
        setError(result.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-bg" />
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">✦</div>
            <h1 className="login-title">FinVault</h1>
          </div>

          <div className="login-tabs">
            <button
              className={`login-tab ${!isSignup ? "login-tab-active" : ""}`}
              onClick={() => {
                setIsSignup(false);
                setError("");
              }}
            >
              Sign In
            </button>
            <button
              className={`login-tab ${isSignup ? "login-tab-active" : ""}`}
              onClick={() => {
                setIsSignup(true);
                setError("");
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {isSignup && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="form-input"
                  disabled={loading}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
                disabled={loading}
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" disabled={loading} className="login-btn">
              {loading ? "Loading..." : isSignup ? "Create Account" : "Sign In"}
            </button>
          </form>

          <p className="login-footer">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
              className="login-toggle"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
