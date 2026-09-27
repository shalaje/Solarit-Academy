import { useState, useEffect } from 'react';
import { Menu, X, Sun, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#programs', label: t('nav.programs') },
    { href: '#why-solarit', label: t('nav.why_solarit') },
    { href: '#facility', label: t('nav.facility') },
    { href: '#partners', label: t('nav.partners') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'sq' ? 'en' : 'sq');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMobileMenuOpen 
          ? 'bg-white py-3 shadow-sm'
          : isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 py-3 shadow-sm' 
            : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center font-heading font-bold text-2xl tracking-tight transition-colors ${isScrolled || isMobileMenuOpen ? 'text-brand-navy' : 'text-white'}`}>
              S<Sun className="w-6 h-6 text-brand-sun-start mx-0.5 mt-1" />LARIT
            </div>
            <div className="text-brand-green font-heading font-bold text-sm leading-none mt-1 uppercase">
              Academy
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-medium text-sm transition-colors ${isScrolled ? 'text-brand-navy hover:text-brand-green' : 'text-white hover:text-white/80'}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            <div className={`flex items-center gap-4 border-l pl-4 transition-colors ${isScrolled ? 'border-gray-200' : 'border-white/30'}`}>
              {/* Language-Switcher Toggle */}
              <div
                className={`inline-flex items-center p-0.5 rounded-full border transition-all ${
                  isScrolled
                    ? 'border-gray-200 bg-gray-100/90 shadow-inner'
                    : 'border-white/20 bg-white/10 backdrop-blur-md shadow-sm'
                }`}
                role="group"
                aria-label="Zgjidh gjuhën / Select language"
              >
                <button
                  type="button"
                  onClick={() => setLanguage('sq')}
                  className={`px-2.5 py-1 text-xs rounded-full font-bold tracking-wider transition-all duration-200 ${
                    language === 'sq'
                      ? 'bg-brand-green text-white shadow-sm scale-105'
                      : isScrolled
                        ? 'text-gray-500 hover:text-brand-navy'
                        : 'text-white/70 hover:text-white'
                  }`}
                  aria-pressed={language === 'sq'}
                  title="Shqip"
                >
                  SQ
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 text-xs rounded-full font-bold tracking-wider transition-all duration-200 ${
                    language === 'en'
                      ? 'bg-brand-green text-white shadow-sm scale-105'
                      : isScrolled
                        ? 'text-gray-500 hover:text-brand-navy'
                        : 'text-white/70 hover:text-white'
                  }`}
                  aria-pressed={language === 'en'}
                  title="English"
                >
                  EN
                </button>
              </div>
              
              <a 
                href="#contact"
                className="inline-flex items-center justify-center font-bold tracking-wide rounded-full px-6 py-2.5 text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 text-white shadow-sm"
              >
                {t('nav.apply')}
              </a>
            </div>
          </div>

          {/* Mobile Menu Button & Mobile Language Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Header Language Toggle */}
            <div
              className={`inline-flex items-center p-0.5 rounded-full border transition-all ${
                isScrolled || isMobileMenuOpen
                  ? 'border-gray-200 bg-gray-100'
                  : 'border-white/20 bg-white/10 backdrop-blur-md'
              }`}
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => setLanguage('sq')}
                className={`px-2 py-0.5 text-xs rounded-full font-bold transition-all ${
                  language === 'sq'
                    ? 'bg-brand-green text-white shadow-sm'
                    : isScrolled || isMobileMenuOpen
                      ? 'text-gray-500 hover:text-brand-navy'
                      : 'text-white/70 hover:text-white'
                }`}
                aria-pressed={language === 'sq'}
              >
                SQ
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-xs rounded-full font-bold transition-all ${
                  language === 'en'
                    ? 'bg-brand-green text-white shadow-sm'
                    : isScrolled || isMobileMenuOpen
                      ? 'text-gray-500 hover:text-brand-navy'
                      : 'text-white/70 hover:text-white'
                }`}
                aria-pressed={language === 'en'}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1 transition-colors ${isScrolled || isMobileMenuOpen ? 'text-brand-navy' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl py-6 px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-brand-navy font-medium text-lg border-b border-gray-200/50 pb-2"
            >
              {link.label}
            </a>
          ))}

          {/* Dedicated Language Selector Row in Mobile Menu */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-green" />
              {language === 'sq' ? 'Gjuha e faqes' : 'Site language'}
            </span>
            <div className="inline-flex items-center p-0.5 rounded-full border border-gray-200 bg-gray-100">
              <button
                type="button"
                onClick={() => setLanguage('sq')}
                className={`px-3 py-1 text-xs rounded-full font-bold transition-all ${
                  language === 'sq' ? 'bg-brand-green text-white shadow-sm' : 'text-gray-500'
                }`}
              >
                Shqip (SQ)
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs rounded-full font-bold transition-all ${
                  language === 'en' ? 'bg-brand-green text-white shadow-sm' : 'text-gray-500'
                }`}
              >
                English (EN)
              </button>
            </div>
          </div>

          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex items-center justify-center font-bold tracking-wide rounded-full px-6 py-2.5 text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 text-white shadow-sm mt-2 text-center"
          >
            {t('nav.apply')}
          </a>
        </div>
      )}
    </nav>
  );
}
