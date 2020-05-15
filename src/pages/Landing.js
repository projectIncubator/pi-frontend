import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import {
  Build as BuildIcon,
  Create as CreateIcon,
  Forum as ForumIcon
} from '@material-ui/icons';
import Logo from '../components/Logo';

const styles = (theme) => ({
  header: {
    width: '100%',
    height: '50px',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: theme.palette.primary.dark,
    zIndex: '1000',
    '& > div': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  },
  authBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    '& a, button': {
      color: theme.palette.common.white,
      borderColor: theme.palette.common.white,
      '&:hover': {
        color: theme.palette.primary.light,
        borderColor: theme.palette.primary.light,
        transition: theme.transitions.create()
      }
    },
    '& a:not(:first-of-type)': {
      margin: theme.spacing(0, 0, 0, 2)
    }
  },
  content: {
    padding: '50px 0 0 0',
    '& > section:nth-of-type(1)': {
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
          margin: theme.spacing(2, 0, 4)
        },
        '& button': {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.dark,
          '&:hover': {
            opacity: '0.8',
            transition: theme.transitions.create()
          }
        }
      }
    },
    '& > section:nth-of-type(2) > div > div': {
      padding: theme.spacing(3, 0, 3),
      '& > div:not(:first-child)': {
        [theme.breakpoints.down('sm')]: {
          paddingTop: theme.spacing(5)
        }
      }
    }
  },
  featureContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& > svg': {
      color: theme.palette.common.white,
      margin: theme.spacing(0, 0, 2, 0),
      padding: theme.spacing(3),
      fontSize: '6rem',
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main
    }
  }
});

function Landing({ classes }) {
  return (
    <>
      <header className={classes.header}>
        <Container maxWidth="lg">
          <Logo color="white" />
          <div className={classes.authBtnContainer}>
            <Link to="/login">Log In</Link>
            <Link to="/signup">
              <Button variant="outlined">Sign Up</Button>
            </Link>
          </div>
        </Container>
      </header>
      <div className={classes.content}>
        <section>
          <div>
            <Typography variant="h4" component="p">
              ProjectIncubator
            </Typography>
            <Typography variant="h5" component="p">
              A platform that fosters collaboration on meaningful projects.
            </Typography>
            <Link to="/dashboard">
              <Button color="primary" variant="contained">
                GET STARTED
              </Button>
            </Link>
          </div>
        </section>
        <section>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <div className={classes.featureContainer}>
                  <BuildIcon />
                  <Typography component="p">
                    Handy tools to manage your project.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.featureContainer}>
                  <ForumIcon />
                  <Typography component="p">
                    Discuss issues with your teammates with our built-in
                    discussion board.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.featureContainer}>
                  <CreateIcon />
                  <Typography component="p">
                    Create or join projects you care about.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Container>
        </section>
      </div>
      <footer></footer>
    </>
  );
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
