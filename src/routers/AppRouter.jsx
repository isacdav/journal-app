import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import AuthRouter from './AuthRouter';
import JournalScreen from '../components/journal/JournalScreen';

const AppRouter = () => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route path='/auth' component={AuthRouter} />
            <Route exact path='/' component={JournalScreen} />
            <Redirect to='/auth/login' />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default AppRouter;
