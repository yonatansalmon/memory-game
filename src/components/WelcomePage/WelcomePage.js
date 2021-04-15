import React from 'react';
import './WelcomePage.css';

const WelcomePage = (props) => {
  const handleChange = (e) => {
    e.preventDefault();
    props.handleChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit();
  };
  return (
    <div className='welcomeContainer'>
      <h1>Welcome to the Magnificenet Memory Game!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <input
            type='text'
            placeholder='Please enter your name'
            value={props.player}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <input className='button' type='submit' value='Start Game' />
      </form>
    </div>
  );
};

export default WelcomePage;
