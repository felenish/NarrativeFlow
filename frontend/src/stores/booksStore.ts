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
}));
