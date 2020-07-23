import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import DraftEditor from '../../../../../components/DraftEditor';

export default function General({ id, contentProps, updateContent }) {
  const [content, setContent] = useState({ ...contentProps });
  const [contentState, setContentState] = useState({});
  const [initialContent, setInitialContent] = useState(null);

  useEffect(() => {
    if (initialContent === null) {
      content.contentState
        ? setInitialContent(JSON.parse(content.contentState))
        : setInitialContent(false);
    }
  }, [content.contentState, initialContent]);

  useEffect(() => {
    if (Object.keys(contentState).length > 0) {
      setContent((oldContent) => ({
        ...oldContent,
        contentState: JSON.stringify(contentState)
      }));
    }
  }, [contentState]);

  useEffect(() => {
    updateContent(id, { ...content });
  }, [content, updateContent, id]);

  const handleUpdateHeader = (event) => {
    setContent({ ...content, header: event.target.value });
  };

  const handleUpdateContent = (newContent) => {
    setContentState(newContent);
  };

  return (
    <>
      <TextField
        id={`header-input-field-general-${id}`}
        label="Header"
        size="small"
        variant="outlined"
        value={content.header}
        onChange={(event) => handleUpdateHeader(event)}
      />
      <DraftEditor
        updateContent={(newContent) => handleUpdateContent(newContent)}
        existingContent={initialContent || null}
      />
    </>
  );
}
