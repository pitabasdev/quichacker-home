import CyberpunkCard3D from "../components/ui/CyberpunkCard3D";

export default function SupportPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <h1 className="font-orbitron text-4xl md:text-6xl text-center font-bold mb-8">
          <span className="text-[#00FFD1]">SUPPORT</span>
          <span className="text-white"> CENTER</span>
        </h1>
        
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Need assistance? Our team of experts is here to help you with any questions or issues you might encounter.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <CyberpunkCard3D className="p-8">
            <h2 className="text-2xl font-orbitron mb-6 text-white">Get In Touch</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="bg-[#111827] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#00FFD1] border border-[#00FFD1]/20"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="bg-[#111827] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#00FFD1] border border-[#00FFD1]/20"
                  placeholder="john..example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-300">Subject</label>
                <select 
                  id="subject" 
                  className="bg-[#111827] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#00FFD1] border border-[#00FFD1]/20"
                >
                  <option value="" disabled selected>Select a topic</option>
                  <option value="registration">Registration Issues</option>
                  <option value="technical">Technical Support</option>
                  <option value="submission">Submission Problems</option>
                  <option value="general">General Questions</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">Your Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="bg-[#111827] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#00FFD1] border border-[#00FFD1]/20"
                  placeholder="Please describe your issue in detail..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="bg-[#00FFD1] text-[#0A0F1A] px-6 py-3 rounded-md font-orbitron hover:bg-[#00FFD1]/90 transition-colors w-full"
              >
                SEND MESSAGE
              </button>
            </form>
          </CyberpunkCard3D>
          
          <div className="space-y-6">
            <CyberpunkCard3D className="p-8" borderColor="#007BFF" glowColor="rgba(0, 123, 255, 0.5)">
              <h2 className="text-2xl font-orbitron mb-4 text-white">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 text-[#007BFF]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#007BFF]">Email</h3>
                    <p className="text-gray-300">support..quickhacker.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 text-[#007BFF]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#007BFF]">Phone</h3>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 text-[#007BFF]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#007BFF]">Location</h3>
                    <p className="text-gray-300">123 Innovation Street</p>
                    <p className="text-gray-300">San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>
            </CyberpunkCard3D>
            
            <CyberpunkCard3D className="p-8" borderColor="#FF007F" glowColor="rgba(255, 0, 127, 0.5)">
              <h2 className="text-2xl font-orbitron mb-4 text-white">Support Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Monday - Friday:</span>
                  <span className="text-[#FF007F] font-medium">9:00 AM - 8:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Saturday:</span>
                  <span className="text-[#FF007F] font-medium">10:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Sunday:</span>
                  <span className="text-[#FF007F] font-medium">12:00 PM - 5:00 PM EST</span>
                </div>
                <div className="mt-4 p-3 bg-[#FF007F]/10 rounded-md">
                  <p className="text-gray-300 text-sm">
                    <span className="text-[#FF007F] font-bold">Note:</span> During hackathon events, our support team is available 24/7.
                  </p>
                </div>
              </div>
            </CyberpunkCard3D>
          </div>
        </div>
        
        <div className="bg-[#0A0F1A] rounded-lg p-8 border border-[#00FFD1]/20 text-center">
          <h2 className="text-2xl font-orbitron mb-4 text-white">Need Quick Answers?</h2>
          <p className="text-gray-300 mb-6">
            Check out our comprehensive FAQ section or visit the Help Center for detailed guides and documentation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/faq" 
              className="px-6 py-3 bg-[#111827] text-[#00FFD1] border border-[#00FFD1]/50 rounded-md font-orbitron hover:bg-[#00FFD1]/10 transition-colors"
            >
              FAQ
            </a>
            <a 
              href="/help" 
              className="px-6 py-3 bg-[#111827] text-[#00FFD1] border border-[#00FFD1]/50 rounded-md font-orbitron hover:bg-[#00FFD1]/10 transition-colors"
            >
              HELP CENTER
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}