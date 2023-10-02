import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material';
import saveDataToBackend from '../saveDataToBackend';

const SoupTask = (props) => {

    const task = props.task
    const instructions = task.instructions
    const matrix = task.matrix
    const nElements = task.n_elements
    //const matrix_words = props.task.matrix_words
    const wordsWithPositions = task.wordsWithPositions;
    var ncol = 22

    const [highlightedLetters, setHighlightedLetters] = useState([]);
    const [highlightedWords, setHighlightedWords] = useState([]);
    const [missedPositions, setMissedPositions] = useState([]);

    if(nElements > 256){
        ncol = Math.sqrt(nElements)
    }
    
    // Calculate the fontSize based on the number of elements
    var fontSize = 24 - Math.floor(nElements / 100);


    const handleLetterClick = (rowIndex, colIndex) => {
        const clickedLetterPosition = { x: colIndex, y: rowIndex };
    
        const newHighlightedLetters = [...highlightedLetters, clickedLetterPosition];
    
        const newHighlightedWords = wordsWithPositions.filter(word =>
            word.positions.some(pos =>
                pos.x === clickedLetterPosition.x && pos.y === clickedLetterPosition.y
            )
        );
    
        setHighlightedLetters(newHighlightedLetters);
    
        // Add only new words to the highlightedWords array
        newHighlightedWords.forEach(word => {
            if (!highlightedWords.some(existingWord => existingWord.word === word.word)) {
                setHighlightedWords(prevHighlightedWords => [...prevHighlightedWords, word]);
            }
        });

        if (
            !newHighlightedWords.some((word) =>
                word.positions.every(
                    (pos) =>
                        highlightedLetters.some(
                            (highlightedPos) =>
                                highlightedPos.x === pos.x && highlightedPos.y === pos.y
                        )
                )
            )
        ) {
            setMissedPositions((prevPositions) => [
                ...prevPositions,
                ...newHighlightedLetters,
            ]);
        }
    };

    console.log('highlightedLetters', highlightedLetters)
    console.log('highlightedWords', highlightedWords)
    const highlights = {highlightedWords: highlightedWords, highlightedLetters: highlightedLetters}

    const handleSubmit = () => {
        console.log('Submitted Data:', highlightedWords);
        const submitData = {task: task, submitted: highlights}
        saveDataToBackend(submitData, 'soup')
    };

    return (
        <div>
            <h2>{instructions}</h2>

            <Grid container justifyContent='center'>
            <table>
                <tbody>
                    {matrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((item, colIndex) => {
                                    const isHighlighted = highlightedWords.some((word) =>
                                        word.positions.some(
                                            (position) =>
                                                position.x === colIndex &&
                                                position.y === rowIndex
                                        )
                                    );
                                    const isMissed = missedPositions.some(
                                        (position) =>
                                            position.x === colIndex &&
                                            position.y === rowIndex
                                    );
                                    return (
                                        <td key={colIndex}>
                                            <Button
                                                size='large'
                                                onClick={() => handleLetterClick(rowIndex, colIndex)}
                                                style={{
                                                    background: isHighlighted
                                                        ? 'SpringGreen'
                                                        : isMissed
                                                        ? 'salmon'
                                                        : 'transparent', // Change the style
                                                    color: item === '0' ? 'transparent' : 'black', // Make empty cells transparent
                                                }}
                                            >
                                                {item}
                                            </Button>
                                        </td>
                                    );
                                })}
                        </tr>
                    ))}
                </tbody>
            </table>
            </Grid>

            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} sx={{ margin: '16px', width: '20%' }}>Submit</Button>
        </div>
    )
    }

export default SoupTask