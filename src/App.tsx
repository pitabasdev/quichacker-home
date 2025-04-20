import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ProblemsPage from "./pages/ProblemsPage";
import ResourcesPage from "./pages/ResourcesPage";
import RegisterPage from "./pages/RegisterPage";
import "./global.css";

// Import UI components
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import MatrixBackground from "./components/ui/MatrixBackground";
import CircuitLines from "./components/ui/CircuitLines";

// Import authentication components
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";

// Import the new pages directly here to avoid path issues
import SupportPage from "./pages/SupportPage";
import FAQPage from "./pages/FAQPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";
import ProblemDetailPage from "./pages/ProblemDetailPage";
import WebSocketTestPage from "./pages/WebSocketTestPage";
import SubmitProjectPage from "./pages/SubmitProjectPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import TeamDashboardPage from "./pages/TeamDashboardPage";
import { useEffect } from "react";

function Router() {
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      {/* Public routes */}
      <Route path="/">
        {() => <Home />}
      </Route>
      <Route path="/about">
        {() => <AboutPage />}
      </Route>
      <Route path="/problems">
        {() => <ProblemsPage />}
      </Route>
      <Route path="/problems/:slug">
        {() => <ProblemDetailPage />}
      </Route>
      <Route path="/resources">
        {() => <ResourcesPage />}
      </Route>
      <Route path="/contact">
        {() => <ContactPage />}
      </Route>
      <Route path="/support">
        {() => <SupportPage />}
      </Route>
      <Route path="/faq">
        {() => <FAQPage />}
      </Route>
      <Route path="/help">
        {() => <HelpCenterPage />}
      </Route>
      <Route path="/terms">
        {() => <TermsPage />}
      </Route>
      <Route path="/privacy">
        {() => <PrivacyPage />}
      </Route>
      <Route path="/register">
        {() => <RegisterPage />}
      </Route>
      <Route path="/login">
        {() => <LoginPage />}
      </Route>
      <Route path="/ws-test">
        {() => <WebSocketTestPage />}
      </Route>

      {/* Protected routes */}
      <ProtectedRoute path="/submit" component={SubmitProjectPage} requiredRole="team" />
      <ProtectedRoute path="/team-dashboard" component={TeamDashboardPage} requiredRole="team" />

      {/* Admin routes */}
      <ProtectedRoute
        path="/admin"
        component={AdminDashboardPage}
        requiredRole="admin"
      />

      {/* 404 route */}
      <Route>
        {() => <NotFound />}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-black text-white flex flex-col">
          <MatrixBackground />
          <CircuitLines />
          <Navigation />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
          <Toaster />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
