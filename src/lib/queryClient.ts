import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  try {
    console.log(`Making ${method} request to ${url}`, data);
    
    // Get the auth token from localStorage
    const token = localStorage.getItem('auth_token');
    
    // Set up headers
    const headers: Record<string, string> = {};
    if (data) {
      headers['Content-Type'] = 'application/json';
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const res = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });
    
    console.log(`API response status: ${res.status} ${res.statusText}`);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error (${method} ${url}):`, res.status, errorText || res.statusText);
      throw new Error(`${res.status}: ${errorText || res.statusText}`);
    }
    
    return res;
  } catch (error) {
    console.error(`API Request Error (${method} ${url}):`, error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      const url = queryKey[0] as string;
      console.log('Making query request to:', url);
      
      // Get auth token from localStorage
      const token = localStorage.getItem('auth_token');
      
      // Set up headers
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const res = await fetch(url, {
        credentials: "include",
        headers
      });
      
      console.log('Response status:', res.status, res.statusText);

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        console.log('401 Unauthorized, returning null as configured');
        return null;
      }

      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error:', res.status, errorText || res.statusText);
        throw new Error(`${res.status}: ${errorText || res.statusText}`);
      }
      
      const data = await res.json();
      console.log('Query response data received');
      return data;
    } catch (error) {
      console.error('Error in query function:', error);
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
