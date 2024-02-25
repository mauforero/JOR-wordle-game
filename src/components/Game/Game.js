import React from 'react';
import Banner from '../Banner';
import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults/GuessResults';
import { NUM_OF_GUESSES_ALLOWED as maxGuesses } from '../../constants';
import { checkGuess } from '../../game-helpers';
import { sample } from '../../utils';
import { WORDS } from '../../data';
import LettersGuide from '../LettersGuide/LettersGuide';

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
  const [guessedLetters, setGuessedLetters] = React.useState([]);
  const [hasEnded, setHasEnded] = React.useState(false);
  const [hasWon, setHasWon] = React.useState(false);

  const handleGuessSubmission = (guess) => {
    // Add the guess to state
    const newGuess = {
      value: checkGuess(guess, answer),
      id: crypto.randomUUID(),
    };
    const nextGuesses = [...guesses, newGuess];
    setGuesses(nextGuesses);
    checkForGuessedLetters(newGuess.value);

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

  // Reset all state on restart game
  const restartHandler = () => {
    setGuesses([]);
    setGuessedLetters([]);
    setHasEnded(false);
    setHasWon(false);
    setAnswer(getRandomAnswer);
  }

  // The guess is right if all the letters have a 'correct' status
  const checkForCorrectGuess = (value) => {
    const correctLetters = value.filter(({status}) => status === 'correct' );
    return (correctLetters.length >= 5);
  };

  // Check if the guess has correct or misplaced letters and 
  // update the guessedLetters state
  const checkForGuessedLetters = (newGuess) => {
    const currentLetters = [...guessedLetters];
    let newLetters = [];

    newGuess.forEach(newLetter => {
      // check if the letter is already stored
      const letterIndex = currentLetters.findIndex((curr) => (
        newLetter.letter === curr.letter
      ));

      // If not stored, store it
      if (letterIndex < 0) {
        newLetters.push(newLetter);
      } else {
        // If is already stored but now is in the right position, update the stored letter status
        if (newLetter.status === 'correct') currentLetters[letterIndex] = newLetter;
      }
    });

    const nextGuessedLetters = [...currentLetters, ...newLetters];
    setGuessedLetters(nextGuessedLetters);
  };

  return (
    <>
      <GuessResults answer={answer} guesses={guesses} />
      {
        !hasEnded ? 
        <>
          <GuessInput handleGuessSubmission={handleGuessSubmission} />
          <LettersGuide guessedLetters={guessedLetters} />
        </>
        :
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
