import React, { useState } from 'react'
import axios from 'axios';
import ProblemTask from './ProblemTask';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Tooltip } from '@mui/material';

const ProblemTaskForm = () => {

    const selectedLanguage = localStorage.getItem('selectedLanguage');

    const [size, setSize] = useState('')
    const [tens, setTens] = useState('')
    const [explicit, setExplicit] = useState('')
    const [problemTask, setProblemTask] = useState({})
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const task = {size, tens, explicit}

        axios.post(`http://localhost:3001/${selectedLanguage}/problem`, task)
        .then(
            console.log('posted ' + JSON.stringify(task))
        )
        .then(res =>{
          console.log(res)
          console.log(res.data)
          setProblemTask(res.data)
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
            
            <h1>Problem Resolution Task</h1>

            <p>
                Generation of a simple one page document with a list of problems to solve.
            </p>

            {!formSubmitted && <div>
                <form onSubmit={handleSubmit}>

                    <Tooltip title='Problem length' placement='top-start' arrow>
                        <TextField
                                required
                                label="Problem length"
                                type="text"
                                id="ProblemElements"
                                name="ProblemElements"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                sx={{ margin: '16px', width: '20%' }}
                            />
                        </Tooltip>

                    <FormControl sx={{ width: '20%' }}>
                        <InputLabel id='ProblemDigitsLabel'>Number of digits</InputLabel>
                        <Select
                            required
                            labelID="ProblemDigitsLabel"
                            id="ProblemDigits"
                            name="ProblemDigits"
                            value={tens}
                            onChange={(e) => setTens(e.target.value)}
                            sx={{ margin: '16px' }}
                        >
                            <MenuItem value="0">less than 2</MenuItem>
                            <MenuItem value="1">more than 2</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ width: '20%' }}>
                        <InputLabel id='ProblemTypeLabel'>Type of problem</InputLabel>
                        <Select
                            required
                            labelID="ProblemTypeLabel"
                            id="ProblemType"
                            name='ProblemType'
                            value={explicit}
                            onChange={(e) => setExplicit(e.target.value)}
                            sx={{ margin: '16px' }}
                        >
                            <MenuItem value="0">Explicit</MenuItem>
                            <MenuItem value="1">Implicit</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" color="primary" type="submit" sx={{ margin: '16px', width: '20%' }}>
                        Generate Training
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => setFormSubmitted(true)} disabled={!problemTask}>Go to task</Button>
                </form>
            </div> }

            {formSubmitted && problemTask && (
            <div>
                <Button variant="contained" color="primary" onClick={handleEditForm}>Edit Form</Button>
                <ProblemTask task={problemTask}/>
            </div>
            )}
        </div>
    )
}

export default ProblemTaskForm