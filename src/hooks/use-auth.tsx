import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from './use-toast';
import { useLocation } from 'wouter';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'leader' | 'member';
  teamId?: string;
  teamName?: string;
};

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string, userType: 'admin' | 'team') => Promise<User | undefined>;
  registerTeam: (teamData: any) => Promise<any>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
        setIsAdmin(userData.user.role === 'admin');
      } else {
        logout();
      }
    } catch (error) {
      console.error('Auth verification failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, userType: 'admin' | 'team') => {
    setLoading(true);
    try {
      const endpoint = userType === 'admin' ? '/api/login/admin' : '/api/login/team';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAdmin(data.user.role === 'admin');

      toast({
        title: "Login Successful!",
        description: `Welcome back, ${data.user.name || data.user.email}!`,
        variant: "default",
      });

      return data.user;
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerTeam = async (teamData: any) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/register-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUser(data.user);

      toast({
        title: "Registration Successful!",
        description: "Your team has been registered successfully.",
        variant: "default",
      });

      if (data.credentials) {
        toast({
          title: "Save Your Credentials",
          description: `Leader: ${data.credentials[0].email} | Password: ${data.credentials[0].password}`,
          variant: "default",
          duration: 10000,
        });

        if (data.credentials.length > 1) {
          data.credentials.slice(1).forEach((cred: any, index: number) => {
            toast({
              title: `Member ${index + 1} Credentials`,
              description: `Email: ${cred.email} | Password: ${cred.password}`,
              variant: "default",
              duration: 10000,
            });
          });
        }
      }

      return data;
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAdmin(false);
    setLocation('/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "default",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, registerTeam, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}