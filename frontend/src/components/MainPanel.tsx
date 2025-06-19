import React, { useState, useEffect } from 'react';
import { useScenesStore } from '../stores/scenesStore';
import EditorPane from './EditorPane';
import './MainPanel.css';

const MainPanel: React.FC = () => {
  // For demo: get the first scene (in a real app, use routing or selection)
  const scenes = useScenesStore((state) => state.scenes);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (scenes.length > 0 && !selectedSceneId) {
      setSelectedSceneId(scenes[0].id);
      setContent(scenes[0].content);
    }
    if (selectedSceneId) {
      const scene = scenes.find((s) => s.id === selectedSceneId);
      if (scene) setContent(scene.content);
    }
  }, [scenes, selectedSceneId]);

  const handleContentChange = (val: string) => {
    setContent(val);
    // TODO: Save to backend (auto-save or on blur)
  };

  if (!selectedSceneId) {
    return <div>Select a scene to start editing.</div>;
  }

  return (
    <div>
      <EditorPane value={content} onChange={handleContentChange} />
    </div>
  );
};

export default MainPanel;
