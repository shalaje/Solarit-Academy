import { useLanguage } from '../context/LanguageContext';

export default function FacilityGallery() {
  const { t } = useLanguage();

  const currentLanguage = t('nav.home') === 'Home' ? 'en' : 'sq';

  const galleryImages = [
    { url: '/01.jpg', alt: 'Training Classroom', sq: 'Klasa e Trajnimit', en: 'Training Classroom', span: 'md:col-span-8 md:row-span-2 aspect-[16/9] md:aspect-auto' },
    { url: '/02.jpg', alt: 'Solar Park Visit', sq: 'Vizitë në Parkun Solar', en: 'Solar Park Visit', span: 'md:col-span-4 md:row-span-1 aspect-[4/3] md:aspect-auto' },
    { url: '/03.jpg', alt: 'Hands-on Equipment', sq: 'Pajisjet Praktike', en: 'Hands-on Equipment', span: 'md:col-span-4 md:row-span-1 aspect-[4/3] md:aspect-auto' },
    { url: '/586104350_122199067754355704_647952871261180247_n.jpg', alt: 'Safety Training', sq: 'Trajnimi i Sigurisë', en: 'Safety Training', span: 'md:col-span-4 md:row-span-1 aspect-[4/3]' },
    { url: '/640933758_122212965542355704_6725679518158766618_n.jpg', alt: 'Practical Application', sq: 'Aplikimi Praktik', en: 'Practical Application', span: 'md:col-span-8 md:row-span-1 aspect-[16/9] md:aspect-[2/1]' },
  ];

  return (
    <section id="facility" className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold tracking-widest uppercase mb-4">
            {t('badge.campus')}
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-navy mb-4">
            {t('facility.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('facility.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-3 gap-4 md:h-[800px]">
          {galleryImages.map((img, idx) => (
            <div key={idx} className={`${img.span} relative rounded-2xl overflow-hidden group`}>
              {/* Overlay & Caption */}
              <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <h3 className="text-white text-2xl font-heading font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 px-6 text-center">
                  {currentLanguage === 'sq' ? img.sq : img.en}
                </h3>
              </div>
              
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
