import React from 'react';

const NotesBar = () => {
  return (
    <div className='notes__bar'>
      <span>October 30, 2020</span>
      <div>
        <button className='btn'>Picture</button>
        <button className='btn'>Save</button>
      </div>
    </div>
  );
};

export default NotesBar;
