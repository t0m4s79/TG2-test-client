import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import saveDataToBackend from '../saveDataToBackend'

const CategorizationTask = (props) => {

    const task = props.task
    const instructions = task.instructions

    const taskArray = task.taskArray
    const note = task.note
    const allCategoriesList = task.allCategoriesList

    const categories = task.categories
    const elements = task.elements

    const [categorySelections, setCategorySelections] = useState(
        taskArray.map((item) => ({ category: '', dataUrl: item.dataUrl }))
    )

    const numCol = Math.min(categories, elements)
    //console.log('numCol', numCol)

    
    const handleCategoryChange = (index, selectedCategory) => {
        const newSelections = [...categorySelections];
        newSelections[index] = { ...newSelections[index], category: selectedCategory };
        setCategorySelections(newSelections);
    };
    console.log(categorySelections)

    const handleSubmit = () => {
        console.log('Submitted data: ', categorySelections)
        const submitData = {task: task, submitted: categorySelections}
        saveDataToBackend(submitData, 'categorization')
    }

    return (
        <div>

            <h2>{instructions}</h2>

            <div className='taskTable'>

                <Grid container columns={numCol}>
                    {taskArray.map( (item,index) =>(
                        <Grid
                            item
                            xs={1}
                            key={index}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                        <div className={`category-image-${item.category}`}>
                          <img key={item.category} src={item.dataUrl} alt={`category-${item.category}`} />
                          <FormControl>
                            <Select
                                id='category'
                                name="category"
                                value={categorySelections[index].category}
                                onChange={(e) =>
                                handleCategoryChange(index, e.target.value)
                                }
                            >
                                {allCategoriesList.map((elem) => (
                                <MenuItem key={elem} value={elem}>
                                    {elem}
                                </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </div>
                      </Grid>
                    ))}
                </Grid>
                <p>{note}</p>

                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit" 
                    onClick={handleSubmit} 
                    sx={{ margin: '16px', width: '20%' }}
                >
                    Submit
                </Button>

            </div>

        </div>
    )
    }

export default CategorizationTask