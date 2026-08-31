import { Sun, Facebook, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black text-gray-300 py-16 border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-green/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 border-b border-white/10 pb-12 mb-8">
          
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center text-white font-heading font-bold text-3xl tracking-tight">
                S<Sun className="w-8 h-8 text-brand-sun-start mx-0.5 mt-1" />LARIT
              </div>
              <div className="text-brand-green font-heading font-bold text-base leading-none mt-1 uppercase">
                Academy
              </div>
            </div>
            <p className="text-gray-400 max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">
              {t('footer.nav_title')}
            </h4>
            <ul className="space-y-3">
              <li><a href="#home" className="hover:text-brand-green transition-colors">{t('nav.home')}</a></li>
              <li><a href="#programs" className="hover:text-brand-green transition-colors">{t('nav.programs')}</a></li>
              <li><a href="#why-solarit" className="hover:text-brand-green transition-colors">{t('nav.why_solarit')}</a></li>
              <li><a href="#facility" className="hover:text-brand-green transition-colors">{t('nav.facility')}</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">
              {t('footer.social_title')}
            </h4>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=61560671136948" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.linkedin.com/company/solarit-academy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.instagram.com/solaritacademy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} Solarit Academy. {t('footer.rights')}
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-1">
            {t('footer.built_by')} <a href="https://novadigital.studio/" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:text-white font-semibold ml-1 transition-colors">Nova Digital Studio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
