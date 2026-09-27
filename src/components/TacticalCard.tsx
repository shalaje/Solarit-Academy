import { ReactNode } from 'react';

interface TacticalCardProps {
  key?: string | number;
  children: ReactNode;
  className?: string;
  radarColor?: string; // ping dot color class
  coordinateTag?: string;
  isDark?: boolean;
}

export default function TacticalCard({
  children,
  className = '',
  radarColor = 'bg-brand-green',
  coordinateTag,
  isDark = true
}: TacticalCardProps) {
  return (
    <div className={`relative group ${className}`}>
      
      {/* 3D PARALLAX DEPTH & BACKGROUND MOTION LAYER (Behind the card surface) */}
      <div className="absolute inset-0 -z-10 rounded-2xl overflow-hidden pointer-events-none">
        
        {/* Technical SVG Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
        />

        {/* Ambient Radar Grid Lines */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-[0.08]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`tactical-grid-${Math.random().toString(36).substring(2, 9)}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="currentColor" className={isDark ? "text-white" : "text-brand-navy"} />
        </svg>

        {/* Radar Blip / Animated Indicator Dots beneath the surface */}
        <div className="absolute top-1/4 right-8 flex items-center justify-center">
          <span className={`absolute inline-flex h-12 w-12 rounded-full ${radarColor} opacity-20 animate-ping`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${radarColor}`} />
        </div>

        <div className="absolute bottom-1/3 left-10 flex items-center justify-center">
          <span className="absolute inline-flex h-8 w-8 rounded-full bg-amber-400 opacity-20 animate-ping [animation-delay:1s]" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
        </div>

        {/* Tactical Crosshair Watermark */}
        <div className="absolute top-3 right-4 font-mono text-[8px] text-gray-500 tracking-[0.25em] opacity-40 select-none">
          {coordinateTag || 'SYS.LOC // 42°39\'N 21°09\'E'}
        </div>
      </div>

      {/* MAIN CARD CONTAINER */}
      <div 
        className={`relative z-10 h-full rounded-2xl transition-all duration-300 ${
          isDark 
            ? 'bg-[#111625]/95 border border-white/10 hover:border-white/20 shadow-2xl backdrop-blur-sm' 
            : 'bg-white border border-neutral-200 hover:border-neutral-300 shadow-xl'
        }`}
      >
        {children}
      </div>

    </div>
  );
}
