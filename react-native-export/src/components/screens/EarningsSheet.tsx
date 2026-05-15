import { View, Text, TouchableOpacity, Image } from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../../contexts/AppContext';
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell, LabelList } from 'recharts';
import {  X, Info  } from 'lucide-react-native';
import { useState } from 'react';
import { vibrate } from '../../lib/haptics';

const data = [
  { day: 'Mon', amount: 5 },
  { day: 'Tue', amount: 8 },
  { day: 'Wed', amount: 4 },
  { day: 'Thu', amount: 10 },
  { day: 'Fri', amount: 14 },
  { day: 'Sat', amount: 21 },
  { day: 'Sun', amount: 1 },
];

export function EarningsSheet() {
  const { isEarningsSheetOpen, setIsEarningsSheetOpen } = useAppContext();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!isEarningsSheetOpen) return null;

  const handlePointerDown = (index: number) => {
    vibrate.light();
    setActiveIndex(index);
  };

  const handlePointerUp = () => {
    setActiveIndex(null);
  };

  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    const isActive = activeIndex === index;
    const cx = x + width / 2;
    
    return (
      <g className="transition-all duration-200">
        {isActive ? (
          <>
            <rect x={cx - 20} y={y - 34} width="40" height="26" rx="13" fill="#16c464" />
            <Textolygon points={`${cx-4},${y-8} ${cx+4},${y-8} ${cx},${y-4}`} fill="#16c464" />
            <text x={cx} y={y - 17} fill="#ffffff" textAnchor="middle" fontSize="13" fontWeight="bold">
              {value}
            </text>
          </>
        ) : (
          <text x={cx} y={y - 10} fill="#9ca3af" textAnchor="middle" fontSize="12" fontWeight="600">
            {value}
          </text>
        )}
      </g>
    );
  };

  return (
    <AnimatePresence>
      <View
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        className="fixed inset-x-0 bottom-0 top-[60px] bg-white dark:bg-[#1c1c1e] z-[90] shadow-2xl rounded-t-[32px] overflow-hidden flex flex-col border-t border-gray-100 dark:border-white/10"
      >
        <View className="flex-1 overflow-y-auto px-6 py-6 pb-20">
          <View className="flex justify-between items-center mb-8">
            <Text className="text-[28px] font-bold tracking-tight text-gray-900 dark:text-white">Performance</Text>
            <TouchableOpacity 
              onPress={() => setIsEarningsSheetOpen(false)}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            >
              <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </TouchableOpacity>
          </View>

          <View className="mb-6 bg-[#16c464]/10 dark:bg-[#16c464]/20 p-6 rounded-[24px]">
             <Text className="text-gray-600 dark:text-gray-300 text-[13px] font-bold tracking-widest uppercase mb-2">Weekly Earnings</Text>
             <Text className="text-[48px] font-extrabold text-[#16a34a] dark:text-[#16c464] leading-none tracking-tight mb-2">£652.00</Text>
             <Text className="text-[#16a34a] dark:text-[#16c464] text-[14px] font-bold">+12% vs last week</Text>
          </View>

          <View className="grid grid-cols-2 gap-4 mb-8">
            <View className="bg-gray-50 dark:bg-white/5 p-5 rounded-[20px]">
              <Text className="text-gray-500 text-[12px] font-bold uppercase tracking-widest mb-1">Total Trips</Text>
              <Text className="font-bold text-[24px] text-gray-900 dark:text-white">48</Text>
            </View>
            <View className="bg-gray-50 dark:bg-white/5 p-5 rounded-[20px]">
              <Text className="text-gray-500 text-[12px] font-bold uppercase tracking-widest mb-1">Pass Status</Text>
              <Text className="font-bold text-[24px] text-gray-900 dark:text-white leading-tight mt-1">Active</Text>
            </View>
          </View>

          {/* CHART */}
          <View className="h-[220px] w-full mb-10 relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 40, bottom: 0, left: 0, right: 0 }}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }} 
                  dy={10}
                />
                <Bar 
                  dataKey="amount" 
                  radius={[8, 8, 8, 8]}
                  isAnimationActive={false}
                  barSize={32}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={activeIndex === index ? '#16c464' : (({ classList: { add: ()=>{}, remove: ()=>{} } }).classList.contains('dark') ? '#ffffff10' : '#f3f4f6')}
                      onPointerDown={() => handlePointerDown(index)}
                      onPointerUp={handlePointerUp}
                      onPointerOut={handlePointerUp}
                      onTouchStart={() => handlePointerDown(index)}
                      onTouchEnd={handlePointerUp}
                      style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }}
                    />
                  ))}
                  <LabelList content={renderCustomBarLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </View>

          {/* Breakdown List */}
          <View className="mb-8">
             <Text className="text-[18px] font-bold text-gray-900 dark:text-white mb-4">Platform Usage Fees</Text>
             <View className="space-y-3">
               {[
                 { label: 'Weekly Unlimited Pass', amount: '£50.00' },
                 { label: 'Overage Usage (£1/trip)', amount: '£0.00' },
                 { label: 'Total JAWA Fees Paid', amount: '£50.00', bold: true },
               ].map((item, i) => (
                 <View key={i} className={`flex items-center justify-between p-4 rounded-[20px] bg-gray-50 dark:bg-white/5`}>
                   <View className="flex items-center gap-3">
                     <Text className={`${item.bold ? 'font-bold text-[16px]' : 'font-medium text-[15px]'} text-gray-900 dark:text-white`}>{item.label}</Text>
                   </View>
                   <View className="flex items-center gap-2">
                     <Text className={`${item.bold ? 'font-bold text-[16px]' : 'font-medium text-[15px]'} text-gray-900 dark:text-white`}>{item.amount}</Text>
                   </View>
                 </View>
               ))}
               <Text className="text-[13px] text-gray-500 pt-2 px-1 leading-snug">
                 JAWA does not process rider payments or hold balances. You keep 100% of all cash and card fares paid to you directly by riders during trips.
               </Text>
             </View>
          </View>

          {/* Tax Information Summary */}
          <View>
            <Text className="text-[18px] font-bold text-gray-900 dark:text-white mb-4">Tax Summary</Text>
            <View className="bg-orange-50 dark:bg-[#fc4c4b]/10 rounded-[24px] p-5">
               <View className="flex items-start gap-3 mb-4">
                 <View className="w-10 h-10 shrink-0 rounded-full bg-orange-100 dark:bg-[#fc4c4b]/20 flex items-center justify-center">
                    <Info className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                 </View>
                 <View>
                   <Text className="font-bold text-gray-900 dark:text-white text-[16px]">HMRC Responsibility</Text>
                   <Text className="text-[14px] text-gray-600 dark:text-gray-300 mt-1 leading-snug">
                     As an independent contractor, you are solely responsible for tracking your own cash and card income from passengers and reporting it to HMRC. JAWA does not track your ride earnings or tips.
                   </Text>
                 </View>
               </View>
               
               <View className="bg-white dark:bg-[#1c1c1e] rounded-[16px] p-4 border border-orange-100 dark:border-white/5">
                 <View className="flex justify-between items-center mb-3">
                   <Text className="text-[13px] text-gray-500 font-medium">National Insurance (NI)</Text>
                   <Text className="font-mono text-[14px] font-bold text-gray-900 dark:text-white">AB123456C</Text>
                 </View>
                 <View className="flex justify-between items-center">
                   <Text className="text-[13px] text-gray-500 font-medium">Unique Taxpayer Ref (UTR)</Text>
                   <Text className="font-mono text-[14px] font-bold text-gray-900 dark:text-white">12345 67890</Text>
                 </View>
               </View>
            </View>
          </View>

        </View>
      </View>
    </AnimatePresence>
  );
}
