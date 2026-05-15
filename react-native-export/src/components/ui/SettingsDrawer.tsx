import { View, Text, TouchableOpacity, Image } from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import {  X, Navigation  } from 'lucide-react-native';
import { useAppContext } from '../../contexts/AppContext';
import { vibrate } from '../../lib/haptics';

export function SettingsDrawer() {
  const { isSettingsOpen, setIsSettingsOpen, theme, setTheme, preferredMapsApp, setPreferredMapsApp } = useAppContext();

  return (
    <AnimatePresence>
      {isSettingsOpen && (
        <>
          <View
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[80]"
            onPress={() => setIsSettingsOpen(false)}
          />
          
          <View
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed left-0 top-0 bottom-0 w-[90vw] max-w-[380px] bg-white dark:bg-zinc-900 z-[80] flex flex-col shadow-2xl rounded-r-3xl overflow-hidden"
          >
            {/* Header */}
            <View className="px-6 py-8 flex justify-between items-center border-b border-gray-100 dark:border-white/10 mt-4 shrink-0">
              <Text className="text-2xl font-bold text-black dark:text-white">Settings</Text>
              <TouchableOpacity 
                onPress={() => setIsSettingsOpen(false)} 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View className="flex-1 overflow-y-auto px-6 py-6 pb-20 space-y-8">
              
              {/* APPEARANCE */}
              <View>
                <Text className="text-[13px] font-bold text-gray-500 tracking-widest uppercase mb-4">Appearance</Text>
                <View className="bg-white dark:bg-zinc-800 border border-gray-100 dark:border-white/5 rounded-[24px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] dark:shadow-none">
                  <View className="flex items-center gap-4 mb-5">
                    <View className="w-[42px] h-[42px] rounded-full bg-gray-50 dark:bg-white/10 flex items-center justify-center">
                      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                        <circle cx="12" cy="12" r="4" />
                        <Textath d="M12 2v2" />
                        <Textath d="M12 20v2" />
                        <Textath d="M4.93 4.93l1.41 1.41" />
                        <Textath d="M17.66 17.66l1.41 1.41" />
                        <Textath d="M2 12h2" />
                        <Textath d="M20 12h2" />
                        <Textath d="M4.93 19.07l1.41-1.41" />
                        <Textath d="M17.66 6.34l1.41-1.41" />
                      </Svg>
                    </View>
                    <Text className="text-[17px] font-medium text-gray-900 dark:text-white">Theme</Text>
                  </View>

                  <View className="flex gap-2">
                    <TouchableOpacity 
                      onPress={() => setTheme('dark')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium transition-colors ${theme === 'dark' ? 'bg-[#dcfce7] text-[#16c464] border border-[#bbf7d0]' : 'bg-gray-50 text-gray-700 dark:bg-white/5 dark:text-gray-300 border border-transparent'}`}
                    >
                      <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <Textath d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </Svg>
                      Dark
                    </TouchableOpacity>
                    <TouchableOpacity 
                       onPress={() => setTheme('light')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium transition-colors ${theme === 'light' ? 'bg-[#dcfce7] text-[#16c464] border border-[#bbf7d0]' : 'bg-gray-50 text-gray-700 dark:bg-white/5 dark:text-gray-300 border border-transparent'}`}
                    >
                      <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4" />
                        <Textath d="M12 2v2" />
                        <Textath d="M12 20v2" />
                        <Textath d="M4.93 4.93l1.41 1.41" />
                        <Textath d="M17.66 17.66l1.41 1.41" />
                      </Svg>
                      Light
                    </TouchableOpacity>
                    <TouchableOpacity 
                       onPress={() => setTheme('system')}
                      className={`flex-1 flex items-center justify-center py-3 rounded-full text-sm font-medium transition-colors ${theme === 'system' ? 'bg-[#dcfce7] text-[#16c464] border border-[#bbf7d0]' : 'bg-gray-50 text-gray-700 dark:bg-white/5 dark:text-gray-300 border border-transparent'}`}
                    >
                      System
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* SECURITY */}
              <View>
                <Text className="text-[13px] font-bold text-gray-500 tracking-widest uppercase mb-4">Security</Text>
                <View className="bg-white dark:bg-zinc-800 border border-gray-100 dark:border-white/5 rounded-[24px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] dark:shadow-none flex items-center justify-between">
                  <View className="flex items-center gap-4">
                    <View className="w-[42px] h-[42px] rounded-full bg-gray-50 dark:bg-white/10 flex items-center justify-center">
                      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                        <Textath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                        <Textath d="M9.5 9c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5"/>
                        <Textath d="M6.5 15.2c.4-1.8 3.2-3.2 5.5-3.2s5.1 1.4 5.5 3.2"/>
                      </Svg>
                    </View>
                    <View>
                      <Text className="block text-[17px] font-medium text-gray-900 dark:text-white">Biometrics</Text>
                      <Text className="block text-[14px] text-gray-500">Face ID / Touch ID</Text>
                    </View>
                  </View>
                  
                  {/* Toggle */}
                  <View 
                    onPress={() => vibrate.light()}
                    className="w-[50px] shrink-0 h-8 p-1 rounded-full cursor-pointer transition-colors bg-[#16c464]"
                  >
                    <View 
                      layout
                      className="w-6 h-6 bg-white rounded-full shadow-md ml-auto"
                    />
                  </View>
                </View>
              </View>

              {/* NAVIGATION */}
              <View>
                <Text className="text-[13px] font-bold text-gray-500 tracking-widest uppercase mb-4">Navigation</Text>
                <View className="bg-white dark:bg-zinc-800 border border-gray-100 dark:border-white/5 rounded-[24px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] dark:shadow-none">
                  <View className="flex items-center gap-4 mb-5">
                    <View className="w-[42px] h-[42px] rounded-full bg-gray-50 dark:bg-white/10 flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </View>
                    <Text className="text-[17px] font-medium text-gray-900 dark:text-white">Preferred Maps App</Text>
                  </View>

                  <View className="flex gap-2">
                    <TouchableOpacity 
                      onPress={() => { vibrate.light(); setPreferredMapsApp('google'); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium transition-all ${preferredMapsApp === 'google' ? 'bg-[#dcfce7] text-[#16c464] border border-[#bbf7d0]' : 'bg-gray-50 text-gray-700 dark:bg-white/5 dark:text-gray-300 border border-transparent'}`}
                    >
                      Google
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => { vibrate.light(); setPreferredMapsApp('waze'); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium transition-all ${preferredMapsApp === 'waze' ? 'bg-[#dcfce7] text-[#16c464] border border-[#bbf7d0]' : 'bg-gray-50 text-gray-700 dark:bg-white/5 dark:text-gray-300 border border-transparent'}`}
                    >
                      Waze
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => { vibrate.light(); setPreferredMapsApp('apple'); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium transition-all ${preferredMapsApp === 'apple' ? 'bg-[#dcfce7] text-[#16c464] border border-[#bbf7d0]' : 'bg-gray-50 text-gray-700 dark:bg-white/5 dark:text-gray-300 border border-transparent'}`}
                    >
                      Apple
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </View>
          </View>
        </>
      )}
    </AnimatePresence>
  );
}
