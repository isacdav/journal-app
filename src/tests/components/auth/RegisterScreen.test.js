import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import RegisterScreen from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

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

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe('<RegisterScreen /> Tests', () => {
  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch the UI Error action', () => {
    const nameField = wrapper.find('input[name="name"]');
    nameField.simulate('change', { target: { name: 'name', value: 'Test' } });
    wrapper.find('form').simulate('submit', { preventDefault() {} });

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: 'Email is not valid',
    });
  });

  test('should show alert box', () => {
    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Email not valid',
      },
    };

    let store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(
      initState.ui.msgError
    );
  });
});
