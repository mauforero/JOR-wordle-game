import React from 'react';

import Guess from '../Guess';
import { NUM_OF_GUESSES_ALLOWED as maxGuesses } from '../../constants';
import { range } from '../../utils';


function GuessResults({guesses}) {
  return (
    <div className='guess-results'>
      {
        range(maxGuesses).map((val) => (
          <Guess 
            key={val} 
            className='guess' 
            word={guesses[val]?.guess} />
        ))
      }
    </div>
  );
}

export default GuessResults;
