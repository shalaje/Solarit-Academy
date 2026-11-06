import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  RotateCcw, 
  MessageCircle 
} from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import TacticalCard from './TacticalCard';

export default function EnrollContact() {
  const { t } = useLanguage();
  const { settings } = useSiteData();
  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    program: 'pv-installer-pro',
    message: '',
    _gotcha: '' // honeypot
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const programLabels: Record<string, { sq: string; en: string }> = {
    'pv-installer-pro': {
      sq: 'Instalimi i sistemeve solare',
      en: 'Solar PV systems installation'
    },
    'bess-master': {
      sq: 'Sistemet solare hibride',
      en: 'Hybrid Solar Systems'
    },
    'pv-design-engineer': {
      sq: 'Trajnim profesional për softuerët solarë: AutoCAD, PV*SOL & PVsyst',
      en: 'Professional training for solar software: AutoCAD, PV*SOL & PVsyst'
    }
  };

  const selectedProgramName = programLabels[formData.program]?.[currentLanguage] || formData.program;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData._gotcha) return; // Silent reject for spam bots

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Primary automated endpoint delivering to active inbox and cc'ing domain email
      const response = await fetch('https://formsubmit.co/ajax/solarit.academy@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'Emri dhe Mbiemri': formData.name,
          'Kontakti (Email/Tel)': formData.contact,
          'Programi i përzgjedhur': selectedProgramName,
          'Mesazhi': formData.message || 'Pa mesazh shtesë',
          '_subject': `Aplikim i ri: ${formData.name} - ${selectedProgramName} (Solarit Academy)`,
          '_cc': 'info@solaritacademy.com',
          '_template': 'table',
          '_captcha': 'false'
        })
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || 'Dërgimi dështoi.');
      }
    } catch (err) {
      console.error('Form submission issue:', err);
      setStatus('error');
      setErrorMessage(
        currentLanguage === 'sq'
          ? 'Dërgimi automatik pati një vonesë teknike. Mund të dërgoni menjëherë aplikimin direkt me email ose përmes WhatsApp:'
          : 'Automated delivery experienced a slight delay. You can instantly send your application via direct email or WhatsApp:'
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      contact: '',
      program: 'pv-installer-pro',
      message: '',
      _gotcha: ''
    });
    setStatus('idle');
    setErrorMessage('');
  };

  // Pre-filled direct email link fallback
  const directMailtoUrl = `mailto:info@solaritacademy.com?cc=solarit.academy@gmail.com&subject=${encodeURIComponent(
    `Aplikim për trajnim - ${formData.name || 'Kandidat i ri'} (${selectedProgramName})`
  )}&body=${encodeURIComponent(
    `Përshëndetje Solarit Academy,\n\nPo aplikoj për regjistrim në programin:\n- Programi: ${selectedProgramName}\n- Emri dhe Mbiemri: ${formData.name}\n- Kontakti: ${formData.contact}\n- Mesazhi: ${formData.message || 'Nuk ka'}\n\nJu faleminderit!`
  )}`;

  // Direct WhatsApp link fallback
  const directWhatsAppUrl = `https://wa.me/38345459948?text=${encodeURIComponent(
    `Përshëndetje Solarit Academy! Dëshiroj të aplikoj për trajnimin: "${selectedProgramName}". Emri: ${formData.name || ''}, Kontakti: ${formData.contact || ''}.`
  )}`;

  return (
    <section id="contact" className="pt-10 lg:pt-14 pb-20 lg:pb-28 relative bg-[#F7F8FA] border-t border-neutral-200/60">
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
                  {currentLanguage === 'sq' 
                    ? (settings.cohortStatusSq || 'STATUSI I REGJISTRIMIT // HAPUR')
                    : (settings.cohortStatusEn || 'ENROLLMENT STATUS // OPEN')}
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold tracking-tight text-white mb-2">
                  {currentLanguage === 'sq' 
                    ? (settings.cohortTitleSq || 'Grupi i radhës: Regjistrimet janë hapur')
                    : (settings.cohortTitleEn || 'Next cohort: Registration is now open')}
                </h3>
                {settings.nextSessionDate && (
                  <p className="text-xs sm:text-sm text-gray-300 font-sans mt-1">
                    {settings.nextSessionDate}
                  </p>
                )}
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
          
          {/* Contact / CTA Form */}
          <div className="lg:col-span-7">
            <TacticalCard
              isDark={false}
              radarColor="bg-brand-green"
              coordinateTag="SECURE // APPLICATION PORTAL"
              className="h-full"
            >
              <div className="p-8 sm:p-10 md:p-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 text-xs font-semibold tracking-wider uppercase mb-4">
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
                
                {status === 'success' ? (
                  <div className="p-7 sm:p-8 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 space-y-5 animate-in fade-in duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-lg sm:text-xl text-emerald-900">
                          {t('contact.success_title')}
                        </div>
                        <p className="text-sm text-emerald-800 mt-1.5 leading-relaxed">
                          {t('contact.success_desc')}
                        </p>
                      </div>
                    </div>

                    {/* Summary of submitted details */}
                    <div className="bg-white/80 rounded-xl p-4 border border-emerald-200 text-xs sm:text-sm space-y-1.5 text-gray-700">
                      <div><strong className="text-gray-900">{t('contact.name')}:</strong> {formData.name}</div>
                      <div><strong className="text-gray-900">{t('contact.email')}:</strong> {formData.contact}</div>
                      <div><strong className="text-gray-900">{t('contact.program')}:</strong> {selectedProgramName}</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={directWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{currentLanguage === 'sq' ? 'Shkruani në WhatsApp' : 'Message on WhatsApp'}</span>
                      </a>
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{t('contact.submit_another')}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Honeypot field for bot mitigation */}
                    <input 
                      type="text" 
                      name="_gotcha" 
                      value={formData._gotcha} 
                      onChange={(e) => setFormData(prev => ({ ...prev, _gotcha: e.target.value }))}
                      style={{ display: 'none' }} 
                      tabIndex={-1} 
                      autoComplete="off" 
                    />

                    <div>
                      <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                        {t('contact.name')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all text-sm bg-white text-gray-900"
                        placeholder={t('contact.name.placeholder')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contact" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                        {t('contact.email')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all text-sm bg-white text-gray-900"
                        placeholder={currentLanguage === 'sq' ? '+383 4X XXX XXX ose email@example.com' : '+383 4X XXX XXX or email@example.com'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="program" className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                        {t('contact.program')}
                      </label>
                      <select
                        id="program"
                        value={formData.program}
                        onChange={(e) => setFormData(prev => ({ ...prev, program: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all bg-white text-sm text-gray-900"
                      >
                        <option value="pv-installer-pro">
                          {currentLanguage === 'sq' ? 'Instalimi i sistemeve solare' : 'Solar PV systems installation'}
                        </option>
                        <option value="bess-master">
                          {currentLanguage === 'sq' ? 'Sistemet solare hibride' : 'Hybrid Solar Systems'}
                        </option>
                        <option value="pv-design-engineer">
                          {currentLanguage === 'sq' ? 'Trajnim profesional për softuerët solarë: AutoCAD, PV*SOL & PVsyst' : 'Professional training for solar software: AutoCAD, PV*SOL & PVsyst'}
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
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all resize-none text-sm bg-white text-gray-900"
                        placeholder={currentLanguage === 'sq' ? 'Përvoja juaj e mëparshme, pyetje ose orari i preferuar...' : 'Your background, questions, or preferred schedule...'}
                      ></textarea>
                    </div>

                    {/* Error Banner with Direct Fallbacks */}
                    {status === 'error' && (
                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3 animate-in fade-in">
                        <div className="flex items-start gap-2.5">
                          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div className="text-xs sm:text-sm">
                            <strong className="block font-semibold mb-0.5">{t('contact.error_title')}</strong>
                            {errorMessage}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <a
                            href={directMailtoUrl}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-950 text-xs font-semibold hover:bg-amber-100 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{t('contact.email_fallback')}</span>
                          </a>
                          <a
                            href={directWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{t('contact.whatsapp_fallback')}</span>
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {/* Prominent Main CTA Button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full inline-flex items-center justify-center font-heading font-bold tracking-wide rounded-full px-8 py-3.5 text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 bg-brand-green hover:bg-brand-green/90 disabled:bg-gray-400 text-white shadow-xl shadow-brand-green/25 hover:shadow-brand-green/40 gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{t('contact.submitting')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('contact.send')}</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </TacticalCard>
          </div>

          {/* Contact Info & Map */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            
            {/* Contact Details Cards */}
            <div className="flex flex-col gap-3.5">
              <a 
                href="tel:+38345459948" 
                className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-sm flex items-center gap-4 hover:border-brand-green/50 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-11 h-11 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green shrink-0 group-hover:bg-brand-green group-hover:text-white transition-colors duration-200">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-bold text-brand-navy text-xs uppercase tracking-wider mb-0.5">
                    {t('contact.phone_title')}
                  </div>
                  <div className="text-gray-900 group-hover:text-brand-green transition-colors text-sm sm:text-base font-semibold truncate">
                    +383 45 459 948
                  </div>
                </div>
              </a>
              
              {/* Professional Email with Domain solaritacademy.com */}
              <a 
                href="mailto:info@solaritacademy.com?cc=solarit.academy@gmail.com" 
                className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-sm flex items-center gap-4 hover:border-brand-green/50 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-11 h-11 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green shrink-0 group-hover:bg-brand-green group-hover:text-white transition-colors duration-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-bold text-brand-navy text-xs uppercase tracking-wider mb-0.5">
                    {t('contact.email_title')}
                  </div>
                  <div className="text-gray-900 group-hover:text-brand-green transition-colors text-sm sm:text-base font-semibold truncate">
                    info@solaritacademy.com
                  </div>
                </div>
              </a>
              
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-sm flex items-center gap-4 hover:border-brand-green/30 transition-all duration-200">
                <div className="w-11 h-11 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-bold text-brand-navy text-xs uppercase tracking-wider mb-0.5">
                    {t('contact.address_title')}
                  </div>
                  <p className="text-gray-900 text-sm sm:text-base font-semibold leading-snug">
                    {t('contact.address_desc')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Map Container with Substantial Visual Weight & Custom Branded Pin */}
            <div className="flex-1 rounded-2xl overflow-hidden shadow-md border border-neutral-200 bg-white relative min-h-[300px]">
               {/* Floating Branded Badge over Map */}
               <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3 border border-neutral-200/90 shadow-md flex items-center gap-2.5 pointer-events-none">
                 <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0">
                   <MapPin className="w-4 h-4" />
                 </div>
                 <div>
                   <div className="font-heading font-bold text-brand-navy text-xs leading-none mb-0.5">
                     ELING Grup / Solarit Academy
                   </div>
                   <div className="text-[11px] text-gray-500 font-sans">
                     Lipjan, Kosovë
                   </div>
                 </div>
               </div>

               <iframe 
                 src="https://maps.google.com/maps?q=ELING+GRUP+SH.P.K,+Lipjan,+Kosovo&t=&z=14&ie=UTF8&iwloc=&output=embed"
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, filter: 'grayscale(100%) contrast(1.05)' }} 
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
