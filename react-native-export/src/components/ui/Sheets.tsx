import { View, Text, TouchableOpacity, Image } from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../../contexts/AppContext';
import {  X, Mail, ChevronRight, User, Key, CheckCircle2, Navigation, AlertCircle  } from 'lucide-react-native';
import { useState } from 'react';
import { vibrate } from '../../lib/haptics';

export function Sheets() {
  const { openSheet, setOpenSheet } = useAppContext();

  const close = () => setOpenSheet('none');

  if (openSheet === 'none' || openSheet === 'earnings') return null; // earnings handled separately for now, or we can move it here

  return (
    <AnimatePresence>
      <View
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        className="fixed inset-x-0 bottom-0 top-[60px] bg-white dark:bg-[#1c1c1e] z-[90] shadow-2xl rounded-t-[32px] overflow-hidden flex flex-col border-t border-gray-100 dark:border-white/10"
      >
        {/* Header */}
        <View className="px-6 py-6 flex justify-between items-center shrink-0 border-b border-gray-100 dark:border-white/5">
          <Text className="text-[24px] font-bold tracking-tight text-gray-900 dark:text-white capitalize">
            {openSheet === 'fees' ? 'JawaRide Fees' : openSheet === 'history' ? 'Job History' : openSheet === 'faq' ? 'FAQ' : openSheet}
          </Text>
          <TouchableOpacity 
            onPress={close}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 overflow-y-auto px-6 py-6 pb-20 custom-scrollbar">
          {openSheet === 'mailbox' && <MailboxContent />}
          {openSheet === 'profile' && <ProfileContent />}
          {openSheet === 'bookings' && <BookingsContent />}
          {openSheet === 'faq' && <FaqContent />}
          {openSheet === 'support' && <SupportContent />}
          {openSheet === 'fees' && <FeesContent />}
          {openSheet === 'history' && <HistoryContent />}
        </View>
      </View>
    </AnimatePresence>
  );
}

function MailboxContent() {
  const [tab, setTab] = useState<'rider' | 'admin'>('rider');
  const [activeMessage, setActiveMessage] = useState<any>(null);
  
  const messages = {
    rider: [
      { id: 1, sender: 'Johnny Smith', preview: 'I am standing near the blue door.', time: '10:42', unread: true },
      { id: 2, sender: 'Sarah Connor', preview: 'Thanks for the ride!', time: 'Yesterday', unread: false },
    ],
    admin: [
      { id: 3, sender: 'JawaRide Support', preview: 'Your account is fully verified.', time: 'Oct 24', unread: false },
    ]
  };

  if (activeMessage) {
    return (
      <View className="flex flex-col h-full">
        <View className="flex items-center gap-3 mb-6">
          <TouchableOpacity onPress={() => setActiveMessage(null)} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
            <X className="w-4 h-4" />
          </TouchableOpacity>
          <Text className="text-[18px] font-bold text-gray-900 dark:text-white">{activeMessage.sender}</Text>
        </View>
        
        <View className="flex-1 overflow-y-auto space-y-4 mb-6">
          {activeMessage.sender === 'Johnny Smith' && (
             <>
               <View className="bg-gray-100 dark:bg-[#2c2c2e] p-4 rounded-2xl rounded-tl-sm w-[80%] self-start text-gray-900 dark:text-white text-[15px]">
                  Hi, I am standing near the blue door.
               </View>
               <View className="text-[11px] text-gray-400 mt-1">READ</View>
             </>
          )}
        </View>

        {tab === 'rider' && (
          <View>
            <View className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
              {['OK, thanks!', 'I\'ve arrived', 'In traffic'].map(reply => (
                <TouchableOpacity key={reply} onPress={() => vibrate.light()} className="shrink-0 px-4 py-2 bg-gray-100 dark:bg-[#2c2c2e] text-gray-800 dark:text-gray-200 rounded-full text-[13px] font-semibold">
                  {reply}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  }

  return (
    <>
      <View className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-full mb-6 relative">
        <TouchableOpacity 
          onPress={() => setTab('rider')}
          className={`flex-1 py-2 text-[14px] font-bold rounded-full transition-all ${tab === 'rider' ? 'bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
        >
          Rider
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setTab('admin')}
          className={`flex-1 py-2 text-[14px] font-bold rounded-full transition-all ${tab === 'admin' ? 'bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
        >
          Admin
        </TouchableOpacity>
      </View>

      <View className="space-y-2">
        {messages[tab].map(msg => (
          <View 
            key={msg.id} 
            onPress={() => setActiveMessage(msg)}
            className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-[20px] active:scale-[0.98] transition-all cursor-pointer"
          >
            <View className="w-12 h-12 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center shrink-0">
               <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </View>
            <View className="flex-1">
              <View className="flex justify-between items-center mb-1">
                <Text className="text-[16px] font-bold text-gray-900 dark:text-white">{msg.sender}</Text>
                <View className="flex items-center gap-2">
                  <Text className="text-[12px] text-gray-500 font-medium">{msg.time}</Text>
                  {msg.unread && <View className="w-2.5 h-2.5 bg-[#16c464] rounded-full"></View>}
                </View>
              </View>
              <Text className="text-[14px] text-gray-500 line-clamp-1">{msg.preview}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
}

function ProfileContent() {
  const [tab, setTab] = useState<'driver' | 'vehicle'>('driver');

  return (
    <>
      <View className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-full mb-6 relative">
        <TouchableOpacity 
          onPress={() => setTab('driver')}
          className={`flex-1 py-2 text-[14px] font-bold rounded-full transition-all ${tab === 'driver' ? 'bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
        >
          Driver Profile
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setTab('vehicle')}
          className={`flex-1 py-2 text-[14px] font-bold rounded-full transition-all ${tab === 'vehicle' ? 'bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
        >
          Vehicle Profile
        </TouchableOpacity>
      </View>

      {tab === 'driver' ? (
        <View className="space-y-6">
          <View className="flex items-center gap-4">
            <View className="w-20 h-20 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
               <Image src="https://ui-avatars.com/api/?name=Bob+Builder&background=16c464&color=fff&size=150" alt="Avatar" className="w-full h-full object-cover" />
            </View>
            <View>
              <Text className="text-[20px] font-bold text-gray-900 dark:text-white">Bob Builder</Text>
              <Text className="text-[14px] text-gray-500 mt-1">+44 7700 900077</Text>
            </View>
          </View>

          <View className="space-y-4">
            <View className="bg-gray-50 dark:bg-white/5 p-4 rounded-[16px]">
              <Text className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-1">Date of Birth</Text>
              <Text className="text-[16px] font-semibold text-gray-900 dark:text-white">12 Mar 1985</Text>
            </View>
            <View className="bg-gray-50 dark:bg-white/5 p-4 rounded-[16px]">
              <Text className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-1">Address</Text>
              <Text className="text-[16px] font-semibold text-gray-900 dark:text-white">123 Fake Street, London, E2 8DS</Text>
            </View>
          </View>

          <View>
             <Text className="text-[18px] font-bold text-gray-900 dark:text-white mb-4 mt-8">Documents</Text>
             <View className="space-y-3">
               {['Driving Licence', 'Private Hire Badge', 'Counterpart'].map(doc => (
                 <View key={doc} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-[16px]">
                   <Text className="font-semibold text-[15px]">{doc}</Text>
                   <CheckCircle2 className="w-5 h-5 text-[#16c464]" />
                 </View>
               ))}
             </View>
          </View>

          <TouchableOpacity className="w-full mt-8 py-4 bg-red-50 dark:bg-red-500/10 text-red-500 font-bold rounded-full text-[15px]">
            Delete Account
          </TouchableOpacity>
        </View>
      ) : (
        <View className="space-y-6">
          <View className="bg-[#16c464]/10 p-5 rounded-[20px] mb-6 flex items-center justify-between border border-[#16c464]/20">
             <View>
               <Text className="text-[12px] font-bold text-[#16a34a] tracking-widest uppercase mb-1">Registration</Text>
               <Text className="text-[24px] font-black tracking-widest text-gray-900 dark:text-white uppercase">LA68 KYV</Text>
             </View>
             <View className="bg-[#16c464] text-white p-2 rounded-full">
               <CheckCircle2 className="w-6 h-6" />
             </View>
          </View>

          <View className="space-y-4">
             <View className="bg-gray-50 dark:bg-white/5 p-4 rounded-[16px]">
               <Text className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-1">Make & Model</Text>
               <Text className="text-[16px] font-semibold text-gray-900 dark:text-white">Toyota Prius</Text>
             </View>
          </View>

          <View>
             <Text className="text-[18px] font-bold text-gray-900 dark:text-white mb-4 mt-8">Documents</Text>
             <View className="space-y-3">
               {['V5 Logbook', 'MOT Certificate', 'Insurance Document', 'Private Hire Permissions'].map(doc => (
                 <View key={doc} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-[16px]">
                   <Text className="font-semibold text-[15px]">{doc}</Text>
                   <CheckCircle2 className="w-5 h-5 text-[#16c464]" />
                 </View>
               ))}
             </View>
          </View>

          <TouchableOpacity className="w-full mt-8 py-4 bg-red-50 dark:bg-red-500/10 text-red-500 font-bold rounded-full text-[15px]">
            De-register Vehicle
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

function BookingsContent() {
  const bookings = [
    { id: 1, date: 'Today, 14:30', pickup: 'Waterloo Station', dropoff: 'London Eye', payment: 'Card', status: 'upcoming', group: 'today' },
    { id: 2, date: 'Tomorrow, 09:00', pickup: 'Heathrow T5', dropoff: 'Paddington', payment: 'Cash', status: 'upcoming', group: 'tomorrow' },
  ];

  return (
    <View className="space-y-8">
      <View className="space-y-4">
        <Text className="text-[15px] font-bold text-gray-500 tracking-widest uppercase">Today</Text>
        {bookings.filter(b => b.group === 'today').map(booking => (
          <View key={booking.id} className="bg-gray-50 dark:bg-white/5 rounded-[20px] p-5">
             <View className="flex justify-between items-center mb-4">
               <Text className="font-bold text-[16px]">{booking.date}</Text>
               <Text className="font-bold text-[14px] uppercase tracking-widest text-[#16c464] bg-[#16c464]/10 px-3 py-1 rounded-full">{booking.payment}</Text>
             </View>
             <View className="space-y-3 mb-6 relative">
                 <View className="absolute left-[9px] top-[14px] bottom-[14px] w-[2px] bg-gray-200 dark:bg-[#1c1c1e]"></View>
                 <View className="flex items-center gap-4 relative">
                   <View className="w-[20px] h-[20px] rounded-full border-4 border-white dark:border-[#2c2c2e] bg-[#16c464] shrink-0 outline outline-[1px] outline-gray-200 dark:outline-white/10 z-10"></View>
                   <View className="flex-1">
                     <Text className="text-[15px] font-bold text-gray-900 dark:text-white">{booking.pickup}</Text>
                   </View>
                 </View>
                 <View className="flex items-center gap-4 relative">
                   <View className="w-[20px] h-[20px] bg-[#fc4c4b] shrink-0 border-4 border-white dark:border-[#2c2c2e] outline outline-[1px] outline-gray-200 dark:outline-white/10 z-10"></View>
                   <View className="flex-1">
                     <Text className="text-[15px] font-bold text-gray-900 dark:text-white">{booking.dropoff}</Text>
                   </View>
                 </View>
             </View>
             <TouchableOpacity className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-[13px] rounded-full active:scale-[0.98] transition-transform">
               Accept 
             </TouchableOpacity>
          </View>
        ))}
      </View>

      <View className="space-y-4">
        <Text className="text-[15px] font-bold text-gray-500 tracking-widest uppercase">Tomorrow</Text>
        {bookings.filter(b => b.group === 'tomorrow').map(booking => (
          <View key={booking.id} className="bg-gray-50 dark:bg-white/5 rounded-[20px] p-5">
             <View className="flex justify-between items-center mb-4">
               <Text className="font-bold text-[16px]">{booking.date}</Text>
               <Text className="font-bold text-[14px] uppercase tracking-widest text-[#16c464] bg-[#16c464]/10 px-3 py-1 rounded-full">{booking.payment}</Text>
             </View>
             <View className="space-y-3 mb-6 relative">
                 <View className="absolute left-[9px] top-[14px] bottom-[14px] w-[2px] bg-gray-200 dark:bg-[#1c1c1e]"></View>
                 <View className="flex items-center gap-4 relative">
                   <View className="w-[20px] h-[20px] rounded-full border-4 border-white dark:border-[#2c2c2e] bg-[#16c464] shrink-0 outline outline-[1px] outline-gray-200 dark:outline-white/10 z-10"></View>
                   <View className="flex-1">
                     <Text className="text-[15px] font-bold text-gray-900 dark:text-white">{booking.pickup}</Text>
                   </View>
                 </View>
                 <View className="flex items-center gap-4 relative">
                   <View className="w-[20px] h-[20px] bg-[#fc4c4b] shrink-0 border-4 border-white dark:border-[#2c2c2e] outline outline-[1px] outline-gray-200 dark:outline-white/10 z-10"></View>
                   <View className="flex-1">
                     <Text className="text-[15px] font-bold text-gray-900 dark:text-white">{booking.dropoff}</Text>
                   </View>
                 </View>
             </View>
             <TouchableOpacity className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-[13px] rounded-full active:scale-[0.98] transition-transform">
               Accept 
             </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

function FaqContent() {
  const faqs = [
    { title: 'How do I get paid?', content: 'You are paid directly by riders using Card or Cash. JAWA does not process or hold your ride fares.' },
    { title: 'JawaRide Usage Fees', content: 'You can select Pay-As-You-Go (£1 per trip) or a Weekly Unlimited Pass (£50).' },
    { title: 'Cancellations', content: 'Riders are liable for a £5 fee if cancelled after 5 minutes.' },
    { title: 'Document Verification', content: 'We review docs within 24 hours.' },
    { title: 'Scheduled Bookings', content: 'Ensure to arrive 5 mins early for scheduled runs.' },
    { title: 'Safety Features', content: 'Press the shield icon at any time to alert authorities.' },
  ];

  return (
    <View className="space-y-3">
      {faqs.map((faq, i) => (
        <details key={i} className="group bg-gray-50 dark:bg-white/5 rounded-[20px] p-5">
          <summary className="font-bold text-[16px] text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center group-open:mb-3">
             {faq.title}
             <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
          </summary>
          <Text className="text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed">
             {faq.content}
          </Text>
        </details>
      ))}
    </View>
  );
}

function SupportContent() {
  return (
    <View className="flex flex-col h-full bg-gray-50 dark:bg-white/5 p-6 rounded-[24px]">
       <View className="mb-6">
         <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-widest mb-2">Subject</label>
         <input type="text" placeholder="e.g. Missing Trip Fare" className="w-full bg-white dark:bg-[#1c1c1e] p-4 rounded-[16px] text-[15px] outline-none font-medium focus:ring-2 focus:ring-[#16c464] border border-gray-100 dark:border-white/10" />
       </View>
       <View className="mb-6 flex-1">
         <label className="block text-[13px] font-bold text-gray-500 uppercase tracking-widest mb-2">Message</label>
         <textarea placeholder="Describe your issue..." className="w-full h-40 bg-white dark:bg-[#1c1c1e] p-4 rounded-[16px] text-[15px] outline-none font-medium focus:ring-2 focus:ring-[#16c464] border border-gray-100 dark:border-white/10 resize-none"></textarea>
       </View>
       <Text className="text-[12px] text-gray-500 font-medium text-center mb-6">Replies will appear in Admin tab of Mailbox.</Text>
       <TouchableOpacity className="w-full py-4 bg-[#16c464] text-white font-bold text-[15px] rounded-full shadow-[0_4px_15px_rgba(22,196,100,0.3)] active:scale-95 transition-all">
         SEND
       </TouchableOpacity>
    </View>
  );
}

function FeesContent() {
  const [tab, setTab] = useState<'pricing' | 'pass'>('pricing');

  return (
    <>
      <View className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-full mb-6 relative">
        <TouchableOpacity 
          onPress={() => setTab('pricing')}
          className={`flex-1 py-2 text-[14px] font-bold rounded-full transition-all ${tab === 'pricing' ? 'bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
        >
          Custom Pricing
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setTab('pass')}
          className={`flex-1 py-2 text-[14px] font-bold rounded-full transition-all ${tab === 'pass' ? 'bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
        >
          JAWA Pass
        </TouchableOpacity>
      </View>

      {tab === 'pricing' ? (
        <View className="space-y-6">
          <Text className="text-[14px] text-gray-500 font-medium">Select your preferred fare rate. Your rates cannot exceed limits set by your registered council (Wolverhampton).</Text>
          
          <View className="space-y-4">
             {/* Recommended Tier */}
             <View className="border-2 border-[#16c464] bg-[#16c464]/5 p-5 rounded-[20px] relative cursor-pointer active:scale-[0.98] transition-transform">
                <View className="absolute top-0 right-0 bg-[#16c464] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-[16px] rounded-tr-[16px]">Active</View>
                <Text className="font-bold text-[18px] text-gray-900 dark:text-white mb-1">Recommended</Text>
                <Text className="text-[13px] text-gray-500 font-medium mb-3">Market standard rates</Text>
                <View className="flex justify-between items-center bg-white dark:bg-zinc-800 p-3 rounded-[12px]">
                   <Text className="text-[14px] text-gray-600 dark:text-gray-400 font-bold">Per Mile</Text>
                   <Text className="text-[15px] font-bold text-gray-900 dark:text-white">£4.20</Text>
                </View>
             </View>

             {/* +20% Tier */}
             <View className="border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5 rounded-[20px] cursor-pointer active:scale-[0.98] transition-transform">
                <Text className="font-bold text-[18px] text-gray-900 dark:text-white mb-1">+20% Rate</Text>
                <Text className="text-[13px] text-gray-500 font-medium mb-3">Higher earnings, fewer requests</Text>
                <View className="flex justify-between items-center bg-white dark:bg-zinc-800 p-3 rounded-[12px] border border-gray-100 dark:border-white/5">
                   <Text className="text-[14px] text-gray-600 dark:text-gray-400 font-bold">Per Mile</Text>
                   <Text className="text-[15px] font-bold text-gray-900 dark:text-white">£5.04</Text>
                </View>
             </View>

             {/* Max Tier */}
             <View className="border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5 rounded-[20px] cursor-pointer active:scale-[0.98] transition-transform">
                <Text className="font-bold text-[18px] text-gray-900 dark:text-white mb-1">Maximum Allowed</Text>
                <Text className="text-[13px] text-gray-500 font-medium mb-3">Council limit cap</Text>
                <View className="flex justify-between items-center bg-white dark:bg-zinc-800 p-3 rounded-[12px] border border-gray-100 dark:border-white/5">
                   <Text className="text-[14px] text-gray-600 dark:text-gray-400 font-bold">Per Mile</Text>
                   <Text className="text-[15px] font-bold text-gray-900 dark:text-white">£6.00</Text>
                </View>
             </View>

             {/* Locked Items */}
             <View className="mt-8">
               <Text className="font-bold text-[14px] uppercase tracking-widest text-gray-400 mb-4">Locked Council Fees</Text>
               <View className="space-y-3">
                 <View className="flex justify-between items-center">
                   <Text className="text-[14px] text-gray-600 dark:text-gray-400 font-medium">Extra Stop</Text>
                   <Text className="text-[14px] font-bold text-gray-900 dark:text-white">£1.00</Text>
                 </View>
                 <View className="flex justify-between items-center">
                   <Text className="text-[14px] text-gray-600 dark:text-gray-400 font-medium">Wait Time (per min)</Text>
                   <Text className="text-[14px] font-bold text-gray-900 dark:text-white">£0.30</Text>
                 </View>
                 <View className="flex justify-between items-center">
                   <Text className="text-[14px] text-gray-600 dark:text-gray-400 font-medium">Airport Drop-off</Text>
                   <Text className="text-[14px] font-bold text-gray-900 dark:text-white">£5.00</Text>
                 </View>
               </View>
             </View>
          </View>
        </View>
      ) : (
        <View className="space-y-6">
          <View className="bg-[#16c464] text-white p-6 rounded-[24px] shadow-lg relative overflow-hidden">
             <View className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></View>
             <Text className="font-extrabold text-[24px] leading-tight mb-1 relative z-10">Weekly Unlimited</Text>
             <Text className="font-medium text-[14px] opacity-90 relative z-10 mb-5">Zero trip fees. Keep 100% of all fares.</Text>
             <View className="flex items-end gap-1 mb-2 relative z-10">
               <Text className="text-[32px] font-extrabold leading-none tracking-tight">£50</Text>
               <Text className="text-[14px] font-bold opacity-80 pb-1">/ week</Text>
             </View>
             <View className="mt-4 flex gap-2 relative z-10">
               <Text className="bg-white/20 px-3 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest">Active</Text>
               <Text className="bg-white/20 px-3 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest">Renews Monday</Text>
             </View>
          </View>

          <View className="bg-gray-50 dark:bg-white/5 p-6 rounded-[24px] border border-gray-200 dark:border-white/10">
             <Text className="font-extrabold text-[18px] text-gray-900 dark:text-white mb-1">Pay As You Go</Text>
             <Text className="font-medium text-[13px] text-gray-500 mb-4">You pay £1 for every completed trip.</Text>
             
             <TouchableOpacity className="w-full py-3.5 border-2 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-bold rounded-full active:scale-[0.98] transition-transform">
               Switch to PAYG
             </TouchableOpacity>
             <Text className="text-[11px] text-center text-gray-400 mt-3 font-medium px-4">Changes will apply starting next Monday at 00:00.</Text>
          </View>

          <View className="bg-[#16c464]/10 p-5 rounded-[20px]">
             <View className="flex justify-between items-center mb-1">
               <Text className="font-bold text-[14px] text-[#16c464]">Carry-Forward Benefit</Text>
               <Text className="font-bold text-[14px] text-[#16c464]">32 Trips</Text>
             </View>
             <Text className="text-[12px] text-[#16a34a] dark:text-[#16c464]/80 font-medium">You have 32 unused trips credited if you switch to PAYG.</Text>
          </View>
        </View>
      )}
    </>
  );
}

function HistoryContent() {
  const pastTrips = [
    { id: 1, date: 'Oct 28', time: '14:23', payment: 'Card', pickup: 'Soho Square', dropoff: 'Victoria Station' },
    { id: 2, date: 'Oct 28', time: '11:15', payment: 'Cash', pickup: 'King\'s Cross', dropoff: 'Bank' },
    { id: 3, date: 'Oct 27', time: '18:40', payment: 'Card', pickup: 'Heathrow T2', dropoff: 'Hammersmith' },
  ];

  return (
    <View className="space-y-4">
      {pastTrips.map(trip => (
        <View key={trip.id} className="bg-gray-50 dark:bg-white/5 rounded-[20px] p-5 flex flex-col gap-3">
          <View className="flex justify-between items-center">
            <Text className="font-bold text-[16px] text-gray-900 dark:text-white">{trip.date} • {trip.time}</Text>
            <Text className="font-bold text-[13px] uppercase tracking-widest text-[#16c464] bg-[#16c464]/10 px-3 py-1 rounded-full">{trip.payment}</Text>
          </View>
          <View className="flex gap-3 text-[14px] text-gray-600 dark:text-gray-400 font-medium items-center">
             <View className="w-[8px] h-[8px] rounded-full bg-[#16c464]"></View>
             <Text className="truncate">{trip.pickup}</Text>
          </View>
          <View className="flex gap-3 text-[14px] text-gray-600 dark:text-gray-400 font-medium items-center">
             <View className="w-[8px] h-[8px] bg-[#fc4c4b]"></View>
             <Text className="truncate">{trip.dropoff}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
