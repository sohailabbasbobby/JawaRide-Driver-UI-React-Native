import { View, Text, TouchableOpacity, Image } from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import {  X, Mail, User, Receipt, CreditCard, Calendar, Wallet, History, HelpCircle, HeadphonesIcon, Settings, BarChart  } from 'lucide-react-native';
import { useAppContext } from '../../contexts/AppContext';

export function SideDrawer() {
  const { isMenuOpen, setIsMenuOpen, setIsSettingsOpen, setIsEarningsSheetOpen, setOpenSheet } = useAppContext();

  const menuItems = [
    { icon: User, label: 'Profile & Documents', onClick: () => { setOpenSheet('profile'); setIsMenuOpen(false); } },
    { icon: Calendar, label: 'Custom Pricing', onClick: () => { setOpenSheet('fees'); setIsMenuOpen(false); } },
    { icon: CreditCard, label: 'JAWA Subscription', onClick: () => { setOpenSheet('fees'); setIsMenuOpen(false); } },
    { icon: BarChart, label: 'Performance & Taxes', onClick: () => { setIsEarningsSheetOpen(true); setIsMenuOpen(false); } },
    { icon: Mail, label: 'Inbox', isUnread: true, onClick: () => { setOpenSheet('mailbox'); setIsMenuOpen(false); } },
    { icon: History, label: 'Trip History', onClick: () => { setOpenSheet('history'); setIsMenuOpen(false); } },
    { icon: HelpCircle, label: 'FAQ', onClick: () => { setOpenSheet('faq'); setIsMenuOpen(false); } },
    { icon: HeadphonesIcon, label: 'Support', onClick: () => { setOpenSheet('support'); setIsMenuOpen(false); } },
    { icon: Settings, label: 'Settings', onClick: () => { setIsSettingsOpen(true); setIsMenuOpen(false); } },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <View
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[80]"
            onPress={() => setIsMenuOpen(false)}
          />
          
          <View
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-[340px] bg-white dark:bg-zinc-900 z-[80] flex flex-col shadow-2xl rounded-r-3xl"
          >
            {/* Header */}
            <View className="px-6 py-8 flex justify-between items-center border-b border-gray-100 dark:border-white/10 mt-4">
              <Text className="text-2xl font-bold text-black dark:text-white">Menu</Text>
              <TouchableOpacity 
                onPress={() => setIsMenuOpen(false)} 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </TouchableOpacity>
            </View>

            {/* Menu Items */}
            <View className="flex-1 overflow-y-auto py-2">
              {menuItems.map((item, i) => (
                <View 
                  key={i}
                  onPress={item.onClick}
                  className="flex items-center justify-between px-6 py-[18px] hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <View className="flex items-center gap-5">
                    <item.icon className="w-[22px] h-[22px] text-gray-600 dark:text-gray-400 stroke-[1.5]" />
                    <Text className="text-[17px] font-medium text-gray-800 dark:text-gray-200">{item.label}</Text>
                  </View>
                  {item.isUnread && (
                    <View className="w-2.5 h-2.5 bg-[#16c464] rounded-full shadow-[0_0_8px_rgba(22,196,100,0.4)]"></View>
                  )}
                </View>
              ))}
            </View>

            {/* Footer */}
            <View className="p-6 border-t border-gray-100 dark:border-white/10 text-center">
              <Text className="text-[13px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">Bob the App Builder | JAWATECH</Text>
            </View>
          </View>
        </>
      )}
    </AnimatePresence>
  );
}
