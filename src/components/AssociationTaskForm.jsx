import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AssociationTask from './AssociationTask'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const AssociationTaskForm = () => {

    const selectedLanguage = localStorage.getItem('selectedLanguage');

    const [size, setSize] = useState('')
    const [associationTask, setAssociationTask] = useState({})
    const [imageType, setImageType] = useState('0')
    const [shouldRenderChild, setShouldRenderChild] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (Object.keys(associationTask).length > 0) {
          setShouldRenderChild(true);
        } else {
          setShouldRenderChild(false);
        }
      }, [associationTask]);

    function handleSubmit(e) {
        e.preventDefault();

        const task = {size, imageType}

        axios.post(`https://tg-api-37pc.onrender.com/${selectedLanguage}/association`, task)
            .then(
                console.log('posted ' + JSON.stringify(task))
            )
            .then(res =>{
                console.log(res)
                console.log(res.data)
                setAssociationTask(res.data)
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
                <h1>Association Task </h1>

                <p>Generation of a simple one page text document with a parametrized association task</p>

                {!formSubmitted && <div>
                    <form onSubmit={handleSubmit}>

                        <TextField
                            required
                            label='Total number of associations'
                            type='text'
                            id="AssociationElements"
                            name="AssociationElements"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            sx={{ margin: '16px', width: '20%' }}
                        />


                        <FormControl sx = {{ minWidth: '20%'}}>
                            <InputLabel htmlFor="AssociationImage">Image type</InputLabel>
                            <Select
                                id="AssociationImage"
                                name="AssociationImage"
                                value={imageType}
                                onChange={(e) => setImageType(e.target.value)}
                                sx={{ margin: '16px' }}
                            >
                                <MenuItem value="0">Clip art</MenuItem>
                                <MenuItem value="1">Pictures</MenuItem>
                            </Select>
                        </FormControl>

                        <Button variant="contained" color="primary" type="submit" sx={{ margin: '16px', width: '20%'}}>
                            Generate Training
                        </Button>

                        <Button variant="contained" color="primary" onClick={() => setFormSubmitted(true)} disabled={!associationTask}>Go to task</Button>
                    </form>
                </div>
                }
            </div>

            {formSubmitted && shouldRenderChild && (
                <div>
                    <Button variant="contained" color="primary" onClick={handleEditForm}>Edit Form</Button>
                    <AssociationTask task={associationTask}/>
                </div>
            )}
        </div>
    )
}

export default AssociationTaskForm
