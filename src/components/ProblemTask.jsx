import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';

import saveDataToBackend from '../saveDataToBackend'

const ProblemTask = (props) => {

    const task = props.task;
    const sequence = task.sequenceArray;
    const instructions = task.instructions;
    const explicit = task.explicit;

    // Initialize state to store input values
    const [inputValues, setInputValues] = useState(
        new Array(sequence.length).fill('')
    );

    // Function to handle input value change
    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    };

    const handleSubmit = () => {
        console.log('Submitted Data:', inputValues);
        const submitData = {task: task, submitted: inputValues}
        saveDataToBackend(submitData, 'problem')
    };

    if (!sequence) {
        return null;
    }

    if (explicit != 1){
        return (
            <div>
                <h2>{instructions}</h2>

                <div className='taskTable'>
                    <Grid container>
                        {sequence.map( (seq,index) =>(
                            <Grid container columns={30} justifyContent='center' className={`row-${index}`}>
                                {seq.map( (elem, i) => (
                                    <Grid  item xs={1} key={`row-${index}-${i}`} display="flex" justifyContent="center" alignItems="center">
                                        <Typography variant='body1' sx={{fontSize: '20px'}}>{elem == ' * ' ? 'x' : elem}</Typography>
                                    </Grid>
                                ) )}
                                <Grid  item xs={1} display="flex" justifyContent="center" alignItems="center">
                                    <TextField
                                        id={`input-${index}`}
                                        variant="standard"
                                        type="number"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        value={inputValues[index]}
                                        onChange={(e) =>
                                            handleInputChange(index, e.target.value)
                                        }
                                    />
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </div>

                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} sx={{ margin: '16px', width: '20%' }}>Submit</Button>

            </div>
        )
    }
    else{
        return(
            <div>
                <h2>{instructions}</h2>

                <div className='taskTable'>

                    {sequence.map((item, index) =>(
                         <Grid container justifyContent='space-between' spacing={2} rowSpacing={3} className={`row-${index}`}>         
                            <Grid item key={`row-${index}`}>
                                <Typography variant='body1' sx={{fontSize: '20px'}}>{item}</Typography>
                            </Grid>

                            <Grid item xs={1}>
                                <TextField
                                    id={`input-${index}`}
                                    variant="standard"
                                    type="number"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    value={inputValues[index]}
                                    onChange={(e) =>
                                        handleInputChange(index, e.target.value)
                                    }
                                />
                            </Grid>
                     </Grid>
                    ) )}
                </div>

                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} sx={{ margin: '16px', width: '20%' }}>Submit</Button>
            </div>
        )
    }
}

export default ProblemTask