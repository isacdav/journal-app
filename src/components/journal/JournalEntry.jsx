import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activateNote } from '../../actions/notes';

const JournalEntry = ({ id, body, title, url, date }) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();

  const handleEntryClick = () => {
    dispatch(activateNote(id, { date, title, body, url }));
  };

  return (
    <div className='journal__entry' onClick={handleEntryClick}>
      {url && (
        <div
          className='journal__entry-pic'
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${url})`,
          }}></div>
      )}
      <div className='journal__entry-body'>
        <p className='journal__entry-tittle'>{title}</p>
        <p className='journal__entry-content'>{body}</p>
      </div>
      <div className='journal__entry-date'>
        <span>{noteDate.format('ddd')}</span>
        <h4>{noteDate.format('D')}</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
