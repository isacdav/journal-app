import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateNote, startDeleting } from '../../actions/notes';
import useForm from '../../hooks/useForm';
import NotesBar from './NotesBar';

const NotesScreen = () => {
  const dispatch = useDispatch();

  const { active: note } = useSelector(state => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { title, body, id } = formValues;

  // Save the current id to compare later
  const activeId = useRef(note.id);

  const handleDelete = () => {
    dispatch(startDeleting(id));
  };

  useEffect(() => {
    // Validate if the note has changed
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activateNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  return (
    <div className='notes__main'>
      <NotesBar />
      <div className='notes__content'>
        <input
          type='text'
          name='title'
          placeholder='My title'
          className='notes__title'
          autoComplete='off'
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          name='body'
          placeholder='A description of my day...'
          className='notes__textarea'
          value={body}
          onChange={handleInputChange}></textarea>
        {note.url && (
          <div className='notes__image'>
            <img src={note.url} alt='My day photography' />
          </div>
        )}
      </div>

      <button className='btn btn-danger' onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default NotesScreen;
