import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthRouter from './AuthRouter';
import JournalScreen from '../components/journal/JournalScreen';

const AppRouter = () => {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route path='/auth' component={AuthRouter} />
            <Route path='/home' component={JournalScreen} />
            <Redirect to='/auth/login' />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default AppRouter;
