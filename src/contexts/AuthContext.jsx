import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("fin_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = (email, password, name) => {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPassword = String(password || "").trim();
    if (!normalizedEmail || !normalizedPassword) {
      return { success: false, message: "Email and password are required" };
    }
    const users = JSON.parse(localStorage.getItem("fin_users") || "[]");
    if (users.find(u => String(u.email || "").trim().toLowerCase() === normalizedEmail)) {
      return { success: false, message: "Email already registered" };
    }
    const newUser = { id: Date.now(), email: normalizedEmail, password: normalizedPassword, name: String(name || "").trim() };
    users.push(newUser);
    localStorage.setItem("fin_users", JSON.stringify(users));
    localStorage.setItem("fin_user", JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPassword = String(password || "").trim();
    if (!normalizedEmail || !normalizedPassword) {
      return { success: false, message: "Email and password are required" };
    }
    const users = JSON.parse(localStorage.getItem("fin_users") || "[]");
    const foundUser = users.find(
      u => String(u.email || "").trim().toLowerCase() === normalizedEmail && u.password === normalizedPassword
    );
    if (foundUser) {
      localStorage.setItem("fin_user", JSON.stringify(foundUser));
      setUser(foundUser);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const logout = () => {
    localStorage.removeItem("fin_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
