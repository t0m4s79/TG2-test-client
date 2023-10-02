import axios from 'axios';

// Function to save JSON data to the backend
export default function saveDataToBackend(data, task) {

    const taskData = {task, data}
    axios.post('http://localhost:3000/store-data', taskData)
    .then((response) => {
        console.log(response.data.message);
        alert(response.data.message)
    })
    .catch((error) => {
        console.error(error);
        alert(error)
    });
}
