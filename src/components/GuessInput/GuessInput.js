import React from "react";

const GuessInput = ({handleGuessSubmission}) => {
  const [guess, setGuess] = React.useState('');

  const handleGuessSubmit = (event) => {
    event.preventDefault();
    handleGuessSubmission(guess);
    setGuess('');
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleGuessSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input 
        type="text"
        id="guess-input" 
        value={guess}
        onChange={(event) => setGuess(event.target.value.toUpperCase())}
        pattern="[a-zA-Z]{5}"
        maxLength={5}
        required={true}
        title="Enter a 5 letter word"
      />
    </form>
  );
};

export default GuessInput;
