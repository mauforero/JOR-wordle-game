import React from 'react';

const BannerWinContent = ({numberOfGuesses}) => {
  const numberOfGuessesCaption = numberOfGuesses === 1 ?
    '1 guess' : `${numberOfGuesses} guesses`;

  return (
    <p>
      <strong>Congratulations!</strong> Got it in
      {' '}
      <strong>{numberOfGuessesCaption}</strong>.
    </p>
  );
};

const BannerLoseContent = ({answer}) => {
  return (
    <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
  );
};

function Banner({hasWon, answer, numberOfGuesses, restartHandler}) {
  const bannerClass = hasWon ? 'happy' : 'sad';
  return (
    <div className={`banner ${bannerClass}`}>
      {
        hasWon ? 
          <BannerWinContent numberOfGuesses={numberOfGuesses} /> :
          <BannerLoseContent answer={answer} />
      }
      <button onClick={restartHandler}>Restart Game</button>
    </div>
  );
}

export default Banner;
