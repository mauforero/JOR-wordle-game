import React from 'react';

import Guess from '../Guess';
import { NUM_OF_GUESSES_ALLOWED as maxGuesses } from '../../constants';

import { range } from '../../utils';

function GuessResults({answer, guesses}) {
  return (
    <div className='guess-results'>
      {
        range(maxGuesses).map((i) => {
          const value = !!guesses[i] ? guesses[i].value : undefined;
          const key = !!guesses[i] ? guesses[i].id : crypto.randomUUID();
          return (
            <Guess 
              key={key} 
              className='guess' 
              value={value} />
          );
        })
      }
    </div>
  );
}

export default GuessResults;
