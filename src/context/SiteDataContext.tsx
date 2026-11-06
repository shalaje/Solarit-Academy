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
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export interface SiteSettings {
  cohortStatusSq: string;
  cohortStatusEn: string;
  cohortTitleSq: string;
  cohortTitleEn: string;
  nextSessionDate: string;
  isOpen: boolean;
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
  addPhoto: (photo: { url: string; titleSq?: string; titleEn?: string }) => Promise<void>;
  deletePhoto: (photoId: string) => Promise<void>;
}

const defaultSettings: SiteSettings = {
  cohortStatusSq: 'STATUSI I REGJISTRIMIT // HAPUR',
  cohortStatusEn: 'ENROLLMENT STATUS // OPEN',
  cohortTitleSq: 'Grupi i radhës: Regjistrimet janë hapur',
  cohortTitleEn: 'Next cohort: Registration is now open',
  nextSessionDate: 'Grupi i radhës fillon së shpejti',
  isOpen: true,
  announcementActive: false,
  announcementTextSq: '',
  announcementTextEn: ''
};

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [customPhotos, setCustomPhotos] = useState<DynamicPhoto[]>([]);
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

  // Listen to Firestore real-time settings
  useEffect(() => {
    const settingsRef = doc(db, 'settings', 'general');
    const unsub = onSnapshot(
      settingsRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setSettings({ ...defaultSettings, ...(docSnap.data() as SiteSettings) });
        }
      },
      (error) => {
        // Fallback silently to defaults if offline or rules pending
        console.warn('Realtime settings fallback active:', error.message);
      }
    );
    return () => unsub();
  }, []);

  // Listen to Firestore real-time custom gallery photos
  useEffect(() => {
    const galleryCol = collection(db, 'gallery');
    const unsub = onSnapshot(
      galleryCol,
      (snapshot) => {
        const photos: DynamicPhoto[] = [];
        snapshot.forEach((d) => {
          photos.push({ id: d.id, ...(d.data() as Omit<DynamicPhoto, 'id'>) });
        });
        setCustomPhotos(photos);
      },
      (error) => {
        console.warn('Gallery fallback active:', error.message);
      }
    );
    return () => unsub();
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings, updatedAt: new Date().toISOString() };
    try {
      await setDoc(doc(db, 'settings', 'general'), updated, { merge: true });
      setSettings(updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'settings/general');
    }
  };

  const addPhoto = async (photo: { url: string; titleSq?: string; titleEn?: string }) => {
    try {
      await addDoc(collection(db, 'gallery'), {
        ...photo,
        id: `photo-${Date.now()}`,
        createdAt: new Date().toISOString(),
        order: customPhotos.length + 1
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'gallery');
    }
  };

  const deletePhoto = async (photoId: string) => {
    try {
      await deleteDoc(doc(db, 'gallery', photoId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `gallery/${photoId}`);
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
