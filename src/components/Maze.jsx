// Original code by tomliangg
// Source: https://codesandbox.io/s/g6vuy?file=/src/App.js

// Modified by <Your Name>
// Changes Made:
// - Added a userPath state variable to register the nodes the user has visited
//      using this we can draw the user's path leaving 'bread crumbs'
// - Added a 'turn counter' to keep track of how many moves a user has made
//      using userPath state variable we keep track of how many elements are there using length()
// - Removed cheat mode
// - Added a d-pad to control the movement of the cell through the maze


import { useState, useMemo, useEffect } from "react";
import "./../styles.scss";
import Grid from '@mui/material/Grid';
import Dpad from "./Dpad";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import saveDataToBackend from "../saveDataToBackend";

const Maze = (props) => {

    const [status, setStatus] = useState("playing");
    const [userPath, setUserPath] = useState([]);
    const [userPosition, setUserPosition] = useState([0, 0]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const task = props.task;
    //const model = task.model;
    const instructions = task.instructions;
    const maze = task.maze;

    //const maze = useMemo(() => generateMaze(size, size), [size, gameId]);

    useEffect(() => {
        setUserPosition([0, 0]);
        setStatus("playing");
        setUserPath([])
    },[])

    useEffect(() => {
        const lastRowIndex = maze.length - 1;
        const lastColIndex = maze[0].length - 1;
        if (userPosition[0] === lastRowIndex && userPosition[1] === lastColIndex) {
        setStatus("won");
        setIsDialogOpen(true);
        }
    }, [userPosition[0], userPosition[1]]);

    const makeClassName = (i, j) => {
        const rows = maze.length;
        const cols = maze[0].length;
        let arr = [];
        if (maze[i][j][0] === 0) {
            arr.push("topWall");
        }
        if (maze[i][j][1] === 0) {
            arr.push("rightWall");
        }
        if (maze[i][j][2] === 0) {
            arr.push("bottomWall");
        }
        if (maze[i][j][3] === 0) {
            arr.push("leftWall");
        }
        if (i === rows - 1 && j === cols - 1) {
            arr.push("destination");
        }
        if (i === userPosition[0] && j === userPosition[1]) {
            arr.push("currentPosition");
        }
        if (userPath.some((position) => position[0] === i && position[1] === j)) {
            arr.push("userPath");
        }
        return arr.join(" ");
    };

    const handleMove = (direction) => {
        if (status !== "playing") {
        return;
        }
        const [i, j] = userPosition;
        switch (direction) {
        case "up":
            if (maze[i][j][0] === 1) {
            setUserPosition([i - 1, j]);
            setUserPath((prevPath) => [...prevPath, [i - 1, j]]);
            }
            break;
        case "right":
            if (maze[i][j][1] === 1) {
            setUserPosition([i, j + 1]);
            setUserPath((prevPath) => [...prevPath, [i, j + 1]]);
            }
            break;
        case "down":
            if (maze[i][j][2] === 1) {
            setUserPosition([i + 1, j]);
            setUserPath((prevPath) => [...prevPath, [i + 1, j]]);
            }
            break;
        case "left":
            if (maze[i][j][3] === 1) {
            setUserPosition([i, j - 1]);
            setUserPath((prevPath) => [...prevPath, [i, j - 1]]);
            }
            break;
        default:
            break;
        }
    };

    const handleKeyPress = (e) => {
        const key = e.code;
        if (key === "ArrowUp" || key === "KeyW") {
        handleMove("up");
        } else if (key === "ArrowRight" || key === "KeyD") {
        handleMove("right");
        } else if (key === "ArrowDown" || key === "KeyS") {
        handleMove("down");
        } else if (key === "ArrowLeft" || key === "KeyA") {
        handleMove("left");
        }
    };

    const mazeRoute = {userPath: userPath, moves: userPath.length}
  
    const handleSubmit = () => {
        console.log('Submitted Data:', userPath )
        const submitData = {task: task, submitted: mazeRoute}
        saveDataToBackend(submitData, 'maze')
        setIsDialogOpen(false);
    };

  return (
    <div>
        <div>

            <h1>{instructions}</h1>

            <div className="Maze" onKeyDown={handleKeyPress} tabIndex={-1}>
                <Grid container spacing={1} direction="row" justifyContent="space-evenly" alignItems="stretch" style={{ height: "100%" }}>
                    <Grid item>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <Dpad handleMove={handleMove}/>  
                            {/* Display the number of moves */}
                            <p>Number of moves: <b>{userPath.length}</b></p>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8} >
                        <Grid container justifyContent="center" alignItems="center">
                        <table id="maze">
                            <tbody >
                            {maze.map((row, i) => (
                                <tr key={`row-${i}`}>
                                {row.map((cell, j) => (
                                    <td key={`cell-${i}-${j}`} className={makeClassName(i, j)}>
                                    <div />
                                    </td>
                                ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Dialog
                open={isDialogOpen}
                onClose={handleSubmit}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                >
                <DialogTitle id="dialog-title">
                    Congratulations! You won!
                </DialogTitle>
                <DialogContent>
                    <p id="dialog-description">Submit your result</p>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>
  );
}

export default Maze