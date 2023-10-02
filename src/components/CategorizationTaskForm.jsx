import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CategorizationTask from './CategorizationTask'
import { Button, TextField } from '@mui/material'

const CategorizationTaskForm = () => {

    const selectedLanguage = localStorage.getItem('selectedLanguage');

    const [categories, setCategories] = useState('')
    const [elements, setElements] = useState('')
    const [categorizationTask, setCategorizationTask] = useState({})
    const [shouldRenderChild, setShouldRenderChild] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (Object.keys(categorizationTask).length > 0) {
        setShouldRenderChild(true);
        } else {
        setShouldRenderChild(false);
        }
    }, [categorizationTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const task = {categories, elements}

        axios.post(`http://localhost:3001/${selectedLanguage}/categorization`, task)
            .then(
                console.log('posted ' + JSON.stringify(task))
            )
            .then(response=> {
                //return response.json()
                console.log(response)
                console.log("data: ", response.data)
                setCategorizationTask(response.data)
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
            
        <h1>Categorizartion Task</h1>

        <p>Generation of a simple one page text document with a parametrized categorization task</p><br/>
        
        {!formSubmitted && <div>
            <form onSubmit={handleSubmit}>
            <TextField
                required
                label="Total number of categories"
                type="text"
                id="CategoryElements"
                name="CategoryElements"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                sx={{ margin: '16px', width: '20%' }}
            />

            <TextField
                required
                label="Number of elements per category"
                type="text"
                id="ElementsPerCategory"
                name="ElementsPerCategory"
                value={elements}
                onChange={(e) => setElements(e.target.value)}
                sx={{ margin: '16px', width: '20%' }}
            />

            <Button variant="contained" color="primary" type="submit" sx={{ margin: '16px' }}>
                Generate Training
            </Button>

            <Button variant="contained" color="primary" onClick={() => setFormSubmitted(true)} disabled={!categorizationTask}>Go to task</Button>
            </form>
        </div>}

        {formSubmitted && shouldRenderChild && (
        <div>
            <Button variant="contained" color="primary" onClick={handleEditForm}>Edit Form</Button>
            <CategorizationTask task={categorizationTask} />
        </div>
        )}

    </div>
                
    )
}

export default CategorizationTaskForm