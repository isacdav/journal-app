import React from 'react';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
  return (
    <>
      <h2 className='auth__title mb-20'>Hello</h2>
      <form>
        <input
          className='auth__input'
          type='text'
          placeholder='Name'
          name='name'
          autoComplete='off'
        />
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
        <input
          className='auth__input'
          type='password'
          placeholder='Confirm password'
          name='password2'
        />
        <button className='btn btn-primary btn-block mb-5' type='submit'>
          Log In
        </button>
        <small>
          <Link className='link' to='/auth/login'>
            Already registered?
          </Link>
        </small>
      </form>
    </>
  );
};

export default RegisterScreen;
