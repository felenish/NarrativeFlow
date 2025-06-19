import React, { useEffect, useState } from 'react';
import { useBooksStore } from '../stores/booksStore';
import { useChaptersStore } from '../stores/chaptersStore';
import { useScenesStore } from '../stores/scenesStore';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const books = useBooksStore((state) => state.books);
  const fetchBooks = useBooksStore((state) => state.fetchBooks);
  const addBookAsync = useBooksStore((state) => state.addBookAsync);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const chapters = useChaptersStore((state) => state.chapters);
  const fetchChapters = useChaptersStore((state) => state.fetchChapters);
  const addChapterAsync = useChaptersStore((state) => state.addChapterAsync);
  const [chapterTitle, setChapterTitle] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  const scenes = useScenesStore((state) => state.scenes);
  const fetchScenes = useScenesStore((state) => state.fetchScenes);
  const addSceneAsync = useScenesStore((state) => state.addSceneAsync);
  const [sceneTitle, setSceneTitle] = useState('');
  const [sceneContent, setSceneContent] = useState('');

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    if (selectedBookId) fetchChapters(selectedBookId);
    setSelectedChapterId(null);
  }, [selectedBookId, fetchChapters]);

  useEffect(() => {
    if (selectedChapterId) fetchScenes(selectedChapterId);
  }, [selectedChapterId, fetchScenes]);

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !userId) return;
    await addBookAsync(title, userId);
    setTitle('');
  };

  const handleChapterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapterTitle || !selectedBookId) return;
    await addChapterAsync(chapterTitle, selectedBookId);
    setChapterTitle('');
  };

  const handleSceneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sceneTitle || !selectedChapterId) return;
    await addSceneAsync(sceneTitle, sceneContent, selectedChapterId);
    setSceneTitle('');
    setSceneContent('');
  };

  return (
    <aside className="sidebar">
      <h2>Narrative Flow</h2>
      <form onSubmit={handleBookSubmit} style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>
      <h3>Books</h3>
      <ul>
        {books.map((book) => (
          <li
            key={book.id}
            style={{ cursor: 'pointer', fontWeight: selectedBookId === book.id ? 'bold' : 'normal' }}
            onClick={() => setSelectedBookId(book.id)}
          >
            {book.title}
          </li>
        ))}
      </ul>
      {selectedBookId && (
        <>
          <form onSubmit={handleChapterSubmit} style={{ margin: '16px 0' }}>
            <input
              type="text"
              placeholder="Chapter title"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              required
            />
            <button type="submit">Add Chapter</button>
          </form>
          <h4>Chapters</h4>
          <ul>
            {chapters.map((chapter) => (
              <li
                key={chapter.id}
                style={{ cursor: 'pointer', fontWeight: selectedChapterId === chapter.id ? 'bold' : 'normal' }}
                onClick={() => setSelectedChapterId(chapter.id)}
              >
                {chapter.title}
              </li>
            ))}
          </ul>
        </>
      )}
      {selectedChapterId && (
        <>
          <form onSubmit={handleSceneSubmit} style={{ margin: '16px 0' }}>
            <input
              type="text"
              placeholder="Scene title"
              value={sceneTitle}
              onChange={(e) => setSceneTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Scene content"
              value={sceneContent}
              onChange={(e) => setSceneContent(e.target.value)}
              required
              rows={3}
            />
            <button type="submit">Add Scene</button>
          </form>
          <h4>Scenes</h4>
          <ul>
            {scenes.map((scene) => (
              <li key={scene.id}>{scene.title}</li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
