import React from 'react';
import Bulb from '../Bulb/Bulb';
import './PlayBoard.css';

const PlayBoard = (props) => {
  return (
    <div className='container playBoardContainer'>
      <ul className='playerBoard'>
        <li>
          Player: <b>{props.player}</b>{' '}
        </li>
        <li>
          Current Score: <b>{props.currentScore}</b>{' '}
        </li>
        <li>
          Best Score: <b>{props.bestScore}</b>
        </li>
      </ul>
      <div className='bulbBoard'>
        {props.bulbs.map((bulb, idx) => {
          return <Bulb key={idx} bulb={bulb} disabled={props.disabled} checkClick={props.checkClick} />;
        })}
      </div>
    </div>
  );
};

export default PlayBoard;
