import React from 'react';

function GuessResults({guesses}) {
  return (
    <div className='guess-results'>
      {
        !!guesses.length && guesses.map(({id, guess}) => (
          <p key={id} className='guess'>{guess}</p>
        ))
      }
    </div>
  );
}

export default GuessResults;
