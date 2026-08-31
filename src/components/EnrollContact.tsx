import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function EnrollContact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold tracking-widest uppercase mb-4">
              {t('badge.enrollment')}
            </div>
            <h2 className="text-3xl font-heading font-bold text-brand-navy mb-8">
              {t('contact.title')}
            </h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all"
                  placeholder={t('contact.name.placeholder')}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all"
                  placeholder={t('contact.email.placeholder')}
                />
              </div>
              
              <div>
                <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.program')}
                </label>
                <select
                  id="program"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all bg-white"
                >
                  <option value="solar">{t('prog.solar.title')}</option>
                  <option value="battery">{t('prog.battery.title')}</option>
                  <option value="efficiency">{t('prog.efficiency.title')}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all resize-none"
                  placeholder="..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-heading font-semibold text-lg py-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                {t('contact.send')}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

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
