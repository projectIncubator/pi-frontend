import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

function Milestones({ id, contentProps, updateContent }) {
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
      id="milestones-input-field-header"
      label="Header"
      size="small"
      variant="outlined"
      value={content.header}
      onChange={(event) => handleChange(event, 'header')}
    />
  );
}

export default Milestones;
