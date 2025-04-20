import Footer from "./Footer";

export default function CTASection() {
  return (
    <section id="register" className="relative py-20 overflow-hidden bg-[#1A1A2E]">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto glassmorphism rounded-xl p-10 border border-[#FF007F]/30 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF007F] via-[#007BFF] to-[#00FFD1] opacity-20 rounded-xl blur-sm"></div>
          
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6 text-shadow-neon-pink">READY TO HACK THE FUTURE?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Join hundreds of innovators in this game-changing hackathon experience and build solutions that matter.
          </p>
          
          <a href="#" className="inline-block bg-gradient-to-r from-[#FF007F] to-[#007BFF] font-orbitron font-bold px-10 py-4 rounded-md text-white hover:from-[#007BFF] hover:to-[#FF007F] transition-all duration-500 animate-pulse-slow relative group overflow-hidden">
            <span className="relative z-10">REGISTER NOW</span>
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#007BFF] via-[#FF007F] to-[#00FFD1] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></span>
          </a>
          
          <div className="mt-8 flex flex-wrap justify-center space-x-6 gap-y-4">
            <div className="flex items-center">
              <i className="fas fa-calendar-alt text-[#FF007F] mr-2"></i>
              <span>September 10-12, 2023</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-globe text-[#007BFF] mr-2"></i>
              <span>Virtual Event</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-users text-[#00FFD1] mr-2"></i>
              <span>2-4 Members per Team</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
