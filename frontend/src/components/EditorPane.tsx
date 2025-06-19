import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { marked } from 'marked';
import './EditorPane.css';

interface EditorPaneProps {
  value: string;
  onChange: (value: string) => void;
}

const EditorPane: React.FC<EditorPaneProps> = ({ value, onChange }) => {
  return (
    <div className="editor-pane">
      <div className="editor-pane__editor">
        <CodeMirror
          value={value}
          height="300px"
          extensions={[markdown()]}
          onChange={onChange}
        />
      </div>
      <div className="editor-pane__preview">
        <div dangerouslySetInnerHTML={{ __html: marked(value) }} />
      </div>
    </div>
  );
};

export default EditorPane;
