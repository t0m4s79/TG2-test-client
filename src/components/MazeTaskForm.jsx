import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Maze from './Maze'

const MazeTaskForm = () => {

    const selectedLanguage = localStorage.getItem('selectedLanguage');

    const [mazeElements, setMazeElements] = useState('')
    const [mazeTask, setMazeTask] = useState({})
    const [shouldRenderChild, setShouldRenderChild] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (Object.keys(mazeTask).length > 0) {
          setShouldRenderChild(true);
        } else {
          setShouldRenderChild(false);
        }
    }, [mazeTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const task = {mazeElements}
        //console.log(task)

        axios.post(`http://localhost:3001/${selectedLanguage}/maze`, task)
            .then(
                console.log('posted ', task)
            )
            .then(response=> {
                //return response.json()
                console.log(response)
                console.log("data: ", response.data)
                setMazeTask(response.data)
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
            <h1>Labyrinth</h1>

            <p>
                Generation of a simple one page text document with a parametrized labyrinth task.
            </p>

            {!formSubmitted && <div>
                <form onSubmit={handleSubmit}>
                    
                    <TextField
                        id="mazeElements"
                        label="Total Number of Layers"
                        value={mazeElements}
                        onChange={(e) => setMazeElements(e.target.value)}
                        variant="outlined"
                        sx={{ margin: '16px', width: '20%' }}
                    />
                    
                    <Button variant="contained" color="primary" type="submit" sx={{ margin: '16px', width: '20%' }}>
                        Generate Training
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => setFormSubmitted(true)} disabled={!mazeTask}>Go to task</Button>
                </form>
            </div>
            }

            {formSubmitted && shouldRenderChild && (
                <div>
                    <Button variant="contained" color="primary" onClick={handleEditForm}>Edit Form</Button>
                    <Maze task={mazeTask}/>
                </div>
            )}
        </div>
    )
}

export default MazeTaskForm