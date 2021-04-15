import React from 'react';
import './ScoreHistory.css';
import '../../App.css';

const ScoreHistory = (props) => {
  let scoreHistory = [...props.gameHistory];
  scoreHistory.sort((a, b) => {
    if (a.currentScore < b.currentScore) {
      return 1;
    }
    if (a.currentScore > b.currentScore) {
      return -1;
    }
  });

  return (
    <div className='container scoreHistoryContainer'>
      {props.gameHistory.length != 0 && (
        <div>
          <h6>Game History</h6>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Score</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {scoreHistory.map((game) => {
                return (
                  <tr>
                    <td>{game.player}</td>
                    <td>{game.currentScore}</td>
                    <td>{game.date}</td>
                    <td>{game.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScoreHistory;
