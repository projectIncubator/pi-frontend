import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

export default function Membership({ id, contentProps, updateContent }) {
  const [content, setContent] = useState({ ...contentProps });

  useEffect(() => {
    updateContent(id, { ...content });
  }, [content]);

  const handleChange = (event, target) => {
    const newContent = { ...content };
    newContent[target] = event.target.value;
    setContent(newContent);
  };

  return (
    <TextField
      id="header-input-field-membership"
      label="Header"
      size="small"
      variant="outlined"
      value={content.header}
      onChange={(event) => handleChange(event, 'header')}
    />
  );
}
