import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import LoginScreen from '../../../components/auth/LoginScreen';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginEmail } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmail: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe('<LoginScreen> Tests', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should fire startGoogleLogin', () => {
    wrapper.find('.google-btn').prop('onClick')();

    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test('should fire startLoginEmail', () => {
    wrapper.find('#input_email').simulate('change', {
      target: { name: 'email', value: 'test@mail.com' },
    });
    wrapper
      .find('#input_pass')
      .simulate('change', { target: { name: 'password', value: '12345' } });
    wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

    expect(startLoginEmail).toHaveBeenCalledWith('test@mail.com', '12345');
  });
});
