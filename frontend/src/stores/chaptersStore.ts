import { create } from 'zustand';

export interface Chapter {
  id: string;
  title: string;
  bookId: string;
}

interface ChaptersState {
  chapters: Chapter[];
  setChapters: (chapters: Chapter[]) => void;
  fetchChapters: (bookId: string) => Promise<void>;
  addChapterAsync: (title: string, bookId: string) => Promise<void>;
}

export const useChaptersStore = create<ChaptersState>((set) => ({
  chapters: [],
  setChapters: (chapters) => set({ chapters }),
  fetchChapters: async (bookId) => {
    const res = await fetch(`http://localhost:4000/api/chapters?bookId=${bookId}`);
    const data = await res.json();
    set({ chapters: data });
  },
  addChapterAsync: async (title, bookId) => {
    const res = await fetch('http://localhost:4000/api/chapters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, bookId }),
    });
    const chapter = await res.json();
    set((state) => ({ chapters: [...state.chapters, chapter] }));
  },
}));
