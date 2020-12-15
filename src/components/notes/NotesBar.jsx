import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploadingFile } from '../../actions/notes';

const NotesBar = () => {
  const dispatch = useDispatch();

  const { active } = useSelector(state => state.notes);

  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  const handlePictureClick = () => {
    document.querySelector('#file_selector').click();
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploadingFile(file));
    }
  };

  const currentDate = new Date().toDateString();

  return (
    <div className='notes__bar'>
      <span>{currentDate}</span>
      <input
        id='file_selector'
        type='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div>
        <button className='btn' onClick={handlePictureClick}>
          Picture
        </button>
        <button className='btn' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesBar;
