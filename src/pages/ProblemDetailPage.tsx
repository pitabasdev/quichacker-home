import { useParams } from 'wouter';
import { useState, useEffect } from 'react';
import CircuitLines from "../components/ui/CircuitLines";
import { Link } from 'wouter';
import { ChevronLeft, CheckCircle, Clock, Trophy, Users, BookOpen, Code, FileText, AlertTriangle } from 'lucide-react';

// Reusing the Problem interface from ProblemStatementsSection
type ProblemCategory = 'AI & ML' | 'Cybersecurity' | 'Blockchain' | 'Healthcare' | 'Green Tech';

interface Problem {
  id: number;
  title: string;
  category: ProblemCategory;
  description: string;
  difficulty: number;
  prize: string;
  teams: number;
  color: string;
  slug: string;
  longDescription?: string;
  requirements?: string[];
  resources?: { name: string; url: string }[];
  timeline?: { phase: string; deadline: string }[];
  evaluation?: { criteria: string; weight: number }[];
  faqs?: { question: string; answer: string }[];
}

export default function ProblemDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'resources' | 'evaluation'>('overview');

  useEffect(() => {
    // Fetch problem data - in a real app, this would be an API call
    // For this demo, we'll use hardcoded data
    const problems: Problem[] = [
      {
        id: 1,
        title: "AI Voice Assistant",
        category: "AI & ML",
        description: "Build an AI-powered voice assistant that can understand and respond to complex queries in multiple languages.",
        difficulty: 3,
        prize: "$3000",
        teams: 24,
        color: "#007BFF", // Cyber blue
        slug: "ai-voice-assistant",
        longDescription: "Create a next-generation AI voice assistant that can handle complex conversational contexts, understand multiple languages, and provide intelligent responses. The assistant should be able to perform tasks like setting reminders, answering knowledge-based questions, controlling IoT devices, and learning from user interactions over time. Your solution should showcase advanced natural language processing capabilities and exhibit a personality that makes interactions feel natural and engaging.",
        requirements: [
          "Must support at least 3 languages (English, Spanish, and one of your choice)",
          "Must understand context across multiple conversation turns",
          "Must have a response time under 2 seconds",
          "Should include voice recognition and speech synthesis components",
          "Must provide a web or mobile interface for demonstration",
          "Must implement an extensible architecture that allows for future skill additions",
          "Must handle at least 15 different types of queries (weather, time, calculations, knowledge, etc.)",
          "Should have personality and conversational capabilities"
        ],
        resources: [
          { name: "OpenAI API Documentation", url: "https://platform.openai.com/docs/api-reference" },
          { name: "Mozilla Speech Recognition API", url: "https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition" },
          { name: "Web Speech API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API" },
          { name: "Google Cloud Speech-to-Text", url: "https://cloud.google.com/speech-to-text" }
        ],
        timeline: [
          { phase: "Submission", deadline: "October 15, 2023, 11:59 PM" },
          { phase: "Initial Evaluation", deadline: "October 20, 2023" },
          { phase: "Final Presentations", deadline: "October 25, 2023" }
        ],
        evaluation: [
          { criteria: "Technical Implementation", weight: 35 },
          { criteria: "User Experience & Design", weight: 25 },
          { criteria: "Language Support & Accuracy", weight: 20 },
          { criteria: "Innovation & Creativity", weight: 10 },
          { criteria: "Documentation & Code Quality", weight: 10 }
        ],
        faqs: [
          { 
            question: "Can we use pre-trained language models like GPT?", 
            answer: "Yes, you are encouraged to use pre-trained models. The focus should be on integration, user experience, and novel applications." 
          },
          { 
            question: "Does the assistant need a visual interface?", 
            answer: "Yes, your submission should include at least a basic visual interface to showcase the assistant's capabilities, though the primary interaction should be voice-based." 
          },
          { 
            question: "Can we form teams?", 
            answer: "Yes, teams can include 2-4 members. Individual submissions are also accepted." 
          }
        ]
      },
      {
        id: 2,
        title: "Cyber Defense Challenge",
        category: "Cybersecurity",
        description: "Create an AI-powered firewall system that can detect and prevent real-time cyber attacks and threats.",
        difficulty: 4,
        prize: "$5000",
        teams: 36,
        color: "#FF007F", // Cyber pink
        slug: "cyber-defense-challenge",
        longDescription: "Design and implement an advanced cybersecurity solution that can identify, analyze, and respond to emerging cyber threats in real-time. Your system should leverage artificial intelligence and machine learning to recognize patterns of malicious activity, adapt to new attack vectors, and automatically deploy countermeasures. The solution should provide comprehensive monitoring, threat intelligence, and reporting capabilities while maintaining high performance and low false positive rates. This challenge aims to address the growing sophistication of cyber attacks and the need for more intelligent defense systems.",
        requirements: [
          "Must detect at least 5 types of common cyber attacks (DDoS, SQL Injection, XSS, etc.)",
          "Must have real-time monitoring and alerting capabilities",
          "Must implement machine learning for anomaly detection",
          "Must include a dashboard for threat visualization and analytics",
          "Should have automated response capabilities to common threats",
          "Must be able to process network traffic logs and identify potential threats",
          "Should include detailed documentation on system architecture and detection methods",
          "Must have a demonstration environment with simulated attack scenarios"
        ],
        resources: [
          { name: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
          { name: "MITRE ATT&CK Framework", url: "https://attack.mitre.org/" },
          { name: "TensorFlow for Cybersecurity", url: "https://www.tensorflow.org/tutorials" },
          { name: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" }
        ],
        timeline: [
          { phase: "Submission", deadline: "October 15, 2023, 11:59 PM" },
          { phase: "Initial Evaluation", deadline: "October 18, 2023" },
          { phase: "Security Testing", deadline: "October 23, 2023" },
          { phase: "Final Presentations", deadline: "October 25, 2023" }
        ],
        evaluation: [
          { criteria: "Detection Effectiveness", weight: 30 },
          { criteria: "False Positive Rate", weight: 20 },
          { criteria: "System Performance", weight: 15 },
          { criteria: "Innovation & Technical Approach", weight: 15 },
          { criteria: "User Interface & Reporting", weight: 10 },
          { criteria: "Documentation & Deployment", weight: 10 }
        ],
        faqs: [
          { 
            question: "Do we need to build hardware components?", 
            answer: "No, this challenge focuses on software solutions. Your system should be deployable on standard computing infrastructure." 
          },
          { 
            question: "Can we use commercial security tools as part of our solution?", 
            answer: "You may integrate with open-source security tools, but the core AI/ML capabilities and analysis should be your original work." 
          },
          { 
            question: "Will you provide a testing environment?", 
            answer: "We will provide a basic virtual environment for testing your solution against standard attack scenarios. You are also encouraged to create your own test cases." 
          }
        ]
      },
      {
        id: 3,
        title: "Blockchain Voting",
        category: "Blockchain",
        description: "Develop a secure and transparent blockchain-based voting system that ensures election integrity and voter privacy.",
        difficulty: 5,
        prize: "$7500",
        teams: 18,
        color: "#00FFD1", // Cyber green
        slug: "blockchain-voting",
        longDescription: "Create an innovative blockchain-based voting platform that addresses the critical challenges of modern electoral systems: security, transparency, accessibility, and trust. Your solution should leverage blockchain technology to create an immutable record of votes while preserving voter anonymity and preventing double-voting. The system should be accessible to voters of various technical backgrounds and abilities, provide verifiable results, and include mechanisms for voter authentication. This challenge seeks to demonstrate how distributed ledger technology can transform democratic processes while maintaining the highest standards of electoral integrity.",
        requirements: [
          "Must implement a blockchain-based voting mechanism with immutable records",
          "Must ensure voter anonymity while preventing double-voting",
          "Must include secure voter authentication methods",
          "Must provide end-to-end verifiability of votes",
          "Should have an intuitive user interface accessible to non-technical users",
          "Must include administrative functions for election setup and management",
          "Should implement smart contracts for automated vote counting and verification",
          "Must include detailed security documentation and threat model analysis",
          "Should be scalable to handle at least 10,000 simulated voters"
        ],
        resources: [
          { name: "Ethereum Development Documentation", url: "https://ethereum.org/en/developers/docs/" },
          { name: "Solidity Documentation", url: "https://docs.soliditylang.org/" },
          { name: "Zero-Knowledge Proofs", url: "https://z.cash/technology/zksnarks/" },
          { name: "Election Verification Standards", url: "https://www.nist.gov/itl/ssd/sis/voting" }
        ],
        timeline: [
          { phase: "Submission", deadline: "October 15, 2023, 11:59 PM" },
          { phase: "Code Review", deadline: "October 19, 2023" },
          { phase: "Security Audit", deadline: "October 22, 2023" },
          { phase: "Final Presentations", deadline: "October 25, 2023" }
        ],
        evaluation: [
          { criteria: "Security & Privacy Protection", weight: 30 },
          { criteria: "Technical Implementation", weight: 25 },
          { criteria: "Usability & Accessibility", weight: 15 },
          { criteria: "Scalability & Performance", weight: 15 },
          { criteria: "Innovation & Problem-solving", weight: 10 },
          { criteria: "Documentation & Presentation", weight: 5 }
        ],
        faqs: [
          { 
            question: "Which blockchain platform should we use?", 
            answer: "You may choose any blockchain platform (Ethereum, Polkadot, Solana, etc.) or create your own. Your choice should be justified in your documentation." 
          },
          { 
            question: "How should voter authentication be handled?", 
            answer: "Your solution should propose a secure authentication method. This could involve digital identities, biometrics, multi-factor authentication, or other innovative approaches that balance security and accessibility." 
          },
          { 
            question: "Do we need to implement a full voting system?", 
            answer: "Yes, your submission should include all core components: voter registration, authentication, vote casting, tabulation, and verification. The focus should be on the security and transparency aspects." 
          }
        ]
      }
    ];

    // Find problem by slug
    const foundProblem = problems.find(p => p.slug === slug);
    setProblem(foundProblem || null);
  }, [slug]);

  if (!problem) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-radial from-[#1A1A2E] to-[#0D1117] z-[-2]"></div>
        <CircuitLines />
        <div className="text-center">
          <h2 className="font-orbitron text-2xl text-[#FF007F]">Problem not found</h2>
          <p className="text-gray-400 mt-2">The problem you're looking for doesn't exist or has been removed.</p>
          <Link href="/problems" className="inline-block mt-6 px-6 py-3 border border-[#00FFD1] text-[#00FFD1] rounded-md font-orbitron hover:bg-[#00FFD1]/10 transition-all">
            Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  // Get color name for text shadows and other styling
  const getColorName = (color: string) => {
    if (color === "#00FFD1") return "green";
    if (color === "#FF007F") return "pink";
    return "blue";
  };

  const colorName = getColorName(problem.color);
  const shadowClass = `text-shadow-neon-${colorName}`;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-radial from-[#1A1A2E] to-[#0D1117] z-[-2]"></div>
      <CircuitLines />
      
      <div className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb and Back button */}
          <div className="mb-8">
            <Link href="/problems" className="inline-flex items-center text-gray-400 hover:text-[#00FFD1] transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Problems
            </Link>
          </div>
          
          {/* Problem Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <span className={`inline-block bg-[${problem.color}]/20 text-[${problem.color}] text-xs px-3 py-1 rounded-full font-orbitron mb-4`}>
                  {problem.category}
                </span>
                <h1 className={`font-orbitron text-3xl md:text-4xl font-bold ${shadowClass}`}>
                  {problem.title}
                </h1>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className={`glassmorphism inline-flex items-center px-6 py-3 border border-[${problem.color}] text-[${problem.color}] rounded-md font-orbitron hover:bg-[${problem.color}]/10 transition-all`}>
                  <Users className="w-4 h-4 mr-2" />
                  Register Team
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="glassmorphism p-4 rounded-lg border border-[#007BFF]/20 flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#007BFF]/20 flex items-center justify-center mr-3">
                  <Trophy className="h-5 w-5 text-[#007BFF]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Prize</p>
                  <p className="font-orbitron text-[#007BFF]">{problem.prize}</p>
                </div>
              </div>
              
              <div className="glassmorphism p-4 rounded-lg border border-[#00FFD1]/20 flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#00FFD1]/20 flex items-center justify-center mr-3">
                  <AlertTriangle className="h-5 w-5 text-[#00FFD1]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Difficulty</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i}
                        className={`fas fa-star text-sm ${i < problem.difficulty ? 'text-[#00FFD1]' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="glassmorphism p-4 rounded-lg border border-[#FF007F]/20 flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#FF007F]/20 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-[#FF007F]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Teams Registered</p>
                  <p className="font-orbitron text-[#FF007F]">{problem.teams}</p>
                </div>
              </div>
              
              <div className="glassmorphism p-4 rounded-lg border border-[#007BFF]/20 flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#007BFF]/20 flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-[#007BFF]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Submission Deadline</p>
                  <p className="font-orbitron text-[#007BFF]">Oct 15, 2023</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="border-b border-gray-800 mb-8">
            <div className="flex flex-wrap -mb-px">
              <button
                className={`mr-8 py-4 border-b-2 font-orbitron font-medium text-sm ${
                  activeTab === 'overview' 
                    ? `border-[${problem.color}] text-[${problem.color}]` 
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                } transition-all duration-200`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`mr-8 py-4 border-b-2 font-orbitron font-medium text-sm ${
                  activeTab === 'requirements' 
                    ? `border-[${problem.color}] text-[${problem.color}]` 
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                } transition-all duration-200`}
                onClick={() => setActiveTab('requirements')}
              >
                Requirements
              </button>
              <button
                className={`mr-8 py-4 border-b-2 font-orbitron font-medium text-sm ${
                  activeTab === 'resources' 
                    ? `border-[${problem.color}] text-[${problem.color}]` 
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                } transition-all duration-200`}
                onClick={() => setActiveTab('resources')}
              >
                Resources
              </button>
              <button
                className={`mr-8 py-4 border-b-2 font-orbitron font-medium text-sm ${
                  activeTab === 'evaluation' 
                    ? `border-[${problem.color}] text-[${problem.color}]` 
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                } transition-all duration-200`}
                onClick={() => setActiveTab('evaluation')}
              >
                Evaluation
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="mb-16">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="glassmorphism rounded-xl p-6 border border-[#2A2A4A]/50">
                  <h2 className="font-orbitron text-xl font-bold mb-4 text-white">Challenge Description</h2>
                  <p className="text-gray-300 leading-relaxed">{problem.longDescription}</p>
                </div>
                
                <div className="glassmorphism rounded-xl p-6 border border-[#2A2A4A]/50">
                  <h2 className="font-orbitron text-xl font-bold mb-4 text-white">Timeline</h2>
                  <div className="space-y-4">
                    {problem.timeline?.map((item, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="h-8 w-8 rounded-full bg-[#1A1A2E] border border-[#007BFF] flex items-center justify-center">
                            <span className="text-xs text-[#007BFF] font-bold">{index + 1}</span>
                          </div>
                          {index < (problem.timeline?.length || 0) - 1 && (
                            <div className="w-0.5 h-full bg-[#007BFF]/30 my-1"></div>
                          )}
                        </div>
                        <div className="pb-5">
                          <h3 className="font-orbitron text-md text-[#007BFF]">{item.phase}</h3>
                          <p className="text-gray-400 text-sm">{item.deadline}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="glassmorphism rounded-xl p-6 border border-[#2A2A4A]/50">
                  <h2 className="font-orbitron text-xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {problem.faqs?.map((faq, index) => (
                      <div key={index} className="border-b border-[#2A2A4A] pb-4 last:border-0">
                        <h3 className="font-orbitron text-lg text-[#00FFD1] mb-2">{faq.question}</h3>
                        <p className="text-gray-300">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'requirements' && (
              <div className="glassmorphism rounded-xl p-6 border border-[#2A2A4A]/50">
                <h2 className="font-orbitron text-xl font-bold mb-6 text-white">Technical Requirements</h2>
                <ul className="space-y-4">
                  {problem.requirements?.map((req, index) => (
                    <li key={index} className="flex">
                      <CheckCircle className="h-5 w-5 text-[#00FFD1] shrink-0 mr-3 mt-0.5" />
                      <span className="text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'resources' && (
              <div className="glassmorphism rounded-xl p-6 border border-[#2A2A4A]/50">
                <h2 className="font-orbitron text-xl font-bold mb-6 text-white">Helpful Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {problem.resources?.map((resource, index) => (
                    <a 
                      key={index} 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-4 rounded-lg bg-[#1A1A2E] border border-[#2A2A4A] hover:border-[#00FFD1]/50 transition-all"
                    >
                      <div className="h-10 w-10 rounded-full bg-[#00FFD1]/10 flex items-center justify-center mr-4">
                        <BookOpen className="h-5 w-5 text-[#00FFD1]" />
                      </div>
                      <div>
                        <h3 className="font-orbitron text-white">{resource.name}</h3>
                        <p className="text-xs text-gray-400">External Resource</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'evaluation' && (
              <div className="glassmorphism rounded-xl p-6 border border-[#2A2A4A]/50">
                <h2 className="font-orbitron text-xl font-bold mb-6 text-white">Evaluation Criteria</h2>
                <div className="space-y-6">
                  {problem.evaluation?.map((criteria, index) => (
                    <div key={index} className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-orbitron text-lg text-white">{criteria.criteria}</h3>
                        <span className="text-[#007BFF] font-bold">{criteria.weight}%</span>
                      </div>
                      <div className="w-full bg-[#1A1A2E] rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-[#007BFF] to-[#00FFD1] h-2.5 rounded-full"
                          style={{ width: `${criteria.weight}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Registration CTA */}
          <div className="glassmorphism rounded-xl p-8 border border-[#FF007F]/30 bg-gradient-to-r from-[#1A1A2E] to-[#0D1117] relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF007F] via-[#007BFF] to-[#00FFD1] opacity-20 rounded-xl blur-sm"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-orbitron text-2xl font-bold text-white mb-2">Ready to take on this challenge?</h3>
                <p className="text-gray-300">Join over {problem.teams} teams working on innovative solutions!</p>
              </div>
              <Link 
                href="/register" 
                className="inline-flex items-center px-8 py-3 bg-[#FF007F]/20 border border-[#FF007F] text-[#FF007F] font-orbitron font-bold rounded-md hover:bg-[#FF007F]/30 transition-all"
              >
                <Code className="mr-2 h-5 w-5" />
                Register Your Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}