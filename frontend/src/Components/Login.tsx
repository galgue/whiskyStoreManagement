import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Copyright } from './Copyright';
import { DASHBOARD_ROUTE } from './Routes';
import { setLoggedUser } from '../Actions/actionsCreator';
import {stateProps} from './interfaces';
import { UserController } from '../controllers/users.controller';
import { ErrorMessage } from './Dialogs/ErrorMessage';

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
  title:{
fontFamily:'impact'
  }
}));

export const SignIn = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');

  const loggedUser = useSelector((state:stateProps) => state.appState.loggedUser);
  const classes = useStyles();
  let history = useHistory();

  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    UserController.login(email, password)
      .then(response => {
        const userData = response.data;
        if(userData) {
          dispatch(setLoggedUser(userData));
          history.push(DASHBOARD_ROUTE);
        } else {
          setIsOpen(true);
          setMessage('מייל או סיסמא לא נכונים')
        }
      })
      .catch(err => {
        setIsOpen(true);
        setMessage('התחברות נכשלה')
      }) 
  }

  return (
    <>
      <ErrorMessage message={message} isOpen={isOpen} setIsOpen={setIsOpen} />
      <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography className={classes.title} component="h1" variant="h5">
              MILK & HONEY
            </Typography>
            <img height='200px' width='200px' 
              src='https://upload.wikimedia.org/wikipedia/commons/1/1d/Logo_Milk_%26_Honey_Distillery.jpg'/>
            <form className={classes.form} noValidate>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={email === '' || password === ''}
              >
                התחברות
              </Button>
            </form>
          </div>
          <Box mt={8}>
            <Copyright/>
          </Box>
        </Container>
    </>
    )
}