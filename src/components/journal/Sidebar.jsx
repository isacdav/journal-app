import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import JournalEntries from './JournalEntries';

const Sidebar = () => {
  const dispatch = useDispatch();

  const { name } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleAddNew = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className='journal__sidebar'>
      <div className='journal__sidebar-nav'>
        <h3 className='mt-20'>
          <i className='far fa-moon'></i>
          <span> {name}</span>
        </h3>

        <button className='btn' onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className='journal__new' onClick={handleAddNew}>
        <i className='far fa-calendar-plus fa-4x'></i>
        <p className='mt-5'>New Entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};

export default Sidebar;
