import React, { useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { marked } from 'marked';
import './EditorPane.css';

interface EditorPaneProps {
  value: string;
  onChange: (value: string) => void;
  branchId?: string; // TODO: wire up real branchId
  filePath?: string; // TODO: wire up real filePath (e.g. scene/chapter id)
  parentId?: string; // optional, for versioning
}

function getWordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function getCharCount(text: string) {
  return text.length;
}

function getReadingTime(text: string) {
  const wordsPerMinute = 200;
  const words = getWordCount(text);
  return Math.ceil(words / wordsPerMinute);
}

const EditorPane: React.FC<EditorPaneProps> = ({ value, onChange, branchId = 'demo-branch', filePath = 'scene.md', parentId }) => {
  const wordCount = getWordCount(value);
  const charCount = getCharCount(value);
  const readingTime = getReadingTime(value);

  // Auto-save logic
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastValue = useRef(value);

  useEffect(() => {
    if (lastValue.current !== value) {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        if (!branchId || !filePath) return;
        fetch('http://localhost:4000/api/commits/draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ branchId, parentId, content: value, filePath }),
        })
          .then(res => res.json())
          .then(data => console.log('Auto-saved draft:', data))
          .catch(err => console.error('Auto-save error:', err));
        lastValue.current = value;
      }, 1500);
    }
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [value, branchId, filePath, parentId]);

  // Manual commit handler
  const handleCommit = () => {
    if (!branchId || !filePath) return;
    const message = prompt('Commit message:', 'Milestone commit');
    if (!message) return;
    fetch('http://localhost:4000/api/commits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ branchId, parentId, content: value, filePath, message }),
    })
      .then(res => res.json())
      .then(data => {
        alert('Commit successful!');
        console.log('Manual commit:', data);
      })
      .catch(err => {
        alert('Commit failed!');
        console.error('Commit error:', err);
      });
  };

  return (
    <div className="editor-pane">
      <div className="editor-pane__editor">
        <CodeMirror
          value={value}
          height="300px"
          extensions={[markdown()]}
          onChange={onChange}
        />
        <div className="editor-pane__stats">
          <span>{wordCount} words</span> | <span>{charCount} chars</span> |{' '}
          <span>{readingTime} min read</span>
        </div>
        <button className="editor-pane__commit" onClick={handleCommit} style={{marginTop:8}}>
          Commit
        </button>
      </div>
      <div className="editor-pane__preview">
        <div dangerouslySetInnerHTML={{ __html: marked(value) }} />
      </div>
    </div>
  );
};

export default EditorPane;
