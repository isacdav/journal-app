import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AppRouter from '../../routers/AppRouter';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { login } from '../../actions/auth';
import { act } from 'react-dom/test-utils';
import { firebase } from '../../firebase/firebase';

jest.mock('../../actions/auth', () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: null,
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('<AppRouter /> Tests', () => {
  test('should call login', async () => {
    let user;

    await act(async () => {
      const userCredentials = await firebase
        .auth()
        .signInWithEmailAndPassword('test@mail.com', '123456');
      user = userCredentials.user;

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalled();
  });
});
