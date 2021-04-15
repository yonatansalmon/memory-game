import React from 'react';
import WelcomePage from './components/WelcomePage/WelcomePage';
import PlayBoard from './components/PlayBoard/PlayBoard';
import ScoreHistory from './components/ScoreHistory/ScoreHistory';
import './components/WelcomePage/WelcomePage.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startGame: false,
      isRoundOver: false,
      player: '',
      disabled: true,
      currentScore: 0,
      gameHistory: [],
      bulbHistory: [],
      clickedItems: [],
      bulbs: [
        { color: 'blue', isOn: false },
        { color: 'red', isOn: false },
        { color: 'green', isOn: false },
        { color: 'grey', isOn: false },
        { color: 'orange', isOn: false },
        { color: 'purple', isOn: false },
      ],
    };
  }

  handleChange(user) {
    this.setState({ player: user });
  }

  handleSubmit(e) {
    if (this.state.player.length === 0) return;
    this.setState({ startGame: true });
    this.lightBulbs(e);
  }

  getBestScore() {
    if (this.state.gameHistory.length === 0) return 0;
    return this.state.gameHistory.reduce((max, current) => {
      return max > current.currentScore ? max : current.currentScore;
    }, 0);
  }

  lightBulbs() {
    let bulbHistory = [...this.state.bulbHistory];
    let nextBulb = this.state.bulbs[Math.floor(Math.random() * 6)];
    bulbHistory = [...this.state.bulbHistory, nextBulb];
    this.setState({ bulbHistory });
    bulbHistory.forEach((bulb, i) => {
      setTimeout(() => {
        const allBulbs = [...this.state.bulbs];
        const idx = allBulbs.indexOf(bulb);
        allBulbs[idx].isOn = true;
        this.setState({ bulbs: allBulbs });
        setTimeout(() => {
          if (i + 1 === bulbHistory.length) {
            this.setState({ disabled: false });
          } else {
            this.setState({ disabled: true });
          }
          allBulbs[idx].isOn = false;
          this.setState({ bulbs: allBulbs });
        }, 100 * i + 100);
      }, 1000 * (i + 1));
    });
    this.setState({ bulbHistory });
  }

  gameOver() {
    const gameHistory = [...this.state.gameHistory];
    const d = new Date();
    const date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    const time =
      String(d.getHours()).padStart(2, '0') +
      ':' +
      String(d.getMinutes()).padStart(2, '0');
    gameHistory.push({
      currentScore: this.state.currentScore,
      player: this.state.player,
      date: date,
      time: time,
    });
    this.setState({
      gameHistory,
      bulbHistory: [],
      clickedItems: [],
      currentScore: 0,
      isRoundOver: true,
    });
  }

  checkClick(bulb) {
    let currentScore = this.state.currentScore;
    let clickedItems = [...this.state.clickedItems];
    clickedItems.push(bulb);
    if (clickedItems.length <= this.state.bulbHistory.length) {
      let continueGame = true;
      for (let i = 0; i < clickedItems.length && continueGame === true; i++) {
        if (clickedItems[i].color !== this.state.bulbHistory[i].color) {
          continueGame = false;
        }
      }
      if (continueGame === true) {
        if (clickedItems.length === this.state.bulbHistory.length) {
          clickedItems = [];
          currentScore += 10;
          setTimeout(() => this.lightBulbs(), 1000);
        }
        this.setState({
          currentScore: currentScore,
          clickedItems,
        });
      } else {
        this.gameOver();
      }
    } else {
      this.setState({ clickedItems });
    }
  }

  restartGame() {
    this.setState({ isRoundOver: false });
    this.lightBulbs();
  }

  render() {
    const gameOver = (
      <div className='gameOverContainer'>
        <h1>Game Over 🤪</h1>
        <button className='button' onClick={this.restartGame.bind(this)}>
          Restart
        </button>
      </div>
    );
    let currentRender = <></>;
    if (this.state.isRoundOver === true) {
      currentRender = gameOver;
    } else if (!this.state.startGame) {
      currentRender = (
        <WelcomePage
          player={this.state.player}
          handleChange={this.handleChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      );
    } else {
      currentRender = (
        <>
          <ScoreHistory
            player={this.state.player}
            gameHistory={this.state.gameHistory}
          />
          <PlayBoard
            player={this.state.player}
            bestScore={this.getBestScore()}
            currentScore={this.state.currentScore}
            bulbs={this.state.bulbs}
            checkClick={this.checkClick.bind(this)}
            disabled={this.state.disabled}
          />
        </>
      );
    }
    return <div className='App'>{currentRender}</div>;
  }
}

export default App;
