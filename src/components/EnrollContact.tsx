import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TacticalCard from './TacticalCard';

export default function EnrollContact() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-[#F7F8FA] border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Next Cohort Banner */}
        <div className="mb-14 lg:mb-16">
          <TacticalCard
            isDark={true}
            radarColor="bg-emerald-400"
            coordinateTag="COHORT // INTAKE-04"
          >
            <div className="p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="relative z-10 text-center md:text-left">
                <div className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-brand-yellow mb-2">
                  {currentLanguage === 'sq' ? 'STATUSI I REGJISTRIMIT // HAPUR' : 'ENROLLMENT STATUS // OPEN'}
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold uppercase tracking-tight text-white mb-2">
                  {currentLanguage === 'sq' ? 'Grupi i Radhës: Regjistrimet Janë Hapur' : 'Next Cohort: Registration Is Now Open'}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed">
                  {currentLanguage === 'sq' ? 'Vendet në impiantin solar 2MW janë të kufizuara në 15 kandidatë për grup për të garantuar cilësinë praktike.' : 'Class sizes at the 2MW solar plant are capped at 15 trainees per cohort to ensure individualized practical supervision.'}
                </p>
              </div>
              <div className="relative z-10 shrink-0">
                <button
                  onClick={() => {
                    document.getElementById('name')?.focus();
                  }}
                  className="inline-flex items-center justify-center font-heading font-bold tracking-wide rounded-full px-8 py-3.5 text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 text-white shadow-xl shadow-brand-green/30 hover:shadow-brand-green/45 whitespace-nowrap cursor-pointer"
                >
                  {currentLanguage === 'sq' ? 'APLIKO TANI' : 'APPLY NOW'}
                </button>
              </div>
            </div>
          </TacticalCard>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <TacticalCard
              isDark={false}
              radarColor="bg-brand-green"
              coordinateTag="SECURE // APPLICATION PORTAL"
              className="h-full"
            >
              <div className="p-8 sm:p-10 md:p-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold tracking-widest uppercase mb-4">
                  {t('badge.enrollment')}
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-2 tracking-tight">
                  {t('contact.title')}
                </h2>
                
                <p className="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed">
                  {currentLanguage === 'sq' 
                    ? 'Plotësoni të dhënat tuaja dhe ekipi ynë akademik do t\'ju kontaktojë brenda 24 orëve.'
                    : 'Submit your application details and our academic admissions team will reach out within 24 hours.'}
                </p>
                
                {isSubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-4 animate-in fade-in duration-300">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-heading font-bold text-base">
                        {currentLanguage === 'sq' ? 'Aplikimi u dërgua me sukses!' : 'Application Submitted Successfully!'}
                      </div>
                      <div className="text-sm text-emerald-700 mt-1">
                        {currentLanguage === 'sq' ? 'Do t\'ju kontaktojmë së shpejti me detajet e radhës.' : 'We will contact you shortly with the next onboarding steps.'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                        {t('contact.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all text-sm bg-white text-gray-900"
                        placeholder={t('contact.name.placeholder')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                        {t('contact.email')}
                      </label>
                      <input
                        type="text"
                        id="email"
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all text-sm bg-white text-gray-900"
                        placeholder={t('contact.email.placeholder')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="program" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                        {t('contact.program')}
                      </label>
                      <select
                        id="program"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all bg-white text-sm text-gray-900"
                      >
                        <option value="pv-installer-pro">
                          {currentLanguage === 'sq' ? 'Instalues i Certifikuar Fotovoltaik (PV)' : 'Certified PV Systems Installer'}
                        </option>
                        <option value="bess-master">
                          {currentLanguage === 'sq' ? 'Sistemet e Ruajtjes me Bateri (BESS)' : 'Battery Energy Storage Systems Specialist'}
                        </option>
                        <option value="pv-design-engineer">
                          {currentLanguage === 'sq' ? 'Inxhinieri & Projektim me PV*SOL dhe CAD' : 'Solar PV Engineering & Software Design'}
                        </option>
                        <option value="solar-om">
                          {currentLanguage === 'sq' ? 'Operimi, Mirëmbajtja & Diagnostikimi (O&M)' : 'Solar Plant O&M & Diagnostics'}
                        </option>
                        <option value="offgrid-microgrid">
                          {currentLanguage === 'sq' ? 'Sistemet Autonome Off-Grid & Mikrorrjetet' : 'Off-Grid Solar & Microgrid Systems'}
                        </option>
                        <option value="industrial-safety-hse">
                          {currentLanguage === 'sq' ? 'Siguria në Punë në Lartësi & HSE' : 'Work at Height Safety & Electrical HSE'}
                        </option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                        {t('contact.message')}
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all resize-none text-sm bg-white text-gray-900"
                        placeholder="..."
                      ></textarea>
                    </div>
                    
                    {/* Prominent Main CTA Button */}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center font-heading font-bold tracking-wide rounded-full px-8 py-3.5 text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 text-white shadow-xl shadow-brand-green/25 hover:shadow-brand-green/40 gap-2 cursor-pointer"
                    >
                      <span>{t('contact.send')}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </TacticalCard>
          </div>

          {/* Contact Info & Map */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Contact Details Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-brand-navy text-sm uppercase tracking-wider mb-1">{t('contact.phone_title')}</h3>
                  <a href="tel:+38345459948" className="text-gray-700 hover:text-brand-green transition-colors text-sm font-semibold">
                    +383 45 459 948
                  </a>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-brand-navy text-sm uppercase tracking-wider mb-1">{t('contact.email_title')}</h3>
                  <a href="mailto:solarit.academy@gmail.com" className="text-gray-700 hover:text-brand-green transition-colors text-sm font-semibold truncate block">
                    solarit.academy@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="sm:col-span-2 bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-brand-navy text-sm uppercase tracking-wider mb-1">{t('contact.address_title')}</h3>
                  <p className="text-gray-700 text-sm font-medium">
                    {t('contact.address_desc')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Map Container with Substantial Visual Weight */}
            <div className="flex-1 rounded-2xl overflow-hidden shadow-md border border-neutral-200 bg-white relative min-h-[300px]">
               <iframe 
                 src="https://maps.google.com/maps?q=ELING+GRUP+SH.P.K,+Lipjan,+Kosovo&t=&z=14&ie=UTF8&iwloc=&output=embed"
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Solarit Academy Location"
                 className="absolute inset-0"
               ></iframe>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
