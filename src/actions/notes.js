import Swal from 'sweetalert2';
import { db } from '../firebase/firebase';
import { fileUpload } from '../helpers/fileHelper';
import { loadNotes } from '../helpers/notesHelper';
import { types } from '../types/types';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(activateNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = uid => {
  return async dispatch => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const activateNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const setNotes = notes => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = note => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) delete note.url;

    const noteToDb = { ...note };
    delete noteToDb.id;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToDb);

    dispatch(refreshNote(note.id, noteToDb));

    Swal.fire('Saved', note.title, 'success');
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploadingFile = file => {
  return async (dispatch, getState) => {
    const { active } = getState().notes;

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait while the picture is being uploaded.',
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);
    active.url = fileUrl;

    dispatch(startSaveNote(active));

    Swal.close();
  };
};

export const startDeleting = id => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    await db.doc(`${uid}/journal/notes/${id}`).delete();

    dispatch(deleteNote(id));
  };
};

export const deleteNote = id => ({
  type: types.notesDelete,
  payload: id,
});

export const cleanNotesLogout = () => ({
  type: types.notesLogoutCleaning,
});
