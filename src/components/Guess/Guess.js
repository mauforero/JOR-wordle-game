import React from 'react';
import { range } from '../../utils';

function Guess({word}) {
  return (
    <p className='guess'>
      {
        range(5).map((value) => (
          <span key={value} className='cell'>
            {word ? word.charAt(value) : ''}
          </span>
        ))
      }
    </p>
  );
}

export default Guess;
