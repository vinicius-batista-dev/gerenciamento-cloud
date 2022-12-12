import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  if (token) {
    localStorage.setItem("token", token);
  }

  useEffect(() => {
    const recoveredToken = localStorage.getItem("token");

    if (recoveredToken) {
      setToken(recoveredToken);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a Auth Provider");
  }

  return context;
}
