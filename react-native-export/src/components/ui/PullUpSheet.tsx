import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, ReactNode, useRef, useEffect } from 'react';
import { motion, useAnimation, PanInfo } from 'motion/react';

interface PullUpSheetProps {
  children: ReactNode;
  isOpen?: boolean; // Fully open from external?
  isMid?: boolean;  // Default is mid state
  midHeight?: number; // e.g. 200px
  minState?: 'collapsed' | 'mid' | 'expanded';
  disableDrag?: boolean;
  key?: React.Key;
}

export function PullUpSheet({ children, isOpen = false, isMid = true, midHeight = 240, minState = 'collapsed', disableDrag = false }: PullUpSheetProps) {
  const [sheetState, setSheetState] = useState<'collapsed' | 'mid' | 'expanded'>(
    isOpen ? 'expanded' : isMid ? 'mid' : 'collapsed'
  );
  const controls = useAnimation();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // States distances
  const collapsedY = "calc(100% - 40px)"; // Only show 40px (grab handle)
  const midY = `calc(100% - ${midHeight}px)`;
  const expandedY = "0px"; // Fully show content

  useEffect(() => {
    // If it's forced open from props
    if (isOpen) {
      setSheetState('expanded');
      controls.start({ y: expandedY });
    } else {
      if (sheetState === 'expanded') {
        const val = isMid ? midY : collapsedY;
        setSheetState(isMid ? 'mid' : 'collapsed');
        controls.start({ y: val });
      } else {
         const val = isMid ? midY : collapsedY;
         setSheetState(isMid ? 'mid' : 'collapsed');
         controls.start({ y: val });
      }
    }
  }, [isOpen, isMid, midHeight]);

  useEffect(() => {
    // Initial mount position
    let y = collapsedY;
    if (sheetState === 'mid') y = midY;
    if (sheetState === 'expanded') y = expandedY;
    controls.start({ y, transition: { type: 'spring', bounce: 0.1 } });
  }, []);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (disableDrag) return;
    const isDraggingUp = info.velocity.y < -100 || info.offset.y < -50;
    const isDraggingDown = info.velocity.y > 100 || info.offset.y > 50;

    let nextState = sheetState;

    if (sheetState === 'collapsed') {
      if (isDraggingUp) nextState = 'mid';
    } else if (sheetState === 'mid') {
      if (isDraggingUp) nextState = 'expanded';
      if (isDraggingDown && minState !== 'mid' && minState !== 'expanded') nextState = 'collapsed';
    } else if (sheetState === 'expanded') {
      if (isDraggingDown) {
         nextState = 'mid';
         if (minState === 'expanded') nextState = 'expanded';
      }
    }

    setSheetState(nextState);

    let y = collapsedY;
    if (nextState === 'mid') y = midY;
    if (nextState === 'expanded') y = expandedY;

    controls.start({ y, transition: { type: 'spring', bounce: 0.2, duration: 0.5 } });
  };

  const handleTapHandle = () => {
    if (disableDrag) return;
    if (sheetState === 'collapsed') {
      setSheetState('mid');
      controls.start({ y: midY, transition: { type: 'spring', bounce: 0.2 } });
    } else if (sheetState === 'mid') {
      setSheetState('expanded');
      controls.start({ y: expandedY, transition: { type: 'spring', bounce: 0.2 } });
    } else {
      setSheetState('mid');
      controls.start({ y: midY, transition: { type: 'spring', bounce: 0.2 } });
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <View
        className="fixed inset-0 bg-black/40 pointer-events-none z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: sheetState === 'expanded' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ backdropFilter: sheetState === 'expanded' ? 'blur(4px)' : 'none' }}
      />
      
      <View
        ref={sheetRef}
        className="fixed left-0 right-0 bottom-0 bg-white dark:bg-[#1c1c1e] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] origin-bottom rounded-t-[32px] z-50 flex flex-col max-h-[85vh]"
        initial={{ y: "100%" }}
        animate={controls}
        drag={disableDrag ? false : "y"}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <View 
          className={`w-full flex justify-center pt-3 pb-3 ${disableDrag ? '' : 'cursor-grab active:cursor-grabbing'}`}
          onPointerDown={handleTapHandle}
        >
          {!disableDrag && <View className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-700" />}
        </View>
        
        <View className="flex-1 overflow-y-auto px-6 pb-12 custom-scrollbar">
          {typeof children === 'function' ? children({ sheetState }) : children}
        </View>
      </View>
    </>
  );
}
