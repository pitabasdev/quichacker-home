export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6 text-shadow-neon-blue">
              WHAT IS <span className="text-[#007BFF]">QUICKHACKER?</span>
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              QuickHacker is the premier hackathon for innovators, problem solvers, and tech enthusiasts. Build, break, and create groundbreaking projects that push the boundaries of what's possible.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Our mission is to foster innovation, collaboration, and skill development in a competitive and exciting environment. Join us for a transformative experience!
            </p>
            
            <div className="glassmorphism rounded-xl p-6 border border-[#00FFD1]/20">
              <h3 className="font-orbitron text-xl font-bold mb-4 text-[#00FFD1]">Who Can Participate?</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-[#00FFD1] mr-3"></i>
                  <span>Students from any discipline and academic level</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-[#00FFD1] mr-3"></i>
                  <span>Working professionals seeking new challenges</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-[#00FFD1] mr-3"></i>
                  <span>Self-taught developers and tech enthusiasts</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-[#00FFD1] mr-3"></i>
                  <span>Entrepreneurs looking to build innovative solutions</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 md:pl-12">
            <h3 className="font-orbitron text-2xl font-bold mb-6 text-center text-shadow-neon-pink">
              HACKATHON TIMELINE
            </h3>
            
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF007F] via-[#007BFF] to-[#00FFD1]"></div>
              
              {/* Timeline Items */}
              <div className="space-y-8">
                {/* Phase 1 */}
                <div className="flex items-start relative">
                  <div className="absolute top-0 left-8 w-8 h-8 rounded-full bg-[#FF007F] transform -translate-x-1/2 z-10 flex items-center justify-center shadow-neon-pink">
                    <span className="font-orbitron text-xs">1</span>
                  </div>
                  <div className="ml-16 glassmorphism rounded-xl p-4 border border-[#FF007F]/30">
                    <h4 className="font-orbitron text-[#FF007F]">Registration Opens</h4>
                    <p className="text-sm text-gray-300">August 15, 2023</p>
                    <p className="text-sm mt-1">Register your team of 2-4 members</p>
                  </div>
                </div>
                
                {/* Phase 2 */}
                <div className="flex items-start relative">
                  <div className="absolute top-0 left-8 w-8 h-8 rounded-full bg-[#007BFF] transform -translate-x-1/2 z-10 flex items-center justify-center shadow-neon-blue">
                    <span className="font-orbitron text-xs">2</span>
                  </div>
                  <div className="ml-16 glassmorphism rounded-xl p-4 border border-[#007BFF]/30">
                    <h4 className="font-orbitron text-[#007BFF]">Idea Submission</h4>
                    <p className="text-sm text-gray-300">September 1, 2023</p>
                    <p className="text-sm mt-1">Submit your project proposal and concept</p>
                  </div>
                </div>
                
                {/* Phase 3 */}
                <div className="flex items-start relative">
                  <div className="absolute top-0 left-8 w-8 h-8 rounded-full bg-[#00FFD1] transform -translate-x-1/2 z-10 flex items-center justify-center shadow-neon-green">
                    <span className="font-orbitron text-xs">3</span>
                  </div>
                  <div className="ml-16 glassmorphism rounded-xl p-4 border border-[#00FFD1]/30">
                    <h4 className="font-orbitron text-[#00FFD1]">Hacking Phase</h4>
                    <p className="text-sm text-gray-300">September 10-12, 2023</p>
                    <p className="text-sm mt-1">48 hours of intense coding and building</p>
                  </div>
                </div>
                
                {/* Phase 4 */}
                <div className="flex items-start relative">
                  <div className="absolute top-0 left-8 w-8 h-8 rounded-full bg-[#FF007F] transform -translate-x-1/2 z-10 flex items-center justify-center shadow-neon-pink">
                    <span className="font-orbitron text-xs">4</span>
                  </div>
                  <div className="ml-16 glassmorphism rounded-xl p-4 border border-[#FF007F]/30">
                    <h4 className="font-orbitron text-[#FF007F]">Final Presentations</h4>
                    <p className="text-sm text-gray-300">September 15, 2023</p>
                    <p className="text-sm mt-1">Demo your project to judges and audience</p>
                  </div>
                </div>
                
                {/* Phase 5 */}
                <div className="flex items-start relative">
                  <div className="absolute top-0 left-8 w-8 h-8 rounded-full bg-[#007BFF] transform -translate-x-1/2 z-10 flex items-center justify-center shadow-neon-blue">
                    <span className="font-orbitron text-xs">5</span>
                  </div>
                  <div className="ml-16 glassmorphism rounded-xl p-4 border border-[#007BFF]/30">
                    <h4 className="font-orbitron text-[#007BFF]">Winners Announced</h4>
                    <p className="text-sm text-gray-300">September 16, 2023</p>
                    <p className="text-sm mt-1">Awards ceremony and prize distribution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
