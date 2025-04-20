import { useEffect, useRef } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - using limited character set for better performance
    const chars = '01'.split('');
    
    // Column setup
    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize) + 1;
    
    // Initialize the drops array (y-position for each column)
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      // Start positions randomly spread out for better effect
      drops[i] = Math.floor(Math.random() * -canvas.height);
    }

    // Character colors based on cyber theme
    const colors = [
      'rgba(0, 255, 209, 0.7)',  // cyber green
      'rgba(0, 123, 255, 0.7)',  // cyber blue
      'rgba(255, 0, 127, 0.7)',  // cyber pink
    ];

    // Selected color for each column
    const columnColors: string[] = [];
    for (let i = 0; i < columns; i++) {
      columnColors[i] = colors[Math.floor(Math.random() * colors.length)];
    }

    // Drawing the characters
    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Draw a random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Use the column's assigned color
        ctx.fillStyle = columnColors[i];
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Send the drop back to the top randomly after it crosses the screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move the drop down
        drops[i]++;
      }
    };

    // Animation loop
    const interval = setInterval(draw, 120);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-[-2] pointer-events-none opacity-30"
    />
  );
}