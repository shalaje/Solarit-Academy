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
        isScrolled ? 'bg-white/85 backdrop-blur-md border-b border-gray-200/50 py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center font-heading font-bold text-2xl tracking-tight transition-colors ${isScrolled ? 'text-brand-navy' : 'text-white'}`}>
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
              <button 
                onClick={toggleLanguage}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isScrolled ? 'text-brand-navy hover:text-brand-green' : 'text-white hover:text-white/80'}`}
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
              </button>
              
              <a 
                href="#contact"
                className="bg-brand-green hover:bg-brand-green/90 text-white px-5 py-2.5 rounded-lg font-heading font-semibold text-sm transition-colors shadow-sm"
              >
                {t('nav.apply')}
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${isScrolled || isMobileMenuOpen ? 'text-brand-navy' : 'text-white'}`}
            >
              <Globe className="w-4 h-4" />
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors ${isScrolled || isMobileMenuOpen ? 'text-brand-navy' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100/50 shadow-lg py-6 px-4 flex flex-col space-y-4">
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
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-brand-green text-white text-center px-5 py-3 rounded-lg font-heading font-semibold mt-2 shadow-sm hover:bg-brand-green/90 transition-colors"
          >
            {t('nav.apply')}
          </a>
        </div>
      )}
    </nav>
  );
}
