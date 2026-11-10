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
  notificationEmail?: string;
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

export interface CandidateApplication {
  id: string;
  name: string;
  contact: string;
  program: string;
  message?: string;
  createdAt: string;
  status?: 'new' | 'contacted' | 'enrolled';
}

interface SiteDataContextType {
  settings: SiteSettings;
  customPhotos: DynamicPhoto[];
  applications: CandidateApplication[];
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
  addApplication: (app: { name: string; contact: string; program: string; message?: string }) => Promise<void>;
  updateApplicationStatus: (id: string, status: 'new' | 'contacted' | 'enrolled') => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
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
  notificationEmail: 'shalaje60@gmail.com',
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
        if (parsed && typeof parsed === 'object') {
          return {
            ...defaultSettings,
            ...parsed,
            hiddenPhotoIds: Array.isArray(parsed.hiddenPhotoIds) ? parsed.hiddenPhotoIds : [],
            photoOverrides: (parsed.photoOverrides && typeof parsed.photoOverrides === 'object') ? parsed.photoOverrides : {},
            heroVariant: parsed.heroVariant === 'aerial' ? 'aerial' : 'classic',
            heroAutoRotate: parsed.heroAutoRotate !== false,
            isOpen: parsed.isOpen !== false,
            notificationEmail: parsed.notificationEmail || defaultSettings.notificationEmail,
            cohortTitleSq: parsed.cohortTitleSq || defaultSettings.cohortTitleSq,
            cohortTitleEn: parsed.cohortTitleEn || defaultSettings.cohortTitleEn,
            cohortStatusSq: parsed.cohortStatusSq || defaultSettings.cohortStatusSq,
            cohortStatusEn: parsed.cohortStatusEn || defaultSettings.cohortStatusEn,
            nextSessionDate: parsed.nextSessionDate || defaultSettings.nextSessionDate,
            adminPassword: parsed.adminPassword || DEFAULT_STRONG_PASSWORD
          };
        }
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
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(Boolean).map((p, idx) => ({
            id: p.id || `photo-${idx}`,
            url: p.url || '',
            titleSq: p.titleSq || '',
            titleEn: p.titleEn || '',
            order: typeof p.order === 'number' ? p.order : idx
          }));
        }
      }
    } catch {
      // Ignore
    }
  }
  return [];
};

const getInitialApplications = (): CandidateApplication[] => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('solarit_candidate_applications');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(Boolean).map((a, idx) => ({
            id: a.id || `app-${idx}`,
            name: String(a.name || 'Kandidat'),
            contact: String(a.contact || ''),
            program: String(a.program || 'Trajnim Solar'),
            message: a.message ? String(a.message) : '',
            createdAt: typeof a.createdAt === 'string' ? a.createdAt : new Date().toISOString(),
            status: a.status === 'contacted' || a.status === 'enrolled' ? a.status : 'new'
          }));
        }
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
  const [applications, setApplications] = useState<CandidateApplication[]>(getInitialApplications);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [isPasscodeUnlocked, setIsPasscodeUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('solarit_admin_unlocked') === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  const setAdminAuthenticated = (val: boolean) => {
    setIsPasscodeUnlocked(val);
    if (typeof window !== 'undefined') {
      try {
        if (val) {
          sessionStorage.setItem('solarit_admin_unlocked', 'true');
        } else {
          sessionStorage.removeItem('solarit_admin_unlocked');
        }
      } catch {
        // Ignore
      }
    }
  };

  // Monitor Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Listen to hash and pathname changes for #admin, /admin, #cms, /cms
  useEffect(() => {
    const handleUrl = () => {
      if (typeof window === 'undefined') return;
      const hash = (window.location.hash || '').toLowerCase();
      const path = (window.location.pathname || '').toLowerCase();
      if (
        hash === '#admin' || 
        hash.startsWith('#admin') || 
        hash === '#cms' || 
        path === '/admin' || 
        path === '/admin/' || 
        path === '/cms' || 
        path === '/cms/'
      ) {
        setIsAdminOpen(true);
      }
    };
    handleUrl();
    window.addEventListener('hashchange', handleUrl);
    window.addEventListener('popstate', handleUrl);
    return () => {
      window.removeEventListener('hashchange', handleUrl);
      window.removeEventListener('popstate', handleUrl);
    };
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
              const merged: SiteSettings = {
                ...prev,
                ...remote,
                hiddenPhotoIds: Array.isArray(remote.hiddenPhotoIds) 
                  ? remote.hiddenPhotoIds 
                  : (Array.isArray(prev.hiddenPhotoIds) ? prev.hiddenPhotoIds : []),
                photoOverrides: (remote.photoOverrides && typeof remote.photoOverrides === 'object') 
                  ? remote.photoOverrides 
                  : (prev.photoOverrides || {}),
                heroVariant: remote.heroVariant === 'aerial' ? 'aerial' : 'classic',
                heroAutoRotate: remote.heroAutoRotate !== false,
                isOpen: remote.isOpen !== false,
                notificationEmail: remote.notificationEmail || prev.notificationEmail || defaultSettings.notificationEmail,
                adminPassword: remote.adminPassword || prev.adminPassword || DEFAULT_STRONG_PASSWORD
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

  // Listen to Firestore real-time applications
  useEffect(() => {
    try {
      const appsCol = collection(db, 'applications');
      const unsub = onSnapshot(
        appsCol,
        (snapshot) => {
          const appsList: CandidateApplication[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            if (data && typeof data === 'object') {
              let parsedCreatedAt = new Date().toISOString();
              try {
                if (typeof data.createdAt === 'string') {
                  parsedCreatedAt = data.createdAt;
                } else if (data.createdAt && typeof data.createdAt === 'object' && 'seconds' in data.createdAt) {
                  parsedCreatedAt = new Date(data.createdAt.seconds * 1000).toISOString();
                }
              } catch {
                parsedCreatedAt = new Date().toISOString();
              }

              appsList.push({
                id: d.id,
                name: String(data.name || 'Kandidat'),
                contact: String(data.contact || ''),
                program: String(data.program || 'Trajnim Solar'),
                message: data.message ? String(data.message) : '',
                createdAt: parsedCreatedAt,
                status: (data.status === 'contacted' || data.status === 'enrolled') ? data.status : 'new'
              });
            }
          });
          if (appsList.length > 0) {
            appsList.sort((a, b) => {
              const timeA = new Date(a.createdAt).getTime() || 0;
              const timeB = new Date(b.createdAt).getTime() || 0;
              return timeB - timeA;
            });
            setApplications(appsList);
            try {
              localStorage.setItem('solarit_candidate_applications', JSON.stringify(appsList));
            } catch {
              // Ignore
            }
          }
        },
        (error) => {
          console.warn('Applications snapshot fallback active:', error.message);
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn('Firestore applications snapshot setup warning:', e);
    }
  }, []);

  const addApplication = async (app: { name: string; contact: string; program: string; message?: string }) => {
    const newEntry: CandidateApplication = {
      id: `app-${Date.now()}`,
      name: app.name,
      contact: app.contact,
      program: app.program,
      message: app.message,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    const nextList = [newEntry, ...applications];
    setApplications(nextList);
    try {
      localStorage.setItem('solarit_candidate_applications', JSON.stringify(nextList));
    } catch {
      // Ignore
    }

    try {
      await addDoc(collection(db, 'applications'), newEntry);
    } catch (err) {
      console.warn('Firestore add application warning:', err);
    }
  };

  const updateApplicationStatus = async (id: string, status: 'new' | 'contacted' | 'enrolled') => {
    const nextList = applications.map(a => a.id === id ? { ...a, status } : a);
    setApplications(nextList);
    try {
      localStorage.setItem('solarit_candidate_applications', JSON.stringify(nextList));
    } catch {
      // Ignore
    }

    try {
      await setDoc(doc(db, 'applications', id), { status }, { merge: true });
    } catch (err) {
      console.warn('Firestore update application status warning:', err);
    }
  };

  const deleteApplication = async (id: string) => {
    const nextList = applications.filter(a => a.id !== id);
    setApplications(nextList);
    try {
      localStorage.setItem('solarit_candidate_applications', JSON.stringify(nextList));
    } catch {
      // Ignore
    }

    try {
      await deleteDoc(doc(db, 'applications', id));
    } catch (err) {
      console.warn('Firestore delete application warning:', err);
    }
  };

  const isAdminAuthenticated = Boolean(currentUser) || isPasscodeUnlocked;

  return (
    <SiteDataContext.Provider
      value={{
        settings,
        customPhotos,
        applications,
        isAdminOpen,
        setIsAdminOpen,
        currentUser,
        isAdminAuthenticated,
        setIsAdminAuthenticated: setAdminAuthenticated,
        updateSettings,
        setHeroVariant,
        toggleHidePhoto,
        updatePhotoCaption,
        updateAdminPassword,
        addPhoto,
        deletePhoto,
        addApplication,
        updateApplicationStatus,
        deleteApplication
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
