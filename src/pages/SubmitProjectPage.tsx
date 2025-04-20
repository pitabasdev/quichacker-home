import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SiGithub } from 'react-icons/si';
import { Link, useLocation } from 'wouter';
import { useToast } from '../hooks/use-toast';
import CyberpunkCard3D from '../components/ui/CyberpunkCard3D';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { queryClient, apiRequest } from '../lib/queryClient';

// Define form schema using Zod
const submitProjectSchema = z.object({
  teamName: z.string().min(3, { message: "Team name must be at least 3 characters" }),
  problemId: z.string({ required_error: "Please select a challenge" }),
  githubUrl: z.string()
    .url({ message: "Please enter a valid URL" })
    .refine((url) => url.includes('github.com'), {
      message: "URL must be a GitHub repository link",
    }),
  demoUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  description: z.string()
    .min(50, { message: "Description must be at least 50 characters" })
    .max(500, { message: "Description cannot exceed 500 characters" }),
  techStack: z.string().min(5, { message: "Please list the technologies used" }),
});

type FormValues = z.infer<typeof submitProjectSchema>;

export default function SubmitProjectPage() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Available challenges that students can submit to
  const challenges = [
    { id: "1", name: "AI Voice Assistant for Educational Platforms", category: "AI & ML" },
    { id: "2", name: "Blockchain-Based Supply Chain Verification", category: "Blockchain" },
    { id: "3", name: "Secure Authentication System with Biometrics", category: "Cybersecurity" },
    { id: "4", name: "Remote Patient Monitoring Dashboard", category: "Healthcare" },
    { id: "5", name: "Eco-Friendly Smart Home Energy Tracker", category: "Green Tech" },
  ];

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(submitProjectSchema),
    defaultValues: {
      teamName: "",
      problemId: "",
      githubUrl: "",
      demoUrl: "",
      description: "",
      techStack: "",
    },
  });
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Submit to API - using the apiRequest correctly
      await apiRequest(
        'POST', 
        '/api/submissions',
        data
      );
      
      // Show success message
      toast({
        title: "Project Submitted Successfully!",
        description: "Your team's project has been submitted for review. You'll receive updates on your dashboard.",
        variant: "default",
      });
      
      // Invalidate submissions cache to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/submissions'] });
      
      // Redirect to dashboard or confirmation page
      setTimeout(() => {
        setLocation("/profile");
      }, 1500);
      
    } catch (error) {
      console.error("Submission failed:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your project. Please try again.",
        variant: "destructive",
      });
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
            Submit Your <span className="text-[#00FFD1]">Project</span>
          </h1>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#FF007F] via-[#00FFD1] to-[#007BFF]"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Submit your team's final project for the hackathon. Make sure your GitHub repository is public
            and includes all necessary documentation.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <CyberpunkCard3D borderColor="#007BFF" glowColor="rgba(0, 123, 255, 0.5)">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-center bg-[#007BFF]/10 p-4 rounded-lg mb-6 max-w-fit mx-auto">
                <SiGithub className="text-4xl text-[#007BFF]" />
                <span className="ml-3 text-lg font-orbitron text-[#007BFF]">GitHub Submission</span>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Team Name Field */}
                  <FormField
                    control={form.control}
                    name="teamName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Team Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your team name" 
                            {...field} 
                            className="bg-black/50 border-[#007BFF]/30 focus:border-[#007BFF] text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Challenge Selection */}
                  <FormField
                    control={form.control}
                    name="problemId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Select Challenge</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/50 border-[#007BFF]/30 focus:border-[#007BFF] text-white">
                              <SelectValue placeholder="Select which challenge you're submitting for" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1A1A2E] border-[#007BFF]/30 text-white">
                            {challenges.map((challenge) => (
                              <SelectItem key={challenge.id} value={challenge.id}>
                                <span className="text-white">{challenge.name}</span>
                                <span className="text-sm text-gray-400 ml-2">({challenge.category})</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* GitHub URL */}
                  <FormField
                    control={form.control}
                    name="githubUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">GitHub Repository URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://github.com/yourusername/your-repo" 
                            {...field}
                            className="bg-black/50 border-[#007BFF]/30 focus:border-[#007BFF] text-white" 
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Your repository must be public and include a README.md with project details.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Demo URL (Optional) */}
                  <FormField
                    control={form.control}
                    name="demoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Demo URL (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://your-deployed-demo.com" 
                            {...field}
                            className="bg-black/50 border-[#007BFF]/30 focus:border-[#007BFF] text-white" 
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          If you have a live demo of your project, share the URL here.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Project Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Project Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Briefly describe your project and how it addresses the challenge..."
                            {...field}
                            className="bg-black/50 border-[#007BFF]/30 focus:border-[#007BFF] text-white min-h-[120px]" 
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Provide a concise overview of your project (50-500 characters).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tech Stack */}
                  <FormField
                    control={form.control}
                    name="techStack"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Technologies Used</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="React, Node.js, TensorFlow, etc." 
                            {...field}
                            className="bg-black/50 border-[#007BFF]/30 focus:border-[#007BFF] text-white" 
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          List the main technologies, frameworks, and tools used in your project.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-[#007BFF] to-[#00FFD1] hover:from-[#0066CC] hover:to-[#00CCAA] text-black font-bold py-3"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Project"}
                    </Button>
                    
                    <Link href="/problems">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-[#FF007F] text-[#FF007F] hover:bg-[#FF007F]/10"
                      >
                        View Challenges
                      </Button>
                    </Link>
                  </div>
                </form>
              </Form>
              
              <div className="mt-8 pt-6 border-t border-[#007BFF]/20">
                <h3 className="text-white font-orbitron text-lg mb-4">Submission Guidelines</h3>
                <ul className="text-gray-300 space-y-2 list-disc pl-5">
                  <li>Your GitHub repository must include comprehensive documentation.</li>
                  <li>Include setup instructions that allow judges to run your project locally.</li>
                  <li>Provide a demo video or screenshots showcasing your solution.</li>
                  <li>Make sure your repository is public and accessible to judges.</li>
                  <li>Ensure your code follows good practices and includes comments.</li>
                </ul>
              </div>
            </div>
          </CyberpunkCard3D>
        </div>
      </div>
    </div>
  );
}