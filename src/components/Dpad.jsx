import React from 'react';
import '../dpad.css';

const Dpad = ({ handleMove }) => {
  const handleUp = () => {
    handleMove('up');
  };

  const handleRight = () => {
    handleMove('right');
  };

  const handleDown = () => {
    handleMove('down');
  };

  const handleLeft = () => {
    handleMove('left');
  };

  return (
    <div className="set outline">
        <div className="d-pad">
            <div className="up" onClick={handleUp}></div>
            <div className="right" onClick={handleRight}></div>
            <div className="down" onClick={handleDown}></div>
            <div className="left" onClick={handleLeft}></div>  
        </div>
    </div>
  );
};

export default Dpad;
