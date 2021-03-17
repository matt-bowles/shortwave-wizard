import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api";

export const fetchOptions = async (params) => {
    
    let url = `${API_URL}/broadcasts/selectOptions?`;
     
    if (params) {
        // Construct URL from provided params
        Object.keys(params).forEach((val) => {
            if (params[val] === 0 || params[val] === "" || params[val] === undefined) return;
            url += `&${val}=${params[val]}`;
        });
    }
    
    try {
        let data = await axios.get(url);
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

/**
 * Fetches a list of broadcasts that are "related" to the provided ID (e.g. via language, broadcast location, azimuth, etc.)
 * @param {*} id Valid broadcast ID
 * @returns an array of all "related broadcasts"
 */
export const getRelatedBroadcasts = async (id) => {
    try {
        let data = await axios.get(`${API_URL}/broadcasts/related?id=${id}`);
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

export const getDayString = (days) => {
    days = days.toString();
    let formatted = "";

    if (days.includes(2)) formatted += "M";
    if (days.includes(3)) formatted += "Tu";
    if (days.includes(4)) formatted += "W";
    if (days.includes(5)) formatted += "Th";
    if (days.includes(6)) formatted += "F";
    if (days.includes(7)) formatted += "Sa";
    if (days.includes(1)) formatted += "Su";

    return formatted;
}

export const convertToLocalTime = (start, end) => {
    return "[placeholder]";
}

export const formatTime = (time) => {
    var formatted = time.toString().padStart(4, '0'); 
    formatted = formatted.substring(0,2) + ":" + formatted.substring(2);    // hh:mm
    return formatted;
}