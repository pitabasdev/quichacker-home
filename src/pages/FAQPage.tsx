import { useState } from 'react';
import CyberpunkCard3D from "../components/ui/CyberpunkCard3D";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('general');
  
  const categories = [
    { id: 'general', label: 'General' },
    { id: 'registration', label: 'Registration' },
    { id: 'participation', label: 'Participation' },
    { id: 'rules', label: 'Rules & Judging' },
    { id: 'prizes', label: 'Prizes & Perks' },
    { id: 'technical', label: 'Technical' },
  ];
  
  const faqs = {
    general: [
      {
        question: "What is QuickHacker Hackathon?",
        answer: "QuickHacker is a 48-hour virtual hackathon where participants from around the world come together to build innovative solutions to real-world problems. It's designed for developers, designers, and tech enthusiasts to collaborate, learn, and showcase their skills."
      },
      {
        question: "When and where will QuickHacker 2025 take place?",
        answer: "QuickHacker 2025 will take place from June 15-17, 2025. It's primarily a virtual event, allowing participants to join from anywhere in the world. We will also have physical hubs in select cities for those who prefer in-person collaboration."
      },
      {
        question: "Who can participate in QuickHacker?",
        answer: "QuickHacker is open to everyone! Whether you're a student, professional, or hobbyist programmer, designer, or tech enthusiast, you're welcome to join. We have tracks suitable for all skill levels from beginners to advanced."
      },
      {
        question: "Is there a participation fee?",
        answer: "No, participation in QuickHacker is completely free. We believe in making tech innovation accessible to everyone!"
      }
    ],
    registration: [
      {
        question: "How do I register for QuickHacker 2025?",
        answer: "Registration is simple! Just click on the 'Register Now' button on our website and fill out the registration form. You can register as an individual or as a team."
      },
      {
        question: "What is the registration deadline?",
        answer: "Early bird registration closes on April 30, 2025. Regular registration will remain open until June 1, 2025, or until spots are filled. We recommend registering early as places tend to fill up quickly!"
      },
      {
        question: "Can I participate without a team?",
        answer: "Absolutely! You can register as an individual, and we'll provide team-matching opportunities before and during the event. Alternatively, you can form your own team of up to 4 members during registration."
      },
      {
        question: "Can I change my team after registration?",
        answer: "Yes, you can modify your team until one week before the hackathon starts. After that, team changes will require approval from the organizing committee."
      }
    ],
    participation: [
      {
        question: "What do I need to participate?",
        answer: "You'll need a computer with reliable internet connection, any development tools you prefer, and your creativity! For virtual participants, we recommend having a webcam for team collaboration."
      },
      {
        question: "Do I need to be online for the entire 48 hours?",
        answer: "No, you don't need to be online for the entire duration. Teams typically set their own schedules, and many participants do take breaks and sleep! However, all team members should be available for the opening ceremony, check-ins, and final presentations."
      },
      {
        question: "Will there be mentors available during the hackathon?",
        answer: "Yes! We'll have industry experts and mentors available throughout the event to provide guidance, technical support, and feedback on your projects."
      },
      {
        question: "What if I don't have much coding experience?",
        answer: "That's perfectly fine! QuickHacker is designed for all skill levels. We have beginner-friendly challenges, workshops, and mentors specifically dedicated to helping newcomers. The most important thing is your enthusiasm to learn and create."
      }
    ],
    rules: [
      {
        question: "What are the rules for project submission?",
        answer: "All code must be written during the hackathon period. You may use open-source libraries and frameworks, but the core implementation must be original. Projects must be submitted through our platform before the deadline, along with a brief description and demonstration video."
      },
      {
        question: "How will projects be judged?",
        answer: "Projects will be evaluated by a panel of industry experts based on innovation, functionality, technical complexity, design, user experience, and potential impact. Each category will also have specific judging criteria related to the challenge."
      },
      {
        question: "Can I work on an existing project?",
        answer: "No, all projects must be started from scratch during the hackathon. You may come with ideas and plans, but coding and implementation should begin only after the official start."
      },
      {
        question: "Do I retain the rights to my project?",
        answer: "Yes, you retain all intellectual property rights to your creation. However, by participating, you grant QuickHacker non-exclusive rights to showcase your project for promotional purposes."
      }
    ],
    prizes: [
      {
        question: "What prizes can I win?",
        answer: "QuickHacker 2025 offers over $10,000 in prizes! The grand prize is $5,000, with additional category prizes of $1,000 each. Special awards include Best UI/UX, Most Innovative Idea, and Best Social Impact."
      },
      {
        question: "Are there any non-monetary prizes?",
        answer: "Yes! Winners will also receive mentorship opportunities with industry leaders, cloud credits, professional software subscriptions, hardware gadgets, and exclusive swag. Selected projects may also receive incubation support and investor introductions."
      },
      {
        question: "When will winners be announced?",
        answer: "Winners will be announced during the closing ceremony on June 17, 2025. All participants will receive certificates of participation regardless of winning status."
      },
      {
        question: "Can multiple teams win prizes?",
        answer: "Absolutely! While there's one grand prize winner, we have multiple category prizes and special awards, so many teams have the opportunity to win something."
      }
    ],
    technical: [
      {
        question: "Are there any technology restrictions?",
        answer: "You can use any programming language, framework, or technology stack of your choice. The only requirement is that your solution must be deployable for demonstration purposes by the submission deadline."
      },
      {
        question: "Will I have access to APIs and resources?",
        answer: "Yes, we provide access to various APIs, cloud resources, and developer tools from our sponsors. The complete list will be available at the start of the hackathon."
      },
      {
        question: "Can I use AI tools like ChatGPT or Copilot?",
        answer: "Yes, AI coding assistants are permitted. However, your project should demonstrate original thinking and problem-solving. Be prepared to explain your design decisions and implementation details."
      },
      {
        question: "Will there be technical workshops during the event?",
        answer: "Yes, we'll host multiple workshops covering trending technologies, APIs, and development techniques throughout the hackathon. The schedule will be shared with registered participants before the event."
      }
    ],
  };
  
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <h1 className="font-orbitron text-4xl md:text-6xl text-center font-bold mb-8">
          <span className="text-[#00FFD1]">FREQUENTLY</span>
          <span className="text-white"> ASKED QUESTIONS</span>
        </h1>
        
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Find answers to common questions about QuickHacker 2025 hackathon. If you don't find what you're looking for, feel free to contact our support team.
        </p>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full font-orbitron text-sm transition-colors ${
                activeCategory === category.id
                  ? 'bg-[#00FFD1] text-[#0A0F1A]'
                  : 'bg-[#111827] text-gray-300 hover:bg-[#00FFD1]/10 hover:text-[#00FFD1]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* FAQs */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {faqs[activeCategory as keyof typeof faqs].map((faq, index) => (
            <CyberpunkCard3D
              key={index}
              className="p-6"
              borderColor={index % 2 === 0 ? "#00FFD1" : "#007BFF"}
              glowColor={index % 2 === 0 ? "rgba(0, 255, 209, 0.5)" : "rgba(0, 123, 255, 0.5)"}
            >
              <h3 className="text-xl font-orbitron mb-3 text-white">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </CyberpunkCard3D>
          ))}
        </div>
        
        {/* Still have questions */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-orbitron mb-4 text-white">Still Have Questions?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you with any additional questions or concerns.
          </p>
          <a 
            href="/support" 
            className="inline-block px-8 py-3 bg-[#00FFD1] text-[#0A0F1A] rounded-md font-orbitron hover:bg-[#00FFD1]/90 transition-colors"
          >
            CONTACT SUPPORT
          </a>
        </div>
      </div>
    </div>
  );
}