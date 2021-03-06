import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  column: {
    background: theme.palette.background.paper,
    padding: theme.spacing(1),
    minWidth: 260,
    maxWidth: 260,
    borderRadius: 4
  },
  columnHeader: {},
  droppableGrid: {
    borderRadius: 4,
    minHeight: 1,
    '& > div': {
      marginTop: theme.spacing(1)
    }
  },
  headerText: {
    wordWrap: 'break-word',
    wordBreak: 'break-all'
  },
  headerInput: {
    fontSize: '1.25rem',
    fontWeight: 500,
    letterSpacing: '0.0075em',
    lineHeight: 1.6,
    wordWrap: 'break-word',
    wordBreak: 'break-all'
  },
  headerMultiline: {
    padding: 0
  },
  new: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    cursor: 'pointer',
    borderRadius: 4,
    '&:hover': {
      background: '#efefef'
    }
  }
}));
