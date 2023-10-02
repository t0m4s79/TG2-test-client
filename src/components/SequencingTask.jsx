import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import saveDataToBackend from '../saveDataToBackend';

const SequencingTask = (props) => {

  //console.log(props)
  const task = props.task;
  const instructions = task.instructions;
  const sequence = task.sequence;

  const [inputValues, setInputValues] = useState(new Array(sequence.length).fill([]).map(() => new Array(sequence[0].length).fill('')));

  const handleInputChange = (row, col, value) => {
    const newInputValues = [...inputValues];
    newInputValues[row][col] = value;
    setInputValues(newInputValues);
  };

  const handleSubmit = () => {
    console.log('Submitted Data:', inputValues);
    const submitData = {task: task, submitted: inputValues}
    saveDataToBackend(submitData, 'sequencing')
  };

  if (!sequence) {
    return null;
  }

  return (
    <div>
    
        <h2>{instructions}</h2>

        <div className='taskTable'>
            <Grid container columns={16}>
                {sequence.map( (seq, rowIndex) =>(
                    <div key={rowIndex} className={`row-${rowIndex}`}>
                        {seq.map( (elem, colIndex) => (
                            <Grid item xs={1} key={`row-${rowIndex}-${colIndex}`} display="flex" justifyContent="center" alignItems="center">
                            {elem === '__' ? (
                            <TextField
                                id={`input-${rowIndex}-${colIndex}`}
                                variant="standard"
                                type="number"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                value={inputValues[rowIndex][colIndex]}
                                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                            />
                            ) : (
                            elem
                            )}
                        </Grid>
                        ) )}
                    </div>
                ))}
            </Grid>

            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} sx={{ margin: '16px', width: '20%' }}>Submit</Button>
        </div>
    </div>
  )
}

export default SequencingTask