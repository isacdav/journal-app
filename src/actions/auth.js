import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebase';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';

export const startLoginEmail = (email, password) => {
  return dispatch => {
    dispatch(startLoading());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch(e => {
        Swal.fire('Error', e.message, 'error');
      });

    dispatch(finishLoading());
  };
};

export const startGoogleLogin = () => {
  return dispatch => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const startRegisterWithEmail = (email, pass, name) => {
  return dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });

        dispatch(login(user.uid, user.displayName));
      })
      .catch(e => {
        Swal.fire('Error', e.message, 'error');
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async dispatch => {
    firebase.auth().signOut();

    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.logout,
});
