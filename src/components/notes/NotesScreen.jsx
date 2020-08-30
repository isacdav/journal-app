import React from 'react';
import NotesBar from './NotesBar';

const NotesScreen = () => {
  return (
    <div className='notes__main'>
      <NotesBar />
      <div className='notes__content'>
        <input
          type='text'
          placeholder='My title'
          className='notes__title'
          autoComplete='off'
        />
        <textarea
          placeholder='A description of my day...'
          className='notes__textarea'></textarea>
        <div className='notes__image'>
          <img
            src='https://images.theconversation.com/files/268630/original/file-20190410-2905-t29uaz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop'
            alt='My day photography'
          />
        </div>
      </div>
    </div>
  );
};

export default NotesScreen;
