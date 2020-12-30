import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  login,
  logout,
  startLoginEmail,
  startLogout,
} from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Test in auth actions', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test('login and logout should create the corresponding actions', () => {
    const uid = 'TEST1';
    const displayName = 'Naaaaaaame';

    const loginAction = login(uid, displayName);
    const logoutACtion = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });

    expect(logoutACtion).toEqual({
      type: types.logout,
    });
  });

  test('should logout with success', async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout,
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test('should login with success', async () => {
    await store.dispatch(startLoginEmail('test@mail.com', '123456'));

    const actions = store.getActions();

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: '7Dsyd4lPoeSkc6pWteb2Hug5rvo1',
        displayName: null,
      },
    });
  });
});
