import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';

export default function StepsSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const steps = [
    {
      id: 1,
      title: 'Register',
      description: 'Sign up with your team.',
      icon: '1️⃣',
      color: '#FF007F'
    },
    {
      id: 2,
      title: 'Choose a Challenge',
      description: 'Pick your problem statement.',
      icon: '2️⃣',
      color: '#00FFD1'
    },
    {
      id: 3,
      title: 'Build & Innovate',
      description: 'Develop your solution.',
      icon: '3️⃣',
      color: '#007BFF'
    },
    {
      id: 4,
      title: 'Pitch & Win!',
      description: 'Submit your project and compete for prizes.',
      icon: '4️⃣',
      color: '#FFD100'
    }
  ];

  // Auto progress through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => {
        const next = prev === steps.length ? 1 : prev + 1;
        setProgress(next * (100 / steps.length));
        return next;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, [steps.length]);

  // 3D hover effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const cards = container.querySelectorAll('.step-card');
      cards.forEach((card) => {
        const el = card as HTMLElement;
        el.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
      });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Getting Started is <span className="text-[#FF007F]">Easy</span>!
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF007F] via-[#00FFD1] to-[#007BFF] mx-auto"></div>
        </div>

        {/* Interactive Progress Bar */}
        <div className="mb-16 max-w-4xl mx-auto px-4">
          <div className="h-2 w-full bg-gray-800 rounded-full mb-8 relative">
            <div 
              className="absolute h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${progress}%`,
                background: `linear-gradient(to right, #FF007F, #00FFD1, #007BFF)`,
                boxShadow: '0 0 10px rgba(0, 255, 209, 0.5)'
              }}
            ></div>
            
            {steps.map((step, index) => {
              const position = (index / (steps.length - 1)) * 100;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStep(step.id);
                    setProgress(step.id * (100 / steps.length));
                  }}
                  className={`absolute top-0 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                    step.id <= activeStep ? 'border-2 border-white/20' : 'border-none'
                  }`}
                  style={{ 
                    left: `${position}%`,
                    background: step.id <= activeStep ? step.color : '#1f2937',
                    boxShadow: step.id <= activeStep ? `0 0 15px ${step.color}` : 'none'
                  }}
                >
                  <div className={`text-xs font-bold ${step.id <= activeStep ? 'text-black' : 'text-gray-400'}`}>
                    {step.id}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`step-card transform-style-3d transition-all duration-500 ${
                activeStep === step.id ? 'scale-105' : activeStep > step.id ? 'opacity-70' : 'opacity-50'
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0px) rotateX(0deg) rotateY(0deg)',
              }}
            >
              <div 
                className="glassmorphism rounded-xl p-6 h-full transition-all duration-500"
                style={{
                  background: activeStep === step.id 
                    ? `linear-gradient(135deg, rgba(20, 20, 30, 0.8), rgba(30, 30, 50, 0.6))` 
                    : `linear-gradient(135deg, rgba(10, 10, 20, 0.8), rgba(20, 20, 40, 0.6))`,
                  borderTop: `3px solid ${step.color}`,
                  boxShadow: activeStep === step.id ? `0 0 25px ${step.color}80` : 'none',
                }}
              >
                <div 
                  className="h-16 w-16 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto"
                  style={{ 
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}70)`,
                    boxShadow: activeStep === step.id ? `0 0 20px ${step.color}` : `0 0 10px ${step.color}50`,
                    transform: 'translateZ(30px)',
                  }}
                >
                  {step.icon}
                </div>
                
                <h3 
                  className="font-orbitron text-xl font-bold text-center mb-3" 
                  style={{ 
                    color: step.color,
                    textShadow: `0 0 8px ${step.color}50`,
                    transform: 'translateZ(20px)',
                  }}
                >
                  {step.title}
                </h3>
                
                <p 
                  className="text-gray-300 text-center"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  {step.description}
                </p>

                {activeStep === step.id && (
                  <div 
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 transition-all duration-300"
                    style={{ 
                      borderLeft: '10px solid transparent',
                      borderRight: '10px solid transparent',
                      borderBottom: `10px solid ${step.color}`,
                      filter: `drop-shadow(0 0 5px ${step.color})`,
                      opacity: 0.7
                    }}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/register">
            <a className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#FF007F] text-[#FF007F] bg-[#FF007F]/10 rounded-md text-lg font-orbitron hover:bg-[#FF007F]/20 transition-colors">
              Start Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}