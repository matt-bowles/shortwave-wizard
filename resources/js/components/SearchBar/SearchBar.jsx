import React, { useState, useEffect } from 'react';
import { FormControl, FormGroup, TextField, NativeSelect, Button, FormControlLabel, Switch, Container, Paper as div, Grid, InputLabel, InputAdornment } from '@material-ui/core';

import { fetchOptions } from '../../api';

export default class SearchBar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            language: '',
            station: '',
            freq: 0,
            isLive: false,

            stationList: [],
            languageList: [],
            bandList: [],

            freqErr: "",
        }
    }

   async componentDidMount() {
        const data = await fetchOptions();
        this.setState({
            stationList: data.data.stations,
            languageList: data.data.languages,
            bandList: data.data.bands
        });

        this.onSubmit();
    }

    async onChange(e) {
        if (e.target.name == "freq") {
            if (!this.validateFreqInput(e)) return;
        }

        // document.location = `&${e.target.name}=${e.target.value}`;

        // this.props.history.push(`&${e.target.name}=${e.target.value}`);

        await this.setState({ [e.target.name]: (e.target.value === "" && e.target.name !== "freq") ? e.target.checked : e.target.value });

        const data = await fetchOptions({
            station: this.state.station,
            language: this.state.language,
            freq: this.state.freq,
        });

        this.setState({
            stationList: data.data.stations,
            languageList: data.data.languages,
            bandList: data.data.bands
        });

        this.onSubmit();
    }

    onSubmit() {
        this.props.handleFilterSearch({
            station: this.state.station,
            language: this.state.language,
            freq: this.state.freq,
            isLive: +this.state.isLive
        });
    }

    validateFreqInput(e) {
        let freq = e.target.value;

        if (freq === "") {
            this.setState({freqErr: ""});
            return true;
        }

        freq = parseInt(freq);

        // Frequency must be a number between 10 - 30,000kHz
        if (!(freq >= 10 && freq <= 30000 && !isNaN(freq))) {
            this.setState({freqErr: "Frequency must be between 10 - 30,000kHz"})
            return false;
        } else {
            this.setState({freqErr: ""});
            return true;
        }
    }
    
    render() {
        return (
            <div style={{ padding: "16px" }}>

            <Grid container alignItems="flex-start" spacing={2}>

                <Grid item xs={3}>
                    <FormControl>

                        <InputLabel shrink>Station</InputLabel>

                        <NativeSelect defaultValue="" onChange={(e) => this.onChange(e)} name="station">
                            <option value="">All stations</option>
                            {this.state.stationList.map((station, i) => <option key={i} value={station} selected={this.state.station !== "" && (station == this.state.station)}>{station}</option>)}
                        </NativeSelect>
                        
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <FormControl>

                        <InputLabel shrink>Language</InputLabel>

                        <NativeSelect label="Language" defaultValue="" onChange={(e) => this.onChange(e)} name="language">
                            <option value="">All languages</option>
                            {this.state.languageList.map((language, i) => <option key={i} value={language} selected={this.state.language !== "" && (language == this.state.language)}>{language}</option>)}
                        </NativeSelect>

                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                <InputLabel shrink>Frequency</InputLabel>
                    <TextField
                        id="filled-number"
                        name="freq"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                            startAdornment: <InputAdornment position="start">kHz</InputAdornment>
                        }}
                        placeholder="Leave blank for all"
                        helperText={this.state.freqErr}
                        onChange={(e) => this.onChange(e)}
                    />
                </Grid>

                <Grid item xs={3}>
                <FormControlLabel
                control={
                    <Switch
                        name="isLive"
                        onChange={(e) => this.onChange(e)}
                        color="primary"
                    />
                }
                label="Only show live broadcasts"
            />
                </Grid>

            </Grid>
                
            <Grid style={{marginTop: "16px"}}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={(e) => this.onSubmit(e)}
                    disabled={this.state.freqErr.length > 0}
                >
                    Search
                </Button>
            </Grid>
            </div>
        )
    }
}