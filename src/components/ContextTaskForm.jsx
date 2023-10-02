import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ContextTask from './ContextTask';
import { Button, TextField } from '@mui/material';

const ContextTaskForm = () => {

    const selectedLanguage = localStorage.getItem('selectedLanguage');

  const [size, setSize] = useState('')
  const [contextTask, setContextTask] = useState({})
  const [shouldRenderChild, setShouldRenderChild] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);


    useEffect(() => {
        if (Object.keys(contextTask).length > 0) {
        setShouldRenderChild(true);
        } else {
        setShouldRenderChild(false);
        }
    }, [contextTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {size}

    axios.post(`http://localhost:3001/${selectedLanguage}/context`, task)
            .then(
                console.log('posted ' + JSON.stringify(task))
            )
            .then(response=> {
                //return response.json()
                console.log(response)
                console.log("data: " + response.data)
                setContextTask(response.data)
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

    <div>
        <h1>Context Task</h1>

        <p>Generation of a simple one page text document with a parametrized context understanding task. Indicate whether the statements are correct or incorrect.</p>

        {!formSubmitted && <div>
            <form onSubmit={handleSubmit}>

                <TextField
                    required
                    label="Total number of statements"
                    type="text"
                    id="ContextElements"
                    name="ContextElements"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    sx={{ margin: '16px', width: '20%' }}
                />

                <Button variant="contained" color="primary" type="submit" sx={{ margin: '16px' }}>
                    Generate Training
                </Button>

                <Button variant="contained" color="primary" onClick={() => setFormSubmitted(true)} disabled={!contextTask}>Go to task</Button>
            </form>
        </div>}
    </div>

      {formSubmitted && shouldRenderChild && (
        <div>
            <Button variant="contained" color="primary" onClick={handleEditForm}>Edit Form</Button>
            <ContextTask task={contextTask}/>
        </div>
        )}
    </div>
  )
}

export default ContextTaskForm