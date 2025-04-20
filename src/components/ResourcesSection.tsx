export default function ResourcesSection() {
  return (
    <section id="resources" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-center mb-6 text-shadow-neon-pink">
          RESOURCES
        </h2>
        <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Everything you need to succeed in the hackathon - from learning materials to development tools.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Learning Materials */}
          <div className="w-full lg:w-1/2 glassmorphism rounded-xl p-8 border border-[#FF007F]/30">
            <h3 className="font-orbitron text-2xl font-bold mb-6 text-[#FF007F]">Learning Materials</h3>
            
            <div className="space-y-6">
              <div className="group">
                <h4 className="font-orbitron text-xl mb-2 group-hover:text-[#FF007F] transition-colors duration-300">Free Courses</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-[#FF007F] mt-1 mr-3"></i>
                    <div>
                      <a href="#" className="hover:text-[#FF007F] transition-colors duration-300">
                        Machine Learning Fundamentals
                      </a>
                      <p className="text-sm text-gray-400">A comprehensive course covering ML basics to advanced concepts</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-[#FF007F] mt-1 mr-3"></i>
                    <div>
                      <a href="#" className="hover:text-[#FF007F] transition-colors duration-300">
                        Blockchain Development Masterclass
                      </a>
                      <p className="text-sm text-gray-400">Learn to build decentralized applications from scratch</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-[#FF007F] mt-1 mr-3"></i>
                    <div>
                      <a href="#" className="hover:text-[#FF007F] transition-colors duration-300">
                        Cybersecurity Best Practices
                      </a>
                      <p className="text-sm text-gray-400">Essential security concepts for modern applications</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="group">
                <h4 className="font-orbitron text-xl mb-2 group-hover:text-[#FF007F] transition-colors duration-300">Hackathon Tips</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-[#FF007F] mt-1 mr-3"></i>
                    <div>
                      <a href="#" className="hover:text-[#FF007F] transition-colors duration-300">
                        Team Collaboration Strategies
                      </a>
                      <p className="text-sm text-gray-400">How to work effectively in a time-constrained environment</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-[#FF007F] mt-1 mr-3"></i>
                    <div>
                      <a href="#" className="hover:text-[#FF007F] transition-colors duration-300">
                        Creating an Impressive Demo
                      </a>
                      <p className="text-sm text-gray-400">Tips for showcasing your project to judges</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="group">
                <h4 className="font-orbitron text-xl mb-2 group-hover:text-[#FF007F] transition-colors duration-300">Open-source Projects</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-[#FF007F] mt-1 mr-3"></i>
                    <div>
                      <a href="#" className="hover:text-[#FF007F] transition-colors duration-300">
                        Previous Winning Solutions
                      </a>
                      <p className="text-sm text-gray-400">Code repositories from past hackathon winners</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-[#FF007F] mt-1 mr-3"></i>
                    <div>
                      <a href="#" className="hover:text-[#FF007F] transition-colors duration-300">
                        Starter Templates
                      </a>
                      <p className="text-sm text-gray-400">Boilerplate code to jumpstart your project</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Tech Stack & Mentor Support */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Tech Stack Section */}
            <div className="glassmorphism rounded-xl p-8 border border-[#007BFF]/30">
              <h3 className="font-orbitron text-2xl font-bold mb-6 text-[#007BFF]">Tech Stack & Tools</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {/* Tech Icon 1 */}
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-[#007BFF]/10 transition-all duration-300 group">
                  <div className="w-16 h-16 flex items-center justify-center bg-[#007BFF]/20 rounded-full mb-3 group-hover:animate-float">
                    <i className="fab fa-react text-3xl text-[#007BFF]"></i>
                  </div>
                  <span className="font-orbitron text-sm text-center group-hover:text-[#007BFF] transition-colors duration-300">React.js</span>
                </div>
                
                {/* Tech Icon 2 */}
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-[#FF007F]/10 transition-all duration-300 group">
                  <div className="w-16 h-16 flex items-center justify-center bg-[#FF007F]/20 rounded-full mb-3 group-hover:animate-float">
                    <i className="fab fa-python text-3xl text-[#FF007F]"></i>
                  </div>
                  <span className="font-orbitron text-sm text-center group-hover:text-[#FF007F] transition-colors duration-300">Python</span>
                </div>
                
                {/* Tech Icon 3 */}
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-[#00FFD1]/10 transition-all duration-300 group">
                  <div className="w-16 h-16 flex items-center justify-center bg-[#00FFD1]/20 rounded-full mb-3 group-hover:animate-float">
                    <i className="fa-solid fa-cube text-3xl text-[#00FFD1]"></i>
                  </div>
                  <span className="font-orbitron text-sm text-center group-hover:text-[#00FFD1] transition-colors duration-300">Blockchain</span>
                </div>
                
                {/* Tech Icon 4 */}
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-[#007BFF]/10 transition-all duration-300 group">
                  <div className="w-16 h-16 flex items-center justify-center bg-[#007BFF]/20 rounded-full mb-3 group-hover:animate-float">
                    <i className="fa-solid fa-mobile-screen text-3xl text-[#007BFF]"></i>
                  </div>
                  <span className="font-orbitron text-sm text-center group-hover:text-[#007BFF] transition-colors duration-300">Flutter</span>
                </div>
                
                {/* Tech Icon 5 */}
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-[#FF007F]/10 transition-all duration-300 group">
                  <div className="w-16 h-16 flex items-center justify-center bg-[#FF007F]/20 rounded-full mb-3 group-hover:animate-float">
                    <i className="fa-solid fa-database text-3xl text-[#FF007F]"></i>
                  </div>
                  <span className="font-orbitron text-sm text-center group-hover:text-[#FF007F] transition-colors duration-300">Firebase</span>
                </div>
                
                {/* Tech Icon 6 */}
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-[#00FFD1]/10 transition-all duration-300 group">
                  <div className="w-16 h-16 flex items-center justify-center bg-[#00FFD1]/20 rounded-full mb-3 group-hover:animate-float">
                    <i className="fa-solid fa-cloud text-3xl text-[#00FFD1]"></i>
                  </div>
                  <span className="font-orbitron text-sm text-center group-hover:text-[#00FFD1] transition-colors duration-300">AWS</span>
                </div>
              </div>
            </div>
            
            {/* Mentor Support Section */}
            <div className="glassmorphism rounded-xl p-8 border border-[#00FFD1]/30">
              <h3 className="font-orbitron text-2xl font-bold mb-6 text-[#00FFD1]">Mentor Support</h3>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-6 bg-[#00FFD1]/20 flex items-center justify-center text-[#00FFD1]">
                  <i className="fas fa-user-tie text-3xl"></i>
                </div>
                <div>
                  <h4 className="font-orbitron text-xl mb-1">Expert Guidance</h4>
                  <p className="text-gray-300">Our team of industry professionals is ready to support you</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">
                Need help with your project? Our mentors from top tech companies are available 24/7 during the hackathon to help you overcome challenges and refine your solutions.
              </p>
              
              <div className="bg-[#00FFD1]/10 rounded-lg p-4 border border-[#00FFD1]/30">
                <div className="flex items-center">
                  <i className="fab fa-discord text-2xl text-[#00FFD1] mr-4"></i>
                  <div>
                    <h5 className="font-orbitron text-[#00FFD1] mb-1">Join our Discord Community</h5>
                    <p className="text-sm">Connect with mentors and fellow participants</p>
                  </div>
                </div>
                <a href="#" className="block mt-4 text-center bg-[#00FFD1]/20 py-2 rounded font-orbitron text-[#00FFD1] hover:bg-[#00FFD1]/30 transition-colors duration-300">JOIN DISCORD</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
