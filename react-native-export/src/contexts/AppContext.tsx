import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Status = 'online' | 'offline' | 'break';
export type TripState = 'idle' | 'requesting' | 'on_way' | 'waiting' | 'on_trip' | 'summary' | 'cancelled';
export type EarningsMode = 'today' | 'last_trip' | 'weekly';
export type Theme = 'light' | 'dark' | 'system';

export type SheetType = 'none' | 'mailbox' | 'profile' | 'fees' | 'bookings' | 'history' | 'faq' | 'support';

interface AppContextProps {
  status: Status;
  setStatus: (status: Status) => void;
  tripState: TripState;
  setTripState: (state: TripState) => void;
  earningsMode: EarningsMode;
  setEarningsMode: (mode: EarningsMode) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  openSheet: SheetType;
  setOpenSheet: (sheet: SheetType) => void;
  isEarningsVisible: boolean;
  setIsEarningsVisible: (visible: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  modal: 'none' | 'end_break' | 'end_trip' | 'add_stop' | 'payment_method';
  setModal: (modal: 'none' | 'end_break' | 'end_trip' | 'add_stop' | 'payment_method') => void;
  preferredMapsApp: 'waze' | 'google' | 'apple';
  setPreferredMapsApp: (app: 'waze' | 'google' | 'apple') => void;
  isEarningsSheetOpen: boolean;
  setIsEarningsSheetOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>('offline');
  const [tripState, setTripState] = useState<TripState>('idle');
  const [earningsMode, setEarningsMode] = useState<EarningsMode>('today');
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = "" /* AsyncStorage.getItem */('jawa_theme');
    return (saved as Theme) || 'light';
  });
  const [activeScreen, setActiveScreen] = useState('home');
  const [openSheet, setOpenSheet] = useState<SheetType>('none');
  const [isEarningsVisible, setIsEarningsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [modal, setModal] = useState<'none' | 'end_break' | 'end_trip' | 'add_stop' | 'payment_method'>('none');
  const [preferredMapsApp, setPreferredMapsApp] = useState<'waze' | 'google' | 'apple'>('waze');
  const [isEarningsSheetOpen, setIsEarningsSheetOpen] = useState(false);

  useEffect(() => {
    /* AsyncStorage.setItem */('jawa_theme', theme);
    // Theme application
    let resolvedTheme = theme;
    if (theme === 'system') {
      resolvedTheme = (() => ({ matches: false }))('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    if (resolvedTheme === 'dark') {
      ({ classList: { add: ()=>{}, remove: ()=>{} } }).classList.add('dark');
    } else {
      ({ classList: { add: ()=>{}, remove: ()=>{} } }).classList.remove('dark');
    }
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        status,
        setStatus,
        tripState,
        setTripState,
        earningsMode,
        setEarningsMode,
        theme,
        setTheme,
        activeScreen,
        setActiveScreen,
        openSheet,
        setOpenSheet,
        isEarningsVisible,
        setIsEarningsVisible,
        isMenuOpen,
        setIsMenuOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        modal,
        setModal,
        preferredMapsApp,
        setPreferredMapsApp,
        isEarningsSheetOpen,
        setIsEarningsSheetOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
