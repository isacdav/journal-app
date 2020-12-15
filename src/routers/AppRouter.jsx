import React, { useEffect } from 'react';
import { Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import AuthRouter from './AuthRouter';
import JournalScreen from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { useState } from 'react';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setCheckIn] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLogged(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLogged(false);
      }

      setCheckIn(false);
    });
  }, [dispatch, setCheckIn, setIsLogged]);

  if (checking) {
    return <h1>Wait...</h1>;
  }

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <PublicRoute
              path='/auth'
              isAuthenticated={isLogged}
              component={AuthRouter}
            />
            <PrivateRoute
              exact
              path='/'
              isAuthenticated={isLogged}
              component={JournalScreen}
            />
            <Redirect to='/auth/login' />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default AppRouter;
