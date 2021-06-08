import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

export default function Text({ id, contentProps, updateContent }) {
  const [content, setContent] = useState({ ...contentProps });

  useEffect(() => {
    updateContent(id, { ...content });
  }, [content, updateContent, id]);

  const handleChange = (event, target) => {
    const newContent = { ...content };
    newContent[target] = event.target.value;
    setContent(newContent);
  };

  return (
    <>
      <TextField
        id="header-input-field-text"
        label="Header"
        size="small"
        variant="outlined"
        value={content.header || ''}
        onChange={(event) => handleChange(event, 'header')}
      />
      <TextField
        id="content-input-field-text"
        label="Content"
        multiline
        rows={4}
        size="small"
        variant="outlined"
        value={content.text}
        onChange={(event) => handleChange(event, 'text')}
      />
    </>
  );
}
