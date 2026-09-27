import { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import TacticalCard from './TacticalCard';

interface StatItem {
  target: number;
  suffix?: string;
  labelKey: string;
  code: string;
}

const statsData: StatItem[] = [
  { target: 300, suffix: '+', labelKey: 'impact.trained', code: 'KPI.01' },
  { target: 100, suffix: '', labelKey: 'impact.capacity', code: 'KPI.02' },
  { target: 5, suffix: '', labelKey: 'impact.instructors', code: 'KPI.03' },
  { target: 60, suffix: '%', labelKey: 'impact.women', code: 'KPI.04' }
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <section ref={containerRef} id="stats" className="py-16 -mt-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TacticalCard
          isDark={true}
          radarColor="bg-brand-green"
          coordinateTag="TELEMETRY // NATIONAL DATA"
        >
          <div className="bg-gradient-to-br from-brand-navy via-slate-900 to-[#0d121f] rounded-2xl py-14 sm:py-16 md:py-20 px-6 sm:px-8 text-white relative overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-solar-motif opacity-[0.06] pointer-events-none"></div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10 text-center relative z-10">
              {statsData.map((stat, index) => (
                <div key={index} className={`flex flex-col items-center px-4 ${index > 0 ? 'pt-8 lg:pt-0' : ''}`}>
                  <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-brand-yellow/80 mb-2">
                    {stat.code}
                  </span>
                  
                  {/* Huge Number animated from 0 to target value upon entering viewport */}
                  <div className="text-5xl sm:text-6xl md:text-7xl font-mono font-extrabold tracking-tight text-white mb-3 tabular-nums drop-shadow-sm">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} isVisible={isInView} />
                  </div>
                  
                  {/* Clear short description underneath */}
                  <div className="text-sm md:text-base font-sans font-medium text-gray-300 max-w-[190px] mx-auto leading-snug">
                    {t(stat.labelKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TacticalCard>
      </div>
    </section>
  );
}
