import ContactSection from "../components/ContactSection";
import CircuitLines from "../components/ui/CircuitLines";

export default function ContactPage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-radial from-[#1A1A2E] to-[#0D1117] z-[-2]"></div>
      <CircuitLines />
      
      <div className="py-20">
        <ContactSection />
      </div>
    </div>
  );
}