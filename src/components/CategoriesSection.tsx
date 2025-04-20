import { useState } from 'react';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';

export default function CategoriesSection() {
  const [activeTab, setActiveTab] = useState('ai');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const categories = [
    { id: 'ai', name: 'AI & Machine Learning', icon: '🚀', color: '#FF007F' },
    { id: 'cyber', name: 'Cybersecurity', icon: '🔐', color: '#00FFD1' },
    { id: 'sustainability', name: 'Sustainability & Climate Tech', icon: '🌍', color: '#007BFF' },
    { id: 'fintech', name: 'FinTech & Blockchain', icon: '💳', color: '#FFD100' },
    { id: 'health', name: 'HealthTech & Smart Medical', icon: '🏥', color: '#9400D3' },
  ];

  // Sample challenges for each category
  const challenges = {
    ai: [
      { id: 1, title: 'AI-Powered Content Moderation', difficulty: 4, prize: '$2,500' },
      { id: 2, title: 'Natural Language Interface for Code', difficulty: 5, prize: '$3,000' },
      { id: 3, title: 'Computer Vision for Accessibility', difficulty: 3, prize: '$2,000' },
    ],
    cyber: [
      { id: 1, title: 'Zero-Knowledge Authentication System', difficulty: 5, prize: '$3,000' },
      { id: 2, title: 'Secure Data Sharing Protocol', difficulty: 4, prize: '$2,500' },
      { id: 3, title: 'Threat Intelligence Dashboard', difficulty: 3, prize: '$2,000' },
    ],
    sustainability: [
      { id: 1, title: 'Carbon Footprint Tracker', difficulty: 3, prize: '$2,000' },
      { id: 2, title: 'Smart Energy Management System', difficulty: 4, prize: '$2,500' },
      { id: 3, title: 'Sustainable Supply Chain Monitor', difficulty: 4, prize: '$2,500' },
    ],
    fintech: [
      { id: 1, title: 'Decentralized Finance Dashboard', difficulty: 5, prize: '$3,000' },
      { id: 2, title: 'Crypto Payment Gateway', difficulty: 4, prize: '$2,500' },
      { id: 3, title: 'Fraud Detection System', difficulty: 4, prize: '$2,500' },
    ],
    health: [
      { id: 1, title: 'Remote Patient Monitoring', difficulty: 4, prize: '$2,500' },
      { id: 2, title: 'Medical Records on Blockchain', difficulty: 5, prize: '$3,000' },
      { id: 3, title: 'Mental Health Analytics', difficulty: 3, prize: '$2,000' },
    ],
  };

  // Function to get category color
  const getCategoryColor = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.color || '#FF007F';
  };

  // Get current challenges
  const currentChallenges = challenges[activeTab as keyof typeof challenges];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your <span className="text-[#007BFF]">Challenge</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF007F] via-[#00FFD1] to-[#007BFF] mx-auto"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-4 py-2 rounded-full font-orbitron text-sm md:text-base transition-all duration-300 flex items-center ${
                activeTab === category.id
                  ? `bg-${category.color.replace('#', '')} text-black`
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              style={{
                backgroundColor: activeTab === category.id ? `${category.color}` : '',
                boxShadow: activeTab === category.id ? `0 0 15px ${category.color}` : 'none',
              }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Challenges Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="relative perspective-1000 group"
              onMouseEnter={() => setHoveredCard(challenge.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`p-6 rounded-xl transition-all duration-500 h-full transform-style-3d ${
                  hoveredCard === challenge.id ? 'scale-105' : ''
                }`}
                style={{
                  background: `linear-gradient(135deg, rgba(10, 10, 20, 0.8) 0%, rgba(20, 20, 40, 0.6) 100%)`,
                  borderTop: `2px solid ${getCategoryColor(activeTab)}`,
                  borderRight: `2px solid ${getCategoryColor(activeTab)}`,
                  boxShadow: hoveredCard === challenge.id 
                    ? `0 0 20px ${getCategoryColor(activeTab)}80` 
                    : `0 0 10px ${getCategoryColor(activeTab)}30`,
                  transform: hoveredCard === challenge.id 
                    ? `translateZ(20px) rotateX(${Math.random() * 2}deg) rotateY(${Math.random() * 5}deg)` 
                    : 'translateZ(0) rotateX(0) rotateY(0)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="absolute top-4 right-4">
                  <div 
                    className="rounded-full px-3 py-1 text-xs font-bold"
                    style={{ 
                      backgroundColor: getCategoryColor(activeTab),
                      color: 'black',
                      boxShadow: `0 0 10px ${getCategoryColor(activeTab)}`,
                      transform: hoveredCard === challenge.id ? 'translateZ(30px)' : 'translateZ(0)',
                      transition: 'all 0.3s ease-out'
                    }}
                  >
                    {challenge.prize}
                  </div>
                </div>

                <h3 
                  className="font-orbitron text-xl font-bold mb-4"
                  style={{ 
                    color: getCategoryColor(activeTab),
                    textShadow: `0 0 8px ${getCategoryColor(activeTab)}50`,
                    transform: hoveredCard === challenge.id ? 'translateZ(40px)' : 'translateZ(0)',
                    transition: 'all 0.3s ease-out'
                  }}
                >
                  {challenge.title}
                </h3>

                <div className="mb-4"
                  style={{ 
                    transform: hoveredCard === challenge.id ? 'translateZ(25px)' : 'translateZ(0)',
                    transition: 'all 0.3s ease-out'
                  }}
                >
                  <div className="text-gray-400 text-sm mb-2">Difficulty:</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className={`h-2 w-8 rounded-full mr-1 ${
                          i < challenge.difficulty ? 'bg-gradient-to-r' : 'bg-gray-700'
                        }`}
                        style={{ 
                          backgroundImage: i < challenge.difficulty 
                            ? `linear-gradient(to right, ${getCategoryColor(activeTab)}, ${getCategoryColor(activeTab)}80)` 
                            : '',
                          boxShadow: i < challenge.difficulty ? `0 0 5px ${getCategoryColor(activeTab)}50` : ''
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div 
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ 
                    transform: hoveredCard === challenge.id ? 'translateZ(35px)' : 'translateZ(0)',
                    transition: 'all 0.3s ease-out'
                  }}
                >
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ 
                      background: getCategoryColor(activeTab),
                      boxShadow: `0 0 15px ${getCategoryColor(activeTab)}`
                    }}
                  >
                    <ChevronRight className="h-6 w-6 text-black" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/problems">
            <a className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#007BFF] text-[#007BFF] bg-[#007BFF]/10 rounded-md text-lg font-orbitron hover:bg-[#007BFF]/20 transition-colors">
              View All Problem Statements
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}