import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'stp_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await new Promise((r) => setTimeout(r, 600));
    const mockUsers = [
      { id: '1', email: 'demo@travel.com', password: 'demo123', name: 'Alex Rivera', avatar: 'AR' },
      { id: '2', email: 'test@test.com', password: 'test123', name: 'Sam Chen', avatar: 'SC' },
    ];
    const found = mockUsers.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    return safeUser;
  };

  const register = async (name, email, password) => {
    await new Promise((r) => setTimeout(r, 600));
    if (email === 'demo@travel.com') throw new Error('Email already registered');
    const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
    const newUser = { id: Date.now().toString(), email, name, avatar: initials };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
