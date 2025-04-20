import AboutSection from "../components/AboutSection";
import CircuitLines from "../components/ui/CircuitLines";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0D1117] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-[#1A1A2E] to-[#0D1117] z-[-2]"></div>
      <CircuitLines />
      
      <main className="flex-grow">
        <div className="py-20">
          <AboutSection />
        </div>
      </main>
    </div>
  );
}