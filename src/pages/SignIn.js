import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import Logo from '../components/Logo';
import { FaGoogle } from 'react-icons/fa';
import Divider from '@material-ui/core/Divider';

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

function SignIn(props) {
  const classes = useStyles();
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
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          <Button variant="contained" color="primary">
            Sign In
          </Button>
          <Divider variant="middle" />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FaGoogle />}
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

//
// export default class Counter extends Component {
//   state = {
//     count: 0
//   };
//   render() {
//     return (
//       <React.Fragment>
//         <span> {this.state.count} </span>
//         <button>Increment</button>
//       </React.Fragment>
//     );
//   }
//
//   formatCount() {
//     const { count } = this.state;
//     return count === 0 ? "Zero" : count;
//   }
// }
