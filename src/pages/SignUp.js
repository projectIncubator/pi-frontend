import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { TextField, Button, Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import Logo from '../components/Logo';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebookSquare} from "react-icons/all";

import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  leftChild: {
    width: '42%',
    backgroundColor: theme.palette.primary.dark,
    '& > *': {
      color: theme.palette.common.white
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > p': {
      margin: theme.spacing(20, 18, 20, 20),
      fontSize: '1.8rem'
    }
    // style={{ backgroundColor: '#228B22' }}
  },
  rightChild: {
    width: '58%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(0, 0, 11, 0)
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center', <- removing these made the button wide
    // alignItems: 'center',
    // '& *' everything under the parent including all the decendants
    // '& > div, button' everything under the parent that is a div or a button
    // '& > div:first-child' for the div that is the first child of the parent
    // '& > div:not(:first-child)' inverted condition of the above
    // '&:hover' when you hover over the parent -> do...
    // *** CSS Selectors React (W3 Schools)
    '& > *': {
      // Margin 1 value = margin all around
      // Margin 5px 2px = top bottom 5, left right 2
      // Margin 5px 2px 1px = top 5, left right 2 bottom 1
      // Margin 5px 2px 1px 0px = top right bottom left <-- same for padding
      margin: theme.spacing(1, 0)
    }
  }
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
}))(Button);


function SignIn(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
      <div className={classes.root}>
        <div className={classes.leftChild}>
          <Logo size="large" color="white" />
          <Typography>
            {' '}
            Connect with others to work on meaningful projects today!
          </Typography>
        </div>
        <div className={classes.rightChild}>
          <h1> Sign Up </h1>
          <div className={classes.buttons}>
            <FormControl>
              <TextField
                  id="outlined-email"
                  label="Email"
                  variant="outlined"
                  // required=true
              />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
              />
            </FormControl>
            <Button variant="contained" color="primary">
              Sign Up
            </Button>
            <Divider variant="middle" />
            <Button
                variant="contained"
                type="submit"
                color="secondary"
                startIcon={<FaGoogle />}
            >
              Sign up with Google
            </Button>
            <ColorButton variant="contained" color="primary" className={classes.margin} startIcon={<FaFacebookSquare/>}>
              Sign up with Facebook
            </ColorButton>
          </div>
        </div>
      </div>
  );
}

export default SignIn;