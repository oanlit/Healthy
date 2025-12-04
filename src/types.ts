
export enum ViewState {
  HOME = 'HOME',
  ARTICLES = 'ARTICLES',
  ARTICLE_DETAIL = 'ARTICLE_DETAIL',
  TALKS = 'TALKS', // ShuoShuo
  TREE_HOLE = 'TREE_HOLE',
  ENTERTAINMENT = 'ENTERTAINMENT',
  TASKS = 'TASKS', // Check-in / Dashboard
  MESSAGES = 'MESSAGES',
  COLLECTIONS = 'COLLECTIONS',
  HISTORY = 'HISTORY',
  CREATION = 'CREATION',
  PROFILE = 'PROFILE',
}

export enum TaskType {
  TODO = 'TODO',
  HABIT = 'HABIT',
  EVENT = 'EVENT',
}

export enum TaskPriority {
  IMPORTANT_URGENT = 'IMPORTANT_URGENT',
  IMPORTANT_NOT_URGENT = 'IMPORTANT_NOT_URGENT',
  NOT_IMPORTANT_URGENT = 'NOT_IMPORTANT_URGENT',
  NOT_IMPORTANT_NOT_URGENT = 'NOT_IMPORTANT_NOT_URGENT',
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  date?: string; // ISO date string
  time?: string;
  tags: string[];
  type: TaskType;
  priority: TaskPriority;
  actionUrl?: string; // Redirect url or internal view state
  streak?: number; // For habits
  description?: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown
  coverImage: string;
  author: User;
  date: string;
  category?: string;
  tags: string[];
  likes: number;
  comments: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  signature?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url?: string;
  duration: string; // mm:ss
}
