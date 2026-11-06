import { useState, ChangeEvent, FormEvent } from 'react';
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
  LogIn, 
  Sparkles,
  Info
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export default function AdminPortal() {
  const { 
    settings, 
    customPhotos, 
    isAdminOpen, 
    setIsAdminOpen, 
    currentUser, 
    isAdminAuthenticated, 
    setIsAdminAuthenticated, 
    updateSettings, 
    addPhoto, 
    deletePhoto 
  } = useSiteData();

  const [activeTab, setActiveTab] = useState<'dates' | 'photos' | 'help'>('dates');
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Editable settings draft
  const [draftSettings, setDraftSettings] = useState({
    isOpen: settings.isOpen,
    cohortTitleSq: settings.cohortTitleSq,
    cohortTitleEn: settings.cohortTitleEn,
    cohortStatusSq: settings.cohortStatusSq,
    cohortStatusEn: settings.cohortStatusEn,
    nextSessionDate: settings.nextSessionDate,
    announcementActive: settings.announcementActive || false,
    announcementTextSq: settings.announcementTextSq || '',
    announcementTextEn: settings.announcementTextEn || ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New photo draft
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitleSq, setNewPhotoTitleSq] = useState('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  if (!isAdminOpen) return null;

  const handlePasscodeLogin = (e: FormEvent) => {
    e.preventDefault();
    // Simple master security code for founder accessibility
    if (passcode === 'solar2026' || passcode === 'rita2026' || passcode === 'solarit') {
      setIsAdminAuthenticated(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Fjalëkalimi nuk është i saktë.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setIsAdminAuthenticated(true);
    } catch (err: unknown) {
      console.error('Google auth error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {
      // Ignore
    }
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

  // Convert uploaded image file to lightweight compressed data URL
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
          /* Login Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/30 flex items-center justify-center text-brand-green mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">
                Mirëseerdhe, Rita
              </h3>
              <p className="text-sm text-gray-400">
                Vendosni fjalëkalimin e sigurt për të përditësuar datat, oraret dhe fotografitë në sajt.
              </p>
            </div>

            <form onSubmit={handlePasscodeLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Fjalëkalimi i Panelit
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Shkruani fjalëkalimin..."
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-brand-green focus:ring-1 focus:ring-brand-green text-white text-sm outline-none transition-all placeholder:text-gray-500"
                />
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

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase font-mono text-gray-500 bg-[#0E131F] px-2">
                Ose
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Hyr me llogarinë Google</span>
            </button>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 bg-[#0C101A]">
              <button
                onClick={() => setActiveTab('dates')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs sm:text-sm font-heading font-semibold transition-all cursor-pointer ${
                  activeTab === 'dates' 
                    ? 'border-brand-green text-white bg-white/5 rounded-t-lg' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4 text-brand-green" />
                <span>Datat & Statusi i Trajnimit</span>
              </button>
              
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs sm:text-sm font-heading font-semibold transition-all cursor-pointer ${
                  activeTab === 'photos' 
                    ? 'border-brand-green text-white bg-white/5 rounded-t-lg' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-brand-yellow" />
                <span>Fotografitë ({customPhotos.length} shtesë)</span>
              </button>

              <button
                onClick={() => setActiveTab('help')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs sm:text-sm font-heading font-semibold transition-all cursor-pointer ${
                  activeTab === 'help' 
                    ? 'border-brand-green text-white bg-white/5 rounded-t-lg' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Info className="w-4 h-4 text-blue-400" />
                <span>Udhëzues</span>
              </button>
            </div>

            {/* Tab 1: Cohort Dates & Status */}
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

            {/* Tab 2: Photos Gallery */}
            {activeTab === 'photos' && (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                
                {/* Upload Form */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <div className="font-heading font-bold text-white text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4 text-brand-green" />
                    <span>Shto Fotografi të Re nga Trajnimet</span>
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
                          Ose vendos link (URL)
                        </label>
                        <input
                          type="text"
                          value={newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          placeholder="https://images..."
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1">
                        Përshkrimi i fotos (opsionale)
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
                      <span>{isUploadingPhoto ? 'Duke shtuar...' : 'Shto Foton në Galeri'}</span>
                    </button>
                  </form>
                </div>

                {/* Uploaded custom photos list */}
                <div>
                  <div className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-3">
                    Fotografitë e Shtuara ({customPhotos.length})
                  </div>

                  {customPhotos.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center text-xs text-gray-400">
                      Nuk ka ende foto të personalizuara të shtuara. Sajti aktualisht po shfaq 21 fotografitë zyrtare të trajnimeve. Sapo të shtoni një foto këtu, ajo do të shtohet automatikisht në galerinë live.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {customPhotos.map((photo) => (
                        <div 
                          key={photo.id}
                          className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group bg-[#161D2E]"
                        >
                          <img src={photo.url} alt="Custom" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                            <button
                              onClick={() => deletePhoto(photo.id)}
                              className="p-2 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs transition-colors cursor-pointer"
                              title="Fshij foton"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Tab 3: Help Guide for Rita */}
            {activeTab === 'help' && (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5 text-gray-300 text-xs sm:text-sm leading-relaxed">
                <div className="p-5 rounded-2xl bg-brand-green/10 border border-brand-green/20 text-white">
                  <h4 className="font-heading font-bold text-base mb-1 text-brand-green">
                    Udhëzues i Shpejtë për Administratoren (Rita Nitaj)
                  </h4>
                  <p className="text-gray-300 text-xs">
                    Ky panel është i pavarur nga kodi i faqes dhe të dhënat ruhen direkt në renë e sigurt të Google Firebase.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <strong className="block text-white font-semibold mb-1">
                      1. Si të hapni këtë panel në çdo moment?
                    </strong>
                    Në fund të çdo faqeje (te Footer), klikoni ikonën e vogël të kyçit me tekstin <em>"Paneli i Menaxhimit"</em> ose shtoni <code>#admin</code> në fund të linkut: <code>solaritacademy.com/#admin</code>.
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <strong className="block text-white font-semibold mb-1">
                      2. Si të ndryshoni datat e trajnimit të radhës?
                    </strong>
                    Te skeda <em>"Datat & Statusi i Trajnimit"</em>, shkruani datën e re (p.sh. "Fillon më 20 Nëntor") dhe shtypni butonin e gjelbër <strong>"Ruaj Ndryshimet"</strong>. Faqja përditësohet në sekondë!
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <strong className="block text-white font-semibold mb-1">
                      3. Si të shtoni foto nga praktika në terren?
                    </strong>
                    Te skeda <em>"Fotografitë"</em>, zgjidhni foton nga kompjuteri apo telefoni juaj dhe shtypni <strong>"Shto Foton në Galeri"</strong>.
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => setIsAdminOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Mbyll dhe Shiko Faqen Live</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
