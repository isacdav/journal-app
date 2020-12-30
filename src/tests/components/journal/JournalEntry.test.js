import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import JournalEntry from '../../../components/journal/JournalEntry';
import { activateNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
  id: 'noteid',
  title: 'notetitle',
  body: 'notebody',
  date: 0,
  url: 'https://www.imagenes.com/qouydboi',
};

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...note} />
  </Provider>
);

describe('<JournalEntry /> Tests', () => {
  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should set note as active', () => {
    wrapper.find('.journal__entry').prop('onClick')();

    expect(store.dispatch).toHaveBeenCalledWith(
      activateNote(note.id, { ...note })
    );
  });
});
