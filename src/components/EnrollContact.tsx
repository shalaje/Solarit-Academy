import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TacticalCard from './TacticalCard';

export default function EnrollContact() {
  const { t } = useLanguage();

  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';

  return (
    <section id="contact" className="py-24 relative bg-solar-motif">
      <div className="absolute inset-0 bg-white/95"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Next Cohort Banner - Tactical 3D Depth Card */}
        <div className="mb-14">
          <TacticalCard
            isDark={true}
            radarColor="bg-emerald-400"
            coordinateTag="COHORT // INTAKE-04"
          >
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="relative z-10">
                <div className="text-[9px] font-mono font-bold tracking-[0.3em] uppercase text-brand-yellow mb-2">
                  {currentLanguage === 'sq' ? 'STATUSI I REGJISTRIMIT // LIVE' : 'ENROLLMENT STATUS // LIVE'}
                </div>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-snug text-white">
                  {currentLanguage === 'sq' ? 'Grupi i Radhës: [KONFIRMO DATËN ME KLIENTIN]' : 'Next Cohort: [CONFIRM DATE WITH CLIENT]'}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mt-1 max-w-xl">
                  {currentLanguage === 'sq' ? 'Vendet në impiantin solar 2MW janë të kufizuara në 15 kandidatë për grup. Siguroni vendin tuaj.' : 'Class sizes at the 2MW solar plant are capped at 15 trainees per cohort. Secure your qualification.'}
                </p>
              </div>
              <div className="relative z-10 shrink-0">
                <button
                  onClick={() => {
                    document.getElementById('name')?.focus();
                  }}
                  className="inline-flex items-center justify-center font-bold tracking-wide rounded-full px-6 py-2.5 text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 text-white shadow-xl whitespace-nowrap"
                >
                  {currentLanguage === 'sq' ? 'APLIKO TANI' : 'APPLY NOW'}
                </button>
              </div>
            </div>
          </TacticalCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Form - Tactical 3D Depth Card */}
          <TacticalCard
            isDark={false}
            radarColor="bg-brand-green"
            coordinateTag="SECURE // SSL 256-BIT"
            className="h-full"
          >
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-brand-green/10 text-brand-green text-[9px] font-mono font-bold tracking-[0.3em] uppercase mb-4">
                {t('badge.enrollment')}
              </div>
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-snug text-brand-navy mb-8">
                {t('contact.title')}
              </h2>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all text-sm"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all text-sm"
                    placeholder={t('contact.email.placeholder')}
                  />
                </div>
                
                <div>
                  <label htmlFor="program" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                    {t('contact.program')}
                  </label>
                  <select
                    id="program"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all bg-white text-sm"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all resize-none text-sm"
                    placeholder="..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center font-bold tracking-wide rounded-full px-6 py-3 text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 text-white shadow-md gap-2"
                >
                  {t('contact.send')}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </TacticalCard>

          {/* Contact Info & Map */}
          <div className="flex flex-col gap-10">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="font-heading font-bold text-brand-navy text-lg mb-1">{t('contact.phone_title')}</h3>
                <a href="tel:+38345459948" className="text-gray-600 hover:text-brand-green transition-colors">
                  +383 45 459 948
                </a>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="font-heading font-bold text-brand-navy text-lg mb-1">{t('contact.email_title')}</h3>
                <a href="mailto:solarit.academy@gmail.com" className="text-gray-600 hover:text-brand-green transition-colors">
                  solarit.academy@gmail.com
                </a>
              </div>
              
              <div className="sm:col-span-2">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="font-heading font-bold text-brand-navy text-lg mb-1">{t('contact.address_title')}</h3>
                <p className="text-gray-600">
                  {t('contact.address_desc')}
                </p>
              </div>
            </div>
            
            <div className="flex-grow rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white relative min-h-[300px]">
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
