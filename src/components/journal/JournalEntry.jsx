import React from 'react';

const JournalEntry = () => {
  return (
    <div className='journal__entry'>
      <div
        className='journal__entry-pic'
        style={{
          backgroundSize: 'cover',
          backgroundImage:
            'url(https://images.theconversation.com/files/268630/original/file-20190410-2905-t29uaz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop)',
        }}></div>
      <div className='journal__entry-body'>
        <p className='journal__entry-tittle'>New Day</p>
        <p className='journal__entry-content'>
          Dolore duis enim nostrud qui voluptate non id ex.
        </p>
      </div>

      <div className="journal__entry-date">
        <span>Monday</span>
        <h4>30</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
