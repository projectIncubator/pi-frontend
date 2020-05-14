import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Container, Typography } from '@material-ui/core';
import Logo from '../components/Logo';

const styles = (theme) => ({
  header: {
    width: '100%',
    height: '50px',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: theme.palette.primary.dark,
    '& > div': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    '& a': {
      color: theme.palette.white,
      '&:not(:first-of-type)': {
        margin: theme.spacing(0, 0, 0, 2)
      }
    }
  },
  content: {
    padding: '50px 0 0 0',
    '& > div:nth-of-type(1)': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: theme.palette.primary.main,
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(6, 0, 8)
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8, 0, 10)
      },
      '& > div': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        '& > p:not(:first-child)': {
          margin: theme.spacing(2, 0, 0)
        },
        '& > a': {
          color: theme.palette.white,
          backgroundColor: theme.palette.primary.dark,
          margin: theme.spacing(4, 0, 0),
          padding: theme.spacing(2)
        }
      }
    }
  }
});

function Landing({ classes }) {
  return (
    <>
      <header className={classes.header}>
        <Container maxWidth="lg">
          <Logo color="white" />
          <div>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </Container>
      </header>
      <div className={classes.content}>
        <div>
          <div>
            <Typography variant="h4" component="p">
              ProjectIncubator
            </Typography>
            <Typography variant="h5" component="p">
              A platform that fosters collaboration on meaningful projects.
            </Typography>
            <Link to="/dashboard">Get Started</Link>
          </div>
        </div>
        <div></div>
      </div>
      <footer></footer>
    </>
  );
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
