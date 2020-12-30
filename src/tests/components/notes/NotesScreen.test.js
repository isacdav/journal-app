import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NotesScreen from '../../../components/notes/NotesScreen';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { activateNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
  activateNote: jest.fn(),
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
    active: {
      id: 'noteid',
      title: 'notetitle',
      body: 'notebody',
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NotesScreen />
  </Provider>
);

describe('<NotesScreen /> Tests', () => {
  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should fire activateNote action', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'titulo nuevo',
      },
    });

    expect(activateNote).toHaveBeenLastCalledWith('noteid', {
      id: 'noteid',
      title: 'titulo nuevo',
      body: 'notebody',
    });
  });
});
