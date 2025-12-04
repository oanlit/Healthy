
import React, { useState, useEffect } from 'react';
import { 
  Home, BookOpen, MessageCircle, Heart, Music, 
  Search, Bell, Bookmark, History, PenTool, 
  CheckCircle, User as UserIcon, Settings,
  Menu, X, Sprout, Mail, Star
} from 'lucide-react';
import { ViewState } from '../types';

// Page Imports
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import Entertainment from './pages/Entertainment';
import Editor from './pages/Editor';
import Social from './pages/Social';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import { getGeminiCompanionResponse } from '../api/backend/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [companionMessage, setCompanionMessage] = useState<string>('');
  const [showCompanion, setShowCompanion] = useState(false);

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => (
    <button 
      onClick={() => navigate(view)}
      className={`
        group relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300
        ${currentView === view ? 'text-cozy-dark-pink' : 'text-gray-500 hover:text-cozy-text hover:bg-white/40'}
      `}
    >
      <div className={`p-2 rounded-full transition-all ${currentView === view ? 'bg-cozy-dark-pink/10 scale-110' : 'group-hover:scale-110'}`}>
        <Icon size={20} strokeWidth={currentView === view ? 2.5 : 2} />
      </div>
      <span className="text-xs font-medium opacity-80">{label}</span>
      {currentView === view && (
        <span className="absolute -bottom-1 w-1 h-1 bg-cozy-dark-pink rounded-full" />
      )}
    </button>
  );

  const ActionIcon = ({ icon: Icon, onClick, tooltip }: { icon: any, onClick?: () => void, tooltip: string }) => (
    <div className="group relative flex flex-col items-center">
      <button 
        onClick={onClick} 
        className="p-2 text-gray-400 hover:text-cozy-dark-pink hover:bg-cozy-dark-pink/10 rounded-full transition-all"
      >
        <Icon size={18} />
      </button>
      <span className="absolute -top-8 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {tooltip}
      </span>
    </div>
  );

  // AI Companion Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCompanionMessage("Welcome back! How are you feeling today?");
      setShowCompanion(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCompanionClick = async () => {
    setCompanionMessage("Listening...");
    const msg = await getGeminiCompanionResponse("Give me a warm, healing quote for today.", currentView);
    setCompanionMessage(msg);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-cozy-text selection:bg-cozy-dark-pink selection:text-white">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 glass-panel h-20 px-4 md:px-8 flex items-center justify-between shadow-sm transition-all">
        
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate(ViewState.HOME)}>
            <div className="w-10 h-10 bg-gradient-to-br from-cozy-dark-pink to-rose-300 rounded-xl flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform">
              <Heart size={20} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-cozy-brown leading-none">CozyLife</span>
              <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Healing Space</span>
            </div>
          </div>

          <div className="hidden md:flex items-center bg-white/60 rounded-full px-4 py-2 border border-white/50 focus-within:ring-2 ring-cozy-dark-pink/20 transition-all w-64">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for healing..." 
              className="bg-transparent border-none outline-none text-sm ml-2 w-full placeholder-gray-400 text-gray-600"
            />
          </div>
        </div>

        {/* Center: Main Nav */}
        <div className="hidden lg:flex items-center gap-2 bg-white/40 p-1.5 rounded-2xl border border-white/60 backdrop-blur-md shadow-sm">
          <NavItem view={ViewState.HOME} icon={Home} label="Home" />
          <NavItem view={ViewState.ARTICLES} icon={BookOpen} label="Articles" />
          <NavItem view={ViewState.TALKS} icon={MessageCircle} label="Talks" />
          <NavItem view={ViewState.TREE_HOLE} icon={Sprout} label="Tree Hole" />
          <NavItem view={ViewState.ENTERTAINMENT} icon={Music} label="Relax" />
        </div>

        {/* Right: User & Actions */}
        <div className="flex items-center gap-3">
          {/* Action Icons Group */}
          <div className="hidden md:flex items-center gap-1 pr-4 border-r border-gray-200/60 mr-2">
             <ActionIcon icon={CheckCircle} onClick={() => navigate(ViewState.TASKS)} tooltip="Check-in" />
             <ActionIcon icon={Mail} onClick={() => navigate(ViewState.MESSAGES)} tooltip="Messages" />
             <ActionIcon icon={Star} onClick={() => navigate(ViewState.COLLECTIONS)} tooltip="Collections" />
             <ActionIcon icon={History} onClick={() => navigate(ViewState.HISTORY)} tooltip="History" />
             <ActionIcon icon={PenTool} onClick={() => navigate(ViewState.CREATION)} tooltip="Create" />
          </div>

          {/* User Profile */}
          <div 
            className="flex items-center gap-3 pl-2 cursor-pointer group"
            onClick={() => navigate(ViewState.PROFILE)}
          >
            <div className="relative">
               <img 
                src="https://picsum.photos/id/64/100/100" 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm group-hover:scale-105 transition-transform object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-cozy-green text-[8px] text-white px-1.5 py-0.5 rounded-full border border-white">Lv.3</div>
            </div>
            <div className="hidden xl:flex flex-col">
              <span className="text-sm font-bold text-cozy-brown group-hover:text-cozy-dark-pink transition-colors">Sakura</span>
              <span className="text-[10px] text-gray-400">Keep blooming</span>
            </div>
          </div>

          <button className="lg:hidden p-2 text-gray-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-2 overflow-y-auto">
           {[
             {v: ViewState.HOME, l: 'Home', i: Home},
             {v: ViewState.ARTICLES, l: 'Articles', i: BookOpen},
             {v: ViewState.TALKS, l: 'Talks', i: MessageCircle},
             {v: ViewState.TREE_HOLE, l: 'Tree Hole', i: Sprout},
             {v: ViewState.TASKS, l: 'Check-in', i: CheckCircle},
             {v: ViewState.ENTERTAINMENT, l: 'Relax', i: Music},
             {v: ViewState.CREATION, l: 'Create', i: PenTool},
             {v: ViewState.PROFILE, l: 'Profile', i: UserIcon},
           ].map(item => (
             <button 
                key={item.v}
                onClick={() => navigate(item.v)}
                className={`flex items-center gap-4 p-4 rounded-2xl ${currentView === item.v ? 'bg-cozy-pink text-cozy-dark-pink font-bold' : 'hover:bg-gray-50'}`}
             >
               <item.i size={24} /> {item.l}
             </button>
           ))}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 lg:px-8 max-w-screen-2xl mx-auto w-full transition-all duration-500">
        {currentView === ViewState.HOME && <Landing navigate={navigate} />}
        {currentView === ViewState.ARTICLES && <Blog view="list" navigate={navigate} />}
        {currentView === ViewState.ARTICLE_DETAIL && <Blog view="detail" navigate={navigate} />}
        {currentView === ViewState.TASKS && <Dashboard navigate={navigate} />}
        {currentView === ViewState.ENTERTAINMENT && <Entertainment />}
        {currentView === ViewState.CREATION && <Editor navigate={navigate} />}
        {currentView === ViewState.TALKS && <Social view="feed" />}
        {currentView === ViewState.TREE_HOLE && <Social view="treehole" />}
        {currentView === ViewState.PROFILE && <Profile />}
        {/* Placeholders for new routes */}
        {(currentView === ViewState.MESSAGES || currentView === ViewState.COLLECTIONS || currentView === ViewState.HISTORY) && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Sprout size={48} className="mb-4 text-cozy-green" />
            <p>This garden is still growing...</p>
          </div>
        )}
      </main>

      {/* AI Companion Floating Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3 group">
        {showCompanion && companionMessage && (
          <div className="bg-white/90 backdrop-blur p-4 rounded-2xl rounded-tr-sm shadow-xl border border-cozy-pink text-sm max-w-xs animate-in slide-in-from-bottom-5 fade-in duration-500 relative">
             <div className="absolute -right-2 top-4 w-4 h-4 bg-white transform rotate-45 border-r border-t border-cozy-pink"></div>
             <p className="text-cozy-brown leading-relaxed relative z-10">{companionMessage}</p>
          </div>
        )}
        <button 
          onClick={handleCompanionClick}
          className="w-16 h-16 bg-gradient-to-br from-cozy-dark-pink to-rose-400 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-105 hover:-rotate-12 transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>
          <span className="text-3xl relative z-10">🐰</span>
        </button>
      </div>
    </div>
  );
};

export default App;
