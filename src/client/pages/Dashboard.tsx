
import React, { useState, useEffect } from 'react';
import { 
  Plus, Calendar as CalendarIcon, List, Grid, Clock, 
  Trash2, Filter, Tag, Check, MoreHorizontal, Play, Pause, RotateCcw,
  Inbox, Sun, Archive, ExternalLink, Flame, CheckCircle, Star
} from 'lucide-react';
import { Task, TaskType, TaskPriority } from '../../types';

// Mock Data
const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Trim nails, trim nose hair', completed: false, date: '2023-11-30', tags: ['Image Mgmt'], type: TaskType.HABIT, priority: TaskPriority.IMPORTANT_NOT_URGENT, description: 'Personal hygiene' },
  { id: '2', title: 'Drink Water (8 cups)', completed: true, date: '2023-11-30', tags: ['Health'], type: TaskType.HABIT, priority: TaskPriority.IMPORTANT_URGENT, streak: 5 },
  { id: '3', title: 'Write Blog Post about React', completed: false, date: '2023-12-01', tags: ['Work'], type: TaskType.TODO, priority: TaskPriority.IMPORTANT_URGENT, actionUrl: 'CREATION' },
  { id: '4', title: 'Practice Piano', completed: false, date: '2023-12-05', tags: ['Hobby'], type: TaskType.EVENT, priority: TaskPriority.NOT_IMPORTANT_NOT_URGENT },
  { id: '5', title: 'Read "Atomic Habits"', completed: false, tags: ['Reading'], type: TaskType.TODO, priority: TaskPriority.IMPORTANT_NOT_URGENT, actionUrl: 'http://books.google.com' },
];

interface DashboardProps {
  navigate: (view: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'LIST' | 'CHECKIN' | 'CALENDAR' | 'QUADRANT' | 'POMODORO'>('LIST');
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [filterMode, setFilterMode] = useState<'TODAY' | 'WEEK' | 'INBOX' | 'TRASH'>('TODAY');
  
  // Pomodoro State
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleTaskAction = (task: Task) => {
    if (task.actionUrl === 'CREATION') {
      navigate('CREATION');
    } else if (task.actionUrl === 'POMODORO') {
      setActiveTab('POMODORO');
    } else if (task.actionUrl && task.actionUrl.startsWith('http')) {
      window.open(task.actionUrl, '_blank');
    } else {
      toggleTask(task.id);
    }
  };

  // --- SUB-COMPONENTS ---

  const TaskItem = ({ task, minimal = false }: { task: Task, minimal?: boolean }) => (
    <div className={`
      group flex items-center justify-between p-3 mb-2 rounded-xl border transition-all duration-200
      ${task.completed ? 'bg-gray-50/50 border-gray-100 opacity-60' : 'bg-white/80 border-white shadow-sm hover:shadow-md hover:scale-[1.005]'}
    `}>
      <div className="flex items-center gap-3 overflow-hidden">
        <button 
          onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}
          className={`shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors
            ${task.completed ? 'bg-cozy-green border-cozy-green text-white' : 'border-gray-300 hover:border-cozy-dark-pink'}
          `}
        >
          {task.completed && <Check size={12} strokeWidth={3} />}
        </button>
        <div className="min-w-0">
          <h3 className={`text-sm font-medium truncate ${task.completed ? 'line-through text-gray-400' : 'text-cozy-text'}`}>{task.title}</h3>
          {!minimal && (
            <div className="flex items-center gap-2 mt-0.5">
               {task.tags.map(tag => (
                 <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-pink-50 text-pink-600 flex items-center gap-1">
                   <Tag size={8} /> {tag}
                 </span>
               ))}
               {task.date && <span className="text-[10px] text-gray-400 flex items-center gap-1"><CalendarIcon size={8}/>{task.date}</span>}
            </div>
          )}
        </div>
      </div>
      
      <div className={`flex items-center gap-2 ${minimal ? 'hidden' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`}>
         {task.actionUrl ? (
           <button 
            onClick={() => handleTaskAction(task)} 
            className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg text-xs flex items-center gap-1 bg-blue-50/50"
           >
             <ExternalLink size={12} /> Go
           </button>
         ) : (
           <button 
            className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"
           >
             <MoreHorizontal size={14} />
           </button>
         )}
      </div>
    </div>
  );

  const FilterSidebar = () => (
    <div className="w-full lg:w-64 flex-shrink-0 space-y-1 pr-2">
         {[
           { id: 'TODAY', label: 'Today', icon: Sun, color: 'text-amber-500' },
           { id: 'WEEK', label: 'Next 7 Days', icon: CalendarIcon, color: 'text-purple-500' },
           { id: 'INBOX', label: 'Inbox', icon: Inbox, color: 'text-blue-500' },
           { id: 'TRASH', label: 'Trash', icon: Trash2, color: 'text-gray-400' },
         ].map((filter) => (
           <button 
            key={filter.id} 
            onClick={() => setFilterMode(filter.id as any)}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 font-medium transition-all
              ${filterMode === filter.id ? 'bg-white shadow-sm text-cozy-text' : 'text-gray-500 hover:bg-white/40'}
            `}
           >
             <filter.icon size={18} className={filter.color} /> 
             <span>{filter.label}</span>
             <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-400">
               {tasks.length}
             </span>
           </button>
         ))}
         
         <div className="pt-6 mt-2">
           <div className="px-4 flex justify-between items-center mb-2">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Lists</p>
             <button className="text-gray-400 hover:text-cozy-dark-pink"><Plus size={14}/></button>
           </div>
           {['Work', 'Personal', 'Shopping', 'Wishlist'].map((list, i) => (
             <button key={list} className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-white/50 flex items-center gap-3">
               <span className={`w-2 h-2 rounded-full ${['bg-red-300', 'bg-green-300', 'bg-blue-300', 'bg-yellow-300'][i]}`} /> 
               {list}
             </button>
           ))}
         </div>
      </div>
  );

  const ListView = () => (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <FilterSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-cozy-text flex items-center gap-2">
            {filterMode === 'TODAY' && '☀️ Today'}
            {filterMode === 'WEEK' && '📅 Next 7 Days'}
            {filterMode === 'INBOX' && '📥 Inbox'}
            {filterMode === 'TRASH' && '🗑️ Trash'}
          </h2>
          <div className="flex gap-2">
            <button className="p-2 bg-white rounded-lg shadow-sm text-gray-500 hover:text-cozy-dark-pink"><Filter size={18} /></button>
            <button className="p-2 bg-white rounded-lg shadow-sm text-gray-500 hover:text-cozy-dark-pink"><MoreHorizontal size={18} /></button>
          </div>
        </div>
        
        {/* Add Task Input */}
        <div className="mb-4 bg-white/60 p-1.5 rounded-2xl shadow-sm border border-white flex focus-within:ring-2 ring-cozy-dark-pink/30 transition-all">
          <button className="p-3 text-cozy-dark-pink"><Plus /></button>
          <input 
            type="text" 
            placeholder="Add a task to Inbox..." 
            className="flex-1 bg-transparent outline-none text-cozy-text placeholder-gray-400 text-sm"
          />
          <div className="flex items-center gap-1 pr-2">
             <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400"><CalendarIcon size={16}/></button>
             <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400"><Tag size={16}/></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 pr-2 pb-20">
          {tasks.filter(t => !t.completed).map(t => <TaskItem key={t.id} task={t} />)}
          {tasks.filter(t => t.completed).length > 0 && (
            <div className="mt-6">
              <div className="px-2 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle size={12} /> Completed
              </div>
              <div className="opacity-60">
                {tasks.filter(t => t.completed).map(t => <TaskItem key={t.id} task={t} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const CheckInView = () => (
    <div className="h-full flex flex-col">
       <div className="flex justify-between items-end mb-6">
         <div>
           <h2 className="text-2xl font-bold text-cozy-text">Habit Tracker</h2>
           <p className="text-sm text-gray-500">Consistency is the key to growth.</p>
         </div>
         <button className="flex items-center gap-2 px-4 py-2 bg-cozy-dark-pink text-white rounded-xl shadow-md hover:bg-rose-400 transition-colors">
           <Plus size={18} /> New Habit
         </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-20">
         {tasks.filter(t => t.type === TaskType.HABIT).map(habit => (
           <div key={habit.id} className="bg-white/80 rounded-3xl p-5 border border-white shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-gray-100 rounded-full"><MoreHorizontal size={16}/></button>
             </div>
             
             <div className="flex items-start gap-4 mb-4">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${habit.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                 {habit.completed ? '🎉' : '🌱'}
               </div>
               <div>
                 <h3 className="font-bold text-lg text-cozy-text">{habit.title}</h3>
                 <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                   <Flame size={12} className="text-orange-400" fill="currentColor" /> 
                   {habit.streak || 0} Day Streak
                 </div>
               </div>
             </div>

             {/* Progress Bar Mockup */}
             <div className="w-full bg-gray-100 h-2 rounded-full mb-4 overflow-hidden">
               <div className="bg-cozy-green h-full rounded-full" style={{ width: '60%' }}></div>
             </div>

             <div className="flex gap-2">
                <button 
                  onClick={() => toggleTask(habit.id)}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all border-2
                    ${habit.completed 
                      ? 'bg-gray-100 text-gray-400 border-transparent cursor-default' 
                      : 'bg-white border-cozy-green text-cozy-green hover:bg-cozy-green hover:text-white'
                    }
                  `}
                >
                  {habit.completed ? 'Done Today' : 'Check In'}
                </button>
                {habit.actionUrl && (
                  <button onClick={() => handleTaskAction(habit)} className="px-3 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 border-2 border-transparent">
                    <ExternalLink size={18} />
                  </button>
                )}
             </div>
           </div>
         ))}
       </div>
    </div>
  );

  const CalendarView = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Mock calendar grid generation
    const renderCalendarGrid = () => {
      const slots = [];
      for(let i = 0; i < 35; i++) {
        const day = i - 2; // Offset for demo
        const isToday = day === 5; // Mock today
        const dayTasks = tasks.filter(t => parseInt(t.id) % 35 === i); // Randomly distribute
        
        slots.push(
          <div key={i} className={`min-h-[120px] border-r border-b border-gray-100/50 p-2 ${i < 7 ? 'border-t' : ''} ${i % 7 === 0 ? 'border-l' : ''} bg-white/40 hover:bg-white/80 transition-colors relative group`}>
            {day > 0 && day <= 31 && (
              <>
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-cozy-dark-pink text-white shadow-md' : 'text-gray-500'}`}>
                    {day}
                  </span>
                  <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-cozy-dark-pink"><Plus size={14} /></button>
                </div>
                <div className="mt-2 space-y-1">
                  {dayTasks.map(t => (
                    <div key={t.id} className={`text-[10px] px-2 py-1 rounded-md truncate cursor-pointer hover:opacity-80 shadow-sm
                      ${t.type === TaskType.HABIT ? 'bg-green-100 text-green-700' : 'bg-white text-gray-600 border border-gray-100'}
                    `}>
                      {t.title}
                    </div>
                  ))}
                  {isToday && <div className="text-[10px] px-2 py-1 rounded-md bg-yellow-100 text-yellow-700 shadow-sm">Shower & Change</div>}
                </div>
              </>
            )}
          </div>
        );
      }
      return slots;
    };

    return (
      <div className="h-full flex flex-col glass-panel rounded-3xl overflow-hidden shadow-sm border border-white/60">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-cozy-brown pl-2">December 2025</h2>
          <div className="flex bg-white/50 p-1 rounded-xl border border-white/50">
            <button className="px-3 py-1 text-sm bg-white rounded-lg shadow-sm font-medium text-gray-700">Month</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-white/50 rounded-lg">Week</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-white/50 rounded-lg">Day</button>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-white rounded-lg shadow-sm hover:text-cozy-dark-pink"><Filter size={18} /></button>
            <button className="px-3 py-1.5 bg-cozy-dark-pink text-white rounded-lg shadow-sm text-sm font-bold flex items-center gap-2"><Plus size={16}/> Add</button>
          </div>
        </div>
        <div className="grid grid-cols-7 bg-white/30 text-center py-3 text-xs font-bold text-gray-400 uppercase tracking-wide border-b border-gray-100">
          {days.map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 flex-1 overflow-y-auto">
          {renderCalendarGrid()}
        </div>
      </div>
    );
  };

  const PomodoroView = () => {
    useEffect(() => {
      let interval: any;
      if (isPomodoroActive && pomodoroTime > 0) {
        interval = setInterval(() => setPomodoroTime(t => t - 1), 1000);
      }
      return () => clearInterval(interval);
    }, [isPomodoroActive, pomodoroTime]);

    const fmt = (s: number) => {
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    return (
      <div className="flex flex-col lg:flex-row h-full gap-6">
        {/* Timer Section */}
        <div className="flex-1 glass-panel rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden border border-white/60">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-200 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex gap-4 mb-8 z-10">
             <button className="px-4 py-1 rounded-full bg-cozy-brown text-white text-sm font-medium">Pomodoro</button>
             <button className="px-4 py-1 rounded-full bg-white/50 text-gray-500 text-sm font-medium">Short Break</button>
             <button className="px-4 py-1 rounded-full bg-white/50 text-gray-500 text-sm font-medium">Long Break</button>
          </div>
          
          <div className="relative w-72 h-72 flex items-center justify-center z-10">
            {/* SVG Ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="144" cy="144" r="130" stroke="#fce7e7" strokeWidth="8" fill="transparent" />
              <circle cx="144" cy="144" r="130" stroke="#eebbba" strokeWidth="8" fill="transparent" strokeLinecap="round" strokeDasharray={2 * Math.PI * 130} strokeDashoffset={(2 * Math.PI * 130) * (1 - pomodoroTime / (25 * 60))} className="transition-all duration-1000" />
            </svg>
            <div className="absolute text-6xl font-mono text-cozy-brown font-bold tracking-widest">
              {fmt(pomodoroTime)}
            </div>
          </div>

          <div className="flex gap-6 mt-12 z-10">
            <button 
              onClick={() => setIsPomodoroActive(!isPomodoroActive)}
              className="w-32 py-4 bg-cozy-brown text-white rounded-2xl font-bold shadow-xl hover:bg-stone-700 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              {isPomodoroActive ? <Pause size={20} /> : <Play size={20} />}
              {isPomodoroActive ? 'PAUSE' : 'START'}
            </button>
            <button 
              onClick={() => { setIsPomodoroActive(false); setPomodoroTime(25*60); }}
              className="w-16 py-4 bg-white text-cozy-brown rounded-2xl shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Stats/Log Section */}
        <div className="w-full lg:w-96 glass-panel rounded-3xl p-6 flex flex-col border border-white/60">
          <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2"><Clock size={18}/> Focus Record</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/60 p-4 rounded-2xl text-center">
              <div className="text-3xl font-bold text-cozy-text">0</div>
              <div className="text-xs text-gray-500 font-medium uppercase mt-1">Today's Focus</div>
            </div>
            <div className="bg-white/60 p-4 rounded-2xl text-center">
               <div className="text-3xl font-bold text-cozy-text">13<span className="text-sm">h</span></div>
               <div className="text-xs text-gray-500 font-medium uppercase mt-1">Total Time</div>
            </div>
          </div>
          
          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recent Sessions</p>
            {[1,2,3].map(i => (
              <div key={i} className="flex gap-4 items-center p-3 bg-white/50 rounded-xl hover:bg-white transition-colors">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-700">Deep Work</div>
                  <div className="text-xs text-gray-500">Jan 5 • 25 mins</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const QuadrantView = () => (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full pb-6">
      <div className="bg-rose-50/80 rounded-3xl p-4 border border-rose-100 flex flex-col relative overflow-hidden">
        <div className="absolute right-0 top-0 p-4 opacity-10"><Flame size={100} /></div>
        <h3 className="text-rose-800 font-bold mb-3 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-rose-500"/> Important & Urgent</h3>
        <div className="flex-1 bg-white/50 rounded-2xl p-2 overflow-y-auto">
          {tasks.filter(t => t.priority === TaskPriority.IMPORTANT_URGENT).map(t => <TaskItem key={t.id} task={t} minimal />)}
        </div>
      </div>
      <div className="bg-blue-50/80 rounded-3xl p-4 border border-blue-100 flex flex-col relative overflow-hidden">
        <div className="absolute right-0 top-0 p-4 opacity-10"><Star size={100} /></div>
        <h3 className="text-blue-800 font-bold mb-3 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"/> Important & Not Urgent</h3>
        <div className="flex-1 bg-white/50 rounded-2xl p-2 overflow-y-auto">
          {tasks.filter(t => t.priority === TaskPriority.IMPORTANT_NOT_URGENT).map(t => <TaskItem key={t.id} task={t} minimal />)}
        </div>
      </div>
      <div className="bg-orange-50/80 rounded-3xl p-4 border border-orange-100 flex flex-col relative overflow-hidden">
        <div className="absolute right-0 top-0 p-4 opacity-10"><Clock size={100} /></div>
        <h3 className="text-orange-800 font-bold mb-3 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500"/> Not Important & Urgent</h3>
        <div className="flex-1 bg-white/50 rounded-2xl p-2 overflow-y-auto">
          {tasks.filter(t => t.priority === TaskPriority.NOT_IMPORTANT_URGENT).map(t => <TaskItem key={t.id} task={t} minimal />)}
        </div>
      </div>
      <div className="bg-gray-100/80 rounded-3xl p-4 border border-gray-200 flex flex-col relative overflow-hidden">
        <div className="absolute right-0 top-0 p-4 opacity-10"><Trash2 size={100} /></div>
        <h3 className="text-gray-800 font-bold mb-3 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-500"/> Not Important & Not Urgent</h3>
        <div className="flex-1 bg-white/50 rounded-2xl p-2 overflow-y-auto">
           {tasks.filter(t => t.priority === TaskPriority.NOT_IMPORTANT_NOT_URGENT).map(t => <TaskItem key={t.id} task={t} minimal />)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      {/* Dashboard Nav */}
      <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-1 hide-scrollbar bg-white/30 p-1.5 rounded-2xl backdrop-blur-sm self-start">
        <button onClick={() => setActiveTab('LIST')} className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'LIST' ? 'bg-white text-cozy-text shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}><List size={16}/> Tasks</button>
        <button onClick={() => setActiveTab('CHECKIN')} className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'CHECKIN' ? 'bg-white text-cozy-text shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}><Check size={16}/> Habits</button>
        <button onClick={() => setActiveTab('CALENDAR')} className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'CALENDAR' ? 'bg-white text-cozy-text shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}><CalendarIcon size={16}/> Calendar</button>
        <button onClick={() => setActiveTab('QUADRANT')} className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'QUADRANT' ? 'bg-white text-cozy-text shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}><Grid size={16}/> Matrix</button>
        <button onClick={() => setActiveTab('POMODORO')} className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'POMODORO' ? 'bg-white text-cozy-text shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}><Clock size={16}/> Focus</button>
      </div>

      {/* Content */}
      <div className="flex-1 relative animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'LIST' && <ListView />}
        {activeTab === 'CHECKIN' && <CheckInView />}
        {activeTab === 'CALENDAR' && <CalendarView />}
        {activeTab === 'POMODORO' && <PomodoroView />}
        {activeTab === 'QUADRANT' && <QuadrantView />}
      </div>
    </div>
  );
};

export default Dashboard;
