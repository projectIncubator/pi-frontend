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
  }
}));

export const getListStyle = (isDraggingOver) => ({
  minHeight: '500px',
  maxHeight: '500px',
  overflowY: 'auto',
  background: isDraggingOver ? 'lightgrey' : ''
});
