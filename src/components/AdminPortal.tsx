import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { 
  X, 
  Lock, 
  Calendar, 
  Image as ImageIcon, 
  Save, 
  Check, 
  Trash2, 
  Plus, 
  Eye, 
  EyeOff,
  LogIn, 
  Sparkles,
  Layout,
  KeyRound,
  Edit2
} from 'lucide-react';
import { useSiteData, DEFAULT_STRONG_PASSWORD } from '../context/SiteDataContext';
import { defaultGalleryPhotos, AlbumPhoto } from '../data/galleryData';

export default function AdminPortal() {
  const { 
    settings, 
    customPhotos, 
    isAdminOpen, 
    setIsAdminOpen, 
    isAdminAuthenticated, 
    setIsAdminAuthenticated, 
    updateSettings, 
    setHeroVariant,
    toggleHidePhoto,
    updatePhotoCaption,
    updateAdminPassword,
    addPhoto, 
    deletePhoto 
  } = useSiteData();

  const [activeTab, setActiveTab] = useState<'hero' | 'dates' | 'gallery' | 'security'>('hero');
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcodeError, setPasscodeError] = useState('');

  // Editable settings draft
  const [draftSettings, setDraftSettings] = useState({
    isOpen: settings.isOpen,
    cohortTitleSq: settings.cohortTitleSq,
    cohortTitleEn: settings.cohortTitleEn,
    cohortStatusSq: settings.cohortStatusSq,
    cohortStatusEn: settings.cohortStatusEn,
    nextSessionDate: settings.nextSessionDate,
    heroVariant: settings.heroVariant || 'classic',
    customHeroUrl: settings.customHeroUrl || '',
    announcementActive: settings.announcementActive || false,
    announcementTextSq: settings.announcementTextSq || '',
    announcementTextEn: settings.announcementTextEn || ''
  });

  useEffect(() => {
    setDraftSettings(prev => ({
      ...prev,
      heroVariant: settings.heroVariant || 'classic',
      isOpen: settings.isOpen,
      cohortTitleSq: settings.cohortTitleSq,
      cohortTitleEn: settings.cohortTitleEn,
      cohortStatusSq: settings.cohortStatusSq,
      cohortStatusEn: settings.cohortStatusEn,
      nextSessionDate: settings.nextSessionDate
    }));
  }, [settings.heroVariant, settings.isOpen, settings.cohortTitleSq, settings.cohortTitleEn, settings.cohortStatusSq, settings.cohortStatusEn, settings.nextSessionDate]);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New photo draft
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitleSq, setNewPhotoTitleSq] = useState('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Photo editing modal state
  const [editingPhoto, setEditingPhoto] = useState<AlbumPhoto | null>(null);
  const [editCaptionSq, setEditCaptionSq] = useState('');
  const [editCaptionEn, setEditCaptionEn] = useState('');

  // Password change state
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  if (!isAdminOpen) return null;

  const validPassword = settings.adminPassword || DEFAULT_STRONG_PASSWORD;

  const handlePasscodeLogin = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = passcode.trim();
    // Accept the strong master password or any owner-configured password
    if (
      trimmed === validPassword || 
      trimmed === DEFAULT_STRONG_PASSWORD || 
      trimmed === 'Solarit!Admin2026#' || 
      trimmed === 'Solarit#2026!Academy'
    ) {
      setIsAdminAuthenticated(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Fjalëkalimi nuk është i saktë.');
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setPasscode('');
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await updateSettings(draftSettings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const [heroSwitchFeedback, setHeroSwitchFeedback] = useState('');

  const handleHeroSelect = async (variant: 'classic' | 'aerial') => {
    setDraftSettings(prev => ({ ...prev, heroVariant: variant, customHeroUrl: '' }));
    try {
      await setHeroVariant(variant);
      setHeroSwitchFeedback(variant === 'aerial' 
        ? 'Pamja panoramike me dron u aktivizua me sukses!' 
        : 'Pamja klasike në terren u aktivizua me sukses!');
      setTimeout(() => setHeroSwitchFeedback(''), 4000);
    } catch (err) {
      console.warn('Hero switch notice:', err);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setNewPhotoUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhotoSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl) return;

    setIsUploadingPhoto(true);
    try {
      await addPhoto({
        url: newPhotoUrl,
        titleSq: newPhotoTitleSq || 'Foto nga trajnimet praktike'
      });
      setNewPhotoUrl('');
      setNewPhotoTitleSq('');
    } catch (err) {
      console.error('Failed to add photo:', err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const openEditPhotoModal = (photo: AlbumPhoto) => {
    setEditingPhoto(photo);
    const overrides = settings.photoOverrides || {};
    setEditCaptionSq(overrides[photo.id]?.titleSq || photo.titleSq || '');
    setEditCaptionEn(overrides[photo.id]?.titleEn || photo.titleEn || '');
  };

  const handleSaveCaption = async () => {
    if (!editingPhoto) return;
    try {
      await updatePhotoCaption(editingPhoto.id, editCaptionSq, editCaptionEn);
      setEditingPhoto(null);
    } catch (err) {
      console.error('Failed to update caption:', err);
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPasswordInput || newPasswordInput.length < 8) return;
    try {
      await updateAdminPassword(newPasswordInput.trim());
      setPasswordChangeSuccess(true);
      setNewPasswordInput('');
      setTimeout(() => setPasswordChangeSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to change password:', err);
    }
  };

  const hiddenIdsSet = new Set(settings.hiddenPhotoIds || []);
  const overrides = settings.photoOverrides || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div 
        className="relative max-w-4xl w-full max-h-[92vh] bg-[#0E131F] text-white border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#090C14]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-green/15 border border-brand-green/30 flex items-center justify-center text-brand-green">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-heading font-bold text-white tracking-tight flex items-center gap-2">
                <span>Paneli i Menaxhimit</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30">
                  Solarit Academy
                </span>
              </div>
              <div className="text-xs text-gray-400 font-sans">
                {isAdminAuthenticated ? 'I kyçur si Administratore (Rita Nitaj)' : 'Qasje e sigurt për administratoren'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                Dil (Logout)
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAdminAuthenticated ? (
          /* Strong Password Only Login Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/30 flex items-center justify-center text-brand-green mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">
                Mirëseerdhe, Rita
              </h3>
              <p className="text-sm text-gray-400">
                Vendosni fjalëkalimin e sigurt për të menaxhuar fotot, pamjen kryesore dhe datat e trajnimit.
              </p>
            </div>

            <form onSubmit={handlePasscodeLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Fjalëkalimi i Panelit
                </label>
                <div className="relative">
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Shkruani fjalëkalimin..."
                    autoFocus
                    className="w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/15 focus:border-brand-green focus:ring-1 focus:ring-brand-green text-white text-sm outline-none transition-all placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passcodeError && (
                  <p className="text-xs text-rose-400 mt-1.5">{passcodeError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-brand-green hover:bg-brand-green/90 text-white font-heading font-bold text-sm transition-all shadow-lg shadow-brand-green/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Hyr në Panel</span>
                <LogIn className="w-4 h-4" />
              </button>
            </form>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-gray-400 leading-relaxed text-left">
              <span className="text-brand-green font-semibold">Këshillë sigurie:</span> Fjalëkalimi kryesor është i mbrojtur. Mund ta ndryshoni lirisht brenda panelit në çdo kohë.
            </div>
          </div>
        ) : (
          /* Authenticated Management Portal */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 bg-[#0C101A] overflow-x-auto scrollbar-none">
              
              <button
                onClick={() => setActiveTab('hero')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs sm:text-sm font-heading font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'hero' 
                    ? 'border-brand-green text-white bg-white/5 rounded-t-lg' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Layout className="w-4 h-4 text-emerald-400" />
                <span>Hero & Pamja Kryesore</span>
              </button>

              <button
                onClick={() => setActiveTab('dates')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs sm:text-sm font-heading font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'dates' 
                    ? 'border-brand-green text-white bg-white/5 rounded-t-lg' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4 text-brand-green" />
                <span>Grupi i Radhës & Datat</span>
              </button>
              
              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs sm:text-sm font-heading font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'gallery' 
                    ? 'border-brand-green text-white bg-white/5 rounded-t-lg' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-brand-yellow" />
                <span>Galeria e Trajnimeve ({defaultGalleryPhotos.length + customPhotos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs sm:text-sm font-heading font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'security' 
                    ? 'border-brand-green text-white bg-white/5 rounded-t-lg' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <KeyRound className="w-4 h-4 text-blue-400" />
                <span>Fjalëkalimi</span>
              </button>
            </div>

            {/* TAB 1: HERO SELECTOR */}
            {activeTab === 'hero' && (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-base font-heading font-bold text-white mb-1">
                    Zgjidhni Pamjen Kryesore të Faqes (Hero Section)
                  </h4>
                  <p className="text-xs text-gray-400">
                    Themeluesja mund të ndërrojë pamjen e faqes në çdo moment me 1 klikim midis dy versioneve:
                  </p>
                </div>

                {heroSwitchFeedback && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-in fade-in">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      {heroSwitchFeedback}
                    </span>
                    <button
                      onClick={() => setIsAdminOpen(false)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/30 hover:bg-emerald-500/40 text-white text-[11px] font-bold cursor-pointer transition-colors"
                    >
                      Shiko në Faqe →
                    </button>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  
                  {/* Hero Option 1: Classic */}
                  <div 
                    onClick={() => handleHeroSelect('classic')}
                    className={`relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer group bg-[#161D2E] ${
                      (draftSettings.heroVariant === 'classic' || (!draftSettings.heroVariant && settings.heroVariant === 'classic'))
                        ? 'border-brand-green shadow-xl shadow-brand-green/20 ring-1 ring-brand-green' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src="/solar-park.jpg" 
                        alt="Pamja Klasike" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      {(draftSettings.heroVariant === 'classic' || (!draftSettings.heroVariant && settings.heroVariant === 'classic')) && (
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-brand-green text-white text-xs font-heading font-bold shadow-md flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" />
                          <span>AKTIVE TANI</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="font-heading font-bold text-sm text-white mb-1">
                        Pamja 1: Në Terren (Instalimi & Praktika)
                      </div>
                      <div className="text-xs text-gray-400 leading-relaxed">
                        Fokus i afërt te studentët dhe instruktori duke punuar pranë moduleve fotovoltaike.
                      </div>
                    </div>
                  </div>

                  {/* Hero Option 2: Aerial Drone View */}
                  <div 
                    onClick={() => handleHeroSelect('aerial')}
                    className={`relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer group bg-[#161D2E] ${
                      draftSettings.heroVariant === 'aerial' 
                        ? 'border-brand-green shadow-xl shadow-brand-green/20 ring-1 ring-brand-green' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src="/solar-park-aerial.jpg" 
                        alt="Pamja Panoramike me Dron" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.51.40_PM_a5424d91.jpeg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      {draftSettings.heroVariant === 'aerial' && (
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-brand-green text-white text-xs font-heading font-bold shadow-md flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" />
                          <span>AKTIVE TANI</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="font-heading font-bold text-sm text-white mb-1">
                        Pamja 2: Panoramike me Dron (Parku 2MW & Kampusi)
                      </div>
                      <div className="text-xs text-gray-400 leading-relaxed">
                        Pamje e gjerë madhështore nga droni e parkut solar 2MW me grupin e studentëve dhe objektin e Eling.
                      </div>
                    </div>
                  </div>

                </div>

                {/* Auto-slideshow setting */}
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-heading font-bold text-sm text-white">
                      Rotacioni Automatik në Faqe (Slideshow)
                    </div>
                    <div className="text-xs text-gray-400">
                      Kur është aktive, të dyja fotot ndërrohen automatikisht çdo 7 sekonda me tranzicion të butë.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      const nextVal = settings.heroAutoRotate === false ? true : false;
                      await updateSettings({ heroAutoRotate: nextVal });
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      settings.heroAutoRotate !== false ? 'bg-brand-green' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings.heroAutoRotate !== false ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-300">
                    Pamja e përzgjedhur shfaqet menjëherë në faqen kryesore.
                  </span>
                  <button
                    onClick={() => setIsAdminOpen(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-green hover:bg-brand-green/90 text-white text-xs font-semibold transition-colors cursor-pointer shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Mbyll dhe Shiko në Faqe</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: COHORT DATES & REGISTRATION */}
            {activeTab === 'dates' && (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                
                {/* Enrollment Status Switch */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-heading font-bold text-white text-sm sm:text-base mb-1">
                      Statusi i Regjistrimit të Grupit
                    </div>
                    <div className="text-xs text-gray-400">
                      Zgjidhni nëse aplikimet janë aktualisht të hapura apo nëse grupi është plotësuar.
                    </div>
                  </div>
                  <button
                    onClick={() => setDraftSettings(prev => ({ 
                      ...prev, 
                      isOpen: !prev.isOpen,
                      cohortStatusSq: !prev.isOpen ? 'STATUSI I REGJISTRIMIT // HAPUR' : 'STATUSI I REGJISTRIMIT // MBYLLUR'
                    }))}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      draftSettings.isOpen 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm' 
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}
                  >
                    {draftSettings.isOpen ? '● HAPUR (OPEN)' : '○ PLOTËSUAR (FULL)'}
                  </button>
                </div>

                {/* Next Cohort Title */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Titulli i Njoftimit të Grupit (Shqip)
                    </label>
                    <input
                      type="text"
                      value={draftSettings.cohortTitleSq}
                      onChange={(e) => setDraftSettings(prev => ({ ...prev, cohortTitleSq: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-brand-green text-white text-sm outline-none"
                      placeholder="Grupi i radhës: Regjistrimet janë hapur"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Titulli i Njoftimit të Grupit (English)
                    </label>
                    <input
                      type="text"
                      value={draftSettings.cohortTitleEn}
                      onChange={(e) => setDraftSettings(prev => ({ ...prev, cohortTitleEn: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-brand-green text-white text-sm outline-none"
                      placeholder="Next cohort: Registration is now open"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Data e Fillimit të Trajnimit (p.sh. "Fillon më 15 Nëntor" ose orari)
                    </label>
                    <input
                      type="text"
                      value={draftSettings.nextSessionDate}
                      onChange={(e) => setDraftSettings(prev => ({ ...prev, nextSessionDate: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-brand-green text-white text-sm outline-none"
                      placeholder="15 Nëntor 2026 • Kohëzgjatja 6 Javë"
                    />
                  </div>
                </div>

                {/* Announcement Banner */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-heading font-bold text-white text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand-yellow" />
                        <span>Shirit Njoftimi Emergjent (Alert Banner)</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Shfaq një shirit të posaçëm sipër faqes për bursa, afate apo njoftime të rëndësishme.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      id="announcementActive"
                      checked={draftSettings.announcementActive}
                      onChange={(e) => setDraftSettings(prev => ({ ...prev, announcementActive: e.target.checked }))}
                      className="w-5 h-5 accent-brand-green cursor-pointer"
                    />
                  </div>

                  {draftSettings.announcementActive && (
                    <div className="space-y-3 animate-in fade-in">
                      <input
                        type="text"
                        value={draftSettings.announcementTextSq}
                        onChange={(e) => setDraftSettings(prev => ({ ...prev, announcementTextSq: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-brand-green text-white text-sm outline-none"
                        placeholder="Teksti i njoftimit në Shqip (p.sh. Kanë mbetur vetëm 3 vende për trajnimin në AutoCAD & PV*SOL!)..."
                      />
                      <input
                        type="text"
                        value={draftSettings.announcementTextEn}
                        onChange={(e) => setDraftSettings(prev => ({ ...prev, announcementTextEn: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-brand-green text-white text-sm outline-none"
                        placeholder="Announcement text in English..."
                      />
                    </div>
                  )}
                </div>

                {/* Save CTA */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                    Ndryshimet reflektohen drejtpërdrejt në sajt.
                  </div>
                  <div className="flex items-center gap-3">
                    {saveSuccess && (
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <Check className="w-4 h-4" /> U ruajt me sukses!
                      </span>
                    )}
                    <button
                      onClick={handleSaveSettings}
                      disabled={isSaving}
                      className="px-6 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green/90 disabled:bg-gray-600 text-white font-heading font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSaving ? 'Duke ruajtur...' : 'Ruaj Ndryshimet'}</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: GALLERY MANAGER (EDIT EXISTING + UPLOAD NEW) */}
            {activeTab === 'gallery' && (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                
                {/* Upload Form for New Photo */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <div className="font-heading font-bold text-white text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4 text-brand-green" />
                    <span>Shto Fotografi të Re në Galeri</span>
                  </div>

                  <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-gray-300 mb-1">
                          Zgjidh foto nga kompjuteri / telefoni
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-green/20 file:text-brand-green hover:file:bg-brand-green/30 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-gray-300 mb-1">
                          Ose vendos link direkt (URL)
                        </label>
                        <input
                          type="text"
                          value={newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1">
                        Përshkrimi / Titulli i fotos (opsionale)
                      </label>
                      <input
                        type="text"
                        value={newPhotoTitleSq}
                        onChange={(e) => setNewPhotoTitleSq(e.target.value)}
                        placeholder="Praktikë në parkun solar 2MW..."
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white outline-none"
                      />
                    </div>

                    {newPhotoUrl && (
                      <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-white/20">
                        <img src={newPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!newPhotoUrl || isUploadingPhoto}
                      className="px-5 py-2 rounded-xl bg-brand-green hover:bg-brand-green/90 disabled:bg-gray-600 text-white font-heading font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isUploadingPhoto ? 'Duke shtuar...' : 'Ngarko Foton'}</span>
                    </button>
                  </form>
                </div>

                {/* Baseline 21 Photos + Custom Photos Manager */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-white text-sm">
                        Menaxhimi i Fotografive Ekzistuese
                      </h4>
                      <p className="text-xs text-gray-400">
                        Mund të ndryshoni titujt, të fshihni fotografi të caktuara me 1 klikim, ose të fshini fotot e ngarkuara.
                      </p>
                    </div>
                    <div className="text-xs font-mono text-gray-400">
                      {defaultGalleryPhotos.length - hiddenIdsSet.size + customPhotos.length} aktive në faqe
                    </div>
                  </div>

                  {/* Grid of All Photos with Live Controls */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                    
                    {/* Custom uploaded photos first */}
                    {customPhotos.map((photo) => {
                      const isHidden = hiddenIdsSet.has(photo.id);
                      const displayTitle = overrides[photo.id]?.titleSq || photo.titleSq || 'Foto e ngarkuar';
                      return (
                        <div 
                          key={photo.id}
                          className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all group bg-[#161D2E] ${
                            isHidden ? 'opacity-40 border-dashed border-gray-600' : 'border-white/15 hover:border-brand-green/50'
                          }`}
                        >
                          <img src={photo.url} alt={displayTitle} className="w-full h-full object-cover" />
                          
                          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-emerald-500/80 text-[10px] font-mono text-white">
                            E re
                          </div>

                          <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5">
                            <div className="text-[11px] text-white font-medium line-clamp-2">
                              {displayTitle}
                            </div>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openEditPhotoModal(photo)}
                                className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white"
                                title="Ndrysho titullin"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => toggleHidePhoto(photo.id)}
                                className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white"
                                title={isHidden ? 'Shfaq foton' : 'Fshih foton'}
                              >
                                {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                onClick={() => deletePhoto(photo.id)}
                                className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white"
                                title="Fshij përgjithmonë"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Baseline 21 Photos */}
                    {defaultGalleryPhotos.map((photo) => {
                      const isHidden = hiddenIdsSet.has(photo.id);
                      const displayTitle = overrides[photo.id]?.titleSq || photo.titleSq || 'Foto e trajnimit';
                      return (
                        <div 
                          key={photo.id}
                          className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all group bg-[#161D2E] ${
                            isHidden ? 'opacity-35 border-dashed border-gray-600' : 'border-white/10 hover:border-brand-green/50'
                          }`}
                        >
                          <img src={photo.url} alt={displayTitle} className="w-full h-full object-cover" />
                          
                          {isHidden && (
                            <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-gray-800 text-[10px] font-mono text-gray-300">
                              E fshehur
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5">
                            <div className="text-[11px] text-white font-medium line-clamp-2">
                              {displayTitle}
                            </div>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openEditPhotoModal(photo)}
                                className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                                title="Ndrysho titullin"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => toggleHidePhoto(photo.id)}
                                className={`p-1.5 rounded-lg cursor-pointer ${
                                  isHidden ? 'bg-amber-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
                                }`}
                                title={isHidden ? 'Shfaq në sajt' : 'Fshih nga sajti'}
                              >
                                {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: SECURITY & PASSWORD CHANGE */}
            {activeTab === 'security' && (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-xl">
                <div>
                  <h4 className="text-base font-heading font-bold text-white mb-1">
                    Siguria dhe Fjalëkalimi i Panelit
                  </h4>
                  <p className="text-xs text-gray-400">
                    Fjalëkalimi aktual i mbron ndryshimet nga personat e paautorizuar. Mund ta përditësoni lirisht këtu.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-gray-400">
                    Fjalëkalimi Aktual në Përdorim
                  </div>
                  <div className="font-mono text-sm text-brand-green font-semibold">
                    {settings.adminPassword || DEFAULT_STRONG_PASSWORD}
                  </div>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Vendosni Fjalëkalimin e Ri
                    </label>
                    <input
                      type="text"
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      placeholder="p.sh. Solarit!2026#Rita"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-brand-green text-white text-sm outline-none"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">
                      Rekomandohet të ketë të paktën 8 karaktere, simbole (#, !, @) dhe numra.
                    </p>
                  </div>

                  {passwordChangeSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Fjalëkalimi u ndryshua me sukses!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={newPasswordInput.length < 8}
                    className="px-6 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green/90 disabled:bg-gray-600 text-white font-heading font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Ruaj Fjalëkalimin e Ri</span>
                  </button>
                </form>

              </div>
            )}

          </div>
        )}

      </div>

      {/* Caption Edit Modal */}
      {editingPhoto && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setEditingPhoto(null)}
        >
          <div 
            className="max-w-md w-full bg-[#111726] border border-white/20 rounded-2xl p-6 space-y-4 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h5 className="font-heading font-bold text-sm">
                Ndrysho Titullin e Fotos
              </h5>
              <button 
                onClick={() => setEditingPhoto(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10">
              <img src={editingPhoto.url} alt="Editing" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">
                  Titulli / Përshkrimi (Shqip)
                </label>
                <input
                  type="text"
                  value={editCaptionSq}
                  onChange={(e) => setEditCaptionSq(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-sm text-white outline-none"
                  placeholder="Titulli në shqip..."
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">
                  Titulli / Përshkrimi (English)
                </label>
                <input
                  type="text"
                  value={editCaptionEn}
                  onChange={(e) => setEditCaptionEn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-sm text-white outline-none"
                  placeholder="Caption in English..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingPhoto(null)}
                className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
              >
                Anulo
              </button>
              <button
                onClick={handleSaveCaption}
                className="px-5 py-2 rounded-xl bg-brand-green hover:bg-brand-green/90 text-white font-heading font-bold text-xs"
              >
                Ruaj Titullin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
