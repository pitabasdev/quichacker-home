import { useAuth } from "../hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route} from "wouter";

interface ProtectedRouteProps {
  path: string;
  component: React.ComponentType<any>;
  requiredRole?: string;
}

export function ProtectedRoute({
  path,
  component: Component,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return (
      <Route path={path}>
        {() => (
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-[#00FFD1]" />
          </div>
        )}
      </Route>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return (
      <Route path={path}>
        {() => <Redirect to="/login" />}
      </Route>
    );
  }

  // If admin role is required, check if the user is an admin
  if (requiredRole === 'admin' && !isAdmin) {
    return (
      <Route path={path}>
        {() => <Redirect to="/" />}
      </Route>
    );
  }

  // If team role is required, check if the user is NOT an admin (team member)
  if (requiredRole === 'team' && isAdmin) {
    return (
      <Route path={path}>
        {() => <Redirect to="/admin" />}
      </Route>
    );
  }

  // User is authenticated and has required role (if specified)
  return (
    <Route path={path}>
      {(params) => <Component {...params} />}
    </Route>
  );
}