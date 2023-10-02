import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ImagePairTask from './ImagePairTask'
import { Typography, TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';

const ImagePairsTaskForm = () => {

    const selectedLanguage = localStorage.getItem('selectedLanguage');

    const [size, setSize] = useState('')
    const [imageType, setImageType] = useState('')
    const [timeout, setTimeout] = useState('')
    const [imagePairsTask, setimagePairTask] = useState({})
    const [shouldRenderChild, setShouldRenderChild] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (Object.keys(imagePairsTask).length > 0) {
          setShouldRenderChild(true);
        } else {
          setShouldRenderChild(false);
        }
    }, [imagePairsTask])

    function handleSubmit(e) {
        e.preventDefault();

        const task = {size, timeout, imageType}

        axios.post(`https://tg-api-37pc.onrender.com/${selectedLanguage}/imagePairs`, task)
            .then(
                console.log('posted ' + JSON.stringify(task))
            )
            .then(res =>{
                console.log(res)
                console.log(res.data)
                setimagePairTask(res.data)
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
                <h1>Image Pairs Task</h1>

                <p>Generation of a simple one page text document with a parametrized image pairs memorizing task.</p>

                {!formSubmitted && <div>
                    <form onSubmit={handleSubmit}>

                        <TextField
                            label="Total number of image pairs"
                            variant="outlined"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            sx={{ margin: '16px', width: '20%' }}
                        />
                        <TextField
                            label="Time to recall"
                            variant="outlined"
                            value={timeout}
                            onChange={(e) => setTimeout(e.target.value)}
                            sx={{ margin: '16px', width: '20%' }}
                        />
                        <FormControl sx = {{ minWidth: '20%'}}>
                            <InputLabel>Image type</InputLabel>
                            <Select
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

                        <Button variant="contained" color="primary" onClick={() => setFormSubmitted(true)} disabled={!imagePairsTask}>Go to task</Button>
                    </form>
                </div>
            }
            </div>

            {formSubmitted && shouldRenderChild && (
                <div>
                    <Button variant="contained" color="primary" onClick={handleEditForm}>Edit Form</Button>
                    <ImagePairTask task={imagePairsTask} timeout={timeout}/>
                </div>
            )}

        </div>
    )
    }

export default ImagePairsTaskForm
