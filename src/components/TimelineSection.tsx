import { useState, useEffect, useRef } from 'react';
import { Clock, Calendar, Award, Users } from 'lucide-react';
import useCountdown from '../lib/hooks/useCountdown';

interface TimelineItem {
  id: number;
  phase: string;
  date: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

export default function TimelineSection() {
  const [activePhase, setActivePhase] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Final deadline date (Example: May 15, 2025)
  const finalDeadline = new Date('2025-05-15T23:59:59');
  const countdown = useCountdown(finalDeadline);
  
  // Simulated current active phase
  useEffect(() => {
    // This would normally be calculated based on current date vs phase dates
    const timer = setTimeout(() => {
      setActivePhase(2); // Set to current phase for demonstration
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      phase: "Registration Opens",
      date: "March 30, 2025",
      description: "Sign up and form your team of up to 4 members to participate in the hackathon.",
      icon: <Users className="w-6 h-6" />,
      color: "#FF007F"
    },
    {
      id: 2,
      phase: "Project Submissions Begin",
      date: "April 15, 2025",
      description: "Start submitting your projects and get early feedback from mentors.",
      icon: <Calendar className="w-6 h-6" />,
      color: "#00FFD1"
    },
    {
      id: 3,
      phase: "Final Submission Deadline",
      date: "May 15, 2025",
      description: "Complete your project and submit final code, demo, and presentation.",
      icon: <Clock className="w-6 h-6" />,
      color: "#007BFF"
    },
    {
      id: 4,
      phase: "Winners Announced",
      date: "May 30, 2025",
      description: "Join us for the grand finale where winners will be announced live!",
      icon: <Award className="w-6 h-6" />,
      color: "#FFD100"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hackathon <span className="text-[#00FFD1]">Timeline</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF007F] via-[#00FFD1] to-[#007BFF] mx-auto"></div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-16 bg-black/40 rounded-xl border border-indigo-500/30 backdrop-blur-sm p-6 max-w-4xl mx-auto">
          <h3 className="text-2xl text-center text-white mb-4">
            Final Submission Deadline In:
          </h3>
          
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-black/50 p-4 rounded-lg border border-indigo-500/50">
              <div className="text-4xl font-bold text-indigo-400">{countdown.days}</div>
              <div className="text-gray-400 text-sm">Days</div>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-pink-500/50">
              <div className="text-4xl font-bold text-pink-400">{countdown.hours}</div>
              <div className="text-gray-400 text-sm">Hours</div>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-cyan-500/50">
              <div className="text-4xl font-bold text-cyan-400">{countdown.minutes}</div>
              <div className="text-gray-400 text-sm">Minutes</div>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg border border-green-500/50">
              <div className="text-4xl font-bold text-green-400">{countdown.seconds}</div>
              <div className="text-gray-400 text-sm">Seconds</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#FF007F] via-[#00FFD1] to-[#007BFF]"></div>
          
          {/* Timeline Items */}
          <div className="relative z-10">
            {timelineItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex items-center mb-16 last:mb-0 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse md:flex-row-reverse'
                }`}
              >
                {/* Content Box - Left or Right based on index */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div 
                    className={`
                      bg-black/30 backdrop-blur-sm p-6 rounded-xl border 
                      transition-all duration-300
                      ${item.id === activePhase ? 'scale-105' : 'scale-100'}
                      ${item.id < activePhase ? 'opacity-70' : 'opacity-100'}
                    `} 
                    style={{
                      borderColor: item.color,
                      boxShadow: item.id === activePhase ? `0 0 15px ${item.color}50` : 'none'
                    }}
                  >
                    <h3 className="text-xl font-bold mb-2" style={{ color: item.color }}>
                      {item.phase}
                    </h3>
                    <p className="text-white text-sm mb-2">{item.date}</p>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </div>
                
                {/* Center Icon */}
                <div className="w-2/12 flex justify-center">
                  <div 
                    className={`
                      h-12 w-12 rounded-full flex items-center justify-center z-10
                      transition-all duration-300
                      ${item.id === activePhase ? 'scale-125' : 'scale-100'}
                    `} 
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 15px ${item.color}90`
                    }}
                  >
                    {item.icon}
                  </div>
                </div>
                
                {/* Spacer for the other side */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}