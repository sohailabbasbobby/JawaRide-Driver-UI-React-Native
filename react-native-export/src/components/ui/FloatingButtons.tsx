import { View, Text, TouchableOpacity, Image } from 'react-native';
import {  Navigation, PoundSterling, Pause, Target, Shield, SlidersVertical  } from 'lucide-react-native';
import { useAppContext } from '../../contexts/AppContext';
import { vibrate } from '../../lib/haptics';

export function FloatingButtons() {
  const { status, setStatus, tripState, setTripState, setModal, setIsEarningsSheetOpen } = useAppContext();

  // Hidden during active trip sheets for less clutter
  if (tripState !== 'idle') return null;

  const btnClasses = "w-[52px] h-[52px] rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)] bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-md border border-white/40 dark:border-white/10 flex items-center justify-center pointer-events-auto active:scale-95 transition-all text-gray-800 dark:text-gray-200";

  return (
    <View className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40 pointer-events-none">
      
      {status === 'online' ? (
        <TouchableOpacity 
          onPress={() => { vibrate.medium(); setStatus('break'); }}
          className={btnClasses}
        >
          <Pause className="w-5 h-5 fill-current" strokeWidth={1} />
        </TouchableOpacity>
      ) : status === 'break' ? (
        <TouchableOpacity 
          onPress={() => { vibrate.medium(); setModal('end_break'); }}
          className={btnClasses}
        >
          <Pause className="w-5 h-5 text-[#fc4c4b]" strokeWidth={2} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          onPress={() => { vibrate.light(); }}
          className={btnClasses}
        >
          <SlidersVertical className="w-5 h-5" strokeWidth={2} />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => { vibrate.light(); setIsEarningsSheetOpen(true); }} className={btnClasses}>
        <PoundSterling className="w-5 h-5" strokeWidth={1.5} />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => vibrate.light()} className={btnClasses}>
        <Shield className="w-5 h-5" strokeWidth={1.5} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => vibrate.light()} className={btnClasses}>
        <Navigation className="w-5 h-5 -mx-0.5 -my-0.5 transform rotate-45" strokeWidth={1.5} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => vibrate.light()} className={btnClasses}>
        <Target className="w-[22px] h-[22px]" strokeWidth={1.5} />
      </TouchableOpacity>

      {/* Dev helper: "Simulate Trip" button placed on the left center */}
      {/* Portaling this out of the absolute container so it can be fixed on the left */}
    </View>
  );
}

export function FloatingButtonsLeft() {
  const { tripState, setTripState } = useAppContext();
  
  if (tripState !== 'idle') return null;

  return (
    <View className="fixed left-5 top-1/2 -translate-y-1/2 pointer-events-auto z-40">
      <TouchableOpacity 
        onPress={() => { vibrate.success(); setTripState('requesting'); }}
        className="px-5 py-3.5 bg-gradient-to-b from-black to-gray-900 dark:from-white dark:to-gray-200 dark:text-black text-white rounded-full text-[13px] font-bold tracking-widest uppercase shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.2)] dark:border dark:border-white/20 active:scale-95 transition-all"
      >
        Simulate Trip
      </TouchableOpacity>
    </View>
  );
}
