import { useState } from 'react';
import CyberpunkCard3D from "../components/ui/CyberpunkCard3D";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const helpCategories = [
    {
      title: "Getting Started",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      articles: [
        "How to Register for QuickHacker 2025",
        "Setting Up Your Participant Profile",
        "Joining or Creating a Team",
        "Understanding Hackathon Categories",
        "Pre-Hackathon Checklist"
      ]
    },
    {
      title: "Platform Guide",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      articles: [
        "Navigating the QuickHacker Dashboard",
        "Using the Team Collaboration Tools",
        "Accessing Resources and APIs",
        "Project Submission Process",
        "Contacting Mentors for Help"
      ]
    },
    {
      title: "Hackathon Rules",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      articles: [
        "Official Rules and Guidelines",
        "Code of Conduct",
        "Intellectual Property Policy",
        "Judging Criteria Explained",
        "Disqualification Reasons"
      ]
    },
    {
      title: "Technical Support",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      articles: [
        "Troubleshooting Common Issues",
        "API Integration Guides",
        "Setting Up Development Environments",
        "Presentation and Demo Tips",
        "Using Provided Cloud Resources"
      ]
    },
    {
      title: "Prizes & Judging",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      articles: [
        "Prize Categories and Amounts",
        "How Projects Are Evaluated",
        "Tips for Impressing the Judges",
        "Post-Hackathon Opportunities",
        "Previous Winners' Showcase"
      ]
    },
    {
      title: "Community",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      articles: [
        "Joining the Discord Community",
        "Networking Opportunities",
        "Finding Team Members",
        "Mentor Office Hours Schedule",
        "Social Media Channels and Hashtags"
      ]
    },
  ];
  
  // Popular articles for quick access
  const popularArticles = [
    "How to Submit Your Project Before the Deadline",
    "Setting Up the QuickHacker API Access",
    "Troubleshooting Team Collaboration Issues",
    "Preparing Your Final Presentation",
    "Post-Hackathon Next Steps"
  ];
  
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <h1 className="font-orbitron text-4xl md:text-6xl text-center font-bold mb-8">
          <span className="text-[#00FFD1]">HELP</span>
          <span className="text-white"> CENTER</span>
        </h1>
        
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Welcome to the QuickHacker Help Center. Find guides, tutorials, and answers to all your questions about participating in our hackathon.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111827] text-white px-5 py-4 pr-12 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FFD1] border border-[#00FFD1]/20"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#00FFD1]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {helpCategories.map((category, index) => (
            <CyberpunkCard3D 
              key={index}
              className="p-6"
              borderColor={index % 3 === 0 ? "#00FFD1" : index % 3 === 1 ? "#007BFF" : "#FF007F"}
              glowColor={index % 3 === 0 ? "rgba(0, 255, 209, 0.5)" : index % 3 === 1 ? "rgba(0, 123, 255, 0.5)" : "rgba(255, 0, 127, 0.5)"}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`text-${index % 3 === 0 ? "[#00FFD1]" : index % 3 === 1 ? "[#007BFF]" : "[#FF007F]"} mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-orbitron mb-4 text-white">{category.title}</h3>
                <ul className="space-y-2">
                  {category.articles.map((article, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-300 hover:text-[#00FFD1] transition-colors text-sm">
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
                <a 
                  href="#" 
                  className={`mt-6 text-${index % 3 === 0 ? "[#00FFD1]" : index % 3 === 1 ? "[#007BFF]" : "[#FF007F]"} text-sm font-medium hover:underline`}
                >
                  View All Articles →
                </a>
              </div>
            </CyberpunkCard3D>
          ))}
        </div>
        
        {/* Popular Articles */}
        <div className="bg-[#0A0F1A] rounded-lg p-8 border border-[#00FFD1]/20">
          <h2 className="text-2xl font-orbitron mb-6 text-white text-center">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.map((article, index) => (
              <a 
                key={index} 
                href="#" 
                className="p-4 bg-[#111827] rounded-md border border-[#00FFD1]/10 hover:border-[#00FFD1]/30 transition-colors group"
              >
                <div className="flex items-start">
                  <div className="text-[#00FFD1] mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 group-hover:text-[#00FFD1] transition-colors">{article}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
        
        {/* Contact Support */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-orbitron mb-4 text-white">Couldn't Find What You're Looking For?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our support team is available to help you with any questions or issues you might have.
          </p>
          <a 
            href="/support" 
            className="inline-block px-8 py-3 bg-[#00FFD1] text-[#0A0F1A] rounded-md font-orbitron hover:bg-[#00FFD1]/90 transition-colors"
          >
            CONTACT SUPPORT
          </a>
        </div>
      </div>
    </div>
  );
}