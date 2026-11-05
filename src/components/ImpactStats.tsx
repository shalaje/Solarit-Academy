import { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import TacticalCard from './TacticalCard';

interface StatItem {
  target: number;
  suffix?: string;
  unitSuffixSq?: string;
  unitSuffixEn?: string;
  labelKey: string;
  code: string;
}

const statsData: StatItem[] = [
  { target: 300, suffix: '+', labelKey: 'impact.trained', code: 'KPI.01' },
  { target: 5, suffix: '', labelKey: 'impact.instructors', code: 'KPI.02' },
  { target: 70, suffix: '%', labelKey: 'impact.women', code: 'KPI.03' },
  { target: 300, suffix: '+', unitSuffixSq: ' / vit', unitSuffixEn: ' / yr', labelKey: 'impact.capacity', code: 'KPI.04' }
];

function AnimatedCounter({ 
  target, 
  suffix = '', 
  isVisible 
}: { 
  target: number; 
  suffix?: string; 
  isVisible: boolean; 
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number | null = null;
    const duration = target > 50 ? 1800 : 1200; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutExpo for crisp, decelerating count-up motion
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isVisible, target]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export default function ImpactStats() {
  const { t } = useLanguage();
  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section ref={containerRef} id="stats" className="py-8 sm:py-12 lg:py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TacticalCard
          isDark={true}
          radarColor="bg-brand-green"
          coordinateTag="TELEMETRY // NATIONAL DATA"
        >
          <div className="bg-gradient-to-br from-brand-navy via-slate-900 to-[#0d121f] rounded-2xl py-8 sm:py-12 lg:py-16 px-4 sm:px-8 text-white relative overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-solar-motif opacity-[0.06] pointer-events-none"></div>
            
            {/* Clean, perfectly aligned 2x2 grid on mobile and 4-column row on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 relative z-10">
              {statsData.map((stat, index) => {
                // Symmetrical tactical borders on mobile (2x2) and desktop (1x4)
                const isLeftColumn = index % 2 === 0;
                const isTopRow = index < 2;

                return (
                  <div 
                    key={index} 
                    className={`flex flex-col items-center justify-center text-center p-4 sm:p-6 lg:p-4 transition-all ${
                      isLeftColumn ? 'border-r border-white/10' : ''
                    } ${
                      isTopRow ? 'border-b lg:border-b-0 border-white/10 pb-6 lg:pb-4' : 'pt-6 lg:pt-4'
                    } ${
                      index > 0 ? 'lg:border-l lg:border-white/10' : ''
                    }`}
                  >
                    <span className="text-[10px] font-mono font-medium tracking-[0.25em] uppercase text-gray-400 mb-1.5 sm:mb-2">
                      {stat.code}
                    </span>
                    
                    {/* Aligned Number animated upon entering viewport with optional small unit suffix */}
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-extrabold tracking-tight text-white mb-2 sm:mb-3 tabular-nums drop-shadow-sm flex items-baseline justify-center">
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} isVisible={isInView} />
                      {(stat.unitSuffixSq || stat.unitSuffixEn) && (
                        <span className="text-sm sm:text-lg md:text-xl font-mono font-normal text-gray-400 ml-1">
                          {currentLanguage === 'sq' ? stat.unitSuffixSq : stat.unitSuffixEn}
                        </span>
                      )}
                    </div>
                    
                    {/* Consistent label underneath */}
                    <div className="text-xs sm:text-sm md:text-base font-body font-medium text-gray-300 max-w-[160px] sm:max-w-[190px] mx-auto leading-snug">
                      {t(stat.labelKey)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TacticalCard>
      </div>
    </section>
  );
}
