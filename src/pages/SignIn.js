import React, { useState } from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  TextField,
  Button,
  Typography,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
  Divider
} from '@material-ui/core';

import Logo from '../components/Logo';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import FacebookButton from '../components/FacebookButton';
import GoogleButton from '../components/GoogleButton';

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
    '& > *': {
      margin: theme.spacing(1, 0)
    }
  },
  signIn: {
    backgroundColor: theme.palette.primary.dark
  }
}));

function SignIn() {
  const classes = useStyles();

  const [state, setState] = useState({
    email: {
      value: '',
      error: false,
      errorText: ''
    },
    password: {
      value: '',
      show: false,
      error: false,
      errorText: ''
    }
  });

  const handleChange = (prop) => (newValue) => {
    setState({ ...state, [prop]: newValue });
  };

  const handleClickShowPassword = () => {
    setState({ ...state, [state.password.show]: ![state.password.show] });
  };

  function validateEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
    var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@:$!%*#?&])[A-Za-z\d@$!:%*#?&]{8,}$/;
    return re.test(String(password));
  }

  const validateForm = () => {
    let isError = false;

    const newState = { ...state };

    if (!validateEmail(state.email.value)) {
      isError = true;
      newState.email = {
        ...state.email,
        error: true,
        errorText: 'Needs to be a valid email address.'
      };
    }

    if (!validatePassword(state.password.value)) {
      isError = true;
      newState.password = {
        ...state.password,
        value: '',
        error: true,
        errorText: 'Needs to be a valid password.'
      };
    }

    if (!isError) {
      newState.email = { ...state.email, error: false, errorText: '' };
      newState.password = { ...state.password, error: false, errorText: '' };
    }

    setState(newState);
    return isError;
  };

  const submitLogin = (email, password) => {
    const err = validateForm();
    // if no err -> backend, else no
  };

  return (
    <div className={classes.root}>
      <div className={classes.leftChild}>
        <Logo size="large" color="white" />
        <Typography>
          Connect with others to work on meaningful projects today!
        </Typography>
      </div>
      <div className={classes.rightChild}>
        <h1> Welcome Back </h1>
        <div className={classes.buttons}>
          <FormControl>
            <TextField
              error={state.email.error}
              id="outlined-email"
              label="Email"
              variant="outlined"
              value={state.email.value}
              onChange={(e) =>
                handleChange('email')({ ...state.email, value: e.target.value })
              }
              helperText={state.email.errorText}
              required
            />
          </FormControl>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              error={state.password.error}
              id="outlined-adornment-password"
              type={state.password.show ? 'text' : 'password'}
              value={state.password.value}
              onChange={(e) =>
                handleChange('password')({
                  ...state.password,
                  value: e.target.value
                })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {state.password.show ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <FormHelperText id="my-helper-text" error>
              {state.password.errorText}
            </FormHelperText>
          </FormControl>
          <Button
            className={classes.signIn}
            onClick={() => submitLogin(state.email.value, state.password.value)}
          >
            Sign In
          </Button>
          <Divider variant="middle" />
          <FacebookButton>Sign in with Facebook</FacebookButton>
          <GoogleButton>Sign in with Google</GoogleButton>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
