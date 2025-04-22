import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "../hooks/use-toast";
import CircuitLines from "../components/ui/CircuitLines";

// Define the team member schema
const teamMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
});

// Define the main registration schema
const registerSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters"),
  teamSize: z.string().min(1, "Please select team size"),
  problem: z.string().min(1, "Please select a problem statement"),
  teamLeader: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    gender: z.enum(["male", "female", "other"], {
      required_error: "Please select a gender",
    }),
  }),
  teamMembers: z.array(teamMemberSchema)
    .min(1, "You must add at least one team member")
    .refine(members => members.some(member => member.gender === "female"), {
      message: "At least one female team member is required",
    }),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  })
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface Problem {
  _id: string;
  title: string;
  category: string;
  description: string;
  isActive: boolean;
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoadingProblems, setIsLoadingProblems] = useState(true);
  const [, setLocation] = useLocation();

  // Fetch problems from API
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/problems');
        if (!response.ok) {
          throw new Error('Failed to fetch problems');
        }
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
        toast({
          title: "Error loading problems",
          description: "Could not load problem statements. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingProblems(false);
      }
    };

    fetchProblems();
  }, []);

  const { register, control, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      teamName: "",
      teamSize: "2",
      problem: "",
      teamLeader: {
        name: "",
        email: "",
        phone: "",
        gender: "male",
      },
      teamMembers: [{ name: "", email: "", gender: "male" }],
      agreeTerms: false
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers"
  });

  const teamSize = watch("teamSize");

  const updateTeamMemberFields = (size: number) => {
    const currentSize = fields.length;

    if (size > currentSize) {
      for (let i = 0; i < size - currentSize; i++) {
        append({ name: "", email: "", gender: "male" });
      }
    } else if (size < currentSize) {
      for (let i = currentSize - 1; i >= size; i--) {
        remove(i);
      }
    }
  };

  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    updateTeamMemberFields(newSize);
  };

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true);

      const formattedData = {
        team: {
          name: data.teamName,
          problemId: data.problem === "0" ? null : data.problem,
          description: `Team of ${data.teamSize} members`,
        },
        leader: {
          name: data.teamLeader.name,
          email: data.teamLeader.email,
          phone: data.teamLeader.phone,
          gender: data.teamLeader.gender,
        },
        members: data.teamMembers.map(member => ({
          name: member.name,
          email: member.email,
          gender: member.gender,
        })),
      };

      const response = await fetch('http://localhost:5000/api/register-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const result = await response.json();

      toast({
        title: "Registration successful!",
        description: "Your team has been registered.",
        variant: "default",
      });

      if (result.credentials?.leader) {
        toast({
          title: "Save your credentials!",
          description: `Username: ${result.credentials.leader.email} | Password: ${result.credentials.leader.password}`,
          variant: "default",
          duration: 10000,
        });
      }

      setLocation("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-radial from-[#1A1A2E] to-[#0D1117] z-[-2]"></div>
      <CircuitLines />

      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-center mb-10 text-shadow-neon-pink">
            REGISTER YOUR TEAM
          </h2>

          <div className="max-w-4xl mx-auto glassmorphism rounded-xl p-8 border border-[#FF007F]/30 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF007F] via-[#007BFF] to-[#00FFD1] opacity-20 rounded-xl blur-sm z-[-1]"></div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Team Info Section */}
              <div className="space-y-4">
                <h3 className="font-orbitron text-xl text-[#00FFD1] border-b border-[#00FFD1]/30 pb-2">Team Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-orbitron text-sm mb-2" htmlFor="teamName">Team Name</label>
                    <input
                      type="text"
                      id="teamName"
                      className={`w-full bg-[#1A1A2E]/70 text-white border ${errors.teamName ? 'border-red-500' : 'border-[#007BFF]/30'} rounded-md px-4 py-3 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/50`}
                      placeholder="Your Team Name"
                      {...register("teamName")}
                    />
                    {errors.teamName && <p className="text-red-500 text-xs mt-1">{errors.teamName.message}</p>}
                  </div>

                  <div>
                    <label className="block font-orbitron text-sm mb-2" htmlFor="teamSize">Team Size</label>
                    <select
                      id="teamSize"
                      className={`w-full bg-[#1A1A2E]/70 text-white border ${errors.teamSize ? 'border-red-500' : 'border-[#007BFF]/30'} rounded-md px-4 py-3 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/50 appearance-none`}
                      {...register("teamSize")}
                      onChange={handleTeamSizeChange}
                    >
                      <option value="2">2 Members</option>
                      <option value="3">3 Members</option>
                      <option value="4">4 Members</option>
                    </select>
                    {errors.teamSize && <p className="text-red-500 text-xs mt-1">{errors.teamSize.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-orbitron text-sm mb-2" htmlFor="problem">Problem Statement</label>
                  {isLoadingProblems ? (
                    <div className="flex items-center space-x-2 h-12 px-4 py-3 border border-[#007BFF]/30 rounded-md bg-[#1A1A2E]/70">
                      <Loader2 className="h-5 w-5 text-[#007BFF] animate-spin" />
                      <span className="text-gray-400">Loading problem statements...</span>
                    </div>
                  ) : (
                    // In your dropdown rendering:
                    <select
                      id="problem"
                      className={`w-full bg-[#1A1A2E]/70 text-white border ${errors.problem ? 'border-red-500' : 'border-[#007BFF]/30'} rounded-md px-4 py-3 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/50 appearance-none`}
                      {...register("problem")}
                    >
                      <option value="">Select a problem statement</option>
                      {problems.map(problem => ( // Removed the .filter(p => p.isActive)
                        <option key={problem._id} value={problem._id}>
                          {problem.title} - {problem.category}
                        </option>
                      ))}
                      <option value="0">Other / Not decided yet</option>
                    </select>
                  )}
                  {errors.problem && <p className="text-red-500 text-xs mt-1">{errors.problem.message}</p>}
                </div>
              </div>

              {/* Team Leader Section */}
              <div className="space-y-4">
                <h3 className="font-orbitron text-xl text-[#FF007F] border-b border-[#FF007F]/30 pb-2">Team Leader</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-orbitron text-sm mb-2" htmlFor="leaderName">Full Name</label>
                    <input
                      type="text"
                      id="leaderName"
                      className={`w-full bg-[#1A1A2E]/70 text-white border ${errors.teamLeader?.name ? 'border-red-500' : 'border-[#007BFF]/30'} rounded-md px-4 py-3 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/50`}
                      placeholder="Team Leader's Full Name"
                      {...register("teamLeader.name")}
                    />
                    {errors.teamLeader?.name && <p className="text-red-500 text-xs mt-1">{errors.teamLeader.name.message}</p>}
                  </div>

                  <div>
                    <label className="block font-orbitron text-sm mb-2" htmlFor="leaderEmail">Email</label>
                    <input
                      type="email"
                      id="leaderEmail"
                      className={`w-full bg-[#1A1A2E]/70 text-white border ${errors.teamLeader?.email ? 'border-red-500' : 'border-[#007BFF]/30'} rounded-md px-4 py-3 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/50`}
                      placeholder="team.leader@example.com"
                      {...register("teamLeader.email")}
                    />
                    {errors.teamLeader?.email && <p className="text-red-500 text-xs mt-1">{errors.teamLeader.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-orbitron text-sm mb-2" htmlFor="leaderPhone">Phone Number</label>
                    <input
                      type="tel"
                      id="leaderPhone"
                      className={`w-full bg-[#1A1A2E]/70 text-white border ${errors.teamLeader?.phone ? 'border-red-500' : 'border-[#007BFF]/30'} rounded-md px-4 py-3 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/50`}
                      placeholder="Your Contact Number"
                      {...register("teamLeader.phone")}
                    />
                    {errors.teamLeader?.phone && <p className="text-red-500 text-xs mt-1">{errors.teamLeader.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block font-orbitron text-sm mb-2" htmlFor="leaderGender">Gender</label>
                    <select
                      id="leaderGender"
                      className={`w-full bg-[#1A1A2E]/70 text-white border ${errors.teamLeader?.gender ? 'border-red-500' : 'border-[#007BFF]/30'} rounded-md px-4 py-3 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/50 appearance-none`}
                      {...register("teamLeader.gender")}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.teamLeader?.gender && <p className="text-red-500 text-xs mt-1">{errors.teamLeader.gender.message}</p>}
                  </div>
                </div>
              </div>

              {/* Team Members Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#007BFF]/30 pb-2">
                  <h3 className="font-orbitron text-xl text-[#007BFF]">Team Members</h3>
                  <p className="text-gray-300 text-sm">
                    <span className="text-[#007BFF]">*</span> At least one female member required
                  </p>
                </div>

                {errors.teamMembers?.root && (
                  <div className="bg-red-500/20 border border-red-500 rounded-md p-3 text-red-400 text-sm">
                    {errors.teamMembers.root.message}
                  </div>
                )}

                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 bg-[#1A1A2E]/50 rounded-md border border-[#007BFF]/20">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-orbitron text-[#007BFF]">Member {index + 1}</h4>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm mb-1" htmlFor={`member-${index}-name`}>Full Name</label>
                        <input
                          type="text"
                          id={`member-${index}-name`}
                          className={`w-full bg-black/30 text-white border ${errors.teamMembers?.[index]?.name ? 'border-red-500' : 'border-[#007BFF]/30'} rounded-md px-3 py-2 focus:outline-none focus:border-[#007BFF]`}
                          placeholder="Full Name"
                          {...register(`teamMembers.${index}.name` as const)}
                        />
                        {errors.teamMembers?.[index]?.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.teamMembers[index]?.name?.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm mb-1" htmlFor={`member-${index}-email`}>Email</label>
                        <input
                          type="email"
                          id={`member-${index}-email`}
                          className={`w-full bg-black/30 text-white border ${errors.teamMembers?.[index]?.email ? 'border-red-500' : 'border-[#007BFF]/30'} rounded-md px-3 py-2 focus:outline-none focus:border-[#007BFF]`}
                          placeholder="Email"
                          {...register(`teamMembers.${index}.email` as const)}
                        />
                        {errors.teamMembers?.[index]?.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.teamMembers[index]?.email?.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm mb-1" htmlFor={`member-${index}-gender`}>Gender</label>
                        <select
                          id={`member-${index}-gender`}
                          className={`w-full bg-black/30 text-white border ${errors.teamMembers?.[index]?.gender ? 'border-red-500' : 'border-[#007BFF]/30'} rounded-md px-3 py-2 focus:outline-none focus:border-[#007BFF] appearance-none`}
                          {...register(`teamMembers.${index}.gender` as const)}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.teamMembers?.[index]?.gender && (
                          <p className="text-red-500 text-xs mt-1">{errors.teamMembers[index]?.gender?.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {fields.length < parseInt(teamSize, 10) && (
                  <button
                    type="button"
                    onClick={() => append({ name: "", email: "", gender: "male" })}
                    className="flex items-center justify-center gap-2 w-full py-2 mt-3 bg-[#007BFF]/10 hover:bg-[#007BFF]/20 text-[#007BFF] rounded-md border border-dashed border-[#007BFF]/40 transition-colors"
                  >
                    <Plus size={16} />
                    <span>Add Team Member</span>
                  </button>
                )}
              </div>

              {/* Terms and Submit */}
              <div className="space-y-6 pt-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeTerms"
                      type="checkbox"
                      className="w-4 h-4 bg-[#1A1A2E] border border-[#007BFF]/30 rounded focus:ring-[#007BFF] focus:ring-1"
                      {...register("agreeTerms")}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeTerms" className="text-gray-300">
                      I agree to the <a href="#" className="text-[#00FFD1] hover:underline">Terms and Conditions</a> and <a href="#" className="text-[#00FFD1] hover:underline">Privacy Policy</a>
                    </label>
                    {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms.message}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#FF007F]/20 border border-[#FF007F] text-[#FF007F] font-orbitron font-bold py-3 rounded-md hover:bg-[#FF007F] hover:text-[#0D1117] transition-all duration-300 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        SUBMITTING...
                      </>
                    ) : (
                      "SUBMIT REGISTRATION"
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FF007F] to-[#00FFD1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}