import React, { useEffect, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import { makeStyles, Paper, Typography } from '@material-ui/core';

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' }
];

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' }
];

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    minWidth: '600px',
    minHeight: '500px'
  },
  button: {
    marginRight: theme.spacing(1)
  }
}));

export default function DraftEditor({ updateContent, existingContent }) {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (existingContent) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(existingContent))
      );
    }
  }, [existingContent]);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleChange = (event) => {
    updateContent(convertToRaw(editorState.getCurrentContent()));
    setEditorState(event);
  };

  const StyleButton = ({ onToggle, label, style }) => {
    const handleToggle = (event) => {
      event.preventDefault();
      onToggle(style);
    };

    return (
      <span className={classes.button} onMouseDown={handleToggle}>
        {label}
      </span>
    );
  };

  const BlockStyleControls = ({ editorState, onToggle }) => {
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div>
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            onToggle={onToggle}
            label={type.label}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  return (
    <Paper className={classes.root} elevation={0} variant="outlined">
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />

      {/*<InlineStyleControls editorState={editorState} />*/}
      <div>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={handleChange}
        />
      </div>
      {/*<button onClick={save}>Save</button>*/}
      {/*<div>{Object.keys(saved).length > 0 && renderSaved()}</div>*/}
    </Paper>
  );
}
