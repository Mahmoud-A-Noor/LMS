// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import API from "@/services/api";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getCookie("accessToken");
    if (token) {
      API.get("/users/me")
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      setCookie("accessToken", res.data.accessToken);
      setUser(res.data.user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    deleteCookie("accessToken");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
