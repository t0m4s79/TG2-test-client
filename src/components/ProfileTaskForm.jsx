import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import ProfileTask from './ProfileTask';
import { Button, Checkbox, FormControl, Grid, InputLabel, Typography } from '@mui/material';

const ProfileTaskForm = () => {

    const selectedLanguage = localStorage.getItem('selectedLanguage');

    const [userName, setUserName] = useState('')
    const [attention, setAttention] = useState(3)
    const [memory, setMemory] = useState(3)
    const [execFunction, setExecFunction] = useState(3)
    const [language, setLanguage] = useState(3)
    const [difficulty, setDifficulty] = useState(3)
    const [closeMatch, setCloseMatch] = useState(false)
    const [shouldRenderChild, setShouldRenderChild] = useState(false);
    const [profileTask, setProfileTask] = useState({})
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (Object.keys(profileTask).length > 0) {
          setShouldRenderChild(true);
        } else {
          setShouldRenderChild(false);
        }
    }, [profileTask])

    function handleSubmit(e) {
        e.preventDefault();

        const task = {userName, attention, memory, execFunction, language, difficulty, closeMatch}

        axios.post(`http://localhost:3001/${selectedLanguage}/profile`, task)
        .then(
            console.log('posted ' + JSON.stringify(task))
        )
        .then(res =>{
            console.log(res)
            console.log(res.data)
            setProfileTask(res.data)
            setFormSubmitted(true)
            console.log(profileTask)
        })
        .catch(err => {
            console.log(err.message);
        })

    }

    const handleEditForm = () => {
        setFormSubmitted(false); // Allow editing the form again
    }

    return (
        <div>
            <div>
                <h1>Profile Task</h1>

                <h3>Generation of a personalized cognitive rehabilitation based on individual profiling.</h3>

                <p>Please select the appropriate level of the training in each of the cognitive domains.</p>

                {!formSubmitted && <div>
                    <form onSubmit={handleSubmit}>

                        <TextField
                            label="Patient name"
                            type="text"
                            id="ProfileName"
                            name="ProfileName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            sx={{ width: '30%'}}
                        />
                        <br/>
                        <FormControl sx={{ width: '60%'}}>
                            <Grid container justifyContent='space-between' alignItems='center' spacing={2}>
                                <Grid item xs={2}><Typography>Attention level:</Typography></Grid>
                                <Grid item xs={8}>
                                    <Slider
                                        value={attention}
                                        onChange={(e)=> setAttention(e.target.value)}
                                        min={1}
                                        max={10}
                                        step={0.5}
                                        marks
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        value={attention}
                                        onChange={(e)=> setAttention(e.target.value)}
                                        inputProps={{
                                        type: 'number',
                                        min: 1,
                                        max: 10,
                                        step: 0.5,
                                        style: { width: '50px', marginLeft: '10px' },
                                        }}
                                    />
                                </Grid>       
                            </Grid>   
                        </FormControl>
                        <br/>
                        <FormControl sx={{ width: '60%'}}>
                            <Grid container justifyContent='space-between' alignItems='center' spacing={2}>      
                                <Grid item xs={2}><Typography>Memory level:</Typography></Grid>
                                <Grid item xs={8}>
                                    <Slider
                                        value={memory}
                                        onChange={(e)=> setMemory(e.target.value)}
                                        min={1}
                                        max={10}
                                        step={0.5}
                                        marks
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        value={memory}
                                        onChange={(e)=> setMemory(e.target.value)}
                                        inputProps={{
                                        type: 'number',
                                        min: 1,
                                        max: 10,
                                        step: 0.5,
                                        style: { width: '50px', marginLeft: '10px' },
                                        }}
                                    />
                                </Grid>
                                
                            </Grid>
                        </FormControl>
                        <br/>
                        <FormControl sx={{ width: '60%'}}>
                            <Grid container justifyContent='space-between' alignItems='center' spacing={2}>      
                                <Grid item xs={2}><Typography>Executive function level:</Typography></Grid>
                                <Grid item xs={8}>
                                    <Slider
                                        value={execFunction}
                                        onChange={(e)=> setExecFunction(e.target.value)}
                                        min={1}
                                        max={10}
                                        step={0.5}
                                        marks
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        value={execFunction}
                                        onChange={(e)=> setExecFunction(e.target.value)}
                                        inputProps={{
                                        type: 'number',
                                        min: 1,
                                        max: 10,
                                        step: 0.5,
                                        style: { width: '50px', marginLeft: '10px' },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </FormControl>
                        <br/>
                        <FormControl sx={{ width: '60%'}}>
                            <Grid container justifyContent='space-between' alignItems='center' spacing={2}>      
                                <Grid item xs={2}><Typography>Language level:</Typography></Grid>
                                <Grid item xs={8}>
                                    <Slider
                                        value={language}
                                        onChange={(e)=> setLanguage(e.target.value)}
                                        min={1}
                                        max={10}
                                        step={0.5}
                                        marks
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        value={language}
                                        onChange={(e)=> setLanguage(e.target.value)}
                                        inputProps={{
                                        type: 'number',
                                        min: 1,
                                        max: 10,
                                        step: 0.5,
                                        style: { width: '50px', marginLeft: '10px' },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </FormControl>
                        <br/>
                        <FormControl sx={{ width: '60%'}}>
                            <Grid container justifyContent='space-between' alignItems='center' spacing={2}>      
                                <Grid item xs={2}><Typography>Difficulty level:</Typography></Grid>
                                <Grid item xs={8}>
                                    <Slider
                                        value={difficulty}
                                        onChange={(e)=> setDifficulty(e.target.value)}
                                        min={1}
                                        max={10}
                                        step={0.5}
                                        marks
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        value={difficulty}
                                        onChange={(e)=> setDifficulty(e.target.value)}
                                        inputProps={{
                                        type: 'number',
                                        min: 1,
                                        max: 10,
                                        step: 0.5,
                                        style: { width: '50px', marginLeft: '10px' },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </FormControl>
                        <br/>
                        <FormControl sx={{ width: '60%'}}>
                            <Grid container justifyContent='space-between' alignItems='center' spacing={2}>      
                                <Grid item><Typography>Only generate tasks closely matching the profile</Typography></Grid>
                                <Grid item>
                                    <Checkbox
                                        id="closeMatch"
                                        size='large'
                                        checked={closeMatch}
                                        onChange={(e)=> setCloseMatch(e.target.checked)}
                                    />
                                </Grid>
                            </Grid>
                        </FormControl>
                        <br/>

                        <Button variant="contained" type="submit" color="primary" sx={{ margin: '16px', width: '20%' }}>
                            Generate Training
                        </Button>

                        <Button variant="contained" color="primary" onClick={() => setFormSubmitted(true)} disabled={!profileTask}>Go to task</Button>

                    </form>
                </div> }
            </div>

            {formSubmitted && shouldRenderChild && (
                <div>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleEditForm}
                        sx={{ margin: '10px' }}
                    >
                        Edit Form</Button>
                    <ProfileTask task={profileTask} />
                </div>
            )}
        </div>
                        
    )
}

export default ProfileTaskForm