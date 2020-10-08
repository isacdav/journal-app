import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import JournalEntries from './JournalEntries';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <aside className='journal__sidebar'>
      <div className='journal__sidebar-nav'>
        <h3 className='mt-20'>
          <i className='far fa-moon'></i>
          <span> Isaac</span>
        </h3>

        <button className='btn' onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className='journal__new'>
        <i className='far fa-calendar-plus fa-4x'></i>
        <p className='mt-5'>New Entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};

export default Sidebar;
