import React from 'react';
import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults/GuessResults';
import { sample } from '../../utils';
import { WORDS } from '../../data';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);

  const handleGuessSubmission = (guess) => {
    const newGuess = {
      guess,
      id: crypto.randomUUID(),
    };
    const nextGuesses = [...guesses, newGuess];
    setGuesses(nextGuesses);
  };

  return (
    <>
      <GuessResults answer={answer} guesses={guesses} />
      <GuessInput handleGuessSubmission={handleGuessSubmission} />
    </>
  );
}

export default Game;
