import React, { useState, useEffect } from 'react'

import ActionSequencingTask from './ActionSequencingTask'
import AssociationTask from './AssociationTask'
import CancellationTask from './CancellationTask'
import CategorizationTask from './CategorizationTask'
import ContextTask from './ContextTask'
import ImagePairTask from './ImagePairTask'
import Maze from './Maze'
import MemoryRecall from './MemoryRecallTask'
import ProblemTask from './ProblemTask'
import SequencingTask from './SequencingTask'
import SoupTask from './SoupTask'
import { Button } from '@mui/material'

const ProfileTask = ({task}) => {

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

    useEffect(() => {
        setCurrentTaskIndex(0)
    }, [task])

    const taskArray = Object.entries(task).map(([taskName, taskData]) => ({
        name: taskName,
        data: taskData,
    }));

    console.log(taskArray)

    const taskComponents = [
        ImagePairTask,
        CancellationTask,
        SequencingTask,
        ProblemTask,
        AssociationTask,
        ContextTask,
        SoupTask,
        Maze,
        CategorizationTask,
        MemoryRecall,
        ActionSequencingTask
    ]

    const CurrentTaskComponent = taskComponents[currentTaskIndex];

    // Check if the current task has data, if not, skip to the next task
    if (!taskArray[currentTaskIndex] || !taskArray[currentTaskIndex].data) {
        setCurrentTaskIndex((prevIndex) => prevIndex + 1);
        return null;
    }

    return (
        <div>



            {currentTaskIndex < taskComponents.length && (
                <CurrentTaskComponent task={taskArray[currentTaskIndex].data} />
            )}

            {currentTaskIndex < taskComponents.length - 1 && (
                <Button variant="contained" onClick={() => setCurrentTaskIndex((prevIndex) => prevIndex + 1)}>Next</Button>
            )}
            {currentTaskIndex === taskComponents.length - 1 && <Button variant="contained">End Training</Button>}
        </div>
    )
}

export default ProfileTask