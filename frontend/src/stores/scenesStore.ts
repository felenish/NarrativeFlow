import { create } from 'zustand';

export interface Scene {
  id: string;
  title: string;
  content: string;
  chapterId: string;
}

interface ScenesState {
  scenes: Scene[];
  setScenes: (scenes: Scene[]) => void;
  fetchScenes: (chapterId: string) => Promise<void>;
  addSceneAsync: (title: string, content: string, chapterId: string) => Promise<void>;
}

export const useScenesStore = create<ScenesState>((set) => ({
  scenes: [],
  setScenes: (scenes) => set({ scenes }),
  fetchScenes: async (chapterId) => {
    const res = await fetch(`http://localhost:4000/api/scenes?chapterId=${chapterId}`);
    const data = await res.json();
    set({ scenes: data });
  },
  addSceneAsync: async (title, content, chapterId) => {
    const res = await fetch('http://localhost:4000/api/scenes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, chapterId }),
    });
    const scene = await res.json();
    set((state) => ({ scenes: [...state.scenes, scene] }));
  },
}));
