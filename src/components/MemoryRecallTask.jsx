import { Grid, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react'

import saveDataToBackend from '../saveDataToBackend'

const MemoryRecallTask = (props) => {

    const [initialViewingCompleted, setInitialViewingCompleted] = useState(false)
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const task = props.task;
    const model = task.model;
    const instructions = task.instructions;
    const sentences = task.sentences;
    const image = task.image;
    const story = task.text;

    console.log(selectedAnswers)

    useEffect(() => {
        const initialViewingTimeout = setTimeout(() => {
          setInitialViewingCompleted(true);
        }, 60000); // 1 minute
    
        return () => {
          clearTimeout(initialViewingTimeout);
        };
      }, []);
    
    const handleAnswerSelect = (index, answer) => {
        if (!initialViewingCompleted) return; // Disable answer selection during the initial viewing period
        if (index < 0 || index >= sentences.length) return; // Invalid index, do nothing
      
        // Check if the sentence with the same text exists in selectedAnswers
        const existingSentenceIndex = selectedAnswers.findIndex(
          (answer) => answer.text === sentences[index].text
        );
      
        if (existingSentenceIndex !== -1) {
          // If sentence already exists, update its evaluation
          const updatedAnswers = [...selectedAnswers];
          updatedAnswers[existingSentenceIndex].evaluation = answer;
          setSelectedAnswers(updatedAnswers);
        } else {
          // If sentence doesn't exist, add a new entry
          const updatedAnswers = [
            ...selectedAnswers,
            { text: sentences[index].text, evaluation: answer },
          ];
          setSelectedAnswers(updatedAnswers);
        }
    };

    const handleSubmit = () => {
        console.log('Submitted Data:', selectedAnswers);
        const submitData = {task: task, submitted: selectedAnswers}
        saveDataToBackend(submitData, 'memoryRecall')
    };


    return (
        <div>
            
            <h2>{instructions}</h2>

            <div className='taskTable'>
                <Grid container>
                    {!initialViewingCompleted && <Grid item xs={12} md={12}>
                        {/*!initialViewingCompleted ? {story} : */}
                        {image !== undefined ? <img src={image} alt='storyImage' width='80%' /> :
                            <Typography variant='body1' sx={{fontSize: '20px'}}>{story}</Typography>
                        }
                    </Grid>}

                    {initialViewingCompleted && 
                    <Grid item xs={12} md={12}>
                        {sentences.map((item,index) => (
                            <Grid item xs={12} key={index}>
                                <Grid container justifyContent="space-between" spacing={2}>
                                    <Grid item xs={8}>       
                                    <Typography variant="body1" sx={{ fontSize: '20px' }}>
                                        {item.text}
                                    </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleAnswerSelect(index, true)}
                                            disabled={!initialViewingCompleted}
                                        >
                                            True
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleAnswerSelect(index, false)}
                                            disabled={!initialViewingCompleted}
                                        >
                                            False
                                        </Button>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                        ))}
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            onClick={handleSubmit} 
                            sx={{ margin: '16px', width: '20%' }}
                        >
                            Submit
                        </Button>
                    </Grid>
                    }
                </Grid>
            </div>
        </div>
    )
    

}

export default MemoryRecallTask