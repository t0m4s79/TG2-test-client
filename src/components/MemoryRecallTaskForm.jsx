import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MemoryRecallTask from './MemoryRecallTask'

const MemoryRecallTaskForm = () => {

    const selectedLanguage = localStorage.getItem('selectedLanguage');

    const [storyType, setStoryType] = useState('')
    const [storyQuestions, setStoryQuestions] = useState('')
    const [storyTask, setStoryTask] = useState({})
    const [shouldRenderChild, setShouldRenderChild] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (Object.keys(storyTask).length > 0) {
          setShouldRenderChild(true);
        } else {
          setShouldRenderChild(false);
        }
    }, [storyTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const task = {storyType, storyQuestions}
        //console.log(task)

        axios.post(`https://tg-api-37pc.onrender.com/${selectedLanguage}/memoryRecall`, task)
            .then(
                console.log('posted ', task)
            )
            .then(response=> {
                //return response.json()
                console.log(response)
                console.log("data: ", response.data)
                setStoryTask(response.data)
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
            <h1>Memory recall</h1>

            <p>
                Generation of a simple one page text document with a parametrized memory recall task.
            </p>

            {!formSubmitted && <div>
                <form onSubmit={handleSubmit}>

                    <FormControl sx = {{ minWidth: '10%'}}>
                        <InputLabel id="storyType-label">Story Type</InputLabel>
                        <Select
                            labelId="storyType-label"
                            id="storyType"
                            value={storyType}
                            label="Story Type"
                            onChange={(e) => setStoryType(e.target.value)}
                            sx={{ margin: '16px' }}
                        >
                            <MenuItem value={0}>Text short</MenuItem>
                            <MenuItem value={1}>Text medium</MenuItem>
                            <MenuItem value={2}>Text long</MenuItem>
                            <MenuItem value={3}>Images</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        id="storyQuestions"
                        label="Problem Length"
                        value={storyQuestions}
                        onChange={(e) => setStoryQuestions(e.target.value)}
                        variant="outlined"
                        sx={{ margin: '16px', width: '20%' }}
                    />

                    <Button variant="contained" color="primary" type="submit" sx={{ margin: '16px', width: '20%' }}>
                        Generate Training
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => setFormSubmitted(true)} disabled={!storyTask}>Go to task</Button>
                </form>
                </div>}

            {formSubmitted && shouldRenderChild && (
                <div>
                    <Button variant="contained" color="primary" onClick={handleEditForm}>Edit Form</Button>
                    <MemoryRecallTask task={storyTask}/>
                </div>    
                )}
        </div>
    )
}

export default MemoryRecallTaskForm
