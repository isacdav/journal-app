import React from 'react';
import Sidebar from './Sidebar';
import NotJournalSelected from './NotJournalSelected';
import NotesScreen from '../notes/NotesScreen';
import { useSelector } from 'react-redux';

const JournalScreen = () => {
  const { active } = useSelector(state => state.notes);

  return (
    <div className='journal__content'>
      <Sidebar />

      <main>{active ? <NotesScreen /> : <NotJournalSelected />}</main>
    </div>
  );
};

export default JournalScreen;
