import { useState, useEffect, useRef } from 'react';

interface Hexagon {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  rotationSpeed: number;
  rotation: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function HexagonGrid() {
  const [hexagons, setHexagons] = useState<Hexagon[]>([]);
  const requestRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize hexagons
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Generate random hexagons
    const generateHexagons = () => {
      const newHexagons: Hexagon[] = [];
      const count = Math.min(window.innerWidth / 100, 20); // Adjust density based on screen width
      
      const colors = [
        'rgba(0, 255, 209, 0.2)',  // cyber green
        'rgba(0, 123, 255, 0.2)',  // cyber blue
        'rgba(255, 0, 127, 0.2)',  // cyber pink
        'rgba(110, 17, 221, 0.2)'  // cyber purple
      ];
      
      for (let i = 0; i < count; i++) {
        newHexagons.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 50 + 30,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          rotation: Math.random() * 360,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
      
      setHexagons(newHexagons);
    };
    
    generateHexagons();
    
    // Re-generate on resize
    const handleResize = () => {
      generateHexagons();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Animation loop
  useEffect(() => {
    const animate = () => {
      setHexagons(prev => prev.map(hex => ({
        ...hex,
        rotation: hex.rotation + hex.rotationSpeed,
        opacity: 0.2 + (Math.sin(Date.now() * hex.pulseSpeed + hex.pulsePhase) + 1) * 0.15
      })));
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden z-0"
    >
      {hexagons.map(hex => (
        <div 
          key={hex.id}
          className="absolute"
          style={{
            left: `${hex.x}%`,
            top: `${hex.y}%`,
            width: `${hex.size}px`,
            height: `${hex.size * 0.866}px`, // Height is approx 0.866 times width for hexagon
            opacity: hex.opacity,
            transform: `rotate(${hex.rotation}deg)`,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <svg
            viewBox="0 0 100 86.6"
            className="w-full h-full"
          >
            <polygon 
              points="50 0, 100 25, 100 75, 50 100, 0 75, 0 25" 
              fill={hex.color}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1"
              className="transform-origin-center"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}