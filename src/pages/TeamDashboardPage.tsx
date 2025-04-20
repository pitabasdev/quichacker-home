
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'wouter';

import { useToast } from '../hooks/use-toast';

// UI components
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

// Icons
import { 
  Users, 
  User, 
  UserMinus,
  UserPlus,
  Briefcase, 
  FileCode, 
  Award, 
  Clock, 
  Crown,
  Terminal, 
  Github, 
  ExternalLink, 
  Code, 
  AlertCircle, 
  CheckCircle2,
  MessageSquare,

  Eye
} from 'lucide-react';

// Types
interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface Submission {
  id: number;
  problemId: number;
  problemTitle: string;
  submittedAt: string;
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  githubUrl: string;
  demoUrl?: string;
  description: string;
  techStack: string[];
  feedback?: string;
}

interface Team {
  id: number;
  name: string;
  problemId: number | null;
  problemTitle: string | null;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  members: TeamMember[];
  submissions: Submission[];
}

export default function TeamDashboardPage() {
  const { toast } = useToast();
  
  // Fetch team data (mock data for now)
  const { data: teamData, isLoading } = useQuery({
    queryKey: ['/api/team/current'],
    queryFn: async () => {
      // This would be a real API call in a production app
      // Simulating backend data for demo
      return {
        id: 1,
        name: 'Cyber Innovators',
        problemId: 1,
        problemTitle: 'AI Voice Assistant for Educational Platforms',
        status: 'approved',
        createdAt: '2025-03-15',
        members: [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Team Lead', avatar: '' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', avatar: '' },
          { id: 3, name: 'Alex Brown', email: 'alex@example.com', role: 'Designer', avatar: '' },
        ],
        submissions: [
          { 
            id: 1, 
            problemId: 1, 
            problemTitle: 'AI Voice Assistant for Educational Platforms', 
            submittedAt: '2025-03-20', 
            status: 'under_review', 
            githubUrl: 'https://github.com/team1/project',
            demoUrl: 'https://demo.example.com',
            description: "We've created an AI voice assistant that helps students navigate educational content through natural language processing.",
            techStack: ['React', 'Node.js', 'TensorFlow', 'WebSpeech API'],
            feedback: 'Great work on the voice recognition! Consider improving the error handling for edge cases.'
          }
        ]
      } as Team;
    },
  });

  // This would be an actual API mutation in a production app
  const inviteMemberMutation = useMutation({
    mutationFn: async (email: string) => {
      console.log(`Inviting member with email: ${email}`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Invitation Sent",
        description: "Team invitation has been sent successfully.",
        variant: "default",
      });
      // In a real app, you would invalidate the team query here
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-800 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-black/40 border-[#FF007F]/30 max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-white text-xl">No Team Found</CardTitle>
            <CardDescription>
              You haven't joined a team yet for the hackathon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-6">
              Create a new team or ask for an invitation from an existing team to get started.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-gradient-to-r from-[#007BFF] to-[#00FFD1] text-black font-bold flex-1">
                Create Team
              </Button>
              <Button variant="outline" className="border-[#FF007F]/30 text-[#FF007F] hover:bg-[#FF007F]/10 flex-1">
                Join Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Status colors for submissions
  const getStatusColor = (status: Submission['status']) => {
    switch (status) {
      case 'accepted': return { bg: 'bg-green-950', text: 'text-green-400', icon: <CheckCircle2 className="h-4 w-4 text-green-400 mr-2" /> };
      case 'rejected': return { bg: 'bg-red-950', text: 'text-red-400', icon: <AlertCircle className="h-4 w-4 text-red-400 mr-2" /> };
      case 'under_review': return { bg: 'bg-blue-950', text: 'text-blue-400', icon: <Clock className="h-4 w-4 text-blue-400 mr-2" /> };
      case 'draft': return { bg: 'bg-gray-900', text: 'text-gray-400', icon: <Code className="h-4 w-4 text-gray-400 mr-2" /> };
      default: return { bg: 'bg-yellow-950', text: 'text-yellow-400', icon: <Terminal className="h-4 w-4 text-yellow-400 mr-2" /> };
    }
  };

  return (
    <div className="min-h-screen bg-black py-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1A1A2E] to-black z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Welcome Section & Team Overview */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-start space-x-4">
            <div className="hidden md:block relative">
              {/* 3D Avatar of Team Leader with glowing effect */}
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-[#00FFD1] relative transform hover:scale-105 transition-transform duration-300">
                <Avatar className="w-full h-full">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-[#007BFF] to-[#00FFD1] text-black font-bold text-xl">
                    {teamData.members[0]?.name?.substring(0, 1) || 'T'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#007BFF]/0 to-[#00FFD1]/30 pointer-events-none"></div>
              </div>
              <div className="absolute w-full h-full top-0 left-0 bg-[#00FFD1]/20 blur-xl rounded-full -z-10 animate-pulse opacity-70"></div>
            </div>
            
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white">
                  <span className="text-[#00FFD1]">{teamData.name}</span>
                </h1>
                <Badge variant="outline" className={
                  teamData.status === 'approved' ? 'ml-4 border-green-500 text-green-500' :
                  teamData.status === 'pending' ? 'ml-4 border-yellow-500 text-yellow-500' :
                  'ml-4 border-red-500 text-red-500'
                }>
                  {teamData.status.toUpperCase()}
                </Badge>
              </div>
              <div className="flex flex-col md:flex-row md:items-center mt-2 gap-2 md:gap-6">
                <p className="text-gray-300">
                  <span className="text-gray-400">👋 Welcome, </span>
                  <span className="font-medium">{teamData.members[0]?.name || 'Team Leader'}</span>
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">👥 Members: </span>
                  <span className="font-medium">{teamData.members.length}</span>
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">🏆 Challenge: </span>
                  <span className="font-medium">{teamData.problemTitle || 'Not selected'}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Button variant="outline" className="border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10">
              <User className="h-4 w-4 mr-2" />
              Edit Team
            </Button>
            
            {teamData.submissions.length > 0 ? (
              <Link href="/submit">
                <Button variant="outline" className="border-[#00FFD1]/30 text-[#00FFD1] hover:bg-[#00FFD1]/10">
                  <FileCode className="h-4 w-4 mr-2" />
                  Update Submission
                </Button>
              </Link>
            ) : (
              <Link href="/submit">
                <Button className="bg-gradient-to-r from-[#007BFF] to-[#00FFD1] text-black font-bold">
                  <FileCode className="h-4 w-4 mr-2" />
                  Submit Project
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="bg-black/40 border border-gray-800 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#007BFF]/20 data-[state=active]:text-[#007BFF]">
              <Briefcase className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-[#00FFD1]/20 data-[state=active]:text-[#00FFD1]">
              <Users className="h-4 w-4 mr-2" />
              Team Members
            </TabsTrigger>
            <TabsTrigger value="submissions" className="data-[state=active]:bg-[#FF007F]/20 data-[state=active]:text-[#FF007F]">
              <FileCode className="h-4 w-4 mr-2" />
              Submissions
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Team Info Card */}
              <Card className="md:col-span-2 bg-black/40 border-[#007BFF]/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-[#007BFF]" />
                    Team Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Team Name</h3>
                      <p className="text-white text-lg">{teamData.name}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Selected Challenge</h3>
                      <p className="text-white text-lg">{teamData.problemTitle || 'No challenge selected yet'}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Team Status</h3>
                      <p className={`text-lg ${
                        teamData.status === 'approved' ? 'text-green-400' :
                        teamData.status === 'pending' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {teamData.status.charAt(0).toUpperCase() + teamData.status.slice(1)}
                      </p>
                      {teamData.status === 'pending' && (
                        <p className="text-sm text-gray-400 mt-1">
                          Your team is awaiting approval from the hackathon organizers.
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Team Members</h3>
                      <p className="text-white text-lg">{teamData.members.length} members</p>
                    </div>
                    
                    {teamData.submissions.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Project Submission</h3>
                        <div className="flex items-center mt-1">
                          {getStatusColor(teamData.submissions[0].status).icon}
                          <span className={`text-lg ${getStatusColor(teamData.submissions[0].status).text}`}>
                            {teamData.submissions[0].status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Team Stats Card */}
              <Card className="bg-black/40 border-[#00FFD1]/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Award className="h-5 w-5 mr-2 text-[#00FFD1]" />
                    Team Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-gray-400">Project Completion</h3>
                        <span className="text-[#00FFD1] text-sm">75%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#007BFF] to-[#00FFD1]" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-gray-400">Days Until Submission</h3>
                        <span className="text-[#FF007F] text-sm">15 days</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#FF007F] to-[#9945FF]" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="border-[#007BFF]/30 text-[#007BFF] hover:bg-[#007BFF]/10">
                          <Github className="h-3.5 w-3.5 mr-1" />
                          GitHub
                        </Button>
                        <Button variant="outline" size="sm" className="border-[#00FFD1]/30 text-[#00FFD1] hover:bg-[#00FFD1]/10">
                          <MessageSquare className="h-3.5 w-3.5 mr-1" />
                          Chat
                        </Button>
                        <Button variant="outline" size="sm" className="border-[#FF007F]/30 text-[#FF007F] hover:bg-[#FF007F]/10">
                          <FileCode className="h-3.5 w-3.5 mr-1" />
                          Code
                        </Button>
                        <Button variant="outline" size="sm" className="border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10">
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          Demo
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Project Submission Card */}
              {teamData.submissions.length > 0 && (
                <Card className="md:col-span-3 bg-black/40 border-[#FF007F]/30">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <FileCode className="h-5 w-5 mr-2 text-[#FF007F]" />
                      Project Submission
                    </CardTitle>
                    <CardDescription>
                      Latest project submission details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Project Description</h3>
                        <p className="text-white">{teamData.submissions[0].description}</p>
                        
                        <h3 className="text-sm font-medium text-gray-400 mt-4 mb-2">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {teamData.submissions[0].techStack.map((tech, index) => (
                            <Badge key={index} className="bg-[#1A1A2E] text-[#00FFD1] border-[#00FFD1]/30">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        
                        <h3 className="text-sm font-medium text-gray-400 mt-4 mb-2">Submission Status</h3>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full ${getStatusColor(teamData.submissions[0].status).bg}`}>
                          {getStatusColor(teamData.submissions[0].status).icon}
                          <span className={getStatusColor(teamData.submissions[0].status).text}>
                            {teamData.submissions[0].status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Submission Links</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Github className="h-4 w-4 text-[#FF007F] mr-2" />
                            <a 
                              href={teamData.submissions[0].githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-white hover:text-[#FF007F] transition-colors"
                            >
                              GitHub Repository
                            </a>
                          </div>
                          {teamData.submissions[0].demoUrl && (
                            <div className="flex items-center">
                              <ExternalLink className="h-4 w-4 text-[#00FFD1] mr-2" />
                              <a 
                                href={teamData.submissions[0].demoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white hover:text-[#00FFD1] transition-colors"
                              >
                                Live Demo
                              </a>
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-sm font-medium text-gray-400 mt-4 mb-2">Submitted On</h3>
                        <p className="text-white">{new Date(teamData.submissions[0].submittedAt).toLocaleDateString()}</p>
                        
                        {teamData.submissions[0].feedback && (
                          <>
                            <h3 className="text-sm font-medium text-gray-400 mt-4 mb-2">Feedback</h3>
                            <div className="bg-[#1A1A2E] border border-[#007BFF]/30 rounded-lg p-4">
                              <p className="text-white italic">{teamData.submissions[0].feedback}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
                    <Button variant="outline" className="border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10">
                      <Eye className="h-4 w-4 mr-2" />
                      View Submission
                    </Button>
                    <Link href="/submit">
                      <Button className="bg-gradient-to-r from-[#007BFF] to-[#00FFD1] text-black font-bold">
                        <FileCode className="h-4 w-4 mr-2" />
                        Update Submission
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )}
            </div>
          </TabsContent>
          
          {/* Team Members Tab */}
          <TabsContent value="members" className="mt-6">
            <Card className="bg-black/40 border-[#00FFD1]/30">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Users className="h-5 w-5 mr-2 text-[#00FFD1]" />
                  Team Management Panel
                </CardTitle>
                <CardDescription>Manage your team participants and roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-black/60 to-[#1A1A2E]/60 rounded-xl border border-[#00FFD1]/20 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-[#00FFD1]">Manage Your Team</h3>
                      <div className="flex items-center">
                        <p className="text-gray-400 text-sm mr-3">
                          <span className="text-white font-medium">Capacity:</span> {teamData.members.length}/5
                        </p>
                        <div className="w-20 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#007BFF] to-[#00FFD1]" 
                            style={{ width: `${(teamData.members.length / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {teamData.members.map((member, index) => (
                        <div 
                          key={index} 
                          className="relative flex items-center justify-between bg-black/40 p-4 rounded-lg border border-gray-800 group hover:border-[#00FFD1]/40 transition-all duration-300"
                        >
                          {/* Glowing effect on hover */}
                          <div className="absolute inset-0 bg-[#00FFD1]/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 pointer-events-none"></div>
                          
                          <div className="flex items-center">
                            <div className="relative">
                              <Avatar className="h-12 w-12 mr-4">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="bg-gradient-to-br from-[#007BFF] to-[#00FFD1] text-black font-bold">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {index === 0 && (
                                <div className="absolute -top-1 -right-1 bg-[#FF007F] rounded-full p-0.5 border border-black">
                                  <Crown className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center">
                                <p className="text-white font-medium">{member.name}</p>
                                {index === 0 && (
                                  <Badge className="ml-2 bg-[#1A1A2E] text-[#FF007F] border-[#FF007F]/30">
                                    Leader
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-400 text-sm">{member.email}</p>
                              <p className="text-gray-500 text-xs mt-1">Role: {member.role}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="border-[#007BFF]/30 text-[#007BFF] hover:bg-[#007BFF]/10">
                              <MessageSquare className="h-3.5 w-3.5 mr-1" />
                              Message
                            </Button>
                            {index !== 0 && (
                              <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-900/20">
                                <UserMinus className="h-3.5 w-3.5 mr-1" />
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Add Member Form */}
                  <div className="bg-gradient-to-br from-black/60 to-[#1A1A2E]/60 rounded-xl border border-[#007BFF]/20 p-4">
                    <h3 className="text-lg font-medium text-[#007BFF] mb-4">Invite New Member</h3>
                    <div className="flex gap-3">
                      <Input 
                        placeholder="Enter email address" 
                        className="bg-black/50 border-gray-700 text-white flex-grow" 
                      />
                      <Button 
                        onClick={() => inviteMemberMutation.mutate("example@email.com")}
                        className="bg-gradient-to-r from-[#007BFF] to-[#00FFD1] text-black font-medium"
                      >
                        <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                        Send Invite
                      </Button>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      An email invitation will be sent to join your team
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Submissions Tab */}
          <TabsContent value="submissions" className="mt-6">
            {teamData.submissions.length > 0 ? (
              <Card className="bg-black/40 border-[#FF007F]/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <FileCode className="h-5 w-5 mr-2 text-[#FF007F]" />
                    Project Submissions
                  </CardTitle>
                  <CardDescription>
                    View and manage your team's submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-800">
                        <TableHead className="text-gray-400">Challenge</TableHead>
                        <TableHead className="text-gray-400">Submitted On</TableHead>
                        <TableHead className="text-gray-400">Status</TableHead>
                        <TableHead className="text-gray-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamData.submissions.map((submission) => (
                        <TableRow key={submission.id} className="border-b border-gray-800">
                          <TableCell className="font-medium text-white">
                            {submission.problemTitle}
                          </TableCell>
                          <TableCell className="text-white">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full ${getStatusColor(submission.status).bg}`}>
                              {getStatusColor(submission.status).icon}
                              <span className={getStatusColor(submission.status).text}>
                                {submission.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="h-8 border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10">
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                              {(submission.status === 'draft' || submission.status === 'submitted') && (
                                <Link href="/submit">
                                  <Button size="sm" className="h-8 bg-gradient-to-r from-[#007BFF] to-[#00FFD1] text-black">
                                    <FileCode className="h-3.5 w-3.5 mr-1" />
                                    Update
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
                  <div className="text-sm text-gray-400">
                    Be sure to submit your final project before the deadline!
                  </div>
                  <Link href="/submit">
                    <Button className="bg-gradient-to-r from-[#FF007F] to-[#9945FF] text-white">
                      <FileCode className="h-4 w-4 mr-2" />
                      New Submission
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ) : (
              <Card className="bg-black/40 border-[#FF007F]/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <FileCode className="h-5 w-5 mr-2 text-[#FF007F]" />
                    No Submissions Yet
                  </CardTitle>
                  <CardDescription>
                    Your team hasn't submitted any projects yet
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center py-12">
                  <div className="bg-[#1A1A2E] p-6 rounded-full mb-6">
                    <FileCode className="h-12 w-12 text-[#FF007F]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Start Your Submission</h3>
                  <p className="text-gray-400 text-center max-w-md mb-8">
                    Submit your project with details about your solution, GitHub repository,
                    and any additional resources to showcase your work.
                  </p>
                  <Link href="/submit">
                    <Button className="bg-gradient-to-r from-[#007BFF] to-[#00FFD1] text-black font-bold px-8 py-6">
                      <FileCode className="h-5 w-5 mr-2" />
                      Submit Your Project
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}