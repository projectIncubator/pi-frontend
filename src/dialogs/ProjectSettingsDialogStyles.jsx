import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  dialogContent: {
    paddingTop: theme.spacing(2),
    minWidth: 780,
    minHeight: 560,
    maxHeight: 560
  },
  headerPaper: {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none'
  },
  availableModules: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  card: {
    width: 175,
    borderRadius: 4
  },
  switch: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export const getListStyle = (isDraggingOver) => ({
  minHeight: '500px',
  maxHeight: '500px',
  overflowY: 'auto',
  background: isDraggingOver ? 'lightblue' : ''
});
