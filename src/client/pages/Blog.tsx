
import React from 'react';
import { Clock, MessageSquare, Heart, Share2, ChevronRight, Hash, Eye, User, Calendar } from 'lucide-react';
import { Article, ViewState } from '../../types';

interface BlogProps {
  view: 'list' | 'detail';
  navigate: (view: ViewState) => void;
}

const MOCK_ARTICLE: Article = {
  id: '1',
  title: 'From Scratch: Building Your Own Music Player',
  summary: 'A journey through React, Web Audio API, and designing a cozy interface for music lovers.',
  content: `
# Introduction

**Have you ever wondered how music apps work?**

Those jumping frequencies, precise progress bars, and randomized playlists... they aren't magic, but lines of code weaving a symphony.

In this series, we will transform from listener to creator. We will build a music player that belongs to you, running right in your browser.

## This Journey is Designed For You

* If you've never coded: Welcome! This is a perfect starting point.
* If you have played with React: Great! We will put your skills into practice.
* If you want to understand the Web Audio API: We will dive deep.

## What we will build

1. A beautiful playlist.
2. Smooth playback controls.
3. A dynamic visualizer.
  `.trim(),
  coverImage: 'https://picsum.photos/id/180/800/400',
  author: { id: '1', name: 'Sakura', avatar: 'https://picsum.photos/id/64/100/100' },
  date: '2024-01-05',
  tags: ['React', 'Music', 'Tutorial'],
  likes: 128,
  comments: 32,
  category: 'Tech'
};

const Blog: React.FC<BlogProps> = ({ view, navigate }) => {
  
  if (view === 'list') {
    return (
      <div className="pb-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-cozy-brown mb-2">Reading Garden</h1>
            <p className="text-gray-500">Explore thoughts, stories, and technical journeys.</p>
          </div>
          <div className="flex gap-2">
            {['Tech', 'Life', 'Music', 'Design'].map(cat => (
              <button key={cat} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 hover:bg-cozy-pink hover:text-cozy-dark-pink transition-colors shadow-sm">
                #{cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[MOCK_ARTICLE, MOCK_ARTICLE, MOCK_ARTICLE, MOCK_ARTICLE].map((article, i) => (
            <div 
              key={i} 
              onClick={() => navigate(ViewState.ARTICLE_DETAIL)}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-cozy-text shadow-sm">
                  {article.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-blue-400">#{tag}</span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-cozy-text mb-3 leading-snug group-hover:text-cozy-dark-pink transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-gray-400 text-xs">
                   <div className="flex items-center gap-2">
                     <img src={article.author.avatar} className="w-6 h-6 rounded-full" />
                     <span className="font-medium text-gray-600">{article.author.name}</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <span className="flex items-center gap-1"><Heart size={14} /> {article.likes}</span>
                     <span className="flex items-center gap-1"><MessageSquare size={14} /> {article.comments}</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // DETAIL VIEW
  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-20 max-w-6xl mx-auto">
      {/* Left Sidebar: Author & Info */}
      <div className="hidden lg:block w-64 shrink-0 space-y-6">
        <div className="glass-panel p-6 rounded-3xl text-center">
           <img src={MOCK_ARTICLE.author.avatar} className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white shadow-md" />
           <h3 className="font-bold text-lg text-cozy-text">{MOCK_ARTICLE.author.name}</h3>
           <p className="text-xs text-gray-500 mb-4">Frontend Developer & Dreamer</p>
           <button className="w-full py-2 bg-cozy-dark-pink text-white rounded-xl font-bold text-sm shadow-md hover:opacity-90">Follow</button>
        </div>
        
        <div className="glass-panel p-6 rounded-3xl sticky top-24">
          <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-4">Table of Contents</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="pl-2 border-l-2 border-cozy-dark-pink text-cozy-dark-pink font-medium">Introduction</li>
            <li className="pl-2 border-l-2 border-transparent hover:border-gray-300 cursor-pointer">This Journey is Designed For You</li>
            <li className="pl-2 border-l-2 border-transparent hover:border-gray-300 cursor-pointer">What we will build</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] shadow-sm mb-8">
          {/* Header */}
          <div className="mb-8">
             <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-lg text-xs font-bold">{MOCK_ARTICLE.category}</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs flex items-center gap-1"><Calendar size={12}/> {MOCK_ARTICLE.date}</span>
             </div>
             <h1 className="text-3xl md:text-4xl font-bold text-cozy-brown mb-6 leading-tight">{MOCK_ARTICLE.title}</h1>
             <img src={MOCK_ARTICLE.coverImage} className="w-full h-[300px] object-cover rounded-2xl mb-8 shadow-md" />
          </div>

          {/* Markdown Content Area */}
          <div className="prose prose-stone prose-lg max-w-none text-gray-600">
            {MOCK_ARTICLE.content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold text-cozy-brown mt-8 mb-4">{line.replace('# ', '')}</h1>
              if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-cozy-brown mt-6 mb-3">{line.replace('## ', '')}</h2>
              if (line.startsWith('* ')) return <li key={i} className="list-disc ml-5 mb-2">{line.replace('* ', '')}</li>
              if (line.match(/^\d\./)) return <div key={i} className="ml-5 mb-2 font-medium text-cozy-dark-pink">{line}</div>
              if (line === '') return <br key={i} />
              return <p key={i} className="mb-4 leading-relaxed">{line}</p>
            })}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-pink-500 font-bold hover:bg-pink-100 transition-colors">
                <Heart size={20} fill="currentColor" /> 128
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors">
                <Share2 size={20} /> Share
              </button>
            </div>
            <p className="text-sm text-gray-400">Read 324 times</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="glass-panel p-8 rounded-[2.5rem]">
          <h3 className="text-xl font-bold text-cozy-brown mb-6">Comments (32)</h3>
          
          <div className="flex gap-4 mb-8">
            <img src="https://picsum.photos/id/100/100/100" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <textarea 
                placeholder="Write a heartwarming comment..." 
                className="w-full bg-white/50 border border-white rounded-xl p-4 text-sm focus:ring-2 ring-cozy-dark-pink/30 outline-none resize-none h-24"
              ></textarea>
              <div className="flex justify-end mt-2">
                <button className="px-6 py-2 bg-cozy-brown text-white rounded-lg text-sm font-bold hover:opacity-90">Post</button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="flex gap-4">
                <img src={`https://picsum.photos/id/${10 + i}/100/100`} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="bg-white/60 p-4 rounded-2xl rounded-tl-none text-sm text-gray-600 mb-1">
                    <span className="font-bold text-cozy-text block mb-1">Visitor {i}</span>
                    This is such a lovely article! I really want to try building this myself. The design is so cozy.
                  </div>
                  <div className="flex gap-4 text-xs text-gray-400 pl-2">
                    <button className="hover:text-cozy-dark-pink">Reply</button>
                    <span>2 hours ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
