import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploadingFile,
} from '../../actions/notes';
import { db } from '../../firebase/firebase';
import { types } from '../../types/types';

jest.mock('../../helpers/fileHelper', () => ({
  fileUpload: jest.fn(() => {
    return Promise.resolve('https://www.google.com');
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'Test',
  },
  notes: {
    active: {
      id: '4CVlpCGJc193isMNIgnX',
      title: 'Active note',
      body:
        'Silecncio dijo el cura, silencio dijo en juez, silecncio entonces idiota, silencio entonces nooooooooooo',
    },
  },
};

let store = mockStore(initState);

describe('Test notes actions', () => {
  beforeEach(() => {
    store = mockStore(initState);
    // store.clearActions();
  });

  test('should create a new note (startNewNote)', async () => {
    await store.dispatch(startNewNote());
    const actions = store.getActions();

    const expectedPayload = {
      id: expect.any(String),
      title: '',
      body: '',
      date: expect.any(Number),
    };

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: expectedPayload,
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: expectedPayload,
    });

    const docId = actions[0].payload.id;
    await db.doc(`/Test/journal/notes/${docId}`).delete();
  });

  // FIXME: startLoadingNotes is not working in test environment due to a firebase/jest bug
  // TODO: check the following links, at some time they could have the posible solution
  // https://github.com/facebook/jest/issues/7780
  // https://github.com/dconeybe/FirebaseJsBug3096
  // package.backup.json contains the versions of the packages that does not throw the errors
  test('should load notes  (startLoadingNotes)', async () => {
    await store.dispatch(startLoadingNotes('Test'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expectedNote = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expectedNote);
  });

  // FIXME: Same as test above, the comented code is not working, throwing the same error
  test('should update the note (startSaveNote)', async () => {
    const note = {
      id: 'LhJhALT1Z9QWARY1PkBv',
      title: 'title',
      body: 'body',
    };

    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = await db.doc(`/Test/journal/notes/${note.id}`).get();

    expect(docRef.data().title).toBe(note.title);
  });

  test('should update the url (startUploading)', async () => {
    const file = new File([], 'img.png');
    await store.dispatch(startUploadingFile(file));

    const docRef = await db
      .doc('/Test/journal/notes/4CVlpCGJc193isMNIgnX')
      .get();

    expect(docRef.data().url).toBe('https://www.google.com');
  });
});
