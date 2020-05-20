import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { TextField, Button, Typography } from '@material-ui/core';
import Logo from '../components/Logo';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
  }
}));

function SignIn(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
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

  const submitLogin = (email, password) => {
    // http call -> backend
    console.log(email);
    console.log(password);
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
        <h1> Welcome Back </h1>
        <div className={classes.buttons}>
          <FormControl>
            <TextField
              id="outlined-email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => submitLogin(email, values.password)}
          >
            Sign In
          </Button>
          <Divider variant="middle" />
          <FacebookButton>Sign up with Facebook</FacebookButton>
          <GoogleButton>Sign up with Google</GoogleButton>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
