import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  collection, 
  addDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export interface SiteSettings {
  cohortStatusSq: string;
  cohortStatusEn: string;
  cohortTitleSq: string;
  cohortTitleEn: string;
  nextSessionDate: string;
  isOpen: boolean;
  heroVariant: 'classic' | 'aerial';
  heroAutoRotate?: boolean;
  customHeroUrl?: string;
  hiddenPhotoIds: string[];
  photoOverrides: Record<string, { titleSq?: string; titleEn?: string; url?: string }>;
  adminPassword?: string;
  announcementTextSq?: string;
  announcementTextEn?: string;
  announcementActive?: boolean;
}

export interface DynamicPhoto {
  id: string;
  url: string;
  titleSq?: string;
  titleEn?: string;
  order?: number;
}

interface SiteDataContextType {
  settings: SiteSettings;
  customPhotos: DynamicPhoto[];
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  currentUser: User | null;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (val: boolean) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  setHeroVariant: (variant: 'classic' | 'aerial') => Promise<void>;
  toggleHidePhoto: (photoId: string) => Promise<void>;
  updatePhotoCaption: (photoId: string, titleSq: string, titleEn: string) => Promise<void>;
  updateAdminPassword: (newPassword: string) => Promise<void>;
  addPhoto: (photo: { url: string; titleSq?: string; titleEn?: string }) => Promise<void>;
  deletePhoto: (photoId: string) => Promise<void>;
}

export const DEFAULT_STRONG_PASSWORD = 'Solarit!Admin2026#';

const defaultSettings: SiteSettings = {
  cohortStatusSq: 'STATUSI I REGJISTRIMIT // HAPUR',
  cohortStatusEn: 'ENROLLMENT STATUS // OPEN',
  cohortTitleSq: 'Grupi i radhës: Regjistrimet janë hapur',
  cohortTitleEn: 'Next cohort: Registration is now open',
  nextSessionDate: 'Grupi i radhës fillon së shpejti',
  isOpen: true,
  heroVariant: 'classic',
  heroAutoRotate: true,
  hiddenPhotoIds: [],
  photoOverrides: {},
  adminPassword: DEFAULT_STRONG_PASSWORD,
  announcementActive: false,
  announcementTextSq: '',
  announcementTextEn: ''
};

const getInitialSettings = (): SiteSettings => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('solarit_site_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultSettings,
          ...parsed,
          hiddenPhotoIds: parsed.hiddenPhotoIds || [],
          photoOverrides: parsed.photoOverrides || {},
          heroVariant: parsed.heroVariant || 'classic'
        };
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
  }
  return defaultSettings;
};

const getInitialCustomPhotos = (): DynamicPhoto[] => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('solarit_custom_photos');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
  }
  return [];
};

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(getInitialSettings);
  const [customPhotos, setCustomPhotos] = useState<DynamicPhoto[]>(getInitialCustomPhotos);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isPasscodeUnlocked, setIsPasscodeUnlocked] = useState(false);

  // Monitor Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Listen to hash changes for #admin
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Listen to Firestore real-time settings (syncs with cloud if online/available)
  useEffect(() => {
    try {
      const settingsRef = doc(db, 'settings', 'general');
      const unsub = onSnapshot(
        settingsRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const remote = docSnap.data() as Partial<SiteSettings>;
            setSettings((prev) => {
              const merged = {
                ...prev,
                ...remote,
                hiddenPhotoIds: remote.hiddenPhotoIds || prev.hiddenPhotoIds || [],
                photoOverrides: remote.photoOverrides || prev.photoOverrides || {},
                heroVariant: remote.heroVariant || prev.heroVariant || 'classic'
              };
              try {
                localStorage.setItem('solarit_site_settings', JSON.stringify(merged));
              } catch {
                // Ignore
              }
              return merged;
            });
          }
        },
        (error) => {
          console.warn('Realtime settings fallback active (operating with local state):', error.message);
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn('Firestore snapshot setup warning:', e);
    }
  }, []);

  // Listen to Firestore real-time custom gallery photos
  useEffect(() => {
    try {
      const galleryCol = collection(db, 'gallery');
      const unsub = onSnapshot(
        galleryCol,
        (snapshot) => {
          const photos: DynamicPhoto[] = [];
          snapshot.forEach((d) => {
            photos.push({ id: d.id, ...(d.data() as Omit<DynamicPhoto, 'id'>) });
          });
          if (photos.length > 0) {
            setCustomPhotos(photos);
            try {
              localStorage.setItem('solarit_custom_photos', JSON.stringify(photos));
            } catch {
              // Ignore
            }
          }
        },
        (error) => {
          console.warn('Gallery fallback active:', error.message);
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn('Firestore gallery snapshot setup warning:', e);
    }
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated: SiteSettings = { 
      ...settings, 
      ...newSettings, 
      updatedAt: new Date().toISOString() 
    } as SiteSettings;

    // 1. Immediately update React state (0ms latency, instant UI change)
    setSettings(updated);

    // 2. Persist to localStorage immediately
    try {
      localStorage.setItem('solarit_site_settings', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save warning:', e);
    }

    // 3. Attempt Firestore cloud sync in background
    try {
      await setDoc(doc(db, 'settings', 'general'), updated, { merge: true });
    } catch (err) {
      console.warn('Firestore cloud sync warning (operating with local state):', err);
    }
  };

  const setHeroVariant = async (variant: 'classic' | 'aerial') => {
    await updateSettings({ heroVariant: variant, customHeroUrl: '' });
  };

  const toggleHidePhoto = async (photoId: string) => {
    const currentHidden = settings.hiddenPhotoIds || [];
    const newHidden = currentHidden.includes(photoId)
      ? currentHidden.filter(id => id !== photoId)
      : [...currentHidden, photoId];
    await updateSettings({ hiddenPhotoIds: newHidden });
  };

  const updatePhotoCaption = async (photoId: string, titleSq: string, titleEn: string) => {
    const currentOverrides = settings.photoOverrides || {};
    const newOverrides = {
      ...currentOverrides,
      [photoId]: {
        ...(currentOverrides[photoId] || {}),
        titleSq,
        titleEn
      }
    };
    await updateSettings({ photoOverrides: newOverrides });
  };

  const updateAdminPassword = async (newPassword: string) => {
    await updateSettings({ adminPassword: newPassword });
  };

  const addPhoto = async (photo: { url: string; titleSq?: string; titleEn?: string }) => {
    const newEntry: DynamicPhoto = {
      id: `photo-${Date.now()}`,
      url: photo.url,
      titleSq: photo.titleSq,
      titleEn: photo.titleEn,
      order: customPhotos.length + 1
    };
    
    // Optimistic update
    const nextList = [newEntry, ...customPhotos];
    setCustomPhotos(nextList);
    try {
      localStorage.setItem('solarit_custom_photos', JSON.stringify(nextList));
    } catch {
      // Ignore
    }

    try {
      await addDoc(collection(db, 'gallery'), {
        ...photo,
        id: newEntry.id,
        createdAt: new Date().toISOString(),
        order: newEntry.order
      });
    } catch (err) {
      console.warn('Firestore add photo warning:', err);
    }
  };

  const deletePhoto = async (photoId: string) => {
    const nextList = customPhotos.filter(p => p.id !== photoId);
    setCustomPhotos(nextList);
    try {
      localStorage.setItem('solarit_custom_photos', JSON.stringify(nextList));
    } catch {
      // Ignore
    }

    try {
      await deleteDoc(doc(db, 'gallery', photoId));
    } catch (err) {
      console.warn('Firestore delete photo warning:', err);
    }
  };

  const isAdminAuthenticated = Boolean(currentUser) || isPasscodeUnlocked;

  return (
    <SiteDataContext.Provider
      value={{
        settings,
        customPhotos,
        isAdminOpen,
        setIsAdminOpen,
        currentUser,
        isAdminAuthenticated,
        setIsAdminAuthenticated: setIsPasscodeUnlocked,
        updateSettings,
        setHeroVariant,
        toggleHidePhoto,
        updatePhotoCaption,
        updateAdminPassword,
        addPhoto,
        deletePhoto
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
