import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  main: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    padding: 0
  },
  dragHandle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRight: `1px solid ${theme.palette.divider}`
  },
  openToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  content: {
    padding: theme.spacing(1),
    '&:last-child': {
      paddingBottom: 14
    }
  },
  type: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1)
  },
  header: {
    textTransform: 'capitalize',
    fontWeight: 400
  },
  additionalContent: {
    padding: theme.spacing(1)
  },
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(1),
    '& > *': {
      marginBottom: theme.spacing(1)
    }
  },
  deleteButton: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  editButton: {
    color: theme.palette.grey[400],
    cursor: 'pointer',
    marginRight: '4px',
    '&:hover': {
      color: theme.palette.grey[600]
    }
  }
}));
