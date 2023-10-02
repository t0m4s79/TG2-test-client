import React, { useState, useEffect } from 'react'
import { Typography, Grid, Radio, FormControlLabel, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

import saveDataToBackend from '../saveDataToBackend'

const ContextTask = (props) => {

    const task = props.task
    const instructions = task.instructions
    const contextImage = task.image
    const sentences = task.sentences

    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [formData, setFormData] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // Reset form data and selection when props change
        setCurrentSentenceIndex(0)
        setSelectedOption()
        setFormData('');
        setIsSubmitted(false)
      }, [props.task]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleNextSentence = () => {
        const updatedFormData = [
            ...formData,
            { sentence: sentences[currentSentenceIndex], selection: selectedOption },
          ];
        if (currentSentenceIndex < sentences.length - 1) {
            setCurrentSentenceIndex(currentSentenceIndex + 1);
            setSelectedOption('');
        } else {
            setFormData((prevData) => [
                ...prevData,
                { sentence: sentences[currentSentenceIndex], selection: selectedOption },
              ]);
            setIsSubmitted(true);
            formSubmit(updatedFormData)
        }
        setFormData(updatedFormData)
    };

    const formSubmit = (data) => {
        console.log('Submit context data', data)
        const submitData = {task: task, submitted: data}
        saveDataToBackend(submitData, 'context')
    }

    if(!sentences){
        return null
    }

    return (
        <div>
            
            <Typography variant="h4" sx={{marginTop:'2rem'}}>{instructions}</Typography>

            <Grid container alignItems="center" sx={{marginTop:'2rem'}}>
                <Grid item xs={12} md={6} justifyContent="center" alignItems="center">
                    <img src={contextImage} alt="contextImage" />
                </Grid>
                
                <Grid item xs={12} md={6} justifyContent="center" alignItems="center">
                    <Grid container justifyContent='space-evenly'>
                        <Grid item xs={12}>
                            <Typography variant="body1">{sentences[currentSentenceIndex]}</Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <FormControlLabel
                                control={
                                <Radio
                                    checked={selectedOption === 'correct'}
                                    onChange={handleOptionChange}
                                    value="correct"
                                    color='success'
                                />
                                }
                                label={<CheckIcon fontSize="large" color='success' />}
                            />
                            </Grid>

                        <Grid item xs={6} md={6}>
                            <FormControlLabel
                                control={
                                <Radio
                                    checked={selectedOption === 'incorrect'}
                                    onChange={handleOptionChange}
                                    value="incorrect"
                                    color='error'
                                />
                                }
                                label={<ClearIcon fontSize="large" color='error'/>}
                            />
                            </Grid>
                    </Grid>
                    {selectedOption && (

                            <Button variant="contained" onClick={handleNextSentence} disabled={isSubmitted}>
                                {currentSentenceIndex < sentences.length - 1 ? 'Next' : 'Submit'}
                            </Button>

                        )}
                </Grid>
            </Grid>
        </div>
    )
}

export default ContextTask