import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SequencingTask from './SequencingTask';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, Tooltip } from '@mui/material';

const SequencingTaskForm = () => {

    const selectedLanguage = localStorage.getItem('selectedLanguage');

    const [elements, setElements] = useState('');
    const [missing, setMissing] = useState('');
    const [step, setStep] = useState('');
    const [order, setOrder] = useState('0');
    const [where, setWhere] = useState('0');
    const [sequenceTask, setSequenceTask] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const task = {elements, step, order, where, missing}

        axios.post(`http://localhost:3001/${selectedLanguage}/sequencing`, task)
            .then(
                console.log('posted ' + JSON.stringify(task))
            )
            .then(res =>{
              console.log(res)
              console.log(res.data)
              setSequenceTask(res.data)
              setFormSubmitted(true)
            })
            .catch(err => {
              console.log(err.message);
          })
    }
    const handleEditForm = () => {
        setFormSubmitted(false); // Allow editing the form again
      };

  return (
    <div>
        <h1>Sequencing Task</h1>

        <p> Generation of a simple one page document with a custom madeparametrized numer sequencing task.</p><br />
        
        {!formSubmitted && <div>
            <form onSubmit={handleSubmit}>
                <Tooltip title='Sequence length' placement='top-start' arrow>
                    <TextField
                        required
                        label="Sequence length"
                        type="text"
                        id="SequenceElements"
                        name="SequenceElements"
                        value={elements}
                        onChange={(e) => setElements(e.target.value)}
                        sx={{ margin: '16px', width: '20%' }}
                    />
                </Tooltip>

                <Tooltip title='Number of missing elements' placement='top-start' arrow>
                    <TextField
                        required
                        label="Number of missing elements"
                        type="text"
                        id="SequenceMissing"
                        name="SequenceMissing"
                        value={missing}
                        onChange={(e) => setMissing(e.target.value)}
                        sx={{ margin: '16px', width: '20%' }}
                    />
                </Tooltip>

                <Tooltip title='Sequence step size' placement='top-start' arrow>
                    <TextField
                        required
                        label="Sequence step size"
                        type="text"
                        id="SequenceStep"
                        name="SequenceStep"
                        value={step}
                        onChange={(e) => setStep(e.target.value)}
                        sx={{ margin: '16px', width: '20%' }}
                    />
                </Tooltip>

                <FormControl sx = {{ minWidth: '10%'}}>
                    <InputLabel id='SequenceNumbersLabel'>Sequence order</InputLabel>
                    <Select
                        required
                        labelID="SequenceNumbersLabel"
                        id="SequenceNumbers"
                        name="SequenceNumbers"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        sx={{ margin: '16px' }}
                    >
                        <MenuItem value="0">Ascending</MenuItem>
                        <MenuItem value="1">Descending</MenuItem>
                        <MenuItem value="2">Any</MenuItem>
                    </Select>
                </FormControl>
                
                <FormControl sx = {{ minWidth: '10%'}}>
                    <InputLabel id='SequenceWhereLabel' >Position of missing elements</InputLabel>
                    <Select
                        required
                        labelID="SequenceWhereLabel"
                        id="SquenceWhere"
                        name="SquenceWhere"
                        value={where}
                        onChange={(e) => setWhere(e.target.value)}
                        sx={{ margin: '16px' }}
                    >
                        <MenuItem value="0">Beginning</MenuItem>
                        <MenuItem value="1">Any</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" type="submit" color="primary" sx={{ margin: '16px', width: '20%' }}>
                    Generate Training
                </Button>

                <Button variant="contained" color="primary" onClick={() => setFormSubmitted(true)} disabled={!sequenceTask}>Go to task</Button>
            </form>
        </div> }

        {formSubmitted && sequenceTask && (
            <div>
                <Button variant="contained" color="primary" onClick={handleEditForm}>Edit Form</Button>
                <SequencingTask task={sequenceTask} />
            </div>
        )}
    </div>
  )
}

export default SequencingTaskForm