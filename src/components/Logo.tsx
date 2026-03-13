interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>
        
        {/* Main circle */}
        <circle 
          cx="32" 
          cy="32" 
          r="30" 
          fill="url(#logoGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Book icon */}
        <g transform="translate(20, 18)">
          {/* Book base */}
          <rect 
            x="2" 
            y="4" 
            width="20" 
            height="24" 
            rx="2" 
            fill="url(#bookGradient)"
            stroke="#64748B" 
            strokeWidth="1.5"
          />
          
          {/* Book spine */}
          <rect 
            x="2" 
            y="4" 
            width="4" 
            height="24" 
            rx="2" 
            fill="#475569"
          />
          
          {/* Pages lines */}
          <line x1="8" y1="10" x2="18" y2="10" stroke="#94A3B8" strokeWidth="1" />
          <line x1="8" y1="14" x2="18" y2="14" stroke="#94A3B8" strokeWidth="1" />
          <line x1="8" y1="18" x2="15" y2="18" stroke="#94A3B8" strokeWidth="1" />
          
          {/* AI spark/star */}
          <g transform="translate(16, 6)">
            <path 
              d="M4 0L4.9 2.1L7 3L4.9 3.9L4 6L3.1 3.9L1 3L3.1 2.1L4 0Z" 
              fill="#FBBF24"
              className="animate-pulse"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}