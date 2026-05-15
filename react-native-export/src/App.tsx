import { View, Text, TouchableOpacity, Image } from 'react-native';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { AppProvider } from './contexts/AppContext';
import { TopBar } from './components/ui/TopBar';
import { FloatingButtons, FloatingButtonsLeft } from './components/ui/FloatingButtons';
import { SideDrawer } from './components/ui/SideDrawer';
import { SettingsDrawer } from './components/ui/SettingsDrawer';
import { HomeSheet } from './components/screens/HomeSheet';
import { ActiveTripSheet } from './components/screens/ActiveTripSheet';
import { EarningsSheet } from './components/screens/EarningsSheet';
import { Modals } from './components/ui/Modals';
import { Sheets } from './components/ui/Sheets';
import { MapBackground } from './components/ui/MapBackground';

export default function App() {
  return (
    <AppProvider>
      <View className="relative w-full h-[100dvh] bg-[#f8f9fa] dark:bg-[#121212] overflow-hidden text-[var(--text-primary)] font-sans">
        {/* Map Background */}
        <MapBackground />

        {/* Global UI Components */}
        <TopBar />
        <FloatingButtons />
        <FloatingButtonsLeft />
        <SideDrawer />
        <SettingsDrawer />
        <Modals />
        <Sheets />

        {/* State-driven Bottom Sheets */}
        <HomeSheet />
        <ActiveTripSheet />
        <EarningsSheet />
      </View>
    </AppProvider>
  );
}

