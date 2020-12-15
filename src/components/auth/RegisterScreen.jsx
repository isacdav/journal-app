import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmail } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import useForm from '../../hooks/useForm';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formValues;

  const handleSubmit = e => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmail(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is required'));
      return false;
    }

    if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      return false;
    }

    if (password !== password2 || password.length < 5) {
      dispatch(
        setError(
          'Passwords should have more than 5 characters and match each other'
        )
      );
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h2 className='auth__title mb-20'>Hello</h2>
      <form
        onSubmit={handleSubmit}
        className='animate__animated animate__fadeIn animate__faster'>
        {msgError && <div className='auth__alert-error'>{msgError}</div>}
        <input
          className='auth__input'
          type='text'
          placeholder='Name'
          name='name'
          autoComplete='off'
          value={name}
          onChange={handleInputChange}
        />
        <input
          className='auth__input'
          type='email'
          placeholder='Email'
          name='email'
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
        />
        <input
          className='auth__input'
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleInputChange}
        />
        <input
          className='auth__input'
          type='password'
          placeholder='Confirm password'
          name='password2'
          value={password2}
          onChange={handleInputChange}
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
