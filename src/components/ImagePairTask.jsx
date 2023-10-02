import React, { useEffect, useState } from 'react'
import Card from './Card'
import Grid from '@mui/material/Grid'
import { Button } from '@mui/material'

const ImagePairTask = (props) =>{

    const [choiceLeft, setChoiceLeft] = useState(null)
    const [choiceRight, setChoiceRight] = useState(null)
    const [associatedPairs, setAssociatedPairs] = useState([]);
    const [initialViewingCompleted, setInitialViewingCompleted] = useState(false);

    const instructions = props.task.instructions
    const leftObjects = props.task.leftObjects;
    const rightObjects = props.task.rightObjects;
    const note = props.task.note;
    const pairings = props.task.pairings;
    const timeout = props.timeout;

    const colors = ['pink', 'peachpuff', 'cornflowerblue', 'darkorchid', 'coral', 'darkseagreen'];

    function handleCardClick (card, side) {
      
        console.log(`Clicked card ${card.id} on the ${side} side`)

        if (associatedPairs.length >= pairings.length) {
            console.log('Reached maximum number of pairs');
            return;
        }

        if (!choiceLeft && !choiceRight) {
            setChoiceLeft(card);
        } else if (choiceLeft && !choiceRight) {
            setChoiceRight(card);
            const newPair = { left: choiceLeft, right: card, color: colors[associatedPairs.length % colors.length] };
            setAssociatedPairs([...associatedPairs, newPair]);
        } else {
            setChoiceLeft(card);
            setChoiceRight(null);
          }
        }
      
    function getColorForItem(item) {
        const pair = associatedPairs.find(p => p.left.id === item.id || p.right.id === item.id);
        if (pair) {
          return pair.color;
        } else {
          return 'transparent';
        }
    }

    function handleResetPairs() {
        setAssociatedPairs([]);
    }

    useEffect(() => {
        const initialViewingTimeout = setTimeout(() => {
          setInitialViewingCompleted(true);
        }, 60000); // 1 minute
    
        return () => {
          clearTimeout(initialViewingTimeout);
        };
    }, []);

    useEffect(() => {
        if(choiceLeft && choiceRight){

            if(choiceLeft.id === choiceRight.id) {
                if(choiceLeft.image != choiceRight.image){
                    console.log('correct card association')
                    //alert('correct card association')
                }
                else {
                    console.log('selected the same card twice')
                    //alert('Selected the same card twice')
                }

                setChoiceLeft(null)
                setChoiceRight(null)
            }
            else {
                console.log('incorrect card association')
                //alert('incorrect card association')
                setChoiceLeft(null)
                setChoiceRight(null)
            }
        }
    }, [choiceLeft,choiceRight] )



    console.log('associatedPairs', associatedPairs)
    return (
        <div>
            <h2>{instructions}</h2>

            <Button variant='contained' onClick={handleResetPairs}>Reset</Button>

            {!initialViewingCompleted ?
            <div className='taskTable'>
                <Grid container justifyContent='center'>
                    <table className='imagePairs'>
                        <tbody>
                            {leftObjects.map((item,index)=>(
                                <tr key={index}>
                                    <td>
                                        <Grid container direction='row' justifyContent='space-evenly'>
                                            <Grid item key={item.id} display="flex" justifyContent="center" alignItems="center">
                                                <Card 
                                                    item={item} 
                                                    handleCardClick={handleCardClick}
                                                    side='left'
                                                    isSelected={choiceLeft === item}
                                                    color={getColorForItem(item)}
                                                    associatedPairs={associatedPairs}
                                                    content='images'
                                                />
                                            </Grid>
                                        
                                            <Grid item key={rightObjects[index].id} display="flex" justifyContent="center" alignItems="center">
                                                <Card 
                                                    item={rightObjects[index]} 
                                                    handleCardClick={handleCardClick}
                                                    side='right'
                                                    isSelected={choiceRight === rightObjects[index]}
                                                    color={getColorForItem(rightObjects[index])}
                                                    associatedPairs={associatedPairs}
                                                    content='images'
                                                />
                                            </Grid>
                                        </Grid>
                                </td>
                            </tr>
                        ))}
                       </tbody>
                    </table>
                </Grid >
                
                <p>{note}</p>
            </div>
            : <div> Come back in 30 minutes</div> }

        </div>
    )
}

export default ImagePairTask