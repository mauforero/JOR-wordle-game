import React from 'react';
import { QWERTY_LAYOUT_LETTERS as layout } from '../../constants';

const getLetterStatus = (letter, guessedLetters) => {
  const alreadyGuessedLetter = guessedLetters
    .find((guessedLetter) => guessedLetter.letter === letter);
  
  return alreadyGuessedLetter?.status;
};

const Letter = ({letter, status = 'unused'}) => {
  return (
    <div className={`keyboard-letter ${status}`}>
      {letter}
    </div>
  );
};

function LettersGuide({guessedLetters}) {
  return (
    <div className='keyboard-layout'>
      {
        layout.map((row, i) => {
          return (
            <div key={i} className='keyboard-layout-row'>
              {
                row.map((letter, j) => {
                  const status = getLetterStatus(letter, guessedLetters);
                  return (
                    <Letter 
                      key={`${i}-${j}`} 
                      letter={letter}
                      status={status} />
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
}

export default LettersGuide;
