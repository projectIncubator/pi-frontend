import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { TextField, Button, Typography } from '@material-ui/core';
import Logo from '../components/Logo';
// import { FaGoogle } from 'react-icons/fa';

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

function SignUp(props) {
  const state = [
    'credentials', // Credentials is where the user provides their login information (email, password)
    'name' // Name is where the user provides First Name, Last Name
  ];
  const [progress, setProgress] = useState(state[0]);
  const classes = useStyles();
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  });

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const submitFields = (email, password, firstName, lastName) => {
    // http call -> backend
    console.log(email);
    console.log(password);
    console.log(firstName);
    console.log(lastName);
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
          {progress === 'credentials' && (
            <>
              <FormControl>
                <TextField
                  id="outlined-email"
                  label="Email"
                  variant="outlined"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput //TODO: At password pressing tab should bring you straight to the submit button
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setProgress(state[1])}
              >
                Sign Up
              </Button>
              <Divider variant="middle" />
              <FacebookButton>Sign up with Facebook</FacebookButton>
              <GoogleButton>Sign up with Google</GoogleButton>
            </>
          )}
          {progress === 'name' && (
            <>
              <FormControl>
                <TextField
                  id="outlined-firstname"
                  label="FirstName"
                  variant="outlined"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="outlined-LastName"
                  label="LastName"
                  variant="outlined"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  submitFields(email, values.password, firstName, lastName)
                }
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
