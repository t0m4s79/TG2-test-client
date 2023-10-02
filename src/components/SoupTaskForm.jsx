import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import SoupTask from './SoupTask';

const SoupTaskForm = () => {

    const selectedLanguage = localStorage.getItem('selectedLanguage');

    const [elements, setElements] = useState('')
    const [cues, setCues] = useState('')
    const [soupTask, setSoupTask] = useState({})
    const [shouldRenderChild, setShouldRenderChild] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (Object.keys(soupTask).length > 0) {
          setShouldRenderChild(true);
        } else {
          setShouldRenderChild(false);
        }
      }, [soupTask]);

    function handleSubmit(e) {
        e.preventDefault();

        const task = {elements, cues}

        axios.post(`http://localhost:3001/${selectedLanguage}/wordSoup`, task)
            .then(
                console.log('posted ' + JSON.stringify(task))
            )
            .then(res =>{
                console.log(res)
                console.log(res.data)
                setSoupTask(res.data)
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
            <h1>Scrambled Words</h1>
    
            <p>
                Generation of a simple one page text document with a parametrized word search task.
            </p>

            {!formSubmitted && <div>
                <form onSubmit={handleSubmit}>

                    <TextField
                        required
                        label="Total number of words"
                        type="text"
                        id="soupElements"
                        name="soupElements"
                        value={elements}
                        onChange={(e) => setElements(e.target.value)}
                        sx={{ margin: '16px', width: '20%' }}
                    />
        
                    <FormControl sx = {{ minWidth: '20%'}}>
                        <InputLabel htmlFor="Cues">Show cues:</InputLabel>
                        <Select
                            id="Cues"
                            name="Cues"
                            value={cues}
                            onChange={(e) => setCues(e.target.value)}
                            sx={{ margin: '16px' }}
                        >
                            <MenuItem value="">
                                <em>Select an option</em>
                            </MenuItem>
                            <MenuItem value="0">No cues</MenuItem>
                            <MenuItem value="1">With cues</MenuItem>
                        </Select>
                    </FormControl>
        
                    <Button variant="contained" type="submit" name="submit" sx={{ margin: '16px', width: '20%' }}>
                        Generate Training
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => setFormSubmitted(true)} disabled={!soupTask}>Go to task</Button>
                </form>
            </div>}
    
            {formSubmitted && shouldRenderChild && (
                <div>
                    <Button variant="contained" color="primary" onClick={handleEditForm}>Edit Form</Button>
                    <SoupTask task={soupTask} />
                </div>

            )}
        </div>
    );
    
}

export default SoupTaskForm