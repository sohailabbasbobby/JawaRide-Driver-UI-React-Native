import { View, Text, TouchableOpacity, Image } from 'react-native';
import {  Menu, Eye, EyeOff, Check, Clock, TrendingUp  } from 'lucide-react-native';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../../contexts/AppContext';
import { useState, useRef, useEffect } from 'react';
import { vibrate } from '../../lib/haptics';

export function TopBar() {
  const { status, setStatus, setIsMenuOpen, isEarningsVisible, setIsEarningsVisible, setIsEarningsSheetOpen } = useAppContext();
  const [isEarningsDropdownOpen, setIsEarningsDropdownOpen] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);

  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-[#16c464]';
      case 'offline': return 'bg-[#fc4c4b]';
      case 'break': return 'bg-[#fbb923]';
      default: return 'bg-gray-400';
    }
  };

  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isEarningsDropdownOpen && pillRef.current && !pillRef.current.contains(e.target as Node)) {
        setIsEarningsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isEarningsDropdownOpen]);

  return (
    <View className="absolute top-0 left-0 right-0 z-40 px-5 py-12 pointer-events-none">
      <View className="flex justify-between items-start">
        
        {/* Menu Button */}
        <TouchableOpacity 
          onPress={() => setIsMenuOpen(true)}
          className="w-12 h-12 rounded-full bg-white dark:bg-[#1c1c1e] shadow-lg flex items-center justify-center pointer-events-auto active:scale-95 transition-transform"
        >
          <Menu className="w-5 h-5 text-gray-800 dark:text-white" />
        </TouchableOpacity>

        {/* Trip Stats Pill & Dropdown */}
        <View className="relative pointer-events-auto" ref={pillRef}>
          <View 
            onPress={() => setIsEarningsDropdownOpen(!isEarningsDropdownOpen)}
            className="h-12 bg-white dark:bg-[#1c1c1e] rounded-[24px] flex items-center px-4 gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.06)] cursor-pointer select-none active:scale-95 transition-transform border border-gray-100 dark:border-white/5"
          >
            <Text className="font-extrabold text-[17px] tracking-tight text-[#16a34a]">
              {isEarningsVisible ? '£212.40' : '£ •••'}
            </Text>
            <TouchableOpacity 
              onPress={(e) => {
                e.stopPropagation();
                setIsEarningsVisible(!isEarningsVisible);
                vibrate.light();
              }}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors ml-1"
            >
              {isEarningsVisible ? <Eye className="w-4 h-4" strokeWidth={2.5} /> : <EyeOff className="w-4 h-4" strokeWidth={2.5} />}
            </TouchableOpacity>
          </View>

          {/* Stats Dropdown Overlay */}
          <AnimatePresence>
            {isEarningsDropdownOpen && (
              <View
                key="earnings-dropdown"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[280px] z-[60] pointer-events-auto"
              >
                {/* Arrow pointing to pill */}
                <View className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-[#1c1c1e] rotate-45 border-l border-t border-gray-100 dark:border-white/10 z-10" />

                <View className="bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-[24px] shadow-2xl pt-3 overflow-hidden">
                  {/* Dot Indicators */}
                  <View className="flex justify-center gap-1.5 mb-2 relative z-10">
                    <View className={`w-1.5 h-1.5 rounded-full transition-colors ${activeCard === 0 ? 'bg-black dark:bg-white' : 'bg-black/20 dark:bg-white/30'}`}></View>
                    <View className={`w-1.5 h-1.5 rounded-full transition-colors ${activeCard === 1 ? 'bg-black dark:bg-white' : 'bg-black/20 dark:bg-white/30'}`}></View>
                    <View className={`w-1.5 h-1.5 rounded-full transition-colors ${activeCard === 2 ? 'bg-black dark:bg-white' : 'bg-black/20 dark:bg-white/30'}`}></View>
                  </View>

                  <View 
                    className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4 pt-1 px-[65px] items-stretch w-full scroll-smooth" 
                    style={{ touchAction: 'pan-x' }}
                    onScroll={(e) => {
                      const scrollLeft = e.currentTarget.scrollLeft;
                      const card = Math.round(scrollLeft / (150 + 16)); // 150px card + 16px gap
                      if (card >= 0 && card < 3) {
                        setActiveCard(card);
                      }
                    }}
                  >
                     {/* Card 1 */}
                     <View 
                       className="snap-center shrink-0 w-[150px] bg-white dark:bg-[#2c2c2e] p-4 rounded-[20px] shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-100 dark:border-white/10 cursor-pointer active:scale-95 transition-transform flex flex-col items-center text-center relative"
                       onPress={() => { setIsEarningsSheetOpen(true); setIsEarningsDropdownOpen(false); }}
                     >
                       <Text className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Today's Income</Text>
                       <View className="mb-2">
                         <Text className="text-[26px] font-extrabold text-[#16c464] leading-none mb-0.5 tracking-tight">£212.40</Text>
                         <Text className="text-[10px] font-bold text-gray-400">8 Trips • 4h 12m</Text>
                       </View>
                       <View className="w-full bg-gray-100 dark:bg-black/30 h-1.5 rounded-full overflow-hidden mt-1 mx-auto">
                         <View className="bg-[#16c464] h-full" style={{ width: '70%' }}></View>
                       </View>
                     </View>
                     
                     {/* Card 2 */}
                     <View 
                       className="snap-center shrink-0 w-[150px] bg-white dark:bg-[#2c2c2e] p-4 rounded-[20px] shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-100 dark:border-white/10 cursor-pointer active:scale-95 transition-transform flex flex-col items-center text-center relative"
                       onPress={() => { setIsEarningsSheetOpen(true); setIsEarningsDropdownOpen(false); }}
                     >
                       <Text className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Last Trip</Text>
                       <View className="mb-2">
                         <Text className="text-[26px] font-extrabold text-gray-900 dark:text-white leading-none mb-0.5 tracking-tight">£18.50</Text>
                         <Text className="text-[10px] font-bold text-gray-400">12 mins ago</Text>
                       </View>
                       <View className="flex flex-col items-center mt-1">
                         <Clock className="w-3.5 h-3.5 text-gray-400 mb-0.5" />
                         <Text className="text-[10px] font-medium text-gray-500">Waterloo → London Eye</Text>
                       </View>
                     </View>
                     
                     {/* Card 3 */}
                     <View 
                       className="snap-center shrink-0 w-[150px] bg-white dark:bg-[#2c2c2e] p-4 rounded-[20px] shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-100 dark:border-white/10 cursor-pointer active:scale-95 transition-transform flex flex-col items-center text-center relative"
                       onPress={() => { setIsEarningsSheetOpen(true); setIsEarningsDropdownOpen(false); }}
                     >
                       <Text className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Weekly Total</Text>
                       <View className="mb-2">
                         <Text className="text-[26px] font-extrabold text-[#16c464] leading-none mb-0.5 tracking-tight">£652.00</Text>
                         <Text className="text-[10px] font-bold text-gray-400">48 Trips • Mon - Sun</Text>
                       </View>
                       <View className="flex flex-col items-center mt-1">
                         <TrendingUp className="w-3.5 h-3.5 text-[#16c464] mb-0.5" />
                         <Text className="text-[10px] font-bold text-[#16c464]">+12% vs last week</Text>
                       </View>
                     </View>
                  </View>
                </View>
              </View>
            )}
          </AnimatePresence>
        </View>

        {/* Status Indicator / Off Button */}
        <View className="relative pointer-events-auto flex items-center justify-center pt-2">
          <TouchableOpacity 
            onPress={() => {
              if (status === 'online') {
                // Show typical offline confirmation/break modal
                // In this prototype we'll just go offline immediately or via a quick toggle
                setStatus('offline');
                vibrate.medium();
              }
            }}
            className="p-3 flex items-center justify-center active:scale-95 transition-transform"
          >
            <View className="relative flex h-[16px] w-[16px]">
               <Text className={`animate-ping absolute inline-flex h-full w-full rounded-full ${getStatusColor()} opacity-50`}></Text>
               <Text className={`relative inline-flex rounded-full h-[16px] w-[16px] ${getStatusColor()}`}></Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>

      <AnimatePresence>
        {isEarningsDropdownOpen && (
          <View
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent z-30 pointer-events-auto"
            onPress={() => setIsEarningsDropdownOpen(false)}
          />
        )}
      </AnimatePresence>
    </View>
  );
}
