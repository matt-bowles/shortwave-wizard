import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api";

export const fetchOptions = async () => {
    try {
        let data = await axios.get(`${API_URL}/broadcasts/selectOptions`);
        return data;
    } catch (err) {
        // TODO: handle error
        console.log(err);
    }
}

export const filterSearch = async (freq, language, station) => {
    try {
        let data = await axios.get(`${API_URL}/broadcasts/filter?freq=${freq}&language=${language}&station=${station}`);
        return data;
    } catch (err) {
        // TODO: handle error
        console.log(err);
    }
}