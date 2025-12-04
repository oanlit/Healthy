
import React from 'react';
import { MessageCircle, Heart, Share2, MoreHorizontal, Sprout } from 'lucide-react';

interface SocialProps {
  view?: 'feed' | 'treehole';
}

const Social: React.FC<SocialProps> = ({ view = 'feed' }) => {
  if (view === 'treehole') {
    return (
      <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center text-center p-8">
        <div className="bg-gradient-to-br from-green-50 to-cozy-green/20 p-12 rounded-[3rem] shadow-sm border border-white">
           <Sprout size={64} className="text-cozy-green mb-6 mx-auto animate-bounce" />
           <h2 className="text-3xl font-bold text-cozy-brown mb-4">The Tree Hole</h2>
           <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
             A quiet place to whisper your secrets, worries, or wishes. 
             No judgment, just listening. The wind will carry them away.
           </p>
           <button className="px-8 py-3 bg-cozy-green text-white rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform">
             Whisper a Secret
           </button>
        </div>
      </div>
    );
  }

  // Feed View (Talks/ShuoShuo)
  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cozy-text">Moments</h2>
        <button className="text-cozy-dark-pink font-bold hover:bg-white px-4 py-2 rounded-xl transition-colors">
          + New Moment
        </button>
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-panel p-6 rounded-3xl animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-start gap-4">
              <img src={`https://picsum.photos/id/${50 + i}/100/100`} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-cozy-text">User_{i}</h3>
                    <div className="text-xs text-gray-400">2 hours ago</div>
                  </div>
                  <button className="text-gray-300 hover:text-gray-500"><MoreHorizontal size={16}/></button>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Just finished a long coding session. The rain outside makes everything feel so peaceful. 🌧️☕
                  #Cozy #CodingLife
                </p>

                {i === 1 && (
                  <div className="grid grid-cols-2 gap-2 mb-4 rounded-xl overflow-hidden">
                     <img src="https://picsum.photos/id/40/300/200" className="w-full h-32 object-cover" />
                     <img src="https://picsum.photos/id/42/300/200" className="w-full h-32 object-cover" />
                  </div>
                )}

                <div className="flex gap-6 text-gray-400 text-sm">
                  <button className="flex items-center gap-1 hover:text-pink-500 transition-colors"><Heart size={16} /> 24</button>
                  <button className="flex items-center gap-1 hover:text-blue-500 transition-colors"><MessageCircle size={16} /> 5</button>
                  <button className="flex items-center gap-1 hover:text-green-500 transition-colors"><Share2 size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Social;
