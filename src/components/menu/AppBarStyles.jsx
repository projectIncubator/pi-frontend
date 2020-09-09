import {
  Fade,
  fade,
  makeStyles,
  Menu,
  MenuItem as MUIMenuItem,
  withStyles
} from '@material-ui/core';
import React from 'react';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolBar: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between'
  },
  navigation: {
    flex: 1
  },
  menu: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  menuItems: {
    display: 'flex',
    alignItems: 'center',
    '& > a:not(:first-child)': {
      marginLeft: theme.spacing(3)
    },
    '& > a': {
      color: theme.palette.text.secondary,
      '&:hover': {
        color: theme.palette.text.primary
      }
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    fontSize: '1rem',
    padding: theme.spacing(1, 2)
  },
  buttonsContainer: {
    margin: theme.spacing(0, 1, 0, 0)
  },
  authButtons: {
    '& > * + *': {
      margin: theme.spacing(0, 1)
    }
  },
  accountButton: {
    borderColor: theme.palette.action.disabled,
    '& svg': {
      color: theme.palette.text.secondary
    }
  },
  menuList: {
    padding: theme.spacing(0),
    width: '220px',
    '&:focus': {
      outline: 'none'
    }
  },
  divider: {
    margin: theme.spacing(1, 0)
  }
}));

export const StyledMenu = withStyles((theme) => ({
  paper: {
    // borderTop: 'none',
    marginTop: '14px',
    borderRadius: '4px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10'
    }
  }
}))((props) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    TransitionComponent={Fade}
    {...props}
  />
));

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    height: 40
  }
}))(MUIMenuItem);
