import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    maxWidth: '100%'
  },
  block: {
    marginBottom: theme.spacing(2)
  },
  paragraph: {
    // overflowWrap: 'break-word'
  },
  span: {
    display: 'inline-block',
    maxWidth: '100%',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic'
  },
  underline: {
    textDecoration: 'underline'
  },
  mono: {
    fontFamily: 'monospace'
  },
  blockquote: {
    width: 'auto',
    marginLeft: theme.spacing(4),
    padding: theme.spacing(2),
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    background: theme.palette.grey[100],
    borderRadius: 4
  }
}));

export default function DraftRenderer({ blocks }) {
  const classes = useStyles();
  let listItems = [];

  const renderText = (block) => {
    const { inlineStyleRanges, text } = block;
    const styles = [...inlineStyleRanges];
    const textFrags = {};

    if (styles && styles.length > 0) {
      textFrags[0] = {
        text: '',
        style: []
      };
      textFrags[text.length] = {
        text: '',
        style: []
      };

      // create the breakpoints
      styles.map((el) => {
        const keys = Object.keys(textFrags);
        if (!keys.includes(el.offset.toString())) {
          textFrags[el.offset] = { style: [] };
        }
        if (!keys.includes((el.offset + el.length).toString())) {
          textFrags[el.offset + el.length] = { style: [] };
        }
      });

      const breakpoints = Object.keys(textFrags);

      // supply each breakpoint with styles
      styles.map((el) =>
        breakpoints
          .filter(
            (item) =>
              parseInt(item) >= el.offset &&
              parseInt(item) < el.offset + el.length
          )
          .map((key) => textFrags[key].style.push(el.style))
      );

      // supply each breakpoint with text
      for (let i = 0; i < breakpoints.length; i++) {
        textFrags[breakpoints[i]].text = text.slice(
          breakpoints[i],
          breakpoints[i + 1]
        );
      }
    } else {
      textFrags[0] = { text, style: [] };
    }

    return (
      <>
        {Object.keys(textFrags).map((el, index) => {
          const { text, style } = textFrags[el];
          return (
            <span
              key={index}
              className={`${classes.span} ${
                style.includes('BOLD') && classes.bold
              } ${style.includes('ITALIC') && classes.italic} ${
                style.includes('UNDERLINE') && classes.underline
              } ${style.includes('CODE') && classes.mono}`}
            >
              {text}
            </span>
          );
        })}
      </>
    );
  };

  const renderBlock = (block, index, length) => {
    const { type } = block;
    switch (type) {
      case 'unstyled':
        return (
          <Typography className={classes.paragraph} variant="body1">
            {renderText(block)}
          </Typography>
        );
      case 'header-one':
        return (
          <Typography variant="h4" component="h1">
            {renderText(block)}
          </Typography>
        );
      case 'header-two':
        return (
          <Typography variant="h5" component="h2">
            {renderText(block)}
          </Typography>
        );
      case 'header-three':
        return (
          <Typography variant="h6" component="h3">
            {renderText(block)}
          </Typography>
        );
      case 'blockquote':
        return (
          <div className={classes.blockquote}>
            <Typography variant="body1">{renderText(block)}</Typography>
          </div>
        );
      case 'unordered-list-item':
        listItems.push(block);
        if (
          index === length - 1 ||
          blocks[index + 1].type !== 'unordered-list-item'
        ) {
          const renderListItems = (
            <ul>
              {listItems.map((el, idx) => (
                <li key={idx}>{renderText(el)}</li>
              ))}
            </ul>
          );
          listItems = [];
          return renderListItems;
        }
        return;
      case 'ordered-list-item':
        listItems.push(block);
        if (
          index === length - 1 ||
          blocks[index + 1].type !== 'ordered-list-item'
        ) {
          const renderListItems = (
            <ol>
              {listItems.map((el, idx) => (
                <li key={idx}>{renderText(el)}</li>
              ))}
            </ol>
          );
          listItems = [];
          return renderListItems;
        }
        return;
      default:
        return;
    }
  };

  return (
    <div className={classes.content}>
      {blocks.map((el, index) => {
        const { length } = blocks;
        return (
          <div key={el.key} className={classes.block}>
            {renderBlock(el, index, length)}
          </div>
        );
      })}
    </div>
  );
}
