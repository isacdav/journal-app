import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmail } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import useForm from '../../hooks/useForm';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { msgError, loading } = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  });

  const { email, password } = formValues;

  const handleSubmit = e => {
    e.preventDefault();

    if (!isFormValid()) return;

    dispatch(startLoginEmail(email, password));
  };

  const isFormValid = () => {
    if (email.trim().length <= 0 || password.trim().length <= 0) {
      dispatch(setError('Please enter Email and Password'));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
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
          id='input_email'
          type='email'
          placeholder='Email'
          name='email'
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
        />
        <input
          className='auth__input'
          id='input_pass'
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleInputChange}
        />
        <button
          className='btn btn-primary btn-block mb-5'
          type='submit'
          disabled={loading}>
          Log In
        </button>
        <small>
          <Link className='link' to='/auth/register'>
            New account
          </Link>
        </small>

        <div className='auth__social-net mt-20'>
          <div className='google-btn' onClick={handleGoogleLogin}>
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
