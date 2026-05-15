import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'motion/react';
import {  ChevronRight, Check  } from 'lucide-react-native';
import { vibrate } from '../../lib/haptics';

interface JawaSlideActionProps {
  label: string;
  onComplete: () => void;
  resetOnComplete?: boolean;
  knobColor?: 'green' | 'red' | 'yellow';
  trackColor?: string; // class
  key?: React.Key;
}

export const JawaSlideAction: React.FC<JawaSlideActionProps> = ({ label, onComplete, resetOnComplete = false, knobColor = 'green', trackColor }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useRef(0);
  const knobWidth = 60; 
  const padding = 6; 
  
  const x = useMotionValue(0);
  const controls = useAnimation();
  
  const textOpacity = useTransform(x, [0, 100], [1, 0]);

  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current = containerRef.current.offsetWidth;
    }
  }, []);

  const handleDragEnd = async (event: any, info: any) => {
    const maxX = containerWidth.current - knobWidth - padding * 2;
    if (info.offset.x > maxX * 0.9) {
      vibrate.success();
      setIsCompleted(true);
      await controls.start({ x: maxX, transition: { type: 'spring', bounce: 0, duration: 0.2 } });
      onComplete();
      
      if (resetOnComplete) {
        setTimeout(() => {
          setIsCompleted(false);
          controls.start({ x: 0, transition: { type: 'spring', bounce: 0.3, duration: 0.5 } });
        }, 1000);
      }
    } else {
      vibrate.light();
      controls.start({ x: 0, transition: { type: 'spring', bounce: 0.3, duration: 0.5 } });
    }
  };

  const getKnobClass = () => {
    if (knobColor === 'red') return 'bg-gradient-to-b from-[#ff6b6b] to-[#dc2626] shadow-[0_4px_12px_rgba(220,38,38,0.5),inset_0_2px_4px_rgba(255,255,255,0.4),0_0_10px_rgba(255,107,107,0.8)] text-white border border-[#b91c1c]';
    if (knobColor === 'yellow') return 'bg-gradient-to-b from-[#fcd34d] to-[#d97706] shadow-[0_4px_12px_rgba(217,119,6,0.5),inset_0_2px_4px_rgba(255,255,255,0.4),0_0_10px_rgba(252,211,77,0.8)] text-white border border-[#b45309]';
    return 'bg-gradient-to-b from-[#4ade80] to-[#16a34a] shadow-[0_4px_12px_rgba(22,163,74,0.5),inset_0_2px_4px_rgba(255,255,255,0.4),0_0_10px_rgba(74,222,128,0.8)] text-white border border-[#15803d]';
  };

  const getHousingClass = () => {
    let neon = '';
    if (knobColor === 'red') neon = 'ring-2 ring-offset-2 ring-offset-gray-50/50 dark:ring-offset-zinc-900/50 ring-[#fc4c4b]/50 shadow-[0_0_15px_rgba(252,76,75,0.3),inset_0_4px_10px_rgba(0,0,0,0.15)] dark:shadow-[0_0_15px_rgba(252,76,75,0.4),inset_0_4px_10px_rgba(0,0,0,0.6)]';
    else if (knobColor === 'yellow') neon = 'ring-2 ring-offset-2 ring-offset-gray-50/50 dark:ring-offset-zinc-900/50 ring-[#fbb923]/50 shadow-[0_0_15px_rgba(251,185,35,0.3),inset_0_4px_10px_rgba(0,0,0,0.15)] dark:shadow-[0_0_15px_rgba(251,185,35,0.4),inset_0_4px_10px_rgba(0,0,0,0.6)]';
    else neon = 'ring-2 ring-offset-2 ring-offset-gray-50/50 dark:ring-offset-zinc-900/50 ring-[#21c55e]/50 shadow-[0_0_15px_rgba(33,197,94,0.3),inset_0_4px_10px_rgba(0,0,0,0.15)] dark:shadow-[0_0_15px_rgba(33,197,94,0.4),inset_0_4px_10px_rgba(0,0,0,0.6)]';
    
    return `${neon} bg-gray-200 dark:bg-zinc-800 slider-track-texture`;
  };

  return (
    <View 
      ref={containerRef}
      className={`relative h-[72px] w-full rounded-full overflow-hidden p-[6px] flex items-center transition-all duration-300 ${getHousingClass()}`}
    >
      {/* 3D Inner shadow for the track */}
      <View className="absolute inset-0 rounded-full shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)] pointer-events-none" />
      <View 
        className="absolute inset-0 flex items-center pl-[76px] justify-start h-full mr-4 pointer-events-none z-10"
        style={{ opacity: textOpacity }}
      >
        <Text className={`font-bold tracking-[0.15em] text-[15px] w-full text-center pr-[40px] uppercase text-gray-700 dark:text-gray-200 drop-shadow-sm ${trackColor || ''}`}>
          {label}
        </Text>
      </View>

      <View
        drag={isCompleted && !resetOnComplete ? false : "x"}
        dragConstraints={{ left: 0, right: containerWidth.current ? containerWidth.current - knobWidth - padding * 2 : 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
        className={`relative z-20 w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer cursor-grab active:cursor-grabbing hover:brightness-110 active:brightness-95 transition-all ${getKnobClass()}`}
      >
        {!isCompleted ? (
          <ChevronRight className="w-8 h-8" strokeWidth={2.5} />
        ) : (
          <View initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Check className="w-8 h-8" strokeWidth={3} />
          </View>
        )}
      </View>
    </View>
  );
}
