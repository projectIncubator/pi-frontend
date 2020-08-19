import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    width: 780,
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
    background: '#efefef',
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
  header: {
    minHeight: 31.2,
    width: '100%',
    paddingRight: '50px',
    marginBottom: theme.spacing(1),
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    cursor: 'pointer'
  },
  headerInput: {
    marginRight: '50px',
    fontSize: '1.5rem',
    marginBottom: theme.spacing(1),
    padding: 0,
    height: '31.2px',
    letterSpacing: 0,
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    lineHeight: 1.333
  },
  headerInputBase: {
    padding: 0
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
