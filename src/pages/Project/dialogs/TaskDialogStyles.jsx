import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    width: 750,
    height: 800,
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    border: 'none'
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    cursor: 'pointer'
  },
  sidebar: {
    height: '100%',
    width: 230,
    background: 'lightgrey',
    padding: theme.spacing(2)
  },
  mainbar: {
    height: '100%',
    flex: 1,
    padding: theme.spacing(2)
  },
  mainbarContent: {
    padding: 0,
    margin: 0,
    '& > div': {
      marginBottom: theme.spacing(1)
    }
  },
  descriptionContent: {
    background: '#efefef',
    borderRadius: 8,
    minHeight: 56,
    padding: theme.spacing(2)
  },
  commentHeader: {
    position: 'relative',
    display: 'flex',
    paddingLeft: theme.spacing(6)
  },
  commentAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    position: 'absolute',
    left: 0,
    top: 4
  },
  commentUser: {
    fontWeight: 'bold',
    paddingRight: theme.spacing(1)
  },
  commentDate: {
    lineHeight: 1.68
  },
  commentContent: {
    borderRadius: '6px',
    marginLeft: theme.spacing(6),
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1)
  }
}));
