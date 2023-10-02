import React from 'react';

const Card = ({ item, handleCardClick, isSelected, side, associatedPairs, content }) => {
  function handleClick() {
    handleCardClick(item, side);
  }

  const cardStyle = isSelected ? { backgroundColor: 'lightgrey' } : {};

  // check if the card is part of an associated pair
  const pair = associatedPairs.find(p => p.left.id === item.id || p.right.id === item.id);
  const pairColor = pair ? pair.color : null;
  const pairStyle = pairColor ? { backgroundColor: pairColor } : {};
  
  return (
    <div>
      <div className='card' id={item.id} onClick={handleClick} style={{ ...cardStyle, ...pairStyle, cursor: 'pointer' }}>
        {content === 'images' ?
        <img key={item.id} src={item.image} alt="" style={{ width: '130px' }} />
        : <div key={item.id} style={{ width: '15vw', backgroundColor: 'white', padding: '5px' }}>
            <span>{item.sentence}</span>
          </div>
        } 
      </div>
    </div>
  );
};

export default Card;