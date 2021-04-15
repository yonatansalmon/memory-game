import React from 'react';
import './Bulb.css';

const Bulb = (props) => {
  return (
    <input
      type='button'
      onClick={() => props.checkClick(props.bulb)}
      id={`${props.bulb.color}`}
      className='bulb ripple'
      disabled={props.disabled}
      style={{
        backgroundColor: props.bulb.isOn === true ? props.bulb.color : 'white',
      }}
    ></input>
  );
};

export default Bulb;
