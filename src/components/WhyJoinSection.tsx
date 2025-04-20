import { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function WhyJoinSection() {
  const isMobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const benefits = [
    {
      id: 1,
      title: 'Exciting Prizes',
      description: 'Win $10,000 in rewards!',
      icon: '🔥',
      color: '#FF007F',
      glowColor: 'rgba(255, 0, 127, 0.5)'
    },
    {
      id: 2,
      title: 'Exclusive Job & Internship Offers',
      description: 'Get noticed by top companies!',
      icon: '🏆',
      color: '#00FFD1',
      glowColor: 'rgba(0, 255, 209, 0.5)'
    },
    {
      id: 3,
      title: 'Networking with Experts',
      description: 'Learn from industry leaders!',
      icon: '🤝',
      color: '#007BFF',
      glowColor: 'rgba(0, 123, 255, 0.5)'
    },
    {
      id: 4,
      title: 'Enhance Your Skills',
      description: 'Build real-world projects!',
      icon: '🎓',
      color: '#FFD100',
      glowColor: 'rgba(255, 209, 0, 0.5)'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Why Join <span className="text-[#00FFD1]">QuickHacker</span>?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF007F] via-[#00FFD1] to-[#007BFF] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="relative group perspective-1000"
              onMouseEnter={() => setHoveredCard(benefit.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`card-3d-wrapper rounded-xl p-6 backdrop-blur-sm transition-all duration-500 h-full
                  ${hoveredCard === benefit.id ? 'rotate-y-10 scale-105' : ''}`}
                style={{
                  background: `linear-gradient(45deg, rgba(10, 10, 20, 0.8), rgba(20, 20, 40, 0.6))`,
                  borderLeft: `2px solid ${benefit.color}`,
                  borderBottom: `2px solid ${benefit.color}`,
                  boxShadow: hoveredCard === benefit.id ? `0 0 20px ${benefit.glowColor}` : 'none',
                  transform: hoveredCard === benefit.id 
                    ? `translateZ(20px) rotateX(${Math.random() * 5}deg) rotateY(${Math.random() * 10}deg)` 
                    : 'translateZ(0) rotateX(0) rotateY(0)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                  style={{ 
                    background: `radial-gradient(circle, ${benefit.color}99, ${benefit.color}55)`,
                    boxShadow: `0 0 10px ${benefit.glowColor}`,
                    transform: hoveredCard === benefit.id ? 'translateZ(30px)' : 'translateZ(0)',
                    transition: 'all 0.3s ease-out'
                  }}>
                  {benefit.icon}
                </div>
                
                <div className="mt-6 pt-4">
                  <h3 className="font-orbitron text-xl font-bold mb-2"
                    style={{ 
                      color: benefit.color,
                      textShadow: `0 0 8px ${benefit.glowColor}`,
                      transform: hoveredCard === benefit.id ? 'translateZ(30px)' : 'translateZ(0)',
                      transition: 'all 0.3s ease-out'
                    }}>
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 mb-4"
                    style={{ 
                      transform: hoveredCard === benefit.id ? 'translateZ(20px)' : 'translateZ(0)',
                      transition: 'all 0.3s ease-out' 
                    }}>
                    {benefit.description}
                  </p>
                </div>

                <div 
                  className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    transform: hoveredCard === benefit.id ? 'translateZ(25px)' : 'translateZ(0)',
                    transition: 'all 0.3s ease-out' 
                  }}
                >
                  <div 
                    className="h-8 w-8 rounded-full flex items-center justify-center"
                    style={{ 
                      background: benefit.color,
                      boxShadow: `0 0 10px ${benefit.glowColor}`
                    }}
                  >
                    <ChevronRight className="h-5 w-5 text-black" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/register" className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#00FFD1] text-[#00FFD1] bg-[#00FFD1]/10 rounded-md text-lg font-orbitron hover:bg-[#00FFD1]/20 transition-colors">
            Join the Challenge
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}