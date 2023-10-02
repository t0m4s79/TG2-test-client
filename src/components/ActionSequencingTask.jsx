import React, { useState, useEffect } from 'react'
import Card from './Card'
import Grid from '@mui/material/Grid'
import Xarrow from 'react-xarrows'
import { Button } from '@mui/material'
import saveDataToBackend from '../saveDataToBackend'

const ActionSequencingTask = (props) => {

    const [choiceLeft, setChoiceLeft] = useState(null)
    const [choiceRight, setChoiceRight] = useState(null)
    const [associatedPairs, setAssociatedPairs] = useState([])

    const task = props.task
    const instructions = task.instructions
    const sentences = task.sentences
    const action = task.action

    const order = sentences.map((sent, index) => {
        return {id: `${index}`, sentence: index+1}
    })

    const colors = ['pink', 'peachpuff', 'cornflowerblue', 'darkorchid', 'coral', 'darkseagreen'];

    useEffect(() => {
        setChoiceLeft(null)
        setChoiceRight(null)
        setAssociatedPairs([])
    },[props.task])

    function handleCardClick(card, side) {
        console.log(`Clicked card ${card.id} on the ${side} side`);
      
            if (associatedPairs.length >= sentences.length) {
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
    console.log(associatedPairs)      

    function handleResetPairs() {
        setAssociatedPairs([]);
    }
         
    function getColorForItem(item) {
        const pair = associatedPairs.find(
            (p) => p.left.sentence === item.sentence || p.right === item
        );
        if (pair) {
            return pair.color;
        } else {
            return 'transparent';
        }
    }
      

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

    const handleSubmit = () => {
        console.log('Submitted Data:', associatedPairs);
        const submitData = {task: task, submitted: associatedPairs}
        saveDataToBackend(submitData, 'actionSeq')
      };

    return (
        <div>
            <h2>{instructions}</h2>

            <Button variant='contained' onClick={handleResetPairs}>Reset</Button>

            <div className='taskTable'>

                {action !== null ? <h2>{action}</h2> : <br/>} 

                <Grid container spacing={2} columns={12} columnSpacing={3} justifyContent="space-evenly">
                <Grid item xs={6} className='left-side'>
                    {order.map((item, index) => (
                    <Grid  item key={index} display='flex'  justifyContent='center' alignItems='center' >
                        <Card 
                            item={item} 
                            handleCardClick={handleCardClick}
                            side='left'
                            isSelected={choiceLeft && choiceLeft.id === item.id}
                            color={getColorForItem(item)}
                            associatedPairs={associatedPairs}
                        />
                    </Grid>
                    ))}
                </Grid>

                <Grid item xs={6} className='right-side'>
                    {sentences.map((item, index) => (
                    <Grid item key={index} display='flex' justifyContent='center' alignItems='center'>
                        <Card
                            item={item} 
                            handleCardClick={handleCardClick}
                            side='right'
                            isSelected={choiceRight === item}
                            color={getColorForItem(item)}
                            associatedPairs={associatedPairs}
                        />
                    </Grid>
                    ))}
                </Grid>

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
                </Grid>
            </div>
            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} sx={{ margin: '16px', width: '20%' }}>Submit</Button>
        </div>
  )
}

export default ActionSequencingTask
