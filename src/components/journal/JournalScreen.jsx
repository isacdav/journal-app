import React from 'react';
import Sidebar from './Sidebar';
import NotJournalSelected from './NotJournalSelected';
import NotesScreen from '../notes/NotesScreen';

const JournalScreen = () => {
  return (
    <div className='journal__content'>
      <Sidebar />

      <main>
        {/* <NotJournalSelected /> */}
        <NotesScreen />
      </main>
    </div>
  );
};

export default JournalScreen;
