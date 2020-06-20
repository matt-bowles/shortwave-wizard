import React, { useState, useEffect } from 'react';
import { FormControl, FormGroup, TextField, NativeSelect, Button, FormControlLabel, Switch, Container, Paper as div, Grid, InputLabel } from '@material-ui/core';

import { fetchOptions } from '../../api';

const SearchBar =({ handleLanguageChange, handleStationChange, handleFreqChange, handleIsLiveChange, handleFilterSearch }) => {
    
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
        <div style={{ padding: "16px" }}>

            <Grid container alignItems="flex-start" spacing={2}>

                <Grid item xs={3}>
                    <FormControl>

                        <InputLabel shrink>Station</InputLabel>

                        <NativeSelect defaultValue="" onChange={(e) => handleStationChange(e.target.value)}>
                            <option value="">All stations</option>
                            {fetchedStations.map((station, i) => <option key={i} value={station}>{station}</option>)}
                        </NativeSelect>
                        
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <FormControl>

                        <InputLabel shrink>Language</InputLabel>

                        <NativeSelect label="Language" defaultValue="" onChange={(e) => handleLanguageChange(e.target.value)}>
                            <option value="">All languages</option>
                            {fetchedLanguages.map((language, i) => <option key={i} value={language}>{language}</option>)}
                        </NativeSelect>

                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                <InputLabel shrink>Frequency (kHz)</InputLabel>
                    <TextField
                        id="filled-number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Leave blank for all"
                        onChange={(e) => handleFreqChange(e.target.value)}
                    />
                </Grid>

                <Grid item xs={3}>
                <FormControlLabel
                control={
                    <Switch
                        onChange={handleIsLiveChange}
                        color="primary"
                    />
                }
                label="Only show live broadcasts"
            />
                </Grid>

            </Grid>
                
            <Grid style={{marginTop: "16px"}}>
                <Button variant="contained" color="primary" type="submit" onClick={() => handleFilterSearch() }>Search</Button>
            </Grid>
        </div>
    )
}

export default SearchBar;