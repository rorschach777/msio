import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://marksweitzer-d18ea.firebaseio.com/'
});
export default instance;