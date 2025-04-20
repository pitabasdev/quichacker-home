import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import CountdownTimer from './CountdownTimer';
import HexagonGrid from '../components/ui/HexagonGrid';

export default function HeroSection() {
  const [glitchText, setGlitchText] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Glitch effect timing
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 150);
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  // 3D effect on mouse move
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position as percentage
      const percentX = clientX / innerWidth;
      const percentY = clientY / innerHeight;
      
      // Calculate the tilt amount (less intense - max 5deg)
      const tiltX = (percentY - 0.5) * 5;
      const tiltY = (0.5 - percentX) * 5;
      
      // Apply the tilt effect to various elements
      const logo3D = hero.querySelector('.logo-3d') as HTMLElement;
      const contentBox = hero.querySelector('.content-box') as HTMLElement;
      const ctaButtons = hero.querySelectorAll('.cta-button') as NodeListOf<HTMLElement>;
      
      if (logo3D) {
        logo3D.style.transform = `translateZ(50px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }
      
      if (contentBox) {
        contentBox.style.transform = `translateZ(25px) rotateX(${tiltX * 0.5}deg) rotateY(${tiltY * 0.5}deg)`;
      }
      
      ctaButtons.forEach((button) => {
        button.style.transform = `translateZ(35px) rotateX(${tiltX * 0.3}deg) rotateY(${tiltY * 0.3}deg)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen pt-20 overflow-hidden flex items-center justify-center perspective-1000"
      style={{ perspective: '1000px' }}
    >
      {/* Background animated hexagons */}
      <div className="absolute inset-0 z-0">
        <HexagonGrid />
      </div>
      
      <div className="container mx-auto px-4 z-10 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div 
              className="content-box transition-transform duration-300 ease-out"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glitchy title */}
              <h1 className={`font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${
                glitchText ? 'animate-glitch' : ''
              }`}>
                <span className="block text-white">QUICK<span className="text-[#FF007F]">HACKER</span></span>
                <span className="block text-[#00FFD1] text-3xl sm:text-4xl md:text-5xl mt-2">2025</span>
              </h1>
              
              <h2 className="text-white text-xl sm:text-2xl font-orbitron mt-2 mb-6 tracking-wider">
                <span className="text-[#00FFD1]">CODE.</span> <span className="text-[#FF007F]">BUILD.</span> <span className="text-[#007BFF]">DISRUPT.</span> <span className="text-white">WIN.</span>
              </h2>
              
              <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
                Join the biggest hackathon of the year and compete with the best minds in tech to build the future!
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/register"
                  className="cta-button relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-orbitron text-lg transition-all duration-300 ease-out rounded-md group bg-gradient-to-r from-[#00FFD1] to-[#007BFF] text-black"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00FFD1]/80 to-[#007BFF]/80 group-hover:opacity-0 transition-opacity duration-300 rounded-md"></span>
                  <span className="relative">REGISTER NOW</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-20"></span>
                  <span className="absolute right-0 top-0 h-full w-1 bg-white opacity-20"></span>
                </Link>
                
                <Link 
                  href="/problems"
                  className="cta-button relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-orbitron text-lg transition-all duration-300 ease-out rounded-md group border border-[#FF007F] bg-black/30 text-[#FF007F]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className="absolute inset-0 bg-[#FF007F]/10 group-hover:bg-[#FF007F]/20 transition-colors duration-300 rounded-md"></span>
                  <span className="relative">EXPLORE CHALLENGES</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right content - 3D Logo and Countdown */}
          <div className="w-full lg:w-1/2">
            <div 
              className="logo-3d relative mx-auto mb-12 w-48 h-48 md:w-64 md:h-64 transition-transform duration-300 ease-out"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 3D floating logo with layers */}
              <div className="absolute inset-0 bg-[#00FFD1] rounded-2xl transform rotate-45 shadow-[0_0_35px_rgba(0,255,209,0.5)] animate-float-slow"></div>
              <div className="absolute inset-0 bg-[#FF007F] rounded-2xl transform rotate-[30deg] shadow-[0_0_35px_rgba(255,0,127,0.5)] scale-90 animate-float-medium"></div>
              <div className="absolute inset-0 bg-[#007BFF] rounded-2xl transform rotate-[15deg] shadow-[0_0_35px_rgba(0,123,255,0.5)] scale-80 animate-float-fast"></div>
              
              {/* Center Q logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-orbitron font-bold text-white text-8xl animate-pulse-subtle">Q</span>
              </div>
              
              {/* Animated particles around logo */}
              <div className="absolute -top-6 -left-6 w-8 h-8 bg-[#00FFD1] rounded-full opacity-70 animate-orbit1"></div>
              <div className="absolute -bottom-6 -right-6 w-6 h-6 bg-[#FF007F] rounded-full opacity-70 animate-orbit2"></div>
              <div className="absolute -right-4 top-1/2 w-4 h-4 bg-[#007BFF] rounded-full opacity-70 animate-orbit3"></div>
            </div>
            
            {/* Countdown Timer */}
            <div 
              className="backdrop-blur-sm bg-black/30 border border-[#00FFD1]/30 p-6 rounded-xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className="text-center font-orbitron text-white text-xl mb-4">
                HURRY UP! THE HACKATHON STARTS IN:
              </h3>
              <CountdownTimer />
              <p className="text-center text-[#00FFD1] mt-4">
                Gear up! Time to bring your ideas to life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}