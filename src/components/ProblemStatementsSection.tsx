import { useState } from "react";
import { Link } from "wouter";


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

export default function ProblemStatementsSection() {
  const [activeCategory, setActiveCategory] = useState<ProblemCategory>('AI & ML');
  
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

  const categories: ProblemCategory[] = ['AI & ML', 'Cybersecurity', 'Blockchain', 'Healthcare', 'Green Tech'];
  
  const categoryColors = {
    'AI & ML': '#007BFF',
    'Cybersecurity': '#00FFD1',
    'Blockchain': '#FF007F',
    'Healthcare': '#007BFF',
    'Green Tech': '#00FFD1'
  };
  
  return (
    <section id="problems" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-center mb-6 text-shadow-neon-green">
          PROBLEM STATEMENTS
        </h2>
        <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Choose from a variety of challenging problem statements across different domains and build innovative solutions.
        </p>

        {/* Problem Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab font-orbitron px-6 py-3 rounded-md border transition-all duration-300 ${
                activeCategory === category 
                  ? `bg-[${categoryColors[category]}]/20 border-[${categoryColors[category]}]/50 text-[${categoryColors[category]}] shadow-[0_0_5px_${categoryColors[category]},0_0_10px_${categoryColors[category]}]` 
                  : `bg-[${categoryColors[category]}]/10 border-[${categoryColors[category]}]/30 text-white hover:bg-[${categoryColors[category]}]/20 hover:border-[${categoryColors[category]}]/50`
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <div
              key={problem.id}
              className="problem-card glassmorphism rounded-xl overflow-hidden border border-[${problem.color}]/30 group"
            >
              <div className={`h-2 bg-gradient-to-r from-[${problem.color}] to-[#007BFF]`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`font-orbitron text-xl font-bold text-[${problem.color}] group-hover:text-shadow-neon-${problem.color === '#00FFD1' ? 'green' : problem.color === '#FF007F' ? 'pink' : 'blue'} transition-all duration-300`}>
                    {problem.title}
                  </h3>
                  <span className={`bg-[${problem.color}]/20 text-[${problem.color}] text-xs px-3 py-1 rounded-full font-orbitron`}>
                    {problem.category}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">
                  {problem.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-400 mr-2">Difficulty:</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i}
                          className={`fas fa-star text-sm ${i < problem.difficulty ? `text-[${problem.color}]` : 'text-gray-600'}`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <span className="text-[#00FFD1] font-orbitron">{problem.prize}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Teams: {problem.teams}</span>
                  <Link href={`/problems/${problem.slug}`} className={`text-[${problem.color}] font-orbitron text-sm flex items-center group`}>
                    VIEW DETAILS
                    <i className="fas fa-chevron-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/problems" className="inline-block glassmorphism font-orbitron font-bold px-8 py-4 rounded-md border border-[#007BFF]/50 text-[#007BFF] hover:shadow-neon-blue transition-all duration-300 text-center group">
            VIEW ALL PROBLEMS
            <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
          </Link>
        </div>
        
        {/* Live Updates Marquee */}
        <div className="mt-16 overflow-hidden py-4 bg-[#1A1A2E] border-y border-[#00FFD1]/20">
          <div className="flex items-center animate-marquee">
            <div className="flex items-center space-x-8 whitespace-nowrap px-8">
              <span className="text-[#00FFD1] font-orbitron flex items-center">
                <i className="fas fa-circle text-xs animate-pulse mr-2"></i>
                NEW PROBLEMS DROPPING SOON!
              </span>
              <span className="text-[#FF007F] font-orbitron flex items-center">
                <i className="fas fa-trophy mr-2"></i>
                EXPANDED PRIZE POOL - NOW $50,000!
              </span>
              <span className="text-[#007BFF] font-orbitron flex items-center">
                <i className="fas fa-users mr-2"></i>
                OVER 200 TEAMS REGISTERED ALREADY!
              </span>
              <span className="text-[#00FFD1] font-orbitron flex items-center">
                <i className="fas fa-circle text-xs animate-pulse mr-2"></i>
                NEW PROBLEMS DROPPING SOON!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
