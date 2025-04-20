export default function CircuitLines() {
  return (
    <div className="absolute inset-0 opacity-10 z-0 pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFD1" />
            <stop offset="50%" stopColor="#007BFF" />
            <stop offset="100%" stopColor="#FF007F" />
          </linearGradient>
        </defs>
        
        {/* Horizontal lines */}
        <line x1="0%" y1="20%" x2="100%" y2="20%" stroke="url(#circuitGradient)" strokeWidth="1" />
        <line x1="0%" y1="40%" x2="100%" y2="40%" stroke="url(#circuitGradient)" strokeWidth="1" />
        <line x1="0%" y1="60%" x2="100%" y2="60%" stroke="url(#circuitGradient)" strokeWidth="1" />
        <line x1="0%" y1="80%" x2="100%" y2="80%" stroke="url(#circuitGradient)" strokeWidth="1" />
        
        {/* Vertical lines */}
        <line x1="20%" y1="0%" x2="20%" y2="100%" stroke="url(#circuitGradient)" strokeWidth="1" />
        <line x1="40%" y1="0%" x2="40%" y2="100%" stroke="url(#circuitGradient)" strokeWidth="1" />
        <line x1="60%" y1="0%" x2="60%" y2="100%" stroke="url(#circuitGradient)" strokeWidth="1" />
        <line x1="80%" y1="0%" x2="80%" y2="100%" stroke="url(#circuitGradient)" strokeWidth="1" />
        
        {/* Diagonal lines */}
        <line x1="0%" y1="0%" x2="100%" y2="100%" stroke="url(#circuitGradient)" strokeWidth="1" />
        <line x1="100%" y1="0%" x2="0%" y2="100%" stroke="url(#circuitGradient)" strokeWidth="1" />
        
        {/* Connection points */}
        <circle cx="20%" cy="20%" r="3" fill="#00FFD1" />
        <circle cx="40%" cy="40%" r="3" fill="#007BFF" />
        <circle cx="60%" cy="60%" r="3" fill="#FF007F" />
        <circle cx="80%" cy="80%" r="3" fill="#00FFD1" />
        <circle cx="20%" cy="80%" r="3" fill="#FF007F" />
        <circle cx="80%" cy="20%" r="3" fill="#007BFF" />
        
        {/* Small connection points */}
        <circle cx="20%" cy="40%" r="2" fill="#00FFD1" />
        <circle cx="20%" cy="60%" r="2" fill="#007BFF" />
        <circle cx="40%" cy="20%" r="2" fill="#FF007F" />
        <circle cx="40%" cy="60%" r="2" fill="#00FFD1" />
        <circle cx="40%" cy="80%" r="2" fill="#007BFF" />
        <circle cx="60%" cy="20%" r="2" fill="#FF007F" />
        <circle cx="60%" cy="40%" r="2" fill="#00FFD1" />
        <circle cx="60%" cy="80%" r="2" fill="#007BFF" />
        <circle cx="80%" cy="40%" r="2" fill="#FF007F" />
        <circle cx="80%" cy="60%" r="2" fill="#00FFD1" />
      </svg>
    </div>
  );
}