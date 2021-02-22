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

export const filterSearch = async (params) => {

    let url = `${API_URL}/broadcasts/filter?`;
     
    // Construct URL from provided params
    Object.keys(params).forEach((val) => {
        if (params[val] === 0 || params[val] === "" || params[val] === undefined) return;
        url += `&${val}=${params[val]}`;
    });

    try {
        let data = await axios.get(url);
        return data;
    } catch (err) {
        // TODO: handle error
        console.log(err);
    }
}

/**
 * Get information for a -single- broadcast from a provided ID
 * @param {*} id Broadcast ID 
 */
export const getOne = async (id) => {
    try {
        let data = await axios.get(`${API_URL}/broadcasts/getOne?id=${id}`);
        return data;
    } catch (err) {
        // TODO: handle error
        console.log(err);
    }
}

export const getChangePageData = async (url) => {
    try {
        let data = await axios.get(url);
        return data;
    } catch (err) {
        // TODO: handle error
        console.log(err);
    }
}