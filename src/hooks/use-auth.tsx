import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { User } from "../shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<User>;
};

type RegisterData = {
  username: string;
  email: string;
  password: string;
  name: string;
};

type LoginData = {
  email: string;
  password: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useQuery<User | null, Error>({
    queryKey: ['/api/auth/me'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
    initialData: null,
  });

  // Check if user is admin
  useEffect(() => {
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  // Login function
  const login = async (email: string, password: string): Promise<User> => {
    try {
      const res = await apiRequest("POST", "/api/auth/login", { email, password });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }
      
      const userData = await res.json();
      
      // Store token if provided
      if (userData.token) {
        localStorage.setItem('auth_token', userData.token);
      }
      
      // Update the user in the cache
      queryClient.setQueryData(['/api/auth/me'], userData.user);
      
      // Check if admin
      if (userData.user && userData.user.role === 'admin') {
        setIsAdmin(true);
      }
      
      return userData;
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await apiRequest("POST", "/api/auth/logout");
      
      // Clear localStorage
      localStorage.removeItem('auth_token');
      
      // Clear user from cache
      queryClient.setQueryData(['/api/auth/me'], null);
      setIsAdmin(false);
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: error instanceof Error ? error.message : "An error occurred during logout",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Register function
  const register = async (userData: RegisterData): Promise<User> => {
    try {
      const res = await apiRequest("POST", "/api/auth/register", userData);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }
      
      const newUser = await res.json();
      
      // Store token if provided
      if (newUser.token) {
        localStorage.setItem('auth_token', newUser.token);
      }
      
      // Update the user in the cache
      queryClient.setQueryData(['/api/auth/me'], newUser.user);
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created",
      });
      
      return newUser;
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Create a properly-typed context value
  const contextValue: AuthContextType = {
    user: user || null,
    isLoading,
    error,
    isAdmin,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}