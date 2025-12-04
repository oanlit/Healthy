
import React, { useState } from 'react';
import { Save, ArrowLeft, Settings, Image as ImageIcon, Hash, Layout, FileText, Send } from 'lucide-react';
import { ViewState } from '../../types';

interface EditorProps {
  navigate: (view: ViewState) => void;
}

const Editor: React.FC<EditorProps> = ({ navigate }) => {
  const [content, setContent] = useState<string>(
`# Start Here, Build Your Music Player

Have you ever wondered how music apps on your phone work?

Those jumping frequencies, precise progress bars, randomized playlists... they aren't magic, but lines of code weaving a symphony.

**Today, we invite you to turn from listener to creator.**

## 🎯 Our Goal: A Real Music Player

The best way to learn programming is to *build something you actually want to use*.
`);

  const [title, setTitle] = useState('Building a Music Player');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6">
      {/* Left: Archive Sidebar */}
      <div className="hidden lg:flex w-64 flex-col glass-panel rounded-3xl overflow-hidden border border-white/60">
        <div className="p-4 bg-white/50 border-b border-gray-100 font-bold text-gray-600 flex justify-between items-center">
          <span>Archives</span>
          <button className="p-1 hover:bg-white rounded"><Layout size={16}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {['Intro to Coding', 'My Morning Routine', 'React Hooks', 'Summer Playlist'].map((item, i) => (
             <div key={i} className={`p-3 rounded-xl text-sm font-medium cursor-pointer transition-colors ${i === 1 ? 'bg-cozy-pink/30 text-cozy-dark-pink' : 'hover:bg-white/50 text-gray-600'}`}>
               <div className="truncate">{item}</div>
               <div className="text-[10px] text-gray-400 mt-1">Edited 2 days ago</div>
             </div>
          ))}
        </div>
      </div>

      {/* Center: Main Editor */}
      <div className="flex-1 flex flex-col glass-panel rounded-3xl border border-white/60 shadow-lg overflow-hidden relative">
        {/* Toolbar */}
        <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
             <button onClick={() => navigate(ViewState.HOME)} className="p-2 hover:bg-white rounded-full text-gray-500"><ArrowLeft size={20}/></button>
             <input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent font-bold text-lg text-cozy-text outline-none w-full placeholder-gray-400" 
              placeholder="Enter title..."
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:bg-white rounded-lg hover:text-cozy-dark-pink transition-colors"><ImageIcon size={20}/></button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-colors ${showSettings ? 'bg-cozy-pink text-cozy-dark-pink' : 'text-gray-400 hover:bg-white hover:text-cozy-text'}`}
            >
              <Settings size={20}/>
            </button>
            <button className="px-6 py-2 bg-cozy-dark-pink text-white rounded-xl font-bold shadow-md hover:bg-rose-400 transition-colors flex items-center gap-2 text-sm">
              <Send size={16} /> Publish
            </button>
          </div>
        </div>

        {/* Settings Drawer */}
        {showSettings && (
          <div className="bg-gray-50 p-4 border-b border-gray-100 grid grid-cols-3 gap-4 text-sm animate-in slide-in-from-top-2">
             <div>
               <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Category</label>
               <select className="w-full bg-white border border-gray-200 rounded-lg p-2 outline-none">
                 <option>Tech</option>
                 <option>Life</option>
               </select>
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tags</label>
               <input type="text" className="w-full bg-white border border-gray-200 rounded-lg p-2 outline-none" placeholder="Add tags..." />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Privacy</label>
               <select className="w-full bg-white border border-gray-200 rounded-lg p-2 outline-none">
                 <option>Public</option>
                 <option>Private</option>
               </select>
             </div>
          </div>
        )}

        {/* Editor Area - Hybrid Concept */}
        <div className="flex-1 flex overflow-hidden bg-cozy-bg/50">
           {/* Simple approach: Textarea for now, effectively "raw" */}
           <textarea 
             className="flex-1 p-8 bg-transparent resize-none outline-none font-mono text-gray-700 leading-relaxed text-base"
             value={content}
             onChange={(e) => setContent(e.target.value)}
             placeholder="Start writing your story..."
           />
           {/* Preview could go here in split view */}
        </div>
        
        <div className="h-8 bg-white/50 border-t border-gray-100 flex items-center justify-end px-4 text-xs text-gray-400 gap-4">
           <span>{content.length} characters</span>
           <span>Saved just now</span>
        </div>
      </div>

      {/* Right: Outline Sidebar */}
      <div className="hidden xl:flex w-64 flex-col glass-panel rounded-3xl overflow-hidden border border-white/60 p-6">
        <h4 className="font-bold text-cozy-brown mb-4 flex items-center gap-2"><FileText size={16}/> Outline</h4>
        <div className="space-y-3 text-sm text-gray-500">
           {content.split('\n').filter(l => l.startsWith('#')).map((line, i) => {
             const level = line.match(/^#+/)?.[0].length || 1;
             return (
               <div key={i} className={`truncate cursor-pointer hover:text-cozy-dark-pink transition-colors ${level === 1 ? 'font-bold text-gray-700' : 'pl-4'}`}>
                 {line.replace(/^#+\s/, '')}
               </div>
             )
           })}
           {content.split('\n').filter(l => l.startsWith('#')).length === 0 && (
             <p className="text-gray-300 italic">Headings will appear here...</p>
           )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
