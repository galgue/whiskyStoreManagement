import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Copyright } from './Copyright';
import { LOGIN_ROUTE, BATCHES_BARRELS_ROUTE } from './Routes';
import { setLoggedUser } from '../Actions/actionsCreator';
import {state} from '../interFaces';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignIn = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state:state)=>state.appState.loggedUser);
  const classes = useStyles();
  let history = useHistory();
  setTimeout(()=>console.log(loggedUser),2000);

const handleClick = () => {
    history.replace(BATCHES_BARRELS_ROUTE);
    dispatch(setLoggedUser(1));
}

  return <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          MILK & HONEY
        </Typography>
        <img height='100px' width='100px' src='https://upload.wikimedia.org/wikipedia/commons/1/1d/Logo_Milk_%26_Honey_Distillery.jpg'/>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="מייל"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            onClick = {handleClick}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            התחברות
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright/>
      </Box>
    </Container>
}