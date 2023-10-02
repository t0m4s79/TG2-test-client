import React, { useEffect, useState } from 'react';
import Card from './Card';
import Grid from '@mui/material/Grid';

import Xarrow from 'react-xarrows';
import { Button } from '@mui/material';

import saveDataToBackend from '../saveDataToBackend'

const AssociationTask = (props) => {

    const [choiceLeft, setChoiceLeft] = useState(null)
    const [choiceRight, setChoiceRight] = useState(null)
    const [associatedPairs, setAssociatedPairs] = useState([]);

    const task = props.task
    const instructions = task.instructions
    const leftObjects = task.leftObjects.map((item) => ({ ...item, id: `l-${item.id}` }));
    const rightObjects = task.rightObjects.map((item) => ({ ...item, id: `r-${item.id}` }));
    const note = task.note;
    const pairings = task.pairings;

    //console.log('pairings', pairings)
    //console.log('leftObjects', leftObjects)
    //console.log('rightObjects', rightObjects)
    console.log('associatedPairs', associatedPairs)

    const colors = ['pink', 'peachpuff', 'cornflowerblue', 'darkorchid', 'coral', 'darkseagreen', 'dodgerblue', 'darkmagenta', 'lightsteelblue'];

    useEffect(() => {
        setChoiceLeft(null)
        setChoiceRight(null)
        setAssociatedPairs([])
    },[props])

    function handleCardClick(card, side) {
        console.log(`Clicked card ${card.id} on the ${side} side`);
      
            if (associatedPairs.length >= pairings.length) {
                console.log('Reached maximum number of pairs');
                return;
            }
        
            if (side === 'left') {
                if (!choiceLeft) {
                    setChoiceLeft(card);
                } else {
                    console.log('Cannot associate with the same side');
                }
            } else if (side === 'right') {
                if (!choiceRight && choiceLeft && card !== choiceLeft) {
                    setChoiceRight(card);
                    const newPair = {
                    left: choiceLeft,
                    right: card,
                    color: colors[associatedPairs.length % colors.length],
                    };
                setAssociatedPairs([...associatedPairs, newPair]);
            } else {
                console.log('Cannot associate with the same side');
            }
        }
    }      

    function handleResetPairs() {
        setAssociatedPairs([]);
    }
      
    function getColorForItem(item) {
        const pair = associatedPairs.find((p) => {
          return (
            (p.left.id.startsWith('l-') && p.left.id.slice(2) === item.id) ||
            (p.right.id.startsWith('r-') && p.right.id.slice(2) === item.id)
          );
        });
      
        if (pair) {
          return pair.color;
        } else {
          return 'transparent';
        }
      }
      
          

    useEffect(() => {
        if(choiceLeft && choiceRight){

            if(choiceLeft.id.slice(2) === choiceRight.id.slice(2)) {
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

    const handleSubmit = () => {
        console.log('Submitted Data:', associatedPairs);
        const submitData = {task: task, submited: associatedPairs}
        saveDataToBackend(submitData, 'association')
    };

    return (
        <div>
            <h2>{instructions}</h2>

            <Button variant='contained' onClick={handleResetPairs}>Reset</Button>

            <div className='taskTable'>
                <Grid container spacing={2} columns={12} columnSpacing={3}>
                    <Grid item xs={6} className='left-side'>
                        {leftObjects.map((item,index)=>(
                            <Grid item key={item.id} display="flex" justifyContent="center" alignItems="center">
                                    <Card 
                                        item={item} 
                                        handleCardClick={handleCardClick}
                                        side='left'
                                        isSelected={choiceLeft && choiceLeft.id === item.id}
                                        color={getColorForItem(item)}
                                        associatedPairs={associatedPairs}
                                        content={'images'}
                                    />
                            </Grid>
                        ))}
                     </Grid>
                    
                     <Grid item xs={6} className='right-side'>
                        {rightObjects.map((item,index)=>(
                            <Grid item key={item.id} display="flex" justifyContent="center" alignItems="center">
                                    <Card 
                                        item={item} 
                                        handleCardClick={handleCardClick}
                                        side='right'
                                        isSelected={choiceRight && choiceRight.id === item.id}
                                        color={getColorForItem(item)}
                                        associatedPairs={associatedPairs}
                                        content={'images'}
                                    />
                            </Grid>
                        ))}
                    </Grid>
                </Grid >

                {associatedPairs.map((pair, index) => (
                    <Xarrow
                        key={index}
                        start={pair.left.id}
                        end={pair.right.id}
                        color={pair.color}
                        strokeWidth={5}
                        startAnchor='right'
                        endAnchor='left'
                        showHead={true}
                        showTail={true}
                        path='smooth'
                        curveness={0.3}
                        animateDrawing={0.5}
                    />
                ))}
                
                <p>{note}</p>

                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit" 
                    onClick={handleSubmit} 
                    sx={{ margin: '16px', width: '20%' }}
                >
                    Submit
                </Button>
            </div>

        </div>
    )
}

export default AssociationTask
