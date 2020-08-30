import React from 'react';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  return (
    <>
      <h2 className='auth__title mb-20'>Hello</h2>
      <form>
        <input
          className='auth__input'
          type='email'
          placeholder='Email'
          name='email'
          autoComplete='off'
        />
        <input
          className='auth__input'
          type='password'
          placeholder='Password'
          name='password'
        />
        <button className='btn btn-primary btn-block mb-5' type='submit'>
          Log In
        </button>
        <small>
          <Link className='link' to='/auth/register'>
            New account
          </Link>
        </small>

        <div className='auth__social-net mt-20'>
          <div className='google-btn'>
            <div className='google-icon-wrapper'>
              <img
                className='google-icon'
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                alt='google button'
              />
            </div>
            <p className='btn-text'>
              <b>Sign in with Google</b>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginScreen;
