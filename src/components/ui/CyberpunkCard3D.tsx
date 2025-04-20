import { useState, useRef, ReactNode } from 'react';

interface CyberpunkCard3DProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
  glowColor?: string;
  maxTilt?: number;
  scale?: number;
}

export default function CyberpunkCard3D({
  children,
  className = '',
  borderColor = '#00FFD1',
  glowColor = 'rgba(0, 255, 209, 0.5)',
  maxTilt = 5,
  scale = 1.02
}: CyberpunkCard3DProps) {
  const [transform, setTransform] = useState('');
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage
    const percentX = x / rect.width;
    const percentY = y / rect.height;
    
    // Calculate tilt angle
    const tiltX = (percentY - 0.5) * maxTilt * 2;
    const tiltY = (0.5 - percentX) * maxTilt * 2;
    
    // Update transform
    setTransform(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`);
    
    // Update glow position
    setGlowPosition({
      x: percentX * 100,
      y: percentY * 100
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-lg bg-[#0A0F1A]/80 backdrop-blur-sm border transition-all duration-200 ${className}`}
      style={{
        transform,
        border: `1px solid ${borderColor}`,
        boxShadow: isHovered 
          ? `0 0 20px ${glowColor}, inset 0 0 20px ${glowColor}` 
          : `0 0 5px ${glowColor}, inset 0 0 5px ${glowColor}`
      }}
    >
      {/* Animated glow spotlight effect */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-50 rounded-lg"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor} 0%, transparent 50%)`,
          }}
        />
      )}
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l rounded-tl-lg" style={{ borderColor }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r rounded-tr-lg" style={{ borderColor }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l rounded-bl-lg" style={{ borderColor }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r rounded-br-lg" style={{ borderColor }} />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}