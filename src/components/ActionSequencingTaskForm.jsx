import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ActionSequencingTask from './ActionSequencingTask'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

const ActionSequencingTaskForm = () => {

    const selectedLanguage = localStorage.getItem('selectedLanguage');

    const [actionType, setActionType] = useState('')
    const [elements, setElements] = useState('')
    const [actionSeqTask, setActionSeqTask] = useState({})
    const [shouldRenderChild, setShouldRenderChild] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (Object.keys(actionSeqTask).length > 0) {
          setShouldRenderChild(true);
        } else {
          setShouldRenderChild(false);
        }
      }, [actionSeqTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const task = {actionType, elements}
        //console.log(task)

        axios.post(`http://localhost:3001/${selectedLanguage}/actionsequencing`, task)
            .then(
                console.log('posted ', task)
            )
            .then(response=> {
                //return response.json()
                console.log(response)
                console.log("data: ", response.data)
                setActionSeqTask(response.data)
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
                
            <h1>Action Sequencing Task</h1>

            <p>
                Generation of a simple one page text document with a parametrized action sequencing task
            </p>

            {!formSubmitted && <div>
                <form onSubmit={handleSubmit}>
                    <FormControl sx = {{ minWidth: '10%'}}>
                        <InputLabel>Type of problem</InputLabel>
                        <Select
                            id="actionType"
                            name="actionType"
                            value={actionType}
                            onChange={(e) => setActionType(e.target.value)}
                            sx={{ margin: '16px' }}
                        >
                            <MenuItem value="0">Implicit</MenuItem>
                            <MenuItem value="1">Explicit</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        margin="normal"
                        id="ElementsPerAction"
                        name="ElementsPerAction"
                        label="Number of elements"
                        type="text"
                        value={elements}
                        onChange={(e) => setElements(e.target.value)}
                        sx={{ margin: '16px', width: '20%' }}
                    />

                    <Button variant="contained" color="primary" type="submit" sx={{ margin: '16px', width: '20%' }}>
                        Generate Training
                    </Button>

                    <Button variant="contained" color="primary" onClick={() => setFormSubmitted(true)} disabled={!actionSeqTask}>Go to task</Button>
                </form>
            </div> }

            {formSubmitted && shouldRenderChild && (
                <div>
                    <Button variant="contained" color="primary" onClick={handleEditForm}>Edit Form</Button>
                    <ActionSequencingTask task={actionSeqTask}/>
                </div>
            )}

        </div>
  )
}

export default ActionSequencingTaskForm