import { useState } from 'react';
import { Link } from 'wouter';
import { Send, MessageSquare, Mail, MapPin, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function ContactSection() {
  const [hoveredInput, setHoveredInput] = useState<string | null>(null);
  
  const faqs = [
    {
      id: 'faq-1',
      question: 'Who can participate in QuickHacker?',
      answer: 'Anyone can participate! QuickHacker is open to students, professionals, hobbyists, and anyone interested in technology. Teams can consist of 2-4 members.'
    },
    {
      id: 'faq-2',
      question: 'Is there a registration fee?',
      answer: 'No, registration is completely free for all participants. We believe in making the hackathon accessible to everyone.'
    },
    {
      id: 'faq-3',
      question: 'What should I bring to the hackathon?',
      answer: 'You should bring your laptop, charger, and any hardware you might need for your project. We\'ll provide food, drinks, and a comfortable working environment.'
    },
    {
      id: 'faq-4',
      question: 'How will projects be judged?',
      answer: 'Projects will be judged based on innovation, technical complexity, design, practicality, and presentation. Our panel of judges includes industry experts from our sponsor companies.'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Have <span className="text-[#00FFD1]">Questions</span>? We're Here to Help!
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF007F] via-[#00FFD1] to-[#007BFF] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Side */}
          <div className="glassmorphism rounded-xl p-6 md:p-8 border border-[#00FFD1]/30 relative overflow-hidden perspective-1000">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF007F] via-[#00FFD1] to-[#007BFF]"></div>
            
            <h3 className="font-orbitron text-2xl font-bold mb-6 text-[#00FFD1] text-shadow-neon-green">Get In Touch</h3>
            
            <form className="space-y-6 relative">
              <div 
                className="relative transition-all duration-300"
                onMouseEnter={() => setHoveredInput('name')}
                onMouseLeave={() => setHoveredInput(null)}
              >
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-[#0F172A] border border-[#00FFD1]/30 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FFD1] transition-all duration-300"
                  style={{
                    boxShadow: hoveredInput === 'name' ? '0 0 15px rgba(0, 255, 209, 0.3)' : 'none'
                  }}
                />
                {hoveredInput === 'name' && (
                  <div className="absolute top-0 right-0 bottom-0 left-0 border-2 border-[#00FFD1] rounded-lg pointer-events-none"
                    style={{
                      opacity: 0.1,
                      transform: 'translateZ(5px)'
                    }}
                  ></div>
                )}
              </div>
              
              <div 
                className="relative transition-all duration-300"
                onMouseEnter={() => setHoveredInput('email')}
                onMouseLeave={() => setHoveredInput(null)}
              >
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-[#0F172A] border border-[#00FFD1]/30 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FFD1] transition-all duration-300"
                  style={{
                    boxShadow: hoveredInput === 'email' ? '0 0 15px rgba(0, 255, 209, 0.3)' : 'none'
                  }}
                />
                {hoveredInput === 'email' && (
                  <div className="absolute top-0 right-0 bottom-0 left-0 border-2 border-[#00FFD1] rounded-lg pointer-events-none"
                    style={{
                      opacity: 0.1,
                      transform: 'translateZ(5px)'
                    }}
                  ></div>
                )}
              </div>
              
              <div 
                className="relative transition-all duration-300"
                onMouseEnter={() => setHoveredInput('message')}
                onMouseLeave={() => setHoveredInput(null)}
              >
                <textarea 
                  rows={4} 
                  placeholder="Your Message" 
                  className="w-full bg-[#0F172A] border border-[#00FFD1]/30 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FFD1] transition-all duration-300"
                  style={{
                    boxShadow: hoveredInput === 'message' ? '0 0 15px rgba(0, 255, 209, 0.3)' : 'none'
                  }}
                ></textarea>
                {hoveredInput === 'message' && (
                  <div className="absolute top-0 right-0 bottom-0 left-0 border-2 border-[#00FFD1] rounded-lg pointer-events-none"
                    style={{
                      opacity: 0.1,
                      transform: 'translateZ(5px)'
                    }}
                  ></div>
                )}
              </div>
              
              <Button 
                type="submit"
                className="w-full py-4 bg-[#00FFD1] text-black font-orbitron font-bold rounded-lg hover:bg-[#00FFD1]/80 transition-all duration-300 flex items-center justify-center space-x-2"
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 209, 0.5)'
                }}
              >
                <span>Send Message</span>
                <Send className="h-5 w-5" />
              </Button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-[#00FFD1]/20">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#00FFD1]/20 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-[#00FFD1]" />
                  </div>
                  <div>
                    <p className="text-gray-300">Bengaluru, India</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#00FFD1]/20 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-[#00FFD1]" />
                  </div>
                  <div>
                    <p className="text-gray-300">support@quickhacker.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#00FFD1]/20 flex items-center justify-center mr-4">
                    <MessageSquare className="h-5 w-5 text-[#00FFD1]" />
                  </div>
                  <div>
                    <p className="text-gray-300">Join our Discord Community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="glassmorphism rounded-xl p-6 md:p-8 border border-[#007BFF]/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#007BFF] via-[#00FFD1] to-[#FF007F]"></div>
            
            <h3 className="font-orbitron text-2xl font-bold mb-6 text-[#007BFF] text-shadow-neon-blue">Frequently Asked Questions</h3>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="border border-[#007BFF]/20 rounded-lg overflow-hidden bg-[#0F172A]/50 hover:bg-[#0F172A] transition-all duration-300"
                >
                  <AccordionTrigger className="px-4 py-4 font-orbitron text-gray-200 hover:text-[#007BFF] hover:no-underline group">
                    <div className="flex items-center justify-between w-full">
                      <span>{faq.question}</span>
                      <ChevronDown className="h-5 w-5 text-[#007BFF]/80 group-hover:text-[#007BFF] transition-transform duration-300" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-gray-300 border-t border-[#007BFF]/10 pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-8 text-center">
              <Link href="/faq" className="inline-flex items-center justify-center px-6 py-2 border border-[#007BFF] text-[#007BFF] rounded-md text-sm font-orbitron hover:bg-[#007BFF]/10 transition-colors">
                View All FAQs
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* Live Chatbot Icon */}
            <div className="absolute bottom-6 right-6">
              <button 
                className="h-14 w-14 rounded-full bg-gradient-to-r from-[#007BFF] to-[#00FFD1] flex items-center justify-center"
                style={{
                  boxShadow: '0 0 20px rgba(0, 123, 255, 0.6)'
                }}
              >
                <MessageSquare className="h-7 w-7 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}