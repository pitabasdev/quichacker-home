import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';

export default function SponsorsSection() {
  const [rotationDegree, setRotationDegree] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  
  // Sponsor data
  const sponsors = [
    { id: 1, name: 'Google', color: '#4285F4' },
    { id: 2, name: 'Microsoft', color: '#00A4EF' },
    { id: 3, name: 'OpenAI', color: '#10A37F' },
    { id: 4, name: 'GitHub', color: '#6e5494' },
    { id: 5, name: 'AWS', color: '#FF9900' },
    { id: 6, name: 'Meta', color: '#0668E1' },
  ];

  // Handle 3D rotation animation
  useEffect(() => {
    const handleAnimation = () => {
      setRotationDegree(prev => (prev + 0.05) % 360);
      animationRef.current = requestAnimationFrame(handleAnimation);
    };
    
    animationRef.current = requestAnimationFrame(handleAnimation);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle mouse movement for 3D perspective effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const sponsorElements = container.querySelectorAll('.sponsor-logo');
      sponsorElements.forEach((element) => {
        const el = element as HTMLElement;
        const offsetX = el.dataset.offset ? parseInt(el.dataset.offset) : 0;
        el.style.transform = `translateX(${x * 30}px) translateY(${y * 30}px) translateZ(${offsetX * 10}px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
      });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#090c14] opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Proudly <span className="text-[#FF007F]">Sponsored</span> By
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF007F] via-[#00FFD1] to-[#007BFF] mx-auto"></div>
        </div>

        {/* 3D Rotating Sponsors Container */}
        <div 
          ref={containerRef}
          className="perspective-1000 min-h-[300px] flex items-center justify-center mb-10"
        >
          <div 
            className="relative w-full max-w-4xl mx-auto h-[250px] transform-style-3d"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {sponsors.map((sponsor, index) => {
              // Calculate position in 3D space
              const angle = (index / sponsors.length) * Math.PI * 2 + (rotationDegree * Math.PI / 180);
              const radius = 250; // Adjust for desired circle size
              const x = Math.sin(angle) * radius;
              const z = Math.cos(angle) * radius;
              const offset = 20 + Math.sin(rotationDegree * 0.05 + index) * 10;
              
              return (
                <div
                  key={sponsor.id}
                  className="sponsor-logo absolute transform-style-3d transition-transform duration-300"
                  data-offset={index}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translateX(${x}px) translateZ(${z}px) translateY(-50%)`,
                    transformStyle: 'preserve-3d',
                    zIndex: z < 0 ? 0 : 1,
                    opacity: (z + radius) / (radius * 2),
                  }}
                >
                  <div 
                    className="glassmorphism p-6 rounded-xl border-2 text-center h-24 w-48 flex items-center justify-center transform-style-3d hover:scale-110 transition-all duration-300"
                    style={{ 
                      borderColor: sponsor.color,
                      background: `linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(20, 20, 40, 0.6))`,
                      boxShadow: `0 0 15px ${sponsor.color}50, inset 0 0 10px ${sponsor.color}30`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <h3 
                      className="font-orbitron text-xl font-bold text-shadow-neon transform-translateZ" 
                      style={{ 
                        color: sponsor.color,
                        textShadow: `0 0 8px ${sponsor.color}`,
                        transform: 'translateZ(20px)',
                      }}
                    >
                      {sponsor.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/contact">
            <a className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#FF007F] text-[#FF007F] bg-[#FF007F]/10 rounded-md text-lg font-orbitron hover:bg-[#FF007F]/20 transition-colors">
              Become a Sponsor
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}