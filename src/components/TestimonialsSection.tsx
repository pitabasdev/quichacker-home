import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';

export default function TestimonialsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Aryan S.',
      role: 'Software Engineer at Google',
      quote: 'Winning QuickHacker helped me land my dream job at Google!',
      image: '/testimonial1.jpg', // Placeholder, will use gradient-based avatar
      color: '#FF007F'
    },
    {
      id: 2,
      name: 'Priya M.',
      role: 'Data Scientist',
      quote: 'The networking and learning experience was next level!',
      image: '/testimonial2.jpg', // Placeholder, will use gradient-based avatar
      color: '#00FFD1'
    },
    {
      id: 3,
      name: 'Alex K.',
      role: 'Startup Founder',
      quote: 'My startup idea came from a QuickHacker challenge. Now we raised $2M!',
      image: '/testimonial3.jpg', // Placeholder, will use gradient-based avatar
      color: '#007BFF'
    }
  ];

  // Handle mouse movement for 3D perspective effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const cards = container.querySelectorAll('.testimonial-card');
      cards.forEach((card) => {
        const el = card as HTMLElement;
        el.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0F1A] opacity-90"></div>
      
      {/* Parallax Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-[50px] w-[200px] -rotate-45 bg-[#FF007F]/30 blur-xl top-1/4 left-[10%] animate-float-slow"></div>
          <div className="absolute h-[100px] w-[400px] -rotate-12 bg-[#00FFD1]/20 blur-xl bottom-1/3 right-[5%] animate-float-slower"></div>
          <div className="absolute h-[70px] w-[300px] rotate-45 bg-[#007BFF]/30 blur-xl bottom-1/4 left-1/3 animate-float"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            What Past <span className="text-[#00FFD1]">Participants</span> Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF007F] via-[#00FFD1] to-[#007BFF] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card relative transition-transform duration-300 transform-style-3d"
              onMouseEnter={() => setHoveredCard(testimonial.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0px)',
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div 
                className={`glassmorphism p-8 rounded-xl h-full flex flex-col transition-all duration-500`}
                style={{
                  background: `linear-gradient(135deg, rgba(10, 15, 25, 0.9) 0%, rgba(20, 25, 40, 0.8) 100%)`,
                  borderBottom: `3px solid ${testimonial.color}`,
                  boxShadow: hoveredCard === testimonial.id 
                    ? `0 0 25px ${testimonial.color}50` 
                    : `0 0 10px rgba(0,0,0,0.3)`,
                  transform: hoveredCard === testimonial.id 
                    ? 'translateZ(10px) scale(1.03)' 
                    : 'translateZ(0) scale(1)',
                }}
              >
                <div className="flex items-center mb-6" style={{ transform: 'translateZ(30px)' }}>
                  <div 
                    className="h-16 w-16 rounded-full mr-4 flex items-center justify-center text-3xl"
                    style={{ 
                      background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}70)`,
                      boxShadow: `0 0 15px ${testimonial.color}50`
                    }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 
                      className="font-orbitron text-lg font-bold" 
                      style={{ 
                        color: testimonial.color,
                        textShadow: `0 0 8px ${testimonial.color}50`
                      }}
                    >
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex-grow flex items-center" style={{ transform: 'translateZ(20px)' }}>
                  <blockquote 
                    className="text-xl text-gray-200 italic relative"
                    style={{ 
                      textShadow: hoveredCard === testimonial.id 
                        ? `0 0 2px rgba(255,255,255,0.2)` 
                        : 'none' 
                    }}
                  >
                    <span 
                      className="absolute -top-5 -left-2 text-4xl opacity-20"
                      style={{ color: testimonial.color }}
                    >
                      "
                    </span>
                    {testimonial.quote}
                    <span 
                      className="absolute -bottom-10 -right-2 text-4xl opacity-20"
                      style={{ color: testimonial.color }}
                    >
                      "
                    </span>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/about">
            <a className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#00FFD1] text-[#00FFD1] bg-[#00FFD1]/10 rounded-md text-lg font-orbitron hover:bg-[#00FFD1]/20 transition-colors">
              See More Stories
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}