import React from "react";

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  neonColor?: string;
  hoverEffect?: boolean;
}

export default function GlassmorphicCard({ 
  children, 
  className = "", 
  neonColor = "#00FFD1",
  hoverEffect = true 
}: GlassmorphicCardProps) {
  
  const baseClasses = "glassmorphism rounded-xl p-6 border relative";
  const hoverClasses = hoverEffect 
    ? `hover:border-[${neonColor}]/50 hover:shadow-[0_0_5px_${neonColor},0_0_10px_${neonColor}] transform transition-all duration-500 hover:-translate-y-1 group` 
    : "";
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {hoverEffect && (
        <>
          <div className={`absolute -inset-0.5 bg-gradient-to-r from-[${neonColor}] to-[#007BFF] opacity-0 group-hover:opacity-20 rounded-xl blur-sm`}></div>
          <div className={`absolute -top-6 -right-6 w-20 h-20 bg-[${neonColor}]/20 rounded-full blur-xl group-hover:bg-[${neonColor}]/30 transition-all duration-500`}></div>
        </>
      )}
      {children}
    </div>
  );
}
