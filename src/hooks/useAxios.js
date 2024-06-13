import axios from 'axios';

const useAxios = axios.create({
    baseURL: `http://api.openweathermap.org`,
    timeout: 8000

});

export default useAxios;