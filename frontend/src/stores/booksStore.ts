import { create } from 'zustand';

export interface Book {
  id: string;
  title: string;
  userId: string;
}

interface BooksState {
  books: Book[];
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  fetchBooks: () => Promise<void>;
  addBookAsync: (title: string, userId: string) => Promise<void>;
}

export const useBooksStore = create<BooksState>((set) => ({
  books: [],
  setBooks: (books) => set({ books }),
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  fetchBooks: async () => {
    const res = await fetch('http://localhost:4000/api/books');
    const data = await res.json();
    set({ books: data });
  },
  addBookAsync: async (title, userId) => {
    const res = await fetch('http://localhost:4000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, userId }),
    });
    const book = await res.json();
    set((state) => ({ books: [...state.books, book] }));
  },
}));
