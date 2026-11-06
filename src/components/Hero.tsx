import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';

const HERO_ALT = {
  sq: 'Grup kursantësh me helmeta dhe jelekë të verdhë gjatë trajnimit praktik në parkun solar',
  en: 'A group of trainees in yellow helmets and vests during hands-on training at the solar park',
};

function toSentenceCase(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function Hero() {
  const { t } = useLanguage();
  const { settings } = useSiteData();
  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';

  return (
    <section 
      id="home" 
      className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-end wide:justify-center pt-[96vw] pb-14 sm:pb-20 wide:pt-36 lg:wide:pt-40 lg:pb-28 overflow-hidden"
    >
      {/* Background image: the training group on the solar park. Desktop: navy 85% behind the
          text fading to 20% on the right; phone and portrait tablet: the 3:4 photo at the top, 85% at its bottom
          fading out by 55% of its height, the text below the group. */}
      <div className="absolute inset-0 z-0 bg-[#0B0F19] overflow-hidden">
        <div className="absolute inset-0 bg-solar-motif opacity-[0.04] z-10 pointer-events-none"></div>
        <div className="absolute inset-0 hidden wide:block bg-gradient-to-r from-[#0B0F19]/85 via-[#0B0F19]/85 via-35% to-[#0B0F19]/20 z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 top-0 aspect-[3/4] wide:hidden bg-gradient-to-t from-[#0B0F19]/85 to-transparent to-55% z-10 pointer-events-none"></div>
        <picture className="absolute inset-x-0 top-0 aspect-[3/4] wide:aspect-auto wide:inset-0 block">
          <source media="(max-width: 767px), (orientation: portrait) and (max-width: 1100px)" srcSet="/hero/hero-mobile-720.webp 720w, /hero/hero-mobile-1080.webp 1080w" sizes="100vw" width={1080} height={1435} />
          <img
            src="/hero/hero-desktop-1440.webp"
            srcSet="/hero/hero-desktop-1440.webp 1440w, /hero/hero-desktop-2400.webp 2400w"
            sizes="100vw"
            width={2400}
            height={1514}
            fetchPriority="high"
            loading="eager"
            alt={HERO_ALT[currentLanguage]}
            className="w-full h-full object-cover object-[50%_30%] wide:object-[60%_50%] opacity-85 transform-gpu transition-transform duration-[14000ms] ease-out hover:scale-105"
          />
        </picture>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto wide:my-auto">
        <div className="max-w-4xl transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-3">
          
          {/* Live Alert Banner if enabled by Admin */}
          {settings.announcementActive && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-medium mb-4 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {currentLanguage === 'sq' ? settings.announcementTextSq : settings.announcementTextEn}
              </span>
            </div>
          )}

          {/* Live Urgency Micro-Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-heading font-medium tracking-wide mb-6 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              {settings.isOpen
                ? (currentLanguage === 'sq' ? (settings.cohortTitleSq || 'Regjistrimet aktive për grupin e radhës') : (settings.cohortTitleEn || 'Active enrollment for upcoming cohort'))
                : (currentLanguage === 'sq' ? 'Grupi aktual është plotësuar' : 'Current cohort is fully booked')}
            </span>
          </div>

          {/* H1 Headline with Sentence Case and One Consistent Headline Font */}
          <h1 className="wide:max-w-[min(650px,calc(55vw-48px))] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.08] tracking-tight mb-5 sm:mb-7 drop-shadow-sm">
            {toSentenceCase(t('hero.title'))}
          </h1>
          
          {/* Supporting Paragraph with High Contrast */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200/95 font-body font-normal mb-8 sm:mb-10 max-w-2xl wide:max-w-[min(42rem,calc(55vw-48px))] leading-relaxed drop-shadow-sm">
            {t('hero.subtitle')}
          </p>
          
          {/* Action CTAs: Solid Green Primary & Outlined Secondary */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <a
              href="#contact"
              className="relative overflow-hidden inline-flex items-center justify-center font-heading font-semibold tracking-wide rounded-full px-7 sm:px-8 py-3.5 text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 text-white shadow-xl shadow-brand-green/30 hover:shadow-2xl hover:shadow-brand-green/45 gap-2.5 cursor-pointer group"
            >
              <span className="relative z-10">{t('hero.apply')}</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              {/* Soft tactile sweep highlight */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
            </a>
            <a
              href="#programs"
              className="inline-flex items-center justify-center font-heading font-medium tracking-wide rounded-full px-6 sm:px-7 py-3.5 text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-transparent hover:bg-white/10 text-white border border-white/25 hover:border-white/50 backdrop-blur-sm gap-2 cursor-pointer"
            >
              <span>{t('hero.programs')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
