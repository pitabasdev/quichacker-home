import { Link } from "wouter";
import HeroSection from "../components/HeroSection";
import CountdownTimer from "../components/CountdownTimer";
import CyberpunkCard3D from "../components/ui/CyberpunkCard3D";
import WhyJoinSection from "../components/WhyJoinSection";
import SponsorsSection from "../components/SponsorsSection";
import CategoriesSection from "../components/CategoriesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import StepsSection from "../components/StepsSection";
import ContactSection from "../components/ContactSection";
import TimelineSection from "../components/TimelineSection";

export default function Home() {
  return (
    <div className="font-poppins text-white relative overflow-x-hidden min-h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-radial from-[#1A1A2E] to-black z-[-3]"></div>
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Why Join QuickHacker Section - Moved to right after Hero */}
        <WhyJoinSection />
        
        {/* Featured Sections with 3D Cards */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[20%] left-[10%] w-24 h-24 bg-[#00FFD1]/5 rounded-full blur-xl animate-pulse-slow"></div>
            <div className="absolute bottom-[30%] right-[5%] w-32 h-32 bg-[#FF007F]/5 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-[50%] right-[20%] w-16 h-16 bg-[#007BFF]/5 rounded-full blur-xl animate-pulse-subtle"></div>
            
            {/* Circuit Lines */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-[20%] w-[1px] h-[40%] bg-gradient-to-b from-transparent via-[#00FFD1] to-transparent"></div>
              <div className="absolute top-[30%] right-[30%] w-[1px] h-[50%] bg-gradient-to-b from-transparent via-[#FF007F] to-transparent"></div>
              <div className="absolute bottom-0 left-[40%] w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#007BFF] to-transparent"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Title with Animated Glow */}
            <div className="mb-16 md:mb-20 text-center relative">
              <h2 className="text-3xl md:text-5xl font-orbitron font-bold inline-block relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFD1] via-white to-[#FF007F] animate-gradient-x bg-size-200">
                  EXPLORE THE HACKATHON
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFD1] via-[#007BFF] to-[#FF007F] opacity-30 blur-xl animate-pulse-slow rounded-lg"></div>
              </h2>
              <div className="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-[#00FFD1] to-[#007BFF]"></div>
            </div>
            
            {/* Enhanced 3D Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto perspective-1000">
              {/* Challenge Card */}
              <div className="group perspective-800">
                <div className="transform transition-all duration-500 group-hover:rotate-y-10 group-hover:translate-z-20 group-hover:shadow-neon-green">
                  <CyberpunkCard3D borderColor="#00FFD1" glowColor="rgba(0, 255, 209, 0.5)" scale={1.02} maxTilt={15}>
                    <div className="h-full flex flex-col relative">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#00FFD1]/80 to-transparent opacity-20 rounded-bl-full pointer-events-none"></div>
                      
                      <div className="relative">
                        <div className="bg-[#00FFD1]/10 p-4 rounded-lg mb-5 w-fit relative overflow-hidden transform-style-3d">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#00FFD1]/20 to-transparent opacity-50"></div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#00FFD1] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-orbitron font-bold mb-4 text-[#00FFD1] relative">
                        CHALLENGES
                        <div className="absolute -bottom-2 left-0 w-12 h-[2px] bg-[#00FFD1]"></div>
                      </h3>
                      
                      <p className="text-gray-300 mb-8 text-lg">Tackle cutting-edge problems in AI, Blockchain, and Cybersecurity. Push the boundaries of innovation.</p>
                      
                      <div className="mt-auto">
                        <Link href="/problems" className="w-full inline-flex items-center justify-between font-orbitron bg-[#00FFD1]/10 hover:bg-[#00FFD1]/20 text-[#00FFD1] hover:text-white px-6 py-4 rounded-md border border-[#00FFD1]/30 transition-all duration-300 group-hover:shadow-md">
                          <span>EXPLORE CHALLENGES</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </CyberpunkCard3D>
                </div>
              </div>
              
              {/* Resources Card */}
              <div className="group perspective-800">
                <div className="transform transition-all duration-500 group-hover:rotate-y-10 group-hover:translate-z-20 group-hover:shadow-neon-blue">
                  <CyberpunkCard3D borderColor="#007BFF" glowColor="rgba(0, 123, 255, 0.5)" scale={1.02} maxTilt={15}>
                    <div className="h-full flex flex-col relative">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#007BFF]/80 to-transparent opacity-20 rounded-bl-full pointer-events-none"></div>
                      
                      <div className="relative">
                        <div className="bg-[#007BFF]/10 p-4 rounded-lg mb-5 w-fit relative overflow-hidden transform-style-3d">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/20 to-transparent opacity-50"></div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#007BFF] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-orbitron font-bold mb-4 text-[#007BFF] relative">
                        RESOURCES
                        <div className="absolute -bottom-2 left-0 w-12 h-[2px] bg-[#007BFF]"></div>
                      </h3>
                      
                      <p className="text-gray-300 mb-8 text-lg">Access APIs, tutorials, workshops, and mentorship from industry experts to supercharge your project.</p>
                      
                      <div className="mt-auto">
                        <Link href="/resources" className="w-full inline-flex items-center justify-between font-orbitron bg-[#007BFF]/10 hover:bg-[#007BFF]/20 text-[#007BFF] hover:text-white px-6 py-4 rounded-md border border-[#007BFF]/30 transition-all duration-300 group-hover:shadow-md">
                          <span>VIEW RESOURCES</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </CyberpunkCard3D>
                </div>
              </div>
              
              {/* Register Team Card */}
              <div className="group perspective-800 md:col-span-2 lg:col-span-1">
                <div className="transform transition-all duration-500 group-hover:rotate-y-10 group-hover:translate-z-20 group-hover:shadow-neon-pink">
                  <CyberpunkCard3D borderColor="#FF007F" glowColor="rgba(255, 0, 127, 0.5)" scale={1.02} maxTilt={15}>
                    <div className="h-full flex flex-col relative">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#FF007F]/80 to-transparent opacity-20 rounded-bl-full pointer-events-none"></div>
                      
                      <div className="relative">
                        <div className="bg-[#FF007F]/10 p-4 rounded-lg mb-5 w-fit relative overflow-hidden transform-style-3d">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#FF007F]/20 to-transparent opacity-50"></div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#FF007F] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-orbitron font-bold mb-4 text-[#FF007F] relative">
                        REGISTER TEAM
                        <div className="absolute -bottom-2 left-0 w-12 h-[2px] bg-[#FF007F]"></div>
                      </h3>
                      
                      <p className="text-gray-300 mb-8 text-lg">Form a team of up to 4 members and register to compete for prizes worth $50,000 and global recognition.</p>
                      
                      <div className="mt-auto">
                        <Link href="/register" className="w-full inline-flex items-center justify-between font-orbitron bg-[#FF007F]/10 hover:bg-[#FF007F]/20 text-[#FF007F] hover:text-white px-6 py-4 rounded-md border border-[#FF007F]/30 transition-all duration-300 group-hover:shadow-md">
                          <span>REGISTER NOW</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </CyberpunkCard3D>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced Countdown Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A2E]/50 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto glassmorphism border border-[#007BFF]/30 p-8 md:p-12 rounded-xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFD1] via-[#007BFF] to-[#FF007F] opacity-20 rounded-xl blur"></div>
              
              <div className="relative mb-2">
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-2 text-shadow-neon-blue">
                  HACKATHON <span className="text-[#007BFF]">COUNTDOWN</span>
                </h2>
                <p className="text-center text-2xl font-orbitron text-[#FF007F] font-bold animate-pulse-slow">
                  HURRY UP! THE HACKATHON STARTS IN:
                </p>
              </div>
              
              <CountdownTimer />
              
              <div className="mt-12 text-center">
                <Link href="/register" className="inline-block px-8 py-4 bg-[#007BFF]/20 border border-[#007BFF] rounded-md font-orbitron font-bold hover:bg-[#007BFF]/40 hover:shadow-neon-blue transition duration-300">
                  REGISTER YOUR TEAM
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sponsors Section */}
        <SponsorsSection />
        
        {/* Categories & Challenges Section */}
        <CategoriesSection />
        
        {/* Timeline Section - Added after Categories */}
        <TimelineSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* How to Participate Steps Section */}
        <StepsSection />
        
        {/* Contact & FAQ Section */}
        <ContactSection />
      </main>
    </div>
  );
}
