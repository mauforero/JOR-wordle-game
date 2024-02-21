import React from 'react';

import Guess from '../Guess';
import { NUM_OF_GUESSES_ALLOWED as maxGuesses } from '../../constants';
import { checkGuess } from '../../game-helpers';
import { range } from '../../utils';

function GuessResults({answer, guesses}) {
  return (
    <div className='guess-results'>
      {
        range(maxGuesses).map((i) => {
          let value = undefined;

          if (guesses[i]) {
            const {guess} = guesses[i];
            value = checkGuess(guess, answer);
          }

          return (
            <Guess 
              key={i} 
              className='guess' 
              value={value} />
          );
        })
      }
    </div>
  );
}

export default GuessResults;
