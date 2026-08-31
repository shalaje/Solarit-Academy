import { useLanguage } from '../context/LanguageContext';

export default function Leadership() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-br from-brand-navy via-brand-navy to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold tracking-widest uppercase mb-4">
            {t('badge.leadership')}
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {t('leadership.title')}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full border-4 border-brand-green/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-brand-green/10 mix-blend-overlay z-10"></div>
              <img 
                src="/ceo%201.1.jpg" 
                alt="Academy Manager" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop';
                }}
              />
            </div>
            
            <div className="text-center md:text-left">
              <blockquote className="text-xl md:text-2xl font-heading font-medium leading-relaxed text-gray-200 mb-6 italic">
                {t('leadership.manager.quote')}
              </blockquote>
              <div>
                <div className="font-heading font-bold text-xl text-white mb-1">
                  Rita Nitaj
                </div>
                <div className="text-brand-yellow font-medium tracking-wide text-sm uppercase">
                  {t('leadership.manager.role')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
