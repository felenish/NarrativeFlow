import React, { useEffect } from 'react';
import { useBooksStore } from '../stores/booksStore';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const books = useBooksStore((state) => state.books);
  const fetchBooks = useBooksStore((state) => state.fetchBooks);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <aside className="sidebar">
      <h2>Narrative Flow</h2>
      <h3>Books</h3>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
