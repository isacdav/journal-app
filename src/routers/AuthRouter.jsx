import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';

const AuthRouter = () => {
  return (
    <>
      <div className='container'>
        <Switch>
          <Route path='/auth/login' component={LoginScreen} />
          <Route path='/auth/register' component={RegisterScreen} />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </>
  );
};

export default AuthRouter;
