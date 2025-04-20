import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

import { queryClient, apiRequest } from '../lib/queryClient';
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
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

// Icons
import { 
  Users, 
  Briefcase, 
  FileCode, 
  Award, 
  Search, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Mail, 
  Eye, 
  FileText, 
  Clock, 
  AlertTriangle, 
  Shield,
  Copy,
  KeyRound,
  RefreshCw,
  Github,
  CheckSquare
} from 'lucide-react';

// Types
interface Team {
  id: number;
  name: string;
  problemId: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  memberCount: number;
}

interface Participant {
  id: number;
  name: string;
  email: string;
  teamId: number | null;
  teamName: string | null;
  role: string;
  status: 'pending' | 'active' | 'inactive';
}

interface Submission {
  id: number;
  teamId: number;
  teamName: string;
  problemId: number;
  problemTitle: string;
  submittedAt: string;
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  githubUrl: string;
}

// Styled component for dashboard section
function DashboardSection({ children, title, icon, count, variant }: { 
  children: React.ReactNode; 
  title: string; 
  icon: React.ReactNode;
  count: number;
  variant: 'blue' | 'green' | 'pink' | 'purple';
}) {
  const colors = {
    blue: {
      bg: 'from-[#007BFF]/10 to-[#0056b3]/5',
      border: 'border-[#007BFF]/30',
      iconBg: 'bg-[#007BFF]/20',
      text: 'text-[#007BFF]',
    },
    green: {
      bg: 'from-[#00FFD1]/10 to-[#00ccaa]/5',
      border: 'border-[#00FFD1]/30',
      iconBg: 'bg-[#00FFD1]/20',
      text: 'text-[#00FFD1]',
    },
    pink: {
      bg: 'from-[#FF007F]/10 to-[#cc0066]/5',
      border: 'border-[#FF007F]/30',
      iconBg: 'bg-[#FF007F]/20',
      text: 'text-[#FF007F]',
    },
    purple: {
      bg: 'from-[#9945FF]/10 to-[#7700cc]/5',
      border: 'border-[#9945FF]/30',
      iconBg: 'bg-[#9945FF]/20',
      text: 'text-[#9945FF]',
    },
  };

  return (
    <div className={`p-6 rounded-xl border ${colors[variant].border} bg-gradient-to-br ${colors[variant].bg}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${colors[variant].iconBg} ${colors[variant].text} mr-4`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-gray-400 text-sm">Total: {count}</p>
          </div>
        </div>
        <Button variant="outline" className={`${colors[variant].border} ${colors[variant].text} hover:bg-black/40`}>
          View All
        </Button>
      </div>
      {children}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [ , setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCredentialsDialogOpen, setIsCredentialsDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [generatedCredentials, setGeneratedCredentials] = useState<{username: string; password: string} | null>(null);
  
  // User actions dialog states
  const [isViewProfileDialogOpen, setIsViewProfileDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Participant | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Submission evaluation states
  const [isEvaluateDialogOpen, setIsEvaluateDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [evaluationNote, setEvaluationNote] = useState('');
  const [evaluationScores, setEvaluationScores] = useState({
    innovation: 7,
    technicalExecution: 7,
    userExperience: 7,
    presentation: 7,
    impact: 7
  });
  
  const { toast } = useToast();

  // Fetch teams from API
  const { data: teamsData } = useQuery({
    queryKey: ['/api/teams'],
    queryFn: async () => {
      // Fetch teams from the API
      const response = await fetch('/api/teams');
      
      if (!response.ok) {
        throw new Error('Failed to fetch teams');
      }
      
      // Get team data from the response
      const teams = await response.json();
      
      // Calculate member count for each team by fetching team members
      // In a production app, this would typically be handled by the backend
      // or would use a more efficient approach than multiple API calls
      const teamsWithMemberCount = await Promise.all(
        teams.map(async (team: any) => {
          try {
            const membersResponse = await fetch(`/api/teams/${team.id}/members`);
            const members = membersResponse.ok ? await membersResponse.json() : [];
            return {
              ...team,
              memberCount: members.length
            };
          } catch (error) {
            console.error(`Error fetching members for team ${team.id}:`, error);
            return {
              ...team,
              memberCount: 0
            };
          }
        })
      );
      
      return teamsWithMemberCount as Team[];
    },
  });

  // Fetch participants (mock data for now)
  const { data: participantsData} = useQuery({
    queryKey: ['/api/users'],
    queryFn: async () => {
      // This would be a real API call in a production app
      // Simulating backend data for demo
      return [
        { id: 1, name: 'John Doe', email: 'john..example.com', teamId: 1, teamName: 'Cyber Innovators', role: 'participant', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane..example.com', teamId: 1, teamName: 'Cyber Innovators', role: 'participant', status: 'active' },
        { id: 3, name: 'Alex Brown', email: 'alex..example.com', teamId: 2, teamName: 'Data Wizards', role: 'participant', status: 'active' },
        { id: 4, name: 'Sarah Johnson', email: 'sarah..example.com', teamId: 3, teamName: 'Quantum Coders', role: 'participant', status: 'active' },
        { id: 5, name: 'Mike Chen', email: 'mike..example.com', teamId: null, teamName: null, role: 'participant', status: 'pending' },
        { id: 6, name: 'Emma Wilson', email: 'emma..example.com', teamId: 2, teamName: 'Data Wizards', role: 'participant', status: 'active' },
        { id: 7, name: 'David Garcia', email: 'david..example.com', teamId: 4, teamName: 'Neural Ninjas', role: 'participant', status: 'inactive' },
        { id: 8, name: 'Lisa Taylor', email: 'lisa..example.com', teamId: 4, teamName: 'Neural Ninjas', role: 'participant', status: 'active' },
      ] as Participant[];
    },
  });

  // Fetch submissions (mock data for now)
  const { data: submissionsData } = useQuery({
    queryKey: ['/api/submissions'],
    queryFn: async () => {
      // This would be a real API call in a production app
      // Simulating backend data for demo
      return [
        { id: 1, teamId: 1, teamName: 'Cyber Innovators', problemId: 1, problemTitle: 'AI Voice Assistant', submittedAt: '2025-03-20', status: 'under_review', githubUrl: 'https://github.com/team1/project' },
        { id: 2, teamId: 3, teamName: 'Quantum Coders', problemId: 2, problemTitle: 'Blockchain Supply Chain', submittedAt: '2025-03-21', status: 'accepted', githubUrl: 'https://github.com/team3/project' },
        { id: 3, teamId: 4, teamName: 'Neural Ninjas', problemId: 1, problemTitle: 'AI Voice Assistant', submittedAt: '2025-03-19', status: 'rejected', githubUrl: 'https://github.com/team4/project' },
      ] as Submission[];
    },
  });

  // Approve team mutation
  const approveTeamMutation = useMutation({
    mutationFn: async (teamId: number) => {
      const response = await apiRequest('POST', `/api/teams/${teamId}/approve`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to approve team');
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/teams'] });
      toast({
        title: "Team Approved",
        description: "The team has been approved successfully.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Reject team mutation
  const rejectTeamMutation = useMutation({
    mutationFn: async (teamId: number) => {
      const response = await apiRequest('POST', `/api/teams/${teamId}/reject`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to reject team');
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/teams'] });
      toast({
        title: "Team Rejected",
        description: "The team has been rejected.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Generate team credentials mutation
  const generateTeamCredentialsMutation = useMutation({
    mutationFn: async (team: Team) => {
      const response = await apiRequest('POST', `/api/teams/${team.id}/credentials`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate credentials');
      }
      return await response.json();
    },
    onSuccess: (credentials) => {
      setGeneratedCredentials(credentials);
      toast({
        title: "Credentials Generated",
        description: "Team credentials have been generated successfully.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Send email mutation
  const sendEmailMutation = useMutation({
    mutationFn: async ({ userId, subject, body }: { userId: number; subject: string; body: string }) => {
      const response = await apiRequest('POST', `/api/users/${userId}/email`, { subject, body });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send email');
      }
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Email Sent",
        description: `Email has been sent to ${selectedUser?.name}.`,
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async ({ userId, newPassword }: { userId: number; newPassword: string }) => {
      const response = await apiRequest('POST', `/api/users/${userId}/reset-password`, { newPassword });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to reset password');
      }
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Password Reset",
        description: `Password has been reset for ${selectedUser?.name} and sent to their email.`,
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Function to open evaluation dialog
  const handleEvaluateSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setEvaluationNote('');
    setEvaluationScores({
      innovation: 7,
      technicalExecution: 7,
      userExperience: 7,
      presentation: 7,
      impact: 7
    });
    setIsEvaluateDialogOpen(true);
  };

  // Submit project evaluation mutation
  const evaluateSubmissionMutation = useMutation({
    mutationFn: async ({ 
      submissionId, 
      status, 
      scores, 
      notes 
    }: { 
      submissionId: number; 
      status: 'accepted' | 'rejected' | 'under_review'; 
      scores: {
        innovation: number;
        technicalExecution: number;
        userExperience: number;
        presentation: number;
        impact: number;
      };
      notes: string;
    }) => {
      const response = await apiRequest('POST', `/api/submissions/${submissionId}/evaluate`, {
        status,
        scores,
        notes
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit evaluation');
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/submissions'] });
      toast({
        title: "Evaluation Submitted",
        description: "Project evaluation has been submitted successfully.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Function to handle generating credentials for a team
  const handleGenerateCredentials = (team: Team) => {
    setSelectedTeam(team);
    setGeneratedCredentials(null);
    setIsCredentialsDialogOpen(true);
    generateTeamCredentialsMutation.mutate(team);
  };
  
  // Function to copy credentials to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "The text has been copied to your clipboard.",
      variant: "default",
    });
  };

  // Filter teams by search query
  const filteredTeams = teamsData?.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Filter participants by search query
  const filteredParticipants = participantsData?.filter(participant =>
    participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Filter submissions by search query
  const filteredSubmissions = submissionsData?.filter(submission =>
    submission.teamName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Count stats
  const pendingTeamsCount = teamsData?.filter(team => team.status === 'pending').length || 0;
  const approvedTeamsCount = teamsData?.filter(team => team.status === 'approved').length || 0;
  const totalParticipantsCount = participantsData?.length || 0;
  const pendingSubmissionsCount = submissionsData?.filter(sub => sub.status === 'submitted' || sub.status === 'under_review').length || 0;

  return (
    <div className="min-h-screen bg-black py-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1A1A2E] to-black z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white">
              Admin <span className="text-[#00FFD1]">Dashboard</span>
            </h1>
            <p className="text-gray-400 mt-1">Manage hackathon participants, teams, and submissions</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                placeholder="Search teams, participants..." 
                className="pl-8 bg-black/40 border-gray-700 text-white w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>
            <Button className="bg-gradient-to-r from-[#FF007F] to-[#7928CA] text-white">
              <Mail className="h-4 w-4 mr-2" />
              Send Announcement
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black/40 border-[#007BFF]/30">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Total Teams</p>
                  <h3 className="text-3xl font-bold text-white">{teamsData?.length || 0}</h3>
                  <p className="text-xs text-green-400 mt-1">
                    {pendingTeamsCount} pending approval
                  </p>
                </div>
                <div className="p-3 bg-[#007BFF]/20 rounded-lg">
                  <Briefcase className="h-6 w-6 text-[#007BFF]" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border-[#00FFD1]/30">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Total Participants</p>
                  <h3 className="text-3xl font-bold text-white">{totalParticipantsCount}</h3>
                  <p className="text-xs text-[#00FFD1] mt-1">
                    From {approvedTeamsCount} approved teams
                  </p>
                </div>
                <div className="p-3 bg-[#00FFD1]/20 rounded-lg">
                  <Users className="h-6 w-6 text-[#00FFD1]" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border-[#FF007F]/30">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Submissions</p>
                  <h3 className="text-3xl font-bold text-white">{submissionsData?.length || 0}</h3>
                  <p className="text-xs text-[#FF007F] mt-1">
                    {pendingSubmissionsCount} pending review
                  </p>
                </div>
                <div className="p-3 bg-[#FF007F]/20 rounded-lg">
                  <FileCode className="h-6 w-6 text-[#FF007F]" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border-[#9945FF]/30">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Time Remaining</p>
                  <h3 className="text-3xl font-bold text-white">15 Days</h3>
                  <p className="text-xs text-[#9945FF] mt-1">
                    Until final submission deadline
                  </p>
                </div>
                <div className="p-3 bg-[#9945FF]/20 rounded-lg">
                  <Clock className="h-6 w-6 text-[#9945FF]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-black/40 border border-gray-800 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#007BFF]/20 data-[state=active]:text-[#007BFF]">
              <FileText className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="teams" className="data-[state=active]:bg-[#00FFD1]/20 data-[state=active]:text-[#00FFD1]">
              <Briefcase className="h-4 w-4 mr-2" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="participants" className="data-[state=active]:bg-[#FF007F]/20 data-[state=active]:text-[#FF007F]">
              <Users className="h-4 w-4 mr-2" />
              Participants
            </TabsTrigger>
            <TabsTrigger value="submissions" className="data-[state=active]:bg-[#9945FF]/20 data-[state=active]:text-[#9945FF]">
              <Award className="h-4 w-4 mr-2" />
              Submissions
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Teams Section */}
              <DashboardSection title="Recent Teams" icon={<Briefcase className="h-5 w-5" />} count={teamsData?.length || 0} variant="blue">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-800">
                      <TableHead className="text-gray-400">Name</TableHead>
                      <TableHead className="text-gray-400">Members</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(teamsData || []).slice(0, 3).map((team) => (
                      <TableRow key={team.id} className="border-b border-gray-800">
                        <TableCell className="text-white">{team.name}</TableCell>
                        <TableCell className="text-white">{team.memberCount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            team.status === 'approved' ? 'bg-green-950 text-green-400' :
                            team.status === 'pending' ? 'bg-yellow-950 text-yellow-400' :
                            'bg-red-950 text-red-400'
                          }`}>
                            {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DashboardSection>
              
              {/* Participants Section */}
              <DashboardSection title="Recent Participants" icon={<Users className="h-5 w-5" />} count={participantsData?.length || 0} variant="green">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-800">
                      <TableHead className="text-gray-400">Name</TableHead>
                      <TableHead className="text-gray-400">Team</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(participantsData || []).slice(0, 3).map((participant) => (
                      <TableRow key={participant.id} className="border-b border-gray-800">
                        <TableCell className="text-white">{participant.name}</TableCell>
                        <TableCell className="text-white">{participant.teamName || 'No Team'}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            participant.status === 'active' ? 'bg-green-950 text-green-400' :
                            participant.status === 'pending' ? 'bg-yellow-950 text-yellow-400' :
                            'bg-red-950 text-red-400'
                          }`}>
                            {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DashboardSection>
            </div>
            
            {/* Submissions Section (Full Width) */}
            <DashboardSection title="Recent Submissions" icon={<FileCode className="h-5 w-5" />} count={submissionsData?.length || 0} variant="pink">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-800">
                    <TableHead className="text-gray-400">Team</TableHead>
                    <TableHead className="text-gray-400">Challenge</TableHead>
                    <TableHead className="text-gray-400">Submitted</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(submissionsData || []).map((submission) => (
                    <TableRow key={submission.id} className="border-b border-gray-800">
                      <TableCell className="text-white">{submission.teamName}</TableCell>
                      <TableCell className="text-white">{submission.problemTitle}</TableCell>
                      <TableCell className="text-white">{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          submission.status === 'accepted' ? 'bg-green-950 text-green-400' :
                          submission.status === 'rejected' ? 'bg-red-950 text-red-400' :
                          submission.status === 'under_review' ? 'bg-blue-950 text-blue-400' :
                          'bg-yellow-950 text-yellow-400'
                        }`}>
                          {submission.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 border-[#FF007F]/30 text-[#FF007F] hover:bg-[#FF007F]/10"
                          onClick={() => handleEvaluateSubmission(submission)}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DashboardSection>
          </TabsContent>
          
          {/* Teams Tab */}
          <TabsContent value="teams" className="mt-6">
            <Card className="bg-black/40 border-[#00FFD1]/30">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-[#00FFD1]" />
                  Registered Teams
                </CardTitle>
                <CardDescription>
                  Manage all teams registered for the hackathon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-800">
                      <TableHead className="text-gray-400">Team Name</TableHead>
                      <TableHead className="text-gray-400">Members</TableHead>
                      <TableHead className="text-gray-400">Challenge</TableHead>
                      <TableHead className="text-gray-400">Created</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeams.map((team) => (
                      <TableRow key={team.id} className="border-b border-gray-800">
                        <TableCell className="font-medium text-white">{team.name}</TableCell>
                        <TableCell className="text-white">{team.memberCount}</TableCell>
                        <TableCell className="text-white">Challenge #{team.problemId}</TableCell>
                        <TableCell className="text-white">{new Date(team.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            team.status === 'approved' ? 'bg-green-950 text-green-400' :
                            team.status === 'pending' ? 'bg-yellow-950 text-yellow-400' :
                            'bg-red-950 text-red-400'
                          }`}>
                            {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4 text-gray-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#1A1A2E] border-gray-800 text-white">
                              <DropdownMenuLabel>Team Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-gray-800" />
                              <DropdownMenuItem className="hover:bg-[#00FFD1]/10 cursor-pointer" onClick={() => {}}>
                                <Eye className="h-4 w-4 mr-2 text-[#00FFD1]" />
                                View Details
                              </DropdownMenuItem>
                              {team.status === 'approved' && (
                                <DropdownMenuItem 
                                  className="hover:bg-[#9945FF]/10 cursor-pointer"
                                  onClick={() => handleGenerateCredentials(team)}
                                >
                                  <KeyRound className="h-4 w-4 mr-2 text-[#9945FF]" />
                                  Generate Credentials
                                </DropdownMenuItem>
                              )}
                              {team.status === 'pending' && (
                                <>
                                  <DropdownMenuItem 
                                    className="hover:bg-[#00FFD1]/10 cursor-pointer" 
                                    onClick={() => approveTeamMutation.mutate(team.id)}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="hover:bg-red-900/10 cursor-pointer" 
                                    onClick={() => rejectTeamMutation.mutate(team.id)}
                                  >
                                    <XCircle className="h-4 w-4 mr-2 text-red-400" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem className="hover:bg-[#007BFF]/10 cursor-pointer" onClick={() => {}}>
                                <Mail className="h-4 w-4 mr-2 text-[#007BFF]" />
                                Contact Team
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Participants Tab */}
          <TabsContent value="participants" className="mt-6">
            <Card className="bg-black/40 border-[#FF007F]/30">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Users className="h-5 w-5 mr-2 text-[#FF007F]" />
                  Registered Participants
                </CardTitle>
                <CardDescription>
                  View and manage all hackathon participants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-800">
                      <TableHead className="text-gray-400">Name</TableHead>
                      <TableHead className="text-gray-400">Email</TableHead>
                      <TableHead className="text-gray-400">Team</TableHead>
                      <TableHead className="text-gray-400">Role</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParticipants.map((participant) => (
                      <TableRow key={participant.id} className="border-b border-gray-800">
                        <TableCell className="font-medium text-white">{participant.name}</TableCell>
                        <TableCell className="text-white">{participant.email}</TableCell>
                        <TableCell className="text-white">{participant.teamName || 'No Team'}</TableCell>
                        <TableCell className="text-white capitalize">{participant.role}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            participant.status === 'active' ? 'bg-green-950 text-green-400' :
                            participant.status === 'pending' ? 'bg-yellow-950 text-yellow-400' :
                            'bg-red-950 text-red-400'
                          }`}>
                            {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4 text-gray-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#1A1A2E] border-gray-800 text-white">
                              <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-gray-800" />
                              <DropdownMenuItem 
                                className="hover:bg-[#FF007F]/10 cursor-pointer"
                                onClick={() => {
                                  setSelectedUser(participant);
                                  setIsViewProfileDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2 text-[#FF007F]" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="hover:bg-[#007BFF]/10 cursor-pointer"
                                onClick={() => {
                                  setSelectedUser(participant);
                                  setEmailSubject('');
                                  setEmailBody('');
                                  setIsEmailDialogOpen(true);
                                }}
                              >
                                <Mail className="h-4 w-4 mr-2 text-[#007BFF]" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="hover:bg-purple-900/10 cursor-pointer"
                                onClick={() => {
                                  setSelectedUser(participant);
                                  setNewPassword('');
                                  setIsResetPasswordDialogOpen(true);
                                }}
                              >
                                <Shield className="h-4 w-4 mr-2 text-purple-400" />
                                Reset Password
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Submissions Tab */}
          <TabsContent value="submissions" className="mt-6">
            <Card className="bg-black/40 border-[#9945FF]/30">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <FileCode className="h-5 w-5 mr-2 text-[#9945FF]" />
                  Project Submissions
                </CardTitle>
                <CardDescription>
                  Review and evaluate submitted projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-800">
                        <TableHead className="text-gray-400">Team</TableHead>
                        <TableHead className="text-gray-400">Challenge</TableHead>
                        <TableHead className="text-gray-400">Submitted On</TableHead>
                        <TableHead className="text-gray-400">GitHub</TableHead>
                        <TableHead className="text-gray-400">Status</TableHead>
                        <TableHead className="text-gray-400 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.length > 0 ? (
                        filteredSubmissions.map((submission) => (
                          <TableRow key={submission.id} className="border-b border-gray-800">
                            <TableCell className="font-medium text-white">{submission.teamName}</TableCell>
                            <TableCell className="text-white">{submission.problemTitle}</TableCell>
                            <TableCell className="text-white">{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Button 
                                variant="link" 
                                className="text-[#9945FF] p-0 h-auto"
                                onClick={() => window.open(submission.githubUrl, '_blank')}
                              >
                                <Github className="h-4 w-4 mr-1" />
                                Repository
                              </Button>
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                submission.status === 'accepted' ? 'bg-green-950 text-green-400' :
                                submission.status === 'rejected' ? 'bg-red-950 text-red-400' :
                                submission.status === 'under_review' ? 'bg-blue-950 text-blue-400' :
                                submission.status === 'draft' ? 'bg-gray-900 text-gray-400' :
                                'bg-yellow-950 text-yellow-400'
                              }`}>
                                {submission.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10"
                                onClick={() => {
                                  setSelectedSubmission(submission);
                                  setEvaluationNote('');
                                  setEvaluationScores({
                                    innovation: 7,
                                    technicalExecution: 7,
                                    userExperience: 7,
                                    presentation: 7,
                                    impact: 7
                                  });
                                  setIsEvaluateDialogOpen(true);
                                }}
                              >
                                <CheckSquare className="h-3.5 w-3.5 mr-1" />
                                Evaluate
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : searchQuery ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                            No submissions matching your search
                          </TableCell>
                        </TableRow>
                      ) : (
                        <>
                          {/* Demo data for preview - using real data from the image */}
                          <TableRow className="border-b border-gray-800">
                            <TableCell className="font-medium text-white">Cyber Innovators</TableCell>
                            <TableCell className="text-white">AI Voice Assistant</TableCell>
                            <TableCell className="text-white">20/03/2025</TableCell>
                            <TableCell>
                              <Button variant="link" className="text-[#9945FF] p-0 h-auto">
                                <Github className="h-4 w-4 mr-1" />
                                Repository
                              </Button>
                            </TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-blue-950 text-blue-400">
                                Under Review
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10"
                                onClick={() => {
                                  setSelectedSubmission({
                                    id: 1,
                                    teamId: 1,
                                    teamName: 'Cyber Innovators',
                                    problemId: 1,
                                    problemTitle: 'AI Voice Assistant',
                                    submittedAt: '2025-03-20T12:00:00Z',
                                    status: 'under_review',
                                    githubUrl: 'https://github.com/cyber-innovators/ai-voice-assistant'
                                  });
                                  setEvaluationNote('');
                                  setEvaluationScores({
                                    innovation: 7,
                                    technicalExecution: 7,
                                    userExperience: 7,
                                    presentation: 7,
                                    impact: 7
                                  });
                                  setIsEvaluateDialogOpen(true);
                                }}
                              >
                                <CheckSquare className="h-3.5 w-3.5 mr-1" />
                                Evaluate
                              </Button>
                            </TableCell>
                          </TableRow>
                          
                          <TableRow className="border-b border-gray-800">
                            <TableCell className="font-medium text-white">Quantum Coders</TableCell>
                            <TableCell className="text-white">Blockchain Supply Chain</TableCell>
                            <TableCell className="text-white">21/03/2025</TableCell>
                            <TableCell>
                              <Button variant="link" className="text-[#9945FF] p-0 h-auto">
                                <Github className="h-4 w-4 mr-1" />
                                Repository
                              </Button>
                            </TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-green-950 text-green-400">
                                Accepted
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10"
                                onClick={() => {
                                  setSelectedSubmission({
                                    id: 2,
                                    teamId: 2,
                                    teamName: 'Quantum Coders',
                                    problemId: 2,
                                    problemTitle: 'Blockchain Supply Chain',
                                    submittedAt: '2025-03-21T14:30:00Z',
                                    status: 'accepted',
                                    githubUrl: 'https://github.com/quantum-coders/blockchain-supply-chain'
                                  });
                                  setEvaluationNote('Excellent implementation of blockchain technology with real-world applications. Great documentation and code quality.');
                                  setEvaluationScores({
                                    innovation: 9,
                                    technicalExecution: 8,
                                    userExperience: 8,
                                    presentation: 9,
                                    impact: 9
                                  });
                                  setIsEvaluateDialogOpen(true);
                                }}
                              >
                                <CheckSquare className="h-3.5 w-3.5 mr-1" />
                                Evaluate
                              </Button>
                            </TableCell>
                          </TableRow>
                          
                          <TableRow className="border-b border-gray-800">
                            <TableCell className="font-medium text-white">Neural Ninjas</TableCell>
                            <TableCell className="text-white">AI Voice Assistant</TableCell>
                            <TableCell className="text-white">19/03/2025</TableCell>
                            <TableCell>
                              <Button variant="link" className="text-[#9945FF] p-0 h-auto">
                                <Github className="h-4 w-4 mr-1" />
                                Repository
                              </Button>
                            </TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-red-950 text-red-400">
                                Rejected
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10"
                                onClick={() => {
                                  setSelectedSubmission({
                                    id: 3,
                                    teamId: 3,
                                    teamName: 'Neural Ninjas',
                                    problemId: 1,
                                    problemTitle: 'AI Voice Assistant',
                                    submittedAt: '2025-03-19T09:15:00Z',
                                    status: 'rejected',
                                    githubUrl: 'https://github.com/neural-ninjas/ai-voice-assistant'
                                  });
                                  setEvaluationNote('Project is incomplete and lacks core functionality. Documentation is minimal and code quality needs improvement.');
                                  setEvaluationScores({
                                    innovation: 4,
                                    technicalExecution: 3,
                                    userExperience: 4,
                                    presentation: 3,
                                    impact: 3
                                  });
                                  setIsEvaluateDialogOpen(true);
                                }}
                              >
                                <CheckSquare className="h-3.5 w-3.5 mr-1" />
                                Evaluate
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Admin Actions */}
        <div className="flex flex-wrap gap-4 justify-end">
          <Button variant="outline" className="border-[#FF007F]/30 text-[#FF007F] hover:bg-[#FF007F]/10">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button className="bg-gradient-to-r from-[#00FFD1] to-[#007BFF] text-black font-bold">
            <Award className="h-4 w-4 mr-2" />
            Announce Winners
          </Button>
        </div>
      </div>
      
      {/* Project Evaluation Dialog */}
      <Dialog open={isEvaluateDialogOpen} onOpenChange={setIsEvaluateDialogOpen}>
        <DialogContent className="bg-[#0A0F1A] border-[#9945FF]/30 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center">
              <Award className="h-5 w-5 mr-2 text-[#9945FF]" />
              Project Evaluation
            </DialogTitle>
            <DialogDescription>
              {selectedSubmission && `Evaluate submission from team "${selectedSubmission.teamName}" for ${selectedSubmission.problemTitle}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-6 py-3">
              {/* Project Info */}
              <div className="flex items-center justify-between bg-black/30 p-4 rounded-lg border border-gray-800">
                <div>
                  <h3 className="text-lg font-medium text-white">{selectedSubmission.teamName}</h3>
                  <p className="text-gray-400 text-sm">{selectedSubmission.problemTitle}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10"
                  onClick={() => window.open(selectedSubmission.githubUrl, '_blank')}
                >
                  <Github className="h-4 w-4 mr-1" />
                  View Repository
                </Button>
              </div>
              
              {/* Scoring */}
              <div>
                <h3 className="text-white text-md font-medium mb-3">Evaluation Criteria</h3>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="innovation-score" className="text-gray-300">Innovation (1-10)</Label>
                      <span className="text-white font-medium">{evaluationScores.innovation}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">1</span>
                      <input
                        id="innovation-score"
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={evaluationScores.innovation}
                        onChange={(e) => setEvaluationScores({
                          ...evaluationScores,
                          innovation: parseInt(e.target.value)
                        })}
                        className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#9945FF]"
                      />
                      <span className="text-xs text-gray-500">10</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="technical-score" className="text-gray-300">Technical Execution (1-10)</Label>
                      <span className="text-white font-medium">{evaluationScores.technicalExecution}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">1</span>
                      <input
                        id="technical-score"
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={evaluationScores.technicalExecution}
                        onChange={(e) => setEvaluationScores({
                          ...evaluationScores,
                          technicalExecution: parseInt(e.target.value)
                        })}
                        className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#9945FF]"
                      />
                      <span className="text-xs text-gray-500">10</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="ux-score" className="text-gray-300">User Experience (1-10)</Label>
                      <span className="text-white font-medium">{evaluationScores.userExperience}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">1</span>
                      <input
                        id="ux-score"
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={evaluationScores.userExperience}
                        onChange={(e) => setEvaluationScores({
                          ...evaluationScores,
                          userExperience: parseInt(e.target.value)
                        })}
                        className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#9945FF]"
                      />
                      <span className="text-xs text-gray-500">10</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="presentation-score" className="text-gray-300">Presentation (1-10)</Label>
                      <span className="text-white font-medium">{evaluationScores.presentation}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">1</span>
                      <input
                        id="presentation-score"
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={evaluationScores.presentation}
                        onChange={(e) => setEvaluationScores({
                          ...evaluationScores,
                          presentation: parseInt(e.target.value)
                        })}
                        className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#9945FF]"
                      />
                      <span className="text-xs text-gray-500">10</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="impact-score" className="text-gray-300">Impact & Potential (1-10)</Label>
                      <span className="text-white font-medium">{evaluationScores.impact}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">1</span>
                      <input
                        id="impact-score"
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={evaluationScores.impact}
                        onChange={(e) => setEvaluationScores({
                          ...evaluationScores,
                          impact: parseInt(e.target.value)
                        })}
                        className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#9945FF]"
                      />
                      <span className="text-xs text-gray-500">10</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-[#9945FF]/10 rounded-lg border border-[#9945FF]/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Final Score:</span>
                    <span className="text-lg font-bold text-[#9945FF]">
                      {((
                        evaluationScores.innovation + 
                        evaluationScores.technicalExecution + 
                        evaluationScores.userExperience + 
                        evaluationScores.presentation + 
                        evaluationScores.impact
                      ) / 5).toFixed(1)} / 10
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Feedback */}
              <div className="space-y-3">
                <Label htmlFor="eval-notes" className="text-gray-300">Notes & Feedback</Label>
                <Textarea
                  id="eval-notes"
                  value={evaluationNote}
                  onChange={(e) => setEvaluationNote(e.target.value)}
                  className="bg-black/60 border-gray-700 text-white min-h-[120px] focus:border-[#9945FF]"
                  placeholder="Provide detailed feedback for the team..."
                />
              </div>
              
              {/* Status Selection */}
              <div className="space-y-3">
                <h3 className="text-white text-md font-medium">Status Decision</h3>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`border-blue-500/30 ${selectedSubmission.status === 'under_review' ? 'bg-blue-950 text-blue-400' : 'text-blue-400 hover:bg-blue-950/50'}`}
                    onClick={() => {
                      if (selectedSubmission) {
                        setSelectedSubmission({
                          ...selectedSubmission,
                          status: 'under_review'
                        });
                      }
                    }}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Under Review
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`border-green-500/30 ${selectedSubmission.status === 'accepted' ? 'bg-green-950 text-green-400' : 'text-green-400 hover:bg-green-950/50'}`}
                    onClick={() => {
                      if (selectedSubmission) {
                        setSelectedSubmission({
                          ...selectedSubmission,
                          status: 'accepted'
                        });
                      }
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`border-red-500/30 ${selectedSubmission.status === 'rejected' ? 'bg-red-950 text-red-400' : 'text-red-400 hover:bg-red-950/50'}`}
                    onClick={() => {
                      if (selectedSubmission) {
                        setSelectedSubmission({
                          ...selectedSubmission,
                          status: 'rejected'
                        });
                      }
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Evaluated by Admin
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setIsEvaluateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#9945FF] to-[#8833dd] text-white"
                onClick={() => {
                  if (selectedSubmission) {
                    evaluateSubmissionMutation.mutate({
                      submissionId: selectedSubmission.id,
                      status: selectedSubmission.status as 'accepted' | 'rejected' | 'under_review',
                      scores: evaluationScores,
                      notes: evaluationNote
                    });
                    setIsEvaluateDialogOpen(false);
                  }
                }}
                disabled={evaluateSubmissionMutation.isPending}
              >
                {evaluateSubmissionMutation.isPending ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Award className="h-4 w-4 mr-2" />
                )}
                Submit Evaluation
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Team Credentials Dialog */}
      <Dialog open={isCredentialsDialogOpen} onOpenChange={setIsCredentialsDialogOpen}>
        <DialogContent className="bg-[#0A0F1A] border-[#9945FF]/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center">
              <KeyRound className="h-5 w-5 mr-2 text-[#9945FF]" />
              Team Credentials
            </DialogTitle>
            <DialogDescription>
              {selectedTeam && `Access credentials for team "${selectedTeam.name}"`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-3">
            {generateTeamCredentialsMutation.isPending ? (
              <div className="flex flex-col items-center justify-center py-8">
                <RefreshCw className="h-10 w-10 text-[#9945FF] animate-spin mb-4" />
                <p className="text-gray-400">Generating secure credentials...</p>
              </div>
            ) : generatedCredentials ? (
              <>
                <div className="space-y-4">
                  <div className="bg-black/60 rounded-lg p-4 border border-[#9945FF]/20">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm text-gray-400">Username</label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-[#9945FF] hover:text-[#9945FF] hover:bg-[#9945FF]/10"
                        onClick={() => copyToClipboard(generatedCredentials.username)}
                      >
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <p className="font-mono text-[#9945FF] text-lg">{generatedCredentials.username}</p>
                  </div>
                  
                  <div className="bg-black/60 rounded-lg p-4 border border-[#9945FF]/20">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm text-gray-400">Password</label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-[#9945FF] hover:text-[#9945FF] hover:bg-[#9945FF]/10"
                        onClick={() => copyToClipboard(generatedCredentials.password)}
                      >
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <p className="font-mono text-[#9945FF] text-lg">{generatedCredentials.password}</p>
                  </div>
                </div>
                
                <div className="bg-yellow-950/30 rounded-lg p-3 border border-yellow-600/20 text-sm text-yellow-400">
                  <AlertTriangle className="h-4 w-4 inline-block mr-1" />
                  These credentials will not be displayed again. Make sure to save them or share them securely with the team.
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <AlertTriangle className="h-10 w-10 text-yellow-500 mb-4" />
                <p className="text-gray-400">Failed to generate credentials. Please try again.</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => setIsCredentialsDialogOpen(false)}
            >
              Close
            </Button>
            {generatedCredentials && (
              <Button 
                className="bg-gradient-to-r from-[#9945FF] to-[#8833dd] text-white"
                onClick={() => {
                  const message = `Team: ${selectedTeam?.name}\nUsername: ${generatedCredentials.username}\nPassword: ${generatedCredentials.password}`;
                  copyToClipboard(message);
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy All
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Profile Dialog */}
      <Dialog open={isViewProfileDialogOpen} onOpenChange={setIsViewProfileDialogOpen}>
        <DialogContent className="bg-[#0A0F1A] border-[#FF007F]/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center">
              <Eye className="h-5 w-5 mr-2 text-[#FF007F]" />
              User Profile
            </DialogTitle>
            <DialogDescription>
              {selectedUser && `Details for ${selectedUser.name}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6 py-3">
              <div className="flex justify-center mb-6">
                <Avatar className="h-24 w-24 border-2 border-[#FF007F]/50">
                  <AvatarImage 
                    src={`https://api.dicebear.com/7.x/bottts/svg?seed=${selectedUser.email}`} 
                    alt={selectedUser.name} 
                  />
                  <AvatarFallback className="bg-[#FF007F]/20 text-[#FF007F] text-xl">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="space-y-4">
                <div className="bg-black/60 rounded-lg p-4 border border-[#FF007F]/20">
                  <label className="text-sm text-gray-400 block mb-1">Full Name</label>
                  <p className="text-white text-lg">{selectedUser.name}</p>
                </div>
                
                <div className="bg-black/60 rounded-lg p-4 border border-[#FF007F]/20">
                  <label className="text-sm text-gray-400 block mb-1">Email Address</label>
                  <p className="text-white text-lg">{selectedUser.email}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/60 rounded-lg p-4 border border-[#FF007F]/20">
                    <label className="text-sm text-gray-400 block mb-1">Role</label>
                    <p className="text-white capitalize">{selectedUser.role}</p>
                  </div>
                  
                  <div className="bg-black/60 rounded-lg p-4 border border-[#FF007F]/20">
                    <label className="text-sm text-gray-400 block mb-1">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedUser.status === 'active' ? 'bg-green-950 text-green-400' :
                      selectedUser.status === 'pending' ? 'bg-yellow-950 text-yellow-400' :
                      'bg-red-950 text-red-400'
                    }`}>
                      {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="bg-black/60 rounded-lg p-4 border border-[#FF007F]/20">
                  <label className="text-sm text-gray-400 block mb-1">Team</label>
                  <p className="text-white">
                    {selectedUser.teamName || 'Not assigned to a team'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => setIsViewProfileDialogOpen(false)}
            >
              Close
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#FF007F] to-[#CC0066] text-white"
              onClick={() => {
                setIsViewProfileDialogOpen(false);
                setEmailSubject('');
                setEmailBody('');
                setIsEmailDialogOpen(true);
              }}
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="bg-[#0A0F1A] border-[#007BFF]/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center">
              <Mail className="h-5 w-5 mr-2 text-[#007BFF]" />
              Send Email
            </DialogTitle>
            <DialogDescription>
              {selectedUser && `Send an email to ${selectedUser.name} (${selectedUser.email})`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <Label htmlFor="email-subject" className="text-gray-300">Subject</Label>
              <Input
                id="email-subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="bg-black/60 border-gray-700 text-white focus:border-[#007BFF]"
                placeholder="Email subject line"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-body" className="text-gray-300">Message</Label>
              <Textarea
                id="email-body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="bg-black/60 border-gray-700 text-white min-h-[200px] focus:border-[#007BFF]"
                placeholder="Enter your message here..."
              />
            </div>
            
            <div className="bg-blue-950/30 rounded-lg p-3 border border-blue-600/20 text-sm text-blue-400">
              <AlertTriangle className="h-4 w-4 inline-block mr-1" />
              This email will be sent directly to the user's registered email address.
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => setIsEmailDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white"
              onClick={() => {
                if (selectedUser) {
                  sendEmailMutation.mutate({
                    userId: selectedUser.id,
                    subject: emailSubject,
                    body: emailBody,
                  });
                  setIsEmailDialogOpen(false);
                }
              }}
              disabled={!emailSubject.trim() || !emailBody.trim() || sendEmailMutation.isPending}
            >
              {sendEmailMutation.isPending ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Mail className="h-4 w-4 mr-2" />
              )}
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent className="bg-[#0A0F1A] border-purple-500/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center">
              <Shield className="h-5 w-5 mr-2 text-purple-400" />
              Reset Password
            </DialogTitle>
            <DialogDescription>
              {selectedUser && `Reset password for ${selectedUser.name}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-gray-300">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-black/60 border-gray-700 text-white focus:border-purple-500 pr-20"
                  placeholder="Enter new password"
                />
                <Button
                  size="sm"
                  variant="ghost" 
                  className="absolute right-0 top-0 h-full px-3 text-purple-400 hover:text-purple-400 hover:bg-purple-900/10"
                  onClick={() => {
                    // Generate a random secure password
                    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!..#$%^&*()';
                    let password = '';
                    for (let i = 0; i < 12; i++) {
                      password += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    setNewPassword(password);
                  }}
                >
                  Generate
                </Button>
              </div>
            </div>
            
            <div className="bg-purple-950/30 rounded-lg p-3 border border-purple-600/20 text-sm text-purple-400">
              <AlertTriangle className="h-4 w-4 inline-block mr-1" />
              After resetting, the new password will be sent to the user's email address.
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => setIsResetPasswordDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-[#6025aa] text-white"
              onClick={() => {
                if (selectedUser) {
                  resetPasswordMutation.mutate({
                    userId: selectedUser.id,
                    newPassword: newPassword
                  });
                  setIsResetPasswordDialogOpen(false);
                }
              }}
              disabled={!newPassword.trim() || newPassword.length < 8 || resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Shield className="h-4 w-4 mr-2" />
              )}
              Reset Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}