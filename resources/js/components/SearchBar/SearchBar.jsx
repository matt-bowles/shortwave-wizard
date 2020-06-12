import React, { useState, useEffect } from 'react';
import { FormControl, FormGroup, TextField, NativeSelect, Button } from '@material-ui/core';

import { fetchOptions } from '../../api';

const SearchBar =({ handleLanguageChange, handleStationChange, handleFreqChange, handleFilterSearch }) => {
    
    const [fetchedStations, setFetchedStations] = useState([]);
    const [fetchedLanguages, setFetchedLanguages] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
            const data = await fetchOptions();

            setFetchedStations(data.data.stations);
            setFetchedLanguages(data.data.languages);
        }

        fetchAPI();
    }, [setFetchedStations]);

    return (
        <FormGroup>
            <FormControl>
                <NativeSelect defaultValue="" onChange={(e) => handleStationChange(e.target.value)}>
                    <option value="">All stations</option>
                    {fetchedStations.map((station, i) => <option key={i} value={station}>{station}</option>)}
                </NativeSelect>
            </FormControl>
            <FormControl>
                <NativeSelect defaultValue="" onChange={(e) => handleLanguageChange(e.target.value)}>
                    <option value="">All languages</option>
                    {fetchedLanguages.map((language, i) => <option key={i} value={language}>{language}</option>)}
                </NativeSelect>
            </FormControl>
            <TextField
            id="filled-number"
            label="Frequency (kHz)"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(e) => handleFreqChange(e.target.value)}
            />
            <Button onClick={() => handleFilterSearch() }>Go</Button>
        </FormGroup>
    )
}

export default SearchBar;