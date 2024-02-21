import React from 'react';

const BannerWinContent = ({numberOfGuesses}) => {
  return (
    <p>
      <strong>Congratulations!</strong> Got it in
      <strong>{' '}{numberOfGuesses} guesses</strong>.
    </p>
  );
};

const BannerLoseContent = ({answer}) => {
  return (
    <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
  );
};

function Banner({hasWon, answer, numberOfGuesses}) {
  const bannerClass = hasWon ? 'happy' : 'sad';
  return (
    <div className={`banner ${bannerClass}`}>
      {
        hasWon ? 
          <BannerWinContent numberOfGuesses={numberOfGuesses} /> :
          <BannerLoseContent answer={answer} />
      }
    </div>
  );
}

export default Banner;
