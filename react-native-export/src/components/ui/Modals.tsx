import { View, Text, TouchableOpacity, Image } from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../../contexts/AppContext';
import {  CheckCircle2, XCircle, MapPin, Navigation, Clock, Receipt, CreditCard, Star, Banknote  } from 'lucide-react-native';
import { vibrate } from '../../lib/haptics';
import { playSound } from '../../lib/sounds';

export function Modals() {
  const { modal, setModal, setStatus, tripState, setTripState } = useAppContext();

  return (
    <AnimatePresence>
      {(modal !== 'none' || tripState === 'summary' || tripState === 'cancelled') && (
        <View className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <View
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            onPress={() => {
              if (modal !== 'none') setModal('none');
            }}
          />
          
          <View
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="relative w-full max-w-sm bg-white dark:bg-[#1c1c1e] rounded-[28px] overflow-hidden shadow-2xl dark:border dark:border-white/20"
          >
            {modal === 'end_break' && (
               <View className="p-6 text-center">
                  <Text className="text-[22px] font-bold text-gray-900 dark:text-white mb-2 tracking-tight">End Break?</Text>
                  <Text className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed mb-6">
                    You will start receiving trip requests again.
                  </Text>
                  <View className="flex gap-3">
                    <TouchableOpacity onPress={() => { vibrate.light(); setModal('none'); }} className="flex-1 h-[52px] rounded-2xl bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold active:scale-[0.98] transition-transform">Cancel</TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => { vibrate.success(); setStatus('online'); setModal('none'); }} 
                      className="flex-1 h-[52px] rounded-2xl bg-gradient-to-b from-[#21c55e] to-[#16a34a] shadow-[0_4px_12px_rgba(33,197,94,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] text-white font-bold active:scale-[0.98] transition-transform"
                    >
                      End Break
                    </TouchableOpacity>
                  </View>
              </View>
            )}

            {modal === 'add_stop' && (
              <View className="p-6 text-center">
                  <Text className="text-[22px] font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Add Extra Stop</Text>
                  <Text className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed mb-6">
                    This will add a <strong>£1.00</strong> extra stop charge to the current trip fare.
                  </Text>
                  <View className="flex gap-3">
                    <TouchableOpacity onPress={() => { vibrate.light(); setModal('none'); }} className="flex-1 h-[52px] rounded-2xl bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold active:scale-[0.98] transition-transform">Cancel</TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => { vibrate.success(); setModal('none'); }} 
                      className="flex-1 h-[52px] rounded-2xl bg-gradient-to-b from-[#21c55e] to-[#16a34a] shadow-[0_4px_12px_rgba(33,197,94,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] text-white font-bold active:scale-[0.98] transition-transform"
                    >
                      Confirm
                    </TouchableOpacity>
                  </View>
              </View>
            )}

            {modal === 'end_trip' && (
               <View className="p-6 text-center">
                  <Text className="text-[22px] font-bold text-gray-900 dark:text-white mb-2 tracking-tight">End Trip?</Text>
                  <Text className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed mb-6">
                    Please confirm the rider has reached their destination.
                  </Text>
                  <View className="flex gap-3">
                    <TouchableOpacity onPress={() => { vibrate.light(); setModal('none'); }} className="flex-1 h-[52px] rounded-2xl bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold active:scale-[0.98] transition-transform">Cancel</TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => { vibrate.success(); setTripState('summary'); setModal('none'); }} 
                      className="flex-1 h-[52px] rounded-2xl bg-gradient-to-b from-[#fc4c4b] to-[#d63d3c] shadow-[0_4px_12px_rgba(252,76,75,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] text-white font-bold active:scale-[0.98] transition-transform"
                    >
                      End Trip
                    </TouchableOpacity>
                  </View>
              </View>
            )}

            {modal === 'payment_method' && (
               <View className="p-6 text-center">
                  <Text className="text-[22px] font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Payment Method</Text>
                  <Text className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed mb-6">
                    Change how the rider is paying for this trip.
                  </Text>
                  
                  <View className="space-y-3 mb-6">
                    <TouchableOpacity className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-[#16c464] bg-[#16c464]/5">
                      <View className="flex items-center gap-3">
                         <CreditCard className="w-6 h-6 text-[#16c464]" />
                         <Text className="font-bold text-gray-900 dark:text-white text-[16px]">Card (Stripe)</Text>
                      </View>
                      <CheckCircle2 className="w-5 h-5 text-[#16c464]" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-transparent bg-gray-50 dark:bg-zinc-800">
                      <View className="flex items-center gap-3">
                         <Banknote className="w-6 h-6 text-gray-500" />
                         <Text className="font-bold text-gray-900 dark:text-white text-[16px]">Cash</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View className="flex gap-3">
                    <TouchableOpacity onPress={() => { vibrate.light(); setModal('none'); }} className="flex-1 h-[52px] rounded-2xl bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold active:scale-[0.98] transition-transform">Cancel</TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => { vibrate.success(); setModal('none'); }} 
                      className="flex-1 h-[52px] rounded-2xl bg-gradient-to-b from-[#21c55e] to-[#16a34a] shadow-[0_4px_12px_rgba(33,197,94,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] text-white font-bold active:scale-[0.98] transition-transform"
                    >
                      Save
                    </TouchableOpacity>
                  </View>
              </View>
            )}

            {tripState === 'summary' && (
              <View className="p-6 text-center">
                  <View className="w-[50px] h-[50px] rounded-full mx-auto flex items-center justify-center mb-3 bg-[#16c464]/20 ring-4 ring-[#16c464]/10">
                     <CheckCircle2 className="w-7 h-7 text-[#16c464]" strokeWidth={3} />
                  </View>
                  <Text className="text-[18px] font-bold text-gray-900 dark:text-white tracking-tight mb-4">Trip Completed</Text>
                  
                  {/* Card Payment Simulation */}
                  <View className="bg-[#16c464] text-white p-4 rounded-[20px] mb-4 text-center">
                     <Text className="text-[13px] font-bold uppercase tracking-widest opacity-90 mb-1">Paid by Card</Text>
                     <Text className="text-[28px] font-extrabold leading-tight">No cash needed</Text>
                  </View>

                  {/* Summary Block */}
                  <View className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-[20px] mb-5 text-left border border-gray-100 dark:border-white/5">
                     <View className="flex justify-between items-center mb-2.5">
                       <Text className="text-gray-500 text-[13px] font-medium">Trip Detail</Text>
                       <Text className="text-gray-900 dark:text-white font-bold text-[14px]">4.2 mi • 15 min</Text>
                     </View>
                     <View className="flex justify-between items-center mb-2.5">
                       <Text className="text-gray-500 text-[13px] font-medium">Tolls</Text>
                       <Text className="text-gray-900 dark:text-white font-bold text-[14px]">0</Text>
                     </View>
                     <View className="flex justify-between items-center bg-[#16c464]/10 p-2.5 rounded-[12px] -mx-2.5">
                       <Text className="text-gray-700 dark:text-gray-300 text-[13px] font-bold">JAWA Fee</Text>
                       <Text className="text-[#16c464] font-bold text-[14px]">Weekly Pass Active</Text>
                     </View>
                  </View>

                  <Text className="text-[14px] font-bold text-gray-800 dark:text-gray-200 mb-2">Rate rider & check for forgotten items!</Text>
                  <View className="flex justify-center gap-1.5 mb-5 cursor-pointer">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-9 h-9 text-yellow-400 stroke-yellow-500 hover:text-yellow-500" strokeWidth={1.5} fill="currentColor" onPress={() => vibrate.light()} />
                    ))}
                  </View>

                  <TouchableOpacity 
                    onPress={() => { vibrate.success(); setTripState('idle'); }}
                    className="w-full h-[52px] rounded-2xl bg-gradient-to-b from-[#21c55e] to-[#16a34a] shadow-[0_4px_12px_rgba(33,197,94,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] text-white font-bold text-[17px] active:scale-[0.98] transition-transform"
                  >
                    Done
                  </TouchableOpacity>
              </View>
            )}

            {tripState === 'cancelled' && (
              <View className="p-6">
                <View className="text-center pt-2 mb-8">
                  <View className="w-[60px] h-[60px] rounded-full mx-auto flex items-center justify-center mb-4 bg-red-500/20 ring-4 ring-red-500/10">
                     <XCircle className="w-8 h-8 text-[#ef4444]" strokeWidth={2.5} />
                  </View>
                  <Text className="text-[20px] font-bold text-gray-900 dark:text-white tracking-tight">Trip Cancelled</Text>
                  <Text className="text-[13px] text-gray-500 mt-1">2:45 PM</Text>
                </View>

                <View className="h-[76px] rounded-[24px] border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex flex-col justify-center items-center gap-1 mb-4">
                  <Text className="text-[12px] text-gray-500">Reason</Text>
                  <Text className="text-[16px] font-bold text-gray-900 dark:text-white tracking-tight">Rider did not show</Text>
                </View>

                <View className="h-[100px] rounded-[24px] border border-[#16c464]/20 bg-[#16c464]/5 dark:bg-[#16c464]/10 flex flex-col justify-center items-center gap-1 mb-6">
                  <Text className="text-[12px] text-gray-500">No-Show Fee Charged</Text>
                  <Text className="text-[32px] font-bold text-[#16c464] tracking-tight leading-none mt-1">£5.00</Text>
                </View>

                <TouchableOpacity 
                  onPress={() => { vibrate.success(); setTripState('idle'); }}
                  className="w-full h-[52px] rounded-2xl bg-gradient-to-b from-[#21c55e] to-[#16a34a] shadow-[0_4px_12px_rgba(33,197,94,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] text-white font-bold text-[17px] active:scale-[0.98] transition-transform"
                >
                  Done
                </TouchableOpacity>
              </View>
            )}

          </View>
        </View>
      )}
    </AnimatePresence>
  );
}
