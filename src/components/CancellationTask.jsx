import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

import saveDataToBackend from '../saveDataToBackend'

const CancellationTask = (props) => {

    const [selectedPositions, setSelectedPositions] = useState([]);
    console.log(selectedPositions)

    const task = props.task
    const target = task.target;
    const instructions = task.instructions;
    const taskArray = task.taskArray;
    const contentType = parseInt(task.numbers);
    const targetSize = task.size;

    // if there are no targets in the props (there are no props), prevent component from rendering
    if (!target) {
        return null;
    }
    const numTaskElem = taskArray.length;
    //console.log(numTaskElem)
    const ncol = Math.ceil(Math.sqrt(numTaskElem));
    

    const handleCheckboxChange = (position) => {
        if (selectedPositions.includes(position)) {
          // If already selected, remove from array
          setSelectedPositions(selectedPositions.filter(pos => pos !== position));
        } else {
          // If not selected, add to array
          setSelectedPositions([...selectedPositions, position]);
        }
    };

    const handleSubmit = () => {
        console.log('Submitted Data:', selectedPositions);
        const submitData = {task: task, submitted: selectedPositions}
        saveDataToBackend(submitData, 'cancellation')
      };

    return (
        <div>
            {contentType === 2 ? (
                <h2>{instructions}{<img src={target} />}</h2>
            ) : (
                <h2>{instructions}{target}</h2>
            )}
            <div className='taskTable'>
                <Grid container justifyContent='center'>
                    <table>
                        <tbody>
                            {Array.from({ length: ncol }, (_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Array.from({ length: ncol }, (_, colIndex) => {
                                        const position = rowIndex * ncol + colIndex;
                                        const hasValue = taskArray[position];

                                        return (
                                            <td key={colIndex} style={{ padding: '5px' }}>
                                                {hasValue && (
                                                    <label>
                                                        <input
                                                            type='checkbox'
                                                            checked={selectedPositions.includes(position)}
                                                            onChange={() => handleCheckboxChange(position)}
                                                            style={{ width: `${targetSize}px` }}
                                                        />
                                                        {contentType === 2 ? (
                                                            <span>
                                                            <img src={taskArray[position]} alt="" style={{ width: `${1.5*targetSize}px`, height: `${1.5*targetSize}px` }} />
                                                            </span>
                                                        ) : (
                                                            <span style={{ fontSize: `${targetSize}px` }}>{taskArray[position]}</span>
                                                        )}
                                                    </label>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Grid>
            
            </div>

            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} sx={{ margin: '16px', width: '20%' }}>Submit</Button>


        </div>
    )
}

export default CancellationTask