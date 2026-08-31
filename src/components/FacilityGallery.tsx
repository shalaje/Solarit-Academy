import { useLanguage } from '../context/LanguageContext';

export default function FacilityGallery() {
  const { t } = useLanguage();

  return (
    <section id="facility" className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold tracking-widest uppercase mb-4">
            {t('badge.campus')}
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-4">
            {t('facility.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('facility.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[600px]">
          {/* Main Large Image */}
          <div className="md:col-span-8 relative rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
            <img 
              src="/01.jpg" 
              alt="Modern Training Classroom" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop';
              }}
            />
          </div>
          
          {/* Side Small Images */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden group h-1/2">
              <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
              <img 
                src="/02.jpg" 
                alt="Solar Park Hands-on" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop';
                }}
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden group h-1/2">
              <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
              <img 
                src="/03.jpg" 
                alt="Training Equipment" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=2070&auto=format&fit=crop';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
