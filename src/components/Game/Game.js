import React from 'react';
import Banner from '../Banner';
import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults/GuessResults';
import { NUM_OF_GUESSES_ALLOWED as maxGuesses } from '../../constants';
import { checkGuess } from '../../game-helpers';
import { sample } from '../../utils';
import { WORDS } from '../../data';

function Game() {
  const getRandomAnswer = () => {
    // Pick a random word
    const answer = sample(WORDS);
    // To make debugging easier, we'll log the solution in the console.
    console.info({ answer });
    return answer;
  };

  const [answer, setAnswer] = React.useState(getRandomAnswer);
  const [guesses, setGuesses] = React.useState([]);
  const [hasEnded, setHasEnded] = React.useState(false);
  const [hasWon, setHasWon] = React.useState(false);

  const handleGuessSubmission = (guess) => {
    // Add the guess
    const newGuess = {
      value: checkGuess(guess, answer),
      id: crypto.randomUUID(),
    };
    const nextGuesses = [...guesses, newGuess];
    setGuesses(nextGuesses);

    // Check if the user has guessed the word
    if (checkForCorrectGuess(newGuess.value)) {
      setHasEnded(true);
      setHasWon(true);
    }

    // Check if the user has reached the number of guesses allowed
    if ((nextGuesses.length) >= maxGuesses) {
      setHasEnded(true);
    }

  };

  const restartHandler = () => {
    setAnswer(getRandomAnswer);
    setGuesses([]);
    setHasEnded(false);
    setHasWon(false);
  }

  // Check if the guess is correct by filtering all the letters with 
  // a 'correct' status and evaluate their quantity
  const checkForCorrectGuess = (value) => {
    const correctLetters = value.filter(({status}) => status === 'correct' );
    return (correctLetters.length >= 5);
  };

  return (
    <>
      <GuessResults answer={answer} guesses={guesses} />
      {
        !hasEnded ? 
        <GuessInput handleGuessSubmission={handleGuessSubmission} /> :
        <Banner 
          hasWon={hasWon} 
          answer={answer} 
          numberOfGuesses={guesses.length} 
          restartHandler={restartHandler} 
        /> 
      }
    </>
  );
}

export default Game;
