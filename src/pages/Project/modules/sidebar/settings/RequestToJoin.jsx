import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

export default function RequestToJoin({ id, contentProps, updateContent }) {
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
    <TextField
      id="header-input-field-button"
      label="Header"
      size="small"
      variant="outlined"
      value={content.header}
      onChange={(event) => handleChange(event, 'header')}
    />
  );
}
