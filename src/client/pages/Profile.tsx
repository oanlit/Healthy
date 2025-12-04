
import React from 'react';
import { MapPin, Link as LinkIcon, Calendar, Edit2, Grid, Award, Clock, FileText } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="pb-20 max-w-5xl mx-auto">
      {/* Header Profile Card */}
      <div className="glass-panel rounded-[2.5rem] p-8 md:p-10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-pink-200 to-cozy-blue opacity-50"></div>
        
        <div className="relative pt-12 flex flex-col md:flex-row gap-6 items-end md:items-start">
          <div className="relative group">
             <img src="https://picsum.photos/id/64/200/200" className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover" />
             <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-cozy-dark-pink opacity-0 group-hover:opacity-100 transition-opacity">
               <Edit2 size={16} />
             </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-cozy-brown mb-2">Sakura</h1>
            <p className="text-gray-500 mb-4 max-w-lg">
              Frontend developer, pianist, and cat lover. Building my own digital garden. 🌱
              "Consistency is not about perfection, it's about not giving up."
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400 font-medium">
              <span className="flex items-center gap-1"><MapPin size={14} /> Tokyo, Digital World</span>
              <span className="flex items-center gap-1"><LinkIcon size={14} /> sakura.dev</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> Joined 2023</span>
            </div>
          </div>

          <div className="flex gap-4">
             <div className="text-center">
               <div className="text-xl font-bold text-cozy-text">128</div>
               <div className="text-xs text-gray-400">Days</div>
             </div>
             <div className="text-center">
               <div className="text-xl font-bold text-cozy-text">42</div>
               <div className="text-xs text-gray-400">Articles</div>
             </div>
             <div className="text-center">
               <div className="text-xl font-bold text-cozy-text">1.2k</div>
               <div className="text-xs text-gray-400">Likes</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Heatmap */}
        <div className="lg:col-span-2 space-y-8">
           {/* Contribution Heatmap Mockup */}
           <div className="glass-panel p-6 rounded-3xl">
             <h3 className="font-bold text-cozy-brown mb-4 flex items-center gap-2"><Grid size={18}/> Activity</h3>
             <div className="flex gap-1 flex-wrap justify-center">
               {Array.from({ length: 140 }).map((_, i) => (
                 <div 
                  key={i} 
                  className={`w-3 h-3 rounded-sm ${Math.random() > 0.7 ? 'bg-cozy-dark-pink' : Math.random() > 0.4 ? 'bg-pink-200' : 'bg-gray-100'}`} 
                  title="2 tasks completed"
                />
               ))}
             </div>
           </div>

           {/* Tabs content */}
           <div className="glass-panel p-6 rounded-3xl min-h-[300px]">
             <div className="flex border-b border-gray-100 mb-6">
                <button className="px-6 py-2 border-b-2 border-cozy-dark-pink text-cozy-dark-pink font-bold text-sm">Timeline</button>
                <button className="px-6 py-2 border-b-2 border-transparent text-gray-400 hover:text-gray-600 font-bold text-sm">Collections</button>
                <button className="px-6 py-2 border-b-2 border-transparent text-gray-400 hover:text-gray-600 font-bold text-sm">About</button>
             </div>
             
             <div className="space-y-6">
               <div className="flex gap-4">
                 <div className="flex flex-col items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-cozy-dark-pink ring-4 ring-pink-50"></div>
                   <div className="w-0.5 h-full bg-gray-100"></div>
                 </div>
                 <div className="pb-4">
                   <div className="text-xs text-gray-400 mb-1">Today, 14:30</div>
                   <div className="bg-white/60 p-4 rounded-2xl border border-white text-sm text-gray-600 shadow-sm">
                     Completed <span className="font-bold text-cozy-text">Run 5km</span> habit! Feeling energetic. 🏃‍♀️
                   </div>
                 </div>
               </div>
               <div className="flex gap-4">
                 <div className="flex flex-col items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-400 ring-4 ring-blue-50"></div>
                   <div className="w-0.5 h-full bg-gray-100"></div>
                 </div>
                 <div className="pb-4">
                   <div className="text-xs text-gray-400 mb-1">Yesterday</div>
                   <div className="bg-white/60 p-4 rounded-2xl border border-white text-sm text-gray-600 shadow-sm">
                     Published article <span className="font-bold text-cozy-text underline decoration-blue-200">Building a Music Player</span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* Right Column: Achievements & Archives */}
        <div className="space-y-6">
           <div className="glass-panel p-6 rounded-3xl">
              <h3 className="font-bold text-cozy-brown mb-4 flex items-center gap-2"><Award size={18}/> Badges</h3>
              <div className="grid grid-cols-3 gap-2">
                 <div className="aspect-square bg-yellow-100 rounded-xl flex items-center justify-center text-2xl" title="Early Bird">☀️</div>
                 <div className="aspect-square bg-blue-100 rounded-xl flex items-center justify-center text-2xl" title="Writer">✍️</div>
                 <div className="aspect-square bg-green-100 rounded-xl flex items-center justify-center text-2xl" title="Healthy">🥗</div>
                 <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-200">?</div>
              </div>
           </div>
           
           <div className="glass-panel p-6 rounded-3xl">
              <h3 className="font-bold text-cozy-brown mb-4 flex items-center gap-2"><FileText size={18}/> Archives</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex justify-between hover:text-cozy-dark-pink cursor-pointer">
                  <span>December 2023</span>
                  <span className="bg-white px-2 rounded-md text-xs text-gray-400">12</span>
                </li>
                <li className="flex justify-between hover:text-cozy-dark-pink cursor-pointer">
                  <span>November 2023</span>
                  <span className="bg-white px-2 rounded-md text-xs text-gray-400">8</span>
                </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
