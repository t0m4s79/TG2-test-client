import React, { useState } from 'react'
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const NumericKeyboard = () => {

    const [input, setInput] = useState('');

    const onInputChanged = (event) => {
        setInput(event.target.value);
    };

    const onKeyPress = (button) => {
        if (button === '{backspace}') {
            setInput(input.slice(0, -1));
        } 
        else if (button === 'C') {
            setInput('')
        } else {
            setInput(input + button);
        }
    };

    const layout = {
        numeric: ['1 2 3', '4 5 6', '7 8 9', '{backspace} 0 C']
    };

    return (
        <div>
            <input type="text" value={input} onChange={onInputChanged} />
            <Keyboard
                layout={layout}
                onChange={(input) => setInput(input)}
                onKeyPress={onKeyPress}
                physicalKeyboardHighlight={true}
            />
        </div>
    )
}

export default NumericKeyboard