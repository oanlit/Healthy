
import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart, Music, Image as ImageIcon, Gamepad2, Repeat, Shuffle } from 'lucide-react';
import { Song } from '../../types';

const Entertainment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MUSIC' | 'IMAGES' | 'GAMES'>('MUSIC');
  const [isPlaying, setIsPlaying] = useState(false);
  
  const MOCK_SONG: Song = {
    id: '1',
    title: 'You (=I)',
    artist: 'Bol4',
    cover: 'https://picsum.photos/id/30/600/600',
    duration: '03:42'
  };

  const MusicPlayer = () => (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center h-full min-h-[500px]">
      {/* Vinyl / Cover Art */}
      <div className="relative group">
         <div className={`relative w-72 h-72 md:w-96 md:h-96 rounded-full shadow-2xl overflow-hidden border-8 border-gray-800 flex items-center justify-center bg-black transition-all duration-[5000ms] ease-linear ${isPlaying ? 'music-disk-spin' : ''}`}>
            <img src={MOCK_SONG.cover} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            <div className="absolute w-24 h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/20"></div>
            <div className="absolute w-4 h-4 bg-gray-300 rounded-full border-2 border-gray-400 z-10"></div>
         </div>
         {/* Tone arm decoration could go here */}
      </div>

      {/* Controls */}
      <div className="w-full max-w-md glass-panel p-8 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-20"><Music size={120} /></div>
        
        <div className="mb-8 relative z-10">
          <h2 className="text-3xl font-bold text-cozy-brown mb-1">{MOCK_SONG.title}</h2>
          <p className="text-lg text-gray-500 font-medium">{MOCK_SONG.artist}</p>
          <div className="mt-2 inline-block px-3 py-1 bg-pink-100 text-pink-500 rounded-full text-xs font-bold">Full Album RED PLANET</div>
        </div>

        {/* Lyric Snippet */}
        <div className="h-24 flex items-center justify-center text-center text-gray-600 italic font-serif mb-8 leading-relaxed">
          "When you look at me with those eyes,<br/>the whole world stops spinning..."
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="w-full h-1.5 bg-gray-200 rounded-full mb-2 cursor-pointer group">
            <div className="w-1/3 h-full bg-cozy-dark-pink rounded-full relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-cozy-dark-pink rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 font-bold">
            <span>01:12</span>
            <span>{MOCK_SONG.duration}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center relative z-10">
          <button className="text-gray-400 hover:text-cozy-text"><Shuffle size={20}/></button>
          <button className="text-cozy-text hover:text-cozy-dark-pink"><SkipBack size={28} fill="currentColor" className="text-white stroke-current" /></button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-cozy-dark-pink text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 hover:bg-rose-400 transition-all"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1"/>}
          </button>
          <button className="text-cozy-text hover:text-cozy-dark-pink"><SkipForward size={28} fill="currentColor" className="text-white stroke-current" /></button>
          <button className="text-gray-400 hover:text-cozy-text"><Repeat size={20}/></button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center mb-8">
        <div className="bg-white/40 p-1 rounded-full flex backdrop-blur-sm border border-white/60">
           <button onClick={() => setActiveTab('MUSIC')} className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'MUSIC' ? 'bg-white text-cozy-dark-pink shadow-md' : 'text-gray-500 hover:text-cozy-text'}`}><Music size={16}/> Music</button>
           <button onClick={() => setActiveTab('IMAGES')} className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'IMAGES' ? 'bg-white text-cozy-dark-pink shadow-md' : 'text-gray-500 hover:text-cozy-text'}`}><ImageIcon size={16}/> Gallery</button>
           <button onClick={() => setActiveTab('GAMES')} className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'GAMES' ? 'bg-white text-cozy-dark-pink shadow-md' : 'text-gray-500 hover:text-cozy-text'}`}><Gamepad2 size={16}/> Games</button>
        </div>
      </div>

      <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'MUSIC' && <MusicPlayer />}
        {activeTab === 'IMAGES' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-20">
             {[1,2,3,4,5,6,7,8].map(i => (
               <div key={i} className="aspect-square rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                 <img src={`https://picsum.photos/id/${150 + i}/400/400`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
               </div>
             ))}
          </div>
        )}
        {activeTab === 'GAMES' && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-white/30 rounded-3xl border border-white">
             <div className="text-6xl mb-4">🎮</div>
             <h2 className="text-xl font-bold text-cozy-text mb-2">Game Center</h2>
             <p className="mb-6">2048 & Mini-puzzles coming soon...</p>
             <button className="px-6 py-3 bg-cozy-green text-white rounded-xl font-bold shadow-md hover:opacity-90">Play Demo</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Entertainment;
