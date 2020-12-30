import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sidebar from '../../../components/journal/Sidebar';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'ahwoencwecnowe',
    name: 'El Patron',
  },
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

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

describe('<Sidebar /> Tests', () => {
  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call logout', () => {
    wrapper.find('button').prop('onClick')();
    expect(startLogout).toHaveBeenCalled();
  });

  test('should call startNewNote', () => {
    wrapper.find('.journal__new').prop('onClick')();
    expect(startNewNote).toHaveBeenCalled();
  });
});
