import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CancellationTask from './CancellationTask';
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Tooltip } from '@mui/material';

const CancellationTaskForm = () => {

    const selectedLanguage = localStorage.getItem('selectedLanguage');

    const [elements, setElements] = useState('');
    const [probability, setProbability] = useState('');
    const [size, setSize] = useState('30');
    const [numbers, setNumbers] = useState('0');
    const [order, setOrder] = useState('0');
    const [cancelTask, setCancelTask] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const task = {elements,probability,size,numbers,order}
        //console.log(task)

        axios.post(`http://localhost:3001/${selectedLanguage}/cancellation`, task)
            .then(
                console.log('posted ' + JSON.stringify(task))
            )
            .then(response=> {
                //return response.json()
                console.log(response)
                console.log("data: " , response.data)
                setCancelTask(response.data)
                setFormSubmitted(true);
            })
            .catch(err => {
            })
    }

    const handleEditForm = () => {
        setFormSubmitted(false); // Allow editing the form again
      };

  return (
    <div>
        <h1>Cancellation Task</h1>

        <p>Generation of a simple one page text document with a custom made parametrized cancellation task</p><br/>
        
        {!formSubmitted && <div>
            <form onSubmit={handleSubmit}>
                <Tooltip title='Total number of elements' placement='top-start' arrow>     
                    <TextField
                        required
                        id="CancellationElements"
                        name="CancellationElements"
                        fullWidth
                        label="Total number of elements"
                        value={elements}
                        onChange={(e) => setElements(e.target.value)}
                        sx={{ margin: '16px', width: '20%' }}
                    />
                </Tooltip>

                <Tooltip title='Percentage of target elements' placement='top-start' arrow>
                    <TextField
                        required
                        id="CancellationProbability"
                        name="CancellationProbability"
                        fullWidth
                        label="Percentage of target elements"
                        value={probability}
                        onChange={(e) => setProbability(e.target.value)}
                        sx={{ margin: '16px', width: '20%' }}
                    />
                </Tooltip>

                <Tooltip title='Target size' placement='top-start' arrow>
                        <TextField
                            required
                            id="CancellationSize"
                            name="CancellationSize"
                            fullWidth
                            label="Target size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            sx={{ margin: '16px', width: '20%' }}
                        />
                </Tooltip>

                <FormControl sx = {{ minWidth: '10%'}}>
                    <InputLabel id="CancellationNumbersLabel">Content type</InputLabel>
                    <Select
                        labelId="CancellationNumbersLabel"
                        id="CancellationNumbers"
                        name="CancellationNumbers"
                        value={numbers}
                        onChange={(e) => setNumbers(e.target.value)}
                        sx={{ margin: '16px' }}
                    >
                        <MenuItem value="0">Text</MenuItem>
                        <MenuItem value="1">Numbers</MenuItem>
                        <MenuItem value="2">Symbols</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx = {{ minWidth: '10%'}}>
                    <InputLabel id="CancellationOrderLabel">Organization type</InputLabel>
                    <Select
                        labelId="CancellationOrderLabel"
                        id="CancellationOrder"
                        name="CancellationOrder"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        sx={{ margin: '16px' }}
                    >
                        <MenuItem value="0">Ordered</MenuItem>
                        <MenuItem value="1">Not ordered</MenuItem>
                    </Select>
                </FormControl>
                            
                <Button variant="contained" color="primary" type="submit" sx={{ margin: '16px', width: '20%' }}>Generate Training</Button>

                <Button variant="contained" color="primary" onClick={() => setFormSubmitted(true)} disabled={!cancelTask}>Go to task</Button>

            </form>
        </div> }
        
            {formSubmitted && cancelTask && (
                <div>
                    <Button variant="contained" color="primary" onClick={handleEditForm}>Edit Form</Button>
                    <CancellationTask task={cancelTask} numbers={numbers} size={size}/>
                </div>
            )}
    </div>

  )
}

export default CancellationTaskForm