import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SiGithub } from 'react-icons/si';
import { Link, useLocation } from 'wouter';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../hooks/use-auth';
import CyberpunkCard3D from '../components/ui/CyberpunkCard3D';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { queryClient, apiRequest } from '../lib/queryClient';

// Define form schema using Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  userType: z.enum(["admin", "team"]).default("team"),
});

type FormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user, login, isAdmin } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        setLocation("/admin");
      } else {
        setLocation("/team-dashboard");
      }
    }
  }, [user, isAdmin, setLocation]);
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "team",
    },
  });
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const userData = await login(data.email, data.password);
      
      // Show success message
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${userData.name || data.email}!`,
        variant: "default",
      });
      
      // Redirect based on user type
      if (data.userType === "admin" && userData.role === "admin") {
        setLocation("/admin");
      } else {
        setLocation("/team-dashboard");
      }
      
    } catch (error) {
      console.error("Login failed:", error);
      // Toast is already handled in the useAuth hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1A1A2E] to-black z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-indigo-900/10 blur-[120px] rounded-full"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cyan-900/10 blur-[100px] rounded-full"></div>
      
      {/* Circuit line decorations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-[10%] w-[1px] h-[40%] bg-gradient-to-b from-transparent via-[#00FFD1] to-transparent"></div>
        <div className="absolute top-0 right-[30%] w-[1px] h-[30%] bg-gradient-to-b from-transparent via-[#FF007F] to-transparent"></div>
        <div className="absolute bottom-0 right-[10%] w-[1px] h-[40%] bg-gradient-to-b from-transparent via-[#007BFF] to-transparent"></div>
        <div className="absolute bottom-[20%] left-0 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-white">
            Welcome to <span className="text-[#00FFD1]">QuickHacker</span>
          </h1>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#FF007F] via-[#00FFD1] to-[#007BFF]"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Sign in to access your dashboard, view team information, and manage your hackathon submissions.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <CyberpunkCard3D borderColor="#007BFF" glowColor="rgba(0, 123, 255, 0.5)">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-orbitron font-bold mb-6 text-center text-white">
                Sign In
              </h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your-email..example.com" 
                            {...field} 
                            className="bg-black/50 border-[#007BFF]/30 focus:border-[#007BFF] text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="********" 
                            {...field}
                            className="bg-black/50 border-[#007BFF]/30 focus:border-[#007BFF] text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* User Type (Admin or Team) */}
                  <div className="flex space-x-4 pt-2">
                    <div
                      className={`flex-1 py-3 px-4 rounded-md text-center cursor-pointer border transition-all ${
                        form.watch("userType") === "team"
                          ? "bg-[#007BFF]/20 border-[#007BFF] text-[#007BFF]"
                          : "bg-black/30 border-gray-700 text-gray-400 hover:bg-black/40"
                      }`}
                      onClick={() => form.setValue("userType", "team")}
                    >
                      Team
                    </div>
                    <div
                      className={`flex-1 py-3 px-4 rounded-md text-center cursor-pointer border transition-all ${
                        form.watch("userType") === "admin"
                          ? "bg-[#FF007F]/20 border-[#FF007F] text-[#FF007F]"
                          : "bg-black/30 border-gray-700 text-gray-400 hover:bg-black/40"
                      }`}
                      onClick={() => form.setValue("userType", "admin")}
                    >
                      Admin
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-6 font-bold ${
                      form.watch("userType") === "team"
                        ? "bg-gradient-to-r from-[#007BFF] to-[#00FFD1] hover:from-[#0066CC] hover:to-[#00CCAA] text-black"
                        : "bg-gradient-to-r from-[#FF007F] to-[#007BFF] hover:from-[#CC005F] hover:to-[#0066CC] text-white"
                    }`}
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                  
                  {/* GitHub Login Option */}
                  <div className="relative flex items-center justify-center mt-4">
                    <div className="absolute border-t border-gray-700 w-full"></div>
                    <div className="relative bg-black px-4 text-gray-400 text-sm">OR</div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-black/40 border-[#007BFF]/30 text-white hover:bg-black/60 flex items-center justify-center gap-2"
                    onClick={() => window.location.href = "/api/auth/github"}
                  >
                    <SiGithub className="text-lg" />
                    Continue with GitHub
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6 p-4 bg-black/40 border border-gray-800 rounded-md">
                <h3 className="text-base font-semibold text-[#00FFD1] mb-2">Demo Credentials</h3>
                {form.watch("userType") === "admin" ? (
                  <div className="text-sm text-left">
                    <p className="text-gray-400 mb-1"><span className="text-white font-medium">Admin Email:</span> support..quickhacker.org</p>
                    <p className="text-gray-400"><span className="text-white font-medium">Password:</span> Hacker..123</p>
                  </div>
                ) : (
                  <div className="text-sm text-left">
                    <p className="text-gray-400 mb-1"><span className="text-white font-medium">Team Email:</span> cyberinnovators_team..example.com</p>
                    <p className="text-gray-400"><span className="text-white font-medium">Password:</span> TeamPass123!</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-center text-gray-400 text-sm">
                <p>Don't have an account?</p>
                <Link href="/register">
                  <span className="text-[#00FFD1] hover:underline cursor-pointer">Register your team for the hackathon</span>
                </Link>
              </div>
            </div>
          </CyberpunkCard3D>
        </div>
      </div>
    </div>
  );
}